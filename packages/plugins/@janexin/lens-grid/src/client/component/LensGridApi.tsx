
import type { TableProps } from 'antd';
import React from 'react';

export interface LensGridCell {
    id: number;//数据库主键
    oValue: string;//原始数据值
    nValue: string;//最新数据值
    hasChanged: boolean;//是否有变化
}

export interface LensGridRow {
    key: string;
    col0: string;//title
    col1: LensGridCell;//0.00
    col2: LensGridCell;//0.25
    col3: LensGridCell;//0.50
    col4: LensGridCell;//0.75
    col5: LensGridCell;//1.00
    col6: LensGridCell;//1.25
    col7: LensGridCell;//1.50
    col8: LensGridCell;//1.75
    col9: LensGridCell;//2.00
    col10: LensGridCell;//2.25
    col11: LensGridCell;//2.50
    col12: LensGridCell;//2.75
    col13: LensGridCell;//3.00
    col14: LensGridCell;//3.25
    col15: LensGridCell;//3.50
    col16: LensGridCell;//3.75
    col17: LensGridCell;//4.00
    col18: LensGridCell;//4.25
    col19: LensGridCell;//4.50
    col20: LensGridCell;//4.75
    col21: LensGridCell;//5.00
    col22: LensGridCell;//5.25
    col23: LensGridCell;//5.50
    col24: LensGridCell;//5.75
    col25: LensGridCell;//6.00
}


/**
 * 根据给定的参数生成表格的列配置
 * @param align 列对齐方式，可以是'left'、'center'或者'right'，默认为'center'
 * @returns 表格的列配置数组
 */
export const getColumns = (align: 'left' | 'center' | 'right' = 'center'): TableProps<LensGridRow>['columns'] => {
    return [
        {
            title: 'SPH/CYL',
            dataIndex: 'col0',
            align: align,
            fixed: 'left',
        },
        ...Array.from({ length: 25 }, (_, i) => (
            {
                title: (i * 0.25).toFixed(2),
                dataIndex: `col${i + 1}`,
                align: align,
                render: (cell: LensGridCell) => cell.hasChanged ? (
                    <span style={{ color: 'skyblue' }}>{cell.nValue}</span>
                ) : cell.nValue,
            })),
    ];
};

export const fillData = (data: object) => {
    for (let key in data) {
        //如果没有isph 或者 icyl 或者 iadd，就终止本次循环
        if (!data[key].iSph || !data[key].iCyl || !data[key].iAdd) {
            return;
        }

        let sph = data[key].iSph;
        let cyl = data[key].iCyl;
        let add = data[key].iAdd;
        let colIndex = 0;
        let rowIndex = 0;
        if (add) {
            colIndex = Math.abs(add) / 0.25 + 1;
        } else {
            colIndex = Math.abs(cyl) / 0.25 + 1;
        }
        rowIndex = Math.abs(sph) / 0.25;

        let row = dataAll[rowIndex];

        //根据colIndex赋值对应数据
        dataAll[rowIndex][colIndex] = { id: data[key].id, oValue: data[key].num, nValue: data[key].num, hasChanged: false };
    }
};

export const dataAll: LensGridRow[] = Array.from({ length: 81 }, (_, i) => ({
    key: (i * 0.25).toFixed(2),
    col0: (i * 0.25).toFixed(2),
    col1: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col2: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col3: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col4: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col5: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col6: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col7: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col8: { id: 0, oValue: "1", nValue: "1", hasChanged: false },
    col9: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col10: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col11: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col12: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col13: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col14: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col15: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col16: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col17: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col18: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col19: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col20: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col21: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col22: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col23: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col24: { id: 0, oValue: "", nValue: "", hasChanged: false },
    col25: { id: 0, oValue: "", nValue: "", hasChanged: false },
}));

export const changeData = (unit: number) => {
    //根据unit的值，修改dataAll中的数据
    //unit为0时，表示pcs，为1时表示prs
    //为0时，数量乘以2，为1时，数量除以2
    dataAll.forEach((row) => {
        for (let key in row) {
            if (key === 'key' || key === 'col0') {
                continue;
            }
            if (unit === 0) {
                if (row[key].oValue != "") {
                    row[key].oValue = Number(row[key].oValue) * 2;
                }
                if (row[key].nValue != "") {
                    row[key].nValue = Number(row[key].nValue) * 2;
                }

            } else {
                if (row[key].oValue != "") {
                    row[key].oValue = (Number(row[key].oValue) / 2).toFixed(1);
                }
                if (row[key].nValue != "") {
                    row[key].nValue = (Number(row[key].nValue) / 2).toFixed(1);
                }

            }
        }
    });
}

