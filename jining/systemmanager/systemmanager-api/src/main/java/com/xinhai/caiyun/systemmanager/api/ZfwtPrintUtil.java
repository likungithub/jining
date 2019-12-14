package com.xinhai.caiyun.systemmanager.api;

import com.sun.jna.Native;
import com.sun.jna.win32.StdCallLibrary;

import java.util.Map;

public class ZfwtPrintUtil {
    private static String yplx;
    private static String ypbm;
    private static String ypmc;
    private static String lx;
    private static String ypzxbz;

    public interface TscLibDll extends StdCallLibrary {
        TscPrintUtil.TscLibDll INSTANCE = (TscPrintUtil.TscLibDll) Native.loadLibrary("TSCLIB", TscPrintUtil.TscLibDll.class);

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

    public void setParmeter(Map map) {
        yplx = map.get("yplx")+"";
        ypbm = map.get("ypbm")+"";
        ypmc = map.get("ypmc")+"";
        lx = map.get("lx")+"";
        ypzxbz = (String)map.get("ypzxbz");
        main(null);
    }

    ;

    public static void main(String[] args) {
        try {
            System.setProperty("jna.encoding", "GBK");// 支持中文
            TscLibDll.INSTANCE.openport("TSC TTP-244 Pro");
            TscLibDll.INSTANCE.setup("60", "40", "5", "15", "0", "2", "0");
            TscLibDll.INSTANCE.sendcommand("SET TEAR ON");
            TscLibDll.INSTANCE.clearbuffer();

            /*String command = "QRCODE 340,50,L,6,A,0,M2,S3,\"" + ypbm + "\"";// 打印二维码
            TscLibDll.INSTANCE.sendcommand(command);*/

//            TscLibDll.INSTANCE.windowsfont(175, 15, 50, 0, 2, 0, "Arial", yplx);
            if (ypzxbz == null) {
                TscLibDll.INSTANCE.windowsfont(40, 15, 40, 0, 2, 0, "Arial", "即墨综合检验检测中心");
            } else {
                TscLibDll.INSTANCE.windowsfont(40, 15, 40, 0, 2, 0, "Arial", ypzxbz);
            }
            TscLibDll.INSTANCE.windowsfont(40, 70, 32, 0, 2, 0, "Arial", "样品编码:");
            TscLibDll.INSTANCE.windowsfont(170, 70, 32, 0, 2, 0, "Arial", ypbm);
            TscLibDll.INSTANCE.windowsfont(40, 110, 32, 0, 2, 0, "Arial", "样品名称:");
            TscLibDll.INSTANCE.windowsfont(170, 110, 32, 0, 2, 0, "Arial", ypmc);
            TscLibDll.INSTANCE.windowsfont(40, 150, 32, 0, 2, 0, "Arial", lx+":");
            TscLibDll.INSTANCE.windowsfont(120, 150, 32, 0, 2, 0, "Arial", yplx);
            TscLibDll.INSTANCE.barcode("40", "190", "128", "90", "1", "0", "2", "2", ypbm);
            TscLibDll.INSTANCE.printlabel("1", "1");
            TscLibDll.INSTANCE.closeport();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
