
import { useCollectionManager } from '@nocobase/client';
import { utils, writeFile } from 'xlsx';

//单元格数据
export interface LensGridCell {
  id: number;//数据库主键
  oValue: string | number;//原始数据值
  nValue: string | number;//最新数据值
  hasChanged: boolean;//是否有变化
}

export interface LensGridDataRow {
  id: string | number;
  key: string | number;
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

export interface LensGridRow {
  id: string | number;
  key: string | number;
  col0: string;//title
  col1: string | number;//0.00
  col2: string | number;//0.25
  col3: string | number;//0.50
  col4: string | number;//0.75
  col5: string | number;//1.00
  col6: string | number;//1.25
  col7: string | number;//1.50
  col8: string | number;//1.75
  col9: string | number;//2.00
  col10: string | number;//2.25
  col11: string | number;//2.50
  col12: string | number;//2.75
  col13: string | number;//3.00
  col14: string | number;//3.25
  col15: string | number;//3.50
  col16: string | number;//3.75
  col17: string | number;//4.00
  col18: string | number;//4.25
  col19: string | number;//4.50
  col20: string | number;//4.75
  col21: string | number;//5.00
  col22: string | number;//5.25
  col23: string | number;//5.50
  col24: string | number;//5.75
  col25: string | number;//6.00
}

//获取到的数据  单位统一为pcs
export const defaultSource: LensGridDataRow[] = Array.from({ length: 41 }, (_, i) => ({
  id: (i * 0.25).toFixed(2),
  key: (i * 0.25).toFixed(2),
  col0: (i * 0.25).toFixed(2),
  col1: { id: 0, oValue: "", nValue: "", hasChanged: false },
  col2: { id: 0, oValue: "", nValue: "", hasChanged: false },
  col3: { id: 0, oValue: "", nValue: "", hasChanged: false },
  col4: { id: 0, oValue: "", nValue: "", hasChanged: false },
  col5: { id: 0, oValue: "", nValue: "", hasChanged: false },
  col6: { id: 0, oValue: "", nValue: "", hasChanged: false },
  col7: { id: 0, oValue: "", nValue: "", hasChanged: false },
  col8: { id: 0, oValue: "", nValue: "", hasChanged: false },
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

//表格数据
export const defaultRows: LensGridRow[] = Array.from({ length: 41 }, (_, i) => ({
  id: (i * 0.25).toFixed(2),
  key: (i * 0.25).toFixed(2),
  col0: (i * 0.25).toFixed(2),
  col1: "",
  col2: "",
  col3: "",
  col4: "",
  col5: "",
  col6: "",
  col7: "",
  col8: "",
  col9: "",
  col10: "",
  col11: "",
  col12: "",
  col13: "",
  col14: "",
  col15: "",
  col16: "",
  col17: "",
  col18: "",
  col19: "",
  col20: "",
  col21: "",
  col22: "",
  col23: "",
  col24: "",
  col25: ""
}));


export const addTotalRow = (sourceRow, totalDisplay: string) => {
  const result = sourceRow.reduce((pre, cur) => {
    return {
      id: 'total',
      key: 'total',
      col0: totalDisplay,
      col1: Number(pre.col1) + Number(cur.col1),
      col2: Number(pre.col2) + Number(cur.col2),
      col3: Number(pre.col3) + Number(cur.col3),
      col4: Number(pre.col4) + Number(cur.col4),
      col5: Number(pre.col5) + Number(cur.col5),
      col6: Number(pre.col6) + Number(cur.col6),
      col7: Number(pre.col7) + Number(cur.col7),
      col8: Number(pre.col8) + Number(cur.col8),
      col9: Number(pre.col9) + Number(cur.col9),
      col10: Number(pre.col10) + Number(cur.col10),
      col11: Number(pre.col11) + Number(cur.col11),
      col12: Number(pre.col12) + Number(cur.col12),
      col13: Number(pre.col13) + Number(cur.col13),
      col14: Number(pre.col14) + Number(cur.col14),
      col15: Number(pre.col15) + Number(cur.col15),
      col16: Number(pre.col16) + Number(cur.col16),
      col17: Number(pre.col17) + Number(cur.col17),
      col18: Number(pre.col18) + Number(cur.col18),
      col19: Number(pre.col19) + Number(cur.col19),
      col20: Number(pre.col20) + Number(cur.col20),
      col21: Number(pre.col21) + Number(cur.col21),
      col22: Number(pre.col22) + Number(cur.col22),
      col23: Number(pre.col23) + Number(cur.col23),
      col24: Number(pre.col24) + Number(cur.col24),
      col25: Number(pre.col25) + Number(cur.col25),
    }
  })
  var totalNum = result.col1 + result.col2 + result.col3 + result.col4 + result.col5 + result.col6 + result.col7 + result.col8 + result.col9 + result.col10 + result.col11 + result.col12 + result.col13 + result.col14 + result.col15 + result.col16 + result.col17 + result.col18 + result.col19 + result.col20 + result.col21 + result.col22 + result.col23 + result.col24 + result.col25;
  const newData = [...sourceRow, result]
  return {
    newData,
    totalNum
  }
}

export const changeData = (unit: number, sourceRows) => {
  //根据unit的值，修改dataAll中的数据
  //unit为1时，表示pcs，为2时表示prs
  //为1时，数量乘以2，为2时，数量除以2
  const newData = sourceRows.map((row) => {
    for (let key in row) {
      if (key === 'id' || key === 'key' || key === 'col0') {
        continue;
      }
      if (unit === 1) {
        row[key] = row[key] as number * 2;

      } else {
        row[key] = row[key] as number / 2;
      }
      if (row[key] === 0) {
        row[key] = '';
      }
    }
    return row
  });
  return newData
}

export const exportExcel = (sourceRows: LensGridRow[], name: string, unit: number, xtype: string) => {
  var title = xtype === 'cyl' ? "SPH/CYL" : "SPH/ADD";
  var sourceData = sourceRows.map((row) => {
    if (xtype == 'cyl') {
      return {
        "SPH/CYL": row.col0,
        "0.00": row.col1,
        "0.25": row.col2,
        "0.50": row.col3,
        "0.75": row.col4,
        "1.00": row.col5,
        "1.25": row.col6,
        "1.50": row.col7,
        "1.75": row.col8,
        "2.00": row.col9,
        "2.25": row.col10,
        "2.50": row.col11,
        "2.75": row.col12,
        "3.00": row.col13,
        "3.25": row.col14,
        "3.50": row.col15,
        "3.75": row.col16,
        "4.00": row.col17,
        "4.25": row.col18,
        "4.50": row.col19,
        "4.75": row.col20,
        "5.00": row.col21,
        "5.25": row.col22,
        "5.50": row.col23,
        "5.75": row.col24,
        "6.00": row.col25
      }
    } else {
      return {
        "SPH/ADD": row.col0,
        "0.00": row.col1,
        "0.25": row.col2,
        "0.50": row.col3,
        "0.75": row.col4,
        "1.00": row.col5,
        "1.25": row.col6,
        "1.50": row.col7,
        "1.75": row.col8,
        "2.00": row.col9,
        "2.25": row.col10,
        "2.50": row.col11,
        "2.75": row.col12,
        "3.00": row.col13,
        "3.25": row.col14,
        "3.50": row.col15,
        "3.75": row.col16,
        "4.00": row.col17,
        "4.25": row.col18,
        "4.50": row.col19,
        "4.75": row.col20,
        "5.00": row.col21,
        "5.25": row.col22,
        "5.50": row.col23,
        "5.75": row.col24,
        "6.00": row.col25
      }
    }

  });
  var sheet = utils.json_to_sheet(sourceData);
  var data = utils.book_new();
  utils.book_append_sheet(data, sheet, name);
  writeFile(data, name + '.xlsx');
}




