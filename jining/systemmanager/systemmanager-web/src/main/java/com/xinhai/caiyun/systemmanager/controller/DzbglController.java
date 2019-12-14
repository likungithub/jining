package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.commonmanager.dao.CommonManagerMapper;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import service.DzbglService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;



@Controller
@RequestMapping(value = "dzbgl")
public class DzbglController {
    @Autowired
    private DzbglService dzbglService;
    @RequestMapping(value = "/dzbdatabase")
    @ResponseBody
    public DatatablesViewPage selectdatabase(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("name")String name){
        Map map = new HashMap();
        map.put("start",start);
        map.put("length",length);
        map.put("name",name);
        List<Map>list = dzbglService.selectDzbgl(map);
        Integer tom = 0;
        tom = dzbglService.selectDzbglCount(map);
        DatatablesViewPage dv = new DatatablesViewPage();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(tom);
        dv.setiTotalRecords(tom);
        return dv;
    }
//    查看下载记录
@RequestMapping(value = "/selectXzjl")
@ResponseBody
public DatatablesViewPage selectXzjl(@RequestParam("start") String start,
                                         @RequestParam("length") String length){
    Map map = new HashMap();
    map.put("start",start);
    map.put("length",length);
    List<Map>list = dzbglService.selectXZJL(map);
    Integer tom = 0;
    tom = dzbglService.selectXZJLCount(map);
    DatatablesViewPage dv = new DatatablesViewPage();
    dv.setAaData(list);
    dv.setiTotalDisplayRecords(tom);
    dv.setiTotalRecords(tom);
    return dv;
}
    @RequestMapping(value = "/adddzbgl1",method =RequestMethod.POST)
    @ResponseBody
    public JSONObject addCgsq(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String name = request.getParameter("name");
            String sex = request.getParameter("sex");
            String csrq = request.getParameter("csrq");
            String mz = request.getParameter("mz");
            String gzsj = request.getParameter("gzsj");
            String rdsj = request.getParameter("rdsj");
            String dnzw = request.getParameter("dnzw");
            String dnzw1 = request.getParameter("dnzw1");
            String jg = request.getParameter("jg");
            String whcd = request.getParameter("whcd");
            String bzxx = request.getParameter("bzxx");
            Map map = new HashMap();
            map.put("name", name);
            map.put("sex", sex);
            map.put("csrq", csrq);
            map.put("mz", mz);
            map.put("gzsj", gzsj);
            map.put("rdsj", rdsj);
            map.put("dnzw", dnzw);
            map.put("dnzw1", dnzw1);
            map.put("jg", jg);
            map.put("whcd", whcd);
            map.put("bzxx", bzxx);
            dzbglService.addDyxx(map);
            json.put("success", true);
        }catch (Exception e){
            json.put("success", false);
        }
        return json;
    }
    @RequestMapping(value = "/adddzbgl")
    @ResponseBody
    public JSONObject addDzbgl(HttpServletRequest request){
        JSONObject jsonObject =new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("name",((String[])map.get("name"))[0]);
        map2.put("sex",((String[])map.get("sex"))[0]);
        map2.put("csrq",((String[])map.get("csrq"))[0]);
        map2.put("mz",((String[])map.get("mz"))[0]);
        map2.put("gzsj",((String[])map.get("gzsj"))[0]);
        map2.put("rdsj",((String[])map.get("rdsj"))[0]);
        map2.put("dnzw",((String[])map.get("dnzw"))[0]);
        map2.put("dnzw1",((String[])map.get("dnzw1"))[0]);
        map2.put("jg",((String[])map.get("jg"))[0]);
        map2.put("whcd",((String[])map.get("whcd"))[0]);
        map2.put("bzxx",((String[])map.get("bzxx"))[0]);
//        新增党员信息
        dzbglService.addDyxx(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }
    @RequestMapping(value = "/deleteDzbgl")
    @ResponseBody
    public JSONObject deleteDzbgl(Integer[]dzbglche){
        JSONObject jsonObject = new JSONObject();
        Map map = new HashMap();
        for (Integer dzgl: dzbglche
             ) {
            map.put("id",dzgl);
//            删除党员信息
            dzbglService.deleteDyxx(map);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    @RequestMapping(value = "/updateDzbgl")
    @ResponseBody
    public JSONObject updateDzbgl(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("name",((String[])map.get("name"))[0]);
        map2.put("sex",((String[])map.get("sex"))[0]);
        map2.put("csrq",((String[])map.get("csrq"))[0]);
        map2.put("mz",((String[])map.get("mz"))[0]);
        map2.put("gzsj",((String[])map.get("gzsj"))[0]);
        map2.put("rdsj",((String[])map.get("rdsj"))[0]);
        map2.put("dnzw",((String[])map.get("dnzw"))[0]);
        map2.put("dnzw1",((String[])map.get("dnzw1"))[0]);
        map2.put("jg",((String[])map.get("jg"))[0]);
        map2.put("id",((String[])map.get("id"))[0]);
        map2.put("whcd",((String[])map.get("whcd"))[0]);
        map2.put("bzxx",((String[])map.get("bzxx"))[0]);
//        修改党员信息
        dzbglService.updateDyxx(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }
//    文件详细
    @RequestMapping(value = "/wjscxix")
    @ResponseBody
    public DatatablesViewPage selectwjscxix(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                            @RequestParam("lx") String lx,
                                            @RequestParam("name") String name
    ){
        Map map = new HashMap();
        map.put("start",start);
        map.put("length",length);
        map.put("lx",lx);
        map.put("name",name);
        List<Map>list = dzbglService.selectWjsc(map);
        Integer tom = 0;
        tom = dzbglService.selectWjscCount(map);
        DatatablesViewPage dv = new DatatablesViewPage();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(tom);
        dv.setiTotalRecords(tom);
        return dv;
    }
//    查询下载权限
    @RequestMapping(value = "/Ryxzqx")
    @ResponseBody
    public JSONObject Ryxzqx(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        String wjid = request.getParameter("wjid");
        Map map = new HashMap();
        String []wjids = wjid.split(",");
        map.put("wjid",wjids[0]);
        map.put("zydm",CurrentLoginUser.getUser().getZydm());
        int qux = dzbglService.selectwjry(map);
        if(qux>0){
            jsonObject.put("success",true);
        }else{
            jsonObject.put("success",false);
        }
        return jsonObject;
    }
    //保存执行人
    @RequestMapping(value = "/saveZxry")
    @ResponseBody
    public JSONObject saveZxry(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
//            Map map = request.getParameterMap();
//            String zydm = map.get("zydm") + "";
//            String id = map.get("id") + "";
            String zydm = request.getParameter("zydm");
            String id = request.getParameter("wjid");
            String lrry = CurrentLoginUser.getUser().getZydm();
            zydm = zydm +","+ lrry;
            String[] ids = id.split(",");
            String[] zydms = zydm.split(",");
            Map mm = new HashMap();
            for(int i = 0;i<ids.length;i++){
                for(int j =0;j<zydms.length;j++){
                    mm.put("wjid", ids[i]);
                    mm.put("zydm", zydms[j]);
//                    保存执行人
                    int in = dzbglService.selectwjry(mm);
                    System.out.print(in);
                    if(in==0){
                        dzbglService.insertRyqx(mm);
                    }
                }
            }
            jsonObject.put("success", true);
        }catch (Exception e){
            jsonObject.put("success", false);
            jsonObject.put("message","保存失败！");
        }
        return jsonObject;
    }
    /*指定人员权限问题*/
    @RequestMapping(value = "/wjzdrywt")
    @ResponseBody
    public JSONObject selectscry(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map map = new HashMap();
        map.put("dqry",CurrentLoginUser.getUser().getZydm());
        List<Map>list = dzbglService.selectscry(map);
        if(list.get(0).get("name").equals("超级管理员")){
            jsonObject.put("success",true);
        }else{
            jsonObject.put("success",false);
        }
        return jsonObject;
    }
    /*文件上传*/
    @RequestMapping(value = "/wjscfczz")
    @ResponseBody
    public JSONObject doFirst(HttpServletRequest request, HttpServletResponse response)throws Exception{
        JSONObject jsonObject = new JSONObject();
        String scry = CurrentLoginUser.getUser().getZydm();
        String fileurl = UUID.randomUUID()+".docx";
        //将当前上下文初始化给  CommonsMutipartResolver （多部分解析器）
        CommonsMultipartResolver commonsMultipartResolver = new CommonsMultipartResolver(
                request.getSession().getServletContext()
        );
        //检查form中是否有enctype="multipart/form-data"
        if(commonsMultipartResolver.isMultipart(request)){
            //将request变成多部分request
            MultipartHttpServletRequest multiRequest=(MultipartHttpServletRequest)request;
            //获取multiRequest 中所有的文件名
            String WJFCNAME = multiRequest.getParameter("WJFCNAME");
            String WJFCLX = multiRequest.getParameter("WJFCLX");
            Iterator iter=multiRequest.getFileNames();
            while (iter.hasNext()){
                //一次遍历所有文件
                MultipartFile file=multiRequest.getFile(iter.next().toString());
//                获取文件上传名称
                String filename1 = file.getOriginalFilename();
                String filename = filename1.substring(0,filename1.lastIndexOf("."));
                if(file!=null)
                {
                    String path = "F:\\csb\\"+fileurl;
                    System.out.print(path);
                    file.transferTo(new File(path));
                    dzbglService.addwjdz(WJFCLX,filename,path,scry);
                }
            }
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
//    文件下载
    @RequestMapping(value="/fcwjdownload")
    @ResponseBody
    public void download(HttpServletRequest request,
                         HttpServletResponse response) throws Exception {
        //模拟文件，myfile.txt为需要下载的文件
        String id = request.getParameter("id");
        //获取当前zydm，添加下载记录
        Map map = new HashMap();
        map.put("zydm", CurrentLoginUser.getUser().getZydm());
        map.put("wjid",id);
        dzbglService.insertFcwjxzjl(map);
        List<Map>list = dzbglService.selectFcwjlj(Integer.parseInt(id));
        String filename = (String)list.get(0).get("name");
        String path = (String)list.get(0).get("wjlj");
        //获取输入流
        InputStream bis = new BufferedInputStream(new FileInputStream(new File(path)));
        //转码，免得文件名中文乱码
        filename = URLEncoder.encode(filename,"UTF-8");
        //设置文件下载头
        response.addHeader("Content-Disposition", "attachment;filename=" + filename+".docx");
        //1.设置文件ContentType类型，这样设置，会自动判断下载文件类型
        response.setContentType("multipart/form-data");
        BufferedOutputStream out = new BufferedOutputStream(response.getOutputStream());
        int len = 0;
        while((len = bis.read()) != -1){
            out.write(len);
            out.flush();
        }
        out.close();
    }
//    文件在线预览
    @RequestMapping(value = "/wjzxyl")
    @ResponseBody
    public Map  findOneFcwj(String id){
        Map map=dzbglService.findFCwj(Integer.parseInt(id));
        return map;
    };
}
