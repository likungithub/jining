package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.Tqywt;
import com.xinhai.caiyun.customermanage.service.CydxxglService;
import com.xinhai.caiyun.customermanage.service.ScxtdjService;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("scxtgl")
public class ScxtdjController {
    @Autowired
    private ScxtdjService scxtdjService;


    /*查询导入日志*/
    @RequestMapping(value = "/selectdrrz")
    @ResponseBody
    public DatatablesViewPage selectscxtdj (@RequestParam("start") String start,
                                        @RequestParam("length") String length,
                                        @RequestParam("wtbm") String wtid
    ){
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("wtid",wtid);
        List<Map> list = scxtdjService.selectRzAll(map);
        int totalCount=0;
        totalCount= scxtdjService.selectRzCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();

        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);

        return dv;
    }

    /*导入Excel表中的数据*/
    @RequestMapping(value = "/downloadScxtdjExcel")
    @OperateLog(describe = "loading.....")
    @ResponseBody
    public void downloadExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String importYqcgsq = "/ExcelModels/scxtdjmodal.xlsx";//导入摸板路径
        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName="+new String("scxtdjmodal.xlsx".getBytes("GBK"),"ISO-8859-1"));
        //记录已完成下载的数据
        long downloadlength = 0L;
        try{
            /*①PrintWriter out=response.getWriter();
            out对象用于输出字符流数据
            ②ServletOutputStream  os=response.getOutputStream();
            os用于输出字符流数据或者二进制的字节流数据都可以*/
            //打开本地文件流
            InputStream in = this.getClass().getResourceAsStream(importYqcgsq);
            OutputStream os = response.getOutputStream();
            //字节流循环写入
            byte[]b = new byte[2048];
            int length;
            while ((length = in.read(b))>0){
                os.write(b,0,length);
                downloadlength +=b.length;
            }
            //关闭流
            os.close();
            in.close();
        }catch (Exception e){
            throw e;
        }
    }
    @RequestMapping(value = "/importScxtdjExcel")
    @ResponseBody
    public JSONObject importCgsqExcel(HttpServletRequest request, Model model) throws Exception {
        //获取上传的文件
        String wtid = request.getParameter("wtid");
        MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
        MultipartFile file = multipart.getFile("upcydxxglFile");
        InputStream in = file.getInputStream();
        String name=file.getOriginalFilename();
        //存储导入日志
        Map map=new HashMap();
        Map map1 = new HashMap();

        //查询日志表主键插入t_scgl_jbxx
        map1.put("wtid",wtid);
        String logId = scxtdjService.selectLogid(map1);
        scxtdjService.importscxtdjExcel(in,file,name,wtid,logId);
        map.put("filename",name);
        map.put("wtid",wtid);
        map.put("lrry", CurrentLoginUser.getUser().getName());
        scxtdjService.insertScdjLog(map);
        //数据导入
        in.close();
        JSONObject jo=new JSONObject();
        jo.put("success",true);
        return jo;
    }

    /*查询导入数据*/
    @RequestMapping(value = "/selectExcelSc")
    @ResponseBody
    public DatatablesViewPage selectExcel (@RequestParam("start") String st,
                                           @RequestParam("length") String le,
                                           @RequestParam("logid") String logid
    ){
        Map map=new HashMap();
        map.put("start", Integer.parseInt(st));
        map.put("length",Integer.parseInt(le));
        map.put("logid",logid);
        List<Map> list = scxtdjService.selectExcel(map);
        int totalCount=0;
        totalCount= scxtdjService.selectExcelCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();

        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);

        return dv;
    }
}
