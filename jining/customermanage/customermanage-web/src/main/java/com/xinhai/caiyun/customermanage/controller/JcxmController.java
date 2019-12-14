package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.commonmanager.utils.GetDate;
import com.xinhai.caiyun.customermanage.api.Khxxgl;
import com.xinhai.caiyun.customermanage.api.Tjcxm;
import com.xinhai.caiyun.customermanage.api.TwtJbxx;
import com.xinhai.caiyun.customermanage.api.TjcxmJbxx;
import com.xinhai.caiyun.customermanage.dao.TjcxmMapper;
import com.xinhai.caiyun.customermanage.dao.TqywtMapper;
import com.xinhai.caiyun.customermanage.service.TjcxmService;
import com.xinhai.caiyun.customermanage.service.TqywtService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by  on 2018/3/29 0029.
 *
 * @escription: 修改记录controller
 * @tableName:
 */
@Controller
@RequestMapping("/jcxm")
public class JcxmController {
 
    @Autowired
    private TjcxmService tjcxmService;

    @Autowired
    private TjcxmMapper tjcxmMapper;
    
    @Autowired
    private TqywtService tqywtService;
    
    @Autowired
    private TqywtMapper tqywtMapper;

    /**
     * @Description: 获取产品大类名称
     * @return
     */
    @RequestMapping(value = "/getCpmc/{type}",method = RequestMethod.GET)
    @ResponseBody
    public JSONObject getCpmc(@PathVariable("type") String type) {
        List<Map<String,String>> list =tjcxmMapper.getCpmc(type);
        JSONObject object = new JSONObject();
        object.put("success",true);
        object.put("data",list);
        return object;
    }

    /**
     * @Description: 保存样品-检测项目数据
     * @param obj
     * @return
             */
    @RequestMapping(value = "/saveYpJcxm",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveJcxm (@RequestBody JSONObject obj){
        String wtids = obj.getString("wtid");
        String [] wtid1  = wtids.split(",");
        String jcxmIds = obj.getString("jcxmId");
        String s1 = jcxmIds.replaceAll("]", "");
        String s2 = s1.replaceAll("\\[", "");
        String [] jcxmIds2  = s2.split(",");
        List<String> jcxmIds1 = new ArrayList<>();
        for (String s:jcxmIds2){
            String [] ids3= s.split("=");
            jcxmIds1.add(ids3[1].replaceAll("}",""));
        }
        for (String wtid : wtid1) {
            String findwtidw = tqywtMapper.findwtidw(wtid);
            String ypid = tqywtMapper.findypid(findwtidw);
            String jcx = "";
            List<String> jcxlist = new ArrayList<String>();
            for (String jcxmId : jcxmIds1) {
                jcxlist.add(jcxmId);
            }
            for (int i = 0;i < jcxlist.size();i++){
                String s = jcxlist.get(i);
                String jcxm = tqywtService.findJcxm(s);
                jcx = jcx + jcxm + ",";
            }
            String jcxm = jcx.substring(0,jcx.length()-1);
            tqywtMapper.insertjcxm(jcxm,wtid);
            tjcxmMapper.delYpJcxmList(ypid); //先删除之前的对应关系
            tjcxmMapper.insertYpJcxmList(jcxlist, ypid); //批量插入对应关系
        }
        JSONObject object = new JSONObject();
        object.put("success",true);
        return object;
    }

    /**
     * @Description: 保存样品-检测项目数据
     * @param obj
     * @return
     */
    @RequestMapping(value = "/saveYddypJcxm",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveYddypJcxm (@RequestBody JSONObject obj){
        JSONObject object = new JSONObject();
        String wtids = obj.getString("wtid");
        String [] wtid1  = wtids.split(",");
        String jcxmIds = obj.getString("jcxmId");
        String s1 = jcxmIds.replaceAll("]", "");
        String s2 = s1.replaceAll("\\[", "");
        String [] jcxmIds2  = s2.split(",");
        List<String> jcxmIds1 = new ArrayList<>();
        for (String s:jcxmIds2){
            String [] ids3= s.split("=");
            jcxmIds1.add(ids3[1].replaceAll("}",""));
        }
        for (String ypid : wtid1) {
            List<String> jcxlist = new ArrayList<String>();
            for (String jcxmId : jcxmIds1) {

                if(tjcxmMapper.getDataByYpidAndJcxmid(ypid,jcxmId).size()!=0){//如果集合的长度是0  则说数据库中没有数据
                    object.put("message","保存成功，有相同的检测项目被过滤。");
                } else {
                    // TODO 存在相同检测项则不添加，给出提示信息
                    jcxlist.add(jcxmId);
                }
            }
            //tjcxmMapper.delYpJcxmList(ypid); //先删除之前的对应关系
            if (jcxlist.size() > 0) {
                tjcxmMapper.insertYpJcxmList(jcxlist, ypid); //批量插入对应关系
            }
        }

        object.put("success",true);
        return object;
    }

    /**
     * @Description: 保存样品-检测项目数据
     * @param obj
     * @return
     */
    @RequestMapping(value = "/saveYpJcxmcy",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveJcxmcy (@RequestBody JSONObject obj){
        String wtids = obj.getString("wtid");
        String [] wtid1  = wtids.split(",");
        String jcxmIds = obj.getString("jcxmId");
        String s1 = jcxmIds.replaceAll("]", "");
        String s2 = s1.replaceAll("\\[", "");
        String [] jcxmIds2  = s2.split(",");
        List<String> jcxmIds1 = new ArrayList<>();
        for (String s:jcxmIds2){
            String [] ids3= s.split("=");
            jcxmIds1.add(ids3[1].replaceAll("}",""));
        }
        for (String wtid : wtid1) {
            String findcydbh = tqywtMapper.findcydbh(wtid);
            String ypid = tqywtMapper.findcyypid(findcydbh);
            String jcx = "";
            List<String> jcxlist = new ArrayList<String>();
            for (String jcxmId : jcxmIds1) {
                jcxlist.add(jcxmId);
            }
            for (int i = 0;i < jcxlist.size();i++){
                String s = jcxlist.get(i);
                String jcxm = tqywtService.findJcxm(s);
                jcx = jcx + jcxm + ",";
            }
            String jcxm = jcx.substring(0,jcx.length()-1);
            tqywtMapper.insertjcxm(jcxm,wtid);
            tjcxmMapper.delYpJcxmList(ypid); //先删除之前的对应关系
            tjcxmMapper.insertYpJcxmList(jcxlist, ypid); //批量插入对应关系
        }
        JSONObject object = new JSONObject();
        object.put("success",true);
        return object;
    }
    
    /**
     * @Description: 保存样品-制备检测项目数据
     * @param obj
     * @return
     * @author 郭英旭
     */
     
    @RequestMapping(value = "/saveYpzbJcxm",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject savezbJcxmcyd (@RequestBody JSONObject obj){
        String ypid = obj.getString("ypids");
        String ypzbid = obj.getString("ypzbid");
       
        String jcxmIds = obj.getString("jcxmId");
        String s1 = jcxmIds.replaceAll("]", "");
        String s2 = s1.replaceAll("\\[", "");
        String [] jcxmIds2  = s2.split(",");
        List<String> jcxmIds1 = new ArrayList<>();
        for (String s:jcxmIds2){
            String [] ids3= s.split("=");
            jcxmIds1.add(ids3[1].replaceAll("}",""));
        }
      
        String wtid = tqywtMapper.selectwtid(ypid);
        String jcx = "";
        List<String> jcxlist = new ArrayList<String>();
        for (String jcxmId : jcxmIds1) {
            jcxlist.add(jcxmId);
        }
        for (int i = 0;i < jcxlist.size();i++){
            String s = jcxlist.get(i);
            String jcxm = tqywtService.findJcxm(s);
            jcx = jcx + jcxm + ",";
        }
        String jcxm = jcx.substring(0,jcx.length()-1);
        tqywtMapper.insertjcxm(jcxm,wtid);
        tjcxmMapper.delYpzbJcxmList(ypzbid); //先删除之前的对应关系
        tjcxmMapper.insertYpzbJcxmList(jcxlist, ypzbid); //批量插入对应关系
        
        JSONObject object = new JSONObject();
        object.put("success",true);
        return object;
    }


    /**
     * @Description: 保存样品-检测项目数据
     * @param obj
     * @return
     */
    @RequestMapping(value = "/saveYpJcxmcyd",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveJcxmcyd (@RequestBody JSONObject obj){
        String ypids = obj.getString("ypids");
        String [] ypid1  = ypids.split(",");
        String jcxmIds = obj.getString("jcxmId");
        String s1 = jcxmIds.replaceAll("]", "");
        String s2 = s1.replaceAll("\\[", "");
        String [] jcxmIds2  = s2.split(",");
        List<String> jcxmIds1 = new ArrayList<>();
        for (String s:jcxmIds2){
            String [] ids3= s.split("=");
            jcxmIds1.add(ids3[1].replaceAll("}",""));
        }
        for (String ypid : ypid1) {
            String wtid = tqywtMapper.selectwtid(ypid);
            String jcx = "";
            List<String> jcxlist = new ArrayList<String>();
            for (String jcxmId : jcxmIds1) {
                jcxlist.add(jcxmId);
            }
            for (int i = 0;i < jcxlist.size();i++){
                String s = jcxlist.get(i);
                String jcxm = tqywtService.findJcxm(s);
                jcx = jcx + jcxm + ",";
            }
            String jcxm = jcx.substring(0,jcx.length()-1);
            tqywtMapper.insertjcxm(jcxm,wtid);
            tjcxmMapper.delYpJcxmList(ypid); //先删除之前的对应关系
            tjcxmMapper.insertYpJcxmList(jcxlist, ypid); //批量插入对应关系
        }
        JSONObject object = new JSONObject();
        object.put("success",true);
        return object;
    }

    /**
     * @Description: 保存样品-检测项目数据
     * @param obj
     * @return
     */
    @RequestMapping(value = "/saveYpypJcxm",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveJcxmyp (@RequestBody JSONObject obj){
        JSONArray jcxmIds = obj.getJSONArray("jcxmId");
        String ypid = obj.getString("ypid");
        List<String> list = new ArrayList<String>();
        for (Object jcxmId : jcxmIds) {
            JSONObject o = (JSONObject) jcxmId;
            list.add(o.getString("jcxmId"));
        }
        tjcxmMapper.delYpJcxmList(ypid); //先删除之前的对应关系
        tjcxmMapper.insertYpJcxmList(list, ypid); //批量插入对应关系
        String findwtidd = tqywtMapper.findwtidd(ypid);
        String id = tqywtMapper.findid(findwtidd);
        String jcx = "";
        List<String> jcxlist = new ArrayList<String>();
        for (Object jcxmId : jcxmIds) {
            JSONObject o = (JSONObject) jcxmId;
            jcxlist.add(o.getString("jcxmId"));
        }
        for (int i = 0;i < jcxlist.size();i++){
            String s = jcxlist.get(i);
            String jcxm = tqywtService.findJcxm(s);
            jcx = jcx + jcxm + ",";
        }
        String jcxm = jcx;
        tqywtMapper.insertjcxm(jcxm,id);
        JSONObject object = new JSONObject();
        object.put("success",true);
        return object;
    }

    /**
    * @Description 样品已选检测项
    * @param ypid
    * @author 郭英旭
    */
    @RequestMapping(value = "/getYpJcxm", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject getypjcxm(@RequestParam("ypid") String ypid) {
        List<Map<String,String>> list =tjcxmMapper.getYpJcxm(ypid);
        JSONObject object = new JSONObject();
        object.put("success",true);
        object.put("data",list);
        return object;
    }
    /**
    * @Description 样品已选检测项
    * @param ypid
    * @author 郭英旭
    */
    @RequestMapping(value = "/getYpzbJcxm", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject getypzbjcxm(@RequestParam("ypzbid") String ypid) {
        List<Map<String,String>> list =tjcxmMapper.getYpzbJcxm(ypid);
        JSONObject object = new JSONObject();
        object.put("success",true);
        object.put("data",list);
        return object;
    }

    @RequestMapping(value = "/getjcxm", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject getjcxm(@RequestParam("id") String id) {
        TjcxmJbxx jcxm = tjcxmMapper.findJcxm(id);
        JSONObject object = new JSONObject();
        object.put("success", true);
        object.put("data", jcxm);
        return object;
    }

    /**陈
     * 更新检测项
     * @param jcxm
     * @param id
     * @return
     */
    @RequestMapping(value = "/updateJcxm/{id}")
    @ResponseBody
    public JSONObject updateJcxm(@RequestBody String jcxm, @PathVariable("id") String id) {
        JSONObject object = new JSONObject();
        try {
            Tjcxm tjcxm = JSON.parseObject(jcxm, Tjcxm.class);
            tjcxm.setId(Long.parseLong(id));
            tjcxmMapper.updateJcxm(tjcxm);
            object.put("success", true);
        }catch (Exception e){
            object.put("success",false);
        }
        return object;
    }


    /**
     *  新增检查的项目
     * @param jcxm
     * @param id
     * @return
     */
    @RequestMapping(value = "/addJcxm/{id}")
    @ResponseBody
    public JSONObject addJcxm(@RequestBody String jcxm, @PathVariable("id") String id) {
        JSONObject object = new JSONObject();
        try {
            Tjcxm tjcxm = JSON.parseObject(jcxm, Tjcxm.class);
            tjcxmMapper.addJcxm(tjcxm);
            object.put("success", true);
        }catch (Exception e){
            object.put("success",false);
        }
        return object;
    }

    /**
     * 获取样品接收管理列表
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getJcxmList", method = RequestMethod.GET)
    @OperateLog(describe = "检测项目列表")
    @ResponseBody
    public DatatablesViewPage<Map> getJcxmList(@RequestParam("start") String start,
                                                     @RequestParam("length") String length,
                                                     @RequestParam("ypid") String ypid,
                                                     @RequestParam("jcxm") String jcxm,
                                                     @RequestParam("yl") String yl,
                                                     @RequestParam("xl") String xl,
                                                     @RequestParam(value = "pdyj",required = false) String pdyj,
                                                     @RequestParam(value = "jyyj",required = false) String jyyj,
                                                     @RequestParam(value = "jclbdm",required = false) String jclbdm
                                                     ) throws Exception {
        List<Map> list = new ArrayList<Map>();
        int num = 0;
        String zydm = CurrentLoginUser.getUser().getZydm(); //代表登录时展示个人数据，当前用户无派工权限，职员代码为当前用户的

        if (jcxm.equals("")) {
            jcxm = null;
        }
//        if (dl.equals("")) {
//            dl = null;
//        }
        if (yl.equals("")) {
            yl = null;
        }
//        if (cyl.equals("")) {
//            cyl = null;
//        }
        if (xl.equals("")) {
            xl = null;
        }
        if("".equals(ypid)){
            ypid = null;
        }
        if("".equals(pdyj)){
            pdyj = null;
        }
        if("".equals(jyyj)){
            jyyj = null;
        }
        num = tjcxmService.findTjcxmlistNums(jcxm, yl, xl, zydm, jclbdm,ypid,pdyj,jyyj);

        list = tjcxmService.findTjcxmlist(Integer.parseInt(start), Integer.parseInt(length), jcxm, yl, xl, zydm, jclbdm,ypid,pdyj,jyyj);

        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }


    public boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
    }
    //判空方法
    private String checkNull(Object obj)
    {
        return obj==null?" ":obj+" ";
    }


    //组装通用查询条件
    public Map getQueryTj(HttpServletRequest request) {
        String start = request.getParameter("start");
        String length = request.getParameter("length");

        Map cxtj = new HashMap();
        if (notNULL(start)) {
            cxtj.put("start", start);
        }

        if (notNULL(length)) {
            cxtj.put("length", length);
        }

        User u = CurrentLoginUser.getUser();
        String zydm = u.getZydm();
        cxtj.put("zydm", zydm);
        return cxtj;
    }

    /**
     * 获取样品接收管理列表
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getJcbJcxmList", method = RequestMethod.GET)
    @OperateLog(describe = "检测项目列表")
    @ResponseBody
    public DatatablesViewPage<Map> getJcbJcxmList(HttpServletRequest request ) throws Exception {

        List<Map> list = new ArrayList<Map>();
        int num = 0;
        String zydm = CurrentLoginUser.getUser().getZydm(); //代表登录时展示个人数据，当前用户无派工权限，职员代码为当前用户的
        String start = request.getParameter("start");
        String length = request.getParameter("length");
        String ypid = request.getParameter("ypid");
        String jcxm = request.getParameter("jcxm");
        String cpdl = request.getParameter("cpdl");
        String yl = request.getParameter("yl");
        String cyl = request.getParameter("cyl");
        String xl = request.getParameter("xl");
        String pdyj = request.getParameter("pdyj");


        Map cxtj = new java.util.HashMap();
        if (notNULL(start)) {
            cxtj.put("start", start);
        }else
        {
            cxtj.put("start", "0");
        }

        if (notNULL(length)) {
            cxtj.put("length", length);
        }else
        {
            //cxtj.put("length", "10");
        }
        if (notNULL(ypid)) {
            cxtj.put("ypid", ypid);
        }
        if (notNULL(jcxm)) {
            cxtj.put("jcxm", jcxm);
        }
        if (notNULL(cpdl)) {
            cxtj.put("cpdl", cpdl);
        }
        if (notNULL(yl)) {
            cxtj.put("yl", yl);
        }
        if (notNULL(cyl)) {
            cxtj.put("cyl", cyl);
        }
        if (notNULL(xl)) {
            cxtj.put("xl", xl);
        }
        if (notNULL(pdyj)) {
            cxtj.put("pdyj", pdyj);
        }
        num = tjcxmMapper.findAddTjcxmlistNums(cxtj);

        list =tjcxmMapper.findAddTjcxmlist(cxtj);


        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 根据ypid获取对应的检测项目列表信息
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/findJcxmByYpid", method = RequestMethod.GET)
    @ResponseBody
    public DatatablesViewPage<TjcxmJbxx> findJcxmByYpid(@RequestParam("start") String start,
                                                        @RequestParam("length") String length,
                                                        @RequestParam("ypid") String ypid,
                                                        @RequestParam(value = "type",required = false) String type,
                                                        @RequestParam(value = "searchText",required = false) String searchText) throws Exception {
        List<TjcxmJbxx> list = new ArrayList<TjcxmJbxx>();
        int num = 0;
        String zydm = CurrentLoginUser.getUser().getZydm(); //代表登录时展示个人数据，当前用户无派工权限，职员代码为当前用户的
        if (searchText != null && searchText.equals("")) {
            searchText = null;
        }

        num = tjcxmService.findJcxmByYpidNums(type, searchText, ypid, zydm);

        list = tjcxmService.findJcxmByYpid(Integer.parseInt(start), Integer.parseInt(length), type, searchText, ypid,zydm);

        DatatablesViewPage<TjcxmJbxx> datatablesViewPage = new DatatablesViewPage<TjcxmJbxx>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**陈
     * 导入Excel
     */
    @RequestMapping(value = "/importJcxmExcel",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject importJcxmExcel(HttpServletRequest request) throws Exception {
        //获取上传的文件
        MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
        MultipartFile file = multipart.getFile("upfile");
        InputStream in = file.getInputStream();
        tjcxmService.importJcxmExcel(in,file);
        //数据导入
        in.close();
        JSONObject jo=new JSONObject();
        jo.put("success",true);
        jo.put("message","网络异常");
        jo.put("info","导入成功");
        return jo;
    }

    /**陈
     *下载模板
     */
    @RequestMapping(value = "/downJcxmExcel", method = RequestMethod.GET)
    @ResponseBody
    public void downJcxmExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String importUrl ="/ExcelModels/JcxmExcelModel.xlsx";//导入模板的路径
        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName="+new String("检测项模板.xlsx".getBytes("GBK"),"ISO-8859-1"));
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
    /**陈
     * 删除检测项
     */
    @RequestMapping(value = "/delJxcm/{id}", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject delZfwt(@PathVariable("id") String id) {
        tjcxmService.delJxcmJbxx(id);
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }

    //20190830添加新方法获取列表
    /**
     * 获取样品接收管理列表
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getJcxmListNew", method = RequestMethod.GET)
    @OperateLog(describe = "检测项目列表")
    @ResponseBody
    public DatatablesViewPage<Map> getJcxmList(HttpServletRequest request) throws Exception {

        List<Map> list = new ArrayList<Map>();
        Map cxtj = getQueryTj(request);
//        String start = request.getParameter("start");
//        String length = request.getParameter("length");
//
//        Map cxtj = new HashMap();
//        if (notNULL(start)) {
//            cxtj.put("start", start);
//        }
//
//        if (notNULL(length)) {
//            cxtj.put("length", length);
//        }
//
//        User u = CurrentLoginUser.getUser();
//        String zydm = u.getZydm();
//        cxtj.put("zydm", zydm);
        String ypid = request.getParameter("ypid");
        String jcxm = request.getParameter("jcxm");
        String yl = request.getParameter("yl");
        String xl = request.getParameter("xl");
        String pdyj = request.getParameter("pdyj");
        String jyyj = request.getParameter("jyyj");
        String jclbdm = request.getParameter("jclbdm");
        String dl = request.getParameter("dlmc");
        String cyl = request.getParameter("cylmc");
        String jcff = request.getParameter("jcff");

        if (notNULL(ypid)) {
            cxtj.put("ypid", ypid);
        }
        if (notNULL(jcxm)) {
            cxtj.put("jcxm", jcxm);
        }
        if (notNULL(yl)) {
            cxtj.put("yl", yl);
        }
        if (notNULL(xl)) {
            cxtj.put("xl", xl);
        }
        if (notNULL(pdyj)) {
            cxtj.put("pdyj", pdyj);
        }
        if (notNULL(jyyj)) {
            cxtj.put("jyyj", jyyj);
        }
        if (notNULL(jclbdm)) {
            cxtj.put("jclbdm", jclbdm);
        }
        if (notNULL(dl)) {
            cxtj.put("dl", dl);
        }
        if (notNULL(cyl)) {
            cxtj.put("cyl", cyl);
        }
        if (notNULL(jcff)) {
            cxtj.put("jcff", jcff);
        }
        int num = 0;
//        num = tjcxmService.findTjcxmlistNums(jcxm, yl, xl, zydm, jclbdm,ypid,pdyj,jyyj);
        num = tjcxmService.findTjcxmlistNumsNew(cxtj);
//        list = tjcxmService.findTjcxmlist(Integer.parseInt(start), Integer.parseInt(length), jcxm, yl, xl, zydm, jclbdm,ypid,pdyj,jyyj);
        list = tjcxmService.findTjcxmlistNew(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * @Description: 20190910新增保存样品-检测项目数据
     * @param obj
     * @return
     */
    @RequestMapping(value = "/saveYddypJcxmNew",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveYddypJcxmNew (@RequestBody JSONObject obj){
        JSONObject object = new JSONObject();
        String wtids = obj.getString("wtid");
        String [] wtid1  = wtids.split(",");
        String jcxmIds = obj.getString("jcxmId");
        String s1 = jcxmIds.replaceAll("]", "");
        String s2 = s1.replaceAll("\\[", "");
        String [] jcxmIds2  = s2.split(",");

        String jcxmNames = obj.getString("jcxmName");
        String jn1 = jcxmNames.replaceAll("]","");
        String jn2 = jn1.replaceAll("\\[","");
        String [] jcxmName2 = jn2.split(",");

        List<String> jcxmIds1 = new ArrayList<>();
        for (String s:jcxmIds2){
            String [] ids3= s.split("=");
            jcxmIds1.add(ids3[1].replaceAll("}",""));
        }
        List<String> jcxmNames1 = new ArrayList<>();
        for (String n:jcxmName2){
            String [] name3 = n.split("=");
            jcxmNames1.add(name3[1].replaceAll("}",""));
        }
        for (String ypid : wtid1) {
            List<String> jcxlist = new ArrayList<String>();
            String jcxmId = "";
            String jcxmName = "";
            for(int i = 0;i<jcxmIds2.length;i++) {
                jcxmId = jcxmIds1.get(i);
                jcxmName = jcxmNames1.get(i);
                if (tjcxmMapper.getDataByYpidAndJcxmName(ypid, jcxmName).size() != 0) {
                    object.put("message", "保存成功，有相同的检测项目被过滤。");
                } else {
                    // TODO 存在相同检测项则不添加，给出提示信息
                    jcxlist.add(jcxmId);
                }
            }
            if (jcxlist.size() > 0) {
                tjcxmMapper.insertYpJcxmList(jcxlist, ypid); //批量插入对应关系
            }
        }
        object.put("success",true);
        return object;
    }
}
