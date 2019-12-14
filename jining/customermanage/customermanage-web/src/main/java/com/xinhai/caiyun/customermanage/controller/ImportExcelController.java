package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.customermanage.service.ImportExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

@Controller
@RequestMapping(value = "/importExcel")
public class ImportExcelController {
    @Autowired
    private ImportExcelService importExcelService;

    /**
     * 导入Excel表
     */
    @RequestMapping(value = "/importCYypExcel/{wtid}", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject importCgsqExcel(HttpServletRequest request, @PathVariable("wtid") String wtid) throws Exception {
        JSONObject jo = new JSONObject();
        try {
            //获取上传的文件
            MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
            MultipartFile file = multipart.getFile("upfile");
            InputStream in = file.getInputStream();
            //数据导入
            importExcelService.importCyypExcel(in, file, wtid);
            in.close();
            jo.put("success", true);
        } catch (Exception e) {
            jo.put("success", false);
        }
        return jo;
    }
    @RequestMapping(value = "/downloadExcelModel", method = RequestMethod.GET)
    @OperateLog(describe = "下载导入模板")
    @ResponseBody
    public void downloadExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ;
        String importUrl = request.getParameter("importUrl");//导入模板的路径
        String exportName=request.getParameter("exportName");
        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName=" + new String(exportName.getBytes("GBK"), "ISO-8859-1"));
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
