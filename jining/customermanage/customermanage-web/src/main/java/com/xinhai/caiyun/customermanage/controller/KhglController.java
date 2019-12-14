package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.commonmanager.utils.GetDate;
import com.xinhai.caiyun.customermanage.api.Khxxgl;
import com.xinhai.caiyun.customermanage.api.Tqywt;
import com.xinhai.caiyun.customermanage.api.Typgl;
import com.xinhai.caiyun.customermanage.service.KhglService;
import com.xinhai.caiyun.systemmanager.api.Trwgl;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("khgl")
public class KhglController {

    @Autowired
    private KhglService khglService;

    /**
     * 插入数据
     * @param khxxgl
     */
    @RequestMapping(value = "/addkhxx")
    @ResponseBody
    public JSONObject addkhxx(@RequestBody String khxxgl) {
        Khxxgl tkhxxgl = JSON.parseObject(khxxgl, Khxxgl.class);
        khglService.createKhxxgl(tkhxxgl);
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }

    /**
     * 查询全部客户信息
     * @return
     */
    @RequestMapping(value = "/getWtkhAll")
    @OperateLog(describe = "客户信息列表")
    @ResponseBody
    public DatatablesViewPage<Khxxgl> getWtkhAll(@RequestParam("start") String start,
                                                @RequestParam("length") String length,
                                                @RequestParam("searchText") String searchText) throws Exception {
        List<Khxxgl> list = new ArrayList<Khxxgl>();

        if (searchText.equals("")) {
            searchText = null;
        }
        int num = 0;

        list = khglService.findKhglAll(Integer.parseInt(start), Integer.parseInt(length), searchText);
        num = khglService.findkhglAllNums(Integer.parseInt(start), Integer.parseInt(length), searchText);

        DatatablesViewPage<Khxxgl> datatablesViewPage = new DatatablesViewPage<Khxxgl>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 根据id删除客户信息
     * @param id
     */
    @RequestMapping(value = "/delkhxx/{id}")
    @ResponseBody
    public JSONObject delkhxx(@PathVariable("id") String id){
        khglService.deleteById(id);
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }

    /**
     * 根据id获取客户信息
     * @param id
     * @return
     */
    @RequestMapping(value = "/updateKhxx/{id}")
    @ResponseBody
    public JSONObject updateQywt(@RequestBody String khxx, @PathVariable("id") String id) {
        Khxxgl khxxgl = JSON.parseObject(khxx, Khxxgl.class);
        khxxgl.setId(Long.parseLong(id));
        khglService.updateKhxx(khxxgl);
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }

    /**
     * 根据客户名称模糊查询
     * @param name
     */
    @RequestMapping(value = "/cxkhxx/{name}")
    @ResponseBody
    public List<Khxxgl> cxkhxx(@PathVariable("name") String name){
        List<Khxxgl> khxxgls = khglService.cxKhxxgl(name);
        return khxxgls;
    }

    @RequestMapping(value = "/getKhxx/{id}")
    @ResponseBody
    public JSONObject getQywt(@PathVariable("id") String id) {
        Khxxgl khxxgl = khglService.findKhgl(id);
        JSONObject object = new JSONObject();
        object.put("success", true);
        object.put("data", khxxgl);
        return object;
    }

    /*导入Excel表中的数据*/
    @RequestMapping(value = "/downloadWtkhxxExcel")
    @OperateLog(describe = "loading.....")
    @ResponseBody
    public void downloadExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String importYqcgsq = "/ExcelModels/wtkhxxModel.xlsx";//导入摸板路径
        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName="+new String("wtkhxxModel.xlsx".getBytes("GBK"),"ISO-8859-1"));
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
    @RequestMapping(value = "/importwtkhxxExcel")
    @ResponseBody
    public JSONObject importWtkhxxExcel(HttpServletRequest request, Model model) throws Exception {
        //获取上传的文件
        MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
        MultipartFile file = multipart.getFile("upWtkhxxFile");
        InputStream in = file.getInputStream();
        String name=file.getOriginalFilename();
        khglService.importWtkhxxExcel(in,file,name);
        //数据导入
        in.close();
        JSONObject jo=new JSONObject();
        jo.put("success",true);
        return jo;
    }
}
