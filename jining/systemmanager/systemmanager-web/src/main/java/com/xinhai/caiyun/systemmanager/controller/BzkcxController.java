package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import service.BzkcxService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/bztxgl")
public class BzkcxController {
    @Autowired
    private BzkcxService bzkcxService;

    /**
     * 获取标准项目管理所有表数据
     *
     * @return 返会所有数据
     */
    @RequestMapping("/findAllBzkcx")
    @ResponseBody
    public DatatablesViewPage<Map> findAllBzxmgl(@RequestParam("start") String start,
                                                 @RequestParam("length") String length,
                                                 @RequestParam("jcxmc") String jcxmc
    ) {
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        map.put("jcxmc", jcxmc);
        List<Map> list = bzkcxService.findAllBzkcx(map);
        Integer num = bzkcxService.findAllBzkcxNum(map);
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setiTotalDisplayRecords(num);
        return datatablesViewPage;
    }

    @RequestMapping("/deleteBzkcxById")
    @ResponseBody
    public Map deleteBzkcxById(String id) {
        bzkcxService.deleteBzkcxById(Integer.parseInt(id));
        Map map = new HashMap();
        map.put("success", "删除成功");
        return map;
    }

    @RequestMapping("/addBzkcx")
    @ResponseBody
    public Map addBzkcx(String zwmc_bm, String ywmc, String pdnh, String if_pd, String yyckjz, String bl, String jcff,
                        String jcyj, String wswmz, String xlz, String xlzmrz, String bzffjcxdw,
                        String jcyjmc, String pdyj, String pdyjmc, String wswnz, String wswcz,
                        String bzzxyxx, String bzzxyxxdw, String bzzdyxx, String bzzdyxxdw, String if_xtpd,
                        String if_bzff, String if_cma, String if_cmaf, String if_cnas,
                        String if_catl, String zbzl, String zbzldw, String bz
    ) {
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        Map map = new HashMap();
        Map find = new HashMap();
        map.put("zwmc_bm", zwmc_bm);
        map.put("ywmc", ywmc);
        map.put("pdnh", pdnh);
        if ("".equals(if_pd) || if_pd == null) {
            if_pd = "0";
        }
        if (if_pd.equals("true") || if_pd.equals("是")) {
            if_pd = "1";
        }
        if (if_pd.equals("false") || if_pd.equals("否")) {
            if_pd = "0";
        }
        map.put("if_pd", if_pd);
        map.put("yyckjz", yyckjz);
        map.put("bl", bl);
        map.put("jcff", jcff);
        map.put("jcyj", jcyj);
        map.put("wswmz", wswmz);
        map.put("xlz", xlz);
        map.put("xlzmrz", xlzmrz);
        map.put("bzffjcxdw", bzffjcxdw);
        map.put("jcyjmc", jcyjmc);
        map.put("pdyj", pdyj);
        map.put("pdyjmc", pdyjmc);
        map.put("wswnz", wswnz);
        map.put("wswcz", wswcz);
        map.put("bzzxyxx", bzzxyxx);
        map.put("bzzxyxxdw", bzzxyxxdw);
        map.put("bzzdyxx", bzzdyxx);
        map.put("bzzdyxxdw", bzzdyxxdw);
        if ("".equals(if_xtpd) || if_xtpd == null) {
            if_xtpd = "0";
        }
        if (if_xtpd.equals("true") || if_xtpd.equals("是")) {
            if_xtpd = "1";
        }
        if (if_xtpd.equals("false") || if_xtpd.equals("否")) {
            if_xtpd = "0";
        }
        map.put("if_xtpd", if_xtpd);
        if ("".equals(if_bzff) || if_bzff == null) {
            if_bzff = "0";
        }
        if (if_bzff.equals("true") || if_bzff.equals("是")) {
            if_bzff = "1";
        }
        if (if_bzff.equals("false") || if_bzff.equals("否")) {
            if_bzff = "0";
        }
        map.put("if_bzff", if_bzff);
        if ("".equals(if_cma) || if_cma == null) {
            if_cma = "0";
        }
        if (if_cma.equals("true") || if_cma.equals("是")) {
            if_cma = "1";
        }
        if (if_cma.equals("false") || if_cma.equals("否")) {
            if_cma = "0";
        }
        map.put("if_cma", if_cma);
        if ("".equals(if_cmaf) || if_cmaf == null) {
            if_cmaf = "0";
        }
        if (if_cmaf.equals("true") || if_cmaf.equals("是")) {
            if_cmaf = "1";
        }
        if (if_cmaf.equals("false") || if_cmaf.equals("否")) {
            if_cmaf = "0";
        }
        map.put("if_cmaf", if_cmaf);
        if ("".equals(if_cnas) || if_cnas == null) {
            if_cnas = "0";
        }
        if (if_cnas.equals("true") || if_cnas.equals("是")) {
            if_cnas = "1";
        }
        if (if_cnas.equals("false") || if_cnas.equals("否")) {
            if_cnas = "0";
        }
        map.put("if_cnas", if_cnas);
        if ("".equals(if_catl) || if_catl == null) {
            if_catl = "0";
        }
        if (if_catl.equals("true") || if_catl.equals("是")) {
            if_catl = "1";
        }
        if (if_catl.equals("false") || if_catl.equals("否")) {
            if_catl = "0";
        }
        map.put("if_catl", if_catl);
        map.put("zbzl", zbzl);
        map.put("zbzldw", zbzldw);
        map.put(" bz", bz);
        bzkcxService.addBzkcx(map);
        Map mao = new HashMap();
        mao.put("info", "增加成功");
        return mao;
    }

    @RequestMapping("/findBzkcxById")
    @ResponseBody
    public Map findBzkcxById(String id) {
        return bzkcxService.findBzkcxById(Integer.parseInt(id));
    }

    @RequestMapping("/updateBzkcx")
    @ResponseBody
    public Map updateBzkcx(String zwmc_bm, String ywmc, String pdnh, String if_pd, String yyckjz, String bl, String jcff,
                           String jcyj, String wswmz, String xlz, String xlzmrz, String bzffjcxdw,
                           String jcyjmc, String pdyj, String pdyjmc, String wswnz, String wswcz,
                           String bzzxyxx, String bzzxyxxdw, String bzzdyxx, String bzzdyxxdw, String if_xtpd,
                           String if_bzff, String if_cma, String if_cmaf, String if_cnas,
                           String if_catl, String zbzl, String zbzldw, String bz, String id
    ) {
        Map map = new HashMap();
        map.put("zwmc_bm", zwmc_bm);
        map.put("ywmc", ywmc);
        map.put("pdnh", pdnh);
        if ("".equals(if_pd) || if_pd == null) {
            if_pd = "0";
        }
        if (if_pd.equals("true") || if_pd.equals("是")) {
            if_pd = "1";
        }
        if (if_pd.equals("false") || if_pd.equals("否")) {
            if_pd = "0";
        }
        map.put("if_pd", if_pd);
        map.put("yyckjz", yyckjz);
        map.put("bl", bl);
        map.put("jcff", jcff);
        map.put("jcyj", jcyj);
        map.put("wswmz", wswmz);
        map.put("xlz", xlz);
        map.put("xlzmrz", xlzmrz);
        map.put("bzffjcxdw", bzffjcxdw);
        map.put("jcyjmc", jcyjmc);
        map.put("pdyj", pdyj);
        map.put("pdyjmc", pdyjmc);
        map.put("wswnz", wswnz);
        map.put("wswcz", wswcz);
        map.put("bzzxyxx", bzzxyxx);
        map.put("bzzxyxxdw", bzzxyxxdw);
        map.put("bzzdyxx", bzzdyxx);
        map.put("bzzdyxxdw", bzzdyxxdw);
        if ("".equals(if_xtpd) || if_xtpd == null) {
            if_xtpd = "0";
        }
        if (if_xtpd.equals("true") || if_xtpd.equals("是")) {
            if_xtpd = "1";
        }
        if (if_xtpd.equals("false") || if_xtpd.equals("否")) {
            if_xtpd = "0";
        }
        map.put("if_xtpd", if_xtpd);
        if ("".equals(if_bzff) || if_bzff == null) {
            if_bzff = "0";
        }
        if (if_bzff.equals("true") || if_bzff.equals("是")) {
            if_bzff = "1";
        }
        if (if_bzff.equals("false") || if_bzff.equals("否")) {
            if_bzff = "0";
        }
        map.put("if_bzff", if_bzff);
        if ("".equals(if_cma) || if_cma == null) {
            if_cma = "0";
        }
        if (if_cma.equals("true") || if_cma.equals("是")) {
            if_cma = "1";
        }
        if (if_cma.equals("false") || if_cma.equals("否")) {
            if_cma = "0";
        }
        map.put("if_cma", if_cma);
        if ("".equals(if_cmaf) || if_cmaf == null) {
            if_cmaf = "0";
        }
        if (if_cmaf.equals("true") || if_cmaf.equals("是")) {
            if_cmaf = "1";
        }
        if (if_cmaf.equals("false") || if_cmaf.equals("否")) {
            if_cmaf = "0";
        }
        map.put("if_cmaf", if_cmaf);
        if ("".equals(if_cnas) || if_cnas == null) {
            if_cnas = "0";
        }
        if (if_cnas.equals("true") || if_cnas.equals("是")) {
            if_cnas = "1";
        }
        if (if_cnas.equals("false") || if_cnas.equals("否")) {
            if_cnas = "0";
        }
        map.put("if_cnas", if_cnas);
        if ("".equals(if_catl) || if_catl == null) {
            if_catl = "0";
        }
        if (if_catl.equals("true") || if_catl.equals("是")) {
            if_catl = "1";
        }
        if (if_catl.equals("false") || if_catl.equals("否")) {
            if_catl = "0";
        }
        map.put("if_catl", if_catl);
        map.put("zbzl", zbzl);
        map.put("zbzldw", zbzldw);
        map.put("bz",bz);
        map.put("id",Integer.parseInt(id));
        bzkcxService.updateBzkcx(map);
        Map mao = new HashMap();
        mao.put("info", "更新成功");
        return mao;
    }

    @RequestMapping("/importBzkcxExcel")
    @ResponseBody
    public JSONObject importBzkcxExcel(HttpServletRequest request, Model model) throws Exception {
        //获取上传的文件
        MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
        MultipartFile file = multipart.getFile("upfile");
        InputStream in = file.getInputStream();
        bzkcxService.importExcelInfo(in,file);
        //数据导入
        in.close();
        JSONObject jo=new JSONObject();
        jo.put("info","导入成功");
        return jo;
    }
    @RequestMapping(value = "/downBzkcxExcel", method = RequestMethod.GET)
    @OperateLog(describe = "下载导入模板")
    @ResponseBody
    public void download(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String importUrl ="/ExcelModel/bzkcxExcel.xlsx";//导入模板的路径
        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName="+new String("标准库模板.xlsx".getBytes("GBK"),"ISO-8859-1"));
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
    @RequestMapping("/exportBzkcxExcel")
    @ResponseBody
    public  void export(HttpServletRequest request, HttpServletResponse response) throws Exception {
       String tempids=request.getParameter("ids");
       String[] ids=tempids.split(",");
       if(ids.length>0){
            response.reset(); //清除buffer缓存
            Map<String,Object> map=new HashMap<String,Object>();
            // 指定下载的文件名，浏览器都会使用本地编码，即GBK，浏览器收到这个文件名后，用ISO-8859-1来解码，然后用GBK来显示
            // 所以我们用GBK解码，ISO-8859-1来编码，在浏览器那边会反过来执行。
            response.setHeader("Content-Disposition", "attachment;filename=" + new String("标准库表.xlsx".getBytes("GBK"),"ISO-8859-1"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);
            XSSFWorkbook workbook=null;
            workbook =bzkcxService.exportExcelInfo(ids);
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

}
