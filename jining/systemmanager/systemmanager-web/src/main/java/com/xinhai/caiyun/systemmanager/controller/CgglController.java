package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.config.Configure;
import com.deepoove.poi.data.PictureRenderData;
import com.deepoove.poi.data.RowRenderData;
import com.deepoove.poi.data.TextRenderData;
import com.sun.javafx.collections.MappingChange;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.BgglService;
import com.xinhai.caiyun.customermanage.api.SystemMessages;
import com.xinhai.caiyun.customermanage.api.SystemMessagesService;
import com.xinhai.caiyun.customermanage.dao.BgglMapper;
import com.xinhai.caiyun.systemmanager.api.TscPrintUtil;
import com.xinhai.caiyun.systemmanager.controller.reportUtils.DetailTablePolicy_cgbz1;
import com.xinhai.caiyun.systemmanager.controller.reportUtils.DetailTablePolicy_cgys1;
import com.xinhai.caiyun.systemmanager.controller.reportUtils.DetailTablePolicy_sysysjl1;
import com.xinhai.security.api.CurrentLoginUser;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;
import freemarker.template.Configuration;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.CgglService;
import service.CgshService;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping(value = "/cggl")
public class CgglController extends HttpServlet {
    @Autowired
    private CgglService cgglService;
    @Autowired
    private SystemMessagesService systemMessagesService;
    @Autowired
    private CgshService cgshService;
    @Autowired
    private BgglMapper bgglMapper;

    /**
     * 获得采购管理的信息
     */
    @RequestMapping(value = "/cgglSeach", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage<Map> yycx_queryList(@RequestParam("start") String start,
                                                  @RequestParam("length") String length,
                                                  @RequestParam("hcmc") String hcmc,
                                                  @RequestParam("startDate") String startDate,
                                                  @RequestParam("endDate") String endDate,
                                                  @RequestParam("hclx") String hclx,
                                                  @RequestParam("bzzt") String bzzt,
                                                  @RequestParam("sqzt") String sqzt
    ) {
        Map map = new HashMap();
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        if (notNULL(hcmc)) {
            map.put("hcmc", hcmc);
        }
        if (notNULL(hclx)) {
            map.put("hclx", hclx);
        }
        if (notNULL(startDate)) {
            try {
                map.put("startDate", sf.parse(startDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        if (notNULL(endDate)) {
            try {
                map.put("endDate", sf.parse(endDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        if (notNULL(bzzt)) {
            map.put("bzzt", bzzt);
        }
        if (notNULL(sqzt)) {
            map.put("sqzt", sqzt);
        }
        List<Map> list = cgglService.selectCggl(map);
        int totalCount = 0;
        totalCount = cgglService.selectCount(map);
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
     * 通过操作
     */
    @RequestMapping(value = "/cgbzPass", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject cgbzPass(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map map = new HashMap();
            List<String> list = new ArrayList<String>();
            String[] ids = request.getParameter("ids").split(",");
            String zt = request.getParameter("zt");
            String bzr = CurrentLoginUser.getUser().getZydm();
            map.put("bzr", bzr);//编制人
            map.put("bzzt", zt);//编制状态 002  通过
            for (int i = 0; i < ids.length; i++) {
                list.add(ids[i]);
            }
            map.put("ids", list);
            cgglService.saveBzzt(map);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    /**
     * 退回操作
     */
    @RequestMapping(value = "/cgbzBack", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject cgbzBack(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map map = new HashMap();
            List<Map> mess = new ArrayList<Map>();//消息集合
            SystemMessages systemMessages = new SystemMessages();//发送消息
            List<String> list = new ArrayList<String>();
            String[] ids = request.getParameter("ids").split(",");
            String zt = request.getParameter("zt");
            String shr = CurrentLoginUser.getUser().getZydm();
            map.put("bzr", shr);//编制人
            map.put("bzzt", zt);//编制状态 003  未通过
            for (int i = 0; i < ids.length; i++) {
                list.add(ids[i]);
            }
            map.put("ids", list);
            cgglService.saveBzzt(map);//改变编制状态
            mess = cgshService.queryMess(list);
            for (Map user : mess) {//发送到消息提醒中
                try {
                    //消息提醒
                    String txbt = "耗材 " + user.get("hcmc") + " 编制未通过";
                    String txnr = "耗材 " + user.get("hcmc") + " 在编制环节中未通过";
                    String txlx = "000";
                    systemMessages.setXxid(UUID.randomUUID().toString());
                    systemMessages.setTxlx_dm(txlx);
                    systemMessages.setDljg_bm(CurrentLoginUser.getUser().getDljgBm());
                    systemMessages.setTxbt(txbt);
                    systemMessages.setTxnr(txnr);
                    systemMessages.setFsry_dm(CurrentLoginUser.getUser().getZydm());
                    systemMessages.setFsry_mc(CurrentLoginUser.getUser().getName());
                    systemMessages.setJsry_dm(user.get("sqr") + "");
                    systemMessages.setFssj(new Date());
                    systemMessagesService.addSystemMessages(systemMessages);
                } catch (Exception e) {
                    System.out.println("发送消息提醒错误！");
                    e.printStackTrace();
                }
            }
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    /*
     * 刘鹏你这个方法写的真low  玷污我的耗材部分！
     * 修改耗材金额*/
    @RequestMapping(value = "/updateCgsqhcbz", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject updateCgsqhcbz(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String dj = request.getParameter("dj");
            String zj = request.getParameter("zj");
            String hcbzid = request.getParameter("hcbzid");
            Map map = new HashMap();
            map.put("dj", dj);
            map.put("zj", zj);
            map.put("hcbzid", hcbzid);
            cgglService.updateCgsqhcbz(map);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    /**
     * 打印采购编制的报告
     */
    @RequestMapping(value = "/printCgbzReport")
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
            List<Map> list = cgglService.queryCgysByIds(ids);
            if (list != null) {
                Map zydms = list.get(0);
                dataMap.put("sqr", new PictureRenderData(60, 40, request.getSession().getServletContext().getRealPath("/") + "/" + bgglMapper.getDzqz(zydms.get("sqr") + "")));
                dataMap.put("shr", new PictureRenderData(60, 40, request.getSession().getServletContext().getRealPath("/") + "/" + bgglMapper.getDzqz(zydms.get("shr") + "")));
                dataMap.put("bzr", new PictureRenderData(60, 40, request.getSession().getServletContext().getRealPath("/") + "/" + bgglMapper.getDzqz(zydms.get("bzr") + "")));
                dataMap.put("spr", new PictureRenderData(60, 40, request.getSession().getServletContext().getRealPath("/") + "/" + bgglMapper.getDzqz(zydms.get("spr") + "")));
            }
            for (int i = 0; i < list.size(); i++) {
                Map map = list.get(i);
                String xh = i + 1 + "";//序号
                String hcmc = map.get("hcmc") + "";//耗材名称
                String gg = map.get("gg") + "";//规格型号
                String sl = map.get("sl") + "";//数量
                String cgmd = map.get("cgmd") + "";//采购目的
                String dj = map.get("dj") + "";//单价
                String zj = map.get("zj") + "";//总价
                String sccj = map.get("sccj") + "";//生产厂家
                data = new ArrayList<>();
                data.add(0, new TextRenderData(isNull(xh)));
                data.add(1, new TextRenderData(isNull(hcmc)));
                data.add(2, new TextRenderData(isNull(gg)));
                data.add(3, new TextRenderData(isNull(sl)));
                data.add(4, new TextRenderData(isNull(cgmd)));
                data.add(5, new TextRenderData(isNull(dj)));
                data.add(6, new TextRenderData(isNull(zj)));
                data.add(7, new TextRenderData(isNull(sccj)));
                dataList.add(new RowRenderData(data));
            }
            Configure config = Configure.newBuilder().customPolicy("cgbz_table", new DetailTablePolicy_cgbz1(dataList)).build();
            XWPFTemplate template = XWPFTemplate.compile(request.getSession().getServletContext().getRealPath("/template/cgbzYbhcExport.docx"), config).render(dataMap);
            String director = request.getSession().getServletContext().getRealPath("/doc");
            File file = new File(director);
            if (!file.exists()) {
                file.mkdir();
            }
            path = director + "/" + CurrentLoginUser.getUser().getZydm() + "cgbz.docx";
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
     * 导出Excel
     */
    @RequestMapping("/exportCgglExcel")
    @ResponseBody
    public void exportCcglExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String tempids = request.getParameter("ids");
        String[] ids = tempids.split(",");
        if (ids.length > 0) {
            response.reset(); //清除buffer缓存
            Map<String, Object> map = new HashMap<String, Object>();
            // 指定下载的文件名，浏览器都会使用本地编码，即GBK，浏览器收到这个文件名后，用ISO-8859-1来解码，然后用GBK来显示
            // 所以我们用GBK解码，ISO-8859-1来编码，在浏览器那边会反过来执行。
            response.setHeader("Content-Disposition", "attachment;filename=" + new String("采购信息表.xlsx".getBytes("GBK"), "ISO-8859-1"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", new Date().getTime());
            XSSFWorkbook workbook = null;
            //获得excel文件
            workbook = cgglService.exportCgglExcel(ids);
            OutputStream output;
            try {
                output = response.getOutputStream();
                BufferedOutputStream bufferedOutPut = new BufferedOutputStream(output);
                bufferedOutPut.flush();
                workbook.write(bufferedOutPut);
                bufferedOutPut.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 获得采购验收的信息
     */
    @RequestMapping(value = "/cgglCgysSeach", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage cgglCgysSeach(@RequestParam("start") String start,
                                            @RequestParam("length") String length,
                                            @RequestParam("hcmc") String hcmc,
                                            @RequestParam("yszt") String yszt,
                                            @RequestParam("hclx") String hclx
    ) {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        if (notNULL(hclx)) {
            map.put("hclx", hclx);
        }
        if (notNULL(hcmc)) {
            map.put("hcmc", hcmc);
        }
        if (notNULL(yszt)) {
            map.put("yszt", yszt);
        }
        map.put("sqr", CurrentLoginUser.getUser().getZydm());
        List<Map> list = cgglService.queryCgys(map);
        int totalCount = 0;
        try {
            totalCount = cgglService.queryCgysNum(map);
        } catch (Exception e) {
            totalCount = 1;
        }
        DatatablesViewPage<Map> dv = new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }

    /**
     * 采购验收  更改采购状态和申请状态
     */
    @RequestMapping(value = "/saveCgysZt", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveCgysZt(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String[] idsArry = request.getParameter("ids").split(",");
            List ids = new ArrayList();
            for (int i = 0; i < idsArry.length; i++) {
                ids.add(idsArry[i]);
            }
            cgglService.saveCgysZt(ids);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    ;

    /**
     * 采购验收  条码打印
     */
    @RequestMapping(value = "/printBarcode", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject queryCgysByIds(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            TscPrintUtil tscPrintUtil = new TscPrintUtil();
            String[] idsArry = request.getParameter("ids").split(",");
            List ids = new ArrayList();
            for (int i = 0; i < idsArry.length; i++) {
                ids.add(idsArry[i]);
            }
            List<Map> list = cgglService.queryCgysByIds(ids);
            for (Map m : list) {
                tscPrintUtil.setParmeter(m);//调用打印机  进行打印
            }
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    ;

    /**
     * 采购验收 打印标准物质验收记录
     */
    @RequestMapping(value = "/printReport")
    public String printReport(HttpServletRequest request) {
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
        String[] idsArry = request.getParameter("ids").split(",");
        List ids = new ArrayList();
        for (int i = 0; i < idsArry.length; i++) {
            ids.add(idsArry[i]);
        }
        List<Map> list = cgglService.queryCgysByIds(ids);
        int list_size = list.size();
        int num = list.size() / 2;//最外层循环的次数
        if (list.size() % 2 > 0) {
            num = num + 1;
            list.add(new HashMap());//如果满足条件  那就说明集合的长度是奇数  那就要加一个null值吧
        }
        Map map = new HashMap();
        List<RowRenderData> dataList = new ArrayList();
        List<TextRenderData> data = null;
        int k = 0;
        for (int i = 0; i < num; i++) {
            Map map1 = list.get(i + k);
            Map map2 = list.get(i + k + 1);
            String hcmc1 = map1.get("hcmc") + "";//耗材名称
            String hcmc2 = map2.get("hcmc") + "";
            String bz1 = map1.get("sccj") + "";//生产厂家
            String bz2 = map2.get("sccj") + "";
            String cgsx1 = "";//证书编号
            String cgsx2 = "";
            String zbqx1 = "";//有效期限
            String zbqx2 = "";
            data = new ArrayList<>();
            data.add(0, new TextRenderData(isNull(hcmc1)));
            data.add(1, new TextRenderData(""));
            data.add(2, new TextRenderData(""));
            data.add(3, new TextRenderData(isNull(hcmc2)));
            data.add(4, new TextRenderData(""));
            dataList.add(new RowRenderData(data));
            data = new ArrayList<>();
            data.add(0, new TextRenderData(isNull(bz1)));
            data.add(1, new TextRenderData(""));
            data.add(2, new TextRenderData(""));
            data.add(3, new TextRenderData(isNull(bz2)));
            data.add(4, new TextRenderData(""));
            dataList.add(new RowRenderData(data));
            data = new ArrayList<>();
            data.add(0, new TextRenderData(isNull(cgsx1)));
            data.add(1, new TextRenderData(""));
            data.add(2, new TextRenderData(isNull(cgsx2)));
            data.add(3, new TextRenderData(isNull(zbqx1)));
            data.add(4, new TextRenderData(isNull(zbqx2)));
            dataList.add(new RowRenderData(data));
            k = k + 1;
        }
        String path = createDocx(map, dataList, request);//得到文件的存放路径
        String realpath = path.replace("/", "\\\\");
        //打开word
        poCtrl.webOpen(realpath, OpenModeType.docNormalEdit, "张三");
        return "pageoffice/Word";
    }

    /**
     * 创建world文件 并且返会文件路径
     */
    public String createDocx(Map map, List<RowRenderData> dataList, HttpServletRequest request) {
        String tartPath = "";
        try {
            Configure config = Configure.newBuilder().customPolicy("cgys_table", new DetailTablePolicy(dataList)).build();
            XWPFTemplate template = XWPFTemplate.compile(request.getSession().getServletContext().getRealPath("/template/cgysModel.docx"), config).render(map);
            String director = request.getSession().getServletContext().getRealPath("/doc");
            File file = new File(director);
            if (!file.exists()) {
                file.mkdir();
            }
            tartPath = director + "/" + CurrentLoginUser.getUser().getZydm() + "cgys.docx";
            FileOutputStream out = new FileOutputStream(tartPath);
            template.write(out);
            out.flush();
            out.close();
            template.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return tartPath;
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
     * 修改总价
     */
    @RequestMapping(value = "/alertPrice", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject alertPrice(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map map = new HashMap();
            DecimalFormat df = new DecimalFormat("#.00");//保存两位小数
            String id = request.getParameter("id");//id
            String sl = request.getParameter("sl");//数量
            String dj = request.getParameter("dj");//单价
            String sccj = request.getParameter("sccj");//生产厂家
            Double d_sl = Double.parseDouble(sl);
            Double d_dj = Double.parseDouble(dj);
            String zj = df.format(d_dj * d_sl);//格式化保存两位小数
            map.put("id", id);
            map.put("zj", zj);
            map.put("dj", dj);
            map.put("sccj", sccj);
            cgglService.saveZj(map);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    ;

    /**
     * 打印固体试剂验收记录
     */
    @RequestMapping(value = "/printGtsjReport")
    public String printGtsjlReport(HttpServletRequest request) {
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
            List<Map> list = cgglService.queryCgysByIds(ids);
            for (int i = 0; i < list.size(); i++) {
                Map map = list.get(i);
                String hcmc = map.get("hcmc") + "";//耗材名称
                String sl = map.get("sl") + "";//数量
                String sccj = map.get("sccj") + "";//生产厂家
                String wzzt = "固体□ 液体□";
                data = new ArrayList<>();
                data.add(0, new TextRenderData(isNull(hcmc)));
                data.add(1, new TextRenderData(isNull(hcmc)));
                data.add(2, new TextRenderData(isNull(sl)));
                data.add(3, new TextRenderData(isNull(sccj)));
                data.add(4, new TextRenderData(isNull(wzzt)));
                dataList.add(new RowRenderData(data));
            }
            Configure config = Configure.newBuilder().customPolicy("table_gtsjysjl", new DetailTablePolicy_cgys1(dataList)).build();
            XWPFTemplate template = XWPFTemplate.compile(request.getSession().getServletContext().getRealPath("/template/cgys_gtsjysjl.docx"), config).render(dataMap);
            String director = request.getSession().getServletContext().getRealPath("/doc");
            File file = new File(director);
            if (!file.exists()) {
                file.mkdir();
            }
            path = director + "/" + CurrentLoginUser.getUser().getZydm() + "gtsjysjl.docx";
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
     * 打印无机液体试剂验收记录
     */
    @RequestMapping(value = "/printWjytReport")
    public String printWjytReport(HttpServletRequest request) {
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
            List<Map> list = cgglService.queryCgysByIds(ids);
            for (int i = 0; i < list.size(); i++) {
                Map map = list.get(i);
                String hcmc = map.get("hcmc") + "";//耗材名称
                String sl = map.get("sl") + "";//数量
                String sccj = map.get("sccj") + "";//生产厂家
                String wzzt = "固体□ 液体□";
                data = new ArrayList<>();
                data.add(0, new TextRenderData(isNull(hcmc)));
                data.add(1, new TextRenderData(isNull(hcmc)));
                data.add(2, new TextRenderData(isNull(sl)));
                data.add(3, new TextRenderData(isNull(sccj)));
                data.add(4, new TextRenderData(isNull(wzzt)));
                dataList.add(new RowRenderData(data));
            }
            Configure config = Configure.newBuilder().customPolicy("table_wjytsj", new DetailTablePolicy_cgys1(dataList)).build();
            XWPFTemplate template = XWPFTemplate.compile(request.getSession().getServletContext().getRealPath("/template/cgys_wjytsj.docx"), config).render(dataMap);
            String director = request.getSession().getServletContext().getRealPath("/doc");
            File file = new File(director);
            if (!file.exists()) {
                file.mkdir();
            }
            path = director + "/" + CurrentLoginUser.getUser().getZydm() + "wjytsj.docx";
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
     * 打印有机试剂验收记录
     */
    @RequestMapping(value = "/printYjsjReport")
    public String printYjsjReport(HttpServletRequest request) {
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
            List<Map> list = cgglService.queryCgysByIds(ids);
            for (int i = 0; i < list.size(); i++) {
                Map map = list.get(i);
                String hcmc = map.get("hcmc") + "";//耗材名称
                String sl = map.get("sl") + "";//数量
                String sccj = map.get("sccj") + "";//生产厂家
                String wzzt = "固体□ 液体□";
                data = new ArrayList<>();
                data.add(0, new TextRenderData(isNull(hcmc)));
                data.add(1, new TextRenderData(isNull(hcmc)));
                data.add(2, new TextRenderData(isNull(sl)));
                data.add(3, new TextRenderData(isNull(sccj)));
                data.add(4, new TextRenderData(isNull(wzzt)));
                dataList.add(new RowRenderData(data));
            }
            Configure config = Configure.newBuilder().customPolicy("table_yjsj", new DetailTablePolicy_cgys1(dataList)).build();
            XWPFTemplate template = XWPFTemplate.compile(request.getSession().getServletContext().getRealPath("/template/cgys_yjsj.docx"), config).render(dataMap);
            String director = request.getSession().getServletContext().getRealPath("/doc");
            File file = new File(director);
            if (!file.exists()) {
                file.mkdir();
            }
            path = director + "/" + CurrentLoginUser.getUser().getZydm() + "yjsj.docx";
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
     * 打印实验室验收记录
     */
    @RequestMapping(value = "/printSysysjlReport")
    public String printSysysjlReport(HttpServletRequest request) {
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
            SimpleDateFormat smf = new SimpleDateFormat("yyyy-MM-dd");
            Map dataMap = new HashMap();
            dataMap.put("ysrq", smf.format(new Date()));
            dataMap.put("ysr", CurrentLoginUser.getUser().getName());
            List<RowRenderData> dataList = new ArrayList();
            String[] idsArry = request.getParameter("ids").split(",");
            List ids = new ArrayList();
            for (int i = 0; i < idsArry.length; i++) {
                ids.add(idsArry[i]);
            }
            List<Map> list = cgglService.queryCgysByIds(ids);
            for (int i = 0; i < list.size(); i++) {
                Map map = list.get(i);
                String xh = i + 1 + "";//序号
                String hcmc = map.get("hcmc") + "";//耗材名称
                String gg = map.get("gg") + "";//规格型号
                String sl = map.get("sl") + "";//数量
                String sf = "是□否□";//是否
                data = new ArrayList<>();
                data.add(0, new TextRenderData(isNull(xh)));
                data.add(1, new TextRenderData(isNull(hcmc)));
                data.add(2, new TextRenderData(isNull(gg)));
                data.add(3, new TextRenderData(isNull(sl)));
                data.add(4, new TextRenderData(isNull(sf)));
                data.add(5, new TextRenderData(isNull(sf)));
                data.add(6, new TextRenderData(isNull(sf)));
                data.add(7, new TextRenderData(isNull(sf)));
                data.add(8, new TextRenderData(isNull(sf)));
                data.add(9, new TextRenderData(isNull(sf)));
                data.add(10, new TextRenderData(isNull(sf)));
                dataList.add(new RowRenderData(data));
            }
            Configure config = Configure.newBuilder().customPolicy("table_sysysjl", new DetailTablePolicy_sysysjl1(dataList)).build();
            XWPFTemplate template = XWPFTemplate.compile(request.getSession().getServletContext().getRealPath("/template/cgys_sysysjl.docx"), config).render(dataMap);
            String director = request.getSession().getServletContext().getRealPath("/doc");
            File file = new File(director);
            if (!file.exists()) {
                file.mkdir();
            }
            path = director + "/" + CurrentLoginUser.getUser().getZydm() + "sysysjl.docx";
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
     * 打印标准物质一览表
     */
    @RequestMapping(value = "/printBzwzYlbReport")
    public String printBzwzYlbReport(HttpServletRequest request) {
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
            List<Map> list = cgglService.queryCgysByIds(ids);
            for (int i = 0; i < list.size(); i++) {
                Map map = list.get(i);
                String xh = i + 1 + "";//序号
                String hcmc = map.get("hcmc") + "";//耗材名称
                String nd = "";//浓度
                String yzdw = "";//研制单位
                String gg = map.get("gg") + "";//规格型号
                String ph = "";//批号、
                String dzrq = "";//定值日期
                String grrq = "";//购入日期
                String sl = map.get("sl") + "";//数量
                String bcff = "";//购入日期
                String cffdd = "";//存放地点
                String sxrq = "";//失效日期
                String bgr = "";//保管人
                String bz = "";//备注
                data = new ArrayList<>();
                data.add(0, new TextRenderData(isNull(xh)));
                data.add(1, new TextRenderData(isNull(hcmc)));
                data.add(2, new TextRenderData(isNull(nd)));
                data.add(3, new TextRenderData(isNull(yzdw)));
                data.add(4, new TextRenderData(isNull(gg)));
                data.add(5, new TextRenderData(isNull(ph)));
                data.add(6, new TextRenderData(isNull(dzrq)));
                data.add(7, new TextRenderData(isNull(grrq)));
                data.add(8, new TextRenderData(isNull(sl)));
                data.add(9, new TextRenderData(isNull(bcff)));
                data.add(10, new TextRenderData(isNull(cffdd)));
                data.add(11, new TextRenderData(isNull(sxrq)));
                data.add(12, new TextRenderData(isNull(bgr)));
                data.add(13, new TextRenderData(isNull(bz)));
                dataList.add(new RowRenderData(data));
            }
            Configure config = Configure.newBuilder().customPolicy("table_ylb", new DetailTablePolicy_cgbz1(dataList)).build();
            XWPFTemplate template = XWPFTemplate.compile(request.getSession().getServletContext().getRealPath("/template/cgys_bzwzylb.docx"), config).render(dataMap);
            String director = request.getSession().getServletContext().getRealPath("/doc");
            File file = new File(director);
            if (!file.exists()) {
                file.mkdir();
            }
            path = director + "/" + CurrentLoginUser.getUser().getZydm() + "ylb.docx";
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
}
