package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.config.Configure;
import com.deepoove.poi.data.RowRenderData;
import com.deepoove.poi.data.TextRenderData;
import com.deepoove.poi.data.style.Style;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.systemmanager.controller.reportUtils.DetailTablePolicy_cgbz1;
import com.xinhai.caiyun.systemmanager.controller.reportUtils.DetailTablePolicy_hcly1;
import com.xinhai.security.api.CurrentLoginUser;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.HclyglService;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/hclygl")
public class HclyglController {
    @Autowired
    private HclyglService hclyglService;

    /**
     * 获得领用出库的数据
     */
    @RequestMapping(value = "/hclyglSeach",method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage<Map> hclyglSeach(@RequestParam("start") String start,
                                               @RequestParam("length") String length,
                                               @RequestParam("hclx") String hclx,
                                               @RequestParam("hcmc") String hcmc,
                                               @RequestParam("startDate") String startDate,
                                               @RequestParam("endDate") String endDate

    ) {
        Map map = new HashMap();
        SimpleDateFormat smf = new SimpleDateFormat("yyyy-MM-dd");
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        if (notNULL(hclx)) {
            map.put("hclx", hclx);
        }
        ;
        if (notNULL(hcmc)) {
            map.put("hcmc", hcmc);
        }
        if (notNULL(startDate)) {
            try {
                map.put("startDate", smf.parse(startDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        if (notNULL(endDate)) {
            try {
                map.put("endDate", smf.parse(endDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        List<Map> list = hclyglService.queryLyglAll(map);
        int totalCount = 0;
        totalCount = hclyglService.queryLyglAllNum(map);
        DatatablesViewPage<Map> dv = new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }

    /**
     * 不为空的检测
     */
    public boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
    }

    /**
     * 打印一般耗材领用记录
     */
    @RequestMapping(value = "/ybhcReport")
    public String printCgbzReport(HttpServletRequest request) {
        PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
        //添加保存按钮
        poCtrl.addCustomToolButton("保存并关闭", "Save", 1);
        poCtrl.addCustomToolButton("加盖印章", "InsertSeal()", 2);
        poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        //设置保存的action
        poCtrl.setSaveFilePage("savefile.do");
        try {
            String path = "";
            List data = null;
            Map dataMap = new HashMap();
            List<RowRenderData> dataList = new ArrayList();
            String[] idsArry = request.getParameter("ids").split(",");
            List ids = new ArrayList();
            for (int i = 0; i < idsArry.length; i++) {
                ids.add(idsArry[i]);
            }
            List<Map> list = hclyglService.getReportData(ids);
            for (int i = 0; i < list.size(); i++) {
                Map map = list.get(i);
                String lyrq = map.get("lyrq") + "";//领用日期
                String hcmc = map.get("hcmc") + "";//耗材名称
                String gg = map.get("gg") + "";//规格型号
                String lysl = map.get("lysl") + "";//领用数量
                String sccj = map.get("sccj") + "";//生产厂家
                String cfwz = map.get("cfwz") + "";//存放位置
                String lyr = map.get("lyr") + "";//领用人
                String kcsl = map.get("kcsl") + "";//库存
                String bz = "";//备注
                data = new ArrayList<>();
                data.add(0, new TextRenderData(isNull(lyrq)));
                data.add(1, new TextRenderData(isNull(hcmc)));
                data.add(2, new TextRenderData(isNull(gg)));
                data.add(3, new TextRenderData(isNull(lysl)));
                data.add(4, new TextRenderData(isNull(sccj)));
                data.add(5, new TextRenderData(isNull(cfwz)));
                data.add(6, new TextRenderData(isNull(lyr)));
                data.add(7, new TextRenderData(isNull(kcsl)));
                data.add(8, new TextRenderData(isNull(bz)));
                dataList.add(new RowRenderData(data));
            }
            Configure config = Configure.newBuilder().customPolicy("hcly_table", new DetailTablePolicy_hcly1(dataList)).build();
            XWPFTemplate template = XWPFTemplate.compile(request.getSession().getServletContext().getRealPath("/template/ybhc_lyjl.docx"), config).render(dataMap);
            String director = request.getSession().getServletContext().getRealPath("/doc");
            File file = new File(director);
            if (!file.exists()) {
                file.mkdir();
            }
            path = director + "/" + CurrentLoginUser.getUser().getZydm() + "hcly1.docx";
            FileOutputStream out = new FileOutputStream(path);
            template.write(out);
            out.flush();
            out.close();
            template.close();
            String realpath = path.replace("/", "\\\\");
            //打开word
            poCtrl.webOpen(realpath, OpenModeType.docNormalEdit, "张三");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "pageoffice/Word";
    }
    /**
     * 打印标准物质报告
     */
    @RequestMapping(value = "/bzwzReport")
    public String bzwzReport(HttpServletRequest request) {
        PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
        //添加保存按钮
        poCtrl.addCustomToolButton("保存并关闭", "Save", 1);
        poCtrl.addCustomToolButton("加盖印章", "InsertSeal()", 2);
        poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        //设置保存的action
        poCtrl.setSaveFilePage("savefile.do");
        try {
            String path = "";
            List data = null;
            Map dataMap = new HashMap();
            List<RowRenderData> dataList = new ArrayList();
            String[] idsArry = request.getParameter("ids").split(",");
            List ids = new ArrayList();
            for (int i = 0; i < idsArry.length; i++) {
                ids.add(idsArry[i]);
            }
            List<Map> list = hclyglService.getReportData(ids);
            for (int i = 0; i < list.size(); i++) {
                Map map = list.get(i);
                String xh = i+ 1 + "";//序号
                String hcmc = map.get("hcmc") + "";//耗材名称
                String lysl = map.get("lysl") + "";//领用数量
                String lyr = map.get("lyr") + "";//领用人
                String lyrq = map.get("lyrq") + "";//领用日期
                String bz = "";//备注
                data = new ArrayList<>();
                data.add(0, new TextRenderData(isNull(xh)));
                data.add(1, new TextRenderData(isNull(hcmc)));
                data.add(2, new TextRenderData(isNull(lysl)));
                data.add(3, new TextRenderData(isNull(lyr)));
                data.add(4, new TextRenderData(isNull(lyrq)));
                data.add(5, new TextRenderData(isNull(bz)));
                dataList.add(new RowRenderData(data));
            }
            Configure config = Configure.newBuilder().customPolicy("bzwz_table", new DetailTablePolicy_hcly1(dataList)).build();
            XWPFTemplate template = XWPFTemplate.compile(request.getSession().getServletContext().getRealPath("/template/bzwz_lyjl.docx"), config).render(dataMap);
            String director = request.getSession().getServletContext().getRealPath("/doc");
            File file = new File(director);
            if (!file.exists()) {
                file.mkdir();
            }
            path = director + "/" + CurrentLoginUser.getUser().getZydm() + "hcly2.docx";
            FileOutputStream out = new FileOutputStream(path);
            template.write(out);
            out.flush();
            out.close();
            template.close();
            String realpath = path.replace("/", "\\\\");
            //打开word
            poCtrl.webOpen(realpath, OpenModeType.docNormalEdit, "张三");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "pageoffice/Word";
    }
    /**
     * 如果是空值  就返会字符串
     */
    public String isNull(String str) {
        if (str == null || "null".equals(str)) {
            str = "";
        }
        return str;
    }

    /**
     *
     * 批量删除
     */
    @RequestMapping(value = "/delLygl", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject delLygl(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String[] arry_ids = request.getParameter("ids").split(",");
            List<String> ids = new ArrayList<String>();
            for (int i = 0; i < arry_ids.length; i++) {
                ids.add(arry_ids[i]);
            }
            hclyglService.delLygl(ids);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }
}
