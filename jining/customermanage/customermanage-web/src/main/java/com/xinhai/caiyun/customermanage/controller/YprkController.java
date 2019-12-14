package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.Yprkxx;
import com.xinhai.caiyun.customermanage.dao.YprkMapper;
import com.xinhai.caiyun.customermanage.service.YprkService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import com.xinhai.usermanager.service.UserService;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "yprk")
public class YprkController {
    @Autowired
    private YprkService yprkService;
    @Autowired
    private YprkMapper yprkMapper;
    @Autowired
    private UserService userService;

    /*查询入库样品*/
    @RequestMapping(value = "/selectYprk")
    @ResponseBody
    public DatatablesViewPage vydaochu (@RequestParam("start") String start,
                                        @RequestParam("length") String length,
                                        @RequestParam("ypbm") String ypbm,
                                        @RequestParam("ypmc") String ypmc
    ){
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("ypbm",ypbm);
        map.put("ypmc",ypmc);
        List<Map> list = yprkService.selectYprkAll(map);
        int totalCount=0;
        totalCount= yprkService.selectYprkCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();

        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);

        return dv;
    }
    /*导出数据*/
    @RequestMapping(value = "/yprkDc")
    @ResponseBody
    public JSONObject daoChu(HttpServletRequest request, HttpServletResponse response)throws Exception{
        JSONObject jsonObject = new JSONObject();
        String ypbms = request.getParameter("ypbm");
        String[]ypbms1 = ypbms.split(",");
        if (ypbms1.length>0){
            //清除缓存
            response.reset();
            //创建Map
            Map<String,Object>map = new HashMap<>();
            //指定下载的文件名，浏览器gbk编码，需先用iso-8859-1解码，在用gbk编码
            response.setHeader("Content-Disposition","attachment;filename="+new String("入库样品详情.xlsx".getBytes("GBK"),"ISO-8859-1"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            //清除缓存
            response.setHeader("Pragma","no-cache");
            response.setHeader("Cache-Control","no-cache");
            response.setDateHeader("Expires",0);
            //引用XSSWorkbook
            XSSFWorkbook xssfWorkbook = null;
            xssfWorkbook = yprkService.exportYprkExcel(ypbms1);
            OutputStream outputStream;
            outputStream = response.getOutputStream();
            BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(outputStream);
            bufferedOutputStream.flush();
            xssfWorkbook.write(bufferedOutputStream);
            bufferedOutputStream.close();
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    /*导入Excel表中的数据*/
    @RequestMapping(value = "/downloadYprkExcel")
    @OperateLog(describe = "loading.....")
    @ResponseBody
    public void downloadExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String importYqcgsq = "/ExcelModels/yprkmodel.xlsx";//导入摸板路径
        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName="+new String("yprkmodel.xlsx".getBytes("GBK"),"ISO-8859-1"));
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
    @RequestMapping(value = "/importYprkExcel")
    @ResponseBody
    public JSONObject importCgsqExcel(HttpServletRequest request, Model model) throws Exception {
        //获取上传的文件
        MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
        MultipartFile file = multipart.getFile("upYprkFile");
        InputStream in = file.getInputStream();
        String name=file.getOriginalFilename();
        yprkService.importYprkExcel(in,file,name);
        //数据导入
        in.close();
        JSONObject jo=new JSONObject();
        jo.put("success",true);
        return jo;
    }
    //删除操作
    @RequestMapping(value = "/deleteYqrk")
    @ResponseBody
    public JSONObject delYqrk(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map map = new HashMap();
        String ypMark = "";
        String ypbm = request.getParameter("ypbm");
        String[]ypbms = ypbm.split(",");
        for(String ch:ypbms){
            map.put("ypid",ch);
            ypMark = yprkMapper.selectYpCount(map);
            if(ypMark==null||ypMark.equals("")){
            }else {
                yprkMapper.deleteYp(ypMark);
            }
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    /*修改入库信息*/
    @RequestMapping(value = "/updateYprk")
    @ResponseBody
    public JSONObject updateYprk(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("crkly",((String[])map.get("crkly"))[0]);
        map2.put("info",((String[])map.get("info"))[0]);
        map2.put("syry",((String[])map.get("syry"))[0]);
        map2.put("zysl",((String[])map.get("zysl"))[0]);
        map2.put("fysl",((String[])map.get("fysl"))[0]);
        map2.put("bysl",((String[])map.get("bysl"))[0]);
        map2.put("ypid",((String[])map.get("ypid"))[0]);
        yprkMapper.updateYprk(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }

    //新增样品入库
    @RequestMapping(value = "/saveYprk")
    @ResponseBody
    public JSONObject saveYprkxx(@RequestBody String khxx) {
        Yprkxx yprkxx = JSON.parseObject(khxx, Yprkxx.class);
        yprkxx.setCrkzt("1");
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        yprkxx.setCrksj(df.format(new Date()));
        yprkxx.setLrrq(df.format(new Date()));
        User user = userService.getUser(CurrentLoginUser.getUser().getId());//获取当前登录用户信息
        yprkxx.setLrry(user.getName());

        String ypid = yprkxx.getYpid();
        Map map = new HashMap();
        map.put("ypid",ypid);
        String ypMark = yprkMapper.selectYpCount(map);
        if(ypMark==null||ypMark.equals("")){
            yprkMapper.addYprk(yprkxx);
        }else {
            yprkMapper.deleteYp(ypMark);
            yprkMapper.addYprk(yprkxx);
        }
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }

}
