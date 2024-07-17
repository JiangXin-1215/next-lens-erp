import React, { FC, useState, useEffect, useRef } from 'react';
import { InputNumber, useDesignable, withDynamicSchemaProps } from '@nocobase/client'
import { BlockName } from '../constants';
import { Radio, Table, Button, message, Modal, Input } from "antd";
import { EditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons'
import { LensGridCell, LensGridRow, defaultSource, addTotalClo, changeData, fillData, editTable} from './LensGridData'
import { usePluginTranslation } from '../locale';
import type { RadioChangeEvent, TableProps } from 'antd';
import './index.less'

export interface LensGridProps {
    collectionName: string;
    data?: any[];
    loading?: boolean;
}

/*
需求：TODO

UI相关
1第一列加点背景色，类似表格抬头，用于提示用户是不能编辑的
2当页面变小时横向出现滚动轴，滚动时第一列左侧固定，不参与滚动
3增加合计行（重要，优先度较高）
4合计数量字体根据当前主题使用强调色
5限制表格只允许输入数字，当单位为片时不允许输入小数，当单位为副时数字只能是0.5的整数倍（或者变颜色给予醒目提示）

逻辑相关
1组件增加是否可编辑属性，由代码控制是否可编辑    (可编辑时表格抬头和第一列不能编辑)
2改动某一单元格后合计数字和合计行需要对应更改，元数据也需要更改NValue,如果和OValue不相同则将haschanged设置为true
3表格内容区域允许复制和粘贴（或者做个导入导出功能），粘贴时需要将元数据赋值，并且需要满足UI相关第5条限制

可能有点费事
4动态化表格
说明：
表格的横向坐标起始值和结束值可以变化   比如   0.00-2.00   2.25-4.00
表格的纵向坐标起始值和结束值可以变化   比如   2.25-4.00

原因：有数据时展示数据可以一眼就能将数据全部看到
*/

//withDynamicSchemaProps 是一个高阶组件，用于处理 Schema 中的的动态属性
export const LensGrid: FC<LensGridProps> = withDynamicSchemaProps(({ data, loading }) => {
    const [stepNum, setStep] = useState(0.5) // 步进大小，fieldSchema
    const oldVal = useRef({}) // 存储编辑的老数据，便于点击取消时还原
    const [messageApi, contextHolder] = message.useMessage();
    const {TextArea} = Input
    const { t } = usePluginTranslation();
    
    const [sourceData, setSourceData] = useState(defaultSource) // 表格数据，不包含合计行
    const [totalData, setTotalData] = useState(defaultSource) // 表格数据，包含合计行
    const sourceDataRef = useRef(sourceData)
    const pasteValRef = useRef('')
    const [qtyType, setQtyType] = useState(1)
    const [showModal, setShowModal] = useState(false) // 是否展示弹框
    /**
     * 根据给定的参数生成表格的列配置
     * @param align 列对齐方式，可以是'left'、'center'或者'right'，默认为'center'
     * @returns 表格的列配置数组
     */
    const getColumns = (align: 'left' | 'center' | 'right' = 'center'): TableProps<LensGridRow>['columns'] => {
        return [
            {
                title: 'SPH/CYL',
                dataIndex: 'col0',
                width: 100,
                align: align,
                fixed: 'left',
                className: 'first-fixed-col',
            },
            ...Array.from({ length: 25 }, (_, i) => (
                {
                    title: (i * 0.25).toFixed(2),
                    dataIndex: `col${i + 1}`,
                    align: align,
                    render: (cell: any, record: any, index: number) =>
                    {
                        return !!record['action']?.isEdit ? (
                            <InputNumber step={stepNum} onChange={(val) => inputChange(val, i, index)} defaultValue={cell.nValue} min={0}/>
                        ) : (cell.hasChanged ? (
                            <span style={{ color: 'skyblue' }}>{cell.nValue}</span>
                        ) : cell.nValue)
                    } 
                })),
            {
                title: '操作',
                dataIndex: 'action',
                width: 100,
                align: align,
                fixed: 'right',
                className: 'fixed-action-block',
                render: (cell:any, record: any, index: number) => {
                    return (
                        cell?.isEdit === undefined ? null :
                        !cell?.isEdit ? (
                            <EditOutlined onClick={() =>editNow(index)}/>
                        ): (
                            <div>
                                <CloseOutlined onClick={() => cancel(index)}/>
                                <CheckOutlined onClick={() => save(index)}/>
                            </div>
                        )
                    )
                    
                }
            }
        ];
    };
    
    const columns = getColumns();
    
    // 更改输入框值
    const inputChange = (val, colIndex, rowIndex) => {
        console.log('val===> ', val)
        console.log('rowIndex===> ', rowIndex)
        console.log('colIndex===> ', colIndex)
        const rowData = editTable(sourceData,val,colIndex,rowIndex)
        // setSourceData(newData)
        sourceDataRef.current[rowIndex] = rowData
    }
    useEffect(() => {
        // 这里要确认data是有值的，不然无法刷新页面数据
        if (data) {
            const newData = fillData(data, sourceData);
            setSourceData(newData)
        }
    }, [data])
    //  如果表格数据更新，则计算合计数据
    useEffect(() => {
        if(sourceData) {
            const resultData =  addTotalClo(sourceData)
            setTotalData(resultData)
        }
    }, [sourceData])

    
    const onChange = (e: RadioChangeEvent) => {
        setQtyType(e.target.value)
        setStep(e.target.value === 1 ? 0.5 : 1)
       const newData = changeData(e.target.value, sourceData);
       setSourceData(newData)
    };
    // 编辑行
    const editNow = (index) => {
        oldVal.current[index] = {...sourceData[index]}
        const data = [...sourceData]
        data[index]['action'].isEdit = true
        setSourceData(data)

    }
    // 编辑保存
    const save = (index) => {
        const data = sourceDataRef.current[index]
        let isValid = true
        for (let key in data) {
            if(data[key].nValue !== oldVal.current[index][key].nValue) {
                if(data[key].nValue && data[key].nValue % stepNum !== 0) {
                    messageApi.open({
                        type: 'error',
                        content: `输入值必须是${stepNum}的整数倍`,
                      });
                      isValid = false
                    break
                }
                data[key].oValue = oldVal.current[index][key].nValue
                data[key].hasChanged = true
            }
        }
        if(!isValid) return
        data['action'].isEdit = false
        const newData =[...sourceData]
        newData[index] = data
        setSourceData(newData)
    }
    // 取消编辑
    const cancel = (index) => {
        const data = [...sourceData]
        data[index] = oldVal.current[index]
        setSourceData(data)
    }
    // 拷贝
    const copyTextToClipboard = async () => {
        const text = JSON.stringify(sourceData)
        try {
            await navigator.clipboard.writeText(text);
            messageApi.info('内容已复制到剪贴板');
        } catch (err) {
            messageApi.info('复制到剪贴板失败', err);
        }
    }
    // 粘贴数据
    const pasteText = () => {
        setShowModal(true)
    }

    const handlePaste = (close) => {
        setShowModal(false)
        if(!pasteValRef.current) {
            return
        }
        debugger
        const data = JSON.parse(pasteValRef.current)
        if(!Array.isArray(data)) {
            messageApi.open({
                type: 'error',
                content: '数据不合法，请检查数据',
            });
            return
        }
        let isValid = true
        for(const list of data) {
            for(const key in list) {
                if(list[key].nValue && list[key].nValue % stepNum !== 0) {
                    isValid = false
                    break
                }
            }
            if(!isValid) {
                break
            }
        }
        if(!isValid) {
            messageApi.open({
                type: 'error',
                content: '数据不合法，请检查数据',
            });
            return
        }
        setSourceData(data)
    }

    const pasteChange = (e) => {
        const val = e.target.value
        if(!val) return
        pasteValRef.current = val
    }
    return (
        <div>
            {contextHolder}
            <div className="edit-area">
                <Button type='primary' onClick={copyTextToClipboard}>复制内容</Button>
                <Button type="default" onClick={pasteText} style={{marginLeft: '15px'}}>粘贴数据</Button>
            </div>
            
            <Table
                dataSource={totalData}
                columns={columns}
                loading={loading}
                pagination={false}
                scroll={{x: true}}
                title={() => (
                    <div>
                        <span style={{ marginRight: '10px' }}>{t('UnitType')}</span>
                        <Radio.Group onChange={onChange} value={qtyType}>
                            <Radio style={{ marginRight: '10px' }} value={1}>{t('Prs')}</Radio>
                            <Radio style={{ marginRight: '10px' }} value={0}>{t('Pcs')}</Radio>
                        </Radio.Group>
                        <span style={{ marginRight: '10px' }}>{t('QtySum')}</span>
                        <span style={{ marginRight: '10px' }}>0</span>
                    </div>
                )}
                bordered
            />
            <Modal title="请输入内容" open={showModal} onOk={handlePaste} onCancel={() => {setShowModal(false)}}>
                <TextArea rows={10} placeholder='请输入内容' onChange={pasteChange}/> 
            </Modal>
        </div>
    );
}, { displayName: BlockName })


