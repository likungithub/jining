package com.xinhai.caiyun.systemmanager.api;

import com.sun.jna.Native;
import com.sun.jna.win32.StdCallLibrary;

import java.util.Map;

public class TscPrintUtil {
    private static String hcmc;
    private static String hcbm;
    private static String gg;
    private static String jb;
    private static String sl;

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

    public void setParmeter(Map map) {
        hcmc = map.get("hcmc")+"";
        hcbm = map.get("hcbm")+"";
        gg = map.get("gg")+"";
        jb = map.get("jb")+"";
        try {
            sl=map.get("sl")+"";
        }catch (Exception e){
            sl="1";
        }
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
            String command = "QRCODE 340,50,L,6,A,0,M2,S3,\"" + hcbm + "\"";// 打印二维码
            TscLibDll.INSTANCE.sendcommand(command);
            TscLibDll.INSTANCE.windowsfont(40, 15, 40, 0, 2, 0, "Arial", "即墨检验检测中心");
            TscLibDll.INSTANCE.windowsfont(40, 70, 32, 0, 2, 0, "Arial", "名称:");
            TscLibDll.INSTANCE.windowsfont(120, 70, 32, 0, 2, 0, "Arial", hcmc);
            TscLibDll.INSTANCE.windowsfont(40, 110, 32, 0, 2, 0, "Arial", "规格:");
            TscLibDll.INSTANCE.windowsfont(120, 110, 32, 0, 2, 0, "Arial", gg);
            TscLibDll.INSTANCE.windowsfont(40, 150, 32, 0, 2, 0, "Arial", "级别:");
            TscLibDll.INSTANCE.windowsfont(120, 150, 32, 0, 2, 0, "Arial", jb);
            TscLibDll.INSTANCE.barcode("40", "190", "128", "90", "1", "0", "2", "2", hcbm);
            TscLibDll.INSTANCE.printlabel(sl, "1");
            TscLibDll.INSTANCE.closeport();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
