import React, { FC, useState, useEffect, useRef, useContext } from 'react';
import { useAPIClient, withDynamicSchemaProps, useGlobalTheme } from '@nocobase/client'
import { changeData, defaultSource, LensGridRow, defaultRows, exportExcel, addTotalRow } from './LensGridEditData';
import { BlockName } from '../constants';
import { Radio, Button, message, RadioChangeEvent, Tooltip } from "antd";
import { ClearOutlined, FileExcelFilled, FileTextFilled } from '@ant-design/icons';
import { DataGrid } from '@mui/x-data-grid';
import { usePluginTranslation } from '../locale';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const LensGridEdit: FC = withDynamicSchemaProps(
  () => {
    const { t } = usePluginTranslation();
    const { theme } = useGlobalTheme();
    const isDark = theme.name.toUpperCase().search('DARK') !== -1;
    const httpClient = useAPIClient();
    // httpClient.request
    const [messageApi, contextHolder] = message.useMessage();
    const [qtyType, setQtyType] = useState(1) // 计量单位  1  片PCS 2  副PRS
    const [sourceData, setSourceData] = useState(defaultSource) // 后台数据，不包含合计行
    const [sourceRows, setSourceRows] = useState(defaultRows) // 表格数据，不包含合计行 
    const [totalRows, setTotalRows] = useState([]) // 表格数据包含合计行
    const [totalNum, setTotalNum] = useState(0) // 合计数量
    const getColumns = (): any[] => {
      return [
        {
          field: 'col0',
          headerName: 'SPH/CYL',
          type: 'string',
          width: 100,
          align: 'center',
          headerAlign: 'center',
          editable: false,
        },
        ...Array.from({ length: 25 }, (_, i) => (
          {
            field: `col${i + 1}`,
            headerName: (i * 0.25).toFixed(2),
            type: 'number',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            editable: true,
            renderCell: (params) => {
              if (params.id !== 'total') {
                var rowid = params.id;
                var rowIndex = rowid as number / 0.25;
                var field = params.field;
                var value = params.value as number;
                //取得对应的数据
                var rowData = sourceData[rowIndex];
                var cellData = rowData[field]["nValue"] as number;
                var hasChanged = rowData[field]["hasChanged"] && rowData[field]["oValue"] !== '';
                var hasError = false;
                if (qtyType === 1) {
                  //是小数则报错
                  if (value % 1 !== 0) {
                    hasError = true
                  }
                } else if (qtyType === 2) {
                  //不是5的整数倍，报错
                  var temp = value * 10;
                  if (temp % 5 !== 0) {
                    hasError = true
                  }
                }
                if (hasError) {
                  return <span style={{ color: 'red' }}>{value}</span>
                } else {
                  return hasChanged ? (<span style={{ color: 'skyblue' }}>{value}</span>) : value;
                }
              }

            },
          }
        )
        ),
      ];
    }

    const columns = getColumns();

    //变更计量单位
    const onChange = (e: RadioChangeEvent) => {
      setQtyType(e.target.value);
      const newData = changeData(e.target.value, sourceRows);
      setSourceRows(newData);
    };

    //如果表格更新则计算合计数据
    useEffect(() => {
      if (sourceRows) {
        const resultData = addTotalRow(sourceRows, t("Sum"));
        setTotalRows(resultData.newData);
        setTotalNum(resultData.totalNum);
      }
    }, [sourceRows])

    // 导出
    const exportTable = async () => {
      exportExcel(sourceRows, "test", qtyType, 'cyl');
    }

    // 粘贴数据
    const pasteText = () => {

    }

    //清空数据
    const clearTable = () => {
      setSourceRows(defaultRows)
    }

    //工具栏
    function CustomToolbar() {
      return (
        <div>
          <span style={{ marginRight: '10px' }}>{t('UnitType')}</span>
          <Radio.Group onChange={onChange} value={qtyType}>
            <Radio style={{ marginRight: '10px' }} value={2}>{t('Prs')}</Radio>
            <Radio style={{ marginRight: '10px' }} value={1}>{t('Pcs')}</Radio>
          </Radio.Group>
          <span style={{ marginRight: '10px' }}>{t('QtySum')}</span>
          <span style={{ marginRight: '60px', color: 'orange', fontSize: 28 }}>{totalNum}</span>
          <Tooltip title={t('Export')}>
            <Button type="primary" onClick={exportTable} shape="circle" icon={<FileExcelFilled />} />
          </Tooltip>
          <span style={{ marginRight: '10px' }}></span>
          <Tooltip title={t('Paste')}>
            <Button type="primary" onClick={pasteText} shape="circle" icon={<FileTextFilled />} />
          </Tooltip>
          <span style={{ marginRight: '10px' }}></span>
          <Tooltip title={t('Clear')}>
            <Button type="primary" onClick={clearTable} shape="circle" icon={<ClearOutlined />} />
          </Tooltip>
        </div>
      );
    }

    const handleRowUpdate = (newRow: LensGridRow, oldRow: LensGridRow) => {
      //比较是newRow oldRow内容否一致
      if (JSON.stringify(newRow) !== JSON.stringify(oldRow)) {
        //更新数据
        const otherData = sourceData.filter((row) => row.id !== newRow.id);
        //只可能为1行数据
        var changeDatas = sourceData.filter((row) => row.id === newRow.id);
        var changeData = changeDatas[0];
        //返回的row中数据对应格子会被替换为数字，所以需要将其转换为原来的数据格式
        try {
          for (let key in newRow) {
            if (key === 'id' || key === 'key' || key === 'col0') {
              continue;
            }
            changeData[key].nValue = qtyType === 1 ? newRow[key] : newRow[key] * 2;
            if (changeData[key].nValue !== changeData[key].oValue) {
              changeData[key].hasChanged = true;
            }
          }
        } catch (e) {

        }
        const newData = [changeData, ...otherData];
        setSourceData(newData);
        //将表格数据也更新
        const newRows = sourceRows.map((row) => {
          if (row.id === newRow.id) {
            return newRow;
          }
          return row;
        });
        setSourceRows(newRows);
      }
      return newRow;
    }

    //https://mui.com/x/api/data-grid/data-grid/
    return (
      <div>
        {contextHolder}
        <CustomToolbar />
        <div style={{ marginBottom: '10px' }}></div>
        <DataGrid
          columns={columns}
          rows={totalRows}
          showCellVerticalBorder={true}
          showColumnVerticalBorder={true}
          disableColumnMenu={true}
          disableColumnSorting={true}
          editMode='cell'
          hideFooter={true}
          // loading={false}
          // localeText={}
          // onCellEditStop={handleEditStop}
          processRowUpdate={handleRowUpdate}
        />
      </div>
    )
  }, { displayName: BlockName }
);


