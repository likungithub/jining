package com.xinhai.caiyun.commonmanager.api;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.text.DecimalFormat;
import java.util.*;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddressList;

/**
 * ExcelUtil工具类实现功能: 导出时传入list<t>,即可实现导出为一个excel,其中每个对象Ｔ为Excel中的一条记录.
 * 导入时读取excel,得到的结果是一个list<t>.T是自己定义的对象.
 * 需要导出的实体对象只需简单配置注解就能实现灵活导出,通过注解您可以方便实现下面功能: 
 * 1.实体属性配置了注解就能导出到excel中,每个属性都对应一列.
 * 2.列名称可以通过注解配置. 3.导出到哪一列可以通过注解配置. 
 * 4.鼠标移动到该列时提示信息可以通过注解配置.
 * 5.用注解设置只能下拉选择不能随意填写功能. 
 * 6.用注解设置是否只导出标题而不导出内容,这在导出内容作为模板以供用户填写时比较实用.
 * 本工具类以后可能还会加功能,请关注我的博客: http://blog.csdn.net/lk_blog
 * 
 * @param <t> 范型
 * @author lmf
 */
public class ExcelUtil<t> {

    /**
     * 类
     */
    Class<t> clazz;

    /**
     * 常量10
     */
    private static final short TEN = 10;

    public ExcelUtil(Class<t> clazz) {
        this.clazz = clazz;
    }

    /**
     * 根据注解导入
     *
     * @param sheetName 开始的列名
     * @param input     输入流
     * @return List<t> 返回的list集合
     */
    public List<t> importExcel(String sheetName, InputStream input) {
        int maxCol = 0;
        List<t> list = new ArrayList<t>();
        try {
            HSSFWorkbook workbook = new HSSFWorkbook(input);
            HSSFSheet sheet = workbook.getSheet(sheetName);
            if (!sheetName.trim().equals("")) {
                sheet = workbook.getSheet(sheetName); // 如果指定sheet名,则取指定sheet中的内容.
            }
            if (sheet == null) {
                sheet = workbook.getSheetAt(0); // 如果传入的sheet名不存在则默认指向第1个sheet.
            }
            int rows = sheet.getPhysicalNumberOfRows();

            if (rows > 0) { // 有数据时才处理
                // Field[] allFields = clazz.getDeclaredFields();// 得到类的所有field.
                List<Field> allFields = getMappedFiled(clazz, null);

                Map<Integer, Field> fieldsMap = new HashMap<Integer, Field>(); // 定义一个map用于存放列的序号和field.

                for (Field field : allFields) {
                    // 将有注解的field存放到map中.
                    if (field.isAnnotationPresent(ExcelVOAttribute.class)) {
                        ExcelVOAttribute attr = field.getAnnotation(ExcelVOAttribute.class);
                        int col = getExcelCol(attr.column()); // 获得列号
                        maxCol = Math.max(col, maxCol);
                        // System.out.println(col + "====" + field.getName());
                        field.setAccessible(true); // 设置类的私有字段属性可访问.
                        fieldsMap.put(col, field);
                    }
                }
                for (int i = 1; i < rows; i++) { // 从第2行开始取数据,默认第一行是表头.
                    HSSFRow row = sheet.getRow(i);
                    // int cellNum = row.getPhysicalNumberOfCells();
                    // int cellNum = row.getLastCellNum();
                    int cellNum = maxCol;
                    t entity = null;
                    for (int j = 0; j <= cellNum; j++) {
                        HSSFCell cell = row.getCell(j);
                        if (cell == null) {
                            continue;
                        }
                        int cellType = cell.getCellType();
                        String c = "";
                        if (cellType == HSSFCell.CELL_TYPE_NUMERIC) {
                            if (j == 15) { //税率
                                c = String.valueOf(cell.getNumericCellValue()); //数字格式
                            } else { //其他的转为文本格式
                                DecimalFormat df = new DecimalFormat("0");
                                c = df.format(cell.getNumericCellValue());
                            }
                        } else if (cellType == HSSFCell.CELL_TYPE_BOOLEAN) {
                            c = String.valueOf(cell.getBooleanCellValue());
                        } else {
                            c = cell.getStringCellValue();
                        }
                        if (c == null || c.equals("")) {
                            continue;
                        }
                        entity = (entity == null ? clazz.newInstance() : entity); // 如果不存在实例则新建.
                        // System.out.println(cells[j].getContents());
                        Field field = fieldsMap.get(j); // 从map中得到对应列的field.
                        if (field == null) {
                            continue;
                        }
                        // 取得类型,并根据对象类型设置值.
                        Class fieldType = field.getType();
                        if (String.class == fieldType) {
                            field.set(entity, String.valueOf(c));
                        } else if ((Integer.TYPE == fieldType) || (Integer.class == fieldType)) {
                            field.set(entity, Integer.parseInt(c));
                        } else if ((Long.TYPE == fieldType) || (Long.class == fieldType)) {
                            field.set(entity, Long.valueOf(c));
                        } else if ((Float.TYPE == fieldType) || (Float.class == fieldType)) {
                            field.set(entity, Float.valueOf(c));
                        } else if ((Short.TYPE == fieldType) || (Short.class == fieldType)) {
                            field.set(entity, Short.valueOf(c));
                        } else if ((Double.TYPE == fieldType) || (Double.class == fieldType)) {
                            field.set(entity, Double.valueOf(c));
                        } else if (Character.TYPE == fieldType) {
                            if ((c != null) && (c.length() > 0)) {
                                field.set(entity, Character.valueOf(c.charAt(0)));
                            }
                        }

                    }
                    if (entity != null) {
                        list.add(entity);
                    }
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        }
        return list;
    }

//    /**
//     * 对list数据源将其里面的数据导入到excel表单
//     * 
//     * @param sheetName
//     *            工作表的名称
//     * @param output
//     *            java输出流
//     */
//    public HSSFWorkbook exportExcel(List<t> lists[], String sheetNames[]) {
//
//        HSSFWorkbook workbook = new HSSFWorkbook();// 产生工作薄对象
//
//        for (int ii = 0; ii < lists.length; ii++) {
//        List<t> list = lists[ii];
//        String sheetName = sheetNames[ii];
//
//        List<Field> fields = getMappedFiled(clazz, null);
//
//        HSSFSheet sheet = workbook.createSheet();// 产生工作表对象
//
//        workbook.setSheetName(ii, sheetName);
//
//        HSSFRow row;
//        HSSFCell cell;// 产生单元格
//        HSSFCellStyle style = workbook.createCellStyle();
//        style.setFillForegroundColor(HSSFColor.SKY_BLUE.index);
//        style.setFillBackgroundColor(HSSFColor.GREY_40_PERCENT.index);
//        row = sheet.createRow(0);// 产生一行
//        // 写入各个字段的列头名称
//        for (int i = 0; i < fields.size(); i++) {
//        Field field = fields.get(i);
//        ExcelVOAttribute attr = field.getAnnotation(ExcelVOAttribute.class);
//        int col = getExcelCol(attr.column());// 获得列号
//        cell = row.createCell(col);// 创建列
//        cell.setCellType(HSSFCell.CELL_TYPE_STRING);// 设置列中写入内容为String类型
//        cell.setCellValue(attr.name());// 写入列名
//
//        // 如果设置了提示信息则鼠标放上去提示.
//        if (!attr.prompt().trim().equals("")) {
//        setHSSFPrompt(sheet, "", attr.prompt(), 1, 100, col, col);// 这里默认设了2-101列提示.
//        }
//        // 如果设置了combo属性则本列只能选择不能输入
//        if (attr.combo().length > 0) {
//        setHSSFValidation(sheet, attr.combo(), 1, 100, col, col);// 这里默认设了2-101列只能选择不能输入.
//        }
//        cell.setCellStyle(style);
//        }
//
//        int startNo = 0;
//        int endNo = list.size();
//        // 写入各条记录,每条记录对应excel表中的一行
//        for (int i = startNo; i < endNo; i++) {
//        row = sheet.createRow(i + 1 - startNo);
//        t vo = (t) list.get(i); // 得到导出对象.
//        for (int j = 0; j < fields.size(); j++) {
//        Field field = fields.get(j);// 获得field.
//        field.setAccessible(true);// 设置实体类私有属性可访问
//        ExcelVOAttribute attr = field.getAnnotation(ExcelVOAttribute.class);
//        try {
//        // 根据ExcelVOAttribute中设置情况决定是否导出,有些情况需要保持为空,希望用户填写这一列.
//        if (attr.isExport()) {
//        cell = row.createCell(getExcelCol(attr.column()));// 创建cell
//        cell.setCellType(HSSFCell.CELL_TYPE_STRING);
//        cell.setCellValue(field.get(vo) == null ? "" : String.valueOf(field
//                .get(vo)));// 如果数据存在就填入,不存在填入空格.
//        }
//        } catch (IllegalArgumentException e) {
//        e.printStackTrace();
//        } catch (IllegalAccessException e) {
//        e.printStackTrace();
//        }
//        }
//        }
//        }
//        return workbook;
//    }

//    /**
//     * 对list数据源将其里面的数据导入到excel表单
//     * 
//     * @param sheetName 工作表的名称
//     * @param list 数据源
//     * @return HSSFWorkbook HSSFWorkbook对象
//     */
//    @SuppressWarnings("unchecked")
//    public HSSFWorkbook exportExcel(List<t> list, String sheetName) {
//        // 此处 对类型进行转换
//        List<t> ilist = new ArrayList<>();
//        for (t t : list) {
//            ilist.add(t);
//        }
//        List<t>[] lists = new ArrayList[1];
//        lists[0] = ilist;
//
//        String[] sheetNames = new String[1];
//        sheetNames[0] = sheetName;
//
//        return exportExcel(lists, sheetNames);
//    }

    /**
     * 将EXCEL中A,B,C,D,E列映射成0,1,2,3
     *
     * @param col 传入的列序号
     * @return int 当前的映射数字
     */
    public static int getExcelCol(String col) {
        col = col.toUpperCase();
        // 从-1开始计算,字母重1开始运算。这种总数下来算数正好相同。
        int count = -1;
        char[] cs = col.toCharArray();
        for (int i = 0; i < cs.length; i++) {
            count += (cs[i] - 64) * Math.pow(26, cs.length - 1 - i);
        }
        return count;
    }

    /**
     * 设置单元格上提示
     *
     * @param sheet         要设置的sheet.
     * @param promptTitle   标题
     * @param promptContent 内容
     * @param firstRow      开始行
     * @param endRow        结束行
     * @param firstCol      开始列
     * @param endCol        结束列
     * @return 设置好的sheet.
     */
    public static HSSFSheet setHSSFPrompt(HSSFSheet sheet, String promptTitle,
                                          String promptContent, int firstRow, int endRow, int firstCol,
                                          int endCol) {
        // 构造constraint对象
        DVConstraint constraint = DVConstraint
                .createCustomFormulaConstraint("DD1");
        // 四个参数分别是：起始行、终止行、起始列、终止列
        CellRangeAddressList regions = new CellRangeAddressList(firstRow,
                endRow, firstCol, endCol);
        // 数据有效性对象
        HSSFDataValidation dataValidationView = new HSSFDataValidation(
                regions, constraint);
        dataValidationView.createPromptBox(promptTitle, promptContent);
        sheet.addValidationData(dataValidationView);
        return sheet;
    }

    /**
     * 设置某些列的值只能输入预制的数据,显示下拉框.
     *
     * @param sheet    要设置的sheet.
     * @param textlist 下拉框显示的内容
     * @param firstRow 开始行
     * @param endRow   结束行
     * @param firstCol 开始列
     * @param endCol   结束列
     * @return 设置好的sheet.
     */
    public static HSSFSheet setHSSFValidation(HSSFSheet sheet,
                                              String[] textlist, int firstRow, int endRow, int firstCol,
                                              int endCol) {
        // 加载下拉列表内容
        DVConstraint constraint = DVConstraint
                .createExplicitListConstraint(textlist);
        // 设置数据有效性加载在哪个单元格上,四个参数分别是：起始行、终止行、起始列、终止列
        CellRangeAddressList regions = new CellRangeAddressList(firstRow,
                endRow, firstCol, endCol);
        // 数据有效性对象
        HSSFDataValidation dataValidationList = new HSSFDataValidation(
                regions, constraint);
        sheet.addValidationData(dataValidationList);
        return sheet;
    }

    /**
     * 得到实体类所有通过注解映射了数据表的字段
     *
     * @param clazz  类
     * @param fields 传入已有的属性
     * @return List<Field> 属性集合
     */
    @SuppressWarnings("rawtypes")
    private List<Field> getMappedFiled(Class clazz, List<Field> fields) {
        if (fields == null) {
            fields = new ArrayList<Field>();
        }

        Field[] allFields = clazz.getDeclaredFields(); // 得到所有定义字段
        // 得到所有field并存放到一个list中.
        for (Field field : allFields) {
            if (field.isAnnotationPresent(ExcelVOAttribute.class)) {
                fields.add(field);
            }
        }
        if (clazz.getSuperclass() != null
                && !clazz.getSuperclass().equals(Object.class)) {
            getMappedFiled(clazz.getSuperclass(), fields);
        }

        return fields;
    }

    /**
     * 创建excel文档，
     *
     * @param list        数据
     * @param keys        list中map的key数组集合
     * @param columnNames excel的列名
     * @param title       标题
     * @return Workbook Workbook对象
     */
    public static Workbook createWorkBook(List<Map<String, Object>> list, String[] keys, String[] columnNames, String title) {
        // 创建excel工作簿
        Workbook wb = new HSSFWorkbook();
        // 创建第一个sheet（页），并命名
        Sheet sheet = wb.createSheet("sheet1");
        // 手动设置列宽。第一个参数表示要为第几列设；第二个参数表示列的宽度，n为列高的像素数。
        for (int i = 0; i < keys.length; i++) {
            sheet.setColumnWidth((short) i, (short) (35.7 * 150));
        }

        // 创建表头行，从第三行开始
        Row row = sheet.createRow((short) 0);

        // 创建两种单元格格式
        CellStyle cs = wb.createCellStyle();
        CellStyle cs2 = wb.createCellStyle();

        // 创建两种字体
        Font f = wb.createFont();
        Font f2 = wb.createFont();

        // 创建第一种字体样式（用于列名）
        f.setFontHeightInPoints(TEN);
        f.setColor(IndexedColors.BLACK.getIndex());
        f.setBoldweight(Font.BOLDWEIGHT_BOLD);

        // 创建第二种字体样式（用于值）
        f2.setFontHeightInPoints(TEN);
        f2.setColor(IndexedColors.BLACK.getIndex());

        // 设置第一种单元格的样式（用于列名）
        cs.setFont(f);
        cs.setBorderLeft(CellStyle.BORDER_THIN);
        cs.setBorderRight(CellStyle.BORDER_THIN);
        cs.setBorderTop(CellStyle.BORDER_THIN);
        cs.setBorderBottom(CellStyle.BORDER_THIN);
        cs.setAlignment(CellStyle.ALIGN_CENTER);

        // 设置第二种单元格的样式（用于值）
        cs2.setFont(f2);
        cs2.setBorderLeft(CellStyle.BORDER_THIN);
        cs2.setBorderRight(CellStyle.BORDER_THIN);
        cs2.setBorderTop(CellStyle.BORDER_THIN);
        cs2.setBorderBottom(CellStyle.BORDER_THIN);
        // cs2.setAlignment(CellStyle.ALIGN_CENTER);
        cs2.setAlignment(CellStyle.ALIGN_LEFT);

        // 设置列名
        for (int i = 0; i < columnNames.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columnNames[i]);
            cell.setCellStyle(cs);
        }

        // 设置每行每列的值
        int size = list.size() + 1; // 共有多少行值（能用的，第一行不可用）
        for (short i = 1; i < size; i++) {
            // Row 行,Cell 方格 , Row 和 Cell 都是从0开始计数的
            // 创建一行，在页sheet上
            Row row1 = sheet.createRow(i);
            // 在row行上创建一个方格
            for (short j = 0; j < keys.length; j++) {
                Cell cell = row1.createCell(j);
                // 省去第一行的sheet数据，从list(1)开始取数据
                cell.setCellValue(list.get(i - 1).get(keys[j]) == null ? " " : list
                        .get(i - 1).get(keys[j]).toString());
                cs2.setAlignment(HSSFCellStyle.ALIGN_RIGHT); // 居右
                cell.setCellStyle(cs2);
            }
        }
        return wb;
    }



    /**
     * 创建excel文档，
     *
     * @param list        数据
     * @param keys        list中map的key数组集合
     * @param columnNames excel的列名
     * @param title       标题
     * @return Workbook Workbook对象
     */
    public static Workbook createWorkBookSL(List<Map<String, Object>> list, String[] keys, String[] columnNames, String title) {
        // 创建excel工作簿
        Workbook wb = new HSSFWorkbook();
        // 创建第一个sheet（页），并命名
        Sheet sheet = wb.createSheet("sheet1");
        // 手动设置列宽。第一个参数表示要为第几列设；第二个参数表示列的宽度，n为列高的像素数。
        for (int i = 0; i < keys.length; i++) {
            if(i==0){
                sheet.setColumnWidth((short) i, (short) (35.7 * 200));

            }else{
                sheet.setColumnWidth((short) i, (short) (35.7 * 150));

            }

        }

        // 创建表头行，从第三行开始
        Row row = sheet.createRow((short) 0);

        // 创建两种单元格格式
        CellStyle cs = wb.createCellStyle();
        CellStyle cs2 = wb.createCellStyle();

        // 创建两种字体
        Font f = wb.createFont();
        Font f2 = wb.createFont();

        // 创建第一种字体样式（用于列名）
        f.setFontHeightInPoints(TEN);
        f.setColor(IndexedColors.BLACK.getIndex());
        f.setBoldweight(Font.BOLDWEIGHT_BOLD);

        // 创建第二种字体样式（用于值）
        f2.setFontHeightInPoints(TEN);
        f2.setColor(IndexedColors.BLACK.getIndex());

        // 设置第一种单元格的样式（用于列名）
        cs.setFont(f);
        cs.setBorderLeft(CellStyle.BORDER_THIN);
        cs.setBorderRight(CellStyle.BORDER_THIN);
        cs.setBorderTop(CellStyle.BORDER_THIN);
        cs.setBorderBottom(CellStyle.BORDER_THIN);
        cs.setAlignment(CellStyle.ALIGN_CENTER);

        // 设置第二种单元格的样式（用于值）
        cs2.setFont(f2);
        cs2.setBorderLeft(CellStyle.BORDER_THIN);
        cs2.setBorderRight(CellStyle.BORDER_THIN);
        cs2.setBorderTop(CellStyle.BORDER_THIN);
        cs2.setBorderBottom(CellStyle.BORDER_THIN);
        // cs2.setAlignment(CellStyle.ALIGN_CENTER);
        cs2.setAlignment(CellStyle.ALIGN_LEFT);

        // 设置列名
        for (int i = 0; i < columnNames.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columnNames[i]);
            cell.setCellStyle(cs);
        }

        // 设置每行每列的值
        int size = list.size() + 1; // 共有多少行值（能用的，第一行不可用）
        for (short i = 1; i < size; i++) {
            // Row 行,Cell 方格 , Row 和 Cell 都是从0开始计数的
            // 创建一行，在页sheet上
            Row row1 = sheet.createRow(i);
            // 在row行上创建一个方格
            for (short j = 0; j < keys.length; j++) {
                Cell cell = row1.createCell(j);
                // 省去第一行的sheet数据，从list(1)开始取数据
                cell.setCellValue(list.get(i - 1).get(keys[j]) == null ? " " : list
                        .get(i - 1).get(keys[j]).toString());
                cs2.setAlignment(HSSFCellStyle.ALIGN_RIGHT); // 居右
                cell.setCellStyle(cs2);

            }
        }
        return wb;
    }


    //现金流量表
    public static Map<String, Map<String,String>> importExcel2Map_xjllb(InputStream input) {
        int start_h = 2;
        Map<String, Map<String, String>> map = new HashMap();
        try {
            HSSFWorkbook workbook = new HSSFWorkbook(input);
            HSSFSheet sheet = workbook.getSheetAt(0); // 如果传入的sheet名不存在则默认指向第1个sheet.
            int rows = sheet.getPhysicalNumberOfRows();
            if (rows > 0) { // 有数据时才处理
                for (int i = start_h; i < rows; i++) {
                    HSSFRow row = sheet.getRow(i);
                    int cnum = getExcelCol("B");

                    Zcfz zcfz = getVal(row, cnum, workbook);
                    if (!zcfz.isContinue) {
                        Map<String, String> map1 = new HashMap<>();
                        map1.put("h", zcfz.h);
                        map1.put("nc", zcfz.nc);
                        map.put(zcfz.h, map1);
                    }

                    cnum = getExcelCol("E");
                    zcfz = getVal(row, cnum, workbook);
                    if (!zcfz.isContinue) {
                        Map<String, String> map1 = new HashMap<>();
                        map1.put("h", zcfz.h);
                        map1.put("nc", zcfz.nc);
                        map.put(zcfz.h, map1);
                    }
                }

            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }


    //资产负债表
    public static Map<String, Map<String,String>> importExcel2Map_zcfzb(InputStream input) {
        int start_h = 2;
        Map<String, Map<String,String>> map = new HashMap();
        try {
            HSSFWorkbook workbook = new HSSFWorkbook(input);
            HSSFSheet sheet = workbook.getSheetAt(0); // 如果传入的sheet名不存在则默认指向第1个sheet.
            int rows = sheet.getPhysicalNumberOfRows();
            if (rows > 0) { // 有数据时才处理
                for (int i = start_h; i < rows; i++) {
                    HSSFRow row = sheet.getRow(i);
                    int cnum = getExcelCol("B");//从B开始后三个

                    Zcfz zcfz = getVal(row,cnum,workbook);
                    if(!zcfz.isContinue){
                       Map<String,String> map1 = new HashMap<>();
                       map1.put("h",zcfz.h);
                       map1.put("nc",zcfz.nc);
                       map1.put("qm",zcfz.qm);
                       map.put(zcfz.h,map1);
                    }

                    cnum = getExcelCol("F");//从F开始后三个
                    zcfz = getVal(row,cnum,workbook);
                    if(!zcfz.isContinue){
                        Map<String,String> map1 = new HashMap<>();
                        map1.put("h",zcfz.h);
                        map1.put("nc",zcfz.nc);
                        map1.put("qm",zcfz.qm);
                        map.put(zcfz.h,map1);
                    }
                }

            }


        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }


    //利润表
    public static Map<String, Map<String,String>> importExcel2Map_lrb(InputStream input) {
        int start_h = 1;
        Map<String, Map<String,String>> map = new HashMap();
        try {
            HSSFWorkbook workbook = new HSSFWorkbook(input);
            HSSFSheet sheet = workbook.getSheetAt(0); // 如果传入的sheet名不存在则默认指向第1个sheet.
            int rows = sheet.getPhysicalNumberOfRows();
            if (rows > 0) { // 有数据时才处理
                for (int i = start_h; i < rows; i++) {
                    HSSFRow row = sheet.getRow(i);
                    int cnum = getExcelCol("B");//从B开始后三个

                    Zcfz zcfz = getVal(row,cnum,workbook);
                    if(!zcfz.isContinue){
                        Map<String,String> map1 = new HashMap<>();
                        map1.put("h",zcfz.h);
                        map1.put("y",zcfz.nc);
                        map1.put("n",zcfz.qm);
                        map.put(zcfz.h,map1);
                    }
                }

            }


        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }

    private static class Zcfz{
        boolean isContinue=false;
        String h;
        String nc;
        String qm;
    }

    public static Zcfz getVal(HSSFRow row,int cnum,HSSFWorkbook workbook){
        Zcfz zcfz = new Zcfz();
        String h = getCvalue(row,cnum,workbook);
        if(StringUtils.isBlank(h)){
           zcfz.isContinue=true;
           return zcfz;
        }
        h = "" +(int)Double.parseDouble(h);
        zcfz.h=h;
        cnum++;
        String nc = getCvalue(row,cnum,workbook);
        if("".equals(nc)){nc="0";}
        zcfz.nc=nc;
        cnum++;
        String qm =  getCvalue(row,cnum,workbook);
        if("".equals(qm)){qm="0";}
        zcfz.qm=qm;
        return zcfz;
    }




    public static String getCvalue(HSSFRow row,int col,HSSFWorkbook workbook) {
        String result = "";
        try {
            HSSFCell cell = row.getCell(col);
            if (cell != null) {
                if (cell.getCellType() == cell.CELL_TYPE_BOOLEAN) {
                    // 返回布尔类型的值
                    result = String.valueOf(cell.getBooleanCellValue());
                } else if (cell.getCellType() == cell.CELL_TYPE_NUMERIC) {
                    // 返回数值类型的值
                    result = String.valueOf(cell.getNumericCellValue());
                } else if (cell.getCellType() == cell.CELL_TYPE_FORMULA) {
                    HSSFFormulaEvaluator evaluator = new HSSFFormulaEvaluator(workbook);
                    CellValue tempCellValue = evaluator.evaluate(cell);
                    double iCellValue = tempCellValue.getNumberValue();
                    result = String.valueOf(iCellValue);
                } else if (cell.getCellType() == cell.CELL_TYPE_ERROR) {

                } else if (cell.getCellType() == cell.CELL_TYPE_STRING) {
                    result = cell.getStringCellValue();
                }

                //处理经excel公式算出的值 // 返回经公式计算后的
                result = result.trim();
                result = result.replaceAll(" ","");
            }
        }catch (Exception e){
           // e.printStackTrace();
        }
        return result;
    }




    public static  void generateSqlfromExcel() {
        String filepath = "D:\\temp.xls";
        try {
            FileInputStream input = new FileInputStream(filepath);
            HSSFWorkbook workbook = new HSSFWorkbook(input);
            HSSFSheet sheet = workbook.getSheetAt(0); // 如果传入的sheet名不存在则默认指向第1个sheet.
            int rows = sheet.getPhysicalNumberOfRows();
            StringBuilder sb = new StringBuilder();
            String tablename = "";
            String tablecomment = "";
            if (rows > 0) { // 有数据时才处理
                boolean addtail = false;//add结尾
                for (int i = 0; i < rows; i++) {
                    HSSFRow row = sheet.getRow(i);
                    int startcol = -1;
                    String c1 = getCvalue(row, ++startcol, workbook);
                    String c2 = getCvalue(row, ++startcol, workbook);
                    String c3 = getCvalue(row, ++startcol, workbook);
                    String c4 = getCvalue(row, ++startcol, workbook);

                    if ((("".equals(c1)) && ("".equals(c2)) && ("".equals(c4)||(i==rows-1)))) {
                        if(addtail) {
                            sb.append(" PRIMARY KEY (`ID`)\n");
                            sb.append(")\n");
                            sb.append("COMMENT='" + tablecomment + "'\n");
                            sb.append("COLLATE='utf8_general_ci'\n");
                            sb.append("ENGINE=InnoDB\n");
                            sb.append("AUTO_INCREMENT=1;\n");
                            sb.append("\n\n");
                        }
                        addtail=false;
                        continue;
                    }
                    if (("字段名".equals(c1))) {
                        continue;
                    }
                    if ((!"".equals(c1)) && (!"".equals(c2)) && ("".equals(c4))) {
                        //一个表定义的开始
                        tablename = c2;
                        tablecomment = c1;
                        sb.append("drop table if exists `" + tablename + "`;\n");
                        sb.append("CREATE TABLE `" + tablename + "` (\n");
                        addtail=true;
                        continue;
                    }
                    String zdmc = c1;
                    String zdlx = c2;
                    String zdcd = c3;
                    if(!"".equals(zdcd)) {
                        try {
                            zdcd = (int) Double.parseDouble(zdcd) + "";
                        }catch (Exception e){

                        }
                    }
                    String sfwk = c4;
                    String sfzj = getCvalue(row, ++startcol, workbook);
                    String mrz = getCvalue(row, ++startcol, workbook);
                    String zdms = getCvalue(row, ++startcol, workbook);
                    String sl = getCvalue(row, ++startcol, workbook);
                    String bzxx = getCvalue(row, ++startcol, workbook);
                    String wk = "NOT NULL";
                    if (sfwk.equals("Y")) {
                        wk = "NULL";
                    }
                    String zj = "";
                    if (sfzj.equals("Y")) {
                        zj = "AUTO_INCREMENT";
                    }

                    if (!"".equals(mrz)) {
                        if(!"".equals(mrz)) {
                            mrz = (int) Double.parseDouble(mrz) + "";
                        }
                        mrz = "DEFAULT '" + mrz + "'";
                    }

                    if(!"".equals(zdcd)&&!"0".equals(zdcd)){
                        zdcd = "(" + zdcd + ") ";
                    }else{
                        zdcd="";
                    }

                    String temp = " `" + zdmc + "`" + " " + zdlx +zdcd +" "+ wk +" "+mrz+ " " + zj + " " + "COMMENT '" + zdms+""+bzxx + "',\n";
                    sb.append(temp);
                    //System.out.println(temp);
                }
            }
            System.out.println(sb.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        generateSqlfromExcel();

    }

}
