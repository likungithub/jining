package com.xinhai.caiyun.customermanage.controller;

import com.xinhai.caiyun.customermanage.dao.BgglMapper;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.util.CellRangeAddress;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class ExportExcel {
    private String title;
    //导出表的列名
    private String[] rowName ;

    private List<Object[]>  dataList = new ArrayList<Object[]>();
    private BgglMapper bgglMapper;

    HttpServletResponse  response;
    HttpServletRequest request;
    FileOutputStream fileOut = null;
    BufferedImage bufferImg = null;

    //构造方法，传入要导出的数据
    public ExportExcel(String title, String[] rowName, List<Object[]>  dataList, HttpServletResponse response, BgglMapper bgglMapper,HttpServletRequest request){
        this.dataList = dataList;
        this.rowName = rowName;
        this.title = title;
        this.response=response;
        this.bgglMapper=bgglMapper;
        this.request=request;
    }

    /*
     * 导出数据
     */
    public void export(OutputStream out) throws Exception {
       /* try {*/
            HSSFWorkbook workbook = new HSSFWorkbook(); // 创建工作簿对象
            HSSFSheet sheet = workbook.createSheet(title); // 创建工作表
            // 产生表格标题行
            HSSFRow rowm = sheet.createRow(0);
            HSSFCell cellTiltle = rowm.createCell(0);

            // sheet样式定义【getColumnTopStyle()/getStyle()均为自定义方法 - 在下面 - 可扩展】
            HSSFCellStyle columnTopStyle = this.getColumnTopStyle(workbook);// 获取列头样式对象
            HSSFCellStyle style = this.getStyle(workbook); // 单元格样式对象
            /*
             * sheet.addMergedRegion(new
             * CellRangeAddress(0,dataList.get(0).length-1 , 0,
             * (rowName.length-1)));
             */// 合并单元格
        if (dataList.size() > 0) {
            sheet.addMergedRegion(new CellRangeAddress(0, 1, 0,
                    dataList.get(0).length - 1));// 列行
        }
            cellTiltle.setCellStyle(style);
            cellTiltle.setCellValue(title);

            // 定义所需列数
            int columnNum = rowName.length;
            HSSFRow rowRowName = sheet.createRow(2); // 在索引2的位置创建行(最顶端的行开始的第二行)

            // 将列头设置到sheet的单元格中
            for (int n = 0; n < columnNum; n++) {
                HSSFCell cellRowName = rowRowName.createCell(n); // 创建列头对应个数的单元格
                cellRowName.setCellType(HSSFCell.CELL_TYPE_STRING); // 设置列头单元格的数据类型
                HSSFRichTextString text = new HSSFRichTextString(rowName[n]);
                cellRowName.setCellValue(text); // 设置列头单元格的值

                cellRowName.setCellStyle(columnTopStyle); // 设置列头单元格样式
            }

            // 将查询出的数据设置到sheet对应的单元格中
            for (int i = 0; i < dataList.size(); i++) {

                Object[] obj = dataList.get(i);// 遍历每个对象
                HSSFRow row = sheet.createRow(i + 3);// 创建所需的行数（从第三行开始写数据）
                for (int j = 0; j < obj.length; j++) {
                    HSSFCell cell = null; // 设置单元格的数据类型
                    if (j == 0) {
                        cell = row.createCell(j, HSSFCell.CELL_TYPE_NUMERIC);
                        cell.setCellValue(i);
                    } else {
                        cell = row.createCell(j, HSSFCell.CELL_TYPE_STRING);
                        if (j==7){
                            cell.setCellValue("");
                            String names []  = obj[j].toString().split(",");
                            int imagewidth = 1013/names.length;
                            for (int a=0;a<names.length;a++){
                                insertImage(names[a],sheet,workbook,a*imagewidth,10,imagewidth*(a+1)+10,255,(short)j,i+3,(short)j,i+3);
                            }
                        }else {
                            if (obj[j] != null) {
                                cell.setCellValue(obj[j].toString());
                            }
                        }
                    }
                    cell.setCellStyle(style); // 设置单元格样式
                }

                sheet.addMergedRegion(new CellRangeAddress(2,3,0,0));
                sheet.addMergedRegion(new CellRangeAddress(2,3,1,1));
                sheet.addMergedRegion(new CellRangeAddress(2,3,2,2));
                sheet.addMergedRegion(new CellRangeAddress(2,3,3,3));
                sheet.addMergedRegion(new CellRangeAddress(2,2,4,6));
                sheet.addMergedRegion(new CellRangeAddress(2,3,7,7));
                sheet.addMergedRegion(new CellRangeAddress(2,3,8,8));
                sheet.addMergedRegion(new CellRangeAddress(2,3,9,9));
                // 让列宽随着导出的列长自动适应
                for (int colNum = 0; colNum < dataList.get(1).length; colNum++) {
                    int columnWidth = sheet.getColumnWidth(colNum) / 256;
                    for (int rowNum = 0; rowNum < sheet.getLastRowNum(); rowNum++) {
                        HSSFRow currentRow;
                        // 当前行未被使用过
                        if (sheet.getRow(rowNum) == null) {
                            currentRow = sheet.createRow(rowNum);
                        } else {
                            currentRow = sheet.getRow(rowNum);
                        }
                        /*
                         * if (currentRow.getCell(colNum) != null) { HSSFCell
                         * currentCell = currentRow.getCell(colNum); if
                         * (currentCell.getCellType() == HSSFCell.CELL_TYPE_STRING)
                         * { int length =
                         * currentCell.getStringCellValue().getBytes().length; if
                         * (columnWidth < length) { columnWidth = length; } } }
                         */
                        if (currentRow.getCell(colNum) != null) {
                            HSSFCell currentCell = currentRow.getCell(colNum);
                            if (currentCell.getCellType() == HSSFCell.CELL_TYPE_STRING) {
                                int length = 0;
                                try {
                                    length = currentCell.getStringCellValue()
                                            .getBytes().length;
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                                if (columnWidth < length) {
                                    columnWidth = length;
                                }
                            }
                        }

                    }
                    if (colNum == 0) {
                        sheet.setColumnWidth(colNum, (columnWidth - 2) * 256);
                    } else {
                        sheet.setColumnWidth(colNum, (columnWidth + 4) * 256);
                    }
                }
            }
            if (workbook != null) {
                try {
                    workbook.write(out);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

       /* } catch (Exception e) {
            e.printStackTrace();
        } finally {
            out.close();
        }*/

    }

    /*
     * 列头单元格样式
     */
    public HSSFCellStyle getColumnTopStyle(HSSFWorkbook workbook) {

        // 设置字体
        HSSFFont font = workbook.createFont();
        // 设置字体大小
        font.setFontHeightInPoints((short) 11);
        // 字体加粗
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        // 设置字体名字
        font.setFontName("Courier New");
        // 设置样式;
        HSSFCellStyle style = workbook.createCellStyle();
        // 设置底边框;
        style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        // 设置底边框颜色;
        style.setBottomBorderColor(HSSFColor.BLACK.index);
        // 设置左边框;
        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        // 设置左边框颜色;
        style.setLeftBorderColor(HSSFColor.BLACK.index);
        // 设置右边框;
        style.setBorderRight(HSSFCellStyle.BORDER_THIN);
        // 设置右边框颜色;
        style.setRightBorderColor(HSSFColor.BLACK.index);
        // 设置顶边框;
        style.setBorderTop(HSSFCellStyle.BORDER_THIN);
        // 设置顶边框颜色;
        style.setTopBorderColor(HSSFColor.BLACK.index);
        // 在样式用应用设置的字体;
        style.setFont(font);
        // 设置自动换行;
        style.setWrapText(false);
        // 设置水平对齐的样式为居中对齐;
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        // 设置垂直对齐的样式为居中对齐;
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

        return style;

    }

    /*
     * 列数据信息单元格样式
     */
    public HSSFCellStyle getStyle(HSSFWorkbook workbook) {
        // 设置字体
        HSSFFont font = workbook.createFont();
        // 设置字体大小
        // font.setFontHeightInPoints((short)10);
        // 字体加粗
        // font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        // 设置字体名字
        font.setFontName("Courier New");
        // 设置样式;
        HSSFCellStyle style = workbook.createCellStyle();
        // 设置底边框;
        style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        // 设置底边框颜色;
        style.setBottomBorderColor(HSSFColor.BLACK.index);
        // 设置左边框;
        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        // 设置左边框颜色;
        style.setLeftBorderColor(HSSFColor.BLACK.index);
        // 设置右边框;
        style.setBorderRight(HSSFCellStyle.BORDER_THIN);
        // 设置右边框颜色;
        style.setRightBorderColor(HSSFColor.BLACK.index);
        // 设置顶边框;
        style.setBorderTop(HSSFCellStyle.BORDER_THIN);
        // 设置顶边框颜色;
        style.setTopBorderColor(HSSFColor.BLACK.index);
        // 在样式用应用设置的字体;
        style.setFont(font);
        // 设置自动换行;
        style.setWrapText(false);
        // 设置水平对齐的样式为居中对齐;
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        // 设置垂直对齐的样式为居中对齐;
        style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

        return style;

    }
    //插入图片
    public void insertImage(String obj,HSSFSheet sheet,HSSFWorkbook workbook,int dx1,int dy1,int dx2,int dy2,short co1,int row1,short co2,int ro2){
        try {
            String imageurl = this.bgglMapper.getDzqz(obj+"");
            ByteArrayOutputStream byteArrayOut = new ByteArrayOutputStream();
            String ul = request.getSession().getServletContext().getRealPath("/")+imageurl;
            bufferImg = ImageIO.read(new File(request.getSession().getServletContext().getRealPath("/")+"/"+imageurl));
            ImageIO.write(bufferImg, "png", byteArrayOut);
            //画图的顶级管理器，一个sheet只能获取一个
            HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
            //anchor主要用于设置图片的属性
            HSSFClientAnchor anchor = new HSSFClientAnchor(dx1, dy1, dx2, dy2,co1, row1, co2,ro2 );
            //插入图片
            patriarch.createPicture(anchor, workbook.addPicture(byteArrayOut.toByteArray(), HSSFWorkbook.PICTURE_TYPE_JPEG));
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
