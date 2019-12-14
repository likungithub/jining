package com.xinhai.caiyun.systemmanager.controller;

import com.deepoove.poi.data.RowRenderData;
import com.deepoove.poi.policy.DynamicTableRenderPolicy;
import com.deepoove.poi.policy.MiniTableRenderPolicy;
import com.deepoove.poi.util.TableTools;
import org.apache.poi.xwpf.usermodel.XWPFTable;
import org.apache.poi.xwpf.usermodel.XWPFTableRow;

import java.util.List;

public class DetailTablePolicy extends DynamicTableRenderPolicy {
    private List<RowRenderData> dataList;

    public DetailTablePolicy(List dataList) {
        this.dataList = dataList;
    }

    @Override
    public void render(XWPFTable xwpfTable, Object o) {
        if (dataList == null) {
            return;
        }
        XWPFTableRow insertNewTableRow = null;
        int m1 = 0;
        int m2 = 0;
        int m3 = 0;
        for (int i = 0; i < dataList.size(); i++) {
            if (i % 3 == 0) {
                insertNewTableRow = xwpfTable.insertNewTableRow(1 + m1);
                for (int j = 0; j < dataList.get(i).size(); j++) {
                    insertNewTableRow.createCell();
                }
                MiniTableRenderPolicy.renderRow(xwpfTable, 1 + m1, dataList.get(i));
                //合并单元格
                TableTools.mergeCellsHorizonal(xwpfTable, 1 + m1, 3, 4);
                TableTools.mergeCellsHorizonal(xwpfTable, 1 + m1, 0, 2);
                m1 = m1 + 1;
            }
            if (i % 3 == 1) {
                insertNewTableRow = xwpfTable.insertNewTableRow(3 + m1 + m2);
                for (int j = 0; j < dataList.get(i).size(); j++) {
                    insertNewTableRow.createCell();

                }
                MiniTableRenderPolicy.renderRow(xwpfTable, 3 + m1 + m2, dataList.get(i));
                //合并单元格
                TableTools.mergeCellsHorizonal(xwpfTable, 3 + m1 + m2, 3, 4);
                TableTools.mergeCellsHorizonal(xwpfTable, 3 + m1 + m2, 0, 2);
                m2 = m2 + 1;
            }
            if (i % 3 == 2) {
                insertNewTableRow = xwpfTable.insertNewTableRow(6 + m1 + m2 + m3);
                for (int j = 0; j < dataList.get(i).size(); j++) {
                    insertNewTableRow.createCell();

                }
                MiniTableRenderPolicy.renderRow(xwpfTable, 6 + m1 + m2 + m3, dataList.get(i));
                //合并单元格
                TableTools.mergeCellsHorizonal(xwpfTable, 6 + m1 + m2 + m3, 0, 1);
                m3 = m3 + 1;
            }

        }
    }
}
