package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import service.CgsqService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping(value = "/cgsq")
public class CgsqController {
    @Autowired
    private CgsqService cgsqService;

    /**
     *
     * 获得采购申请的数据
     *
     * @return
     */
    @RequestMapping(value = "/findByNaTy",method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage<Map> findByName(
            @RequestParam("start") String start,
            @RequestParam("length") String length,
            @RequestParam("hcmc") String hcmc,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate,
            @RequestParam("hclx") String hclx,
            @RequestParam("sqzt") String sqzt

    ) {
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        Map map = new HashMap();
        SimpleDateFormat smf = new SimpleDateFormat("yyyy-MM-dd");
        map.put("sqr", CurrentLoginUser.getUser().getZydm());
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        if(notNULL(hcmc)){
            map.put("hcmc", hcmc);
        }
        if(notNULL(hclx)){
            map.put("hclx", hclx);
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
        if(notNULL(sqzt)){
            map.put("sqzt",sqzt);
        }
        List<Map> list = cgsqService.findByNaTy(map);
        Integer num = cgsqService.findByNaTyNum(map);
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        return datatablesViewPage;
    }
    /**
     *
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
     *
     * 新增操作
     */
    @RequestMapping(value = "/addCgsq",method =RequestMethod.POST)
    @ResponseBody
    public JSONObject addCgsq(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
            String sqr = CurrentLoginUser.getUser().getZydm();
            String hcmc = request.getParameter("hcmc");
            String gg = request.getParameter("gg");
            String jb = request.getParameter("jb");
            String sl = request.getParameter("sl");
            String sccj = request.getParameter("sccj");
            String cgmd = request.getParameter("cgmd");
            String dj = request.getParameter("dj");
            String zj = request.getParameter("zj");
            String bz = request.getParameter("bz");
            String hclx = request.getParameter("hclx");
            Map map = new HashMap();
            map.put("sqr", sqr);
            map.put("hcmc", hcmc);
            map.put("gg", gg);
            map.put("jb", jb);
            map.put("sl", sl);
            map.put("sccj", sccj);
            map.put("cgmd", cgmd);
            map.put("dj", dj);
            map.put("zj", zj);
            map.put("bz", bz);
            map.put("hclx", hclx);
            map.put("hcbm",sdf.format(new Date()));//耗材的编码格式  随便写个  哈哈
            cgsqService.addCgsq(map);
            json.put("success", true);
        }catch (Exception e){
            json.put("success", false);
        }
        return json;
    }

    /**
     *通过id返回单条数据
     */
    @RequestMapping(value = "/findById",method =RequestMethod.POST)
    @ResponseBody
    public List<Map> findById(HttpServletRequest request) {
        String id=request.getParameter("id");
        return cgsqService.findById(id);
    }

    /**
     * 批量删除
     */
    @RequestMapping(value = "/deleteCgsq",method =RequestMethod.POST)
    @ResponseBody
    public JSONObject deleteCgsq(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String[] arryids = request.getParameter("ids").split(",");
            List<String> ids=new ArrayList<String>();
            for(int i=0;i<arryids.length;i++){
                ids.add(arryids[i]);
            }
            cgsqService.deleteCgsq(ids);
            json.put("success", true);
        }catch (Exception e){
            json.put("success", false);
        }
        return json;
    }

    /**
     * 更新数据
     * @param request
     * @return
     */
    @RequestMapping(value = "/updateCgsq",method =RequestMethod.POST)
    @ResponseBody
    public JSONObject updateYqsb(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String sqr = CurrentLoginUser.getUser().getZydm();
            String hcmc = request.getParameter("hcmc");
            String gg = request.getParameter("gg");
            String jb = request.getParameter("jb");
            String sl = request.getParameter("sl");
            String sccj = request.getParameter("sccj");
            String cgmd = request.getParameter("cgmd");
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
            map.put("cgmd", cgmd);
            map.put("dj", dj);
            map.put("zj", zj);
            map.put("bz", bz);
            map.put("hclx", hclx);
            map.put("id",id);
            cgsqService.updateCgsq(map);
            json.put("success", true);
        }catch (Exception e){
            json.put("success", false);
        }

        return json;
    }

    //提交数据
    @RequestMapping(value = "/submitCgsq",method =RequestMethod.POST)
    @ResponseBody
    public JSONObject submitCgsq(Integer[] che) {
        JSONObject json = new JSONObject();
        try {
            for (Integer ch : che) {
                cgsqService.updatezt(ch);
            }
            json.put("success", true);
        }catch (Exception e){
            json.put("success", false);
        }
        return json;
    }

    /**
     * 导入Excel表
     *
     */
    @RequestMapping(value = "/importCgsqExcel", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject importCgsqExcel(HttpServletRequest request, Model model) throws Exception {
        JSONObject jo = new JSONObject();
        try {
            //获取上传的文件
            MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
            MultipartFile file = multipart.getFile("upfile");
            InputStream in = file.getInputStream();
            String name = file.getOriginalFilename();
            cgsqService.importCgsqExcel(in, file);
            //数据导入
            in.close();
            jo.put("info", "导入成功");
        }catch (Exception e){
            jo.put("info", "导入失败啊");
        }
        return jo;
    }

    @RequestMapping(value = "/downloadCgsqExcel", method = RequestMethod.GET)
    @OperateLog(describe = "下载导入模板")
    @ResponseBody
    public void downloadCgsqExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ;
        String importUrl = "/ExcelModel/cgsqExcel.xls";//导入模板的路径
        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName=" + new String("采购申请模板.xls".getBytes("GBK"), "ISO-8859-1"));
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
}
