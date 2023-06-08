import XLSX from 'xlsx'
// @ts-ignore
import FileSaver from "file-saver";

export const downLoadFile = (blob: any, type: any, filename: any) => {
    FileSaver.saveAs(
        new Blob([blob], {
            type,
        }),
        filename
    );
}


export const s2ab = (s: any) => {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
}


export const exportExcel = (filename: any, sheets: any) => {
    const wb = XLSX.utils.book_new();
    sheets.forEach((item: any) => {
        const ws = XLSX.utils.aoa_to_sheet(item.data);
        XLSX.utils.book_append_sheet(wb, ws, item.name);
        ws['!cols'] = item['!cols'] || []
    })
    // 导出Excel, 注意这里用到的是XLSXS对象
    let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: false,
        type: "binary",
    });
    const blob = s2ab(wbout)
    downLoadFile(blob, 'application/octet-stream', filename)
} 


export const importExcelToJSON = (file: any) => {
    let reader = new FileReader()
    reader.readAsArrayBuffer(file)
    return new Promise((resolve, reject) => {
        reader.onload = () => {
            let buffer = reader.result
            // @ts-ignore
            let bytes = new Uint8Array(buffer)
            let length = bytes.byteLength
            let binary = ''
            for (let i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i])
            }
            let wb = XLSX.read(binary, {
              type: 'binary',
            })
            const data = wb.SheetNames.map(name => {
                return XLSX.utils.sheet_to_json(wb.Sheets[name])
            })
            resolve(data)
        }
        reader.onerror = (e) => {
            reject(e)
        }
    })
}