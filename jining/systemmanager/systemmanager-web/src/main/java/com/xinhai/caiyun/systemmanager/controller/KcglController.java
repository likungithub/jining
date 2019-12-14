package com.xinhai.caiyun.systemmanager.controller;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.SystemMessages;
import com.xinhai.caiyun.customermanage.api.SystemMessagesService;
import com.xinhai.security.api.CurrentLoginUser;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import service.KcglService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping(value = "/kcgl")
public class KcglController {
    @Autowired
    private KcglService kcglService;
    @Autowired
    private SystemMessagesService systemMessagesService;

    /**
     * 得到库存管理的显示信息
     */
    @RequestMapping(value = "/kcglSeach", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage yycx_queryList(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("hcmc") String hcmc,
                                             @RequestParam("hclx") String hclx,
                                             @RequestParam("startDate") String startDate,
                                             @RequestParam("endDate") String endDate
    ) {
        Map map = new HashMap();
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
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
        List<Map> list = kcglService.selectKcgl(map);
        int totalCount = 0;
        totalCount = kcglService.selectKcglNum(map);
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
     * 删除库存信息
     */
    @RequestMapping(value = "/delKcgl", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject delKcgl(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String id = request.getParameter("id");
            kcglService.delKcgl(id);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    /**
     * 通过id返回单条数据
     */
    @RequestMapping(value = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> findById(HttpServletRequest request) {
        String id = request.getParameter("id");
        return kcglService.findById(id);
    }

    /**
     * 更新数据
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/updateKcgl", method = RequestMethod.POST)
    @ResponseBody
    public com.alibaba.fastjson.JSONObject updateYqsb(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String sqr = CurrentLoginUser.getUser().getZydm();
            String hcmc = request.getParameter("hcmc");
            String gg = request.getParameter("gg");
            String jb = request.getParameter("jb");
            String sl = request.getParameter("sl");
            String sccj = request.getParameter("sccj");
            String cfwz = request.getParameter("cfwz");
            String dj = request.getParameter("dj");
            String zj = request.getParameter("zj");
            String bz = request.getParameter("bz");
            String hclx = request.getParameter("hclx");
            String id = request.getParameter("id");
            Map map = new HashMap();
            map.put("sqr", sqr);
            map.put("hcmc", hcmc);
            map.put("gg", gg);
            map.put("jb", jb);
            map.put("sl", sl);
            map.put("sccj", sccj);
            map.put("cfwz", cfwz);
            map.put("dj", dj);
            map.put("zj", zj);
            map.put("bz", bz);
            map.put("hclx", hclx);
            map.put("id", id);
            kcglService.updateKcgl(map);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    /**
     * 设置库存常用量
     */
    @RequestMapping(value = "/setCyKcsl", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject setCyKcsl(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            List idList = new ArrayList();
            Map map = new HashMap();
            String cykcsl = request.getParameter("cykcsl");
            String[] ids = request.getParameter("ids").split(",");
            for (int i = 0; i < ids.length; i++) {
                idList.add(ids[i]);
            }
            map.put("cykcsl", cykcsl);
            map.put("ids", idList);
            kcglService.setCyKcsl(map);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    /**
     * 检查库存剩余量  并且发出提醒
     */
    @RequestMapping(value = "/checkKcsl", method = RequestMethod.POST)
    @ResponseBody
    public void checkKcsl() {
        try {
            SystemMessages systemMessages = new SystemMessages();
            List<Map> list = kcglService.queryAllKcglByCheck();
            List<String> zydmList = kcglService.queryZydm("检测室");
            Integer kcsl = 0;
            Integer cykcsl = 0;
            for (Map map : list) {
                try {//库存数量
                    kcsl = Integer.parseInt(map.get("sl").toString());
                } catch (Exception e) {
                    kcsl = 0;
                }
                try {//常用库存数量
                    cykcsl = Integer.parseInt(map.get("cykcsl").toString());
                } catch (Exception e) {
                    cykcsl = 0;
                }
                if (cykcsl > kcsl) {//如果常用库存数量大于库存数量  就有问题
                    for (String zydm : zydmList) {
                        try {
                            //消息提醒
                            String txbt = "";
                            String txnr = "";
                            String txlx = "";
                            txbt = map.get("hcmc") + "库存不足";
                            txlx = "201";
                            txnr = "注意!" + map.get("hcmc") + "库存不足，请及时购买!";
                            systemMessages.setXxid(UUID.randomUUID().toString());
                            systemMessages.setTxlx_dm(txlx);
                            systemMessages.setDljg_bm(CurrentLoginUser.getUser().getDljgBm());
                            systemMessages.setTxbt(txbt);
                            systemMessages.setTxnr(txnr);
                            systemMessages.setFsry_dm(CurrentLoginUser.getUser().getZydm());
                            systemMessages.setFsry_mc(CurrentLoginUser.getUser().getName());
                            systemMessages.setJsry_dm(zydm);
                            systemMessages.setFssj(new Date());
                            systemMessagesService.addSystemMessages(systemMessages);
                        } catch (Exception e) {
                            System.out.println("发送消息提醒错误！");
                            e.printStackTrace();
                        }
                    }

                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * 导入Excel表
     */
    @RequestMapping(value = "/importKcglExcel", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject importKcglExcel(HttpServletRequest request) throws Exception {
        JSONObject jo = new JSONObject();
        try {
            //获取上传的文件
            MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
            MultipartFile file = multipart.getFile("upfile");
            InputStream in = file.getInputStream();
            String name = file.getOriginalFilename();
            //数据导入
            kcglService.importKcglExcel(in, file);
            in.close();
            jo.put("success", true);
        } catch (Exception e) {
            jo.put("success", false);
        }
        return jo;
    }

    @RequestMapping(value = "/downloadKcglExcel", method = RequestMethod.GET)
    @OperateLog(describe = "下载导入模板")
    @ResponseBody
    public void downloadKcglExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String importUrl = "/ExcelModel/kcglExcel.xlsx";//导入模板的路径
        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName=" + new String("库存管理模板.xlsx".getBytes("GBK"), "ISO-8859-1"));
        //用于记录以完成的下载的数据量，单位是byte
        long downloadedLength = 0L;
        try {
            //打开本地文件流
            InputStream inputStream = this.getClass().getResourceAsStream(importUrl);
            //激活下载操作
            OutputStream os = response.getOutputStream();
            //循环写入输出流
            byte[] b = new byte[2048];
            int length;
            while ((length = inputStream.read(b)) > 0) {
                os.write(b, 0, length);
                downloadedLength += b.length;
            }
            // 这里主要关闭。
            os.close();
            inputStream.close();
        } catch (Exception e) {
            throw e;
        }
    }

    /**
     * 打印固体试剂验收记录
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
        String lx=request.getParameter("lx");
        String path = "";
        if("yzd".equals(lx)){//易制毒
            path=request.getSession().getServletContext().getRealPath("/template/lydjb_yzd.docx");
        };
        if("yzb".equals(lx)){//易制爆
            path=request.getSession().getServletContext().getRealPath("/template/lxdjb_yzb.docx");
        }
        String realpath = path.replace("/", "\\\\");
        //打开word
        poCtrl.webOpen(realpath, OpenModeType.docNormalEdit, "张三");
        return "pageoffice/Word";
    }
}
