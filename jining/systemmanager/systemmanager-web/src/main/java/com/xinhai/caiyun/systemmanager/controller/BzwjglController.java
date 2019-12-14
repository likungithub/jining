package com.xinhai.caiyun.systemmanager.controller;
import com.baidu.disconf.core.common.utils.FileUtils;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.security.api.CurrentLoginUser;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import service.BzwjglService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/bztxgl")
public class BzwjglController {
    @Autowired
    private BzwjglService bzwjglService;

    /**
     * 查找所有标准项目管理信息
     * @param start
     * @param length
     * @param wjml
     * @return
     */
    @RequestMapping("/findAllBzwjgl")
    @ResponseBody
    public DatatablesViewPage<Map> findAllBzwjgl(@RequestParam("start")String start,
                                                 @RequestParam("length")String length,
                                                 @RequestParam("wjml")String wjml
                                                 ){
            Map map=new HashMap();
            map.put("start",Integer.parseInt(start));
            map.put("length",Integer.parseInt(length));
            map.put("wjml",wjml);
            List<Map> list=bzwjglService.findAllBzwjgl(map);
            Integer num=bzwjglService.findAllBzwjglNum(map);
            DatatablesViewPage<Map> datatablesViewPage=new DatatablesViewPage<Map>();
            datatablesViewPage.setAaData(list);
            datatablesViewPage.setiTotalRecords(num);
            datatablesViewPage.setiTotalDisplayRecords(num);
            return datatablesViewPage;
    };

    /**
     * 增加文件   文件上传
     * @param file1
     * @return
     */
    @RequestMapping(value="/uploadFile")
    public @ResponseBody Map uploadFile1(
            MultipartFile file1,HttpServletRequest request) {
        Map map = new HashMap();
        if (!file1.isEmpty()) {
            String originalFilename = file1.getOriginalFilename();//获得文件的名字带后缀
            String fileBaseName=FilenameUtils.getBaseName(originalFilename);//获得文件的名字 不带后缀
            String name = CurrentLoginUser.getUser().getId();//获得当前用户的id
            try {
                String  fdir= request.getSession().getServletContext().getRealPath("/"+name);//获取目标文件路径
                FileUtils.copyInputStreamToFile(file1.getInputStream(), new File(fdir, originalFilename));
                String path=fdir+"/"+originalFilename;
                map.put("path", path);
                map.put("fileName",fileBaseName);
            } catch (Exception e) {
                map.put("info",e.getMessage());
            }
        }
        return map;
    }
    /***
     * 增加上传文件以外的基本信息
     * @param wjmc
     * @param wjml
     * @param wjbb
     * @param wjbh
     * @param path
     * @return
     */
    @RequestMapping(value="/addBzwjglData")
    @ResponseBody
    public  Map addBzwjglData(String wjmc,String wjml,String wjbb,String wjbh,String path,String wdsm) {
        Map map = new HashMap();
        String name = CurrentLoginUser.getUser().getName();
        map.put("wjmc",wjmc);
        map.put("wjml",wjml);
        map.put("wjbb",wjbb);
        map.put("wjbh",wjbh);
        map.put("path",path);
        map.put("scr",name);
        map.put("wdsm",wdsm);
        bzwjglService.addlBzwjgl(map);
        Map ma = new HashMap();
        ma.put("info","增加成功");
        return ma;
    }

    /**
     * 删除标准项目
     * @param id
     * @return
     */
    @RequestMapping("/delBzwjgl")
    @ResponseBody
    public String delBzwjgl(String id){
        Map map=bzwjglService.findOneBzwjgl(Integer.parseInt(id));
        String path=(String) map.get("FILE_PATH");
        if(path!=null && !"".equals(path)){
            File file=new File(path);
            if (file.isFile()){
                file.delete();
            }
        }
        bzwjglService.delBzwjgl(Integer.parseInt(id));
        return "删除成功";
    }

    /**
     * 通过id查找一条文件管理的信息
     * @param id
     * @return
     */
    @RequestMapping("/findOneBzwjgl")
    @ResponseBody
    public Map  findOneBzwjgl(String id){
        Map map=bzwjglService.findOneBzwjgl(Integer.parseInt(id));
        return map;
    };
    /**
     * 修改标准项目文件
     */
    @RequestMapping("/enditBzwjgl")
    @ResponseBody
    public Map enditBzwjgl(String wjmc,String wjml, String wjbb,String wjbh,String scr,String scsj,String id,String wdsm){
        Map map=new HashMap();
        SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd");
        map.put("wjmc",wjmc);
        map.put("wjml",wjml);
        map.put("wjbb",wjbb);
        map.put("wjbh",wjbh);
        map.put("scr",scr);
        map.put("id",Integer.parseInt(id));
        map.put("wdsm",wdsm);
        if(!"".equals(scsj)&&scsj!=null){
            try {
                map.put("scsj",sf.parse(scsj));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        bzwjglService.enditBzwjgl(map);
        Map ma=new HashMap();
        ma.put("info","修改成功");
         return ma;
    };
    @RequestMapping("/downloadBzwjgl")
    @ResponseBody
    //下载文件
    public void downloadBzwjgl(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String id=request.getParameter("id");//获得id
        Map map=bzwjglService.findOneBzwjgl(Integer.parseInt(id));//从数据库获得文件的路径
        String path=(String) map.get("FILE_PATH");//获得文件的路径
        File tempFile =new File( path.trim());
        String fileName = tempFile.getName();//获得文件的名字
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName="+new String(fileName.getBytes("GBK"),"ISO-8859-1"));//下载的文件名
        //用于记录以完成的下载的数据量，单位是byte
        long downloadedLength = 0L;
        try {
            //打开本地文件流
            InputStream inputStream = new FileInputStream(path);
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

    };
    @RequestMapping("/addShenhe")
    @ResponseBody
    public String addShenhe(String id){
        String name = CurrentLoginUser.getUser().getName();
        Map map=new HashMap();
        map.put("name",name);
        map.put("id",Integer.parseInt(id));
        bzwjglService.addShenhe(map);
        return "审核成功";
    };
    @RequestMapping("/addXiuding")
    @ResponseBody
    public String addXiuding(String id){
        String name = CurrentLoginUser.getUser().getName();
        Map map=new HashMap();
        map.put("name",name);
        map.put("id",Integer.parseInt(id));
        bzwjglService.addXiuding(map);
        return "修订成功";
    };
    @RequestMapping("/addJieyue")
    @ResponseBody
    public String addJieyue(String id){
        String name = CurrentLoginUser.getUser().getName();
        Map map=new HashMap();
        map.put("name",name);
        map.put("id",Integer.parseInt(id));
        bzwjglService.addJieyue(map);
        return "借阅成功";
    };
    @RequestMapping("/addHuishou")
    @ResponseBody
    public String addHuishou(String id){
        String name = CurrentLoginUser.getUser().getName();
        Map map=new HashMap();
        map.put("name",name);
        map.put("id",Integer.parseInt(id));
        bzwjglService.addHuishou(map);
        return "回收成功";
    };

}