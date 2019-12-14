package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.commonmanager.api.MaxAtomicInteger;
import com.xinhai.caiyun.commonmanager.utils.GetDate;
import com.xinhai.caiyun.customermanage.api.*;
import com.xinhai.caiyun.customermanage.api.Typgl;
import com.xinhai.caiyun.customermanage.controller.pageoffice.TscMain;
import com.xinhai.caiyun.customermanage.controller.pageoffice.TscDyypbm;
import com.xinhai.caiyun.customermanage.dao.*;
import com.xinhai.caiyun.customermanage.service.TqywtService;
import com.xinhai.caiyun.customermanage.service.TypglService;
import com.xinhai.caiyun.customermanage.service.TypglService;
import com.xinhai.security.api.CurrentLoginUser;

import com.xinhai.usermanager.entity.User;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;
import com.zhuozhengsoft.pageoffice.excelwriter.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by  on 2018/3/29 0029.
 *
 * @escription: 修改记录controller
 * @tableName:
 */
@Controller
@RequestMapping("ypgl")
public class YpglController {
    @Autowired
    private BgglMapper bgglMapper;
    @Autowired
    private TypglService typglService;

    @Autowired
    private MaxAtomicInteger maxAtomicInteger;
    
    @Autowired
    private SystemMessagesService systemMessagesService;

    @Autowired
    private TypglMapper typglMapper;

    @Autowired
    private JcglMapper jcglMapper;

    @Autowired
    private TypcbMapper typcbMapper;

    @Autowired
    private TypspMapper typspMapper;
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
     * @Description: 获取单个样品接收数据
     * @param id
     * @return
     */
    @RequestMapping(value = "/getYpjs",method = RequestMethod.GET)
    @ResponseBody
    public JSONObject geTypgl(@RequestParam("id") String id) {
    	Typgl typgl =typglService.findTypjs(id);
        JSONObject object = new JSONObject();
        object.put("success",true);
        object.put("data",typgl);
        return object;
    }

    /**
     * 样品接收退回
     * @param ypbm
     * @return
     */
    @RequestMapping(value = "/returnYpJs")
    @ResponseBody
    public JSONObject returnYpJs(String ypbm){
        String jszt="199";
        String lx="1";
        typglService.alterYpJS_jszt(jszt,ypbm);
        typglService.deleteYpJS_rydm(lx,ypbm);
        JSONObject jo=new JSONObject();
        jo.put("info","退回成功");
         return jo;
    }

    /**
     * 获取样品接收管理列表
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getYpjsAll", method = RequestMethod.GET)
    @OperateLog(describe = "样品接收管理列表")
    @ResponseBody
    public DatatablesViewPage<TwtJbxx> geTypglAll(@RequestParam("start") String start,
                                                 @RequestParam("length") String length,
                                             //    @RequestParam("searchText1") String searchText1,
                                                 @RequestParam("htmc") String htmc,
                                                 @RequestParam("htbh") String htbh,
                                                 @RequestParam("htlx") String htlx,
                                                 @RequestParam("wtdwmc") String wtdwmc,
                                                 @RequestParam("ywry") String ywry,
                                                 @RequestParam("HtstartTime") String HtstartTime,
                                                 @RequestParam("HtendTime") String HtendTime,
                                                 @RequestParam("BgstartTime") String BgstartTime,
                                                 @RequestParam("BgendTime") String BgendTime,
                                                 @RequestParam("jszt") String jszt) throws Exception {
        List<TwtJbxx> list = new ArrayList<TwtJbxx>();
       /* if (searchText1.equals("")) {
            searchText1 = null;
        }*/
        int num = 0;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date HtstartDate=null,HtendDate=null,BgstartDate=null,BgendDate=null;
        if(!HtstartTime.equals("")){
            HtstartDate = sdf.parse(HtstartTime);
        }
        if(!HtendTime.equals("")){
            HtendDate = sdf.parse(HtendTime);
            HtendDate = GetDate.getFutureDay(HtendDate,"01",1);
        }

        if(!BgstartTime.equals("")){
            BgstartDate = sdf.parse(BgstartTime);
        }
        if(!BgendTime.equals("")){
            BgendDate = sdf.parse(BgendTime);
            BgendDate = GetDate.getFutureDay(BgendDate,"01",1);
        }
        String zydm = CurrentLoginUser.getUser().getZydm(); //代表登录时展示个人数据，当前用户无派工权限，职员代码为当前用户的

        list = typglService.findTypjsAll(Integer.parseInt(start), Integer.parseInt(length), htmc, htbh, htlx, wtdwmc, HtstartDate, HtendDate, BgstartDate, BgendDate, ywry,zydm,jszt);
       
        num = typglService.findTypjsAllNums(htmc, htbh, htlx, wtdwmc, HtstartDate, HtendDate, BgstartDate, BgendDate, ywry,zydm,jszt);

        DatatablesViewPage<TwtJbxx> datatablesViewPage = new DatatablesViewPage<TwtJbxx>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    
    
    /**
     * 获取样品接收样品详情列表
     * @param searchText1 客户名称
     * @return 客户信息
     * @throws Exception 抛出异常
     */
   /* @RequestMapping(value = "/getTypjsAlYpxq", method = RequestMethod.GET)
    @OperateLog(describe = "样品详情列表")
    @ResponseBody
    public List<Typgl> getTypjsAlYpxq(String ypbm) throws Exception {
        List<Typgl> list = new ArrayList<Typgl>();
      
        String zydm = CurrentLoginUser.getUser().getZydm(); //代表登录时展示个人数据，当前用户无派工权限，职员代码为当前用户的

        list = typglService.getTypjsAlYpxq(ypbm,zydm,"200");
       
        return list;
    }*/

    
    /**
     * 获取样品接收样品详情列表
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getTypjsAlYpxq", method = RequestMethod.GET)
    @OperateLog(describe = "样品详情列表")
    @ResponseBody
    public DatatablesViewPage<Typgl> getTypjsAlYpxq(@RequestParam("start") String start,
                                                @RequestParam("length") String length,
                                                @RequestParam("wtid") String wtid,
                                                @RequestParam("jszt") String jszt,
                                                @RequestParam("cpdlmc") String cpdlmc,
                                                @RequestParam("jcxm") String jcxm,
                                                @RequestParam("zxbz") String zxbz,
                                                @RequestParam("BgstartTime") String BgstartTime,
                                                @RequestParam("BgendTime") String BgendTime) throws Exception {
        List<Typgl> list = new ArrayList<Typgl>();
        int num = 0;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date BgstartDate=null,BgendDate=null;
        if(!BgstartTime.equals("")){
            BgstartDate = sdf.parse(BgstartTime);
        }
        if(!BgendTime.equals("")){
            BgendDate = sdf.parse(BgendTime);
            BgendDate = GetDate.getFutureDay(BgendDate,"01",1);
        }
        Map map = new HashMap<String, Object>();
        map.put("cpdlmc", cpdlmc);
        map.put("jcxm", jcxm);
        map.put("zxbz", zxbz);
        map.put("bgstartDate", BgstartDate);
        map.put("bgendDate", BgendDate);
        String zydm = CurrentLoginUser.getUser().getZydm(); //代表登录时展示个人数据，当前用户无派工权限，职员代码为当前用户的

        list = typglService.getTypjsAlYpxq(Integer.parseInt(start), Integer.parseInt(length), wtid,zydm,jszt,map);

        num = typglService.getTypjsAlYpxqNums( wtid,zydm,jszt,map);

        DatatablesViewPage<Typgl> datatablesViewPage = new DatatablesViewPage<Typgl>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }
    /**
     * 样品流转退回
     * @param ypbm
     * @return
     */
    @RequestMapping(value = "/returnYpLz")
    @ResponseBody
    public JSONObject returnYpLz(String ypbm){
        String jszt="200";
        String lx="2";
        typglService.alterYpJS_jszt(jszt,ypbm);
        typglService.deleteYpJS_rydm(lx,ypbm);
        JSONObject jo=new JSONObject();
        jo.put("info","退回成功");
        return jo;
    }

    /**
     * 获取样品接收样品详情列表
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getTypLzAlYpxq", method = RequestMethod.GET)
    @OperateLog(describe = "样品流转详情列表")
    @ResponseBody
    public DatatablesViewPage<Typgl> getTypLzAlYpxq(@RequestParam("start") String start,
                                                @RequestParam("length") String length,
                                                @RequestParam("wtid") String wtid,
                                                @RequestParam("jszt") String jszt,
                                                String ypbm,
                                                String ypmc,
                                                String cydbh) throws Exception {
        List<Typgl> list = new ArrayList<Typgl>();
        int num = 0;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Map map = new HashMap<String, Object>();
        map.put("cydbh", cydbh);
        map.put("ypmc", ypmc);
        map.put("ypbm", ypbm);
        String zydm = CurrentLoginUser.getUser().getZydm(); //代表登录时展示个人数据，当前用户无派工权限，职员代码为当前用户的

        list = typglService.getTypjsAlYpxq(Integer.parseInt(start), Integer.parseInt(length), wtid,zydm,jszt,map);

        num = typglService.getTypjsAlYpxqNums( wtid,zydm,jszt,map);

        DatatablesViewPage<Typgl> datatablesViewPage = new DatatablesViewPage<Typgl>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }
    
    
    
    /**
     * 获取样品接收样品详情列表
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getTypjslygl", method = RequestMethod.GET)
    @OperateLog(describe = "领样管理列表")
    @ResponseBody
    public DatatablesViewPage<Tlygl> getTypjslygl(@RequestParam Map<String,String> map,String sjcjrqend,String sjcjrqstart) throws Exception {
        List<Tlygl> list = new ArrayList<Tlygl>();
        int num = 0;
        String zydm = CurrentLoginUser.getUser().getZydm(); //代表登录时展示个人数据，当前用户无派工权限，职员代码为当前用户的
        map.put("zydm", zydm);
        
        Date BgstartDate=null,BgendDate=null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if(!StringUtils.isEmpty(sjcjrqstart)){
            BgstartDate = sdf.parse(sjcjrqstart);
            map.put("sjcjrqstart", sjcjrqstart);
            
        }
        if(!StringUtils.isEmpty(sjcjrqend)){
            BgendDate = sdf.parse(sjcjrqend);
            BgendDate = GetDate.getFutureDay(BgendDate,"01",1);
            map.put("sjcjrqend", sjcjrqend);
        }
        
        
        list = typglService.getTypjslygl(map);

        num = typglService.getTypjslyglNums(map);

        DatatablesViewPage<Tlygl> datatablesViewPage = new DatatablesViewPage<Tlygl>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }
    
    /**
     * 获取样品接收样品详情列表
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    /**
     * 获取样品接收样品详情列表
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getTypzbList", method = RequestMethod.GET)
    @OperateLog(describe = "制备管理列表")
    @ResponseBody
    public DatatablesViewPage<Tlygl> getTypzbList(@RequestParam Map<String,String> map) throws Exception {
        List<Tlygl> list = new ArrayList<Tlygl>();
        int num = 0;
        String zydm = CurrentLoginUser.getUser().getZydm(); //代表登录时展示个人数据，当前用户无派工权限，职员代码为当前用户的
        map.put("zydm", zydm);
        list = typglService.getTypjslygl(map);
        List<Map> jcx = typglMapper.findJcx(map.get("jszt").toString(),zydm);
        String jcx1 = "";
        String jcfa = "";
        for (Tlygl s:list){
            for (Map s1:jcx) {
                if (s.getYpbm().equals(s1.get("ypbm"))) {
                    jcx1 = jcx1+s1.get("zwmc_bm")+",";
                    jcfa = jcfa+s1.get("jcyj")+",";
                    s.setJcfa(jcfa);
                    s.setJcx(jcx1);
                }
            }
            jcx1=" ";
            jcfa=" ";
        }

        num = typglService.getTypjslyglNums(map);

        DatatablesViewPage<Tlygl> datatablesViewPage = new DatatablesViewPage<Tlygl>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    
    /**
     * 样品管理列表_样品接收_样品详情_检测项目列表
     * @return 客户信息
     * @throws Exception 抛出异常
     */
/*    @RequestMapping(value = "/getTjcxmJbxx", method = RequestMethod.GET)
    @OperateLog(describe = "检测项目列表")
    @ResponseBody
    public List<TjcxmJbxx> TjcxmJbxx(String ypbm) throws Exception {
        List<TjcxmJbxx> list = new ArrayList<TjcxmJbxx>();
      
        String zydm = CurrentLoginUser.getUser().getZydm(); //代表登录时展示个人数据，当前用户无派工权限，职员代码为当前用户的

        list = typglService.getTypjsAlYpxqJcxm(ypbm,zydm,"200");
       
        return list;
    }
*/
    @RequestMapping(value = "/getTjcxmJbxx", method = RequestMethod.GET)
    @OperateLog(describe = "检测项目列表")
    @ResponseBody
    public DatatablesViewPage<TjcxmJbxx> getTjcxmJbxx(@RequestParam("start") String start,
                                                     @RequestParam("length") String length,
                                                     @RequestParam("ypbm") String ypbm,
                                                     @RequestParam("zwmcBm") String zwmcBm,
                                                     @RequestParam("jcfa") String jcfa,
                                                     @RequestParam("jszt") String jszt) throws Exception {
        List<TjcxmJbxx> list = new ArrayList<TjcxmJbxx>();
        int num = 0;
        String zydm = CurrentLoginUser.getUser().getZydm(); //代表登录时展示个人数据，当前用户无派工权限，职员代码为当前用户的

        num = typglService.getTypjsAlYpxqJcxmNums(zwmcBm,jcfa,ypbm,zydm ,jszt);

        list = typglService.getTypjsAlYpxqJcxm(Integer.parseInt(start), Integer.parseInt(length), zwmcBm,jcfa,ypbm,zydm,jszt);

        DatatablesViewPage<TjcxmJbxx> datatablesViewPage = new DatatablesViewPage<TjcxmJbxx>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    
    
    
    /**
     * @Description: 更新样品状态201流转
     * @Param:
     * @return:
     * @Author: Mr.Li
     * @Date: 2018/3/29 0029
     */
    @RequestMapping(value = "/updateYpxx/{id}/{jszt}",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject updateTypglJszt(@PathVariable("jszt") String jszt, @PathVariable("id") String id) {
        Typgl typgl = JSON.parseObject(jszt, Typgl.class);
        typgl.setId(Long.parseLong(id));
        typglService.updateTypglJszt(typgl);
        JSONObject object = new JSONObject();
        object.put("success",true);
        return object;
    }
    
    
    
    
    
    /**
     * 获取样品流转列表
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getYpLzAll", method = RequestMethod.GET)
    @OperateLog(describe = "样品流转管理列表")
    @ResponseBody
    public DatatablesViewPage<TwtJbxx> getYpLzAll(@RequestParam("start") String start,
                                                 @RequestParam("length") String length,
                                             //    @RequestParam("searchText1") String searchText1,
                                                 @RequestParam("htmc") String htmc,
                                                 @RequestParam("htbh") String htbh,
                                                 @RequestParam("htlx") String htlx,
                                                 @RequestParam("wtdwmc") String wtdwmc,
                                                 @RequestParam("ywry") String ywry,
                                                 @RequestParam("HtstartTime") String HtstartTime,
                                                 @RequestParam("HtendTime") String HtendTime,
                                                 @RequestParam("BgstartTime") String BgstartTime,
                                                 @RequestParam("BgendTime") String BgendTime,
                                                 @RequestParam("jszt") String jszt) throws Exception {
        List<TwtJbxx> list = new ArrayList<TwtJbxx>();
       /* if (searchText1.equals("")) {
            searchText1 = null;
        }*/
        int num = 0;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date HtstartDate=null,HtendDate=null,BgstartDate=null,BgendDate=null;
        if(!HtstartTime.equals("")){
            HtstartDate = sdf.parse(HtstartTime);
        }
        if(!HtendTime.equals("")){
            HtendDate = sdf.parse(HtendTime);
            HtendDate = GetDate.getFutureDay(HtendDate,"01",1);
        }

        if(!BgstartTime.equals("")){
            BgstartDate = sdf.parse(BgstartTime);
        }
        if(!BgendTime.equals("")){
            BgendDate = sdf.parse(BgendTime);
            BgendDate = GetDate.getFutureDay(BgendDate,"01",1);
        }
        String zydm = CurrentLoginUser.getUser().getZydm(); //代表登录时展示个人数据，当前用户无派工权限，职员代码为当前用户的

        list = typglService.findTypjsAll(Integer.parseInt(start), Integer.parseInt(length), htmc, htbh, htlx, wtdwmc, HtstartDate, HtendDate, BgstartDate, BgendDate, ywry,zydm,jszt);
       
        num = typglService.findTypjsAllNums(htmc, htbh, htlx, wtdwmc, HtstartDate, HtendDate, BgstartDate, BgendDate, ywry,zydm,jszt);

        DatatablesViewPage<TwtJbxx> datatablesViewPage = new DatatablesViewPage<TwtJbxx>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }
    
    /**
     * @Description: 保存样品数据
     * @param ypxx
     * @return
             */
    @RequestMapping(value = "/saveYpxx/{uuid}",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveYpxx (@RequestBody String ypxx, @PathVariable String uuid){
        Typgl typgl = JSON.parseObject(ypxx, Typgl.class);
        typgl.setYpbm(maxAtomicInteger.getMaxYpbm()); //样品编码
        typglService.createTypgl(typgl);
        String id = typgl.getId()+ ""; //获得插入的样品id
        //更新对应关系的样品id
        typglService.updateYpJcxmList(uuid, id);
        JSONObject object = new JSONObject();
        object.put("success",true);
        return object;
    }

    /**
     * 删除样品
     * @param
     * @return
     */
    @RequestMapping(value = "/delWtxx/{wtid}", method = RequestMethod.POST)
    @OperateLog(describe = "删除样品")
    @ResponseBody
    public Boolean delWtxx(@PathVariable String  wtid) {
    	List<String> list =new ArrayList<String>();
    	list.add(wtid);
        typglService.delWtxx(list);
        return true;
    }
    
    /**
     * 删除样品
     * @param
     * @return
     */
    @RequestMapping(value = "/delypjs/{id}", method = RequestMethod.POST)
    @OperateLog(describe = "删除样品")
    @ResponseBody
    public Boolean delypjs(@PathVariable String  id) {
    	typglService.deleteTypglbyId(id);
        return true;
    }
    
    /**
     * 删除样品
     * @param json
     * @return
     */
    @RequestMapping(value = "/delYpList", method = RequestMethod.POST)
    @OperateLog(describe = "删除样品")
    @ResponseBody
    public Boolean delYpList(@RequestBody JSONObject json) {
        List<String> list = new ArrayList<String>();
        JSONArray ypxx = json.getJSONArray("ypxx");
        for (Object yp : ypxx) {
            JSONObject o = (JSONObject) yp;
            list.add(o.getString("ypxx"));
//            String y = o.getString("ypxx");
//            System.out.println(y);
        }
        typglService.deleteTypgl(list);
        return true;
    }

    /**
     * 删除样品
     * @param json
     * @return
     */
    @RequestMapping(value = "/delJcxmList", method = RequestMethod.PUT)
    @OperateLog(describe = "删除检测项目")
    @ResponseBody
    public Boolean delJcxmList(@RequestBody JSONObject json) {
        List<String> list = new ArrayList<String>();
        JSONArray jcxm = json.getJSONArray("jcxm");
        for (Object yp : jcxm) {
            JSONObject o = (JSONObject) yp;
            list.add(o.getString("jcxm"));
        }
        String ypid = json.getString("ypid");
        typglService.deleteJcxm(list, ypid); //删除检测项目
        return true;
    }

    /**
     * @Description: 获取单个样品接收数据
     * @param id
     * @return
     */
    @RequestMapping(value = "/getYpxx",method = RequestMethod.GET)
    @ResponseBody
    public JSONObject getYpxx(@RequestParam("id") String id) {
       Typgl typgl =typglService.findTypxx(id);
        JSONObject object = new JSONObject();
        object.put("success",true);
        object.put("data",typgl);
        return object;
    }

    /**
     * @Description: 更新样品信息
     * @Param:
     * @return:
     * @Author: Mr.Li
     * @Date: 2018/3/29 0029
     */
    @RequestMapping(value = "/updateYpxx/{id}",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject updateYpxx(@RequestBody String khxx, @PathVariable("id") String id) {
        Typgl typgl = JSON.parseObject(khxx, Typgl.class);
        typgl.setId(Long.parseLong(id));
        typglService.updateTypgl(typgl);
        JSONObject object = new JSONObject();
        object.put("success",true);
        return object;
    }
    
    /**
     * @Description: 更新样品信息
     * @Param:
     * @return:
     * @Author: Mr.Li
     * @Date: 2018/3/29 0029
     */
    @RequestMapping(value = "/updateYpjsYpxx/{id}",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject updateYpxx(Typgl typgl, @PathVariable("id") String id) {
        typgl.setId(Long.parseLong(id));
        typglService.updateTypgl(typgl);
        JSONObject object = new JSONObject();
        object.put("success",true);
        return object;
    }
    

    /**
     * 获取样品接收管理列表
     * @param searchText 客户名称
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getYpxxList", method = RequestMethod.GET)
    @ResponseBody
    public DatatablesViewPage<Typgl> getYpxxList(@RequestParam("start") String start,
                                                @RequestParam("length") String length,
                                                @RequestParam("type") String type,
                                                @RequestParam("searchText") String searchText) throws Exception {
        List<Typgl> list = new ArrayList<Typgl>();
        if (searchText.equals("")) {
            searchText = null;
        }
        int num = 0;
        String zydm = CurrentLoginUser.getUser().getZydm(); //代表登录时展示个人数据，当前用户无派工权限，职员代码为当前用户的

        list = typglService.findTypxxlist(Integer.parseInt(start), Integer.parseInt(length), type, searchText,zydm);

        num = typglService.findTypxxlistNums(type, searchText,zydm);

        DatatablesViewPage<Typgl> datatablesViewPage = new DatatablesViewPage<Typgl>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }
    
    public Map getMap(Map map) {
        Map mm = new HashMap();
        map.forEach((k, v) -> {
            if (v instanceof String) {
                v = ((String) v).trim();
                mm.put(k, v);
            }
            if (v instanceof String[]) {
                mm.put(k, ((String[]) v)[0].trim());
            }
        });
        return mm;
    }
    
    //保存执行人
    @RequestMapping(value = "/saveZxry", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveZxry(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            Map map = getMap(request.getParameterMap());
            String zydm = map.get("zydm") + "";
            String wtid = map.get("id") + "";
            String jszt = map.get("jszt") + "";
            String dqjszt =map.get("dqjszt")+ "";
            String lx = map.get("lx")+"";
            String lrry = CurrentLoginUser.getUser().getZydm();
            String[] ids = wtid.split(",");
            SystemMessages systemMessages = new SystemMessages();
            Arrays.stream(ids).forEach(s_id -> {
            	  List<Map> mapList = new ArrayList<>();
            	 List<Typgl> list = new ArrayList<Typgl>();
            	 Map map1 = new HashMap<String, String>();
                 list = typglService.getTypjsAlYpxq(0,1000,s_id,zydm,dqjszt,map1);
            	
                 for (Typgl typgl : list) {
                	  String[] zydms = zydm.split(",");
                      Arrays.stream(zydms).forEach(s_zydm -> {
                          Map mm = new HashMap();
                          mm.put("zydm", s_zydm);
                          mm.put("ypbm", typgl.getYpbm());
                          mm.put("lrry", lrry);
                          mm.put("jszt", jszt);
                          mm.put("lx",lx);
                          mapList.add(mm);
                          
                          //消息提醒
                          String txbt = "";
                          String txnr = "";
                          //接收状态(200 待接收 201 待发放 202 待领样 203待制备 204完成)
                          txnr=CurrentLoginUser.getUser().getName()+"提交了样品信息，样品编码："+typgl.getYpbm()+"请查看！";
                          if("201".equals(jszt)){
                          	txbt="待发放提醒";
                          }else if("202".equals(jszt)){
                        	  txbt="待领样提醒";
                          }else if("203".equals(jszt)){
                        	  txbt="待制备提醒";
                          }else if("204".equals(jszt)){
                        	  txbt="制备完成提醒";
                          }
                          systemMessages.setXxid(typgl.getYpbm());
                          systemMessages.setTxlx_dm(jszt);
                          systemMessages.setDljg_bm(CurrentLoginUser.getUser().getDljgBm());
                          systemMessages.setTxbt(txbt);
                          systemMessages.setTxnr(txnr);
                          systemMessages.setFsry_dm(CurrentLoginUser.getUser().getZydm());
                          systemMessages.setJsry_dm(s_zydm);
                          systemMessages.setFsry_mc(CurrentLoginUser.getUser().getName());
                          systemMessages.setFssj(new Date());

                          systemMessagesService.addSystemMessages(systemMessages);
                          
                      });
				} 
                 typglService.insert(mapList);
            });
           
            
            jsonObject.put("success", true);
        }catch (Exception e){
            jsonObject.put("success", false);
            jsonObject.put("message","保存失败！");
        }
        return jsonObject;
    }
    
  //保存执行人
    @RequestMapping(value = "/saveZxry1", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveZxry1(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            Map map = getMap(request.getParameterMap());
            String zydm = map.get("zydm") + "";
            String ypbm = map.get("id") + "";
            String jszt = map.get("jszt") + "";
            String lx = map.get("lx")+"";
            String lrry = CurrentLoginUser.getUser().getZydm();
            String[] ids = ypbm.split(",");
            SystemMessages systemMessages = new SystemMessages();
            Arrays.stream(ids).forEach(s_id -> {
            	  List<Map> mapList = new ArrayList<>();
                	  String[] zydms = zydm.split(",");
                      Arrays.stream(zydms).forEach(s_zydm -> {
                          Map mm = new HashMap();
                          mm.put("zydm", s_zydm);
                          mm.put("ypbm", s_id);
                          mm.put("lrry", lrry);
                          mm.put("jszt", jszt);
                          mm.put("lx",lx);
                          mapList.add(mm);
                          
                          //消息提醒
                          String txbt = "";
                          String txnr = "";
                          //接收状态(200 待接收 201 待发放 202 待领样 203待制备 204完成)
                          txnr=CurrentLoginUser.getUser().getName()+"提交了样品信息，样品编码："+ypbm+"请查看！";
                          if("201".equals(jszt)){
                          	txbt="待发放提醒";
                          }else if("202".equals(jszt)){
                        	  txbt="待领样提醒";
                          }else if("203".equals(jszt)){
                        	  txbt="待制备提醒";
                          }else if("204".equals(jszt)){
                        	  txbt="制备完成提醒";
                          }
                          systemMessages.setXxid(ypbm);
                          systemMessages.setTxlx_dm(jszt);
                          systemMessages.setDljg_bm(CurrentLoginUser.getUser().getDljgBm());
                          systemMessages.setTxbt(txbt);
                          systemMessages.setTxnr(txnr);
                          systemMessages.setFsry_dm(CurrentLoginUser.getUser().getZydm());
                          systemMessages.setFsry_mc(CurrentLoginUser.getUser().getName());
                          systemMessages.setJsry_dm(s_zydm);
                          systemMessages.setFssj(new Date());

                          systemMessagesService.addSystemMessages(systemMessages);
                          
                          
                      });
                 typglService.insert(mapList);
            });
            if ("204".equals(jszt)){
                for (int i=0;i<ids.length;i++){
                    this.jcglMapper.updateWtLrry(ids[i],zydm);
                    this.bgglMapper.updateIF_JC(ids[i]);
                    String ypid = this.typglMapper.findypid(ypbm);
                    Map map1 = new HashMap();
                    map1.put("ypid",ypid);
                    map1.put("zxr",zydm);
                    this.typglMapper.insertYpqr(map1);
                }
            }
          
            jsonObject.put("success", true);
        }catch (Exception e){
            jsonObject.put("success", false);
            jsonObject.put("message","保存失败！");
        }
        return jsonObject;
    }

    /**
     * 获取任务详情中的样品信息
     * @param wtid wtid
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getYpxxListByWt", method = RequestMethod.GET)
    @ResponseBody
    public DatatablesViewPage<Typgl> getYpxxListByWt(@RequestParam("start") String start,
                                                 @RequestParam("length") String length,
                                                 @RequestParam("wtid") String wtid,
                                                 @RequestParam("type") String type) throws Exception {
        List<Typgl> list = new ArrayList<Typgl>();
        int num = 0;
        String zydm = CurrentLoginUser.getUser().getZydm(); //代表登录时展示个人数据，当前用户无派工权限，职员代码为当前用户的

        if (type.equals("view")) {
            num = typglMapper.findYpByWtNum(wtid, true,zydm); // 先查询该任务是否已经保存了抽样样品
            //if(num > 0) {
                list = typglMapper.findYpByWt(Integer.parseInt(start), Integer.parseInt(length), wtid, true,zydm);
//            } else { //查询该任务对应委托的全部样品，展示出来
//                num = typglMapper.findYpByWtNum(wtid, false,zydm);
//                list = typglMapper.findYpByWt(Integer.parseInt(start), Integer.parseInt(length), wtid, false,zydm);
//            }
        } else { //添加页面展示的所有未被改为抽样的样品
            num = typglMapper.findYpByWtNum(wtid, false,zydm);
            list = typglMapper.findYpByWt(Integer.parseInt(start), Integer.parseInt(length), wtid, false,zydm);
        }
        DatatablesViewPage<Typgl> datatablesViewPage = new DatatablesViewPage<Typgl>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * @Description: 更新样品信息
     * @Param:
     * @return:
     * @Author: Mr.Li
     * @Date: 2018/3/29 0029
     */
    @RequestMapping(value = "/delCyyp",method = RequestMethod.POST)
    @ResponseBody
    public boolean delCyyp(@RequestBody JSONObject json) {
        List<String> list = new ArrayList<String>();
        JSONArray ids = json.getJSONArray("ids");
        for (Object id : ids) {
            JSONObject o = (JSONObject) id;
            list.add(o.getString("id"));
        }
        typglMapper.delCyyp(list);
        return true;
    }

    /**
     * @Description: 更新样品信息
     * @Param:
     * @return:
     * @Author: Mr.Li
     * @Date: 2018/3/29 0029
     */
    @RequestMapping(value = "/updateCyyp",method = RequestMethod.POST)
    @ResponseBody
    public boolean updateCyyp(@RequestBody JSONObject json) {
        List<String> list = new ArrayList<String>();
        JSONArray ids = json.getJSONArray("ids");
        for (Object id : ids) {
            JSONObject o = (JSONObject) id;
            list.add(o.getString("id"));
        }
        typglMapper.updateCyyp(list);
        return true;
    }

    /*样品拆包*/
    @RequestMapping(value = "/ypcb")
    @ResponseBody
    public DatatablesViewPage<Map> ypcb(@RequestParam("start") String start,
                                        @RequestParam("length") String length,
                                        @RequestParam("htmc") String htmc,
                                        @RequestParam("ypmc") String ypmc) throws Exception {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        map.put("htmc", htmc);
        map.put("ypmc", ypmc);
//        map.put("jcjg", jcjg);
        List<Map> typcbs = typglService.selectAll(map);
        int totalCount = 0;
        totalCount = typglService.selectCount(map);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(typcbs);
        return datatablesViewPage;
    }

    /*样品拆包*/
    @RequestMapping(value = "/cf")
    @ResponseBody
    public DatatablesViewPage<Map> cf(
                                        @RequestParam("htmc") String htmc,
                                        @RequestParam("ypmc") String ypmc) throws Exception {
        Map map = new HashMap();
//        map.put("start", Integer.parseInt(start));
 //       map.put("length", Integer.parseInt(length));
//        map.put("id", id);
        map.put("htmc", htmc);
        map.put("ypmc", ypmc);
//        map.put("jcjg", jcjg);
        List<Map> typcbs = typglService.selectAlll(map);
        int totalCount = 0;
        totalCount = typglService.selectCount(map);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(typcbs);
        return datatablesViewPage;
    }

    @RequestMapping(value = "/ypcb_up")
    @ResponseBody
    public String ypcb_up(String id, String ajcjg) throws Exception {
        Typcb typcb = new Typcb();
        typcb.setIds(id);
        typcb.setAjcjg(ajcjg);
        typglService.updateById(typcb);
        return "success";
    }

   @RequestMapping(value = "/ypcf_up")
    @ResponseBody
    public String ypcf_up(long id, String ks1, String ks2, String wbjg, String wbjgsl) throws Exception {
        Typgl typgl = new Typgl();
        typgl.setId(id);
        typgl.setKs1(ks1);
        typgl.setKs2(ks2);
        typgl.setWbjg(wbjg);
        typgl.setWbjgsl(wbjgsl);
        typglService.updatecf(typgl);
        return "success";
    }

    @RequestMapping(value = "/jcypfb_up")
    @ResponseBody
    public String jcypfb_up(long id, String jcks) throws Exception {
        Typgl typgl = new Typgl();
        typgl.setId(id);
        typgl.setJcks(jcks);
        typglService.updatejcypfb(typgl);
        return "success";
    }

    @RequestMapping(value = "/ypps_up")
    @ResponseBody
    public String ypps_up(String id, String jcxmid, String htmc, String ypmc, String apsr, String apssj, String ajcjg, String abglx, String alxr, String atel, String aema, String if_fb, String abz) throws Exception {
        Typps typps = new Typps();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        typps.setIds(id);
//        typcb.setJcxmid(jcxmid);
        typps.setHtmc(htmc);
        typps.setYpmc(ypmc);
        typps.setApsr(apsr);
        typps.setApssj(sdf.parse(apssj));
        typps.setAjcjg(ajcjg);
        typps.setAbglx(abglx);
        typps.setAlxr(alxr);
        typps.setAtel(atel);
        typps.setAema(aema);
        typps.setIf_fb(if_fb);
        typps.setAbz(abz);
        typps.setAzt("001");
        typglService.updatepsById(typps);
//        typglService.upById(typps);
        return "success";
    }
/*
    @RequestMapping(value = "/ypsp_up")
    @ResponseBody
    public String ypsp_up(String id, String jcxmid, String htmc, String ypmc, String apsr, String apssj, String ajcjg, String abglx, String alxr, String atel, String aema, String if_fb, String abz) throws Exception {
        Typsp typsp = new Typsp();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        typsp.setIds(id);
//        typcb.setJcxmid(jcxmid);
        typsp.setHtmc(htmc);
        typsp.setYpmc(ypmc);
        typsp.setApsr(apsr);
        typsp.setApssj(sdf.parse(apssj));
        typsp.setAjcjg(ajcjg);
        typsp.setAbglx(abglx);
        typsp.setAlxr(alxr);
        typsp.setAtel(atel);
        typsp.setAema(aema);
        typsp.setIf_fb(if_fb);
        typsp.setAbz(abz);
        typsp.setAzt("001");
        typglService.updatespById(typsp);
        return "success";
    }*/

    @RequestMapping(value = "/ypcb_jsr")
    @ResponseBody
    public JSONObject ypcb_jsr (@RequestBody JSONObject obj){
        String cbids = obj.getString("cbid");
        String s1 = cbids.replaceAll("]", "");
        String s2 = s1.replaceAll("\\[", "");
        String [] cbid1  = s2.split(",");
        for (String id : cbid1) {
            Typcb typcb = new Typcb();
            String name = CurrentLoginUser.getUser().getName();
            Date currentTime = new Date();
            typcb.setIds(id);
            typcb.setAjsr(name);
            typcb.setAjssj(currentTime);
            typglService.updateJSR(typcb);
        }
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }

    /*条码打印*/
    @RequestMapping(value = "/tmdy")
    @ResponseBody
    public DatatablesViewPage<Map> tmdy(@RequestParam("start") String start,
                                        @RequestParam("length") String length,
                                        @RequestParam("htmc") String htmc,
                                        @RequestParam("ypmc") String ypmc,
                                        @RequestParam("jcxm") String jcxm) throws Exception {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        map.put("htmc", htmc);
        map.put("ypmc", ypmc);
        map.put("jcxm", jcxm);
        List<Map> tmdys = typglService.tmdySelect(map);
        int totalCount = 0;
        totalCount = typglService.tmdyCount(map);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(tmdys);
        return datatablesViewPage;
    }

    /*条码扫描*/
    @RequestMapping(value = "/tmsm")
    @ResponseBody
    public String tmsm() throws Exception {
        return null;
    }

    @RequestMapping(value = "/tmsm_sm")
    @ResponseBody
    public Typcb tmsm_sm(String ypbm, HttpServletRequest request) throws Exception {
        return typglService.tmsmSelect(ypbm);
    }



    @RequestMapping(value = "/findYplzd")
    public @ResponseBody List<Yplzd> findYplzd(){
        List<Yplzd> list=this.typglService.findYplzd();
        return  list;
    }
    @RequestMapping(value = "/ypzbgetRw")
    public @ResponseBody List<Ypzblist> ypzbgetRw(HttpServletRequest request){
        String ypbm = request.getParameter("ypbm");
        List<Ypzblist> list=this.typglService.ypzbgetRw(ypbm);
        return list;
    }
    @RequestMapping(value = "/getYpzbCount")
    public @ResponseBody  Integer getYpzbCount(HttpServletRequest request){
        String ypbm1 = request.getParameter("ypbm");
        return  this.typglService.getYpzbCount(ypbm1);
    }
    @RequestMapping(value = "/addYpzb")
    @ResponseBody
    public Integer addYpzb(Ypzblist ypzblist){
        Integer zbsl1 = Integer.parseInt(ypzblist.getSl());
        for (int i=0;i<zbsl1;i++){
            String zbypbm = ypzblist.getYpbm()+"00"+this.typglMapper.getYpzbCount(ypzblist.getYpbm());
            ypzblist.setZbypbm(zbypbm);
            this.typglService.addYpzb(ypzblist);
        }
        this.typglMapper.updateIFZB(ypzblist.getYpbm());
        return  this.typglService.getYpzbCount(ypzblist.getYpbm());
    }
    @RequestMapping(value = "/deleteYpzb")
    @ResponseBody
    public void deleteYpzb(String zbypbm){
        this.typglService.deleteYpzb(zbypbm);
    }

    @RequestMapping(value = "/insertYpxx")
    @ResponseBody
    public String insertYpxx(HttpServletRequest request){
            Map map = getMap(request.getParameterMap());
            String zydm = map.get("zydm") + "";
            String wtid = map.get("id") + "";
            String dqjszt =map.get("dqjszt")+ "";
            String lx = map.get("lx")+"";
            String lrry = CurrentLoginUser.getUser().getZydm();
            String[] ids = wtid.split(",");
            Arrays.stream(ids).forEach(s_id -> {
                List<Map> mapList = new ArrayList<>();
                List<Typgl> list = new ArrayList<Typgl>();
                Map map1 = new HashMap<String, String>();
                list = typglService.getTypjsAlYpxq(0,1000,s_id,zydm,"203",map1);
                for (Typgl typgl : list) {
                    String[] zydms = zydm.split(",");
                    Arrays.stream(zydms).forEach(s_zydm -> {
                        Map mm = new HashMap();
                        mm.put("zydm", s_zydm);
                        mm.put("ypbm", typgl.getYpbm());
                        mm.put("lrry", lrry);
                        mm.put("lx",lx);
                        mapList.add(mm);
                    });
                }
                System.out.print(mapList);
                typglMapper.insertYpzxry(mapList);
            });
        return "s";
    }

    @RequestMapping(value = "/cbsp")
    @ResponseBody
    public JSONObject updateYpzt (@RequestBody JSONObject obj){
        String cbids = obj.getString("cbid");
        String s1 = cbids.replaceAll("]", "");
        String s2 = s1.replaceAll("\\[", "");
        String [] cbid1  = s2.split(",");
        for (String id : cbid1) {
            typcbMapper.updateAzt(id);
        }
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }

    @RequestMapping(value = "/sptg")
    @ResponseBody
    public JSONObject updatetgYpzt (@RequestBody JSONObject obj){
        String cbids = obj.getString("cbid");
        String s1 = cbids.replaceAll("]", "");
        String s2 = s1.replaceAll("\\[", "");
        String [] cbid1  = s2.split(",");
        for (String id : cbid1) {
            typspMapper.updatetgAzt(id);
        }
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }

    @RequestMapping(value = "/spth")
    @ResponseBody
    public JSONObject updatethYpzt (@RequestBody JSONObject obj){
        String cbids = obj.getString("cbid");
        String s1 = cbids.replaceAll("]", "");
        String s2 = s1.replaceAll("\\[", "");
        String [] cbid1  = s2.split(",");
        for (String id : cbid1) {
            typspMapper.updatethAzt(id);
        }
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }
    @RequestMapping(value = "/cbsptg")
    @ResponseBody
    public JSONObject cbsptg (@RequestBody JSONObject obj){
        String cbids = obj.getString("cbid");
        String s1 = cbids.replaceAll("]", "");
        String s2 = s1.replaceAll("\\[", "");
        String [] cbid1  = s2.split(",");
        for (String id : cbid1) {
            typcbMapper.cbsptg(id);
        }
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }

    @RequestMapping(value = "/cbspth")
    @ResponseBody
    public JSONObject cbspth (@RequestBody JSONObject obj){
        String cbids = obj.getString("cbid");
        String s1 = cbids.replaceAll("]", "");
        String s2 = s1.replaceAll("\\[", "");
        String [] cbid1  = s2.split(",");
        for (String id : cbid1) {
            typcbMapper.cbspth(id);
        }
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }
    /*
     * 打印条码
     */

    @RequestMapping(value = "/ypbmdy",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject ypbmdy(HttpServletRequest request){
        JSONObject json=new JSONObject();
        System.out.println("111111");
        try {
            TscDyypbm tscDyypbm=new TscDyypbm();
            String[] idsArry=request.getParameter("dayins").split(",");
            List dy=new ArrayList();
            for(int i=0;i<idsArry.length;i++){
                dy.add(idsArry[i]);
            }
            List<Map> list=typglService.ypbmdy(dy);
            for(Map map : list){
                tscDyypbm.setParmeter(map,2);//调用打印机  进行打印
            }
            json.put("success",true);
        }
        catch (Exception e){
            json.put("success",false);
        }
        return  json;
    };
    //打印制备编码
    @RequestMapping(value = "/ypzbdy",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject ypzbdy (HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
//        TscMain tsc = new TscMain();
            String[] dArry = request.getParameter("dayins").split(",");
            List dy = new ArrayList();
            for (int i = 0; i < dArry.length; i++) {
                dy.add(dArry[i]);

            }
//        System.out.println(dy);
            List<Map> l = typglService.ypzbdy(dy);
//        for(Map m : l){
//            tsc.createQRcde(m);//调用打印机  进行打印
//        }

            json.put("success", true);
            json.put("data", l);
        } catch (Exception e) {
            e.printStackTrace();
            json.put("success", false);
        }
        return json;
    }
    /*样品审核*/
    @RequestMapping(value = "/ypps")
    @ResponseBody
    public DatatablesViewPage<Map> ypps(@RequestParam("start") String start,
                                        @RequestParam("length") String length,
                                        @RequestParam("htmc") String htmc,
                                        @RequestParam("ypmc") String ypmc,
                                        @RequestParam("jcjg") String jcjg) throws Exception {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        map.put("htmc", htmc);
        map.put("ypmc", ypmc);
        map.put("jcjg", jcjg);
        List<Map> typcbs = typglService.selectpsAll(map);
        int totalCount = 0;
        totalCount = typglService.selectCount(map);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(typcbs);
        return datatablesViewPage;
    }

    /*样品审批*/
    @RequestMapping(value = "/ypsp")
    @ResponseBody
    public DatatablesViewPage<Map> ypsp(@RequestParam("start") String start,
                                        @RequestParam("length") String length,
                                        @RequestParam("htmc") String htmc,
                                        @RequestParam("ypmc") String ypmc,
                                        @RequestParam("jcjg") String jcjg) throws Exception {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        map.put("htmc", htmc);
        map.put("ypmc", ypmc);
        map.put("jcjg", jcjg);
        List<Map> typcbs = typglService.selectspAll(map);
        int totalCount = 0;
        totalCount = typglService.selectspCount(map);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(typcbs);
        return datatablesViewPage;
    }

    //20190906添加打印任务单
    @RequestMapping(value = "/printRwd")
    public String printRwd(HttpServletRequest request){
        String ids = request.getParameter("ypids");
        String lx = request.getParameter("lx");

        Map cxtj = new HashMap();
        if(notNULL(ids)){
            cxtj.put("ids",ids);
        }
        if(notNULL(lx)){
            cxtj.put("lx",lx);
        }
        List<Map> list = typglMapper.getRwdList(cxtj);
        Workbook wb = new Workbook();
        int firstrow =4;//数据起始的行从1开始数
        String xlsName = "";

        ////////////////////合格
        xlsName="rwdFC.xlsx";
        //数据字段 列标题
        String[] lbtHgStr={"jcybm","jcybm","ypmc","scdw","ggxh","scrq","ypzt","ypsl","bzxx"};
        //Excel里的列下标
        //第一列A有序号，所以从B开始填充
        String[] lxbHgStr={"B","C","D","E","F","G","H","I","J"};
        Sheet sheetHg = wb.openSheet("任务单");
        this.addSheetDate(sheetHg,list,lbtHgStr,lxbHgStr,firstrow);
        PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
        //添加保存按钮
        poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        //设置保存页面
//        poCtrl.setSaveFilePage(request.getContextPath() + "savefile.do");
        poCtrl.setWriter(wb);
        //打开excel
        poCtrl.webOpen("/customermanage/doc/"+xlsName, OpenModeType.xlsNormalEdit, "admin");

        return "pageoffice/Excel";
    }

    private int addSheetDate(Sheet sheet,List<Map> list,String[] lbtStr,String[] lxbStr,int firstrow)
    {
        int i = 0;
        int row=0;
        for (; i < list.size(); i++) {

            sheet.openCell("A" + (row + firstrow)).setValue((row+1)+"");
            setBorderStyle(sheet.openCell("A" + (row + firstrow)));

            for(int j=0;j<lbtStr.length;j++)
            {
                String lbt = lbtStr[j];
                String xb = lxbStr[j];
                String lVal = checkNull(list.get(i).get(lbt));
                sheet.openCell(xb + (row + firstrow)).setValue(lVal);
                setBorderStyle(sheet.openCell(xb + (row + firstrow)));
            }
            row++;
        }
        return i;
    }

    private void setBorderStyle(Cell cell) {
        cell.getBorder().setBorderType(XlBorderType.xlAllEdges);
        cell.getBorder().setWeight(XlBorderWeight.xlThin);
        cell.getBorder().setLineColor(Color.black);
        cell.getFont().setSize(11);
    }

    //20190911添加动态科室下拉
    @RequestMapping(value = "/getKsByDmList", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> getKsByDmList(HttpServletRequest request){ return this.typglService.getKsByDmList(); }

    //20191028添加备样
    @RequestMapping(value = "/addByxx",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject addByxx (HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map data = getQueryTj(request);
            Map params = getMap(request.getParameterMap());
            String zydm = CurrentLoginUser.getUser().getZydm();
            data.putAll(params);
            String id = data.get("id") + "";
            String ids[] = id.split(",");
            List<Map> mapList = new ArrayList<>();
            for (int i = 0; i < ids.length; i++) {
                Map check = new HashMap();
                check.put("ypid",ids[i]);
                long count = this.typglMapper.checkByCount(check);
                if(count>0){
                    json.put("error", false);
                    json.put("message", "该样品已存在备样");
                    return json;
                }else {
                    Map m = new HashMap();
                    m.put("ypmc", data.get("ypmc"));
                    m.put("id", ids[i]);
                    m.put("ypbm", data.get("ypbm"));
                    m.put("zydm", zydm);
                    m.put("bysl", data.get("bysl"));
                    m.put("bysldw", data.get("bysldw"));
                    m.put("bzxx", data.get("bzxx"));
                    mapList.add(m);
                }
            }
            typglMapper.addByxx(mapList);
            json.put("success", true);
        } catch (Exception e) {
            e.printStackTrace();
            json.put("error", false);
            json.put("message", "保存失败");
        }
        return json;
    }

    //20191029根据获取备样信息
    @ResponseBody
    @RequestMapping("/getByList")
    public DatatablesViewPage getGzltjByRy(HttpServletRequest request){
        Map map = getQueryTj(request);
        String ypmc = request.getParameter("ypmc");
        String ypbm = request.getParameter("ypbm");
        if(ypmc!=null && ypmc.trim().length()!=0)
        {
            map.put("ypmc",ypmc);
        }
        if(ypbm!=null && ypbm.trim().length()!=0)
        {
            map.put("ypbm",ypbm);
        }
//        if(rqq!=null && rqq.trim().length()!=0)
//        {
//            map.put("rqq",rqq);
//        }
//        if(rqz!=null && rqz.trim().length()!=0)
//        {
//            map.put("rqz",rqz);
//        }

        List<Map> list=this.typglService.getByList(map);
        long count = this.typglService.getByListNum(map);
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        datatablesViewPage.setiTotalDisplayRecords(count);
        datatablesViewPage.setiTotalRecords(count);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    //20191029删除备样信息
    @RequestMapping(value = "/deleteByxx",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject deleteByxx (HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map data = getQueryTj(request);
            Map params = getMap(request.getParameterMap());
            String zydm = CurrentLoginUser.getUser().getZydm();
            data.putAll(params);
            String id = data.get("id") + "";
            String ids[] = id.split(",");
            List<Map> mapList = new ArrayList<>();
            for (int i = 0; i < ids.length; i++) {
                    Map m = new HashMap();
                    m.put("id", ids[i]);
                    m.put("zydm",zydm);
                    mapList.add(m);
                }
            typglMapper.deleteByxx(mapList);
            json.put("success", true);
        } catch (Exception e) {
            e.printStackTrace();
            json.put("error", false);
            json.put("message", "删除失败");
        }
        return json;
    }
    //20191030获取管理备样信息
    @RequestMapping(value = "/getOneByxx",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject getOneByxx (HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map data = getQueryTj(request);
//            Map params = getMap(request.getParameterMap());
////            String zydm = CurrentLoginUser.getUser().getZydm();
//            data.putAll(params);
//            String id = data.get("id") + "";
            String id = request.getParameter("ypid");
            String ids[] = id.split(",");
            List<Map> mapList = new ArrayList<>();
            for (int i = 0; i < ids.length; i++) {
                Map m = new HashMap();
                m.put("id", ids[i]);
                mapList.add(m);
            }
            List<Map> info = typglMapper.getOneByxx(mapList);
            json.put("data",info);
            json.put("success", true);
        } catch (Exception e) {
            e.printStackTrace();
            json.put("error", false);
            json.put("message", "后台获取失败");
        }
        return json;
    }
    //20191029更新备样信息
    @RequestMapping(value = "/updateByxx",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject updateByxx (HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map data = getQueryTj(request);
            Map params = getMap(request.getParameterMap());
            String zydm = CurrentLoginUser.getUser().getZydm();
            data.putAll(params);
            String id = data.get("id") + "";
            String ids[] = id.split(",");
            List<Map> mapList = new ArrayList<>();
            for (int i = 0; i < ids.length; i++) {
                Map m = new HashMap();
                m.put("id", ids[i]);
                m.put("bysl", data.get("bysl"));
                m.put("zydm", zydm);
                m.put("bcsj", data.get("bcsj"));
                m.put("ifhg", data.get("yphgbz"));
                m.put("bzxx", data.get("bzxx"));
                mapList.add(m);
            }
            typglMapper.updateByxx(mapList);
            json.put("success", true);
        } catch (Exception e) {
            e.printStackTrace();
            json.put("error", false);
            json.put("message", "修改失败");
        }
        return json;
    }
}
