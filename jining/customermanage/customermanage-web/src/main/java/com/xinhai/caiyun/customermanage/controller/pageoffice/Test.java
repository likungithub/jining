package com.xinhai.caiyun.customermanage.controller.pageoffice;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String []args){
//        String [] rowName = new String [3];
//        rowName[0] = "1";
//        rowName[1] = "2";
//        rowName[2] = "3";
//        List dataList = new ArrayList();
//        dataList.add(1);
//        dataList.add(2);
//        dataList.add(3);
//        ExportZhiBiaoUtils exportZhiBiaoUtils = new ExportZhiBiaoUtils("制表",rowName,dataList,"");
        try {
            //doc路径
            com.aspose.words.Document document = new com.aspose.words.Document("d:/file/jimo/20190819/87f50801-0686-4537-905c-b193528676bb.doc");
            //pdf路径
            File outputFile = new File("d:/file/jimo/20190819/aa.pdf");
            //操作文档保存
            document.save(outputFile.getAbsolutePath(), com.aspose.words.SaveFormat.PDF);
        } catch (Exception e) {
            e.printStackTrace();
        }
        /*exportZhiBiaoUtils.export();*/
    }
}
