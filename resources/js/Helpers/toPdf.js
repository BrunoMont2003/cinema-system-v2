import Jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'
import { isObject } from 'lodash'
const filtered = (data) => {
  const list = []
  data.forEach((element) => {
    const row = []
    for (const prop in element) {
      prop !== 'created_at' &&
          prop !== 'updated_at' &&
          !isObject(element[prop]) &&
          row.push(element[prop])
    }
    list.push(row)
  })
  return list
}

export const ToPdf = (title = '', headers = [], data = []) => {
  const unit = 'pt'
  const size = 'A4' // Use A1, A2, A3 or A4
  const orientation = 'portrait' // portrait or landscape

  const marginLeft = 40
  const doc = new Jspdf(orientation, unit, size)
  data = filtered(data)
  doc.setFontSize(15)

  const content = {
    startY: 50,
    head: [headers],
    body: data,
    styles: {
      theme: 'grid',
      overflow: 'linebreak',
      halign: 'center',
      valign: 'middle',
      fontSize: 12,
      font: 'helvetica',
      fontStyle: 'normal',
      cellPadding: 12
    }
  }

  doc.text(title, marginLeft, 40)
  autoTable(doc, content)
  doc.save(`report-${title.toLowerCase()}.pdf`)
}

export const ImagesToPdf = (title = '', images = []) => {
  const unit = 'pt'
  const size = 'A4' // Use A1, A2, A3 or A4
  const orientation = 'portrait' // portrait or landscape

  const marginLeft = 40
  const doc = new Jspdf(orientation, unit, size)
  doc.setFontSize(15)

  let i = 0
  for (const image of images) {
    console.log(i)
    doc.addImage(image, 'PNG', marginLeft, 40 + i * 260, undefined, undefined, `IMAGE ${i}`, 'FAST')
    i++
  }
  doc.text(title, marginLeft, 40)
  doc.save(`${title.toLowerCase()}.pdf`)
}
