package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.config.Configure;
import com.deepoove.poi.data.RowRenderData;
import com.deepoove.poi.data.TextRenderData;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.systemmanager.controller.reportUtils.DetailTablePolicy_hcly1;
import com.xinhai.caiyun.systemmanager.dao.HcthglMapper;
import com.xinhai.security.api.CurrentLoginUser;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.HcthService;
import service.HcthglService;

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
@RequestMapping(value = "/hcthgl")
public class HcthglController {
    // 查询全部
    @Autowired
    private HcthglService hcthglService;

    /**
     * 显示耗材领用的信息
     */
    @RequestMapping(value = "/hcthglSeach", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage hcthglSeach(@RequestParam("start") String start,
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
        List<Map> list = hcthglService.queryHcthglAll(map);
        int totalCount = 0;
        totalCount = hcthglService.queryHcthglAllNum(map);
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
     * 如果是空值  就返会字符串
     */
    public String isNull(String str) {
        if (str == null || "null".equals(str)) {
            str = "";
        }
        return str;
    }
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
            List<Map> list = hcthglService.getReportData(ids);
            for (int i = 0; i < list.size(); i++) {
                Map map = list.get(i);
                String xh = i+1+"";//序号
                String hcmc = map.get("hcmc") + "";//耗材名称
                String thsl = map.get("thsl") + "";//退回数量
                String thr = map.get("thr") + "";//退回人
                String thrq = map.get("thrq") + "";//退回日期
                String  cfwz = map.get("cfwz") + "";//退回位置
                String jbr = "";//经办人
                String bz = "";//备注
                data = new ArrayList<>();
                data.add(0, new TextRenderData(isNull(xh)));
                data.add(1, new TextRenderData(isNull(hcmc)));
                data.add(2, new TextRenderData(isNull(thsl)));
                data.add(3, new TextRenderData(isNull(thr)));
                data.add(4, new TextRenderData(isNull(thrq)));
                data.add(5, new TextRenderData(isNull(cfwz)));
                data.add(6, new TextRenderData(isNull(jbr)));
                data.add(7, new TextRenderData(isNull(bz)));
                dataList.add(new RowRenderData(data));
            }
            Configure config = Configure.newBuilder().customPolicy("hcth_table", new DetailTablePolicy_hcly1(dataList)).build();
            XWPFTemplate template = XWPFTemplate.compile(request.getSession().getServletContext().getRealPath("/template/hxp_hcthjl.docx"), config).render(dataMap);
            String director = request.getSession().getServletContext().getRealPath("/doc");
            File file = new File(director);
            if (!file.exists()) {
                file.mkdir();
            }
            path = director + "/" + CurrentLoginUser.getUser().getZydm() + "hcthjl.docx";//耗材退还记录
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
     *
     * 批量删除
     */
    @RequestMapping(value = "/delThgl", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject delThgl(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String[] arry_ids = request.getParameter("ids").split(",");
            List<String> ids = new ArrayList<String>();
            for (int i = 0; i < arry_ids.length; i++) {
                ids.add(arry_ids[i]);
            }
            hcthglService.delThgl(ids);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }
}
