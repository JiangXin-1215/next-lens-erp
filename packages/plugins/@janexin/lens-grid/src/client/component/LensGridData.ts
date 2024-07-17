export interface LensGridCell {
  id: number;//数据库主键
  oValue: string | number;//原始数据值
  nValue: string | number;//最新数据值
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

export const defaultSource : LensGridRow[] = Array.from({ length: 81 }, (_, i) => ({
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
  action: {isEdit: false},
}));


export const addTotalClo = (sourceData) => {
  const result = sourceData.reduce((pre,cur) => {
      return {
          key: 'total',
          col0: '合计',
          col1: {id: 0, oValue: "", nValue: Number(pre.col1.nValue) + Number(cur.col1.nValue), hasChanged: false },
          col2: {id: 0, oValue: "", nValue: Number(pre.col2.nValue) + Number(cur.col2.nValue), hasChanged: false },
          col3: {id: 0, oValue: "", nValue: Number(pre.col3.nValue) + Number(cur.col3.nValue), hasChanged: false },
          col4: {id: 0, oValue: "", nValue: Number(pre.col4.nValue) + Number(cur.col4.nValue), hasChanged: false },
          col5: {id: 0, oValue: "", nValue: Number(pre.col5.nValue) + Number(cur.col5.nValue), hasChanged: false },
          col6: {id: 0, oValue: "", nValue: Number(pre.col6.nValue) + Number(cur.col6.nValue), hasChanged: false },
          col7: {id: 0, oValue: "", nValue: Number(pre.col7.nValue) + Number(cur.col7.nValue), hasChanged: false },
          col8: {id: 0, oValue: "", nValue: Number(pre.col8.nValue) + Number(cur.col8.nValue), hasChanged: false },
          col9: {id: 0, oValue: "", nValue: Number(pre.col9.nValue) + Number(cur.col9.nValue), hasChanged: false },
          col10: {id: 0, oValue: "", nValue: Number(pre.col10.nValue) + Number(cur.col10.nValue), hasChanged: false },
          col11: {id: 0, oValue: "", nValue: Number(pre.col11.nValue) + Number(cur.col11.nValue), hasChanged: false },
          col12: {id: 0, oValue: "", nValue: Number(pre.col12.nValue) + Number(cur.col12.nValue), hasChanged: false },
          col13: {id: 0, oValue: "", nValue: Number(pre.col13.nValue) + Number(cur.col13.nValue), hasChanged: false },
          col14: {id: 0, oValue: "", nValue: Number(pre.col14.nValue) + Number(cur.col14.nValue), hasChanged: false },
          col15: {id: 0, oValue: "", nValue: Number(pre.col15.nValue) + Number(cur.col15.nValue), hasChanged: false },
          col16: {id: 0, oValue: "", nValue: Number(pre.col16.nValue) + Number(cur.col16.nValue), hasChanged: false },
          col17: {id: 0, oValue: "", nValue: Number(pre.col17.nValue) + Number(cur.col17.nValue), hasChanged: false },
          col18: {id: 0, oValue: "", nValue: Number(pre.col18.nValue) + Number(cur.col18.nValue), hasChanged: false },
          col19: {id: 0, oValue: "", nValue: Number(pre.col19.nValue) + Number(cur.col19.nValue), hasChanged: false },
          col20: {id: 0, oValue: "", nValue: Number(pre.col20.nValue) + Number(cur.col20.nValue), hasChanged: false },
          col21: {id: 0, oValue: "", nValue: Number(pre.col21.nValue) + Number(cur.col21.nValue), hasChanged: false },
          col22: {id: 0, oValue: "", nValue: Number(pre.col22.nValue) + Number(cur.col22.nValue), hasChanged: false },
          col23: {id: 0, oValue: "", nValue: Number(pre.col23.nValue) + Number(cur.col23.nValue), hasChanged: false },
          col24: {id: 0, oValue: "", nValue: Number(pre.col24.nValue) + Number(cur.col24.nValue), hasChanged: false },
          col25: {id: 0, oValue: "", nValue: Number(pre.col25.nValue) + Number(cur.col25.nValue), hasChanged: false },
      }
  })
  const newData = [...sourceData, result]
  return newData
}

export const changeData = (unit: number, sourceData) => {
  //根据unit的值，修改dataAll中的数据
  //unit为0时，表示pcs，为1时表示prs
  //为0时，数量乘以2，为1时，数量除以2
  const newData = sourceData.map((row) => {
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
      return row
  });
  return newData
}


export const fillData = (data: object, sourceData) => {
  console.log('data:', data);
  const source  = [...sourceData]
  for (let key in data) {
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

      //根据colIndex赋值对应数据
      source[rowIndex][`col${colIndex}`] = { id: data[key].id, oValue: data[key].num, nValue: data[key].num, hasChanged: false };
  }
  return source
};

// 编辑表格数据
export const editTable = (sourceData, val, colIndex, rowIndex) => {
  const obj = sourceData[rowIndex]
  obj[`col${colIndex + 1}`] = {
    oValue: obj[`col${colIndex + 1}`].nValue,
    nValue: val,
    hasChanged: true,
    id: obj[`col${colIndex + 1}`].id,
  }
  return obj
}
