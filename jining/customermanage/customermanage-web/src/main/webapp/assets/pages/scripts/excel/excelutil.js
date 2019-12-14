var wb;//读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串

//开始导入
function importf(obj,callback) {
    if(!obj.files) {
        return;
    }
    var f = obj.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        if(rABS) {
            wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                type: 'base64'
            });
        } else {
            wb = XLSX.read(data, {
                type: 'binary'
            });
        }
        /**
         * wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
         * wb.Sheets[Sheet名]获取第一个Sheet的数据
         */
        var excelJson = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        // console.log(JSON.stringify(excelJson));
        callback(JSON.stringify(excelJson));
    };
    if(rABS) {
        reader.readAsArrayBuffer(f);
    } else {
        reader.readAsBinaryString(f);
    }
}

//文件流转BinaryString
function fixdata(data) {
    var o = "",
        l = 0,
        w = 10240;
    for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}


var tmpDown; //导出的二进制对象
function downloadExl(data, type) {
    // console.log(data);
    //根据json数据，获取excel的第一行(例如:姓名、年龄、性别)存至map
    var keys = Object.keys(data[0]);
    var firstRow = {};
    keys.forEach(function (item) {
        firstRow[item] = item;
    });
    data.unshift(firstRow);

    var content = {};

    // 把json格式的数据转为excel的行列形式
    var sheetsData = data.map(function (item, rowIndex) {
        return keys.map(function (key, columnIndex) {
            return Object.assign({}, {
                value: item[key],
                position: (columnIndex > 25 ? getCharCol(columnIndex) : String.fromCharCode(65 + columnIndex)) + (rowIndex + 1),
            });
        });
    }).reduce(function (prev, next) {
        return prev.concat(next);
    });

    sheetsData.forEach(function (item, index) {
        content[item.position] = { v: item.value };
    });

    //设置区域,比如表格从A1到D10,SheetNames:标题，
    var coordinate = Object.keys(content);
    var workBook = {
        SheetNames: ["helloSheet"],
        Sheets: {
            "helloSheet": Object.assign({}, content, { "!ref": coordinate[0] + ":" + coordinate[coordinate.length - 1] }),
        }
    };
    //这里的数据是用来定义导出的格式类型
    var excelData = XLSX.write(workBook, { bookType: "xlsx", bookSST: false, type: "binary" });
    var blob = new Blob([string2ArrayBuffer(excelData)], { type: "" });
    var myDate = new Date();
    saveAs(blob, myDate.toLocaleDateString() + ".xlsx");
}

//字符串转字符流
function string2ArrayBuffer(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
    var temCol = "",
        s = "",
        m = 0
    while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
    }
    return s
}

