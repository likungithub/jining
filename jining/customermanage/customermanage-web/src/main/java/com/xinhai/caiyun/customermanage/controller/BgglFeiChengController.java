package com.xinhai.caiyun.customermanage.controller;



import com.xinhai.caiyun.customermanage.api.*;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import com.zhuozhengsoft.pageoffice.*;
import com.zhuozhengsoft.pageoffice.excelwriter.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.awt.*;
import java.util.List;
import java.util.*;
import com.xinhai.caiyun.customermanage.dao.BgglFeiChengMapper;;

/**
 * @Author 单亮
 * @Description：
 * @Date: ${DATE} ${TIME}
 * @Modified By:
 */
@Controller
@RequestMapping("/bgglFc")
public class BgglFeiChengController {
    /**
     * 日志
     */
    private Logger logger = LogManager.getLogger(BgglFeiChengController.class.getName());

    @Autowired
    private BgglFeiChengMapper bgglFcMapper;

    @Autowired
    private SystemMessagesService systemMessagesService;

    public boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
    }

    //判空方法
    private String checkNull(Object obj)
    {
        return obj==null?" ":obj+" ";
    }


    //组装通用查询条件
    public Map getQueryTj(HttpServletRequest request) {
        String start = request.getParameter("start");
        String length = request.getParameter("length");

        Map cxtj = new HashMap();
        if (notNULL(start)) {
            cxtj.put("start", start);
        }

        if (notNULL(length)) {
            cxtj.put("length", length);
        }

        User u = CurrentLoginUser.getUser();
        String zydm = u.getZydm();
        cxtj.put("zydm", zydm);
        return cxtj;
    }



    private void setBorderStyle(Cell cell) {
        cell.getBorder().setBorderType(XlBorderType.xlAllEdges);
        cell.getBorder().setWeight(XlBorderWeight.xlThin);
        cell.getBorder().setLineColor(Color.black);
        cell.getFont().setSize(11);
    }


    private int setSheetData(Sheet sheet,List<Map> list,String[] lbtStr,String[] lxbStr,int firstrow,String bgjg)
    {
        int i = 0;
        int row=0;
        for (; i < list.size(); i++) {

            String jgStr = list.get(i).get("bg_dxpd")+"";
            if(!bgjg.equals("ALL"))
            {
                if(!jgStr.equals(bgjg))
                {
                    continue;
                }
            }
            sheet.openCell("A" + (row + firstrow)).setValue((row+1)+"");
            setBorderStyle(sheet.openCell("A" + (row + firstrow)));

            for(int j=0;j<lbtStr.length;j++)
            {
                String lbt = lbtStr[j];
                String xb = lxbStr[j];
                String lVal = checkNull(list.get(i).get(lbt));
                sheet.openCell(xb + (row + firstrow)).setValue(lVal);
                setBorderStyle(sheet.openCell(xb + (row + firstrow)));
            }
            row++;
        }
        return i;
    }

    // 报告打印——抽检汇总表 肥城用
    @RequestMapping(value = "/bgdyfeicheng/cjhzblist")
    public String cjhzblist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        String ypmc = request.getParameter("ypmc");
        String ypbm = request.getParameter("ypbm");
        String ny = request.getParameter("ny");
        String dylx= request.getParameter("dylx");//打印类型  cjhz 抽样汇总  hghx  bghhz
        if (notNULL(ypbm)) {
            cxtj.put("ypbm", ypbm);
        }
        cxtj.put("zydm", CurrentLoginUser.getUser().getZydm());
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
        if (notNULL(ny)) {
            cxtj.put("ny", ny);
        }

        String yf="";
        String year = "";
        if (ny != null && !"".equals(ny)) {
            String[] ym = ny.split("-");
            if (ym.length > 1) {
                String y = ym[0];
                String m = ym[1];
                year=y;
                yf=m;
            }
        } else if (ypbm != null && !"".equals(ypbm)) {
            int yindex = ypbm.indexOf("20"); //取得20所在index，即为年的索引值
            if (ypbm.length() >= yindex + 5) {
                String ym = ypbm.substring(yindex, yindex + 6);
                String y = ym.substring(0, 4);
                String m = ym.substring(4);
                year=y;
                yf=m;
            }
        }
        //抽样汇总表  直接 生成Excel即可
        List<Map> list = bgglFcMapper.getCyhzb(cxtj);
        Workbook wb = new Workbook();
        int firstrow =4;//数据起始的行从1开始数
        String xlsName = "";
        if(dylx!=null && (dylx.equals("cjhz") || dylx.equals("hghz"))) //汇总 或者 合格
        {
            ////////////////////合格
            xlsName="cyhgbFC.xlsx";
            //数据字段 列标题
            String[] lbtHgStr={"bgbh","cybh","ypmc","sb","scrq","ggxh","bcydw","bcydwdz","scqymc","scqydz","fl","jyxm","bg_dxpd"};
            //Excel里的列下标
            //第一列A有序号，所以从B开始填充
            String[] lxbHgStr={"B","C","D","E","F","G","H","I","J","K","L","M","N" };
            Sheet sheetHg = wb.openSheet("合格");
            sheetHg.openCell("A1").setValue("肥城市食品药品监督管理局"+ year +"年"+ yf +"月份监督抽检合格汇总表--山东天元盈康检测评价技术有限公司" );
            this.setSheetData(sheetHg,list,lbtHgStr,lxbHgStr,firstrow,"合格");
        }

        if(dylx!=null && (dylx.equals("cjhz") || dylx.equals("bhghz")))//汇总或者不合格
        {
            ////////////////////不合格
            xlsName="cybhgbFC.xlsx";
            //数据字段 列标题
            String[] lbtBHgStr={"bgbh","cybh","ypmc","sb","scrq","ggxh","bcydw","bcydwdz","scqymc","scqydz","fl","jyxm","bg_dxpd","bhgxm","xlz","jcz"};
            //Excel里的列下标
            //第一列A有序号，所以从B开始填充
            String[] lxbBHgStr={"B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q" };
            Sheet sheetBhg = wb.openSheet("不合格");
            sheetBhg.openCell("A1").setValue("肥城市食品药品监督管理局"+ year +"年"+ yf +"月份监督抽检不合格结果汇总表--山东天元盈康检测评价技术有限公司" );
            this.setSheetData(sheetBhg,list,lbtBHgStr,lxbBHgStr,firstrow,"不合格");
        }

        if(dylx!=null && dylx.equals("cjhz"))//汇总
        {
            ////////////////////总表
            xlsName="cyhzbFC.xlsx";
            //数据字段 列标题
            String[] lbtZbStr={"bgbh","cybh","ypmc","yzjl","rwly","bz"};
            //Excel里的列下标
            //第一列A有序号，所以从B开始填充
            String[] lxbZbStr={"B","C","D","E","F","G","H" };
            Sheet sheetZb = wb.openSheet("总表");
            sheetZb.openCell("A1").setValue("济宁市食品药品检验检测中心" );

            this.setSheetData(sheetZb,list,lbtZbStr,lxbZbStr,firstrow,"ALL");
        }

        PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
        //添加保存按钮
        poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        //设置保存页面
        poCtrl.setSaveFilePage(request.getContextPath() + "savefile.do");
        poCtrl.setWriter(wb);
        //打开excel
        poCtrl.webOpen("/customermanage/doc/"+xlsName, OpenModeType.xlsNormalEdit, "admin");
        return "pageoffice/Excel";
    }

    private int addSheetDate(Sheet sheet,List<Map> list,String[] lbtStr,String[] lxbStr,int firstrow)
    {
        int i = 0;
        int row=0;
        for (; i < list.size(); i++) {

            sheet.openCell("A" + (row + firstrow)).setValue((row+1)+"");
            setBorderStyle(sheet.openCell("A" + (row + firstrow)));

            for(int j=0;j<lbtStr.length;j++)
            {
                String lbt = lbtStr[j];
                String xb = lxbStr[j];
                String lVal = checkNull(list.get(i).get(lbt));
                sheet.openCell(xb + (row + firstrow)).setValue(lVal);
                setBorderStyle(sheet.openCell(xb + (row + firstrow)));
            }
            row++;
        }
        return i;
    }

    //20190815政府委托界面添加表格导出
    @RequestMapping(value="zfwt/daoChuBiao")
    public String daoChuBiao(HttpServletRequest request){
        String wtid = request.getParameter("ypids");
        Map cxtj = new HashMap();

//        if(wtid!=null)
//        {
//            wtid = wtid.replaceAll(",","','");
//        }


        if (notNULL(wtid)) {
            cxtj.put("ids", wtid);
        }
        List<Map> list = bgglFcMapper.getZfCyWtdList(cxtj);
        Workbook wb = new Workbook();
        int firstrow =4;//数据起始的行从1开始数
        String xlsName = "";

            ////////////////////合格
            xlsName="cydhz.xlsx";
            //数据字段 列标题
            String[] lbtHgStr={"YPBM","YPMC","SYRQ","RKRQ","YPSL","YPBCTJ","THL","QRSJ","CLDH","BZ"};
            //Excel里的列下标
            //第一列A有序号，所以从B开始填充
            String[] lxbHgStr={"B","C","D","E","F","G","H","I","J","K"};
            Sheet sheetHg = wb.openSheet("抽样单汇总");
            this.addSheetDate(sheetHg,list,lbtHgStr,lxbHgStr,firstrow);
        PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
        //添加保存按钮
        poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        //设置保存页面
//        poCtrl.setSaveFilePage(request.getContextPath() + "savefile.do");
        poCtrl.setWriter(wb);
        //打开excel
        poCtrl.webOpen("/customermanage/doc/"+xlsName, OpenModeType.xlsNormalEdit, "admin");

        return "pageoffice/Excel";
    }

    /**
     * 省抽用
     * @param sheet
     * @param list
     * @param lbtStr
     * @param lxbStr
     * @param firstrow
     * @return
     */
    private int addSheetDateSc(Sheet sheet,List<Map> list,String[] lbtStr,String[] lxbStr,int firstrow)
    {
        int i = 0;
        int row=0;
        String[] strnull={"F","M","N","R","S","AQ","AS","AT","AX","BB","BC","BD","BH","BS"};
        for (; i < list.size(); i++) {
            for(int j=0;j<lbtStr.length;j++)
            {
                String lbt = lbtStr[j];
                String xb = lxbStr[j];
                String lVal = checkNull(list.get(i).get(lbt));
                sheet.openCell(xb + (row + firstrow)).setValue(lVal);
                setBorderStyle(sheet.openCell(xb + (row + firstrow)));
            }
            for(int t=0;t<strnull.length;t++)
            {
                String cellBh = strnull[t];
                setBorderStyle(sheet.openCell(cellBh + (row + firstrow)));
            }
            row++;
        }
        return i;
    }
    //20190827 政府委托界面添加 导出 对接省抽Excel
    @RequestMapping(value="zfwt/daoChuSc")
    public String daoChuSc(HttpServletRequest request){
        String wtid = request.getParameter("ypids");
        Map cxtj = new HashMap();


        if (notNULL(wtid)) {
            cxtj.put("ids", wtid);
        }
        List<Map> list = bgglFcMapper.getZfDcCydList(cxtj);
        Workbook wb = new Workbook();
        int firstrow =3;//数据起始的行从1开始数
        String xlsName = "";

        ////////////////////合格
        xlsName="drscmb.xls";
        //数据字段 列标题
        String[] lbtHgStr={"YPBM","JYLB","CYHJ","CYDD","IF_BY","CYRY","cydwlxdh","CYRQ","SJDW","BCJDWDZ","QYLX","YYZZH","FRDB","NXSE","BCJDWLXR","BCJDWYDDH","BCJDWCZ","BCJDWYB","YPMC","YPLAIYUAN","CYFANGSHI","YPSHUXING","YPLEIXIN","SB","YPPHHBH","RQLXXZ","RQLXXZRQ","BZQ","YPZXBZ","GGXH","YPDJ","SCXKBH","YPDANJIA","IF_CK","YBJS","YPSL","BYSL","YPBGFL","YPXT","YPBCTJ","CCWD","CCSD","CYYPBZ","JSYPJZRQ","SCDW","SCDZ","SCDWLXDH","CYDW","CYDWXXDZ","CYDWLXR","CYDWLXDH","EMAIL","CZ","CYDWYB","if_ztc","cydwjb","cydwlxdh"};
        //Excel里的列下标
        //第一列A有序号，所以从B开始填充
        String[] lxbHgStr={"A","B","C","D","E","G","H","I","K","L","O","P","Q","T","U","V","W","X","Y","Z","AA","AB","AC","AD","AE","AF","AG","AH","AI","AJ","AK","AL","AM","AN","AO","AP","AR","AU","AV","AW","AY","AZ","BA","BE","BF","BG","BI","BJ","BL","BM","BN","BP","BQ","BR","J","BK","BO"};
        Sheet sheetHg = wb.openSheet("batchImportSampleInfo");
        this.addSheetDateSc(sheetHg,list,lbtHgStr,lxbHgStr,firstrow);
        PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
        //添加保存按钮
        poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        //设置保存页面
//        poCtrl.setSaveFilePage(request.getContextPath() + "savefile.do");
        poCtrl.setWriter(wb);
        //打开excel
        poCtrl.webOpen("/customermanage/doc/"+xlsName, OpenModeType.xlsNormalEdit, "admin");

        return "pageoffice/Excel";
    }

}
