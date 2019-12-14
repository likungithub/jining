package com.xinhai.caiyun.customermanage.controller;


import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfContentByte;
//import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;
import com.lowagie.text.BadElementException;


import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.data.RowRenderData;
import com.deepoove.poi.data.TextRenderData;
import com.deepoove.poi.data.style.Style;
import com.lowagie.text.Document;
import com.lowagie.text.pdf.PdfCopy;
import com.lowagie.text.pdf.PdfReader;
//import com.sun.xml.internal.xsom.impl.scd.Iterators;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.commonmanager.api.RedisClinet;
import com.xinhai.caiyun.customermanage.api.*;
import com.xinhai.caiyun.customermanage.controller.pageoffice.*;
import com.xinhai.caiyun.customermanage.controller.poitl.LzdglController;
import com.xinhai.caiyun.customermanage.dao.BgglMapper;
import com.xinhai.caiyun.customermanage.dao.TqywtMapper;
import com.xinhai.caiyun.systemmanager.api.ExcelBean;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import com.zhuozhengsoft.pageoffice.*;
import com.zhuozhengsoft.pageoffice.excelwriter.*;
import com.zhuozhengsoft.pageoffice.wordwriter.DataRegion;
import com.zhuozhengsoft.pageoffice.wordwriter.DataRegionInsertType;
import com.zhuozhengsoft.pageoffice.wordwriter.Table;
import com.zhuozhengsoft.pageoffice.wordwriter.WordDocument;
import jdk.nashorn.internal.runtime.Undefined;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.bind.annotation.*;
import service.KcglService;
import sun.security.util.Length;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;

/**
 * @Author 单亮
 * @Description：
 * @Date: ${DATE} ${TIME}
 * @Modified By:
 */
@Controller
@RequestMapping("/bggl")
public class BgglController {
    /**
     * 日志
     */
    private Logger logger = LogManager.getLogger(BgglController.class.getName());

    @Autowired
    private BgglService bgglService;

    @Autowired
    TransactionTemplate txTemplate;
    @Autowired
    private BgglMapper bgglMapper;

    @Autowired
    private TqywtMapper tqywtMapper;

    @Autowired
    private KcglService kcglService;

    @Autowired
    private SystemMessagesService systemMessagesService;

    @Autowired
    private RedisClinet redisClinet;

    public boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
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


    //报告分配
    @RequestMapping(value = "/bgfp/querylist", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage bgfp_querylist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        cxtj.put("bs", "bgfp");
        String ypmc = request.getParameter("ypmc");
        String ypbm = request.getParameter("ypbm");
        String ifsgr = request.getParameter("ifsgr");
        /*  cxtj.put("zydm", CurrentLoginUser.getUser().getZydm());*/
        cxtj.remove("zydm");
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
        if (notNULL(ypbm)) {
            cxtj.put("ypbm", ypbm);
        }
        if (notNULL(ifsgr)) {
            cxtj.put("ifsgr", ifsgr);
        }
        List<Map> list = bgglService.findAll(cxtj);
        long totalCount = bgglService.findCount(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }


    //报告编制
    @RequestMapping(value = "/querylist", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage querylist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        //rwfplb
        cxtj.put("bs", "bgbz");
        String ypmc = request.getParameter("ypmc");
        String ypbm = request.getParameter("ypbm");
        String wtdw = request.getParameter("wtdw");
        String bgzt = request.getParameter("bgzt");
        if (notNULL(ypbm)) {
            cxtj.put("ypbm", ypbm);
        }
        cxtj.put("zydm", CurrentLoginUser.getUser().getZydm());
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
        if (notNULL(wtdw)) {
            cxtj.put("wtdw", wtdw);
        }
//        if (notNULL(bgzt)) {
            cxtj.put("bgzt", bgzt);
//        }
        String htmc = request.getParameter("htmc");

        if (notNULL(htmc)) {
            cxtj.put("htmc", htmc);
        }
        String startDate1 = request.getParameter("startDate");
        if (notNULL(startDate1)) {
            try {
                Date startDate = sf.parse(startDate1);
                cxtj.put("startDate", startDate);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        String endDate1 = request.getParameter("endDate");
        if (notNULL(endDate1)) {
            try {
                Date endDate = sf.parse(endDate1);
                cxtj.put("endDate", endDate);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        long totalCount = bgglService.findCount(cxtj);
        List<Map> list = bgglService.findAll(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }


    @RequestMapping(value = "/bgbz/querylist", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage ypjc_querylist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        //rwfplb
        cxtj.put("bs", "ypjc");
        String ypmc = request.getParameter("ypmc");
        cxtj.put("zydm", CurrentLoginUser.getUser().getZydm());
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
        long totalCount = bgglService.findCount(cxtj);
        List<Map> list = bgglService.findAll(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    //报告制表
    @RequestMapping(value = "/bgzb/querylist", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage bgzb_querylist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        cxtj.put("bs", "bgzb");
        String ypmc = request.getParameter("ypmc");
        cxtj.put("zydm", CurrentLoginUser.getUser().getZydm());
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
        String htmc = request.getParameter("htmc");
        if (notNULL(htmc)) {
            cxtj.put("htmc", htmc);
        }
        String startDate1 = request.getParameter("startDate");
        if (notNULL(startDate1)) {
            try {
                Date startDate = sf.parse(startDate1);
                cxtj.put("startDate", startDate);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        String endDate1 = request.getParameter("endDate");
        if (notNULL(endDate1)) {
            try {
                Date endDate = sf.parse(endDate1);
                cxtj.put("endDate", endDate);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        long totalCount = bgglService.findCount(cxtj);
        List<Map> list = bgglService.findAll(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }


    //报告主检审批
    @RequestMapping(value = "/bgzjsp/querylist", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage bgzjsp_querylist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        cxtj.put("bs", "bgzjsp");
        String ypmc = request.getParameter("ypmc");
        String ypbm = request.getParameter("ypbm");
        if (notNULL(ypbm)) {
            cxtj.put("ypbm", ypbm);
        }
        cxtj.put("zydm", CurrentLoginUser.getUser().getZydm());
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
        String htmc = request.getParameter("htmc");
        if (notNULL(htmc)) {
            cxtj.put("htmc", htmc);
        }
        String startDate1 = request.getParameter("startDate");
        if (notNULL(startDate1)) {
            try {
                Date startDate = sf.parse(startDate1);
                cxtj.put("startDate", startDate);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        String endDate1 = request.getParameter("endDate");
        if (notNULL(endDate1)) {
            try {
                Date endDate = sf.parse(endDate1);
                cxtj.put("endDate", endDate);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        long totalCount = bgglService.findCount(cxtj);
        List<Map> list = bgglService.findAll(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    //报告审核
    @RequestMapping(value = "/bgsh/querylist", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage bgsh_querylist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        cxtj.put("bs", "bgsh");
        String ypmc = request.getParameter("ypmc");
        String ypbm = request.getParameter("ypbm");
        String bgzt = request.getParameter("bgzt");
        if (notNULL(ypbm)) {
            cxtj.put("ypbm", ypbm);
        }
        cxtj.put("zydm", CurrentLoginUser.getUser().getZydm());
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
        String htmc = request.getParameter("htmc");
        if (notNULL(htmc)) {
            cxtj.put("htmc", htmc);
        }
        if (notNULL(bgzt)) {
            cxtj.put("bgzt", bgzt);
        }
        String startDate1 = request.getParameter("startDate");
        if (notNULL(startDate1)) {
            try {
                Date startDate = sf.parse(startDate1);
                cxtj.put("startDate", startDate);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        String endDate1 = request.getParameter("endDate");
        if (notNULL(endDate1)) {
            try {
                Date endDate = sf.parse(endDate1);
                cxtj.put("endDate", endDate);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        long totalCount = bgglService.findCount(cxtj);
        List<Map> list = bgglService.findAll(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    //报告批准
    @RequestMapping(value = "/bgpz/querylist", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage sjsc_querylist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        cxtj.put("bs", "bgpz");
        String ypmc = request.getParameter("ypmc");
        String ypbm = request.getParameter("ypbm");
        String ypzt = request.getParameter("ypzt");
        if (notNULL(ypbm)) {
            cxtj.put("ypbm", ypbm);
        }
        if (notNULL(ypzt)) {
            cxtj.put("ypzt", ypzt);
        }
        cxtj.put("zydm", CurrentLoginUser.getUser().getZydm());
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
        String htmc = request.getParameter("htmc");
        if (notNULL(htmc)) {
            cxtj.put("htmc", htmc);
        }
        String startDate1 = request.getParameter("startDate");
        if (notNULL(startDate1)) {
            try {
                Date startDate = sf.parse(startDate1);
                cxtj.put("startDate", startDate);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        String endDate1 = request.getParameter("endDate");
        if (notNULL(endDate1)) {
            try {
                Date endDate = sf.parse(endDate1);
                cxtj.put("endDate", endDate);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        long totalCount = bgglService.findCount(cxtj);
        List<Map> list = bgglService.findAll(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    //报告打印
    @RequestMapping(value = "/bgdy/querylist", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage sjxg_querylist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        cxtj.put("bs", "bgdy");
        String ypmc = request.getParameter("ypmc");
        String ypbm = request.getParameter("ypbm");
        String ny = request.getParameter("ny");
        //杨
        String wtdw = request.getParameter("wtdw");
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
        if (notNULL(wtdw)) {
            cxtj.put("wtdw", wtdw);
        }
        long totalCount = bgglService.findCount(cxtj);
        List<Map> list = bgglService.findAll(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    //检测报告交接单打印
    @RequestMapping(value = "/bgdyjjd/jjdlist")
    public String jjdlist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        cxtj.put("bs", "bgdyjjd");
        String ypmc = request.getParameter("ypmc");
        String ypbm = request.getParameter("ypbm");
        String ny = request.getParameter("ny");
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

        List<Map> list = bgglService.findAllJjd(cxtj);

        Workbook wb = new Workbook();
        Sheet sheet = wb.openSheet("交接单");
        if (ny != null && !"".equals(ny)) {
            String[] ym = ny.split("-");
            if (ym.length > 1) {
                String y = ym[0];
                String m = ym[1];
                sheet.openCell("A1").setValue("即墨区食品药品监督管理局检测报告交接单（" + y + "年" + m + "月份）");
            }
        } else if (ypbm != null && !"".equals(ypbm)) {
            int yindex = ypbm.indexOf("20"); //取得20所在index，即为年的索引值
            if (ypbm.length() >= yindex + 5) {
                String ym = ypbm.substring(yindex, yindex + 6);
                String y = ym.substring(0, 4);
                String m = ym.substring(4);
                sheet.openCell("A1").setValue("即墨区食品药品监督管理局检测报告交接单（" + y + "年" + m + "月份）");
            }
        }
        int firstrow = 4;
        for (int i = 0; i < list.size(); i++) {

            sheet.openCell("A" + (i + firstrow)).setValue(String.valueOf(i + 1));

            String jylb = "jdjy".equals(String.valueOf(list.get(i).get("jylb"))) ? "监督抽检" : "风险监测";
            sheet.openCell("B" + (i + firstrow)).setValue(jylb);

            sheet.openCell("C" + (i + firstrow)).setValue(String.valueOf(list.get(i).get("bgscsj")));   //报告日期

            sheet.openCell("D" + (i + firstrow)).setValue(String.valueOf(list.get(i).get("YPBM"))); //报告编码（样品编码）

            sheet.openCell("E" + (i + firstrow)).setValue(String.valueOf(list.get(i).get("YPMC"))); //样品名称

            sheet.openCell("F" + (i + firstrow)).setValue(String.valueOf(list.get(i).get("sjdw"))); //被抽检单位名称

            sheet.openCell("G" + (i + firstrow)).setValue(String.valueOf(list.get(i).get("bcjdwdz")) + " "
                    + String.valueOf(list.get(i).get("bcjdwlxr")) + " "
                    + String.valueOf(list.get(i).get("bcjdwyddh"))); //生产经营地址/电话、联系人

            String jcxm =  list.get(i).get("JCXM")+"";
            String sl =  list.get(i).get("SL")+"";
            if(sl!=null && !sl.equals("1"))
            {
                sheet.openCell("H" + (i + firstrow)).setValue(jcxm + "等" + sl + "项"); //检测项目
            }else
            {
                sheet.openCell("H" + (i + firstrow)).setValue(jcxm); //检测项目
            }

//            if (jcxm != null && !"".equals(jcxm)) {
//                String[] array = jcxm.split(",");
//                if (array.length > 1) {
//                    sheet.openCell("H" + (i + firstrow)).setValue(array[0] + "等" + array.length + "项"); //检测项目
//                } else {
//                    sheet.openCell("H" + (i + firstrow)).setValue(String.valueOf(list.get(i).get("JCXM"))); //检测项目
//                }
//            }

                sheet.openCell("I" + (i + firstrow)).setValue(list.get(i).get("bgjl")+" "); //检测结果
                String ssd = list.get(i).get("SSD")==null?" ":list.get(i).get("SSD")+" ";
                sheet.openCell("J" + (i + firstrow)).setValue(ssd); //所属对

            String bzstr = list.get(i).get("BZ")==null?" ":list.get(i).get("BZ")+" ";
            sheet.openCell("K" + (i + firstrow)).setValue(bzstr);  //      备注

            setBorderStyle(sheet.openCell("A" + (i + firstrow)));
            setBorderStyle(sheet.openCell("B" + (i + firstrow)));
            setBorderStyle(sheet.openCell("C" + (i + firstrow)));
            setBorderStyle(sheet.openCell("D" + (i + firstrow)));
            setBorderStyle(sheet.openCell("E" + (i + firstrow)));
            setBorderStyle(sheet.openCell("F" + (i + firstrow)));
            setBorderStyle(sheet.openCell("G" + (i + firstrow)));
            setBorderStyle(sheet.openCell("H" + (i + firstrow)));
            setBorderStyle(sheet.openCell("I" + (i + firstrow)));
            setBorderStyle(sheet.openCell("J" + (i + firstrow)));
            setBorderStyle(sheet.openCell("K" + (i + firstrow)));
        }

        if (list.size() > 0) {
            com.zhuozhengsoft.pageoffice.excelwriter.Table titleTable = sheet.openTable("A4:K" + (4 + list.size() - 1));
            titleTable.setRowHeight(35);
            //设置表格边框的样式、宽度、颜色
            titleTable.getBorder().setBorderType(XlBorderType.xlAllEdges);
            titleTable.getBorder().setWeight(XlBorderWeight.xlThin);
            titleTable.getBorder().setLineColor(Color.black);
        }

        String str = "送达日期:____________    送达人：___________  联系电话：___________  接收人:____________                        （本交接单一式二份，由送达单位和接收单位各执一份）";

        com.zhuozhengsoft.pageoffice.excelwriter.Table footTable = sheet.openTable("A" + (4 + list.size() + 1) + ":K" + (4 + list.size() + 3));
        footTable.merge();
        footTable.setRowHeight(15);
        sheet.openCell("A" + (4 + list.size() + 1)).setValue(str);

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
        poCtrl.webOpen("/customermanage/doc/jcbgjjd.xlsx", OpenModeType.xlsNormalEdit, "admin");
        return "pageoffice/Excel";
    }

    private void setBorderStyle(Cell cell) {
        cell.getBorder().setBorderType(XlBorderType.xlAllEdges);
        cell.getBorder().setWeight(XlBorderWeight.xlThin);
        cell.getBorder().setLineColor(Color.black);
        cell.getFont().setSize(11);
    }

    //查看人员
    @RequestMapping(value = "/QueryRy", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject QueryRy(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            Map data = getQueryTj(request);
            data.put("id", request.getParameter("id"));
            data.put("bs", "queryry");
            //查询需要编辑的信息
            List<Map> m = bgglService.findAll(data);
            jsonObject.put("data", m);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }


    //数据修改-修改数据
    @RequestMapping(value = "/sjxg/updateData", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject sjxg_updateData(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            //Map data = getQueryTj(request);
            //data.put("id",request.getParameter("id"));
            String[] ids = request.getParameter("id").split(",");
            String[] jczs = request.getParameter("jcz").split(",");
            String[] wds = request.getParameter("wd").split(",");
            String[] sds = request.getParameter("sd").split(",");
            List<Map> data = new ArrayList<>();
            for (int i = 0; i < ids.length; i++) {
                String id = ids[i];
                String[] idd = id.split("_");
                String ypid = idd[0];
                String xmid = idd[1];
                String jcz = "";
                String wd = "";
                String sd = "";
                try {
                    jcz = jczs[i];
                } catch (Exception e) {
                }

                try {
                    wd = wds[i];
                } catch (Exception e) {
                }

                try {
                    sd = sds[i];
                } catch (Exception e) {
                }

                Map m = new HashMap();
                m.put("ypid", ypid);
                m.put("xmid", xmid);
                m.put("jcz", jcz);
                m.put("wd", wd);
                m.put("sd", sd);
                data.add(m);
            }

            bgglService.sjxg_update(data);
            //修改信息
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }


    //数据修改-查看详情
    @RequestMapping(value = "/sjxg/QueryOne", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject sjxg_QueryOne(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            Map data = getQueryTj(request);
            data.put("id", request.getParameter("id"));
            //查询需要编辑的信息
            List<Map> m = bgglService.sjxg_queryList(data);
            jsonObject.put("data", m);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "失败！");
        }
        return jsonObject;
    }


    //报告编制-修改状态 临淄
    @RequestMapping(value = "/bgbz0/updatezt", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject updateztbz(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            String zt = request.getParameter("zt");
            String ypbm = request.getParameter("ypbm");
            if ("006".equals(zt)) {
                //生成报告
                Map data = getQueryTj(request);
                Map params = getMap(request.getParameterMap());
                data.putAll(params);
                String id = data.get("id") + "";
                String ids[] = id.split(",");
                String zydm = CurrentLoginUser.getUser().getZydm();
                List<Map> mapList = new ArrayList<>();
                for (int i = 0; i < ids.length; i++) {
                    Map m = new HashMap();
                    m.put("lx", data.get("lx"));
                    m.put("id", ids[i]);
                    m.put("zt", data.get("zt"));
                    m.put("zydm", zydm);
                    //查询报告数据
                    Map cxtj = new HashMap();
                    cxtj.put("bs", "queryBgsj");
                    cxtj.put("id", ids[i]);
                    List<Map> byId = bgglService.findById(id);
                    Map<String, Object> dataMap = new HashMap<>();
                    Map byid_map = byId.get(0);
                    System.out.print(byid_map);
                    Object jyxm = byid_map.get("jyxm");
                    String s = Objects.toString(jyxm);
                    Object jldw = byid_map.get("dw");
                    String s1 = Objects.toString(jldw);
                    Object bzyq = byid_map.get("bzyq");
                    String s2 = Objects.toString(bzyq);
                    byid_map.put("jyxm", s);
                    byid_map.put("dw", s1);
                    byid_map.put("bzyq", s2);
                    List<Map> jcx = bgglService.findJcx(id);
                    String aa = "";
                    for (Map a : jcx) {
                        aa = aa + a.get("jyyq") + ",";
                    }
                    String b = aa;
                    Map jcx_map = jcx.get(0);
                    jcx_map.put("jyyq", b);
                    List<Map> bgsj = bgglService.findAll(cxtj);
                    Map bgsj_map = bgsj.get(0);
                    Object jylb = bgsj_map.get("jylb");
                    String s3 = Objects.toString(jylb);
                    String jylb1 = null;
                    switch (s3) {
                        case "W":
                            jylb1 = "委托检验";
                            break;
                        case "C":
                            jylb1 = "抽查检验";
                            break;
                        case "J":
                            jylb1 = "风险检测";
                            break;
                        case "Y":
                            jylb1 = "对比/验证检验";
                            break;
                    }
                    bgsj_map.put("jylb", jylb1);
                    dataMap.put("cpbz", "");
                    dataMap.put("jyhj", "符合检验要求");
                    dataMap.put("ffbz", "");
                    dataMap.put("jyyqq", "");
                    dataMap.put("jyjl", "");
                    dataMap.put("bz", "");
                    dataMap.put("shrq", "");
                    dataMap.put("bzrq", "");
                    dataMap.put("pzrq", "");
                    dataMap.putAll(jcx_map);
                    dataMap.put("bgpzrq", this.bgglMapper.getbgpz(id).get("bgpzrq"));
                    dataMap.put("bgshrq", this.bgglMapper.getbgsh(id).get("bgshrq"));
                    dataMap.put("bgbzrq", this.bgglMapper.getbgbz(id).get("bgbzrq"));
                    List<Map> ffbz1 = bgglService.findFfbz(id);
                    String ffbz2 = "";
                    for (Map f : ffbz1) {
                        ffbz2 = ffbz2 + f.get("jyyj") + ",";
                    }
                    String ff = ffbz2;
                    Map ffbz_map = ffbz1.get(0);
                    ffbz_map.put("jyyj", ff);
                    dataMap.putAll(ffbz_map);
                    dataMap.putAll(byid_map);
                    dataMap.putAll(bgsj_map);
                    String fileurl = WordUtil.createWord(request, dataMap);
                    m.put("BGLJ", fileurl);
                    mapList.add(m);
                }
                bgglService.updatebg(mapList);

            } else {
                Map data = getQueryTj(request);
                Map params = getMap(request.getParameterMap());
                data.putAll(params);
                String zydm = CurrentLoginUser.getUser().getZydm();
                // 003 退回
                String id = data.get("id") + "";
                String ids[] = id.split(",");
                List<Map> mapList = new ArrayList<>();
                for (int i = 0; i < ids.length; i++) {
                    Map m = new HashMap();
                    m.put("lx", data.get("lx"));
                    m.put("id", ids[i]);
                    m.put("zt", data.get("zt"));
                    m.put("zydm", zydm);
                    mapList.add(m);
                }
                bgglService.updatezt(mapList);
            }

            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }


    //数据修改-修改状态  sjxg
    @RequestMapping(value = "/sjxg/updatezt", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject sjxg_updatezt(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            Map data = getQueryTj(request);
            Map params = getMap(request.getParameterMap());
            data.putAll(params);
            String zydm = CurrentLoginUser.getUser().getZydm();
            // 003 退回
            String id = data.get("id") + "";
            String ids[] = id.split(",");
            List<Map> mapList = new ArrayList<>();
            for (int i = 0; i < ids.length; i++) {
                Map m = new HashMap();
                m.put("lx", data.get("lx"));
                m.put("id", ids[i]);
                m.put("zt", data.get("zt"));
                m.put("zydm", zydm);

                mapList.add(m);
            }
            bgglService.updatezt(mapList);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }


    //报告批准
    @RequestMapping(value = "/bgpz/updatezt", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject sjsc_updatezt(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        String ypbms = request.getParameter("ypbm");
        String[] ypbms1 = ypbms.split(",");
        try {
            Map data = getQueryTj(request);
            Map params = getMap(request.getParameterMap());
            String zydm = CurrentLoginUser.getUser().getZydm();
            data.putAll(params);
            /*String id = data.get("id")+"";
            String wtid = tqywtMapper.findwtidw(id);
            String ypid = tqywtMapper.findypid(wtid);*/
            for (String ypbm : ypbms1) {
                String ypid = tqywtMapper.findYpidByYpbm(ypbm);
                List<Map> mapList = new ArrayList<>();
                Map m = new HashMap();
                m.put("lx", data.get("lx"));//2
                m.put("id", ypid);
                m.put("zt", data.get("zt"));//002
                m.put("zydm", zydm);
                m.put("if_zx", "001");
                mapList.add(m);
                bgglService.updatezt(mapList);

                //根据样品编码 将doc文件更新为pdf文件
//                String bglj = bgglMapper.getBgljByYpbm(ypbm);
//                if (StringUtils.isNotBlank(bglj) && !bglj.contains(".pdf")) {
//                    this.wToPdfChange(bglj, bglj.replace(".doc", ".pdf"));
//                    bgglMapper.updateByljByYpbm(ypbm, bglj.replace(".doc", ".pdf"));
//
//                }
            }

            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }

    //报告制表
    @RequestMapping(value = "/bgzb/updatezt", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject bgzb_updatezt(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            Map data = getQueryTj(request);
            Map params = getMap(request.getParameterMap());
            String zydm = CurrentLoginUser.getUser().getZydm();
            data.putAll(params);
            String id = data.get("id") + "";
            String wtid = tqywtMapper.findwtidw(id);
            String ypid = tqywtMapper.findypid(wtid);
//            String ids[] = id.split(",");
            List<Map> mapList = new ArrayList<>();
//            for(int i=0;i<ids.length;i++){
            Map m = new HashMap();
            m.put("lx", data.get("lx"));
            m.put("id", ypid);
            m.put("zt", data.get("zt"));
            m.put("zydm", zydm);
            m.put("if_zx", "001");
            mapList.add(m);
//            }
            bgglService.updatezt(mapList);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }

    //报告编制
    @RequestMapping(value = "/bgbz/updatezt", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject bgbz_updatezt(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        String ypbms = request.getParameter("ypbm");
        String shry = request.getParameter("shry");
        String spry = request.getParameter("spry");
        String[] ypbms1 = ypbms.split(",");
        try {
            Map data = getQueryTj(request);
            Map params = getMap(request.getParameterMap());
            String zydm = CurrentLoginUser.getUser().getZydm();
            data.putAll(params);
            //String id = data.get("id")+"";
//            String ids[] = id.split(",");
            /*String wtid = tqywtMapper.findwtidw(id);
            String ypid = tqywtMapper.findypid(wtid);*/
            for (String ypbm : ypbms1) {
                String ypid = tqywtMapper.findYpidByYpbm(ypbm);
                List<Map> mapList = new ArrayList<>();
                Map m = new HashMap();
                m.put("lx", data.get("lx"));
                m.put("id", ypid);
                m.put("zt", data.get("zt"));
                m.put("zydm", zydm);
                m.put("if_zx", "001");
                m.put("bgshzt", "001");
                mapList.add(m);
                bgglService.updatezt(mapList);
                //自动跳过 审核功能
                bgglService.bgshAutomaticPassing(ypid,shry);
                //自动跳过审批功能
                bgglService.bgspAutomaticPassing(ypid,spry);
            }
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }

    //报告主检审批
    @RequestMapping(value = "/bgzjsp/updatezt", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject bgzjsp_updatezt(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        String ypbms = request.getParameter("ypbm");
        String[] ypbms1 = ypbms.split(",");
        try {
            Map data = getQueryTj(request);
            Map params = getMap(request.getParameterMap());
            String zydm = CurrentLoginUser.getUser().getZydm();
            data.putAll(params);
            /*String id = data.get("id")+"";
            String wtid = tqywtMapper.findwtidw(id);
            String ypid = tqywtMapper.findypid(wtid);*/

            for (String ypbm : ypbms1) {
                String ypid = tqywtMapper.findYpidByYpbm(ypbm);
                List<Map> mapList = new ArrayList<>();
                Map m = new HashMap();
                m.put("lx", data.get("lx"));
                m.put("id", ypid);
                m.put("zt", data.get("zt"));
                m.put("zydm", zydm);
                m.put("if_zx", "001");
                mapList.add(m);
                //20190917屏蔽总审核退回到批准
                // bgglService.updatezt(mapList);
                //20190917添加退回跳过批准环节
                bgglService.updateztNew(mapList);
                String sqzt = data.get("zt")+"";
                if(sqzt!=null && !sqzt.trim().equals("004"))//不是退回 说明是通过 才加 骑缝章
                {
                    //将报告（pdf形式加盖骑缝章）
                    CustomerManage customer = (CustomerManage) redisClinet.get(CurrentLoginUser.getCustomer().getId());
                    String is_qfz =customer.getIs_qfz();
                    //根据系统设置 是否启用骑缝章
                    if(is_qfz!=null && is_qfz.trim().equals("Y"))
                    {
                        String bglj = bgglMapper.getBgljByYpbm(ypbm);
                        //获取骑缝章图片
                        String path = request.getSession().getServletContext().getRealPath("");
                        System.out.println(path);

                        if (StringUtils.isNotBlank(bglj) && bglj.contains(".pdf")){
                            String newPath = bglj.replace(".pdf","1.pdf");
                            stamperCheckMarkPDF(bglj,newPath,path + "/file/qfz.png"); //图片路径需要更改
                            bgglMapper.updateByljByYpbm(ypbm,newPath);
                        }
                    }
                }
            }

            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }

    /**
     * @Author 单亮
     * @Description：报告审核
     * @Date: ${DATE} ${TIME}
     * @Modified By:
     */
    @RequestMapping(value = "/bgsh/updatezt", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject sjjy_updatezt(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        String ypbms = request.getParameter("ypbm");
        String[] ypbms1 = ypbms.split(",");
        try {
            Map data = getQueryTj(request);
            Map params = getMap(request.getParameterMap());
            String zydm = CurrentLoginUser.getUser().getZydm();
            data.putAll(params);
/*            String id = data.get("id")+"";
            String wtid = tqywtMapper.findwtidw(id);
            String ypid = tqywtMapper.findypid(wtid);*/
            for (String ypbm : ypbms1) {
                String ypid = tqywtMapper.findYpidByYpbm(ypbm);
                List<Map> mapList = new ArrayList<>();
                Map m = new HashMap();
                m.put("lx", data.get("lx"));
                m.put("id", ypid);
                m.put("zt", data.get("zt"));
                m.put("zydm", zydm);
                m.put("if_zx", "001");
                mapList.add(m);
                bgglService.updatezt(mapList);
            }

            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }

    //报告打印
    @RequestMapping(value = "/bgdy/updatezt", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject ypjc_updatezt(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            Map data = getQueryTj(request);
            Map params = getMap(request.getParameterMap());
            String zydm = CurrentLoginUser.getUser().getZydm();
            data.putAll(params);
            String id = data.get("id") + "";
            String ids[] = id.split(",");
            List<Map> mapList = new ArrayList<>();
            for (int i = 0; i < ids.length; i++) {
                Map m = new HashMap();
                m.put("lx", data.get("lx"));
                m.put("id", ids[i]);
                m.put("zt", data.get("zt"));
                m.put("zydm", zydm);
                m.put("if_zx", "001");
                mapList.add(m);
            }
            bgglService.updatezt(mapList);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }


    public Map getMap(Map map) {
        Map mm = new HashMap();
        map.forEach((k, v) -> {
            if (v instanceof String) {
                v = ((String) v).trim();
                mm.put(k, v);
            }
            if (v instanceof String[]) {
                mm.put(k, ((String[]) v)[0].trim());
            }
        });
        return mm;
    }

    //保存执行人
    @RequestMapping(value = "/bgfp/saveZxry", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveZxry(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            Map map = getMap(request.getParameterMap());
            String zydm = map.get("zydm") + "";
            String id = map.get("id") + "";
            String lx = map.get("lx") + "";
            String lrry = CurrentLoginUser.getUser().getZydm();
            String[] ids = id.split(",");
            List<Map> mapList = new ArrayList<>();
            Arrays.stream(ids).forEach(s_id -> {
                String[] zydms = zydm.split(",");
                Arrays.stream(zydms).forEach(s_zydm -> {
                    Map mm = new HashMap();
                    mm.put("zydm", s_zydm);
                    mm.put("lx", lx);
                    mm.put("id", s_id);
                    mm.put("lrry", lrry);
                    mapList.add(mm);
                });
            });
            bgglService.insert(mapList);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }

    @RequestMapping(value = "/yplz")
    @ResponseBody
    public String getjyyj(HttpServletRequest request) throws Exception {
        String ypbm = request.getParameter("ypbm");
        Map getlzinfo = this.bgglMapper.getlzinfo(ypbm);
        if ("".equals(this.bgglMapper.selectLZLJ(ypbm))) {
//            System.out.print(!"".equals(this.bgglMapper.selectLZLJ(ypbm)));
            return "4444";
        } else {
            String aa = "";
            String id = request.getParameter("id");
            if ("".equals(getlzinfo.get("zxbz"))) {
                List<Map> getjyyj = this.bgglMapper.getjyyj(id);
                for (Map a : getjyyj) {
                    aa = aa + a.get("jyyj") + ",";
                }
                getlzinfo.remove("zxbz");
            } else {
                aa = getlzinfo.get("zxbz").toString();
                getlzinfo.remove("zxbz");
            }
            Map ypinfo = this.bgglMapper.getypinfo(ypbm);
            getlzinfo.put("ypsl", ypinfo.get("ypsl") + "" + ypinfo.get("ypdw"));
            List<Jcx> list = this.bgglMapper.getYplzdjcxm(ypbm);
            String jcxmc = "";
            String wd = "";
            String sd = "";
            String jcz = "";
            for (Jcx s : list) {
                jcxmc = jcxmc + s.getJxcmc();
                wd = wd + s.getWd() + ",";
                sd = sd + s.getSd() + ",";
                jcz = jcz + s.getJcz() + ",";
            }
            String b = aa;
            getlzinfo.put("jyyj", b.substring(0, b.length() - 1));
            String JYLB = null;
            switch (getlzinfo.get("jylb").toString()) {
                case "W":
                    JYLB = "委托检验";
                    break;
                case "C":
                    JYLB = "抽查检验";
                    break;
                case "J":
                    JYLB = "风险检测";
                    break;
                case "Y":
                    JYLB = "对比/验证检验";
                    break;
            }
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            getlzinfo.put("jylb", JYLB);
            if ("1".equals(this.bgglMapper.ifZy(ypbm))) {
                Integer zbsl = this.bgglMapper.findZbsl(ypbm);
                getlzinfo.put("zbsl", zbsl);
                String sas = this.bgglMapper.getypzb(ypbm).get("zbrq").toString();
//                System.out.print(sas);
//                System.out.print(sas);
                getlzinfo.put("zbrq", simpleDateFormat.format(new SimpleDateFormat("yyyy-MM-dd").parse(sas)));
            } else {
                getlzinfo.put("zbsl", "/");
                getlzinfo.put("zbrq", "/");
            }
            String s = getlzinfo.get("if_fb").toString();
            if ("0".equals(s)) {
                getlzinfo.put("if_fb", "留样");
            } else {
                getlzinfo.put("if_fb", "不留样");
            }
            getlzinfo.put("ypdjrq", simpleDateFormat.format(new SimpleDateFormat("yyyy-MM-dd").parse(this.bgglMapper.getypdj(ypbm).get("ypdjrq").toString())));
            getlzinfo.put("bgpzrq", simpleDateFormat.format(new SimpleDateFormat("yyyy-MM-dd").parse(this.bgglMapper.getbgpz(id).get("bgpzrq").toString())));
            getlzinfo.put("bgshrq", simpleDateFormat.format(new SimpleDateFormat("yyyy-MM-dd").parse(this.bgglMapper.getbgsh(id).get("bgshrq").toString())));
            getlzinfo.put("bgbzrq", simpleDateFormat.format(new SimpleDateFormat("yyyy-MM-dd").parse(this.bgglMapper.getbgbz(id).get("bgbzrq").toString())));
            System.out.print(getlzinfo);
            Set<String> set = getlzinfo.keySet();
            for (String s6 : set) {
                if ("".equals(getlzinfo.get(s6))) {
                    getlzinfo.put(s6, "/");
                }
            }
            String url = WordUtil2.createWord(request, getlzinfo);
            this.bgglMapper.updateLZLJ(url, ypbm);

            return b;
        }
    }

    /**
     * 生成委托单
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/dayinwtbg/{id}")
    @ResponseBody
    public JSONObject dayinWtbg(HttpServletRequest request, @PathVariable("id") String id) throws Exception {
        JSONObject jsonObject = new JSONObject();
        String ypbm = request.getParameter("ypbm");
        String ypids = tqywtMapper.findYpidByYpbm(ypbm);
        /* try {*/
        String cxzt = tqywtMapper.findCxzt(id);
        if (cxzt.equals("001")) {
            SimpleDateFormat df = new SimpleDateFormat("yyyy年MM月dd日");//设置日期格式
            String bgscsj = df.format(new Date());
//                bgglMapper.updateBgscsj(id,bgscsj);//更新报告生成时间----放到下面，同时保存报告结论
            List<Map> byId = bgglMapper.findBgsj(ypids);
            Map<String, Object> dataMap = new HashMap<>();
            Map byid_map = byId.get(0);
            Object jylb = byid_map.get("jylb");
            Object wtid1 = byid_map.get("wtid");
            String b = Objects.toString(jylb);
            String wtid = Objects.toString(wtid1);
            /*String id1 = tqywtMapper.findypid(wtid);*/
            String id1 = tqywtMapper.findYpidByYpbm(ypbm);
            String jylb1 = "";
            switch (b) {
                case "lxjc":
                    jylb1 = "例行监测";
                    break;
                case "jdcc":
                    jylb1 = "监督抽查";
                    break;
                case "aqcj":
                    jylb1 = "安全抽检";
                    break;
                case "jdjy":
                    jylb1 = "监督检验";
                    break;
                case "dbsy":
                    jylb1 = "对比实验";
                    break;
                case "lyfc":
                    jylb1 = "留样复测";
                    break;
                case "wtjy":
                    jylb1 = "委托检验";
                    break;
            }
            byid_map.put("jylb", jylb1);
            //报告主检或编制人签字
            Object ifsgr = byid_map.get("ifsgr");
            String ifsgr1 = Objects.toString(ifsgr);
            String zjbz = "";
            switch (ifsgr1) {
                case "1":
                    zjbz = "编制";
                    break;
                case "0":
                    zjbz = "主检";
                    break;
            }
            byid_map.put("zjbz", zjbz);
            List<Map> jcx = bgglService.findJcx(id1);
            String aa = "";
            for (Map z : jcx) {
                aa = aa + z.get("Jcx") + ",";
            }
            String bb = aa.substring(0, aa.length() - 1);
            byid_map.put("jyxm", bb);
            List<String> getjcyj = bgglMapper.getlzjcyj(id1);
            HashSet<String> setjcyj = new HashSet<>();
            for (String jcyj : getjcyj) {
                setjcyj.add(jcyj);
            }
            String jyyj1 = "";
            Iterator<String> itjyyjbz = setjcyj.iterator();
            while (itjyyjbz.hasNext()) {
                jyyj1 = jyyj1 + itjyyjbz.next() + ",";
            }
            byid_map.put("jyyj", jyyj1);
            Object wd = byid_map.get("wd");
            String wd1 = Objects.toString(wd);
            Object sd = byid_map.get("sd");
            String sd1 = Objects.toString(sd);
            dataMap.put("jyhj", "温度：" + wd1 + "℃；湿度：" + sd1 + "%");
            Map jcrq = bgglMapper.selectjcrq(id1);
            //最小检测日期
            String sjcrq = jcrq.get("sjcrq") + "";
            //最大检测日期
            String mjcrq = jcrq.get("mjcrq") + "";
            Date sjcrq1 = new SimpleDateFormat("yyyy-MM-dd").parse(sjcrq);
            Date mjcrq1 = new SimpleDateFormat("yyyy-MM-dd").parse(mjcrq);
            String sformat = new SimpleDateFormat("yyyy-MM-dd").format(sjcrq1);
            String mformat = new SimpleDateFormat("yyyy-MM-dd").format(mjcrq1);
            dataMap.put("jyrq", sformat + "-" + mformat);

            dataMap.putAll(byid_map);
            Set<String> set = dataMap.keySet();
            for (String s6 : set) {
                if ("".equals(dataMap.get(s6))) {
                    dataMap.put(s6, "/");
                }
            }
            List<staffList1> staffList1s = new ArrayList<>();
            //检测逻辑判断
            List<Map> list1 = this.bgglMapper.findById1(id1);
            List<Map> list2 = this.bgglMapper.findjczz(id1);
            int i1 = 0;
            for (Map map1 : list1) {
                staffList1 staffList1 = new staffList1();
                staffList1.setXh(i1 + 1 + "");
                String jcxmid1 = map1.get("jcxmid").toString();
                for (Map map2 : list2) {
                    String jcxmid2 = map2.get("jcxmid").toString();
                    if (jcxmid1.trim().equals(jcxmid2.trim())) {
//                            String s = map2.get("if_fb") + "";
//                            System.out.print(s);
                        //判断是否分包
//                            if ("1".equals(map2.get("if_fb") + "")) {
//                                staffList1.setJyxm("*" + map1.get("jyxm").toString() + "、" + map1.get("dw"));
//                            } else {
                        staffList1.setXmmc(map1.get("jyxm").toString());
                        staffList1.setDw(map1.get("dw").toString());
                        staffList1.setJcff(map1.get("xlz").toString());
//                            }

                        if ("".equals(map1.get("xlz"))) {
                            staffList1.setJyjg("/");
                        } else {
                            staffList1.setJyjg("≤" + map1.get("xlz") + "");
                        }
                        if (map1.get("jcx").toString().matches("-[0-9]+(.[0-9]+)?|[0-9]+(.[0-9]+)?") && !"".equals(map1.get("xlz"))) {
                            Double jcx1 = Double.parseDouble(map1.get("jcx").toString());
                            if (!"".equals(map2.get("jcz")) && map2.get("jcz").toString().matches("-[0-9]+(.[0-9]+)?|[0-9]+(.[0-9]+)?")) {
                                Double jcz = Double.parseDouble(map2.get("jcz").toString());
                                if (jcx1 >= jcz) {
                                    staffList1.setJyjg("未检出(＜ " +
                                            map1.get("jcx") + ")");
                                    staffList1.setJl("合格");
                                } else {
                                    staffList1.setJyjg(map2.get("jcz") + "");
                                    staffList1.setJl("不合格");
                                }
                            } else {
                                if ("".equals(map2.get("jcz").toString())) {
                                    staffList1.setJyjg("/");
                                } else {
                                    staffList1.setJyjg(map2.get("jcz").toString());
                                }
                            }
                        } else {
                            staffList1.setJyjg("/");
                        }
                        /*	table.openCellRC(2+i,5).setValue(map1.get("jcfa").toString());*/
//                            System.out.print(map1.get("xlz"));//xlz：限量值、jcz：检出值
                        if (!"".equals(map1.get("xlz")) && (map1.get("xlz") + "").matches("-[0-9]+(.[0-9]+)?|[0-9]+(.[0-9]+)?")) {
                            Double xlz = Double.parseDouble(map1.get("xlz").toString());
                            if (!"".equals(map2.get("jcz")) && map2.get("jcz").toString().matches("-[0-9]+(.[0-9]+)?|[0-9]+(.[0-9]+)?")) {
                                Double jcz = Double.parseDouble(map2.get("jcz").toString());
                                if (jcz <= xlz) {

                                } else {

                                }
                            }
                        } else {
                            staffList1.setJl("/");
                        }
                    }
                }
                if (i1 != list1.size()) {
                    staffList1s.add(staffList1);
                    i1++;
                }

            }
            dataMap.put("staffList", staffList1s);
            String jyjl = "";
            String pdyj = "";
            HashSet<String> jyjl1 = new HashSet<>();
            HashSet<String> pdyjl = new HashSet<>();
            for (Map map2 : list2) {
                for (Map map1 : list1) {
                    if (!"".equals(map1.get("xlz"))) {
                        Double xlz = Double.parseDouble(map1.get("xlz").toString().trim());
                        if (!"".equals(map2.get("jcz"))) {
                            Double jcz = Double.parseDouble(map2.get("jcz").toString().trim());
                            if (jcz < xlz) {
                                pdyj = map1.get("pdyj").toString();
                                pdyjl.add(pdyj);
                                break;
                            } else {
                                jyjl = map1.get("jyxm").toString();
                                jyjl1.add(jyjl);
                                pdyj = map1.get("pdyj").toString();
                                pdyjl.add(pdyj);
                            }
                        }
                    }
                }
            }
            String jyjl11 = "";
            Iterator<String> itjyjl1 = jyjl1.iterator();
            while (itjyjl1.hasNext()) {
                jyjl11 = jyjl11 + itjyjl1.next() + ",";
            }
            String pdyjl1 = "";
            Iterator<String> itpdyjl = pdyjl.iterator();
            while (itpdyjl.hasNext()) {
                pdyjl1 = pdyjl1 + itpdyjl.next() + ",";
            }
            if (jyjl.equals("")) {
                bgglMapper.updateBgscsj(id, bgscsj, "合格", "");//更新报告生成时间、报告结论
                String pdyjl11 = pdyjl1.substring(0, pdyjl1.length() - 1);
                dataMap.put("jyjl", "该样品所检项目符合" + pdyjl11 + "标准要求。");
            } else {

                String jyjl111 = jyjl11.substring(0, jyjl11.length() - 1);
                String pdyjl11 = pdyjl1.substring(0, pdyjl1.length() - 1);
                bgglMapper.updateBgscsj(id, bgscsj, "不合格", jyjl111);//更新报告生成时间、报告结论
                dataMap.put("jyjl", "该样品所检项目" + jyjl111 + "不符合" + pdyjl11 + "标准要求，该样品不合格。");
            }

            String wtbglj = WordUtilWtbg.createWord(request, dataMap);
            bgglMapper.updateWtbglj(id1, wtbglj);
            jsonObject.put("success", true);
        } else if (cxzt.equals("002") || cxzt.equals("004") || cxzt.equals("005")) {
            Map map = this.bgglMapper.findCyjbInfo(id);
            //获取检测日期
            /*String ypid = this.bgglMapper.findYpidByWtid(id);*/
            String ypid = this.tqywtMapper.findYpidByYpbm(ypbm);
            Map DateMap = this.bgglMapper.selectjcrq(ypid);
            map.put("JCRQ", DateMap.get("sjcrq") + "~" + DateMap.get("mjcrq"));
            //获取判断依据
            Map pdyj = this.bgglMapper.findPdyj(ypid);
            map.put("PDYJ", pdyj.get("PDYJ"));
            map.put("JCYJ", pdyj.get("JCFA"));
            //获取检验环境
            String wd = map.get("WD").toString();
            String sd = map.get("SD").toString();
            map.put("JYHJ", "温度：" + wd + ";湿度：" + sd);
            List<RowRenderData> dataList = new ArrayList();
            //获取检测项目
            List<Map> JcxDataList = this.bgglMapper.findJcxmTable(ypid);
            Style style = new Style();
            style.setFontFamily("仿宋_GB2312");
            style.setFontSize(11);
            for (int i = 0; i < JcxDataList.size(); i++) {
                Map itemMap = JcxDataList.get(i);
                RowRenderData rowRenderData = RowRenderData.build(new TextRenderData(i + 1 + "", style),
                        new TextRenderData(itemMap.get("ZWMC_BM") + "", style),
                        new TextRenderData(itemMap.get("DW") + "", style),
                        new TextRenderData(itemMap.get("XLZ") + "", style),
                        new TextRenderData(itemMap.get("JCJG") + "", style),
                        new TextRenderData(itemMap.get("JYJG") + "", style));
                dataList.add(rowRenderData);
            }
            String URL = new LzdglController().createDocx(map, dataList, "cybg", request);
            bgglMapper.updateWtbglj(ypid, URL);
            jsonObject.put("success", true);
        }

        //1-n
        else if (cxzt.equals("003") || cxzt.equals("006")) {
            try {
                /*String ypid = this.bgglMapper.findYpidByWtid(id);*/
                String ypid = this.tqywtMapper.findYpidByYpbm(ypbm);
                Map<String, Object> dataMap = new HashMap<>();
                String wtid = tqywtMapper.findwtidw(id);
                dataMap.put("wtid", wtid);
                Map ypidmap = bgglMapper.selectYpid(wtid);
                //最小ypbm
                String sypbm = ypidmap.get("sypbm") + "";
                //最大ypbm
                String mypbm = ypidmap.get("mypbm") + "";
                String mypbm1 = mypbm.substring(mypbm.length() - 3, mypbm.length());
                dataMap.put("ypbm", sypbm + "~" + mypbm1);
                List<String> ggxhlist = bgglMapper.selectGgxh(wtid);
                HashSet<String> setggxh = new HashSet<>();
                for (String ggxh : ggxhlist) {
                    setggxh.add(ggxh);
                }
                String ggxh1 = "";
                Iterator<String> itggxh = setggxh.iterator();
                while (itggxh.hasNext()) {
                    ggxh1 = ggxh1 + itggxh.next() + ",";
                }
                dataMap.put("ggxh", ggxh1);
                List<String> ypdjlist = bgglMapper.selectYpdj(wtid);
                HashSet<String> setypdj = new HashSet<>();
                for (String ypdj : ypdjlist) {
                    setypdj.add(ypdj);
                }
                String ypdj1 = "";
                Iterator<String> itypdj = setypdj.iterator();
                while (itypdj.hasNext()) {
                    ypdj1 = ypdj1 + itypdj.next() + ",";
                }
                dataMap.put("ypdj", ypdj1);
                List<Map> byId = bgglMapper.findBgsjydd(id);
                Map byid_map = byId.get(0);
                Object jylb = byid_map.get("jylb");
//            Object wtid1 = byid_map.get("wtid");
                String b = Objects.toString(jylb);
//            String wtid = Objects.toString(wtid1);
//                    String id1 = tqywtMapper.findypid(wtid);
                String jylb1 = "";
                switch (b) {
                    case "lxjc":
                        jylb1 = "例行监测";
                        break;
                    case "jdcc":
                        jylb1 = "监督抽查";
                        break;
                    case "aqcj":
                        jylb1 = "安全抽检";
                        break;
                    case "jdjy":
                        jylb1 = "监督检验";
                        break;
                    case "dbsy":
                        jylb1 = "对比实验";
                        break;
                    case "lyfc":
                        jylb1 = "留样复测";
                        break;
                    case "wtjy":
                        jylb1 = "委托检验";
                        break;
                }
                byid_map.put("jylb", jylb1);
                List<Map> jcx = bgglService.findJcx(ypid);
                String aa = "";
                for (Map z : jcx) {
                    aa = aa + z.get("Jcx") + ",";
                }
                String bb = aa.substring(0, aa.length() - 1);
                byid_map.put("jyxm", bb);
                List<String> getjcyj = bgglMapper.getlzjcyj(ypid);
                HashSet<String> setjcyj = new HashSet<>();
                for (String jcyj : getjcyj) {
                    setjcyj.add(jcyj);
                }
                String jyyj1 = "";
                Iterator<String> itjyyjbz = setjcyj.iterator();
                while (itjyyjbz.hasNext()) {
                    jyyj1 = jyyj1 + itjyyjbz.next() + ",";
                }
                byid_map.put("jyyj", jyyj1);
//            dataMap.put("jyhj","温度"+ swd +"-" + mwd +"℃；湿度"+ ssd +"-"+ msd +"%");
                Map jcrq = bgglMapper.selectjcrq(ypid);
                //最小检测日期
                String sjcrq = jcrq.get("sjcrq") + "";
                //最大检测日期
                String mjcrq = jcrq.get("mjcrq") + "";
                Date sjcrq1 = new SimpleDateFormat("yyyy-MM-dd").parse(sjcrq);
                Date mjcrq1 = new SimpleDateFormat("yyyy-MM-dd").parse(mjcrq);
                String sformat = new SimpleDateFormat("yyyy-MM-dd").format(sjcrq1);
                String mformat = new SimpleDateFormat("yyyy-MM-dd").format(mjcrq1);
                dataMap.put("jyrq", sformat + "-" + mformat);
                dataMap.putAll(byid_map);
                Set<String> set = dataMap.keySet();
                for (String s6 : set) {
                    if ("".equals(dataMap.get(s6))) {
                        dataMap.put(s6, "/");
                    }
                }
//                    String  yddcybglj = WordUtilYddcy.createWord(request,dataMap);
//                    bgglMapper.updateYddcybglj(id1,yddcybglj);
                String URL = new LzdglController().createDocx1ton(dataMap, request);
                bgglMapper.updateWtbglj(ypid, URL);
                jsonObject.put("success", true);
            } catch (Exception e) {
                jsonObject.put("success", false);
                jsonObject.put("message", "保存失败！");
            }

        }

     /*   }catch (Exception e){
            jsonObject.put("success", false);
            jsonObject.put("message","保存失败！");
        }*/
        return jsonObject;
    }

    /**
     * 生成委托单
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/dayinyddbg/{id}")
    @ResponseBody
    public JSONObject dayinyddbg(HttpServletRequest request, @PathVariable("id") String id) {
        JSONObject jsonObject = new JSONObject();
        try {
//                SimpleDateFormat df = new SimpleDateFormat("yyyy年MM月dd日");//设置日期格式
//                String bgscsj = df.format(new Date());
//                bgglMapper.updateBgscsj(id,bgscsj);
            Map<String, Object> dataMap = new HashMap<>();
            String wtid = tqywtMapper.findwtidw(id);
            Map ypidmap = bgglMapper.selectYpid(wtid);
            //最小ypbm
            String sypbm = ypidmap.get("sypbm") + "";
            //最大ypbm
            String mypbm = ypidmap.get("mypbm") + "";
            String mypbm1 = mypbm.substring(mypbm.length() - 3, mypbm.length());
            dataMap.put("ypbm", sypbm + "~" + mypbm1);
            List<String> ggxhlist = bgglMapper.selectGgxh(wtid);
            HashSet<String> setggxh = new HashSet<>();
            for (String ggxh : ggxhlist) {
                setggxh.add(ggxh);
            }
            String ggxh1 = "";
            Iterator<String> itggxh = setggxh.iterator();
            while (itggxh.hasNext()) {
                ggxh1 = ggxh1 + itggxh.next() + ",";
            }
            dataMap.put("ggxh", ggxh1);
            List<String> ypdjlist = bgglMapper.selectYpdj(wtid);
            HashSet<String> setypdj = new HashSet<>();
            for (String ypdj : ypdjlist) {
                setypdj.add(ypdj);
            }
            String ypdj1 = "";
            Iterator<String> itypdj = setypdj.iterator();
            while (itypdj.hasNext()) {
                ypdj1 = ypdj1 + itypdj.next() + ",";
            }
            dataMap.put("ypdj", ypdj1);
            List<Map> byId = bgglMapper.findBgsjydd(id);
            Map byid_map = byId.get(0);
            Object jylb = byid_map.get("jylb");
//            Object wtid1 = byid_map.get("wtid");
            String b = Objects.toString(jylb);
//            String wtid = Objects.toString(wtid1);
            String id1 = tqywtMapper.findypid(wtid);
            String jylb1 = "";
            switch (b) {
                case "lxjc":
                    jylb1 = "例行监测";
                    break;
                case "jdcc":
                    jylb1 = "监督抽查";
                    break;
                case "aqcj":
                    jylb1 = "安全抽检";
                    break;
                case "jdjy":
                    jylb1 = "监督检验";
                    break;
                case "dbsy":
                    jylb1 = "对比实验";
                    break;
                case "lyfc":
                    jylb1 = "留样复测";
                    break;
                case "wtjy":
                    jylb1 = "委托检验";
                    break;
            }
            byid_map.put("jylb", jylb1);
            List<Map> jcx = bgglService.findJcx(id1);
            String aa = "";
            for (Map z : jcx) {
                aa = aa + z.get("Jcx") + ",";
            }
            String bb = aa.substring(0, aa.length() - 1);
            byid_map.put("jyxm", bb);
            List<String> getjcyj = bgglMapper.getlzjcyj(id1);
            HashSet<String> setjcyj = new HashSet<>();
            for (String jcyj : getjcyj) {
                setjcyj.add(jcyj);
            }
            String jyyj1 = "";
            Iterator<String> itjyyjbz = setjcyj.iterator();
            while (itjyyjbz.hasNext()) {
                jyyj1 = jyyj1 + itjyyjbz.next() + ",";
            }
            byid_map.put("jyyj", jyyj1);
//            dataMap.put("jyhj","温度"+ swd +"-" + mwd +"℃；湿度"+ ssd +"-"+ msd +"%");
            Map jcrq = bgglMapper.selectjcrq(id1);
            //最小检测日期
            String sjcrq = jcrq.get("sjcrq") + "";
            //最大检测日期
            String mjcrq = jcrq.get("mjcrq") + "";
            Date sjcrq1 = new SimpleDateFormat("yyyy-MM-dd").parse(sjcrq);
            Date mjcrq1 = new SimpleDateFormat("yyyy-MM-dd").parse(mjcrq);
            String sformat = new SimpleDateFormat("yyyy-MM-dd").format(sjcrq1);
            String mformat = new SimpleDateFormat("yyyy-MM-dd").format(mjcrq1);
            dataMap.put("jyrq", sformat + "-" + mformat);
            dataMap.putAll(byid_map);
            Set<String> set = dataMap.keySet();
            for (String s6 : set) {
                if ("".equals(dataMap.get(s6))) {
                    dataMap.put(s6, "/");
                }
            }
            String yddcybglj = WordUtilYddcy.createWord(request, dataMap);
            bgglMapper.updateYddcybglj(id1, yddcybglj);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }

    @RequestMapping(value = "/updatezt", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject updatezt(HttpServletRequest request) throws Exception {
        JSONObject jsonObject = new JSONObject();
        /*try {*/
        String zt = request.getParameter("zt");
        if ("006".equals(zt)) {
            //生成报告
            Map data = getQueryTj(request);
            Map params = getMap(request.getParameterMap());
            data.putAll(params);
            String id = data.get("id") + "";
            String ids[] = id.split(",");
            String zydm = CurrentLoginUser.getUser().getZydm();
            List<Map> mapList = new ArrayList<>();
            for (int i = 0; i < ids.length; i++) {
                Map m = new HashMap();
                m.put("lx", data.get("lx"));
                m.put("id", ids[i]);
                m.put("zt", data.get("zt"));
                m.put("zydm", zydm);
                //查询报告数据
                Map cxtj = new HashMap();
                cxtj.put("bs", "queryBgsj");
                cxtj.put("id", ids[i]);
                List<Map> byId = bgglService.findById(id);
                Map<String, Object> dataMap = new HashMap<>();
                Map byid_map = byId.get(0);
                Object jyxm = byid_map.get("jyxm");
                String s = Objects.toString(jyxm);
                Object jldw = byid_map.get("dw");
                String s1 = Objects.toString(jldw);
                Object bzyq = byid_map.get("bzyq");
                String s2 = Objects.toString(bzyq);
                byid_map.put("jyxm", s);
                byid_map.put("dw", s1);
                byid_map.put("bzyq", s2);
                List<Map> bgsj = bgglService.findAll(cxtj);
                Map bgsj_map = bgsj.get(0);
                Object jylb = bgsj_map.get("jylb");
                String s3 = Objects.toString(jylb);
                String jylb1 = null;
                switch (s3) {
                    case "lxjc":
                        jylb1 = "例行监测";
                        break;
                    case "jdcc":
                        jylb1 = "监督抽查";
                        break;
                    case "aqcj":
                        jylb1 = "安全抽检";
                        break;
                    case "jdjy":
                        jylb1 = "监督检验";
                        break;
                    case "dbsy":
                        jylb1 = "对比实验";
                        break;
                    case "lyfc":
                        jylb1 = "留样复测";
                        break;
                    case "wtjy":
                        jylb1 = "委托检验";
                        break;
                }
                String sc = bgsj_map.get("scrq").toString();
                String sc1 = "";
                if (panduan(sc)) {
                    Date scrq = new SimpleDateFormat("yyyy-MM-dd").parse(sc);
                    sc1 = new SimpleDateFormat("yyyy-MM-dd").format(scrq);
                }
                bgsj_map.put("scrq", sc1);
//                String lr = bgsj_map.get("lrrq").toString();
//                String lr1 = "";
//                if (panduan(lr)){
//                    Date lrrq = new SimpleDateFormat("yyyy-MM-dd").parse(lr);
//                    lr1 = new SimpleDateFormat("yyyy-MM-dd").format(lrrq);
//                }
//                bgsj_map.put("lrrq",lr1);
                String cr = bgsj_map.get("cyrq").toString();
                String cr1 = "";
                if (panduan(cr)) {
                    Date cyrq = new SimpleDateFormat("yyyy-MM-dd").parse(cr);
                    cr1 = new SimpleDateFormat("yyyy-MM-dd").format(cyrq);
                }
                bgsj_map.put("cyrq", cr1);
                SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                String format = df.format(new Date());
                bgsj_map.put("jcrq", format);
//                    Object ypxt = bgsj_map.get("ypxt");
//                    String s4 = Objects.toString(ypxt);
//                    String ypxt1 = null;
//                    switch (s4){
//                        case "1":
//                            ypxt1 = "固态";
//                            break;
//                        case "2":
//                            ypxt1 = "液态";
//                            break;
//                        case "3":
//                            ypxt1 = "气态";
//                            break;
//                        case "4":
//                            ypxt1 = "其他";
//                            break;
//                    }
                Object jcyj = bgsj_map.get("jcyj");
                String jcyj1 = Objects.toString(jcyj);
                bgsj_map.put("jcyj", jcyj1);
                bgsj_map.put("jylb", jylb1);
//                    bgsj_map.put("ypxt",ypxt1);
                dataMap.put("cpbz", "");
                dataMap.put("jyhj", "符合检验要求");
                dataMap.put("ffbz", "");
                dataMap.put("jyyqq", "");
                String jyjl = "";
                List<String> jl = new ArrayList<>();
                List<Map> list1 = this.bgglMapper.findById1(id);
                List<Map> list2 = this.bgglMapper.findjczz(id);
                for (Map map2 : list2) {
                    for (Map map1 : list1) {
                        if (!"".equals(map1.get("xlz"))) {
                            Double xlz = Double.parseDouble(map1.get("xlz").toString().trim());
                            if (!"".equals(map2.get("jcz"))) {
                                Double jcz = Double.parseDouble(map2.get("jcz").toString().trim());
                                if (jcz < xlz) {
                                    break;
                                } else {
                                    jyjl = map1.get("jyxm").toString() + " ";
                                    jl.add(jyjl);
                                }
                            }
                        }
                    }
                }
                new ArrayList<>(new HashSet<>(jl));
                if (jyjl.equals("")) {
                    dataMap.put("jyjl", "该批次所检合格");
                } else {
                    dataMap.put("jyjl", "该批次所检" + jyjl + "不合格");
                }
                dataMap.put("bz", "");
                dataMap.put("jcrq", "");
                List<Map> jcx = bgglService.findJcx(id);
                String aa = "";
                for (Map a : jcx) {
                    aa = aa + a.get("Jcx") + ",";
                }
                String b = aa.substring(0, aa.length() - 1);
                Map jcx_map = jcx.get(0);
                jcx_map.put("Jcx", b);
                dataMap.putAll(jcx_map);
                List<Map> ffbz1 = bgglService.findFfbz(id);
                String ffbz2 = "";
                for (Map f : ffbz1) {
                    ffbz2 = ffbz2 + f.get("ffbz") + ",";
                }
                String ff = ffbz2.substring(0, ffbz2.length() - 1);
                Map ffbz_map = ffbz1.get(0);
                ffbz_map.put("ffbz", ff);
                List<Map> jyyq = bgglService.findjyyq(id);
                String jyyq1 = "";
                for (Map yq : jyyq) {
                    jyyq1 = jyyq1 + yq.get("jyyq") + ",";
                }
                String jyyq2 = jyyq1.substring(0, jyyq1.length() - 1);
                Map jyyq_map = jyyq.get(0);
                jyyq_map.put("jyyq", jyyq2);
                dataMap.putAll(jyyq_map);
                dataMap.putAll(ffbz_map);
                dataMap.putAll(byid_map);
                dataMap.putAll(bgsj_map);
                Set<String> set = dataMap.keySet();
                for (String s6 : set) {
                    if ("".equals(dataMap.get(s6))) {
                        dataMap.put(s6, "/");
                    }
                }
                String fileurl = WordUtil.createWord(request, dataMap);
                m.put("BGLJ", fileurl);
                mapList.add(m);
            }
            bgglService.updatebg(mapList);
            System.out.print(123);

        } else {
            Map data = getQueryTj(request);
            Map params = getMap(request.getParameterMap());
            data.putAll(params);
            String zydm = CurrentLoginUser.getUser().getZydm();
            // 003 退回
            String id = data.get("id") + "";
            String ids[] = id.split(",");
            List<Map> mapList = new ArrayList<>();
            for (int i = 0; i < ids.length; i++) {
                Map m = new HashMap();
                m.put("lx", data.get("lx"));
                m.put("id", ids[i]);
                m.put("zt", data.get("zt"));
                m.put("zydm", zydm);
                m.put("if_zx", "001");
                mapList.add(m);
            }
            bgglService.updatezt(mapList);
        }

        jsonObject.put("success", true);
/*        }catch (Exception e){
            jsonObject.put("success", false);
            jsonObject.put("message","保存失败！");
           e.printStackTrace();
        }*/
        return jsonObject;

    }

    @RequestMapping(value = "/ypbg")
    @ResponseBody
    public String createYpBg(HttpServletRequest request) {
        String ypbm = request.getParameter("ypbm");
        Map map = this.bgglMapper.findxhbg(ypbm);
        System.out.print(map);
        String yplj = WordUtil5.createWord(request, map);
        System.out.print(yplj);
        this.bgglMapper.ypxhbg(yplj, ypbm);
        return "1";
    }

    public static boolean panduan(String s) {
        if ("".equals(s)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 获得人员的信息
     *
     * @return
     */
    @RequestMapping(value = "/rydm", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> rydm() {
        return bgglMapper.rydm("业务室");
    }

    //报告审核人
    @RequestMapping(value = "/shrydm", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> shrydm() {
        return bgglMapper.shrydm();
    }

    //报告批准人
    @RequestMapping(value = "/pzrydm", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> pzrydm() {
        return bgglMapper.pzrydm();
    }

    //报告主检验人
    @RequestMapping(value = "/zjrydm", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> zjrydm() {
        return bgglMapper.zjrydm();
    }


    /**
     * 报告分配 四个按钮合一 啊
     */
    @RequestMapping(value = "/bgfp/saveBgfp", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveBgfp(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        Map mapList = new HashMap();
        Map map = getMap(request.getParameterMap());
        String bzr = (String) map.get("bzr");//编制人
        String bzrlx = (String) map.get("bzrlx");//编制类型
        String shr = (String) map.get("shr");//审核人
        String shrlx = (String) map.get("shrlx");//审核类型
        String pzr = (String) map.get("pzr");//批准人
        String pzrlx = (String) map.get("pzrlx");//批准人类型
        //  String dyr=(String)map.get("dyr");//打印人
        //  String dyrlx=(String)map.get("dyrlx");//打印人
        String ypid = (String) map.get("ypid");//样品id
        String lrry = CurrentLoginUser.getUser().getZydm();//录入人员
        mapList.put("ypid", ypid);
        mapList.put("lrry", lrry);
        if (bzr != null && !"".equals(bzr)) {//报告主检人
            mapList.put("zxry_dm", bzr);
            mapList.put("lx", bzrlx);
            bgglMapper.addBgfpAll(mapList);
            bgglMapper.updateBgbzzt(mapList);
        }
        if (shr != null && !"".equals(shr)) {//报告审核
            mapList.put("zxry_dm", shr);
            mapList.put("lx", shrlx);
            bgglMapper.addBgfpAll(mapList);
            bgglMapper.updateBgshzt(mapList);
        }
        if (pzr != null && !"".equals(pzr)) {//报告批准
            mapList.put("zxry_dm", pzr);
            mapList.put("lx", pzrlx);
            bgglMapper.addBgfpAll(mapList);
            bgglMapper.updateBgpzzt(mapList);
        }
//        if(dyr!=null && !"".equals(dyr)){//报告打印
//            mapList.put("zxry_dm",dyr);
//            mapList.put("lx",dyrlx);
//            bgglMapper.addBgfpAll(mapList);
//            bgglMapper.updateBgdyzt(mapList);
//        }
        json.put("success", true);
        return json;
    }

    //报告退回原因
    @RequestMapping(value = "/thyy")
    @ResponseBody
    public JSONObject thyy(HttpServletRequest request) {
        JSONObject object = new JSONObject();
        Map map = new HashMap();
        String thyy = request.getParameter("thyy");
        String lx = request.getParameter("lx");
        String ypbms = request.getParameter("ypbm");
        String[] ypbms1 = ypbms.split(",");
        try {
            for (String ypbm : ypbms1) {
                String id = tqywtMapper.findYpidByYpbm(ypbm);
                map.put("thyy", thyy);
                map.put("id", id);
                map.put("lx", lx);
                map.put("zydm", CurrentLoginUser.getUser().getZydm());
                bgglMapper.updatethyy(map);
            }
            object.put("success", true);
        } catch (Exception e) {
            object.put("success", false);
            object.put("message", "操作失败！");
        }
        return object;
    }


    // 获得报告退回的记录
    @RequestMapping(value = "/bgthjl/queryThjlList", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage queryThjlList(HttpServletRequest request) {
        Map map = getQueryTj(request);
        String ypmc = request.getParameter("ypmc");
        if (notNULL(ypmc)) {
            map.put("ypmc", ypmc);
        }
        Integer totalCount = bgglMapper.findThjlListNum(map);
        List<Map> list = bgglMapper.findThjlList(map);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 删除退回记录
     */
    @RequestMapping(value = "/bgthjl/delThjlByIds", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject delThjlByIds(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        List<String> list = new ArrayList<String>();
        String[] ids = request.getParameter("ids").split(",");
        for (int i = 0; i < ids.length; i++) {
            list.add(ids[i]);
        }
        bgglMapper.delThjlByIds(list);
        json.put("success", true);
        return json;
    }

    @RequestMapping(value = "/getwdsd/{id}")
    @ResponseBody
    public JSONObject getwdsd(@PathVariable("id") String id) {
        Tqywt tqywt = bgglMapper.findWdsd(id);
        JSONObject object = new JSONObject();
        object.put("success", true);
        object.put("data", tqywt);
        return object;
    }

    /**
     * 根据id获取客户信息
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/updatewdsd/{id}")
    @ResponseBody
    public JSONObject updatewdsd(@RequestBody String khxx, @PathVariable("id") String id) {
        Tqywt tqywt = JSON.parseObject(khxx, Tqywt.class);
        tqywt.setId(Long.parseLong(id));
        bgglMapper.updateWdsd(tqywt);
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }

    /**
     * 报告编制（原报告打印），新报告打印才用批量打印本方法生成的文件。
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/dywtbg")
    public String qywtbg(HttpServletRequest request) {
        WordDocument doc = new WordDocument();

        String wtids = request.getParameter("wtid");
        String ypbms = request.getParameter("ypbm");
        String cd = request.getParameter("cd");
        String ifdy = request.getParameter("ifdy");
        String ifzb = request.getParameter("ifzb");
        String ifbgdy = request.getParameter("ifbgdy");
        String radio = request.getParameter("radio");
        User u = CurrentLoginUser.getUser();
        String zydm = u.getZydm();
        Map map = new HashMap();
        map.put("wtid", wtids);
        map.put("ypbm", ypbms);
        map.put("bgzbr", zydm);
        if ("1".equals(ifzb)) {
            //插入报告编制日期和报告编制人
            bgglMapper.insertBzrq(map);
        }
        //如果是在报告印页面进入的记录打印人和打印时间
        if ("1".equals(ifbgdy)) {

            map.put("bgdyr", zydm);
            bgglMapper.insertBgdyry(map);
        }

        /*//查询样品id
        String yangpid = bgglMapper.selectid(map);*/
        //查询仪器
        List<Map> yqsblist = new ArrayList<>();
        List<Map> yqsblist2 = bgglMapper.yqsbz(map);
        List<Map> yqsblist1 = bgglMapper.yqsb(map);
        if (yqsblist2.size() == 0) {
            yqsblist = yqsblist1;
        } else {
            yqsblist = yqsblist2;
        }
        //获取检验报告类型
        String bglx = bgglMapper.bglx(map);
        //查询检测项目
        List<Map> jcxlist = bgglMapper.cxJcxm(map);
        //查询检测项目温度和湿度
        List<Map> wdSdList = bgglMapper.wdAndSd(map);
        //查询打印内容
        List<Map> list = bgglMapper.dywtbg(map);
        //获取温度和湿度
        String maxwd = String.valueOf(wdSdList.get(0).get("maxwd")+"");
        String minwd = String.valueOf(wdSdList.get(0).get("minwd")+"");
        String maxsd = String.valueOf(wdSdList.get(0).get("maxsd")+"");
        String minsd = String.valueOf(wdSdList.get(0).get("minsd")+"");
        //获取打印内容
        String wtid = String.valueOf(list.get(0).get("wtid"));
        String ypmc = String.valueOf(list.get(0).get("ypmc"));
        String cydbm = String.valueOf(list.get(0).get("cydbm"));
        cydbm = setEmpty(cydbm);
        String ggxh = String.valueOf(list.get(0).get("ggxh"));
        ggxh = setEmpty(ggxh);
        String dwmc = String.valueOf(list.get(0).get("dwmc"));
        String jylb = String.valueOf(list.get(0).get("jylb"));
        String wtdw = String.valueOf(list.get(0).get("wtdw"));
        String rqlxxz = String.valueOf(list.get(0).get("rqlxxz"));
        String wtdwdz = String.valueOf(list.get(0).get("wtdwdz"));
        String wtdwyzbm = String.valueOf(list.get(0).get("wtdwyzbm"));
        String wtdwdh = String.valueOf(list.get(0).get("wtdwdh"));
        String wtdwcz = String.valueOf(list.get(0).get("wtdwcz"));
        String bgzbrq = String.valueOf(list.get(0).get("bbbzrq"));
        String sb = String.valueOf(list.get(0).get("sb"));
        sb = setEmpty(sb);
        String ypdj = String.valueOf(list.get(0).get("ypdj"));
        ypdj = setEmpty(ypdj);



        String scdwlxdh = String.valueOf(list.get(0).get("scdwlxdh"));
        String scdw = String.valueOf(list.get(0).get("scdw"));
        scdw = setEmpty(scdw);
        String wtdwanddh = String.valueOf(list.get(0).get("wtdwanddh"));
        String ypsl = String.valueOf(list.get(0).get("ypsl"));
        ypsl = setEmpty(ypsl);
        String ypbm = String.valueOf(list.get(0).get("ypbm"));
        String syrq = String.valueOf(list.get(0).get("syrq"));
        syrq = setEmpty(syrq);
        String scrq = String.valueOf(list.get(0).get("scrq"));
        scrq = setEmpty(scrq);
        String syry = String.valueOf(list.get(0).get("syry"));
        String shouydz = String.valueOf(list.get(0).get("shouydz"));
        shouydz = setEmpty(shouydz);
        String jywcrq = String.valueOf(list.get(0).get("jywcrq"));
        jywcrq = setEmpty(jywcrq);
        String ypzt = String.valueOf(list.get(0).get("ypzt"));
        String ypxt = String.valueOf(list.get(0).get("ypxt"));
        String rwdwmc = String.valueOf(list.get(0).get("rwdwmc"));
        rwdwmc = setEmpty(rwdwmc);
        String rwlxdh = String.valueOf(list.get(0).get("rwlxdh"));
        String scdz = String.valueOf(list.get(0).get("scdz"));

        //这个 是 报告的 生产单位  其拼接  生产单位名称   生产单位地址   生产单位联系电话 目前没有间隔  有问题
        //重新修改 用java 判定

        String bgscdw="";//报告中的生产单位
        if(scdw.trim().length()>1)
        {
            bgscdw+=scdw;
        }
        if(scdz.trim().length()>1)//生产单位地址
        {
            if(bgscdw.trim().length()>1)
            {
                bgscdw+="  "+scdz;
            }else
            {
                bgscdw+=scdz;
            }
        }
        /*if(scdwlxdh.trim().length()>1)//生产单位联系电话
        {
            if(bgscdw.trim().length()>1)
            {
                bgscdw+="  "+scdwlxdh;
            }else
            {
                bgscdw+=scdwlxdh;
            }
        }*/
        if(bgscdw.trim().length()==0)//三个都没有内容 则赋值 "/"
        {
            bgscdw="/";
        }


        String scdwanddh = bgscdw;


        if ("1".equals(ypxt)) {
            ypxt = "固体";
        } else if ("2".equals(ypxt)) {
            ypxt = "半固体";
        } else if ("3".equals(ypxt)) {
            ypxt = "液体";
        } else if ("4".equals(ypxt)) {
            ypxt = "气体";
        }
        String jyyj = String.valueOf(list.get(0).get("jyyj"));
//        jyyj = setEmpty(jyyj);
        String jyyjbzqt = String.valueOf(list.get(0).get("jyyjbzqt"));
        jyyjbzqt = setEmpty(jyyjbzqt);
        String jyjl = String.valueOf(list.get(0).get("jyjl"));
        jyjl = setEmpty(jyjl);
        String bz = String.valueOf(list.get(0).get("bz"));
        bz = setEmpty(bz);
        String bbbzrq = String.valueOf(list.get(0).get("bbbzrq"));
        bbbzrq = setEmpty(bbbzrq);
        String bbpzrq = String.valueOf(list.get(0).get("bbpzrq"));
        bbpzrq = setEmpty(bbpzrq);
        String bbzsrq = String.valueOf(list.get(0).get("bbzsrq"));
        bbzsrq = setEmpty(bbzsrq);
        String jcxm = String.valueOf(list.get(0).get("jcxm"));
        String jcxmsl = String.valueOf(list.get(0).get("jcxmsl"));

        if(jcxmsl==null || jcxmsl.trim().length()==0 || jcxmsl.equals("0") || jcxmsl.equals("1"))
        {

        }else
        {
            jcxm=jcxm+"等"+jcxmsl+"项";
        }


        String sjdw = String.valueOf(list.get(0).get("sjdw"));
        sjdw = setEmpty(sjdw);
        String sjdwlxr = String.valueOf(list.get(0).get("sjdwlxr"));
        sjdwlxr = setEmpty(sjdwlxr);
        String bcjdwlxr = String.valueOf(list.get(0).get("bcjdwlxr"));
        bcjdwlxr = setEmpty(bcjdwlxr);
        String bcjdwdz = String.valueOf(list.get(0).get("bcjdwdz"));
        bcjdwdz = setEmpty(bcjdwdz);
        String sjdwlxdh = String.valueOf(list.get(0).get("sjdwlxdh"));
        sjdwlxdh = setEmpty(sjdwlxdh);
        String frdb = String.valueOf(list.get(0).get("frdb"));
        frdb = setEmpty(frdb);
        String sjdwxxdz = String.valueOf(list.get(0).get("sjdwxxdz"));
        sjdwxxdz = setEmpty(sjdwxxdz);
        String cyrq = String.valueOf(list.get(0).get("cyrq"));
        cyrq = setEmpty(cyrq);
        String rwly = String.valueOf(list.get(0).get("rwly"));
        rwly = setEmpty(rwly);
        String cyry = String.valueOf(list.get(0).get("cyry"));
        String cydw = String.valueOf(list.get(0).get("cydw"));
        cydw = setEmpty(cydw);
        String cyjs = String.valueOf(list.get(0).get("cyjs"));
        String ybjs = String.valueOf(list.get(0).get("ybjs"));
        ybjs = setEmpty(ybjs);
        String ypddrq = String.valueOf(list.get(0).get("ypddrq"));
        String bgbzr = String.valueOf(list.get(0).get("bgzbr"));
        String bgpzr = String.valueOf(list.get(0).get("bgpzr"));
        String bgshr = String.valueOf(list.get(0).get("bgshr"));
        String ypjcsj = String.valueOf(list.get(0).get("ypjcsj"));
        ypjcsj = setEmpty(ypjcsj);
        String slrq = String.valueOf(list.get(0).get("slrq"));
        slrq = setEmpty(slrq);
        String jyrq=slrq+'~'+ypjcsj;
        String ypzxbz = String.valueOf(list.get(0).get("ypzxbz"));
        ypzxbz = setEmpty(ypzxbz);
        //采样单位电话 在政府里 是 委托单位电话
        String cydwdh = String.valueOf(list.get(0).get("cydwdh"));
        cydwdh = setEmpty(cydwdh);

        String cydwxxdz = String.valueOf(list.get(0).get("cydwxxdz"));
        cydwxxdz = setEmpty(cydwxxdz);
        //检验类别
        String jylbname = "";
        if ("dxbg".equals(jylb)) {
            jylbname = "典型报告";
        } else if ("jdjy".equals(jylb)) {
            jylbname = "监督检验";
        } else if ("dbsy".equals(jylb)) {
            jylbname = "对比实验";
        } else if ("wtjy".equals(jylb)) {
            jylbname = "委托检验";
        } else if ("zxjy".equals(jylb)) {
            jylbname = "专项检验";
        } else if ("ssjy".equals(jylb)) {
            jylbname = "型式检验";
        }
        //收样地址
        String sydz = "";
        if ("001".equals(shouydz)) {
            sydz = "检验机构受理处";
        } else if ("002".equals(shouydz)) {
            sydz = "委托/受检单位";
        }
        //报告签发日期
        String qfyear = bbbzrq.substring(0, 4);
        String qfmonth = bbbzrq.substring(5, 7);
        String qfday = bbbzrq.substring(8);
        //检验依据其他
        String jyyjz = "";
        if ("azxbz".equals(jyyj)) {
            jyyjz = "按执行标准";
        } else if ("ajswj".equals(jyyj)) {
            jyyjz = "按技术文件";
        } else if ("jyyjqt".equals(jyyj)) {
            jyyjz = "其它:" + jyyjbzqt;
        }

        //判断是否为存档
        if ("1".equals(cd)) {
            doc.openDataRegion("PO_cd").setValue("存档");
        }
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        String dateString = calendar.get(Calendar.YEAR) + " 年 " + (calendar.get(Calendar.MONTH) + 1) + " 月 " + calendar.get(Calendar.DAY_OF_MONTH) + " 日";
        doc.openDataRegion("PO_qfsj").setValue(dateString);

        //委托类型  001企业委托002个人003政府
        if ("003".equals(bglx)) {
            //检验报告第一页
            doc.openDataRegion("PO_wtbmz").setValue(wtid);
            doc.openDataRegion("PO_cpmc").setValue(ypmc);
            doc.openDataRegion("PO_ggxh").setValue(ggxh);
            doc.openDataRegion("PO_wtdw").setValue(cydw);
//            doc.openDataRegion("PO_wtdw").setValue(rwdwmc); //关联配置表取得任务类型对应的单位名称
            doc.openDataRegion("PO_jylb").setValue(jylbname);

            //检验报告第二页
            doc.openDataRegion("PO_sysdz").setValue(wtdwdz);
            doc.openDataRegion("PO_sysdh").setValue(wtdwdh);
            doc.openDataRegion("PO_syscz").setValue(wtdwcz);

            //检验报告第三页
            doc.openDataRegion("PO_wtbm").setValue(wtid);
            doc.openDataRegion("PO_ypmc").setValue(ypmc);
            doc.openDataRegion("PO_sb").setValue(sb);
            doc.openDataRegion("PO_ggxhz").setValue(ggxh);
            if ("3".equals(rqlxxz)) {
                doc.openDataRegion("PO_gjrq").setValue(scrq);
                doc.openDataRegion("PO_scrq").setValue("/");
            } else {
                doc.openDataRegion("PO_gjrq").setValue("/");
                doc.openDataRegion("PO_scrq").setValue(scrq);
            }

            //doc.openDataRegion("PO_scdwdh").setValue(scdw);
            doc.openDataRegion("PO_scdwdh").setValue(bgscdw);//这里改了 原来是   scdwanddh2019.07.03

            doc.openDataRegion("PO_wtdwdh").setValue(cydw);

            //被抽样单位   Sampled Entity
            //政府  受检单位     受检单位地址   受检单位法人 受检单位电话] 加备注  中间空格隔开
            //bcjdwdz 地址       frdb 法人代表      sjdwlxdh 联系电话
            String bcydwStr = "";
            if(sjdw!=null && !sjdw.equals("/"))
            {
                bcydwStr+=sjdw;
            }
            if(bcjdwdz!=null && !bcjdwdz.equals("/"))
            {
                bcydwStr+=" "+bcjdwdz;
            }
            if(frdb!=null && !frdb.equals("/"))
            {
                bcydwStr+="  "+frdb;
            }
            /*if(sjdwlxdh!=null && !sjdwlxdh.equals("/"))
            {
                bcydwStr+="  "+sjdwlxdh;
            }*/
            if(bcydwStr.trim().length()==0)
            {
                bcydwStr="/";
            }

//            doc.openDataRegion("PO_wtdwdh").setValue(rwdwmc);
            doc.openDataRegion("PO_sjdw").setValue(bcydwStr);
            doc.openDataRegion("PO_sjdwlxr").setValue(bcjdwlxr);
            doc.openDataRegion("PO_sjdwxxdz").setValue(bcjdwdz);
            doc.openDataRegion("PO_sjdwlxdh").setValue(sjdwlxdh);
            doc.openDataRegion("PO_bcsczmc").setValue(scdwlxdh);//标称
            doc.openDataRegion("PO_rwly").setValue(rwly);
            doc.openDataRegion("PO_cyrq").setValue(cyrq);
//            doc.openDataRegion("PO_cydw").setValue(cydw);//页面上没有抽样单位输入的地方，暂时放抽样人员数据
            doc.openDataRegion("PO_cydw").setValue(cyry);
            doc.openDataRegion("PO_cyjs").setValue(ybjs);
            doc.openDataRegion("PO_ypsl").setValue(ypsl);
            //doc.openDataRegion("PO_ypbm").setValue(ypbm);
            doc.openDataRegion("PO_ypbm").setValue(cydbm);
            doc.openDataRegion("PO_dj").setValue(ypdj);
            doc.openDataRegion("PO_ypddrq").setValue(syrq);
            doc.openDataRegion("PO_ypzt").setValue(ypxt);
            doc.openDataRegion("PO_cyry").setValue(cyry);
            //doc.openDataRegion("PO_jyrq").setValue(ypjcsj);
            doc.openDataRegion("PO_jyrq").setValue(jyrq);
            doc.openDataRegion("PO_jylbz").setValue(jylbname);


            doc.openDataRegion("PO_jyxm").setValue(jcxm);


            doc.openDataRegion("PO_jyyj").setValue(ypzxbz+"方法标准见试验说明");


            //检验依据和检验结论待确认

            doc.openDataRegion("PO_wtbz").setValue(bz);



            doc.openDataRegion("PO_pzrq").setValue(bbpzrq);
            doc.openDataRegion("PO_shrq").setValue(bbzsrq);
            doc.openDataRegion("PO_bzrq").setValue(bbbzrq);
            doc.openDataRegion("PO_wtid").setValue(wtid);
            //报告签发日期
            doc.openDataRegion("PO_yeat").setValue(qfyear);
            doc.openDataRegion("PO_month").setValue(qfmonth);
            doc.openDataRegion("PO_day").setValue(qfday);


            //放入温度和湿度
            doc.openDataRegion("PO_maxwd").setValue(maxwd);
            doc.openDataRegion("PO_minwd").setValue(minwd);
            doc.openDataRegion("PO_maxsd").setValue(maxsd);
            doc.openDataRegion("PO_minsd").setValue(minsd);

            //放入签名照片
            DataRegion dataRegion1 = doc.openDataRegion("PO_bgpzr");
            String bgpzrz = this.bgglMapper.getDzqz(bgpzr);
            dataRegion1.setValue("[image]" + "../" + bgpzrz + "[/image]");

            DataRegion dataRegion2 = doc.openDataRegion("PO_bgshr");
            String bgshrz = this.bgglMapper.getDzqz(bgshr);
            dataRegion2.setValue("[image]" + "../" + bgshrz + "[/image]");

            DataRegion dataRegion3 = doc.openDataRegion("PO_bgbzr");
            String bgbzrz = this.bgglMapper.getDzqz(bgbzr);
            dataRegion3.setValue("[image]" + "../" + bgbzrz + "[/image]");

            DataRegion drTable1 = doc.openDataRegion("PO_jyxmtable");
            Table table = drTable1.openTable(1);

            String jyjg = "";
            //检测项目+检测方法拼接字符串
            String jcxmFf = "";
            //是否判定合格不合格
            String if_hg = "";
            //判断总结论是否为合格
            int hgnum = 0;
            String jyjlall = "";
            int jcxcount = jcxlist.size();
            List<String> jybzList = new ArrayList<>();
            boolean isOk = true;
            List<Map> jcxBgList = new ArrayList<>();
            Map<String,String> jcxSmMap = new HashMap();
            for (int i = 0; i < jcxcount; i++) {
                String jcxmxlz = String.valueOf(jcxlist.get(i).get("xlz"));
                String zwmc_bm = String.valueOf(jcxlist.get(i).get("zwmc_bm"));
                String jsyq = String.valueOf(jcxlist.get(i).get("jsyq"));
                String jcz = String.valueOf(jcxlist.get(i).get("jcz"));
                String if_pd = String.valueOf(jcxlist.get(i).get("if_pd"));
                String jcxmbz = String.valueOf(jcxlist.get(i).get("bz"));
                String jcff = String.valueOf(jcxlist.get(i).get("jcff"));
                String jcfa = String.valueOf(jcxlist.get(i).get("jcfa"));
                String pdyj = String.valueOf(jcxlist.get(i).get("pdyj"));
                String jldw = String.valueOf(jcxlist.get(i).get("jldw"));
                String jcxmjl = String.valueOf(jcxlist.get(i).get("jcxmjl"));
                String jcxstr = jcxlist.get(i).get("jcx")+"";//检出限
                String xlzdw = jcxlist.get(i).get("xlzdw")+"";//检出限
                String jcyj = jcxlist.get(i).get("jcyj")+"";//检测依据 检测项的 检测依据 标准号
                String ypjcxid = jcxlist.get(i).get("ypjcxid")+"";//检测项主见ID

                if(i==0)
                {
                    jcxSmMap.put(jcyj,zwmc_bm);
                }else //要判断检测依据对应的检测名字在不在
                {
                    String tempZwmc = jcxSmMap.get(jcyj)==null?"":jcxSmMap.get(jcyj)+"";
                    if(tempZwmc.trim().length()!=0)//找到 检测依据 对应的名字，也就是说这个检测依据重复， 那将名字 做连接在写回去
                    {
                        jcxSmMap.put(jcyj,tempZwmc+"、"+zwmc_bm);
                    }else{//检测依据不存在 则 新加一个检测依据
                        jcxSmMap.put(jcyj,zwmc_bm);
                    }
                }
                //判断检测值如果不是数字 那么找找里面有没有 逗号 ，如果有逗号 则换行
                if(jcz!=null && jcz.trim().length()!=0 && !isDouble(jcz))
                {
                    if(jcz.indexOf(",")!=-1 || jcz.indexOf("，")!=-1)//判断有半角 或者 全角逗号
                    {
                        jcz = jcz.replaceAll(",", jldw+"\r\n");
                        jcz = jcz.replaceAll("，", jldw+"\r\n");
                    }
                }

                /*
                1、结论 只要选择 不判定，原样显示 不做任何操作，值原样显示不带符号。
                2、结论 只要进行人工选择，就不自动计算结论，已人工选择为主。
                3、全部输入数字，并且 结论 没有选择，结论是空的，那么才会计算。
                4、输入内容有文本，强制提示必须选择结论。
                5、限量值为数字且结论不是不判定，才会带<=符号
                6、检测值=0，才是 未检出，只有 结论不是 不判定 才会做判定。
                 */
                if(jcxmjl!=null && !jcxmjl.equals("null") && jcxmjl.equals("2"))//不判定
                {
                    //jsyq 检测要求
                    //jyjg 检验结果
                    //if_hg 结论
                    jsyq=jcxmxlz+jldw; //检测要求固定写 限量值
                    jyjg = jcz+jldw;//检验结果固定写检测值
                    if_hg = "不判定";//结论固定  不判定

                }else if(jcxmjl!=null && !jcxmjl.equals("null")  && !jcxmjl.equals("2") && !jcxmjl.equals("")) //检测结论不为空，不是 判定结论， 说明是 合格 或 不合格
                {
                    if(jcxmjl.equals("1"))
                    {
                        if_hg="合格";
                    }else{
                        if_hg="不合格";
                        isOk = false;
                    }
                    if(isDouble(jcxmxlz)) {
                        if(Double.parseDouble(jcxmxlz)==0) {
                            jsyq="不得检出";
                        }else
                        {
                            jsyq = "≤" + jcxmxlz + jldw;
                        }
                    }else{
                        jsyq=jcxmxlz+jldw;
                    }
                    if(isDouble(jcz)) {
                        if(jcz.equals("0")) //检测值是0
                        {
                            if(jcxstr==null ||jcxstr.equals("null") || jcxstr.trim().length()==0) {//表示没有检出限
                                jyjg = "未检出";
                            }else
                            {
                                jyjg = "未检出"+(char)11+"(检出限" + jcxstr + jldw + ")";
                            }
                        }else
                        {
                            jyjg = jcz+jldw; //不是0，检验结果就是  检测值 + 单位
                        }
                    }else{//检测值是 字符串 那么 检验结果 就是 jcz+单位
                        jyjg=jcz+jldw;
                    }

                }else if(jcxmjl==null || jcxmjl.equals("null")  || jcxmjl.equals("")) //结论空了 这个需要计算，前台控制了 输入 ，肯定都是数字
                {
                    if (isDouble(jcz) && isDouble(jcxmxlz)) {    //页面可以随意输入了，如果不是数字类型不做比较直接使用页面输入的信息。如果是数字走之前的逻辑
                        //jsyq = "≤"+jcxmxlz+jldw;
                        if(Double.parseDouble(jcxmxlz)==0) {
                            jsyq="不得检出";
                        }else
                        {
                            jsyq = "≤" + jcxmxlz + jldw;
                        }
                        //若检测值大于限定值，结果为不合格，否则为合格
                        if (Double.valueOf(jcz) > Double.valueOf(jcxmxlz)) {
                            if_hg = "不合格";
                            isOk = false;
                        } else {
                            if_hg = "合格";
                        }
                    }
                    if(isDouble(jcz)) {
                        if(jcz.equals("0")) //检测值是0
                        {
                            if(jcxstr==null || jcxstr.equals("null") || jcxstr.trim().length()==0) {//表示没有检出限
                                jyjg = "未检出";
                            }else
                            {
                                jyjg = "未检出"+(char)11+"(检出限" + jcxstr + jldw + ")";
                            }
                        }else
                        {
                            jyjg = jcz+jldw; //不是0，检验结果就是  检测值 + 单位
                        }
                    }else{//检测值是 字符串 那么 检验结果 就是 jcz+单位
                        jyjg=jcz+jldw;
                    }
                }

                if (jybzList.indexOf(pdyj) < 0) {
                    jybzList.add(pdyj);
                }

                table.openCellRC((i + 2), 1).setValue(String.valueOf((i + 1)));
                table.openCellRC((i + 2), 2).setValue(String.valueOf(zwmc_bm));
                table.openCellRC((i + 2), 3).setValue(String.valueOf(jsyq));
                table.openCellRC((i + 2), 4).setValue(String.valueOf(jyjg));
                table.openCellRC((i + 2), 5).setValue(String.valueOf(if_hg));
                table.openCellRC((i + 2), 6).setValue(String.valueOf(jcxmbz));
                if ((i + 1) != jcxlist.size()) {
                    table.insertRowAfter(table.openCellRC((i + 2), 6));
                }
                Map bgJcxMap = new HashMap();
                bgJcxMap.put("bg_jsyq",jsyq);
                bgJcxMap.put("bg_jyjg",jyjg);
                bgJcxMap.put("bg_dxpd",if_hg);
                bgJcxMap.put("ypjcxid",ypjcxid);
                jcxBgList.add(bgJcxMap);//记录 报告里生成的检测项 信息 ，要会写到 t_yp_jcxm表
            }

            //////////////////////////将报告的 检测项信息保存回去，用于后期 各种统计报表
            if(jcxBgList.size()>0)
            {
                this.bgglMapper.bgbzJcxUpdate(jcxBgList);
            }


            ////////////////////////


            //生成  温度下面的 检测项目说明
            int idx=0;
            //迭代 jcxSmMap
            for (String jcyj : jcxSmMap.keySet()) {
               String zwmc = jcxSmMap.get(jcyj);
                if (idx == 0) {
                    jcxmFf = zwmc + "：按" + jcyj + "检测。";
                } else {
                    jcxmFf = jcxmFf + "\r\n·" + zwmc + "：按" + jcyj + "检测";
                }
                idx=1;
            }


            doc.openDataRegion("PO_jcxm").setValue(jcxmFf);

            doc.openDataRegion("PO_jyjl").setValue(jyjlall);
            String jybzStr = String.join(",", (String[]) jybzList.toArray(new String[jybzList.size()]));
            doc.openDataRegion("PO_jyyj").setValue(jybzStr+(char)11+"方法标准见试验说明");
            int yqsbstartrow = jcxcount + 7;
            int yqsbcount = yqsblist.size();
            for (int i = 0; i < yqsbcount; i++) {
                String sbmc = String.valueOf(yqsblist.get(i).get("sbmc"));
                String skbh = String.valueOf(yqsblist.get(i).get("skbh"));
                String ggxhz = String.valueOf(yqsblist.get(i).get("ggxh"));
                String cybh = String.valueOf(yqsblist.get(i).get("cybh"));

                table.openCellRC((i + yqsbstartrow), 1).setValue(String.valueOf(sbmc));
                table.openCellRC((i + yqsbstartrow), 2).setValue(String.valueOf(skbh));
                table.openCellRC((i + yqsbstartrow), 3).setValue(String.valueOf(ggxhz));
                table.openCellRC((i + yqsbstartrow), 4).setValue(String.valueOf(cybh));
                if ((i + 1) != yqsblist.size()) {
                    table.insertRowAfter(table.openCellRC((i + yqsbstartrow), 4));
                }
            }
            //总检验结论
            if (isOk) {
                doc.openDataRegion("PO_jyjl").setValue("该样品本次检验，所检项目合格");
            } else {
                doc.openDataRegion("PO_jyjl").setValue("该样品本次检验，所检项目存在不合格项");
            }
            int c = new Double(Math.ceil(jcxcount / 3)).intValue();
            if (yqsbstartrow + yqsbcount + c < 21) {
                DataRegion drTable2 = doc.openDataRegion("PO_kbtc");
                Table table2 = drTable2.openTable(1);
                int row = 21 - (yqsbstartrow + yqsbcount + c);
                for (int k = 0; k < row; k++) {
                    table2.insertRowAfter(table2.openCellRC((k + 1), 4));
                }
            }

            PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
            request.setAttribute("poCtrl", poCtrl);
            //设置服务页面
            poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
//            poCtrl.setZoomSealServer(request.getContextPath() + "/poserver.zz");
            //添加保存按钮
            if ("1".equals(ifdy)) {
                poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
            }
            //poCtrl.addCustomToolButton("加盖骑缝章", "InsertSeal()", 2);
            poCtrl.setJsFunction_AfterDocumentOpened("AfterDocumentOpened()");
            /*poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
            poCtrl.addCustomToolButton("加盖印章", "InsertSeal()", 2);*/
            poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
            poCtrl.setWriter(doc);
            //设置保存页面
            poCtrl.setSaveFilePage("savebgfile?ypbm=" + wtid + "&radio=" + radio);


//            if ("1".equals(radio)){
//                poCtrl.webOpen("/customermanage/doc/fpModel.docx", OpenModeType.docReadOnly, "张三");
//            }else if ("2".equals(radio)){
//                poCtrl.webOpen("/customermanage/doc/zfwtbgnr.docx", OpenModeType.docReadOnly, "张三");
//            }else {
//                poCtrl.webOpen("/customermanage/doc/zfwtbg.docx", OpenModeType.docReadOnly, "张三");
//            }
            if ("1".equals(radio)) {
                poCtrl.webOpen("/customermanage/doc/bgzbfp.doc", OpenModeType.docAdmin, "admin");
            } else if ("2".equals(radio)) {
                poCtrl.webOpen("/customermanage/doc/zfbgzbnr.doc", OpenModeType.docAdmin, "admin");
            } else {
                poCtrl.webOpen("/customermanage/doc/zfbgzb.doc", OpenModeType.docAdmin, "admin");
            }
            //打开excel
            /*poCtrl.webOpen("/customermanage/doc/zfwtbg.docx", OpenModeType.docReadOnly, "张三");*/

        } else {
            //检验报告第一页
            doc.openDataRegion("PO_wtbmz").setValue(wtid);
            doc.openDataRegion("PO_cpmc").setValue(ypmc);
            doc.openDataRegion("PO_ggxh").setValue(ggxh);
            doc.openDataRegion("PO_wtdw").setValue(wtdw);
            doc.openDataRegion("PO_jylb").setValue(jylbname);

            //检验报告第二页
            doc.openDataRegion("PO_sysdz").setValue(wtdwdz);
            doc.openDataRegion("PO_sysdh").setValue(wtdwdh);
            doc.openDataRegion("PO_syscz").setValue(wtdwcz);
//            doc.openDataRegion("PO_jyrq").setValue(bgzbrq);
            //检验报告第三页
            doc.openDataRegion("PO_wtbm").setValue(wtid);
            doc.openDataRegion("PO_ypmc").setValue(ypmc);
            doc.openDataRegion("PO_sb").setValue(sb);
            doc.openDataRegion("PO_ggxhz").setValue(ggxh);
            doc.openDataRegion("PO_dj").setValue(ypdj);
            doc.openDataRegion("PO_scdwdh").setValue(scdwanddh);//标称这联系电话
            doc.openDataRegion("PO_scdwmcdz").setValue(scdw);
            doc.openDataRegion("PO_wtdwmcdz").setValue(wtdw + "/" + wtdwdz);
            doc.openDataRegion("PO_ypsl").setValue(ypsl);
           // doc.openDataRegion("PO_ypbm").setValue(ypbm);
            doc.openDataRegion("PO_ypbm").setValue(cydbm);
            doc.openDataRegion("PO_syrq").setValue(syrq);
            doc.openDataRegion("PO_scrq").setValue(scrq);
            doc.openDataRegion("PO_syry").setValue(syry);
            doc.openDataRegion("PO_sydd").setValue(sydz);
            //doc.openDataRegion("PO_jyrq").setValue(ypjcsj);
            doc.openDataRegion("PO_jyrq").setValue(jyrq);
            doc.openDataRegion("PO_jylbz").setValue(jylbname);
            doc.openDataRegion("PO_ypzt").setValue(ypzt);
            doc.openDataRegion("PO_jyxm").setValue(jcxm);
            doc.openDataRegion("PO_jyyj").setValue(ypzxbz+" 方法标准见试验说明");
            doc.openDataRegion("PO_wtbz").setValue(bz);
            doc.openDataRegion("PO_pzrq").setValue(bbpzrq);
            doc.openDataRegion("PO_shrq").setValue(bbzsrq);
            doc.openDataRegion("PO_bzrq").setValue(bbbzrq);

            /*doc.openDataRegion("PO_bgpzr").setValue(bgpzr);
            doc.openDataRegion("PO_bgshr").setValue(bgshr);
            doc.openDataRegion("PO_bgbzr").setValue(bgbzr);*/

            doc.openDataRegion("PO_wtid").setValue(wtid);
            //放入温度和湿度
            doc.openDataRegion("PO_maxwd").setValue(maxwd);
            doc.openDataRegion("PO_minwd").setValue(minwd);
            doc.openDataRegion("PO_maxsd").setValue(maxsd);
            doc.openDataRegion("PO_minsd").setValue(minsd);

            //放入签名照片
            DataRegion dataRegion1 = doc.openDataRegion("PO_bgpzr");
            String bgpzrz = this.bgglMapper.getDzqz(bgpzr);
            dataRegion1.setValue("[image]" + "../" + bgpzrz + "[/image]");

            DataRegion dataRegion2 = doc.openDataRegion("PO_bgshr");
            String bgshrz = this.bgglMapper.getDzqz(bgshr);
            dataRegion2.setValue("[image]" + "../" + bgshrz + "[/image]");

            DataRegion dataRegion3 = doc.openDataRegion("PO_bgbzr");
            String bgbzrz = this.bgglMapper.getDzqz(bgbzr);
            dataRegion3.setValue("[image]" + "../" + bgbzrz + "[/image]");

            DataRegion drTable1 = doc.openDataRegion("PO_jyxmtable");
            Table table = drTable1.openTable(1);

            String jyjg = "";

            String jcxmFf = "";
            String if_hg = "";
            List<String> jybzList = new ArrayList<String>();
            List<Map> zwList = new ArrayList<>();
            int jcxcount = jcxlist.size();
            Map<String,String> jcxSmMap = new Hashtable<>();
            List<Map> jcxBgList = new ArrayList<>();
            boolean isOk = true;
            for (int i = 0; i < jcxcount; i++) {
                String jcxmxlz = String.valueOf(jcxlist.get(i).get("xlz"));
                String zwmc_bm = String.valueOf(jcxlist.get(i).get("zwmc_bm"));
                String jsyq = String.valueOf(jcxlist.get(i).get("jsyq"));
                String jcz = String.valueOf(jcxlist.get(i).get("jcz"));
                String if_pd = String.valueOf(jcxlist.get(i).get("if_pd"));
                String jcxmbz = String.valueOf(jcxlist.get(i).get("bz"));
                String jcff = String.valueOf(jcxlist.get(i).get("jcff"));
                String jcfa = String.valueOf(jcxlist.get(i).get("jcfa"));
                String pdyj = String.valueOf(jcxlist.get(i).get("pdyj"));
                String jcxmjl = String.valueOf(jcxlist.get(i).get("jcxmjl"));
                String jldw = String.valueOf(jcxlist.get(i).get("jldw"));
                String jcxstr = jcxlist.get(i).get("jcx")+"";//检出限
                String jcyj = jcxlist.get(i).get("jcyj")+"";//检测依据 检测项的 检测依据 标准号
                String ypjcxid = jcxlist.get(i).get("ypjcxid")+"";//样品检测项id

                if(i==0)
                {
                    jcxSmMap.put(jcyj,zwmc_bm);
                }else //要判断检测依据对应的检测名字在不在
                {
                    String tempZwmc = jcxSmMap.get(jcyj)==null?"":jcxSmMap.get(jcyj)+"";
                    if(tempZwmc.trim().length()!=0)//找到 检测依据 对应的名字，也就是说这个检测依据重复， 那将名字 做连接在写回去
                    {
                        jcxSmMap.put(jcyj,tempZwmc+"、"+zwmc_bm);
                    }else{//检测依据不存在 则 新加一个检测依据
                        jcxSmMap.put(jcyj,zwmc_bm);
                    }
                }

                //判断检测值如果不是数字 那么找找里面有没有 逗号 ，如果有逗号 则换行
                if(jcz!=null && jcz.trim().length()!=0 && !isDouble(jcz))
                {
                    if(jcz.indexOf(",")!=-1 || jcz.indexOf("，")!=-1)//判断有半角 或者 全角逗号
                    {
                        jcz = jcz.replaceAll(",", jldw+"\r\n");
                        jcz = jcz.replaceAll("，", jldw+"\r\n");
                    }
                }


                /*
                1、结论 只要选择 不判定，原样显示 不做任何操作，值原样显示不带符号。
                2、结论 只要进行人工选择，就不自动计算结论，已人工选择为主。
                3、全部输入数字，并且 结论 没有选择，结论是空的，那么才会计算。
                4、输入内容有文本，强制提示必须选择结论。
                5、限量值为数字且结论不是不判定，才会带<=符号
                6、检测值=0，才是 未检出，只有 结论不是 不判定 才会做判定。
                 */
                if(jcxmjl!=null && !jcxmjl.equals("null") && jcxmjl.equals("2"))//不判定
                {
                    //jsyq 检测要求
                    //jyjg 检验结果
                    //if_hg 结论
                    jsyq=jcxmxlz+jldw; //检测要求固定写 限量值
                    jyjg = jcz+jldw;//检验结果固定写检测值
                    if_hg = "不判定";//结论固定  不判定

                }else if(jcxmjl!=null && !jcxmjl.equals("null") && !jcxmjl.equals("2") && !jcxmjl.equals("")) //检测结论不为空，不是 判定结论， 说明是 合格 或 不合格
                {
                    if(jcxmjl.equals("1"))
                    {
                        if_hg="合格";
                    }else{
                        if_hg="不合格";
                        isOk = false;
                    }
                    if(isDouble(jcxmxlz)) {
                        if(Double.parseDouble(jcxmxlz)==0) {
                            jsyq="不得检出";
                        }else
                        {
                            jsyq = "≤" + jcxmxlz + jldw;
                        }
                    }else{
                        jsyq=jcxmxlz+jldw;
                    }
                    if(isDouble(jcz)) {
                        if(jcz.equals("0")) //检测值是0
                        {
                            if(jcxstr==null || jcxstr.equals("null") || jcxstr.trim().length()==0) {//表示没有检出限
                                jyjg = "未检出";
                            }else
                            {
                                jyjg = "未检出"+(char)11+"(检出限" + jcxstr + jldw + ")";
                            }
                        }else
                        {
                            jyjg = jcz+jldw; //不是0，检验结果就是  检测值 + 单位
                        }
                    }else{//检测值是 字符串 那么 检验结果 就是 jcz+单位
                        jyjg=jcz+jldw;
                    }

                }else if(jcxmjl==null ||  jcxmjl.equals("null") ||jcxmjl.equals("")) //结论空了 这个需要计算，前台控制了 输入 ，肯定都是数字
                {
                    if (isDouble(jcz) && isDouble(jcxmxlz)) {    //页面可以随意输入了，如果不是数字类型不做比较直接使用页面输入的信息。如果是数字走之前的逻辑
                        if(Double.parseDouble(jcxmxlz)==0) {
                            jsyq="不得检出";
                        }else
                        {
                            jsyq = "≤" + jcxmxlz + jldw;
                        }
                        //若检测值大于限定值，结果为不合格，否则为合格
                        if (Double.valueOf(jcz) > Double.valueOf(jcxmxlz)) {
                            if_hg = "不合格";
                            isOk = false;
                        } else {
                            if_hg = "合格";
                        }
                    }
                    if(isDouble(jcz)) {
                        if(jcz.equals("0")) //检测值是0
                        {
                            if(jcxstr==null || jcxstr.equals("null") || jcxstr.trim().length()==0) {//表示没有检出限
                                jyjg = "未检出";
                            }else
                            {
                                jyjg = "未检出"+(char)11+"(检出限" + jcxstr + jldw + ")";
                            }
                        }else
                        {
                            jyjg = jcz+jldw; //不是0，检验结果就是  检测值 + 单位
                        }
                    }else{//检测值是 字符串 那么 检验结果 就是 jcz+单位
                        jyjg=jcz+jldw;
                    }
                }

                if (jybzList.indexOf(pdyj) < 0) {
                    jybzList.add(pdyj);
                }


                table.openCellRC((i + 2), 1).setValue(String.valueOf((i + 1)));
                table.openCellRC((i + 2), 2).setValue(String.valueOf(zwmc_bm));
                table.openCellRC((i + 2), 3).setValue(String.valueOf(jsyq));
                table.openCellRC((i + 2), 4).setValue(String.valueOf(jyjg));
                table.openCellRC((i + 2), 5).setValue(String.valueOf(if_hg));
                table.openCellRC((i + 2), 6).setValue(String.valueOf(jcxmbz));
                if ((i + 1) != jcxlist.size()) {
                    table.insertRowAfter(table.openCellRC((i + 2), 6));
                }

                Map bgJcxMap = new HashMap();
                bgJcxMap.put("bg_jsyq",jsyq);
                bgJcxMap.put("bg_jyjg",jyjg);
                bgJcxMap.put("bg_dxpd",if_hg);
                bgJcxMap.put("ypjcxid",ypjcxid);
                jcxBgList.add(bgJcxMap);//记录 报告里生成的检测项 信息 ，要会写到 t_yp_jcxm表
            }

            //////////////////////////将报告的 检测项信息保存回去，用于后期 各种统计报表
            if(jcxBgList.size()>0)
            {
                this.bgglMapper.bgbzJcxUpdate(jcxBgList);
            }


            //生成  温度下面的 检测项目说明
            int idx=0;
            //迭代 jcxSmMap
            for (String jcyj : jcxSmMap.keySet()) {
                String zwmc = jcxSmMap.get(jcyj);
                if (idx == 0) {
                    jcxmFf = zwmc + "：按" + jcyj + "检测";
                } else {
                    jcxmFf = jcxmFf + "\r\n • " + zwmc + "：按" + jcyj + "检测";
                }
                idx=1;
            }
            doc.openDataRegion("PO_jcxm").setValue(jcxmFf);
            String jybzStr = String.join(",", (String[]) jybzList.toArray(new String[jybzList.size()]));
            doc.openDataRegion("PO_jyyj").setValue(jybzStr);
            int yqsbstartrow = jcxcount + 7;
            int yqsbcount = yqsblist.size();
            for (int i = 0; i < yqsbcount; i++) {
                String sbmc = String.valueOf(yqsblist.get(i).get("sbmc"));
                String skbh = String.valueOf(yqsblist.get(i).get("skbh"));
                String ggxhz = String.valueOf(yqsblist.get(i).get("ggxh"));
                String cybh = String.valueOf(yqsblist.get(i).get("cybh"));

                table.openCellRC((i + yqsbstartrow), 1).setValue(String.valueOf(sbmc));
                table.openCellRC((i + yqsbstartrow), 2).setValue(String.valueOf(skbh));
                table.openCellRC((i + yqsbstartrow), 3).setValue(String.valueOf(ggxhz));
                table.openCellRC((i + yqsbstartrow), 4).setValue(String.valueOf(cybh));
                if ((i + 1) != yqsblist.size()) {
                    table.insertRowAfter(table.openCellRC((i + yqsbstartrow), 4));
                }
            }
            if (isOk) {
                doc.openDataRegion("PO_jyjl").setValue("该样品本次检验，所检项目合格");
            } else {
                doc.openDataRegion("PO_jyjl").setValue("该样品本次检验，所检项目存在不合格项");
            }
            if (yqsbstartrow + yqsbcount < 21) {
                DataRegion drTable2 = doc.openDataRegion("PO_kbtc");
                Table table2 = drTable2.openTable(1);
                int row = 21 - yqsbstartrow + yqsbcount;
                for (int k = 0; k < row; k++) {
                    table2.insertRowAfter(table2.openCellRC((k + 1), 4));
                }
            }
            PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
            request.setAttribute("poCtrl", poCtrl);
            //设置服务页面
            poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
//            poCtrl.setZoomSealServer(request.getContextPath() + "/poserver.zz");
            //添加保存按钮
            if ("1".equals(ifdy)) {
                poCtrl.addCustomToolButton("打印", "PrintFile()", 6);

            }
            poCtrl.addCustomToolButton("加盖骑缝章", "InsertSeal()", 2);
            poCtrl.setJsFunction_AfterDocumentOpened("AfterDocumentOpened()");
            /*poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
            poCtrl.addCustomToolButton("加盖印章", "InsertSeal()", 2);*/
            poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
            poCtrl.setWriter(doc);
            //设置保存页面
            poCtrl.setSaveFilePage("savebgfile?ypbm=" + wtid + "&radio=" + radio);

//            if ("1".equals(radio)){
//                poCtrl.webOpen("/customermanage/doc/fpModel.docx", OpenModeType.docReadOnly, "张三");
//            }else if ("2".equals(radio)){
//                poCtrl.webOpen("/customermanage/doc/qywtbgnr.docx", OpenModeType.docReadOnly, "张三");
//            }else {
//                poCtrl.webOpen("/customermanage/doc/qywtbg.docx", OpenModeType.docReadOnly, "张三");
//            }
            if ("1".equals(radio)) {
                poCtrl.webOpen("/customermanage/doc/bgzbfp.doc", OpenModeType.docAdmin, "admin");
            } else if ("2".equals(radio)) {
                poCtrl.webOpen("/customermanage/doc/qybgzbnr.doc", OpenModeType.docAdmin, "admin");
            } else {
                poCtrl.webOpen("/customermanage/doc/qybgzb.doc", OpenModeType.docAdmin, "admin");
            }
            //打开excel
            /*poCtrl.webOpen("/customermanage/doc/qywtbg.docx", OpenModeType.docReadOnly, "张三");*/
        }
        bgglMapper.upReadonly(map);
        //bgglService.bgshAutomaticPassing(yangpid);
        return "pageoffice/Word";
    }

    //退回
    @RequestMapping(value = "/bgbz/thbg", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject thbg(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        String wtidStr = request.getParameter("wtid");
        String ypidStr = request.getParameter("ypid");
//        String wtdbm = request.getParameter("wtdbm");
//        String zydm = request.getParameter("wtslr");
        String thbz = request.getParameter("thbz");
        try {
             String wtids[] = wtidStr.split(",");
             String ypids[] = ypidStr.split(",");

//            Map wtmap = bgglMapper.findWtinfo(wtid);
//            String zydm = String.valueOf(wtmap.get("WTSLR"));
            for(int i =0;wtids!=null && i<wtids.length;i++)
            {
                String wtid = wtids[i];
                String ypid = ypids[i];
                if(thbz==null || thbz.trim().length()==0 || thbz.equals("2")) { //退回标志是 空 或者是2 退回 检测室
                    bgglMapper.upThYPbg(ypid);
                }else if(thbz.equals("1"))//退回业务大厅
                {
                    bgglMapper.upThbg(wtid);
                    bgglMapper.upThYPbg(ypid);
                }
                jsonObject.put("success", true);
            }
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "操作失败！");
            e.printStackTrace();
        }

        //消息提醒  执行效率太低 屏蔽了
//        SystemMessages systemMessages = new SystemMessages();
//        if (zydm != null && zydm != "") {
//            try {
//                String iypmc = wtdbm;
//                //消息提醒
//                String txbt = "";
//                String txnr = "";
//                String txlx = "";
//                txbt = "委托单退回提醒，报告编制环节。";
//                txlx = "201";
//                txnr = CurrentLoginUser.getUser().getName() + "退回委托单，委托单号为：" + iypmc;
//                systemMessages.setXxid(UUID.randomUUID().toString());
//                systemMessages.setTxlx_dm(txlx);
//                systemMessages.setDljg_bm(CurrentLoginUser.getUser().getDljgBm());
//                systemMessages.setTxbt(txbt);
//                systemMessages.setTxnr(txnr);
//                systemMessages.setFsry_dm(CurrentLoginUser.getUser().getZydm());
//                systemMessages.setFsry_mc(CurrentLoginUser.getUser().getName());
//                systemMessages.setJsry_dm(zydm);
//                systemMessages.setFssj(new Date());
//                systemMessagesService.addSystemMessages(systemMessages);
//
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
        return jsonObject;
    }

    //打印流转单
    @RequestMapping(value = "/dylzd")
    public String lzddy(HttpServletRequest request) {
        WordDocument doc = new WordDocument();

        String ypbm = request.getParameter("ypbm");
        Map map = new HashMap();
        map.put("ypbm", ypbm);

        //查询打印内容
        List<Map> list = bgglMapper.seLzd(map);
        //获取检测项目信息
        List<Map> jcxmList = bgglMapper.seLzdJcxm(map);
        //获取打印内容
        String wtid = String.valueOf(list.get(0).get("wtid"));
        String wtid1 = String.valueOf(list.get(0).get("wtid1"));
        String ypmc = String.valueOf(list.get(0).get("ypmc"));
        String zbzl1 = String.valueOf(list.get(0).get("zbzl1"));
        String zbzl2 = String.valueOf(list.get(0).get("zbzl2"));
        String zbzl3 = String.valueOf(list.get(0).get("zbzl3"));
        String zbzl4 = String.valueOf(list.get(0).get("zbzl4"));
        String lqry1 = String.valueOf(list.get(0).get("lqry1"));
        String lqry2 = String.valueOf(list.get(0).get("lqry2"));
        String lqry3 = String.valueOf(list.get(0).get("lqry3"));
        String lqry4 = String.valueOf(list.get(0).get("lqry4"));
        String lqsj1 = String.valueOf(list.get(0).get("lqsj1"));
        String lqsj2 = String.valueOf(list.get(0).get("lqsj2"));
        String lqsj3 = String.valueOf(list.get(0).get("lqsj3"));
        String lqsj4 = String.valueOf(list.get(0).get("lqsj4"));
        String bzxx = String.valueOf(list.get(0).get("bzxx"));
       /* String bbbzry = String.valueOf(list.get(0).get("bbbzry"));
        String bbshrq = String.valueOf(list.get(0).get("bbshrq"));
        String bgshr = String.valueOf(list.get(0).get("bgshr"));
        String bbpzrq = String.valueOf(list.get(0).get("bbpzrq"));
        String bgpzr = String.valueOf(list.get(0).get("bgpzr"));*/

        String lqr1 = "";
        String lqr2 = "";
        String lqr3 = "";
       /* String lqsj1 = "";
        String lqsj2 = "";
        String lqsj3 = "";*/
        Map map1 = new HashMap();
       /* for (int i = 0; i < list.size(); i++) {
            if (i == 0) {
                lqr1 = String.valueOf(list.get(i).get("lqry"));
                lqsj1 = String.valueOf(list.get(i).get("lqsj"));
            } else if (i == 1) {
                lqr2 = String.valueOf(list.get(i).get("lqry"));
                lqsj2 = String.valueOf(list.get(i).get("lqsj"));
            } else if (i == 2) {
                lqr3 = String.valueOf(list.get(i).get("lqry"));
                lqsj3 = String.valueOf(list.get(i).get("lqsj"));
            }
        }*/
        //向模板中放入数据
        doc.openDataRegion("PO_wtid").setValue(wtid);
        doc.openDataRegion("PO_wtid1").setValue(wtid1);
        doc.openDataRegion("PO_ypmc").setValue(ypmc);
        doc.openDataRegion("PO_zbzl1").setValue(zbzl1);
        doc.openDataRegion("PO_zbzl2").setValue(zbzl2);
        doc.openDataRegion("PO_zbzl3").setValue(zbzl3);
        doc.openDataRegion("PO_zbzl4").setValue(zbzl4);
        doc.openDataRegion("PO_lqry1").setValue(lqry1);
        doc.openDataRegion("PO_lqry2").setValue(lqry2);
        doc.openDataRegion("PO_lqry3").setValue(lqry3);
        doc.openDataRegion("PO_lqry4").setValue(lqry4);
        doc.openDataRegion("PO_lqsj1").setValue(lqsj1);
        doc.openDataRegion("PO_lqsj2").setValue(lqsj2);
        doc.openDataRegion("PO_lqsj3").setValue(lqsj3);
        doc.openDataRegion("PO_lqsj4").setValue(lqsj4);
        doc.openDataRegion("PO_bzxx").setValue(bzxx);
        /*doc.openDataRegion("PO_shrq").setValue(bbshrq);
        doc.openDataRegion("PO_shry").setValue(bgshr);
        doc.openDataRegion("PO_pzrq").setValue(bbpzrq);
        doc.openDataRegion("PO_pzry").setValue(bgpzr);
*/
        //放入模板检测项目数据
        DataRegion drTable1 = doc.openDataRegion("PO_jyxmtable");
        Table table = drTable1.openTable(1);


        for (int i = 0; i < jcxmList.size(); i++) {
            String xmmc = String.valueOf(jcxmList.get(i).get("xmmc"));
            String jcff = String.valueOf(jcxmList.get(i).get("jcff"));
            String cjr = String.valueOf(jcxmList.get(i).get("cjr"));
            String rwfpry = String.valueOf(jcxmList.get(i).get("rwfpry"));

            table.openCellRC((i + 3), 1).setValue(String.valueOf(xmmc));
            table.openCellRC((i + 3), 2).setValue(String.valueOf(jcff));
            table.openCellRC((i + 3), 3).setValue(String.valueOf(cjr));
            table.openCellRC((i + 3), 4).setValue(String.valueOf(rwfpry));
            if (i != jcxmList.size() - 1) {
                table.insertRowAfter(table.openCellRC((i + 3), 4));
            }

        }
        PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
        //添加保存按钮
        poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        poCtrl.setWriter(doc);
        //设置保存页面
        poCtrl.setSaveFilePage(request.getContextPath() + "savefile.do");

        //打开excel
        poCtrl.webOpen("/customermanage/doc/lzdModel.docx", OpenModeType.docAdmin, "admin");
        return "pageoffice/Word";
    }

    //打印原始记录
    @RequestMapping(value = "/dyysjl")
    public String dyysjl(HttpServletRequest request) {
        User u = CurrentLoginUser.getUser();
        String zydm = u.getZydm();
//        String zyname = u.getName();
        WordDocument doc = new WordDocument();
        String ypbm = request.getParameter("ypbm");
        String ypid = request.getParameter("ypid");
        String fhrq = request.getParameter("fhrq");
        String jyrq = request.getParameter("jyrq");

        //样品名称、样品编号、检测项目
        Map map = new HashMap();
        map.put("ypid",ypid);
        List<Map> ysjlInfoList = this.bgglMapper.ysjlInfo(map);



        //这里要取一下  复核人  PO_fhr
        List<String> fhrLists = this.bgglMapper.findFhry(ypid);
        if(fhrLists!=null && fhrLists.size()>=1) {
            String fhrDm = fhrLists.get(0)+"";
            DataRegion dataRegionFhr1 = doc.openDataRegion("PO_fhr");
            String fhrQz = this.bgglMapper.getDzqz(fhrDm);
            dataRegionFhr1.setValue("[image]" + "../" + fhrQz + "[/image]");
        }

        if(fhrLists!=null && fhrLists.size()>=2) {
            String fhrDm = fhrLists.get(1)+"";
            DataRegion dataRegionFhr1 = doc.openDataRegion("PO_fhr1");
            String fhrQz = this.bgglMapper.getDzqz(fhrDm);
            dataRegionFhr1.setValue("[image]" + "../" + fhrQz + "[/image]");
        }

        if(fhrLists!=null && fhrLists.size()==3) {
            String fhrDm = fhrLists.get(2)+"";
            DataRegion dataRegionFhr1 = doc.openDataRegion("PO_fhr2");
            String fhrQz = this.bgglMapper.getDzqz(fhrDm);
            dataRegionFhr1.setValue("[image]" + "../" + fhrQz + "[/image]");
        }

        //检验人  PO_jyr
        DataRegion dataRegionJyr = doc.openDataRegion("PO_jyr");
        String jyrStr = this.bgglMapper.getDzqz(zydm);
        dataRegionJyr.setValue("[image]" + "../" + jyrStr + "[/image]");

        if(ysjlInfoList!=null && ysjlInfoList.size()>0)
        {
            Map m = ysjlInfoList.get(0);
            String ypmc = m.get("ypmc")+"";
            String ypbh = m.get("ypbm")+"";
            String jcxm = m.get("jcxm")+"";
            if(jcxm!=null && jcxm.trim().length()>0)
            {
                jcxm = jcxm.replaceAll(",","、");
            }

            String jclyrq = m.get("lqsj")+"";
            doc.openDataRegion("PO_ypmc").setValue(ypmc);
            doc.openDataRegion("PO_ypbh").setValue(ypbh);
            doc.openDataRegion("PO_jcxm").setValue(jcxm);
            doc.openDataRegion("PO_lysj").setValue(jclyrq);
        }

        doc.openDataRegion("PO_ypbm").setValue(ypbm);
        doc.openDataRegion("PO_fhrq").setValue(fhrq);
        doc.openDataRegion("PO_jyrq").setValue(jyrq);

        PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
        //添加保存按钮
        poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        poCtrl.setWriter(doc);
        //设置保存页面
        poCtrl.setSaveFilePage("savefile.do");

        //打开excel
        poCtrl.webOpen("/customermanage/doc/ysjlModel.doc", OpenModeType.docReadOnly, "张三");
        return "pageoffice/Word";
    }

    private String setEmpty(String value) {
        if ("".equals(value.trim()) || value == null || "null".equals(value) || "undefined".equals(value)) {
            return "/";
        } else {
            return value;
        }
    }

    /**
     * 生成word文件
     *
     * @param dataMap
     * @param path
     */
    private void createFile(Map dataMap, String path, String templetPath) {
        try {
            XWPFTemplate template = XWPFTemplate.compile(templetPath).render(dataMap);
            FileOutputStream out = new FileOutputStream(path);
            template.write(out);
            out.flush();
            out.close();
            template.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @RequestMapping(value = "/savebgfile")
    public void savebgfile(HttpServletRequest request, HttpServletResponse response) throws Exception {
        FileSaver fs = new FileSaver(request, response);
        String ypbm = request.getParameter("ypbm");
        String radio = request.getParameter("radio");
//        String path = request.getSession().getServletContext().getRealPath("/")+"/file/"+this.bgmodelMapper.getCcdzById(ID);
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        String dateString = dateFormat.format(date);
//        String path = request.getSession().getServletContext().getRealPath("/") + "/file/" + dateString + "/";
        //2019.07.23 将生成的报告 word和 PDF放到 D盘的 file目录下， 原因 项目 clean在install后  会清空项目目录下 生成的 所有文件夹和 文件 会导致报告丢失
        String path ="D:/file/jimo/" + dateString + "/";
        File targetFile = new File(path);
        if (!targetFile.exists()) {
            targetFile.mkdir();
        }
        String fileNameWord = path + UUID.randomUUID().toString() + ".doc";
        fs.saveToFile(fileNameWord);
        fs.close();
        String fileNamePdf = path + UUID.randomUUID().toString() + ".pdf";

        this.wToPdfChange(fileNameWord,fileNamePdf);
//        String sjzd = new ReadWord().readword(path,ID,bgmodelMapper);
        //更新字段
        if ("1".equals(radio)) { //封皮
            Map map = new HashMap();
            map.put("ypbm", ypbm);
            map.put("bgfplj", fileNamePdf);
            map.put("fp_doclj", fileNameWord);
            bgglMapper.updateBgLj(map);
        } else if ("2".equals(radio)) {  //内容
            Map map = new HashMap();
            map.put("ypbm", ypbm);
            map.put("bgnrlj", fileNamePdf);
            map.put("nr_doclj", fileNameWord);
            bgglMapper.updateBgLj(map);
        } else {
            Map map = new HashMap();
            map.put("ypbm", ypbm);
            map.put("bglj", fileNamePdf);
            map.put("wzbg_doclj", fileNameWord);
            bgglMapper.updateBgLj(map);
        }
    }


    /**
     * 批量打印报告
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/pldywtbg")
    public String pldywtbg(HttpServletRequest request) {
        WordDocument doc = new WordDocument();

        String wtids = request.getParameter("wtid");
        String ypbms = request.getParameter("ypbm");
        String cd = request.getParameter("cd");
        String ifdy = request.getParameter("ifdy");
        String ifzb = request.getParameter("ifzb");
        String ifbgdy = request.getParameter("ifbgdy");
        String radio = request.getParameter("radio");
        User u = CurrentLoginUser.getUser();
        String zydm = u.getZydm();
        Map map = new HashMap();
        map.put("wtid", wtids);
        map.put("ypbm", ypbms);
        map.put("bgzbr", zydm);
        String[] ypbmArr = ypbms.split(",");
        ArrayList<String> arrayList = new ArrayList<String>(Arrays.asList(ypbmArr));
//        Map ypmap = new HashMap();
//        ypmap.put("ypbms",ypbms);
        List<Map> bglj = bgglMapper.findBgLjForPldy(arrayList);
        for (int i = 0; i < ypbmArr.length; i++) {
            map.put("ypbm", ypbmArr[i]);
            map.put("bgdyr", zydm);
            //记录打印人和打印时间
            bgglMapper.insertBgdyry(map);
        }
        for (int i = 0; i < bglj.size(); i++) {
            String path = bglj.get(i).get("BGLJ") == null ? "" : bglj.get(i).get("BGLJ").toString();
            if (!"".equals(path)) {
//                if (i == 0)
//                {
//                    //打开模板中已有的书签区域
//                    DataRegion dataRegion = doc.openDataRegion("PO_no0");
//                    dataRegion.setValue("[Word]file://" + path + "[/Word]");
//                }
//                else
//                {
                //创建书签区域
                DataRegion data1 = doc.createDataRegion("PO_no" + i, DataRegionInsertType.Before, "[END]");
                data1.setValue("[Word]file://" + path + "[/Word]");
//                }
            }
        }
        PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
        //添加保存按钮
        poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        poCtrl.setWriter(doc);
        //设置保存页面
        poCtrl.setSaveFilePage("savefile");
        poCtrl.setTagId("PageOfficeCtrl1"); //此行必须
        //打开excel
        poCtrl.webOpen("/customermanage/doc/plbgzb.doc", OpenModeType.docAdmin, "张三");
        return "pageoffice/Word";
    }


    /**
     * 批量打印报告
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/pldywtpdfbg")
    public String pldywtpdfbg(HttpServletRequest request) {
        WordDocument doc = new WordDocument();

        String wtids = request.getParameter("wtid");
        String ypbms = request.getParameter("ypbm");
        String cd = request.getParameter("cd");
        String ifdy = request.getParameter("ifdy");
        String ifzb = request.getParameter("ifzb");
        String ifbgdy = request.getParameter("ifbgdy");
        String radio = request.getParameter("radio");
        User u = CurrentLoginUser.getUser();
        String zydm = u.getZydm();
        Map map = new HashMap();
        map.put("wtid", wtids);
        map.put("ypbm", ypbms);
        map.put("bgzbr", zydm);
        String[] ypbmArr = ypbms.split(",");
        ArrayList<String> arrayList = new ArrayList<String>(Arrays.asList(ypbmArr));
//        Map ypmap = new HashMap();
//        ypmap.put("ypbms",ypbms);
        List<Map> bglj = bgglMapper.findBgLjForPldy(arrayList);
        for (int i = 0; i < ypbmArr.length; i++) {
            map.put("ypbm", ypbmArr[i]);
            map.put("bgdyr", zydm);
            //记录打印人和打印时间
            bgglMapper.insertBgdyry(map);
        }
        ArrayList<String> files = new ArrayList<String>();
        for (int i = 0; i < bglj.size(); i++) {
            String path = bglj.get(i).get("BGLJ") == null ? "" : bglj.get(i).get("BGLJ").toString();
            if (!"".equals(path)) {
                files.add(path);

            }
        }
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        String dateString = dateFormat.format(date);
        String megerfile = request.getSession().getServletContext().getRealPath("/") + "/file/" + dateString + "/";
        File targetFile = new File(megerfile);
        if (!targetFile.exists()) {
            targetFile.mkdir();
        }
        String fileName = UUID.randomUUID().toString() + ".pdf";
        combinPdf(files, megerfile + fileName);

        PDFCtrl pdfCtrl = new PDFCtrl(request);//定义PDFCtrl控件对象
        request.setAttribute("PDFCtrl", pdfCtrl);
        pdfCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
        pdfCtrl.setTheme(ThemeType.CustomStyle);//设置主题样式
        //添加自定义按钮
        pdfCtrl.addCustomToolButton("打印", "Print()", 6);
        pdfCtrl.addCustomToolButton("-", "", 0);
        pdfCtrl.addCustomToolButton("实际大小", "SetPageReal()", 16);
        pdfCtrl.addCustomToolButton("适合页面", "SetPageFit()", 17);
        pdfCtrl.addCustomToolButton("适合宽度", "SetPageWidth()", 18);
        pdfCtrl.addCustomToolButton("-", "", 0);
        pdfCtrl.addCustomToolButton("首页", "FirstPage()", 8);
        pdfCtrl.addCustomToolButton("上一页", "PreviousPage()", 9);
        pdfCtrl.addCustomToolButton("下一页", "NextPage()", 10);
        pdfCtrl.addCustomToolButton("尾页", "LastPage()", 11);
        pdfCtrl.addCustomToolButton("-", "", 0);
        pdfCtrl.addCustomToolButton("左转", "RotateLeft()", 12);
        pdfCtrl.addCustomToolButton("右转", "RotateRight()", 13);
        pdfCtrl.addCustomToolButton("-", "", 0);
        pdfCtrl.addCustomToolButton("放大", "ZoomIn()", 14);
        pdfCtrl.addCustomToolButton("缩小", "ZoomOut()", 15);
        pdfCtrl.addCustomToolButton("-", "", 0);
        pdfCtrl.addCustomToolButton("全屏", "SwitchFullScreen()", 4);
        //设置禁止拷贝
        pdfCtrl.setAllowCopy(false);
        pdfCtrl.webOpen("/customermanage/file/" + dateString + "/" + fileName);//打开文件

        return "pageoffice/Pdf";
    }

    @RequestMapping(value = "/checkbglj")
    @ResponseBody
    public JSONObject checkbglj(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        String ypbms = request.getParameter("ypbm");
        String[] ypbmArr = ypbms.split(",");
        ArrayList<String> arrayList = new ArrayList<String>(Arrays.asList(ypbmArr));
        List<Map> bglj = bgglMapper.findBgLjForPldy(arrayList);
        if (ypbmArr.length == bglj.size()) {
            jsonObject.put("success", true);
        } else {
            jsonObject.put("success", false);
        }
        return jsonObject;
    }

    /**陈
     *下载报告电子版
     */
    @RequestMapping(value = "/downBg", method = RequestMethod.GET)
    @ResponseBody
    public void downBg(HttpServletRequest request, HttpServletResponse response) throws IOException {

        JSONObject jsonObject = new JSONObject();
        String ypbms = request.getParameter("ypbm");
        String[] ypbmArr = ypbms.split(",");
        ArrayList<String> arrayList = new ArrayList<String>(Arrays.asList(ypbmArr));
        List<Map> bglj = bgglMapper.findBgLjForPldy(arrayList);
        String pdfPath = ""; //文件路径 绝对路径
        String ypmc = "";
        String wjmc="";
        try {
            if (bglj != null && bglj.size() > 0) {
                Map mp = bglj.get(0);
                pdfPath = mp.get("BGLJ") + "";
                ypmc = mp.get("ypmc")+"";
            }
            wjmc = ypbms+"报告.pdf";
            //设置响应头和客户端保存文件名
            response.setCharacterEncoding("utf-8");
            response.setContentType("multipart/form-data");
            response.setHeader("Content-Disposition", "attachment;fileName=" + new String(wjmc.getBytes("GBK"), "ISO-8859-1"));
            //用于记录以完成的下载的数据量，单位是byte
            InputStream is = null;
            OutputStream os = null;
            BufferedInputStream bis = null;
            BufferedOutputStream bos = null;

            is = new FileInputStream(new File(pdfPath));
            bis = new BufferedInputStream(is);
            os = response.getOutputStream();
            bos = new BufferedOutputStream(os);

            byte[] b = new byte[1024];
            int len = 0;
            while ((len = bis.read(b)) != -1) {
                bos.write(b, 0, len);
            }

            bis.close();
            is.close();
            bos.close();
            os.close();
        }catch (Exception e)
        {
            e.printStackTrace();
        }
    }


    private boolean isDouble(String value) {
        try {
            Double.parseDouble(value);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * PDF 合并
     *
     * @param pdfFilenames
     * @param targetFilename
     * @throws Exception
     */
    public static boolean combinPdf(List<String> pdfFilenames, String targetFilename) {
        try {
            PdfReader reader = null;
            Document doc = new Document();
            PdfCopy pdfCopy = new PdfCopy(doc, new FileOutputStream(targetFilename));
            int pageCount = 0;
            doc.open();
            for (int i = 0; i < pdfFilenames.size(); ++i) {
                System.out.println(pdfFilenames.get(i));
                reader = new PdfReader(pdfFilenames.get(i));
                pageCount = reader.getNumberOfPages();
                for (int j = 1; j <= pageCount; ++j) {
                    pdfCopy.addPage(pdfCopy.getImportedPage(reader, j));
                }
            }
            doc.close();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     *
     * 获得人员的信息
     *
     * @return
     */
        @RequestMapping(value = "/bgczrydm", method = RequestMethod.POST)
        @ResponseBody
        public List<Map> bgczrydm(HttpServletRequest request) {
            String mrfl_bz = request.getParameter("mrfl_bz");
            return this.bgglMapper.findMrCzry(mrfl_bz);
    }

    /**
     * 不依赖DLL文件的  word转PDF  效率高
     * @param wordFile
     * @param pdfFile
     */
    public void wToPdfChange(String wordFile, String pdfFile) {//wordFile word 的路径  //pdfFile pdf 的路径
        try {
            //doc路径
            com.aspose.words.Document document = new com.aspose.words.Document(wordFile);
            //pdf路径
            File outputFile = new File(pdfFile);
            //操作文档保存
            document.save(outputFile.getAbsolutePath(), com.aspose.words.SaveFormat.PDF);
        } catch (Exception e) {
            e.printStackTrace();
        }
 }


//    /**
//     * word转pdf
//     */
//    public void wToPdfChange(String wordFile, String pdfFile) {//wordFile word 的路径  //pdfFile pdf 的路径
//
//        ActiveXComponent app = null;
//        System.out.println("开始转换...");
//        // 开始时间
//        // long start = System.currentTimeMillis();
//        try {
//            // 打开word
//            app = new ActiveXComponent("Word.Application");
//            // 获得word中所有打开的文档
//            Dispatch documents = app.getProperty("Documents").toDispatch();
//            System.out.println("打开文件: " + wordFile);
//            // 打开文档
//            Dispatch document = Dispatch.call(documents, "Open", wordFile, false, true).toDispatch();
//            // 如果文件存在的话，不会覆盖，会直接报错，所以我们需要判断文件是否存在
//            File target = new File(pdfFile);
//            if (target.exists()) {
//                target.delete();
//            }
//            System.out.println("另存为: " + pdfFile);
//            Dispatch.call(document, "SaveAs", pdfFile, 17);
//            // 关闭文档
//            Dispatch.call(document, "Close", false);
//        } catch (Exception e) {
//            System.out.println("转换失败" + e.getMessage());
//        } finally {
//            // 关闭office
//            //app.invoke("Quit", 0);
//        }
//    }

    /**
     * 切割图片 *
     *
     * @param imgPath 原始图片路径 *
     * @param n       切割份数 *
     * @return itextPdf的Image[] *
     * @throws IOException         *
     * @throws BadElementException
     */
    public static Image[] subImages(String imgPath, int n)
            throws IOException {
        Image[] nImage = new Image[n];
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        BufferedImage img = ImageIO.read(new File(imgPath));
        int h = img.getHeight();
        int w = img.getWidth();
        int sw = w / n;
        for (int i = 0; i < n; i++) {
            BufferedImage subImg;
            if (i == n - 1) {
                //最后剩余部分
                subImg = img.getSubimage(i * sw, 0, w - i * sw, h);
            } else {
                //前n-1块均匀切
                subImg = img.getSubimage(i * sw, 0, sw, h);
            }
            ImageIO.write(subImg, imgPath.substring(imgPath.lastIndexOf('.') + 1), out);
            try {
                nImage[i] = Image.getInstance(out.toByteArray());
            } catch (com.itextpdf.text.BadElementException e) {
                e.printStackTrace();
            }
            out.flush();
            out.reset();
        }
        return nImage;
    }

    /**
     * 盖骑缝章
     *
     * @param infilePath  原PDF路径 *
     * @param outFilePath 输出PDF路径 *
     * @param picPath     章图片路径 *
     * @throws IOException *
     * @throws
     */
    public static void stamperCheckMarkPDF(String infilePath, String outFilePath, String picPath) throws
            IOException, DocumentException {
        com.itextpdf.text.pdf.PdfReader reader = new com.itextpdf.text.pdf.PdfReader(infilePath);//选择需要印章的pdf
        PdfStamper stamp = new PdfStamper(reader, new FileOutputStream(outFilePath));//加完印章后的pdf
        Rectangle pageSize = reader.getPageSize(1);//获得第一页
        float height = pageSize.getHeight();
        float width = pageSize.getWidth();
        System.out.println("height: " + height + "width: " + width);//913
        int nums = reader.getNumberOfPages();
        Image[] nImage = subImages(picPath, nums);//生成骑缝章切割图片
        for (int n = 1; n <= nums; n++) {
            PdfContentByte over = stamp.getOverContent(n);//设置在第几页打印印章
            Image img = nImage[n - 1];//选择图片
            System.out.println("img heigit " + img.getHeight() + "img width: " + img.getWidth());
            /** * 圆章比例 */
            float nwidth = img.getWidth() / (float) (1);
            float nheight = img.getHeight() / (float) (1);
            img.scaleAbsolute(nwidth, nheight);//控制图片大小
            img.setAbsolutePosition(width - nwidth, height / 2 - nheight);//控制图片位置
            over.addImage(img);
        }
        stamp.close();
    }

    // 报告打印——不合格报告
    @RequestMapping(value = "/bgdybhg/bhgbglist")
    public String bhgbglist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        String ypmc = request.getParameter("ypmc");
        String ypbm = request.getParameter("ypbm");
        String ny = request.getParameter("ny");
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
        //不合格报告集合 直接 生成Excel即可
        List<Map> list = bgglMapper.getBhgBg(cxtj);

        Workbook wb = new Workbook();
        Sheet sheet = wb.openSheet("不合格报告");
        String yf="";
        if (ny != null && !"".equals(ny)) {
            String[] ym = ny.split("-");
            if (ym.length > 1) {
                String y = ym[0];
                String m = ym[1];
                yf=m;
            }
        } else if (ypbm != null && !"".equals(ypbm)) {
            int yindex = ypbm.indexOf("20"); //取得20所在index，即为年的索引值
            if (ypbm.length() >= yindex + 5) {
                String ym = ypbm.substring(yindex, yindex + 6);
                String y = ym.substring(0, 4);
                String m = ym.substring(4);
                yf=m;
            }
        }

        sheet.openCell("A1").setValue("食品安全定性定量检测结果统计表（不合格）" + yf + "月");
        int firstrow = 4;
        for (int i = 0; i < list.size(); i++) {
            String  	ypbmstr	= checkNull(list.get(i).get("ypbm"));
            String  	ypmcstr	= checkNull(list.get(i).get("ypmc"));
            String  	cydd	= checkNull(list.get(i).get("cydd"));
            String  	scdw	= checkNull(list.get(i).get("scdw"));
            String  	sb	    = checkNull(list.get(i).get("sb"));
            String  	ggxh	= checkNull(list.get(i).get("ggxh"));
            String  	scrq 	= checkNull(list.get(i).get("scrq"));
            String  	bhgxm	= checkNull(list.get(i).get("bhgxm"));
            String  	bg_jyjg	= checkNull(list.get(i).get("bg_jyjg"));
            String  	bg_jsyq	= checkNull(list.get(i).get("bg_jsyq"));
            String  	bg_dxpd	= checkNull(list.get(i).get("bg_dxpd"));

            sheet.openCell("A" + (i + firstrow)).setValue((i+1)+"");
            sheet.openCell("B" + (i + firstrow)).setValue(ypbmstr);//报告编号
            sheet.openCell("C" + (i + firstrow)).setValue(ypmcstr);   //产品名称
            sheet.openCell("D" + (i + firstrow)).setValue(cydd); //抽样地点
            sheet.openCell("E" + (i + firstrow)).setValue(scdw); //生产企业
            sheet.openCell("F" + (i + firstrow)).setValue(sb); //商标
            sheet.openCell("G" + (i + firstrow)).setValue(ggxh); //规格型号
            sheet.openCell("H" + (i + firstrow)).setValue(scrq); //生产日期、批号
            sheet.openCell("I" + (i + firstrow)).setValue(bhgxm); //不合格项
            sheet.openCell("J" + (i + firstrow)).setValue(bg_jyjg); //检测结果
            sheet.openCell("K" + (i + firstrow)).setValue(bg_jsyq); //技术要求
            sheet.openCell("L" + (i + firstrow)).setValue("该样品本次检样不合格"); //综合判定

            setBorderStyle(sheet.openCell("A" + (i + firstrow)));
            setBorderStyle(sheet.openCell("B" + (i + firstrow)));
            setBorderStyle(sheet.openCell("C" + (i + firstrow)));
            setBorderStyle(sheet.openCell("D" + (i + firstrow)));
            setBorderStyle(sheet.openCell("E" + (i + firstrow)));
            setBorderStyle(sheet.openCell("F" + (i + firstrow)));
            setBorderStyle(sheet.openCell("G" + (i + firstrow)));
            setBorderStyle(sheet.openCell("H" + (i + firstrow)));
            setBorderStyle(sheet.openCell("I" + (i + firstrow)));
            setBorderStyle(sheet.openCell("J" + (i + firstrow)));
            setBorderStyle(sheet.openCell("K" + (i + firstrow)));
            setBorderStyle(sheet.openCell("L" + (i + firstrow)));
        }

        if (list.size() > 0) {
            com.zhuozhengsoft.pageoffice.excelwriter.Table titleTable = sheet.openTable("A4:K" + (4 + list.size() - 1));
            titleTable.setRowHeight(35);
            //设置表格边框的样式、宽度、颜色
            titleTable.getBorder().setBorderType(XlBorderType.xlAllEdges);
            titleTable.getBorder().setWeight(XlBorderWeight.xlThin);
            titleTable.getBorder().setLineColor(Color.black);
        }

//        String str = "送达日期:____________    送达人：___________  联系电话：___________  接收人:____________                        （本交接单一式二份，由送达单位和接收单位各执一份）";

//        com.zhuozhengsoft.pageoffice.excelwriter.Table footTable = sheet.openTable("A" + (4 + list.size() + 1) + ":K" + (4 + list.size() + 3));
//        footTable.merge();
//        footTable.setRowHeight(15);
//        sheet.openCell("A" + (4 + list.size() + 1)).setValue(str);

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
        poCtrl.webOpen("/customermanage/doc/bhgbg.xlsx", OpenModeType.xlsNormalEdit, "admin");
        return "pageoffice/Excel";
    }

    //判空方法
    private String checkNull(Object obj)
    {
        return obj==null?" ":obj+" ";
    }

    /**
     * 报告编制（原报告打印），新报告打印才用批量打印本方法生成的文件。
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/bgbzScbg")
    public String bgbzScbg(HttpServletRequest request) {
        WordDocument doc = new WordDocument();

        String wtids = request.getParameter("wtid");
        String ypbms = request.getParameter("ypbm");
        String cd = request.getParameter("cd");
        String ifdy = request.getParameter("ifdy");
        String ifzb = request.getParameter("ifzb");
        String ifbgdy = request.getParameter("ifbgdy");
        String radio = request.getParameter("radio");
        User u = CurrentLoginUser.getUser();
        String zydm = u.getZydm();
        Map map = new HashMap();
        map.put("wtid", wtids);
        map.put("ypbm", ypbms);
        map.put("bgzbr", zydm);
        if ("1".equals(ifzb)) {
            //插入报告编制日期和报告编制人
            bgglMapper.insertBzrq(map);
        }
        //如果是在报告印页面进入的记录打印人和打印时间
        if ("1".equals(ifbgdy)) {

            map.put("bgdyr", zydm);
            bgglMapper.insertBgdyry(map);
        }

        /*//查询样品id
        String yangpid = bgglMapper.selectid(map);*/
        //查询仪器
        List<Map> yqsblist = new ArrayList<>();
        List<Map> yqsblist2 = bgglMapper.yqsbz(map);
        List<Map> yqsblist1 = bgglMapper.yqsb(map);
        if (yqsblist2.size() == 0) {
            yqsblist = yqsblist1;
        } else {
            yqsblist = yqsblist2;
        }
        //获取检验报告类型
        String bglx = bgglMapper.bglx(map);
        //查询检测项目
        List<Map> jcxlist = bgglMapper.cxJcxm(map);
        //查询检测项目温度和湿度
//        List<Map> wdSdList = bgglMapper.wdAndSd(map);
        //20190918添加新标准温湿度获取
        List<Map> wdSdList = bgglMapper.wdAndSdNew(map);
        //查询打印内容
        List<Map> list = bgglMapper.dywtbg(map);
                String maxwd ="";
                String minwd ="";
                String maxsd ="";
                String minsd ="";

        //获取温度和湿度
        if(wdSdList!=null && wdSdList.size()>0 && wdSdList.get(0)!=null)
        {
             maxwd = String.valueOf(wdSdList.get(0).get("maxwd")+"");
             minwd = String.valueOf(wdSdList.get(0).get("minwd")+"");
             maxsd = String.valueOf(wdSdList.get(0).get("maxsd")+"");
             minsd = String.valueOf(wdSdList.get(0).get("minsd")+"");
        }

        //获取打印内容
        String wtid = String.valueOf(list.get(0).get("wtid"));
        String ypmc = String.valueOf(list.get(0).get("ypmc"));
        String cydbm = String.valueOf(list.get(0).get("cydbm"));
        cydbm = setEmpty(cydbm);
        String ggxh = String.valueOf(list.get(0).get("ggxh"));
        ggxh = setEmpty(ggxh);
        String dwmc = String.valueOf(list.get(0).get("dwmc"));
        String jylb = String.valueOf(list.get(0).get("jylb"));
        String wtdw = String.valueOf(list.get(0).get("wtdw"));
        String rqlxxz = String.valueOf(list.get(0).get("rqlxxz"));
        String wtdwdz = String.valueOf(list.get(0).get("wtdwdz"));
        String wtdwyzbm = String.valueOf(list.get(0).get("wtdwyzbm"));
        String wtdwdh = String.valueOf(list.get(0).get("wtdwdh"));
        String wtdwcz = String.valueOf(list.get(0).get("wtdwcz"));
        String bgzbrq = String.valueOf(list.get(0).get("bbbzrq"));
        String sb = String.valueOf(list.get(0).get("sb"));
        sb = setEmpty(sb);
        String ypdj = String.valueOf(list.get(0).get("ypdj"));
        ypdj = setEmpty(ypdj);



        String scdwlxdh = String.valueOf(list.get(0).get("scdwlxdh"));
        String scdw = String.valueOf(list.get(0).get("scdw"));
        scdw = setEmpty(scdw);
        String wtdwanddh = String.valueOf(list.get(0).get("wtdwanddh"));
        String ypsl = String.valueOf(list.get(0).get("ypsl"));
        ypsl = setEmpty(ypsl);
        String ypbm = String.valueOf(list.get(0).get("ypbm"));
        String syrq = String.valueOf(list.get(0).get("syrq"));
        syrq = setEmpty(syrq);
        String scrq = String.valueOf(list.get(0).get("scrq"));
        scrq = setEmpty(scrq);
        String syry = String.valueOf(list.get(0).get("syry"));
        String shouydz = String.valueOf(list.get(0).get("shouydz"));
        shouydz = setEmpty(shouydz);
        String jywcrq = String.valueOf(list.get(0).get("jywcrq"));
        jywcrq = setEmpty(jywcrq);
        String ypzt = String.valueOf(list.get(0).get("ypzt"));
        String ypxt = String.valueOf(list.get(0).get("ypxt"));
        String rwdwmc = String.valueOf(list.get(0).get("rwdwmc"));
        rwdwmc = setEmpty(rwdwmc);
        String rwlxdh = String.valueOf(list.get(0).get("rwlxdh"));
        String scdz = String.valueOf(list.get(0).get("scdz"));

        //这个 是 报告的 生产单位  其拼接  生产单位名称   生产单位地址   生产单位联系电话 目前没有间隔  有问题
        //重新修改 用java 判定

        String bgscdw="";//报告中的生产单位
        if(scdw.trim().length()>1)
        {
            bgscdw+=scdw;
        }
        if(scdz.trim().length()>1)//生产单位地址
        {
            if(bgscdw.trim().length()>1)
            {
                bgscdw+="  "+scdz;
            }else
            {
                bgscdw+=scdz;
            }
        }
       /* if(scdwlxdh.trim().length()>1)//生产单位联系电话
        {
            if(bgscdw.trim().length()>1)
            {
                bgscdw+="  "+scdwlxdh;
            }else
            {
                bgscdw+=scdwlxdh;
            }
        }*/
        if(bgscdw.trim().length()==0)//三个都没有内容 则赋值 "/"
        {
            bgscdw="/";
        }


        String scdwanddh = bgscdw;


        if ("1".equals(ypxt)) {
            ypxt = "固体";
        } else if ("2".equals(ypxt)) {
            ypxt = "半固体";
        } else if ("3".equals(ypxt)) {
            ypxt = "液体";
        } else if ("4".equals(ypxt)) {
            ypxt = "气体";
        }
        String jyyj = String.valueOf(list.get(0).get("jyyj"));
//        jyyj = setEmpty(jyyj);
        String jyyjbzqt = String.valueOf(list.get(0).get("jyyjbzqt"));
        jyyjbzqt = setEmpty(jyyjbzqt);
        String jyjl = String.valueOf(list.get(0).get("jyjl"));
        jyjl = setEmpty(jyjl);
        String bz = String.valueOf(list.get(0).get("bz"));
        bz = setEmpty(bz);
        String bbbzrq = String.valueOf(list.get(0).get("bbbzrq"));
        bbbzrq = setEmpty(bbbzrq);
        String bbpzrq = String.valueOf(list.get(0).get("bbpzrq"));
        bbpzrq = setEmpty(bbpzrq);
        String bbzsrq = String.valueOf(list.get(0).get("bbzsrq"));
        bbzsrq = setEmpty(bbzsrq);
        String jcxm = String.valueOf(list.get(0).get("jcxm"));
        String jcxmsl = String.valueOf(list.get(0).get("jcxmsl"));

        if(jcxmsl==null || jcxmsl.trim().length()==0 || jcxmsl.equals("0") || jcxmsl.equals("1"))
        {

        }else
        {
            jcxm=jcxm+"等"+jcxmsl+"项";
        }


        String sjdw = String.valueOf(list.get(0).get("sjdw"));
        sjdw = setEmpty(sjdw);
        String sjdwlxr = String.valueOf(list.get(0).get("sjdwlxr"));
        sjdwlxr = setEmpty(sjdwlxr);
        String bcjdwlxr = String.valueOf(list.get(0).get("bcjdwlxr"));
        bcjdwlxr = setEmpty(bcjdwlxr);
        String bcjdwdz = String.valueOf(list.get(0).get("bcjdwdz"));
        bcjdwdz = setEmpty(bcjdwdz);
        String sjdwlxdh = String.valueOf(list.get(0).get("sjdwlxdh"));
        sjdwlxdh = setEmpty(sjdwlxdh);
        String frdb = String.valueOf(list.get(0).get("frdb"));
        frdb = setEmpty(frdb);
        String sjdwxxdz = String.valueOf(list.get(0).get("sjdwxxdz"));
        sjdwxxdz = setEmpty(sjdwxxdz);
        String cyrq = String.valueOf(list.get(0).get("cyrq"));
        cyrq = setEmpty(cyrq);
        String rwly = String.valueOf(list.get(0).get("rwly"));
        rwly = setEmpty(rwly);
        String cyry = String.valueOf(list.get(0).get("cyry"));
        String cydw = String.valueOf(list.get(0).get("cydw"));
        cydw = setEmpty(cydw);
        String cyjs = String.valueOf(list.get(0).get("cyjs"));
        String ybjs = String.valueOf(list.get(0).get("ybjs"));
        ybjs = setEmpty(ybjs);
        String ypddrq = String.valueOf(list.get(0).get("ypddrq"));
        String bgbzr = String.valueOf(list.get(0).get("bgzbr"));
        String bgpzr = String.valueOf(list.get(0).get("bgpzr"));
        String bgshr = String.valueOf(list.get(0).get("bgshr"));
        String ypjcsj = String.valueOf(list.get(0).get("ypjcsj"));
        ypjcsj = setEmpty(ypjcsj);
        String slrq = String.valueOf(list.get(0).get("slrq"));
        slrq = setEmpty(slrq);
        String jyrq=slrq+'~'+ypjcsj;
        String ypzxbz = String.valueOf(list.get(0).get("ypzxbz"));
        ypzxbz = setEmpty(ypzxbz);
        //采样单位电话 在政府里 是 委托单位电话
        String cydwdh = String.valueOf(list.get(0).get("cydwdh"));
        cydwdh = setEmpty(cydwdh);

        String cydwxxdz = String.valueOf(list.get(0).get("cydwxxdz"));
        cydwxxdz = setEmpty(cydwxxdz);
        //检验类别
        String jylbname = jylb;//已经改为 代码表 取值 jylb就是直接中文值
//        if ("dxbg".equals(jylb)) {
//            jylbname = "典型报告";
//        } else if ("jdjy".equals(jylb)) {
//            jylbname = "监督检验";
//        } else if ("dbsy".equals(jylb)) {
//            jylbname = "对比实验";
//        } else if ("wtjy".equals(jylb)) {
//            jylbname = "委托检验";
//        } else if ("zxjy".equals(jylb)) {
//            jylbname = "专项检验";
//        } else if ("ssjy".equals(jylb)) {
//            jylbname = "型式检验";
//        }
        //收样地址
        String sydz = "";
        if ("001".equals(shouydz)) {
            sydz = "检验机构受理处";
        } else if ("002".equals(shouydz)) {
            sydz = "委托/受检单位";
        }
        //报告签发日期
        String qfyear = bbbzrq.substring(0, 4);
        String qfmonth = bbbzrq.substring(5, 7);
        String qfday = bbbzrq.substring(8);
        //检验依据其他
        String jyyjz = "";
        if ("azxbz".equals(jyyj)) {
            jyyjz = "按执行标准";
        } else if ("ajswj".equals(jyyj)) {
            jyyjz = "按技术文件";
        } else if ("jyyjqt".equals(jyyj)) {
            jyyjz = "其它:" + jyyjbzqt;
        }

        //判断是否为存档
        if ("1".equals(cd)) {
            doc.openDataRegion("PO_cd").setValue("存档");
        }
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        String dateString = calendar.get(Calendar.YEAR) + " 年 " + (calendar.get(Calendar.MONTH) + 1) + " 月 " + calendar.get(Calendar.DAY_OF_MONTH) + " 日";
        doc.openDataRegion("PO_qfsj").setValue(dateString);

        //委托类型  001企业委托002个人003政府
        if ("003".equals(bglx)) {
            //检验报告第一页
            doc.openDataRegion("PO_wtbmz").setValue(wtid);
            doc.openDataRegion("PO_cpmc").setValue(ypmc);
            doc.openDataRegion("PO_ggxh").setValue(ggxh);
            doc.openDataRegion("PO_wtdw").setValue(cydw);
//            doc.openDataRegion("PO_wtdw").setValue(rwdwmc); //关联配置表取得任务类型对应的单位名称
            doc.openDataRegion("PO_jylb").setValue(jylbname);

            //检验报告第二页
            doc.openDataRegion("PO_sysdz").setValue(wtdwdz);
            doc.openDataRegion("PO_sysdh").setValue(wtdwdh);
            doc.openDataRegion("PO_syscz").setValue(wtdwcz);

            //检验报告第三页
            doc.openDataRegion("PO_wtbm").setValue(wtid);
            doc.openDataRegion("PO_ypmc").setValue(ypmc);
            doc.openDataRegion("PO_sb").setValue(sb);
            doc.openDataRegion("PO_ggxhz").setValue(ggxh);
            if ("3".equals(rqlxxz)) {
                doc.openDataRegion("PO_gjrq").setValue(scrq);
                doc.openDataRegion("PO_scrq").setValue("/");
            } else {
                doc.openDataRegion("PO_gjrq").setValue("/");
                doc.openDataRegion("PO_scrq").setValue(scrq);
            }

            //doc.openDataRegion("PO_scdwdh").setValue(scdw);
            doc.openDataRegion("PO_scdwdh").setValue(bgscdw);//这里改了 原来是   scdwanddh2019.07.03

            if(scdw==null || scdw.trim().length()==0)
            {
                scdw="/";
            }
            doc.openDataRegion("PO_btscdw").setValue(scdw);//第一页面生产单位


            //报告第二页 抽样/委托单位
            String fccydw = String.valueOf(list.get(0).get("fccydw"));//抽样单位
            String fcwtdw = String.valueOf(list.get(0).get("wtdw"));//抽样单位
            String cywtdw="";
            if(fccydw!=null && fccydw.trim().length()>0)
            {
                cywtdw=fccydw;
            }
            if(fcwtdw!=null && fcwtdw.trim().length()>0)
            {
                if(cywtdw!=null && cywtdw.trim().length()>0)
                {
                    cywtdw=cywtdw+"/"+fcwtdw;
                }else
                {
                    cywtdw=fcwtdw;
                }
            }
            doc.openDataRegion("PO_wtdwdh").setValue(cywtdw);

            //被抽样单位   Sampled Entity
            //政府  受检单位     受检单位地址   受检单位法人 受检单位电话] 加备注  中间空格隔开
            //bcjdwdz 地址       frdb 法人代表      sjdwlxdh 联系电话
            String bcydwStr = "";
            if(sjdw!=null && !sjdw.equals("/"))
            {
                bcydwStr+=sjdw;
            }
            if(bcjdwdz!=null && !bcjdwdz.equals("/"))
            {
                bcydwStr+=" "+bcjdwdz;
            }
            if(frdb!=null && !frdb.equals("/"))
            {
                bcydwStr+="  "+frdb;
            }
          /*  if(sjdwlxdh!=null && !sjdwlxdh.equals("/"))
            {
                bcydwStr+="  "+sjdwlxdh;
            }*/
            if(bcydwStr.trim().length()==0)
            {
                bcydwStr="/";
            }

            doc.openDataRegion("PO_sjdw").setValue(bcydwStr);
            doc.openDataRegion("PO_btcydw").setValue(sjdw); //第一页的被抽样单位
            doc.openDataRegion("PO_sjdwlxr").setValue(bcjdwlxr);
            doc.openDataRegion("PO_sjdwxxdz").setValue(bcjdwdz);
            doc.openDataRegion("PO_sjdwlxdh").setValue(sjdwlxdh);
            doc.openDataRegion("PO_shouydz").setValue(shouydz);//收样地址
            doc.openDataRegion("PO_syry").setValue(syry);//（查封）收样人员
            //doc.openDataRegion("PO_scdw").setValue(scdw);
            doc.openDataRegion("PO_scdwlxdh").setValue(scdwlxdh);
            doc.openDataRegion("PO_rwly").setValue(rwly);
            doc.openDataRegion("PO_cyrq").setValue(cyrq);
//            doc.openDataRegion("PO_cydw").setValue(cydw);//页面上没有抽样单位输入的地方，暂时放抽样人员数据
            doc.openDataRegion("PO_cydw").setValue(cyry);
            doc.openDataRegion("PO_cyjs").setValue(ybjs);
            doc.openDataRegion("PO_ypsl").setValue(ypsl);
            //doc.openDataRegion("PO_ypbm").setValue(ypbm);
            doc.openDataRegion("PO_ypbm").setValue(cydbm);
            doc.openDataRegion("PO_dj").setValue(ypdj);
            doc.openDataRegion("PO_ypddrq").setValue(syrq);
            doc.openDataRegion("PO_ypzt").setValue(ypxt);
            doc.openDataRegion("PO_cyry").setValue(cyry);
            //doc.openDataRegion("PO_jyrq").setValue(ypjcsj);
            doc.openDataRegion("PO_jyrq").setValue(jyrq);
            doc.openDataRegion("PO_jylbz").setValue(jylbname);


            doc.openDataRegion("PO_jyxm").setValue(jcxm);


            doc.openDataRegion("PO_jyyj").setValue(ypzxbz+"方法标准见试验说明");


            //检验依据和检验结论待确认

            doc.openDataRegion("PO_wtbz").setValue(bz);



            doc.openDataRegion("PO_pzrq").setValue(bbpzrq);
            doc.openDataRegion("PO_shrq").setValue(bbzsrq);
            doc.openDataRegion("PO_bzrq").setValue(bbbzrq);
            doc.openDataRegion("PO_wtid").setValue(wtid);
            //报告签发日期
            doc.openDataRegion("PO_yeat").setValue(qfyear);
            doc.openDataRegion("PO_month").setValue(qfmonth);
            doc.openDataRegion("PO_day").setValue(qfday);


            //放入温度和湿度
            doc.openDataRegion("PO_maxwd").setValue(maxwd);
            doc.openDataRegion("PO_minwd").setValue(minwd);
            doc.openDataRegion("PO_maxsd").setValue(maxsd);
            doc.openDataRegion("PO_minsd").setValue(minsd);

            //放入签名照片
            DataRegion dataRegion1 = doc.openDataRegion("PO_bgpzr");
            String bgpzrz = this.bgglMapper.getDzqz(bgpzr);
            dataRegion1.setValue("[image]" + "../" + bgpzrz + "[/image]");

            DataRegion dataRegion2 = doc.openDataRegion("PO_bgshr");
            String bgshrz = this.bgglMapper.getDzqz(bgshr);
            dataRegion2.setValue("[image]" + "../" + bgshrz + "[/image]");

            DataRegion dataRegion3 = doc.openDataRegion("PO_bgbzr");
            String bgbzrz = this.bgglMapper.getDzqz(bgbzr);
            dataRegion3.setValue("[image]" + "../" + bgbzrz + "[/image]");

            DataRegion drTable1 = doc.openDataRegion("PO_jyxmtable");
            Table table = drTable1.openTable(1);

            String jyjg = "";
            //检测项目+检测方法拼接字符串
            String jcxmFf = "";
            //是否判定合格不合格
            String if_hg = "";
            //判断总结论是否为合格
            int hgnum = 0;
            String jyjlall = "";
            int jcxcount = jcxlist.size();
            List<String> jybzList = new ArrayList<>();
            boolean isOk = true;
            List<Map> jcxBgList = new ArrayList<>();
            Map<String,String> jcxSmMap = new HashMap();
            for (int i = 0; i < jcxcount; i++) {
                String jcxmxlz = String.valueOf(jcxlist.get(i).get("xlz"));
                String zwmc_bm = String.valueOf(jcxlist.get(i).get("zwmc_bm"));
                String jsyq = String.valueOf(jcxlist.get(i).get("jsyq"));
                String jcz = String.valueOf(jcxlist.get(i).get("jcz"));
                String if_pd = String.valueOf(jcxlist.get(i).get("if_pd"));
                String jcxmbz = String.valueOf(jcxlist.get(i).get("bz"));
                String jcff = String.valueOf(jcxlist.get(i).get("jcff"));
                String jcfa = String.valueOf(jcxlist.get(i).get("jcfa"));
                String pdyj = String.valueOf(jcxlist.get(i).get("pdyj"));
                String jldw = String.valueOf(jcxlist.get(i).get("jldw"));
                String jcxmjl = String.valueOf(jcxlist.get(i).get("jcxmjl"));
                String jcxstr = jcxlist.get(i).get("jcx")+"";//检出限
                String xlzdw = jcxlist.get(i).get("xlzdw")+"";//检出限
                String jcyj = jcxlist.get(i).get("jcyj")+"";//检测依据 检测项的 检测依据 标准号
                String ypjcxid = jcxlist.get(i).get("ypjcxid")+"";//检测项主见ID

                String jcx_bjf = jcxlist.get(i).get("jcx_bjf")+"";//检测项 比较符号

                if(i==0)
                {
                    jcxSmMap.put(jcyj,zwmc_bm);
                }else //要判断检测依据对应的检测名字在不在
                {
                    String tempZwmc = jcxSmMap.get(jcyj)==null?"":jcxSmMap.get(jcyj)+"";
                    if(tempZwmc.trim().length()!=0)//找到 检测依据 对应的名字，也就是说这个检测依据重复， 那将名字 做连接在写回去
                    {
                        jcxSmMap.put(jcyj,tempZwmc+"、"+zwmc_bm);
                    }else{//检测依据不存在 则 新加一个检测依据
                        jcxSmMap.put(jcyj,zwmc_bm);
                    }
                }
                //判断检测值如果不是数字 那么找找里面有没有 逗号 ，如果有逗号 则换行
                if(jcz!=null && jcz.trim().length()!=0 && !isDouble(jcz))
                {
                    if(jcz.indexOf(",")!=-1 || jcz.indexOf("，")!=-1)//判断有半角 或者 全角逗号
                    {
                        jcz = jcz.replaceAll(",", jldw+"\r\n");
                        jcz = jcz.replaceAll("，", jldw+"\r\n");
                    }
                }

                /*
                1、结论 只要选择 不判定，原样显示 不做任何操作，值原样显示不带符号。
                2、结论 只要进行人工选择，就不自动计算结论，已人工选择为主。
                3、全部输入数字，并且 结论 没有选择，结论是空的，那么才会计算。
                4、输入内容有文本，强制提示必须选择结论。
                5、限量值为数字且结论不是不判定，才会带<=符号
                6、检测值=0，才是 未检出，只有 结论不是 不判定 才会做判定。
                 */
                if(jcxmjl!=null && !jcxmjl.equals("null") && jcxmjl.equals("2"))//不判定
                {
                    //jsyq 检测要求
                    //jyjg 检验结果
                    //if_hg 结论
                    jsyq=jcxmxlz+jldw; //检测要求固定写 限量值
                    jyjg = jcz+jldw;//检验结果固定写检测值
                    if_hg = "不判定";//结论固定  不判定

                }else if(jcxmjl!=null && !jcxmjl.equals("null")  && !jcxmjl.equals("2") && !jcxmjl.equals("")) //检测结论不为空，不是 判定结论， 说明是 合格 或 不合格
                {
                    if(jcxmjl.equals("1"))
                    {
                        if_hg="合格";
                    }else{
                        if_hg="不合格";
                        isOk = false;
                    }
                    if(isDouble(jcxmxlz)) {
                        if(Double.parseDouble(jcxmxlz)==0) {
                            jsyq="不得检出";
                        }else
                        {
//                            jsyq = "≤" + jcxmxlz + jldw;
                            //20190918添加表中比较符
                            jsyq = jcx_bjf + jcxmxlz + jldw;//jcx_bjf 检测项的比较符号，是从 t_jcxm_jbxx表存到t_yp_jcxm中的，有 ≥、≤、>、<和空五种情况
                        }
                    }else{
                        jsyq=jcxmxlz+jldw;
                    }
                    if(isDouble(jcz)) {
                        if(jcz.equals("0")) //检测值是0
                        {
                            if(jcxstr==null ||jcxstr.equals("null") || jcxstr.trim().length()==0) {//表示没有检出限
                                jyjg = "未检出";
                            }else
                            {
                                jyjg = "未检出"+(char)11+"(检出限" + jcxstr + jldw + ")";
                            }
                        }else
                        {
                            jyjg = jcz+jldw; //不是0，检验结果就是  检测值 + 单位
                        }
                    }else{//检测值是 字符串 那么 检验结果 就是 jcz+单位
                        jyjg=jcz+jldw;
                    }

                }else if(jcxmjl==null || jcxmjl.equals("null")  || jcxmjl.equals("")) //结论空了 这个需要计算，前台控制了 输入 ，肯定都是数字
                {
                    if (isDouble(jcz) && isDouble(jcxmxlz)) {    //页面可以随意输入了，如果不是数字类型不做比较直接使用页面输入的信息。如果是数字走之前的逻辑
                        //jsyq = "≤"+jcxmxlz+jldw;
                        if(Double.parseDouble(jcxmxlz)==0) {
                            jsyq="不得检出";
                        }else
                        {
//                            jsyq = "≤" + jcxmxlz + jldw;
                            jsyq = jcx_bjf + jcxmxlz + jldw;//jcx_bjf 检测项的比较符号，是从 t_jcxm_jbxx表存到t_yp_jcxm中的，有 ≥、≤、>、<和空五种情况
                        }
                        //若检测值大于限定值，结果为不合格，否则为合格
                        if(jcx_bjf!=null && jcx_bjf.trim().length()!=0 && jcx_bjf.equals("≥"))//比较符是大于等于的判断
                        {
                            if (Double.valueOf(jcz) < Double.valueOf(jcxmxlz)) {
                                if_hg = "不合格";
                                isOk = false;
                            } else {
                                if_hg = "合格";
                            }
                        }else if(jcx_bjf!=null && jcx_bjf.trim().length()!=0 && jcx_bjf.equals(">"))
                        {
                            if (Double.valueOf(jcz) > Double.valueOf(jcxmxlz)) {
                                if_hg = "合格";
                            } else {
                                if_hg = "不合格";
                                isOk = false;
                            }
                        }else if(jcx_bjf!=null && jcx_bjf.trim().length()!=0 && jcx_bjf.equals("≤"))
                        {
                            if (Double.valueOf(jcz) > Double.valueOf(jcxmxlz)) {
                                if_hg = "不合格";
                                isOk = false;
                            } else {
                                if_hg = "合格";
                            }
                        }else if(jcx_bjf!=null && jcx_bjf.trim().length()!=0 && jcx_bjf.equals("<"))
                        {
                            if (Double.valueOf(jcz) < Double.valueOf(jcxmxlz)) {
                                if_hg = "合格";
                            } else {
                                if_hg = "不合格";
                                isOk = false;
                            }
                        }
                    }
                    if(isDouble(jcz)) {
                        if(jcz.equals("0")) //检测值是0
                        {
                            if(jcxstr==null || jcxstr.equals("null") || jcxstr.trim().length()==0) {//表示没有检出限
                                jyjg = "未检出";
                            }else
                            {
                                jyjg = "未检出"+(char)11+"(检出限" + jcxstr + jldw + ")";
                            }
                        }else
                        {
                            jyjg = jcz+jldw; //不是0，检验结果就是  检测值 + 单位
                        }
                    }else{//检测值是 字符串 那么 检验结果 就是 jcz+单位
                        jyjg=jcz+jldw;
                    }
                }

                if (jybzList.indexOf(pdyj) < 0) {
                    jybzList.add(pdyj);
                }

                table.openCellRC((i + 2), 1).setValue(String.valueOf((i + 1)));
                table.openCellRC((i + 2), 2).setValue(String.valueOf(zwmc_bm));
                table.openCellRC((i + 2), 3).setValue(String.valueOf(jsyq));
                table.openCellRC((i + 2), 4).setValue(String.valueOf(jyjg));
                table.openCellRC((i + 2), 5).setValue(String.valueOf(if_hg));
                table.openCellRC((i + 2), 6).setValue(String.valueOf(jcxmbz));
                if ((i + 1) != jcxlist.size()) {
                    table.insertRowAfter(table.openCellRC((i + 2), 6));
                }
                Map bgJcxMap = new HashMap();
                bgJcxMap.put("bg_jsyq",jsyq);
                bgJcxMap.put("bg_jyjg",jyjg);
                bgJcxMap.put("bg_dxpd",if_hg);
                bgJcxMap.put("ypjcxid",ypjcxid);
                jcxBgList.add(bgJcxMap);//记录 报告里生成的检测项 信息 ，要会写到 t_yp_jcxm表
            }

            //////////////////////////将报告的 检测项信息保存回去，用于后期 各种统计报表
            if(jcxBgList.size()>0)
            {
                this.bgglMapper.bgbzJcxUpdate(jcxBgList);
            }


            ////////////////////////


            //生成  温度下面的 检测项目说明
            int idx=0;
            //迭代 jcxSmMap
            for (String jcyj : jcxSmMap.keySet()) {
                String zwmc = jcxSmMap.get(jcyj);
                if (idx == 0) {
                    jcxmFf = zwmc + "：按" + jcyj + "检测。";
                } else {
                    jcxmFf = jcxmFf + "\r\n·" + zwmc + "：按" + jcyj + "检测";
                }
                idx=1;
            }


            doc.openDataRegion("PO_jcxm").setValue(jcxmFf);

            doc.openDataRegion("PO_jyjl").setValue(jyjlall);
            String jybzStr = String.join(",", (String[]) jybzList.toArray(new String[jybzList.size()]));
            doc.openDataRegion("PO_jyyj").setValue(jybzStr+(char)11+"方法标准见试验说明");
            int yqsbstartrow = jcxcount + 7;
            int yqsbcount = yqsblist.size();
            for (int i = 0; i < yqsbcount; i++) {
                String sbmc = String.valueOf(yqsblist.get(i).get("sbmc"));
                String skbh = String.valueOf(yqsblist.get(i).get("skbh"));
                String ggxhz = String.valueOf(yqsblist.get(i).get("ggxh"));
                String cybh = String.valueOf(yqsblist.get(i).get("cybh"));

                table.openCellRC((i + yqsbstartrow), 1).setValue(String.valueOf(sbmc));
                table.openCellRC((i + yqsbstartrow), 2).setValue(String.valueOf(skbh));
                table.openCellRC((i + yqsbstartrow), 3).setValue(String.valueOf(ggxhz));
                table.openCellRC((i + yqsbstartrow), 4).setValue(String.valueOf(cybh));
                if ((i + 1) != yqsblist.size()) {
                    table.insertRowAfter(table.openCellRC((i + yqsbstartrow), 4));
                }
            }
            //总检验结论
            if (isOk) {
                doc.openDataRegion("PO_jyjl").setValue("该样品本次检验，所检项目合格");
            } else {
                doc.openDataRegion("PO_jyjl").setValue("该样品本次检验不合格");
            }

            PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
            request.setAttribute("poCtrl", poCtrl);
            //设置服务页面
            poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
            //添加保存按钮
            if ("1".equals(ifdy)) {
                poCtrl.addCustomToolButton("打印", "PrintFile()", 6);

            }
            poCtrl.addCustomToolButton("保存并关闭","Save",1);
            poCtrl.setJsFunction_AfterDocumentOpened("AfterDocumentOpenedBgbz()");
            poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
            poCtrl.setWriter(doc);

            //设置保存页面
            poCtrl.setSaveFilePage("savebgfile?ypbm=" + wtid + "&radio=" + radio);
            poCtrl.setTagId("PageOfficeCtrl1"); // 此行必须

            if ("1".equals(radio)) {
                poCtrl.webOpen("/customermanage/doc/bgzbfp.doc", OpenModeType.docAdmin, "admin");
            } else if ("2".equals(radio)) {
                poCtrl.webOpen("/customermanage/doc/zfbgzbnr.doc", OpenModeType.docAdmin, "admin");
            } else {
                poCtrl.webOpen("/customermanage/doc/zfbgzb.doc", OpenModeType.docAdmin, "admin");
            }

        } else {
            //检验报告第一页
            doc.openDataRegion("PO_wtbmz").setValue(wtid);
            doc.openDataRegion("PO_cpmc").setValue(ypmc);
            doc.openDataRegion("PO_ggxh").setValue(ggxh);
            doc.openDataRegion("PO_wtdw").setValue(wtdw);
            doc.openDataRegion("PO_jylb").setValue(jylbname);

            //检验报告第二页
            doc.openDataRegion("PO_sysdz").setValue(wtdwdz);
            doc.openDataRegion("PO_sysdh").setValue(wtdwdh);
            doc.openDataRegion("PO_syscz").setValue(wtdwcz);
//            doc.openDataRegion("PO_jyrq").setValue(bgzbrq);
            //检验报告第三页
            doc.openDataRegion("PO_wtbm").setValue(wtid);
            doc.openDataRegion("PO_ypmc").setValue(ypmc);
            doc.openDataRegion("PO_sb").setValue(sb);
            doc.openDataRegion("PO_ggxhz").setValue(ggxh);
            doc.openDataRegion("PO_dj").setValue(ypdj);
//            doc.openDataRegion("PO_scdwdh").setValue(scdwanddh);
            doc.openDataRegion("PO_scdwdh").setValue(wtdwdh);
            doc.openDataRegion("PO_wtdwdh").setValue(wtdwdh);
            doc.openDataRegion("PO_scdwmcdz").setValue(scdw);
            doc.openDataRegion("PO_wtdwmcdz").setValue(wtdw + "/" + wtdwdz);
            doc.openDataRegion("PO_ypsl").setValue(ypsl);
            // doc.openDataRegion("PO_ypbm").setValue(ypbm);
            doc.openDataRegion("PO_ypbm").setValue(cydbm);
            doc.openDataRegion("PO_syrq").setValue(syrq);
            doc.openDataRegion("PO_scrq").setValue(scrq);
            doc.openDataRegion("PO_syry").setValue(syry);
            doc.openDataRegion("PO_sydd").setValue(sydz);
            //doc.openDataRegion("PO_jyrq").setValue(ypjcsj);
            doc.openDataRegion("PO_jyrq").setValue(jyrq);
            doc.openDataRegion("PO_jylbz").setValue(jylbname);
            doc.openDataRegion("PO_ypzt").setValue(ypzt);
            doc.openDataRegion("PO_jyxm").setValue(jcxm);
            doc.openDataRegion("PO_jyyj").setValue(ypzxbz+" 方法标准见试验说明");
            doc.openDataRegion("PO_wtbz").setValue(bz);
            doc.openDataRegion("PO_pzrq").setValue(bbpzrq);
            doc.openDataRegion("PO_shrq").setValue(bbzsrq);
            doc.openDataRegion("PO_bzrq").setValue(bbbzrq);


            doc.openDataRegion("PO_wtid").setValue(wtid);
            //放入温度和湿度
            doc.openDataRegion("PO_maxwd").setValue(maxwd);
            doc.openDataRegion("PO_minwd").setValue(minwd);
            doc.openDataRegion("PO_maxsd").setValue(maxsd);
            doc.openDataRegion("PO_minsd").setValue(minsd);

            doc.openDataRegion("PO_btscdw").setValue(scdw);//第一页面生产单位

            if(scdw==null || scdw.trim().length()==0)
            {
                scdw="/";
            }
            doc.openDataRegion("PO_btscdw").setValue(scdw);//第一页面生产单位

            //放入签名照片
            DataRegion dataRegion1 = doc.openDataRegion("PO_bgpzr");
            String bgpzrz = this.bgglMapper.getDzqz(bgpzr);
            dataRegion1.setValue("[image]" + "../" + bgpzrz + "[/image]");

            DataRegion dataRegion2 = doc.openDataRegion("PO_bgshr");
            String bgshrz = this.bgglMapper.getDzqz(bgshr);
            dataRegion2.setValue("[image]" + "../" + bgshrz + "[/image]");

            DataRegion dataRegion3 = doc.openDataRegion("PO_bgbzr");
            String bgbzrz = this.bgglMapper.getDzqz(bgbzr);
            dataRegion3.setValue("[image]" + "../" + bgbzrz + "[/image]");

            DataRegion drTable1 = doc.openDataRegion("PO_jyxmtable");
            Table table = drTable1.openTable(1);

            String jyjg = "";

            String jcxmFf = "";
            String if_hg = "";
            List<String> jybzList = new ArrayList<String>();
            List<Map> zwList = new ArrayList<>();
            int jcxcount = jcxlist.size();
            Map<String,String> jcxSmMap = new Hashtable<>();
            List<Map> jcxBgList = new ArrayList<>();
            boolean isOk = true;
            for (int i = 0; i < jcxcount; i++) {
                String jcxmxlz = String.valueOf(jcxlist.get(i).get("xlz"));
                String zwmc_bm = String.valueOf(jcxlist.get(i).get("zwmc_bm"));
                String jsyq = String.valueOf(jcxlist.get(i).get("jsyq"));
                String jcz = String.valueOf(jcxlist.get(i).get("jcz"));
                String if_pd = String.valueOf(jcxlist.get(i).get("if_pd"));
                String jcxmbz = String.valueOf(jcxlist.get(i).get("bz"));
                String jcff = String.valueOf(jcxlist.get(i).get("jcff"));
                String jcfa = String.valueOf(jcxlist.get(i).get("jcfa"));
                String pdyj = String.valueOf(jcxlist.get(i).get("pdyj"));
                String jcxmjl = String.valueOf(jcxlist.get(i).get("jcxmjl"));
                String jldw = String.valueOf(jcxlist.get(i).get("jldw"));
                String jcxstr = jcxlist.get(i).get("jcx")+"";//检出限
                String jcyj = jcxlist.get(i).get("jcyj")+"";//检测依据 检测项的 检测依据 标准号
                String ypjcxid = jcxlist.get(i).get("ypjcxid")+"";//样品检测项id

                if(i==0)
                {
                    jcxSmMap.put(jcyj,zwmc_bm);
                }else //要判断检测依据对应的检测名字在不在
                {
                    String tempZwmc = jcxSmMap.get(jcyj)==null?"":jcxSmMap.get(jcyj)+"";
                    if(tempZwmc.trim().length()!=0)//找到 检测依据 对应的名字，也就是说这个检测依据重复， 那将名字 做连接在写回去
                    {
                        jcxSmMap.put(jcyj,tempZwmc+"、"+zwmc_bm);
                    }else{//检测依据不存在 则 新加一个检测依据
                        jcxSmMap.put(jcyj,zwmc_bm);
                    }
                }

                //判断检测值如果不是数字 那么找找里面有没有 逗号 ，如果有逗号 则换行
                if(jcz!=null && jcz.trim().length()!=0 && !isDouble(jcz))
                {
                    if(jcz.indexOf(",")!=-1 || jcz.indexOf("，")!=-1)//判断有半角 或者 全角逗号
                    {
                        jcz = jcz.replaceAll(",", jldw+"\r\n");
                        jcz = jcz.replaceAll("，", jldw+"\r\n");
                    }
                }

                /*
                1、结论 只要选择 不判定，原样显示 不做任何操作，值原样显示不带符号。
                2、结论 只要进行人工选择，就不自动计算结论，已人工选择为主。
                3、全部输入数字，并且 结论 没有选择，结论是空的，那么才会计算。
                4、输入内容有文本，强制提示必须选择结论。
                5、限量值为数字且结论不是不判定，才会带<=符号
                6、检测值=0，才是 未检出，只有 结论不是 不判定 才会做判定。
                 */
                if(jcxmjl!=null && !jcxmjl.equals("null") && jcxmjl.equals("2"))//不判定
                {
                    //jsyq 检测要求
                    //jyjg 检验结果
                    //if_hg 结论
                    jsyq=jcxmxlz+jldw; //检测要求固定写 限量值
                    jyjg = jcz+jldw;//检验结果固定写检测值
                    if_hg = "不判定";//结论固定  不判定

                }else if(jcxmjl!=null && !jcxmjl.equals("null") && !jcxmjl.equals("2") && !jcxmjl.equals("")) //检测结论不为空，不是 判定结论， 说明是 合格 或 不合格
                {
                    if(jcxmjl.equals("1"))
                    {
                        if_hg="合格";
                    }else{
                        if_hg="不合格";
                        isOk = false;
                    }
                    if(isDouble(jcxmxlz)) {
                        if(Double.parseDouble(jcxmxlz)==0) {
                            jsyq="不得检出";
                        }else
                        {
                            jsyq = "≤" + jcxmxlz + jldw;
                        }
                    }else{
                        jsyq=jcxmxlz+jldw;
                    }
                    if(isDouble(jcz)) {
                        if(jcz.equals("0")) //检测值是0
                        {
                            if(jcxstr==null || jcxstr.equals("null") || jcxstr.trim().length()==0) {//表示没有检出限
                                jyjg = "未检出";
                            }else
                            {
                                jyjg = "未检出"+(char)11+"(检出限" + jcxstr + jldw + ")";
                            }
                        }else
                        {
                            jyjg = jcz+jldw; //不是0，检验结果就是  检测值 + 单位
                        }
                    }else{//检测值是 字符串 那么 检验结果 就是 jcz+单位
                        jyjg=jcz+jldw;
                    }

                }else if(jcxmjl==null ||  jcxmjl.equals("null") ||jcxmjl.equals("")) //结论空了 这个需要计算，前台控制了 输入 ，肯定都是数字
                {
                    if (isDouble(jcz) && isDouble(jcxmxlz)) {    //页面可以随意输入了，如果不是数字类型不做比较直接使用页面输入的信息。如果是数字走之前的逻辑
                        if(Double.parseDouble(jcxmxlz)==0) {
                            jsyq="不得检出";
                        }else
                        {
                            jsyq = "≤" + jcxmxlz + jldw;
                        }
                        //若检测值大于限定值，结果为不合格，否则为合格
                        if (Double.valueOf(jcz) > Double.valueOf(jcxmxlz)) {
                            if_hg = "不合格";
                            isOk = false;
                        } else {
                            if_hg = "合格";
                        }
                    }
                    if(isDouble(jcz)) {
                        if(jcz.equals("0")) //检测值是0
                        {
                            if(jcxstr==null || jcxstr.equals("null") || jcxstr.trim().length()==0) {//表示没有检出限
                                jyjg = "未检出";
                            }else
                            {
                                jyjg = "未检出"+(char)11+"(检出限" + jcxstr + jldw + ")";
                            }
                        }else
                        {
                            jyjg = jcz+jldw; //不是0，检验结果就是  检测值 + 单位
                        }
                    }else{//检测值是 字符串 那么 检验结果 就是 jcz+单位
                        jyjg=jcz+jldw;
                    }
                }

                if (jybzList.indexOf(pdyj) < 0) {
                    jybzList.add(pdyj);
                }


                table.openCellRC((i + 2), 1).setValue(String.valueOf((i + 1)));
                table.openCellRC((i + 2), 2).setValue(String.valueOf(zwmc_bm));
                table.openCellRC((i + 2), 3).setValue(String.valueOf(jsyq));
                table.openCellRC((i + 2), 4).setValue(String.valueOf(jyjg));
                table.openCellRC((i + 2), 5).setValue(String.valueOf(if_hg));
                table.openCellRC((i + 2), 6).setValue(String.valueOf(jcxmbz));
                if ((i + 1) != jcxlist.size()) {
                    table.insertRowAfter(table.openCellRC((i + 2), 6));
                }

                Map bgJcxMap = new HashMap();
                bgJcxMap.put("bg_jsyq",jsyq);
                bgJcxMap.put("bg_jyjg",jyjg);
                bgJcxMap.put("bg_dxpd",if_hg);
                bgJcxMap.put("ypjcxid",ypjcxid);
                jcxBgList.add(bgJcxMap);//记录 报告里生成的检测项 信息 ，要会写到 t_yp_jcxm表
            }

            //////////////////////////将报告的 检测项信息保存回去，用于后期 各种统计报表
            if(jcxBgList.size()>0)
            {
                this.bgglMapper.bgbzJcxUpdate(jcxBgList);
            }


            //生成  温度下面的 检测项目说明
            int idx=0;
            //迭代 jcxSmMap
            for (String jcyj : jcxSmMap.keySet()) {
                String zwmc = jcxSmMap.get(jcyj);
                if (idx == 0) {
                    jcxmFf = zwmc + "：按" + jcyj + "检测";
                } else {
                    jcxmFf = jcxmFf + "\r\n • " + zwmc + "：按" + jcyj + "检测";
                }
                idx=1;
            }
            doc.openDataRegion("PO_jcxm").setValue(jcxmFf);
            String jybzStr = String.join(",", (String[]) jybzList.toArray(new String[jybzList.size()]));
            doc.openDataRegion("PO_jyyj").setValue(jybzStr);
            int yqsbstartrow = jcxcount + 7;
            int yqsbcount = yqsblist.size();
            for (int i = 0; i < yqsbcount; i++) {
                String sbmc = String.valueOf(yqsblist.get(i).get("sbmc"));
                String skbh = String.valueOf(yqsblist.get(i).get("skbh"));
                String ggxhz = String.valueOf(yqsblist.get(i).get("ggxh"));
                String cybh = String.valueOf(yqsblist.get(i).get("cybh"));

                table.openCellRC((i + yqsbstartrow), 1).setValue(String.valueOf(sbmc));
                table.openCellRC((i + yqsbstartrow), 2).setValue(String.valueOf(skbh));
                table.openCellRC((i + yqsbstartrow), 3).setValue(String.valueOf(ggxhz));
                table.openCellRC((i + yqsbstartrow), 4).setValue(String.valueOf(cybh));
                if ((i + 1) != yqsblist.size()) {
                    table.insertRowAfter(table.openCellRC((i + yqsbstartrow), 4));
                }
            }
            if (isOk) {
                doc.openDataRegion("PO_jyjl").setValue("该样品本次检验，所检项目合格");
            } else {
                doc.openDataRegion("PO_jyjl").setValue("该样品本次检验不合格");
            }

            PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
            request.setAttribute("poCtrl", poCtrl);
            //设置服务页面
            poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
            //添加保存按钮
            if ("1".equals(ifdy)) {
                poCtrl.addCustomToolButton("打印", "PrintFile()", 6);

            }

            poCtrl.addCustomToolButton("保存并关闭","Save",1);
            poCtrl.setJsFunction_AfterDocumentOpened("AfterDocumentOpenedBgbz()");
            poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
            poCtrl.setWriter(doc);

            //设置保存页面
            poCtrl.setSaveFilePage("savebgfile?ypbm=" + wtid + "&radio=" + radio);
            poCtrl.setTagId("PageOfficeCtrl1"); // 此行必须

            if ("1".equals(radio)) {
                poCtrl.webOpen("/customermanage/doc/bgzbfp.doc", OpenModeType.docAdmin, "admin");
            } else if ("2".equals(radio)) {
                poCtrl.webOpen("/customermanage/doc/qybgzbnr.doc", OpenModeType.docAdmin, "admin");
            } else {
                poCtrl.webOpen("/customermanage/doc/qybgzb.doc", OpenModeType.docAdmin, "admin");
            }

        }
        bgglMapper.upReadonly(map);
        return "pageoffice/Word";
    }

    /**
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/bjWtbg")
    public String bjWtbg(HttpServletRequest request) {
        WordDocument doc = new WordDocument();

        String wtids = request.getParameter("wtid");
        String ypbms = request.getParameter("ypbm");


        Map map = new HashMap();
        map.put("wtid", wtids);
        map.put("ypbm", ypbms);
        String[] ypbmArr = ypbms.split(",");
        ArrayList<String> arrayList = new ArrayList<String>(Arrays.asList(ypbmArr));
        List<Map> bglj = bgglMapper.findBgLjForPldy(arrayList);

        String ysDocPaht="";
        for (int i = 0; i < bglj.size(); i++) {
            String path = bglj.get(i).get("wzbg_doclj") == null ? "" : bglj.get(i).get("wzbg_doclj").toString();
            if (!"".equals(path)) {
                ysDocPaht=path;
            }
        }

        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        String dateString = dateFormat.format(date);
        String megerfile = request.getSession().getServletContext().getRealPath("/") + "/file/" + dateString + "/";
        File targetFile = new File(megerfile);
        if (!targetFile.exists()) {
            targetFile.mkdir();
        }
        String fileName = UUID.randomUUID().toString() + ".doc";
        //将已经原来生成的被编辑过的word报告 复制到 项目 可http请求的目录下
        this.copyWord(ysDocPaht,megerfile+fileName);

        PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
        poCtrl.addCustomToolButton("保存并关闭","Save",1);
        poCtrl.setJsFunction_AfterDocumentOpened("AfterDocumentOpenedBgbz()");
        //添加保存按钮
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        poCtrl.setWriter(doc);
        //设置保存页面
        poCtrl.setSaveFilePage("savebgfile?ypbm=" + ypbms + "&radio=3");
        poCtrl.setTagId("PageOfficeCtrl1"); //此行必须
        poCtrl.setAllowCopy(false);
        //打开excel
        poCtrl.webOpen("/customermanage/file/" + dateString + "/" + fileName, OpenModeType.docAdmin, "张三");


        return "pageoffice/Word";
    }

    /**
     * 文件复制
     * @param srcFile
     * @param descFile
     * @return
     */
    public static boolean copyWord(String srcFile, String descFile) {
        try {
            FileUtils.copyFile(new File(srcFile),new File(descFile));
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

}
