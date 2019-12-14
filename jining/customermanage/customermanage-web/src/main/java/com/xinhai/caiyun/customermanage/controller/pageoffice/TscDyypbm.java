package com.xinhai.caiyun.customermanage.controller.pageoffice;

import com.sun.jna.Native;
import com.sun.jna.win32.StdCallLibrary;

import java.io.UnsupportedEncodingException;
import java.util.Map;

public class TscDyypbm {
    private static String ypbm;
    private static String sjsj;
    private static Integer sl;

    public void setParmeter(Map map,Integer sl) {
        ypbm = map.get("ypbm").toString();
        sjsj = map.get("SYRQ").toString();
        sl=sl;
        /* try {*/
        System.setProperty("jna.encoding", "GBK");// 支持中文
        // TscLibDll.INSTANCE.about();
        TscLibDll.INSTANCE.openport("TSC TTP-244 Pro");
        // TscLibDll.INSTANCE.downloadpcx("C:\\UL.PCX", "UL.PCX");// 打印图片时需要先下载到设备
        // TscLibDll.INSTANCE.sendcommand("REM ***** This is a test by JAVA. *****");
        TscLibDll.INSTANCE.setup("60", "40", "5", "15", "0", "2", "0");
        TscLibDll.INSTANCE.sendcommand("SET TEAR ON");
        TscLibDll.INSTANCE.clearbuffer();
        // TscLibDll.INSTANCE.sendcommand("PUTPCX 550,10,\"UL.PCX\"");// 图片位置
        // TscLibDll.INSTANCE.printerfont("100", "50", "TSS24.BF2", "0", "1", "1", "Technology");
        // TscLibDll.INSTANCE.barcode("70", "140", "128", "90", "0", "0", "2", "2", "A123456789");// 打印内容，参数是位置和字体
        // TscLibDll.INSTANCE.windowsfont(15, 15, 40, 0, 2, 1, "Arial", "网络科技公司");
        TscLibDll.INSTANCE.windowsfont(40, 290, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
        TscLibDll.INSTANCE.windowsfont(430, 280, 32, 180, 0, 0, "Arial", "样品编码:"+ypbm);
        TscLibDll.INSTANCE.windowsfont(40, 217, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
        TscLibDll.INSTANCE.windowsfont(430, 207, 40, 180, 0, 0, "Arial", "待检   在检   已检   留样");
        TscLibDll.INSTANCE.windowsfont(40, 135, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
        TscLibDll.INSTANCE.windowsfont(95, 227, 40, 90, 0, 0, "Arial", "________");
        TscLibDll.INSTANCE.windowsfont(205, 227, 40, 90, 0, 0, "Arial", "________");
        TscLibDll.INSTANCE.windowsfont(310, 227, 40, 90, 0, 0, "Arial", "________");
        TscLibDll.INSTANCE.windowsfont(40, 58, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
        TscLibDll.INSTANCE.windowsfont(430, 58, 35, 180, 0, 0, "Arial", "抽(送)检时间:"+sjsj);
        TscLibDll.INSTANCE.windowsfont(40, 0, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");

        TscLibDll.INSTANCE.windowsfont(460, 10, 20, 270, 2, 0, "Arial", "_____________________________");
        TscLibDll.INSTANCE.windowsfont(60, 10, 20, 270, 2, 0, "Arial", "_____________________________");
        TscLibDll.INSTANCE.printlabel("1", sl+"");
        TscLibDll.INSTANCE.closeport();

       /* } catch (Exception e) {
        }*/
    }
    public interface TscLibDll extends StdCallLibrary {
        TscLibDll INSTANCE = (TscLibDll) Native.loadLibrary("TSCLIB", TscLibDll.class);

        int about();

        int openport(String pirnterName);

        int closeport();

        int sendcommand(String printerCommand);

        int setup(String width, String height, String speed, String density, String sensor, String vertical, String offset);

        int downloadpcx(String filename, String image_name);

        int barcode(String x, String y, String type, String height, String readable, String rotation, String narrow, String wide, String code);

        int printerfont(String x, String y, String fonttype, String rotation, String xmul, String ymul, String text);

        int clearbuffer();

        int printlabel(String set, String copy);

        int formfeed();

        int nobackfeed();

        int windowsfont(int x, int y, int fontheight, int rotation, int fontstyle, int fontunderline, String szFaceName, String content);
    }

    public static void main(String[] args) {
       /* try {*/
            System.setProperty("jna.encoding", "GBK");// 支持中文
            // TscLibDll.INSTANCE.about();
            TscLibDll.INSTANCE.openport("TSC TTP-244 Pro");
            // TscLibDll.INSTANCE.downloadpcx("C:\\UL.PCX", "UL.PCX");// 打印图片时需要先下载到设备
            // TscLibDll.INSTANCE.sendcommand("REM ***** This is a test by JAVA. *****");
            TscLibDll.INSTANCE.setup("60", "40", "5", "15", "0", "2", "0");
            TscLibDll.INSTANCE.sendcommand("SET TEAR ON");
            TscLibDll.INSTANCE.clearbuffer();
            // TscLibDll.INSTANCE.sendcommand("PUTPCX 550,10,\"UL.PCX\"");// 图片位置
            // TscLibDll.INSTANCE.printerfont("100", "50", "TSS24.BF2", "0", "1", "1", "Technology");
            // TscLibDll.INSTANCE.barcode("70", "140", "128", "90", "0", "0", "2", "2", "A123456789");// 打印内容，参数是位置和字体
            // TscLibDll.INSTANCE.windowsfont(15, 15, 40, 0, 2, 1, "Arial", "网络科技公司");
            TscLibDll.INSTANCE.windowsfont(40, 290, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
            TscLibDll.INSTANCE.windowsfont(430, 280, 32, 180, 0, 0, "Arial", "样品编码:"+ypbm);
            TscLibDll.INSTANCE.windowsfont(40, 217, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
            TscLibDll.INSTANCE.windowsfont(430, 207, 40, 180, 0, 0, "Arial", "待检   在检   已检   留样");
            TscLibDll.INSTANCE.windowsfont(40, 135, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
            TscLibDll.INSTANCE.windowsfont(95, 227, 40, 90, 0, 0, "Arial", "________");
            TscLibDll.INSTANCE.windowsfont(205, 227, 40, 90, 0, 0, "Arial", "________");
            TscLibDll.INSTANCE.windowsfont(310, 227, 40, 90, 0, 0, "Arial", "________");
            TscLibDll.INSTANCE.windowsfont(40, 58, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
            TscLibDll.INSTANCE.windowsfont(430, 58, 35, 180, 0, 0, "Arial", "抽(送)检时间:"+sjsj);
            TscLibDll.INSTANCE.windowsfont(40, 0, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");

            TscLibDll.INSTANCE.windowsfont(460, 10, 20, 270, 2, 0, "Arial", "_____________________________");
            TscLibDll.INSTANCE.windowsfont(60, 10, 20, 270, 2, 0, "Arial", "_____________________________");
            TscLibDll.INSTANCE.printlabel("1", sl+"");
            TscLibDll.INSTANCE.closeport();

       /* } catch (Exception e) {
        }*/
    }

    public static void main1(String[] args) throws UnsupportedEncodingException {
//    public void createQRcde() throws UnsupportedEncodingException {
        System.setProperty("jna.encoding", "GBK");// 支持中文
        // TscLibDll.INSTANCE.about();
        TscLibDll.INSTANCE.openport("TSC TTP-244 Pro");
        // TscLibDll.INSTANCE.downloadpcx("C:\\UL.PCX", "UL.PCX");// 打印图片时需要先下载到设备
        // TscLibDll.INSTANCE.sendcommand("REM ***** This is a test by JAVA. *****");
        TscLibDll.INSTANCE.setup("60", "40", "5", "15", "0", "2", "0");
        TscLibDll.INSTANCE.sendcommand("SET TEAR ON");
        TscLibDll.INSTANCE.clearbuffer();
        // TscLibDll.INSTANCE.sendcommand("PUTPCX 550,10,\"UL.PCX\"");// 图片位置
        // TscLibDll.INSTANCE.printerfont("100", "50", "TSS24.BF2", "0", "1", "1", "Technology");
        // TscLibDll.INSTANCE.barcode("70", "140", "128", "90", "0", "0", "2", "2", "A123456789");// 打印内容，参数是位置和字体
        // TscLibDll.INSTANCE.windowsfont(15, 15, 40, 0, 2, 1, "Arial", "网络科技公司");
        TscLibDll.INSTANCE.windowsfont(40, 290, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
        TscLibDll.INSTANCE.windowsfont(430, 280, 40, 180, 0, 0, "Arial", "样品编码:");
        TscLibDll.INSTANCE.windowsfont(40, 217, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
        TscLibDll.INSTANCE.windowsfont(430, 207, 40, 180, 0, 0, "Arial", "待检   在检   已检   留样");
        TscLibDll.INSTANCE.windowsfont(40, 135, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
        TscLibDll.INSTANCE.windowsfont(95, 227, 40, 90, 0, 0, "Arial", "________");
        TscLibDll.INSTANCE.windowsfont(205, 227, 40, 90, 0, 0, "Arial", "________");
        TscLibDll.INSTANCE.windowsfont(310, 227, 40, 90, 0, 0, "Arial", "________");
        TscLibDll.INSTANCE.windowsfont(40, 58, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");
        TscLibDll.INSTANCE.windowsfont(430, 58, 35, 180, 0, 0, "Arial", "抽(送)检时间:");
        TscLibDll.INSTANCE.windowsfont(40, 0, 10, 0, 2, 0, "Arial", "____________________________________________________________________________________________________");

        TscLibDll.INSTANCE.windowsfont(460, 10, 20, 270, 2, 0, "Arial", "_____________________________");
        TscLibDll.INSTANCE.windowsfont(60, 10, 20, 270, 2, 0, "Arial", "_____________________________");
        TscLibDll.INSTANCE.printlabel("1", "1");
        TscLibDll.INSTANCE.closeport();
    }
}

