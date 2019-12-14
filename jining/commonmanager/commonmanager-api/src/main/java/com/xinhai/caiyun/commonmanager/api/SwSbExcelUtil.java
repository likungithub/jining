package com.xinhai.caiyun.commonmanager.api;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellRangeAddressList;
import org.apache.poi.ss.util.RegionUtil;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SwSbExcelUtil {
    public static final short TEN = 10;
    public static  final short START_ROW=1;//表格开始行
    public static final  short START_COLUMN=1;//表格开始列
    public static final short TITLE_COUNT=2;//表格头部信息终止行数
    public static final  short TABLE_RULE_COUNT=9;//表格填写规则终止行数
    public static final  short TABLE_DATA_ROW=11;//表格数据内容起始行数
    /**
     * 创建excel文档，
     *
     * @param list        数据
     * @param keys        list中map的key数组集合
     * @param columnNames excel的列名
     * @param title       标题
     * @return Workbook Workbook对象
     */
    public static Workbook createWorkBook(List<Map<String, Object>> list, String[] keys, String[] columnNames, String title,String[] rules) {
        // 创建excel工作簿
        Workbook wb = new HSSFWorkbook();
        
        return wb;
    }

    private static void setTableHeader(Sheet sheet, Workbook wb, String[] columnNames) {
     
    }

    private static void setTableData(Sheet sheet, Workbook wb, List<Map<String, Object>> list, String[] keys) {
       
    }

    private static void setTableRule(Sheet sheet, Workbook wb, String[] rules, int length) {
     
    }

    private static void setTitleTable( Sheet sheet,Workbook wb,String title,Integer length)
    {
      
    }

    /**
     * 设置某些列的值只能输入预制的数据,显示下拉框.
     *
     * @param sheet
     *            要设置的sheet.
     * @param textlist
     *            下拉框显示的内容
     * @param firstRow
     *            开始行
     * @param endRow
     *            结束行
     * @param firstCol
     *            开始列
     * @param endCol
     */
    public static void setHSSFValidation(HSSFSheet sheet, String[] textlist, int firstRow, int endRow, int firstCol, int endCol) {
        // 加载下拉列表内容
        DVConstraint constraint = DVConstraint
                .createExplicitListConstraint(textlist);
        // 设置数据有效性加载在哪个单元格上,四个参数分别是：起始行、终止行、起始列、终止列
        CellRangeAddressList regions = new CellRangeAddressList(firstRow,
                endRow, firstCol, endCol);
        // 数据有效性对象
        HSSFDataValidation data_validation_list = new HSSFDataValidation(
                regions, constraint);
        sheet.addValidationData(data_validation_list);

    }

    public static   List<List<Map<String,Object>>> importSwsbData(InputStream is) throws IOException {
        List<List<Map<String,Object>>>list=new ArrayList<>();
     
        
        return list;
    }

    /**
     * 获取每列值
     * @param cell
     * @return
     */
    private static String getCel(Cell cell) {
        String cellValue = null;
        HSSFDataFormatter hSSFDataFormatter = new HSSFDataFormatter();
        cellValue = hSSFDataFormatter.formatCellValue(cell); // 使用EXCEL原来格式的方式取得值
        return cellValue;
    }

    /**
     * 获取证件类型代码
     * @param swjlxDm
     * @param sfmc
     * @param csmc
     * @return
     */
   private static String getZjlxDm(String zjlx){
       String []lxmcs={"身份证","中国人民解放军军人身份证件","中国人民武装警察身份证件","港澳通行证","台湾大陆通行证","外国护照"};
         StringBuffer stringBuffer=new StringBuffer();

        
        return stringBuffer.toString();
    }

}
