package com.xinhai.caiyun.systemmanager.controller.reportUtils;

import com.deepoove.poi.data.RowRenderData;
import com.deepoove.poi.policy.DynamicTableRenderPolicy;
import com.deepoove.poi.policy.MiniTableRenderPolicy;
import org.apache.poi.xwpf.usermodel.XWPFTable;
import org.apache.poi.xwpf.usermodel.XWPFTableCell;
import org.apache.poi.xwpf.usermodel.XWPFTableRow;

import java.util.List;

public class DetailTablePolicy_hcly1 extends DynamicTableRenderPolicy {
    private List<RowRenderData> dataList;

    public DetailTablePolicy_hcly1(List dataList) {
        this.dataList = dataList;
    }

    @Override
    public void render(XWPFTable xwpfTable, Object o) {
        if (dataList == null) {
            return;
        }
        XWPFTableRow insertNewTableRow = null;
        for (int i = 0; i < dataList.size(); i++) {
            insertNewTableRow = xwpfTable.insertNewTableRow(1 + i);
            for (int j = 0; j < dataList.get(i).size(); j++) {
                XWPFTableCell cell = insertNewTableRow.createCell();
            }
            MiniTableRenderPolicy.renderRow(xwpfTable, 1 + i, dataList.get(i));
        }
    }
}
