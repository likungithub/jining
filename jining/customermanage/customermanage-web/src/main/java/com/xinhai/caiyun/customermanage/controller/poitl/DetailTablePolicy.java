package com.xinhai.caiyun.customermanage.controller.poitl;

import com.deepoove.poi.data.RowRenderData;
import com.deepoove.poi.policy.DynamicTableRenderPolicy;
import com.deepoove.poi.policy.MiniTableRenderPolicy;
import com.deepoove.poi.util.TableTools;
import org.apache.poi.xwpf.usermodel.XWPFTable;
import org.apache.poi.xwpf.usermodel.XWPFTableRow;

import java.util.List;

public class DetailTablePolicy extends DynamicTableRenderPolicy {
    private List<RowRenderData> dataList;
    private String type;
    public DetailTablePolicy(List dataList,String type){
        this.dataList=dataList;
        this.type = type;
    }
    @Override
    public void render(XWPFTable xwpfTable, Object o) {
        if ("cybg".equals(type)){
        for (int i=0;i<dataList.size();i++){
            XWPFTableRow insertNewTableRow = xwpfTable.insertNewTableRow(2+i);
           for (int j=0;j<6;j++){
               insertNewTableRow.createCell();
               //插入数据
              /* MiniTableRenderPolicy.renderRow();*/
           }
            MiniTableRenderPolicy.renderRow(xwpfTable, 2+i, dataList.get(i));
            //合并单元格
           /* TableTools.mergeCellsHorizonal(xwpfTable, 12+i, 1, 2);
            TableTools.mergeCellsHorizonal(xwpfTable, 12+i, 2, 3);
            TableTools.mergeCellsHorizonal(xwpfTable, 12+i, 3, 4);*/
        }
      /*  TableTools.mergeCellsVertically(xwpfTable,0,12,11+dataList.size());*/
    }else if ("ypdjb".equals(type)){
            for (int i=0;i<dataList.size();i++){
                XWPFTableRow insertNewTableRow = xwpfTable.insertNewTableRow(1+i);
                for (int j=0;j<9;j++){
                    insertNewTableRow.createCell();
                }
                MiniTableRenderPolicy.renderRow(xwpfTable, 1+i, dataList.get(i));
            }
        } else if ("ypcljl".equals(type)){
            for (int i=0;i<dataList.size();i++){
                XWPFTableRow insertNewTableRow = xwpfTable.insertNewTableRow(1+i);
                for (int j=0;j<10;j++){
                    insertNewTableRow.createCell();
                }
                MiniTableRenderPolicy.renderRow(xwpfTable, 1+i, dataList.get(i));
            }
        }
    }
}
