import * as XLSX from "xlsx"

export function jsonToFileExport(data, fileName, columns) {
  const result =  data.map(obj => {
    const newObj = {}

    Object.keys(columns).forEach(key => {
      newObj[key] = obj[key]
    })
    
    return newObj
  })

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(result, { header: Object.keys(columns) })

  Object.keys(columns).forEach((col, index) => {
    if (columns[col]) {
      ws[XLSX.utils.encode_col(index) + '1'].v = columns[col]
    }
  })
  XLSX.utils.book_append_sheet(wb, ws, "Data")

  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
  const blob = new Blob([buffer], { type: "application/octet-stream" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")

  a.href = url
  a.download = `${fileName}.xlsx`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
