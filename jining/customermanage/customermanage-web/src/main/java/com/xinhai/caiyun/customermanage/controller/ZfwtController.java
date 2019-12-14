package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.data.PictureRenderData;
import com.deepoove.poi.util.BytePictureUtils;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.commonmanager.api.ExcelUtil;
import com.xinhai.caiyun.commonmanager.api.MaxAtomicInteger;
import com.xinhai.caiyun.commonmanager.api.Xzqy;
import com.xinhai.caiyun.customermanage.api.BgglService;
import com.xinhai.caiyun.customermanage.api.Tqywt;
import com.xinhai.caiyun.customermanage.api.Typgl;
import com.xinhai.caiyun.customermanage.api.Tzfwt;
import com.xinhai.caiyun.customermanage.dao.*;
import com.xinhai.caiyun.customermanage.service.PageConfigService;
import com.xinhai.caiyun.customermanage.service.TqywtService;
import com.xinhai.caiyun.customermanage.service.TypglService;
import com.xinhai.caiyun.customermanage.service.TzfwtService;
import com.xinhai.caiyun.systemmanager.api.Trwgl;
import com.xinhai.caiyun.systemmanager.api.TscPrintUtil;
import com.xinhai.caiyun.systemmanager.api.ZfwtPrintUtil;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import com.xinhai.usermanager.service.UserService;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;
import com.zhuozhengsoft.pageoffice.wordwriter.WordDocument;
import org.apache.zookeeper.ZooDefs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import service.BmgzService;
import service.TrwglService;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by  on 2018/3/29 0029.
 *
 * @escription: 修改记录controller
 * @tableName:
 */
@Controller
@RequestMapping("/zfwt")
public class ZfwtController {
    @Autowired
    private TqywtMapper tqywtMapper;

    @Autowired
    private TzfwtService tzfwtService;

    @Autowired
    private TqywtService tqywtService;

    @Autowired
    private MaxAtomicInteger maxAtomicInteger;

    @Autowired
    private TrwglService trwglService;

    @Autowired
    private TypglService typglService;

    @Autowired
    private TypglMapper typglMapper;

    @Autowired
    private BgglService bgglService;

    @Autowired
    private TzfwtMapper tzfwtMapper;

    @Autowired
    private PageConfigService configService;

    @Autowired
    private BmgzService bmgzService;

    @Autowired
    private TLZypglMapper tlZypglMapper;

    /**
     * 注入UserService
     */
    @Autowired
    private UserService userService;

    /**导入一对一委托基本信息
     */
    @RequestMapping(value = "/importydywtExcel1", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject importydywtExcel(HttpServletRequest request) throws Exception {
        JSONObject jo = new JSONObject();
        try {
            //获取上传的文件
            MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
            MultipartFile file = multipart.getFile("upfile");
            InputStream in = file.getInputStream();
            /*String name = file.getOriginalFilename();*/
            //数据导入
            tzfwtService.importydywtExcel(in, file);
            in.close();
            jo.put("success",true);
        }catch (Exception e){
            jo.put("success",false);
        }
        return jo;
    }
    @RequestMapping(value = "/downloadydywtExcel", method = RequestMethod.GET)
    @OperateLog(describe = "下载导入模板")
    @ResponseBody
    public void downloadydywtExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String importUrl = "/ExcelModels/ydywyxx.xlsx";//导入模板的路径
        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName=" + new String("一对一委托信息.xlsx".getBytes("GBK"), "ISO-8859-1"));
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
    @Autowired
    private BgglMapper bgglMapper;

    /**
     * 政府委托 新增方法
     */
    @RequestMapping(value = "/saveZfwt")
    @ResponseBody
    public JSONObject saveZfwt(@RequestBody String khxx) {
        Tqywt tqywt = JSON.parseObject(khxx, Tqywt.class);
        Typgl typgl = JSON.parseObject(khxx, Typgl.class);
        tqywt.setIf_sl("1");
        tqywt.setType("003");
        tqywt.setCxzt("002"); //查询状态 002  004  005 政府委托查询条件
        typgl.setIf_th("1");
        tqywt.setLrry(CurrentLoginUser.getUser().getZydm());
        tqywt.setWtslr(CurrentLoginUser.getUser().getZydm());
        //typgl.setIf_cy("1");
        Map queryMap = new HashMap();
        queryMap.put("cydbm", tqywt.getCydbm());
        queryMap.put("ypmc", typgl.getYpmc());
        queryMap.put("zxbz", tqywt.getYpzxbz());
        int wtcount = tqywtService.findWtForSave(queryMap);
        if (wtcount > 0) {
            JSONObject object = new JSONObject();
            object.put("success", false);
            object.put("message", "该样品信息已经存在。（委托单编码、样品名称、执行标准相同的信息已经存在）");
            return object;
        }
        //2019.08.26肥城要求 不自动生成抽样单号 ，抽样单号 采用输入的 样品编码
        String wtid = tqywt.getCydbm();//bmgzService.getMaxYpbm(tqywt.getRwlx());
        tqywt.setWtid(wtid);
        tzfwtService.createTzfwt(tqywt);
        typgl.setYpbm(wtid);
        typgl.setWtid(wtid);
        typglService.createTypgl(typgl);
        JSONObject object = new JSONObject();
        object.put("success", true);
        object.put("wtid", wtid);
        object.put("id", "");   //id赋值空前端判断如果为空，编辑页面每次保存都新增
        return object;
    }

    /**
     * 新增抽样单
     */
    @RequestMapping(value = "/saveyddcy")
    @ResponseBody
    public JSONObject saveyddcy(@RequestBody String khxx) {
        JSONObject object = new JSONObject();
        try{
            Tqywt tqywt = JSON.parseObject(khxx, Tqywt.class);
            tqywt.setType("004");
            tqywt.setIf_sl("1");
            if(tqywtMapper.checkWtid(tqywt.getWtid()).size()==0){//等于0  就说明数据库没有这个wtid   所以可以用
                tzfwtService.createTzfwt(tqywt);
            }
            object.put("id", tqywt.getId());
            object.put("success", true);
        }catch (Exception e){
            object.put("success", false);
        }
        return object;
    }

    /**
     * 一对多中增加样品的信息
     */
    @RequestMapping(value = "/saveYddcyyp/{wtid}",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveyddcyyp(@RequestBody String khxx, @PathVariable("wtid") String wtid) {
        JSONObject object = new JSONObject();
        try {
            Typgl typgl = JSON.parseObject(khxx, Typgl.class);
            typgl.setWtid(wtid);
            typgl.setIf_cy("1");
            if(tqywtMapper.checkYpbm(typgl.getYpbm()).size()==0){
                typglService.createTypgl(typgl);
            }
            object.put("success", true);
        }catch (Exception e){
            object.put("success", false);
        }

        return object;
    }
    /**
     * @param id
     * @return
     * @Description: 获取单个政府委托数据
     */
    @RequestMapping(value = "/getZfwt")
    @ResponseBody
    public JSONObject getZfwt(@RequestParam("id") String id) {
        Map map = tzfwtService.findTzfwt(id);
        // 如果id查找返回null，没有数据，则按照抽验单编码在查询一次
        if (map == null) {
            List<Map> rel = tzfwtService.findTzfwtByCydbm(id);
            if (rel != null && rel.size() > 0) {
                map = rel.get(0);
            }
        }
        JSONObject object = new JSONObject();
        object.put("success", true);
        object.put("data", map);
        return object;
    }

    /**
     * @param id
     * @return
     * @Description: 获取单个一对多抽样样品信息
     */
    @RequestMapping(value = "/getyddcyyp")
    @ResponseBody
    public JSONObject getyddcyyp(@RequestParam("id") String id) {
        JSONObject object = new JSONObject();
        try {
            Typgl typgl = tzfwtMapper.getyddcyyp(id);
            object.put("data", typgl);
            object.put("success", true);
        }catch (Exception e){
            object.put("success", false);
        }
        return object;
    }
    /**
     * 获得单个抽样信息
     */
    @RequestMapping(value = "/getyddcy")
    @ResponseBody
    public JSONObject getyddcy(@RequestParam("id") String id) {
        JSONObject object = new JSONObject();
        try{
            Tqywt tzfwt = tzfwtMapper.findYddcy(id);
            object.put("data", tzfwt);
            object.put("success", true);
        }catch (Exception e){
            object.put("success", false);
        }
        return object;
    }

    /**
     * 更新抽样样品的信息
     */
    @RequestMapping(value = "/updateYddcyypxx/{id}", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject updateYddcyypxx(@RequestBody String khxx, @PathVariable("id") String id) {
        JSONObject object = new JSONObject();
        try{
            Typgl typgl = JSON.parseObject(khxx, Typgl.class);
            typgl.setId(Long.parseLong(id));
            typglService.updateYddcyypxx(typgl);
            object.put("success", true);
        }catch (Exception e){
            object.put("success", false);
        }
        return object;
    }

    /**
     *
     */
    @RequestMapping(value = "/delYddcyybxx/{id}", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject delYddcyybxx(@PathVariable("id") String id) {
        typglMapper.deleteYddcyypxx(id);
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }

    /**
     *
     */
    @RequestMapping(value = "/updateZfwt/{id}", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject updateZfwt(@RequestBody String khxx, @PathVariable("id") String id) {
        Tqywt tzfwt = JSON.parseObject(khxx, Tqywt.class);
        Typgl typgl = JSON.parseObject(khxx, Typgl.class);
        tzfwt.setId(Long.parseLong(id));
        tzfwt.setLrry(CurrentLoginUser.getUser().getZydm());
        tzfwt.setWtid(tzfwt.getCydbm());
        Map queryMap = new HashMap();
        queryMap.put("cydbm", tzfwt.getCydbm());
        queryMap.put("ypmc", typgl.getYpmc());
        queryMap.put("zxbz", tzfwt.getYpzxbz());
        queryMap.put("id", id);
        int wtcount = tqywtService.findWtForSave(queryMap);
        if (wtcount > 0) {
            JSONObject object = new JSONObject();
            object.put("success", false);
            object.put("message", "该样品信息已经存在。（委托单编码相同的信息已经存在）");
            return object;
        }
        tzfwtService.updateTzfwt(tzfwt);

        typgl.setYpbm(tzfwt.getCydbm());
        typglService.updateTypgl(typgl);
        JSONObject object = new JSONObject();
        object.put("success", true);
        object.put("id", id);   //返回id，前端判断id有值，每次保存都是修改
        return object;
    }

    /**
     *更新一对多抽样单信息
     */
    @RequestMapping(value = "/updateyddcy/{id}", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject updateyddcy(@RequestBody String khxx, @PathVariable("id") String id) {
        JSONObject object = new JSONObject();
        try {
            Tqywt tzfwt = JSON.parseObject(khxx, Tqywt.class);
            tzfwt.setId(Long.parseLong(id));
            tzfwtService.updateTzfwt(tzfwt);
            object.put("id", id);
            object.put("success", true);
        }catch (Exception e){
            object.put("success", false);
        }
        return object;
    }

    /**
     *删除委托信息
     */
    @RequestMapping(value = "/delZfwt/{id}", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject delZfwt(@PathVariable("id") String id) {
        JSONObject object = new JSONObject();
        try{
            int zbcount = tlZypglMapper.findZbByWtid(id);
            if (zbcount > 0) {
                object.put("success", false);
                object.put("message", "该委托已存在后续环节业务数据，不能删除！");
            } else {
                tzfwtService.deleteTzfwtbyId(id);
                object.put("success", true);
            }

        }catch (Exception e){
            object.put("success", false);
            object.put("message", "服务器异常，删除失败！");
        }
        return object;
    }
    /**
     * 获取政府委托列表(初始跳转时)
     */
    @RequestMapping(value = "/getZfwtAll")
    @OperateLog(describe = "政府委托列表")
    @ResponseBody
    public DatatablesViewPage<Tqywt> getZfwtAll(@RequestParam("start") String start,
                                                @RequestParam("length") String length,
                                                @RequestParam("searchText1") String searchText1,
                                                @RequestParam("searchText2") String searchText2,
                                                @RequestParam("cydh") String cydh,
                                                @RequestParam(value = "searchText3",required = false) String searchText3,
                                                @RequestParam("ny") String ny) throws Exception {
        List<Tqywt> list = new ArrayList<Tqywt>();
        if (searchText1.equals("")) {
            searchText1 = null;
        }
        if (cydh.equals("")) {
            cydh = null;
        }
        if (searchText2.equals("")) {
            searchText2 = null;
        }
        if (searchText3 == null || searchText3.equals("")) {
            searchText3 = null;
        }
        if (ny == null || ny.equals("")) {
            ny = null;
        }
        int num = 0;

        list = tzfwtService.findTzfwtAll(Integer.parseInt(start), Integer.parseInt(length),searchText1,searchText2,cydh,searchText3,ny);
        num = tzfwtService.findTzfwtAllNums(Integer.parseInt(start), Integer.parseInt(length),searchText1,searchText2,cydh,searchText3,ny);

        DatatablesViewPage<Tqywt> datatablesViewPage = new DatatablesViewPage<Tqywt>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 获得一对多样品的信息
     */
    @RequestMapping(value = "/getYddcyypAll")
    @ResponseBody
    public DatatablesViewPage<Typgl> getYddcyypAll(@RequestParam("start") String start,
                                                @RequestParam("length") String length,
                                                @RequestParam("searchText1") String searchText1,
                                                @RequestParam("wtid") String wtid) throws Exception {
        List<Typgl> list = new ArrayList<Typgl>();
        if (searchText1.equals("")) {
            searchText1 = null;
        }
        String wtidStr="";
        if (wtid.equals("")) {
            wtid = null;
        }else if(wtid.indexOf(",")!=-1)
        {
            wtidStr = wtid.replaceAll(",","','");
            wtidStr = "'"+wtidStr+"'";
        }else{
            wtidStr = "'"+wtid+"'";
        }
        int num = 0;
        list = tzfwtService.findYddcyypAll(Integer.parseInt(start), Integer.parseInt(length), searchText1, wtidStr);
        num = tzfwtService.findYddcyypAllNums(Integer.parseInt(start), Integer.parseInt(length), searchText1, wtidStr);
        DatatablesViewPage<Typgl> datatablesViewPage = new DatatablesViewPage<Typgl>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 保存企业委托
     */
    @RequestMapping(value = "/saveQywt")
    @ResponseBody
    public JSONObject saveQywt(@RequestBody String khxx) {
        String w = "";
        JSONObject jsonObject = JSONObject.parseObject(khxx);
        //20190319修改。自定义委托编码


        Tqywt tqywt = JSON.parseObject(khxx, Tqywt.class);
        tqywt.setLrry(CurrentLoginUser.getUser().getZydm());
        //2019.08.26 肥城要求 取消 抽样单号 自动生成  所有抽样单号 改为 输入的  委托单号
        w = tqywt.getCydbm();//委托单编号 //bmgzService.getMaxYpbm(tqywt.getRwlx());
       // SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
       // tqywt.setLrrq(sdf.format(new Date().getTime()));
        tqywt.setWtid(w);
        tqywt.setIf_sl("0");
        Map queryMap = new HashMap();
        queryMap.put("cydbm", tqywt.getCydbm());
        queryMap.put("ypmc", jsonObject.getString("ypmc"));
        queryMap.put("zxbz", tqywt.getYpzxbz());
        int wtcount = tqywtService.findWtForSave(queryMap);
        if (wtcount > 0) {
            JSONObject object = new JSONObject();
            object.put("success", false);
            object.put("message", "该样品信息已经存在。（委托单编码、样品名称、执行标准相同的信息已经存在）");
            return object;
        }

        //受理信息默认填入。新增保存即为受理状态
        String if_sl = "1";
        String wtslr = CurrentLoginUser.getUser().getZydm();
        SimpleDateFormat rq = new SimpleDateFormat("yyyy-MM-dd");
        String slrq = rq.format(new Date());
        tqywt.setIf_sl(if_sl);
        tqywt.setWtslr(wtslr);
        tqywt.setSlrq(slrq);
        tqywtService.createTqywt(tqywt);
        //20190319 Lims3.0修改。创建委托时不创建样品信息
        Typgl typgl = new Typgl();
        typgl.setIf_sgr(jsonObject.getString("if_sgr"));
        typgl.setIf_ssg(jsonObject.getString("if_ssg"));
        typgl.setIf_th(jsonObject.getString("if_th"));
        typgl.setWtid(tqywt.getWtid());
        String y = w;
        typgl.setYpbm(y);
        typgl.setYpmc(jsonObject.getString("ypmc"));
        typgl.setSb(jsonObject.getString("sb"));
        typgl.setGgxh(jsonObject.getString("ggxh"));
        typgl.setYpdj(jsonObject.getString("ypdj"));
        typgl.setYpsl(jsonObject.getString("ypsl"));
        typgl.setYpdw(jsonObject.getString("ypdw"));
        typgl.setScrq(jsonObject.getString("scrq"));
        typgl.setYpphhbh(jsonObject.getString("ypphhbh"));
        typgl.setYpzt(jsonObject.getString("ypzt"));
        typgl.setScdw(jsonObject.getString("scdw"));
        typgl.setYpbctj(jsonObject.getString("ypbctj"));
        typgl.setYbjs(jsonObject.getString("ybjs"));
        typgl.setBzq(jsonObject.getString("bzq"));
        typgl.setYpwt(jsonObject.getString("ypwt"));
        typgl.setIf_by(jsonObject.getString("if_by"));
        typgl.setBysl(jsonObject.getString("bysl"));
        typgl.setQyyply(jsonObject.getString("qyyply"));
        typgl.setCcyqqt(jsonObject.getString("ccyqqt"));
        typgl.setCydd(jsonObject.getString("cydd"));
        typgl.setWtcyfs(jsonObject.getString("wtcyfs"));
        typgl.setFtbh(jsonObject.getString("ftbh"));
        typgl.setYpzxbz(jsonObject.getString("ypzxbz"));
        typgl.setIf_cy("0");
        typgl.setRkrq(jsonObject.getString("rkrq"));
        typglService.createTypgl(typgl);
        JSONObject object = new JSONObject();
        object.put("success", true);
        object.put("wtid", w);
        //不返回ID，每次新增后可以继续新增
        object.put("id", "");
        return object;
    }

    /**
     * @param id
     * @return
     * @Description: 获取单个政府委托数据
     */
    @RequestMapping(value = "/getQywt", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject getQywt(@RequestParam("id") String id) {
        Tqywt tqywt = tqywtService.findTqywt(id);
        JSONObject object = new JSONObject();
        object.put("success", true);
        object.put("data", tqywt);
        return object;
    }

    /**
     * @Description: dataTables表格数据
     * @Param:
     * @return:
     * @Author: Mr.Li
     * @Date: 2018/3/29 0029
     */
    @RequestMapping(value = "/updateQywt/{id}")
    @ResponseBody
    public JSONObject updateQywt(@RequestBody String khxx, @PathVariable("id") String id) {
        JSONObject jsonObject = JSONObject.parseObject(khxx);
        Tqywt tqywt = JSON.parseObject(khxx, Tqywt.class);
        tqywt.setId(Long.parseLong(id));
        tqywt.setLrry(CurrentLoginUser.getUser().getZydm());
        Map queryMap = new HashMap();
        queryMap.put("cydbm", tqywt.getCydbm());
        queryMap.put("ypmc", jsonObject.getString("ypmc"));
        queryMap.put("zxbz", tqywt.getYpzxbz());
        queryMap.put("id", tqywt.getId());
        int wtcount = tqywtService.findWtForSave(queryMap);
        if (wtcount > 0) {
            JSONObject object = new JSONObject();
            object.put("success", false);
            object.put("message", "该样品信息已经存在。（委托单编码、样品名称、执行标准相同的信息已经存在）");
            return object;
        }
        //受理信息默认填入。新增保存即为受理状态
        String if_sl = "1";
        String wtslr = CurrentLoginUser.getUser().getZydm();
        SimpleDateFormat rq = new SimpleDateFormat("yyyy-MM-dd");
        String slrq = rq.format(new Date());
        tqywt.setIf_sl(if_sl);
        tqywt.setWtslr(wtslr);
        tqywt.setSlrq(slrq);
        tqywtService.updateTqywt(tqywt);
        //20190319 Lims3.0修改。创建委托时不创建样品信息
        String findwtidw = tqywtService.findwtidw(id);
        Typgl typgl = new Typgl();
        typgl.setWtid(jsonObject.getString("wtid"));
        typgl.setYpmc(jsonObject.getString("ypmc"));
        typgl.setSb(jsonObject.getString("sb"));
        typgl.setGgxh(jsonObject.getString("ggxh"));
        typgl.setYpdj(jsonObject.getString("ypdj"));
        typgl.setYpsl(jsonObject.getString("ypsl"));
        typgl.setYpdw(jsonObject.getString("ypdw"));
        typgl.setScrq(jsonObject.getString("scrq"));
        typgl.setYpphhbh(jsonObject.getString("ypphhbh"));
        typgl.setYpzt(jsonObject.getString("ypzt"));
        typgl.setScdw(jsonObject.getString("scdw"));
        typgl.setYpbctj(jsonObject.getString("ypbctj"));
        typgl.setYbjs(jsonObject.getString("ybjs"));
        typgl.setBzq(jsonObject.getString("bzq"));
        typgl.setYpwt(jsonObject.getString("ypwt"));
        //typgl.setYpbm(jsonObject.getString("ypbm"));
        typgl.setIf_sgr(jsonObject.getString("if_sgr"));
        typgl.setIf_ssg(jsonObject.getString("if_ssg"));
        typgl.setIf_th(jsonObject.getString("if_th"));
        typgl.setIf_by(jsonObject.getString("if_by"));
        typgl.setIf_cy(jsonObject.getString("0"));
        typgl.setBysl(jsonObject.getString("bysl"));
        typgl.setQyyply(jsonObject.getString("qyyply"));
        typgl.setCcyqqt(jsonObject.getString("ccyqqt"));
        typgl.setCydd(jsonObject.getString("cydd"));
        typgl.setWtcyfs(jsonObject.getString("wtcyfs"));
        typgl.setFtbh(jsonObject.getString("ftbh"));
        typgl.setYpzxbz(jsonObject.getString("ypzxbz"));
        typgl.setRkrq(jsonObject.getString("rkrq"));
        typglService.updateTypgl(typgl);
        JSONObject object = new JSONObject();
        object.put("success", true);
        object.put("id", id);
        object.put("wtid", typgl.getWtid());
        return object;
    }

    /**
     * @Description: dataTables表格数据
     * @Param:
     * @return:
     * @Author: Mr.Li
     * @Date: 2018/3/29 0029
     */
    @RequestMapping(value = "/delQywt/{id}", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject delQywt(@PathVariable("id") String id) {
        JSONObject object = new JSONObject();
        int zbcount = tlZypglMapper.findZbByWtid(id);
        if (zbcount > 0) {
            object.put("success", false);
            object.put("message", "该委托已存在后续环节业务数据，不能删除！");
        } else {
            tqywtService.deleteTqywtbyId(id);
            object.put("success", true);
        }

        return object;
    }

    @RequestMapping(value = "/updateYpzt")
    @ResponseBody
    public JSONObject updateYpzt (@RequestBody JSONObject obj){
        String wtids = obj.getString("wtid");
        String s1 = wtids.replaceAll("]", "");
        String s2 = s1.replaceAll("\\[", "");
        String [] wtid1  = s2.split(",");
        for (String id : wtid1) {
            String findwtidw = tqywtMapper.findwtidw(id);
            String findypid = tqywtMapper.findypid(findwtidw);
            tqywtMapper.updateYpzt(findypid);
        }
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }

    /**
     * 获取企业委托列表(初始跳转时)
     * @param searchText 客户名称
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getQywtAll")
    @OperateLog(describe = "企业委托列表")
    @ResponseBody
    public DatatablesViewPage<Tqywt> getQywtAll(@RequestParam("start") String start,
                                                @RequestParam("length") String length,
                                                @RequestParam("searchText") String searchText,
                                                @RequestParam("searchText1") String searchText1,
                                                @RequestParam("type") String type,
                                                @RequestParam("ypbm") String ypbm,
                                                @RequestParam("ny") String ny) throws Exception {
        List<Tqywt> list = new ArrayList<Tqywt>();

        if (searchText.equals("")) {
            searchText = null;
        }
        if (searchText1.equals("")) {
            searchText1 = null;
        }
        if (ypbm.equals("")) {
            ypbm = null;
        }
        if (ny.equals("")) {
            ny = null;
        }
        int num = 0;



        list = tqywtService.findTqywtAll(Integer.parseInt(start), Integer.parseInt(length), searchText, searchText1, type,ypbm,ny);
        num = tqywtService.findTqywtAllNums(Integer.parseInt(start), Integer.parseInt(length), searchText, searchText1, type,ypbm,ny);

        DatatablesViewPage<Tqywt> datatablesViewPage = new DatatablesViewPage<Tqywt>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 获取企业委托列表(初始跳转时)
     */
    @RequestMapping(value = "/getQywtAllsy")
    @OperateLog(describe = "企业委托列表")
    @ResponseBody
    public DatatablesViewPage<Tqywt> getQywtAllsy(@RequestParam("start") String start,
                                                @RequestParam("length") String length,
                                                @RequestParam("searchText") String searchText) throws Exception {
        List<Tqywt> list = new ArrayList<Tqywt>();

        if (searchText.equals("")) {
            searchText = null;
        }
        int num = 0;


        list = tqywtService.findTqywtAllsy(Integer.parseInt(start), Integer.parseInt(length), searchText);
        num = tqywtService.findTqywtAllNumssy(Integer.parseInt(start), Integer.parseInt(length), searchText);

        DatatablesViewPage<Tqywt> datatablesViewPage = new DatatablesViewPage<Tqywt>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 获取全部企业委托信息
     *
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/findAllWt", method = RequestMethod.GET)
    @OperateLog(describe = "全部委托列表")
    @ResponseBody
    public JSONObject findAllWt() {
        List<Tzfwt> list = tzfwtService.findAllWt();
        JSONObject obj = new JSONObject();
        obj.put("success", true);
        obj.put("data", list);
        return obj;
    }

    /**
     * 导入前的下载模板
     *
     * @param request  request
     * @param response response
     * @throws IOException 抛出IO异常
     */
    @RequestMapping(value = "/downExcel/{type}", method = RequestMethod.GET)
    @OperateLog(describe = "下载导入模板")
    @ResponseBody
    public void download(HttpServletRequest request, HttpServletResponse response, @PathVariable("type") String type) throws IOException {
        String importUrl = "/ExcelModels/import.xls";
       /* String importUrl = request.getParameter("importUrl");//导入模板的路径*/
        /*String path = request.getSession().getServletContext().getRealPath("/"); // 获取项目动态绝对路径*/
       /* String importUrl = path.substring(0, path.lastIndexOf("standalone"))
                + "ExcelModels/import.xls";
        *//*String importUrl = "/ExcelModels/import.xls";*//*
        if (type.equals("zf")) {
            importUrl = path.substring(0, path.lastIndexOf("standalone"))
                    + "ExcelModels/import.xls";

            *//*importUrl = path.substring(0, path.lastIndexOf("standalone"))
                    + "fileManage\\importZF.xls";*//*
            *//* importUrl = "\\ExcelModels\\cydxxglmodal.xlsx";*//*
        }*/

        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName=import.xls");
        //用于记录以完成的下载的数据量，单位是byte
        long downloadedLength = 0L;
        try {
            //打开本地文件流
            InputStream inputStream = this.getClass().getResourceAsStream(importUrl);
           /* InputStream inputStream = new FileInputStream(importUrl);*/
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

    /**
     * 模板导入
     *
     * @param request HttpServletRequest
     * @return List<Tzfwt> 返回的list集合
     * @throws Exception 异常
     */
    @RequestMapping(value = "/importExcel/{type}", method = {RequestMethod.GET, RequestMethod.POST})
    @OperateLog(describe = "模板导入")
    @ResponseBody
    public JSONObject importExcel(HttpServletRequest request, @PathVariable("type") String type) throws Exception {
        JSONObject returnData = new JSONObject();
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        System.out.println("通过传统方式form表单提交方式导入excel文件！");

        InputStream in = null;
        MultipartFile file = multipartRequest.getFile("upfile");
        if (file.isEmpty()) {
            throw new Exception("文件不存在！");
        }
        in = file.getInputStream();
        List<Tzfwt> list = new ArrayList<Tzfwt>();
        List<Tqywt> list2 = new ArrayList<Tqywt>();
        if (type.equals("zf")) {
            try {
                ExcelUtil<Tzfwt> util = new ExcelUtil<Tzfwt>(Tzfwt.class); // 创建excel工具类
                list = util.importExcel("政府委托信息导入", in); // 导入
            } catch (Exception e) {
                e.printStackTrace();
            }

            if (list != null && list.size() > 0) {
                Map<String, Object> m = this.checkList(list, null);

                if (!(boolean) m.get("success")) {
                    returnData.put("success", false);
                    returnData.put("message", m.get("message"));
                    return returnData;
                } else { //保存数据

                    this.insertList(list, null, type);
                    returnData.put("success", true);
                    returnData.put("message", "成功！");
                }
            } else {
                returnData.put("success", false);
                returnData.put("message", "导入不得为空！");
            }

        } else {
            try {
                ExcelUtil<Tqywt> util2 = new ExcelUtil<Tqywt>(Tqywt.class); // 创建excel工具类
                list2 = util2.importExcel("企业委托信息导入", in); // 导入
            } catch (Exception e) {
                e.printStackTrace();
            }

            if (list2 != null && list2.size() > 0) {
                Map<String, Object> m = this.checkList(null, list2);

                if (!(boolean) m.get("success")) {
                    returnData.put("success", false);
                    returnData.put("message", m.get("message"));
                    return returnData;
                } else { //保存数据

                    this.insertList(null, list2, type);
                    returnData.put("success", true);
                    returnData.put("message", "成功！");
                }
            } else {
                returnData.put("success", false);
                returnData.put("message", "导入不得为空！");
            }
        }

        return returnData;

    }

    /**
     * 对导入的list数据进行加密并批量插入数据库
     *
     * @param list 插入的list
     * @return 正确
     * @throws Exception 异常
     */
    private boolean insertList(List<Tzfwt> list, List<Tqywt> list2, String type) throws Exception {

        if (type.equals("zf")) {
            for (Tzfwt tzfwt : list) {

                String wtid = maxAtomicInteger.getMaxWtbm();
//                tzfwt.setWtid(wtid);
//                tzfwt.setType("001"); //委托类型 001政府  002企业
//                tzfwt.setLrry(CurrentLoginUser.getUser().getZydm());
//                tzfwt.setBmdm(CurrentLoginUser.getUser().getBmdm());
//                tzfwt.setHtbm(maxAtomicInteger.getMaxHtbm());
//                tzfwtService.createTzfwt(tqtwt);

                Trwgl trwgl = new Trwgl();
//                trwgl.setRwmc(tzfwt.getDwmc() + "政府委托抽样任务");
                trwgl.setRwType("001"); // 001政府  002企业
                trwgl.setBlzt("002"); //办理中
                trwgl.setSjly("1"); //数据来源
                trwgl.setWtid(wtid);
//                trwgl.setWtdwmc(tzfwt.getDwmc());
                trwgl.setWtType("001");
                trwgl.setLrry(CurrentLoginUser.getUser().getZydm());
                trwgl.setBmdm(CurrentLoginUser.getUser().getBmdm());
                trwglService.createTrwgl(trwgl);
            }
        } else {
            for (Tqywt tqywt : list2) {
//                Tzfwt tzfwt = new Tzfwt();
                Tqywt tqywt1 = new Tqywt();
                String wtid = maxAtomicInteger.getMaxWtbm();
//                tzfwt.setWtid(wtid);
                tqywt1.setWtid(wtid);
//                tzfwt.setDwmc(tqywt.getDwmc());
//                tzfwt.setHtmc(tqywt.getYpmc());
//                tzfwt.setYwmc(tqywt.getScdw());
//                tzfwt.setEmail(tqywt.getJgpd());
//                tzfwt.setFkdw(tqywt.getJyyjbz());
//                tzfwt.setLxrmc(tqywt.getBzq());
//                tzfwt.setBgdh(tqywt.getYpzt());
//                tzfwt.setSjhm(tqywt.getLxdh());
//                tzfwt.setCz(tqywt.getYshwt());
//                tzfwt.setSjr(tqywt.getYpsl());
//                tzfwt.setQbgyb(tqywt.getYzbm());
//                tzfwt.setHtlxsx(tqywt.getGgxh());
//                tqywt1.setLrry(CurrentLoginUser.getUser().getZydm());
//                tqywt1.setBmdm(CurrentLoginUser.getUser().getBmdm());
                tqywtService.createTqywt(tqywt1);

                Trwgl trwgl = new Trwgl();
//                trwgl.setRwmc(tqywt.getDwbm() + "企业委托抽样任务");
                trwgl.setRwType("002"); // 001政府  002企业
                trwgl.setBlzt("002"); //办理中
                trwgl.setSjly("1"); //数据来源
                trwgl.setWtid(wtid);
                trwgl.setWtdwmc(tqywt.getDwmc());
                trwgl.setWtType("002");
                trwgl.setLrry(CurrentLoginUser.getUser().getZydm());
                trwgl.setBmdm(CurrentLoginUser.getUser().getBmdm());
                trwglService.createTrwgl(trwgl);
            }
        }
        return true;
    }

    /**
     * 用于检测传入的导入数据是否符合传入要求
     *
     * @param list 传入list
     * @return JSONObject 导入情况
     */
    private Map<String, Object> checkList(List<Tzfwt> list, List<Tqywt> list2) {
        Map<String, Object> returnData = new HashMap<String, Object>();
        int i = 1;
        if (list != null) {
            for (Tzfwt pt : list) {

//                String gsmc = pt.getDwmc() == null ? "" : pt.getDwmc().replace(String.valueOf((char) 160), " ");
//                pt.setDwmc(gsmc.trim());

//                String htmc = pt.getHtmc() == null ? "" : pt.getHtmc().replace(String.valueOf((char) 160), " ");
//                pt.setHtmc(htmc.trim());

//                if (pt.getDwmc() == null || pt.getDwmc().trim().length() == 0) {
                    returnData.put("success", false);
                    returnData.put("message", "第" + i + "行委托单位名称不得为空！");
                    return returnData;
//                } else if (pt.getHtmc() == null || pt.getHtmc().trim().length() == 0) {
//                    returnData.put("success", false);
//                    returnData.put("message", "第" + i + "行" + pt.getDwmc() + "的合同名称不得为空！");
//                    return returnData;
//                }
//                i++;
            }
        } else {
            for (Tqywt pt : list2) {

                String gsmc = pt.getDwmc() == null ? "" : pt.getDwmc().replace(String.valueOf((char) 160), " ");
                pt.getDwmc();
//                String htmc = pt.getHtmc() == null? "":pt.getHtmc().replace(String.valueOf((char)160)," ");
//                pt.setHtmc(htmc.trim());

                if (pt.getDwmc() == null || pt.getDwmc().trim().length() == 0) {
                    returnData.put("success", false);
                    returnData.put("message", "第" + i + "行委托单位名称不得为空！");
                    return returnData;
//                } else if (pt.getHtmc() == null || pt.getHtmc().trim().length() == 0) {
//                    returnData.put("success", false);
//                    returnData.put("message", "第" + i + "行"+ pt.getDwmc() +"的合同名称不得为空！");
//                    return returnData;
                }
                i++;
            }
        }

        returnData.put("success", true);
        return returnData;
    }



    /**
     * 生成委托单
     * @param request
     * @return
     */
    @RequestMapping(value = "/scQywt/{id}")
    @ResponseBody
    public JSONObject scQywt(HttpServletRequest request,@PathVariable("id") String id) throws Exception{
        String ypbctj1 = null;
        JSONObject jsonObject = new JSONObject();
      /*  try {*/
            List<Map> byId = tqywtService.findById(id);
            Map<String,Object> dataMap = new HashMap<>();
            Map byid_map = byId.get(0);
            Object ypbctj = byid_map.get("ypbctj");
            Object wtid1 = byid_map.get("wtid");

            String b = Objects.toString(ypbctj);
            String wtid = Objects.toString(wtid1);
            String id1 = tqywtMapper.findypid(wtid);

            switch (b){
                case "001":
                    ypbctj1 = "常温";
                    break;
                case "002":
                    ypbctj1 = "避光";
                    break;
                case "003":
                    ypbctj1 = "干燥";
                    break;
                case "004":
                    ypbctj1 = "冷藏";
                    break;
                case "005":
                    ypbctj1 = "冷冻";
                    break;
                case "006":
                    ypbctj1 = "其他";
                    break;
            }

            List<Map> jcx = bgglService.findJcx(id1);
            String aa = "";
            for (Map z:jcx) {
                aa = aa + z.get("Jcx") + ",";
            }
            String bb = aa.substring(0,aa.length()-1);
            byid_map.put("jyxm",bb);
            byid_map.put("ypbctj",ypbctj1);
            dataMap.putAll(byid_map);
            Set<String> set = dataMap.keySet();
            for(String s6:set){
                if ("".equals(dataMap.get(s6))){
                    dataMap.put(s6,"/");
                }
            }
            //委托经办人签字
           String wtqz =byid_map.get("wtjbr").toString();
           BASE64Decoder decoder = new BASE64Decoder();
            //Base64解码
            byte[] bbb = decoder.decodeBuffer(wtqz);
            for(int i=0;i<bbb.length;++i)
            {
                if(bbb[i]<0)
                {//调整异常数据
                    bbb[i]+=256;
                }
            }
            //生成png图片
            String fileurl = "";
            String filename = "QZ"+UUID.randomUUID()+".png";
            fileurl = "/file/"+filename;
            OutputStream out1 = new FileOutputStream(request.getSession().getServletContext().getRealPath("/")+fileurl);
            out1.write(bbb);
            out1.flush();
            out1.close();
            byte[] localByteArray = BytePictureUtils.getLocalByteArray(new File(request.getSession().getServletContext().getRealPath("/")+fileurl));
            dataMap.put("wtjbr",new PictureRenderData(60, 30, ".png",localByteArray));


        //委托受理人签字
           byte[] localByteArray1 = BytePictureUtils.getLocalByteArray(new File(request.getSession().getServletContext().getRealPath("/")+"/"+this.bgglMapper.getDzqz(byid_map.get("wtslr").toString())));
           dataMap.put("wtslr",new PictureRenderData(60, 30, ".png",localByteArray1));

                String wtdlj = "D:\\file\\lzwtd\\wtd\\WTD"+byid_map.get("wtid").toString()+".docx";

                XWPFTemplate template = XWPFTemplate.compile("d:/file/lzwtd/lzwtd.docx").render(dataMap);
                FileOutputStream out = new FileOutputStream(wtdlj);
                template.write(out);
                out.flush();
                out.close();
                template.close();

           // String  wtdlj = WordUtilWtd.createWord(request,dataMap);
            this.tqywtMapper.updateWtdlj(id,wtdlj);

            jsonObject.put("success", true);
      /*  }catch (Exception e){
            e.printStackTrace();
            jsonObject.put("success", false);
            jsonObject.put("message","保存失败！");
        }*/
        return jsonObject;
    }

    /**
     * 受理委托单
     * @param obj
     * @return
     */
    @RequestMapping(value = "/slQywt")
    @ResponseBody
    public JSONObject slQywt(@RequestBody JSONObject obj) {
        String wtids = obj.getString("wtid");
        String s1 = wtids.replaceAll("]", "");
        String s2 = s1.replaceAll("\\[", "");
        String [] wtid1  = s2.split(",");
        for (String id : wtid1) {
            String if_sl = "1";
            String wtslr = CurrentLoginUser.getUser().getZydm();
            SimpleDateFormat rq = new SimpleDateFormat("yyyy-MM-dd");
            String slrq = rq.format(new Date());
            tqywtMapper.updateslQYWT(id,if_sl,wtslr,slrq);
        }
        JSONObject object = new JSONObject();
        object.put("success",true);
        return object;
    }
    /**
     * 通过样品id获得所有的检测项目的检测项目的信息
     */
    @RequestMapping(value = "/getJcxmAllByYpid")
    @ResponseBody
    public DatatablesViewPage<Map> getJcxmAllByYpid(@RequestParam("start") String start,
                                                       @RequestParam("length") String length,
                                                       @RequestParam("ypid") String ypid,
                                                       @RequestParam("jcxmc") String jcxmc
                                                      ) throws Exception {
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        List<Map> list = new ArrayList<Map>();
        Map map=new HashMap();
        map.put("start",Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        if(notNULL(ypid)){
            map.put("ypid",ypid);
        }
        if(notNULL(jcxmc)){
            map.put("jcxmc",jcxmc);
        }
        int num = 0;
        list = tqywtMapper.getJcxmDataByYpid(map);
        num = tqywtMapper.getJcxmDataNumByYpid(map);
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
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
     * 通过样品id和检测检测项目id  删除对应的检测项目信息
     */
    @RequestMapping(value = "/delYpJcxm", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject delYpJcxm(HttpServletRequest request) {
        JSONObject object = new JSONObject();
        try {
            List<Map> list=new ArrayList<Map>();
            Map map=null;
            String ypid=request.getParameter("ypid");
            String[] jcxmids=request.getParameter("jcxmids").split(",");
            for(int i=0;i<jcxmids.length;i++){
                map=new HashMap();
                map.put("jcxmid",jcxmids[i]);
                map.put("ypid",ypid);
                list.add(map);
            }
            tqywtMapper.delYpJcxm(list);
            object.put("success", true);
        }catch (Exception e){
            object.put("success", false);
        }
        return object;
    }


    /**
     * 通过样品id 批量删除 样品 下所有检测项目信息
     */
    @RequestMapping(value = "/delAllYpJcxm", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject delAllYpJcxm(HttpServletRequest request) {
        String ypidJh = request.getParameter("ypids");
        JSONObject object = new JSONObject();
        try {
            if(ypidJh!=null && ypidJh.trim().length()>1)
            {
                ypidJh = ypidJh.substring(0,ypidJh.length()-1);
            }
            String ypid="";
            if (ypidJh==null ||ypidJh.equals("")) {
                ypidJh = "";
            }else if(ypidJh.indexOf(",")!=-1)
            {
                ypidJh = ypidJh.replaceAll(",","','");
                ypid = "'"+ypidJh+"'";
            }else{
                ypid = "'"+ypidJh+"'";
            }
            tzfwtMapper.delAllYpJcxm(ypid);
            object.put("success", true);
        }catch (Exception e){
            object.put("success", false);
        }
        return object;
    }

    @RequestMapping(value = "/toqywt", method = RequestMethod.GET)
    public String toqywt(Model model,String id,String type) {
        String ymbm = type == null?"qy":type.equals("001")?"qy":"gr";
        HashMap data = new HashMap();
        data.put("ymbm",ymbm);
        List<Map> fields = configService.findById(data);
        model.addAttribute("id",id==null?"":id);
        model.addAttribute("type",type==null?"":type);
        model.addAttribute("fields", fields);
        return "/marketManage/qywt_jbxx";
    }

    @RequestMapping(value = "/tozfwt", method = RequestMethod.GET)
    public String tozfwt(Model model,String id) {
        HashMap data = new HashMap();
        data.put("ymbm","zf");
        List<Map> fields = configService.findById(data);
        model.addAttribute("id",id==null?"":id);
        model.addAttribute("fields", fields);
        return "/marketManage/zfwt_jbxx";
    }

    @RequestMapping(value = "/tozfqrwt", method = RequestMethod.GET)
    public String tozfqrwt(Model model,String id) {
        HashMap data = new HashMap();
        data.put("ymbm","zf");
        List<Map> fields = configService.findById(data);
        model.addAttribute("id",id==null?"":id);
        model.addAttribute("fields", fields);
        return "/marketManage/qywtqr_jbxx";
    }

    @RequestMapping(value = "/toqylist", method = RequestMethod.GET)
    public String toqylist(Model model,String type) {
        model.addAttribute("type",type==null?"":type);
        return "/marketManage/qylist";
    }


    @RequestMapping(value = "/savetest")
    @ResponseBody
    public JSONObject savetest() {

        Typgl typgl = new Typgl();
        typgl.setWtid("222QD20190029");
        typgl.setIf_cy("1");
        typglService.createTypgl(typgl);
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }


    /**
     * 样品信息添加
     * @param khxx
     * @return
     */
    @RequestMapping(value = "/savYPAdd")
    @ResponseBody
    public JSONObject savYPAdd(@RequestBody String khxx) {
        Typgl typgl = JSON.parseObject(khxx, Typgl.class);
        typgl.setYpbm(bmgzService.getMaxYpbm2());
        typgl.setJszt("001");
        typgl.setByglry("eba50ad1-518c-497e-94ff-76170f805aed");
      //  typgl.setIf_cy("1");
        typglService.createTypgl(typgl);
        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }

    /**
     * 返回委托单列表视图
     */
    @RequestMapping(value = "/PTywtAll")
    @ResponseBody
    public DatatablesViewPage<Map> wtPaging(@RequestParam("start") String start,
                                                   @RequestParam("length") String length) throws Exception {
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        List<Map> list = new ArrayList<Map>();
        Map map=new HashMap();
        map.put("start",Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));

        int num = 0;
        list = tlZypglMapper.wtPaging(map);
        num = tlZypglMapper.wtPagingSum(map);
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 回显单条委托单
     */
    @ResponseBody
    @RequestMapping(value = "/wtRepeatDisplay")
    public Map wtRepeatDisplay(HttpServletRequest request, @RequestBody String[] ids ){
        String id = ids[0];
        Map map = this.tlZypglMapper.wtRepeatDisplay(id);
        return map;
    }


    /**
     * 样品接收 修改，查询委托和样品
     */
    @ResponseBody
    @RequestMapping(value = "/wtModifyQuery", method = RequestMethod.GET)
    public JSONObject wtModifyQuery(Model model,String id) {
        Map data = tlZypglMapper.getWTModifyQuery(id);
        JSONObject object = new JSONObject();
        object.put("success", true);
        object.put("id", id);
        object.put("data", data);
        return object;
    }

    /**
     * 根据样品ID 更改样品信息
     * @param khxx
     * @return
     */
    @RequestMapping(value = "/upYPUpdate")
    @ResponseBody
    public  JSONObject upYPUpdate(@RequestBody String khxx){
        Typgl typgl = JSON.parseObject(khxx,Typgl.class);
        String yhid = CurrentLoginUser.getUser().getId();
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        String bgffrq=sf.format(new Date());//录入日期
        typgl.setJszt("001");
       // typgl.setIf_cy("1");
        typgl.setLrry(yhid);
        typgl.setLrrq(bgffrq);

        JSONObject object = new JSONObject();
        typglService.getUPYPUpdate(typgl);
        object.put("success", true);
        return object;
    }

    /**
     * 企业委托登记模块 客户信息 弹出框分页信息查看
     * @param start
     * @param length
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/queryAllCustomerInformation")
    @ResponseBody
    public DatatablesViewPage<Map> queryAllCustomerInformation(@RequestParam("start") String start,
                                                               @RequestParam("length") String length,
                                                               @RequestParam( value ="id",required = false) String id) throws Exception{
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        List<Map> list = new ArrayList<Map>();

        int num = 0;
        list = tzfwtService.getQueryAllCustomerInformation(Integer.parseInt(start), Integer.parseInt(length));
        num = tzfwtService.getQuerySumCustomerInformation(Integer.parseInt(start), Integer.parseInt(length));
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 企业委托登记模块 回显单条客户信息
     */
    @ResponseBody
    @RequestMapping(value = "/queryCustomerInformation")
    public JSONObject queryCustomerInformation(@RequestBody String[] ids ){
        String id = ids[0];
        HashMap data = new HashMap();
        Map fields = tzfwtMapper.queryCustomerInformationM(id);
        JSONObject object = new JSONObject();
        object.put("success", true);
        object.put("data", fields);
        return object;
    }
    //企业打印标签
    @RequestMapping(value = "/qywtdybq", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject queryQywtByIds(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            ZfwtPrintUtil zfwtPrintUtil = new ZfwtPrintUtil();
            String wtid = request.getParameter("ids");
            Map map = new HashMap();
            map.put("id",wtid);
            Tqywt wtdata = tqywtMapper.findTqywt(wtid);
            int ypsl = (wtdata.getDybqsl() == null?"":wtdata.getDybqsl()).equals("")?1:Integer.parseInt(wtdata.getDybqsl());
            List<Map> list = new ArrayList<>();
            for (int i = 0; i < ypsl; i++) {
                Map m = new HashMap<String, String>();
                m.put("lx","类型");
                m.put("yplx","检样");
                m.put("ypbm",wtdata.getYpbm());
                m.put("ypmc",wtdata.getYpmc());
                m.put("ypzxbz",wtdata.getYpzxbz());
                list.add(m);
//                zfwtPrintUtil.setParmeter(m);//调用打印机  进行打印
            }
            json.put("success", true);
            json.put("data", list);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    @RequestMapping(value = "/qywtdybqbyypbm", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject queryQywtByYpbm(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            ZfwtPrintUtil zfwtPrintUtil = new ZfwtPrintUtil();
            String wtid = request.getParameter("ids");
            Tqywt wtdata = tqywtMapper.findTqywtByYpbm(wtid);
            int ypsl = (wtdata.getDybqsl() == null?"":wtdata.getDybqsl()).equals("")?1:Integer.parseInt(wtdata.getDybqsl());
            List<Map> list = new ArrayList<>();
            for (int i = 0; i < ypsl; i++) {
                Map m = new HashMap<String, String>();
                m.put("lx","类型");
                m.put("yplx","检样");
                m.put("ypbm",wtdata.getYpbm());
                m.put("ypmc",wtdata.getYpmc());
                m.put("ypzxbz",wtdata.getYpzxbz());
                list.add(m);
//                zfwtPrintUtil.setParmeter(m);//调用打印机  进行打印
            }
            json.put("success", true);
            json.put("data", list);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }
    //政府打印标签
    @RequestMapping(value = "/zfwtdybq", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject queryCgysByIds(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            ZfwtPrintUtil zfwtPrintUtil = new ZfwtPrintUtil();
            String wtid = request.getParameter("ids");
            if(wtid!=null && wtid.trim().length()>2)
            {
                wtid = wtid.replace(",","','");
            }
            wtid = "'"+wtid+"'";
            Map map = new HashMap();
            map.put("id",wtid);
            List<Map> list = tqywtMapper.findYpidByWtid(map);
            for (Map m : list) {
                m.put("lx","类型");
//                zfwtPrintUtil.setParmeter(m);//调用打印机  进行打印
            }
            json.put("success", true);
            json.put("data", list);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }
    /**
     * 根据抽样单编码打印委托标签
     * @param request
     * @return
     */
    @RequestMapping(value = "/wtdybq", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject queryCgysByCydbm(@RequestBody String ids, HttpServletRequest request) {
        JSONObject json = new JSONObject();
        JSONObject jsonObject = JSONObject.parseObject(ids);
        try {
            ZfwtPrintUtil zfwtPrintUtil = new ZfwtPrintUtil();
            String cydbm = jsonObject.getString("cydbm");  //request.getParameter("ids");
            Map map = new HashMap();
            map.put("id",cydbm);
            List<Map> list = tqywtMapper.findYpidByCydbm(map);
            for (Map m : list) {
                m.put("lx","类型");
//                zfwtPrintUtil.setParmeter(m);//调用打印机  进行打印
            }
            json.put("success", true);
            json.put("data", list);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    //打印标签
    @RequestMapping(value = "/yplqdybq", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject queryCgysByIdss(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            ZfwtPrintUtil zfwtPrintUtil = new ZfwtPrintUtil();
            String ypbm = request.getParameter("ypbm");
            String sl = request.getParameter("tyzl");

            int num = Integer.valueOf(sl);
            Map map = new HashMap();
            map.put("ypbm",ypbm);

            String ypmc = tqywtMapper.findYpmc(map);
            String ypzxbz = tqywtMapper.findCydbm(map);
            List list = new ArrayList();
            for (int i =1;i<=num;i++){
                Map m = new HashMap();
                m.put("yplx",num+"-"+i);
                m.put("ypbm",ypbm);
                m.put("ypmc",ypmc);
                m.put("lx","序号");
                m.put("ypzxbz",ypzxbz);
                list.add(m);
//                zfwtPrintUtil.setParmeter(m);//调用打印机  进行打印----20190529:改为前端js打印，将数据返回前端。这里不调用打印机
            }

/*            for (Map m : list) {
                zfwtPrintUtil.setParmeter(m);//调用打印机  进行打印
            }*/
            json.put("success", true);
            json.put("data", list);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }
/*    public String qywtdybq(HttpServletRequest request){
        WordDocument doc = new WordDocument();
        String wtid = request.getParameter("wtid");

        Map map = new HashMap();
        map.put("id",wtid);
        List<Map> list = tqywtMapper.findYpidByWtid(map);
        String ypbm = String.valueOf(list.get(0).get("ypbm"));
        String ypmc = String.valueOf(list.get(0).get("ypmc"));

        doc.openDataRegion("PO_jyypbm").setValue(ypbm);
        doc.openDataRegion("PO_jyypmc").setValue(ypmc);
        doc.openDataRegion("PO_byypbm").setValue(ypbm);
        doc.openDataRegion("PO_byypmc").setValue(ypmc);


        PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
        //添加保存按钮
        poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        poCtrl.setWriter(doc);
        //设置保存页面
        poCtrl.setSaveFilePage("savefile.do");

        //打开excel
        poCtrl.webOpen("/customermanage/doc/qywtdybq.docx", OpenModeType.docAdmin,"张三");
        return "pageoffice/Word";
    }*/



    //打印委托报告
    @RequestMapping(value = "/qywtbg")
    public String qywtbg(HttpServletRequest request){
        WordDocument doc = new WordDocument();
        String wtid = request.getParameter("wtid");

        Map map = new HashMap();
        map.put("id",wtid);
        List<Map> list = tqywtMapper.findwtByWtid(map);
        String jcxmAllCount = tqywtMapper.jcxmAllCount();
        String ypJcxm = tqywtMapper.ypJcxm(map);

        String ypbm = String.valueOf(list.get(0).get("ypbm"));
        String wtid1 = String.valueOf(list.get(0).get("wtid"));
        String cydbm = String.valueOf(list.get(0).get("cydbm"));
        String jylb = String.valueOf(list.get(0).get("jylb"));
        String jyyj = String.valueOf(list.get(0).get("jyyj"));
        String jyyjbzqt = String.valueOf(list.get(0).get("jyyjbzqt"));
        String ypmc = String.valueOf(list.get(0).get("ypmc"));
        String sb = String.valueOf(list.get(0).get("sb"));
        String ggxh = String.valueOf(list.get(0).get("ggxh"));
        String ypsl = String.valueOf(list.get(0).get("ypsl"));
        String bysl = String.valueOf(list.get(0).get("bysl"));
        String ypzt = String.valueOf(list.get(0).get("ypzt"));
        ypzt = "完好";
        String ypzxbz = String.valueOf(list.get(0).get("ypzxbz"));
        String scrq = String.valueOf(list.get(0).get("scrq"));
        String ypdj = String.valueOf(list.get(0).get("ypdj"));
        String scdw = String.valueOf(list.get(0).get("scdw"));
        String ypjcsj = String.valueOf(list.get(0).get("ypjcsj"));
        String yplaiyuan =  String.valueOf(list.get(0).get("yplaiyuan"));
        String sydd = String.valueOf(list.get(0).get("sydd"));
        String ccyqqt = String.valueOf(list.get(0).get("ccyqqt"));

        String cyfangshi = String.valueOf(list.get(0).get("cyfangshi"));

        String ybjs = String.valueOf(list.get(0).get("ybjs"));
        String ftbh = String.valueOf(list.get(0).get("ftbh"));
        String ypbctj = String.valueOf(list.get(0).get("ypbctj"));
        String jswj = String.valueOf(list.get(0).get("jswj"));
        String jswjqt = String.valueOf(list.get(0).get("jswjqt"));
        String yzjl = String.valueOf(list.get(0).get("yzjl"));
        String jywcrq = String.valueOf(list.get(0).get("jywcrq"));
        String jysm = String.valueOf(list.get(0).get("jysm"));
        String clyj = String.valueOf(list.get(0).get("clyj"));
        String qtsm = String.valueOf(list.get(0).get("qtsm"));
        String jffs = String.valueOf(list.get(0).get("jffs"));
        String bgjffs = String.valueOf(list.get(0).get("bgjffs"));
        String wtdw = String.valueOf(list.get(0).get("wtdw"));
        String wtdwdz = String.valueOf(list.get(0).get("wtdwdz"));
        String wtdwyzbm = String.valueOf(list.get(0).get("wtdwyzbm"));
        String wtdwdh = String.valueOf(list.get(0).get("wtdwdh"));
        String wtjbr = String.valueOf(list.get(0).get("wtjbr"));
        String syrq = String.valueOf(list.get(0).get("syrq"));
        String wtslr = String.valueOf(list.get(0).get("wtslr"));
        String slrq = String.valueOf(list.get(0).get("slrq"));

        String jcxmcount = String.valueOf(list.get(0).get("jcxmcount"));

        String dxbg = "□";
        String wtjy = "□";
        String zxjy = "□";
        String jdjy = "□";
        String xsjy = "□";
        String dbsy = "□";
        if("dxbg".equals(jylb)){
            dxbg = "☑";
        }else if("jdjy".equals(jylb)){
            jdjy = "☑";
        }else if("dbsy".equals(jylb)){
            dbsy = "☑";
        }else if("wtjy".equals(jylb)){
            wtjy = "☑";
        }else if ("zxjy".equals(jylb)){
            zxjy = "☑";
        }else if ("ssjy".equals(jylb)){
            xsjy = "☑";
        }

        String azxbz = "□";
        String ajswj = "□";
        String jyyjqt = "□";
        String jyyjqtz = "";
        if ("azxbz".equals(jyyj)){
            azxbz = "☑";
        }else if ("ajswj".equals(jyyj)){
            ajswj = "☑";
        }else if("jyyjqt".equals(jyyj)){
            jyyjqt = "☑";
            jyyjqtz = jyyjbzqt;
        }
        String jy = "□";
        String by = "□";
        String byslz = "";
        String jyslz = "";
        if ("".equals(ypsl)){
            by = "☑";
            byslz = bysl;
        }else if ("".equals(bysl)){
            jy = "☑";
            jyslz = ypsl;
        }else if (!"".equals(ypsl)){
            jy = "☑";
            jyslz = ypsl;
        }else if ("".equals(bysl)){
            by = "☑";
            byslz = bysl;
        }

        //储藏条件
        String cw = "□";
        String bg = "□";
        String gz = "□";
        String ld = "□";
        String lc = "□";
        String qt = "□";
        String qtz = "";

        if ("001".equals(ypbctj)){
            cw = "☑";
        }else if ("002".equals(ypbctj)){
            bg = "☑";
        }else if ("003".equals(ypbctj)){
            gz = "☑";
        }else if ("004".equals(ypbctj)){
            lc = "☑";
        }else if ("005".equals(ypbctj)){
            ld = "☑";
        }else if ("006".equals(ypbctj)){
            qt = "☑";
            qtz = ccyqqt;
        }

        //技术文件
        String qybz = "□";
        String jsgf = "□";
        String cyd = "□";
        String wts = "□";
        String jsht = "□";
        String jswjqtg = "□";
        String jswjqtn = "";

        if ("qybz".equals(jswj)){
            qybz = "☑";
        }else if ("jsgf".equals(jswj)){
            jsgf = "☑";
        }else if ("cyd".equals(jswj)){
            cyd = "☑";
        }else if ("wts".equals(jswj)){
            wts = "☑";
        }else if ("jsht".equals(jswj)){
            jsht = "☑";
        }else if ("qt".equals(jswj)){
            jswjqtg = "☑";
            jswjqtn = jswjqt;
        }
        //检验结论
        String pd = "□";
        String bpd = "□";
        if ("pd".equals(yzjl)){
            pd = "☑";
        }else if ("bpd".equals(yzjl)){
            bpd = "☑";
        }
        //检验说明
        String jysm1 = "□";
        String jysm2 = "□";
        if ("001".equals(jysm)){
            jysm1 = "☑";
        }else if ("002".equals(jysm)){
            jysm2 = "☑";
        }
        //检验完成日期
        String jyrqyear = "";
        String jyrqmonth = "";
        String jyrqday = "";
        if (jywcrq.length() >= 8) {
             jyrqyear = jywcrq.substring(0,4);
             jyrqmonth = jywcrq.substring(5,7);
             jyrqday = jywcrq.substring(8);
        }
        //检毕样品处理意见
        String clyj1 = "□";
        String clyj2 = "□";
        if ("001".equals(clyj)){
            clyj1 = "☑";
        }else if ("002".equals(clyj)){
            clyj2 = "☑";
        }
        //缴费方式
        String jnfs1 = "□";
        String jnfs2 = "□";
        String jnfs3 = "□";
        if ("001".equals(jffs)){
            jnfs1 = "☑";
        }else if ("002".equals(jffs)){
            jnfs2 = "☑";
        }else if ("003".equals(jffs)){
            jnfs3 = "☑";
        }
        //报告接收
        String bgjs1 = "□";
        String bgjs2 = "□";
        String bgjs3 = "□";
        if ("001".equals(bgjffs)){
            bgjs1 = "☑";
        }else if ("002".equals(bgjffs)){
            bgjs2 = "☑";
        }else if ("003".equals(bgjffs)){
            bgjs3 = "☑";
        }
        //委托单位经办人日期
        String wtyear = "";
        String wtmonth = "";
        String wtqday = "";
        if (syrq.length() >= 8) {
             wtyear = syrq.substring(0, 4);
             wtmonth = syrq.substring(5, 7);
             wtqday = syrq.substring(8);
        }
        //检验机构日期
        String jyjgyear = "";
        String jyjgmonth = "";
        String jyjgday = "";
        if (slrq.length() >= 8) {
             jyjgyear = slrq.substring(0, 4);
             jyjgmonth = slrq.substring(5, 7);
             jyjgday = slrq.substring(8);
        }
        //检测项目
        String qxjy = "□";
        String wtfjy = "□";
        String ypjcxmt = "";
        if (jcxmcount.equals(jcxmAllCount)){
            qxjy = "☑";
        }else {
            wtfjy = "☑";
            if (ypJcxm == null||"".equals(ypJcxm)){
                ypJcxm = "暂无";
            }
            ypjcxmt = ypJcxm;
        }
        //样品来源
        String yply1 = "□";
        String yply2 = "□";
        if ("001".equals(yplaiyuan)){
            yply1 = "☑";
        }else if ("002".equals(yplaiyuan)){
            yply2 ="☑";
        }
        //抽送样地址
        String cydd1 = "□";
        String cydd2 = "□";
        if ("001".equals(sydd)){
            cydd1 = "☑";
        }else if ("002".equals(sydd)){
            cydd2 ="☑";
        }
        //抽样方式
        String cyfs = "";
        if ("001".equals(cyfangshi)){
            cyfs = "无菌抽样";
        }else if ("002".equals(cyfangshi)){
            cyfs = "非无菌抽样";
        }
        //抽送样地址
        doc.openDataRegion("PO_jyjgslc").setValue(setEmptyString(cydd1));
        doc.openDataRegion("PO_scdwkf").setValue(setEmptyString(cydd2));
        //样品来源
        doc.openDataRegion("PO_sy").setValue(setEmptyString(yply1));
        doc.openDataRegion("PO_cy").setValue(setEmptyString(yply2));
        //检测项目
        doc.openDataRegion("PO_qxjy").setValue(setEmptyString(qxjy));
        doc.openDataRegion("PO_wtfxdxm").setValue(setEmptyString(wtfjy));
        doc.openDataRegion("PO_jcxm").setValue(setEmptyString(ypjcxmt));
        //检测机构
        //受理人
        if (wtslr == null || "null".equals(wtslr)) {
            wtslr = "";
        } else {
            User u = userService.getUserByZydm(wtslr);
            if (u != null) {
                wtslr = u.getName();
            }
        }
        doc.openDataRegion("PO_jyjgjbr").setValue(setEmptyString(wtslr));
        doc.openDataRegion("PO_jyjgyear").setValue(setEmptyString(jyjgyear));
        doc.openDataRegion("PO_jyjgmonth").setValue(setEmptyString(jyjgmonth));
        doc.openDataRegion("PO_jyjgday").setValue(setEmptyString(jyjgday));
        //委托单位经办人
        if (wtjbr == null || "null".equals(wtjbr)) {
            wtjbr = "";
        } else {
            User u = userService.getUserByZydm(wtjbr);
            if (u != null) {
                wtjbr = u.getName();
            }
        }
        doc.openDataRegion("PO_wtjbr").setValue(setEmptyString(wtjbr));
        doc.openDataRegion("PO_wtyear").setValue(setEmptyString(wtyear));
        doc.openDataRegion("PO_wtmonth").setValue(setEmptyString(wtmonth));
        doc.openDataRegion("PO_wtday").setValue(setEmptyString(wtqday));
        //电话
        doc.openDataRegion("PO_dh").setValue(setEmptyString(wtdwdh));
        //邮政编码
        doc.openDataRegion("PO_yzbm").setValue(setEmptyString(wtdwyzbm));
        //通讯地址
        doc.openDataRegion("PO_txdz").setValue(setEmptyString(wtdwdz));
        //委托单位
        doc.openDataRegion("PO_wtdw").setValue(setEmptyString(wtdw));
        //报告接收
        doc.openDataRegion("PO_zxlq").setValue(setEmptyString(bgjs1));
        doc.openDataRegion("PO_yj").setValue(setEmptyString(bgjs2));
        doc.openDataRegion("PO_bgjsqt").setValue(setEmptyString(bgjs3));
        //缴费方式
        doc.openDataRegion("PO_yjn").setValue(setEmptyString(jnfs1));
        doc.openDataRegion("PO_qbgsjn").setValue(setEmptyString(jnfs2));
        doc.openDataRegion("PO_yxysf").setValue(setEmptyString(jnfs3));
        //其他说明
        doc.openDataRegion("PO_qtsm").setValue(setEmptyString(qtsm));
        //检毕样品处理意见
        doc.openDataRegion("PO_clyj1").setValue(setEmptyString(clyj1));
        doc.openDataRegion("PO_clyj2").setValue(setEmptyString(clyj2));
        //检验说明
        doc.openDataRegion("PO_jysm1").setValue(setEmptyString(jysm1));
        doc.openDataRegion("PO_jysm2").setValue(setEmptyString(jysm2));

        //检验完成日期
//        doc.openDataRegion("PO_year").setValue(setEmptyString(jyrqyear));
//        doc.openDataRegion("PO_month").setValue(setEmptyString(jyrqmonth));
//        doc.openDataRegion("PO_day").setValue(setEmptyString(jyrqday));
        doc.openDataRegion("PO_jyrq").setValue(setEmptyString(ypjcsj));
        //检验结论
        doc.openDataRegion("PO_pd").setValue(setEmptyString(pd));
        doc.openDataRegion("PO_bpd").setValue(setEmptyString(bpd));
        //技术文件
        doc.openDataRegion("PO_qybz").setValue(setEmptyString(qybz));
        doc.openDataRegion("PO_jsgf").setValue(setEmptyString(jsgf));
        doc.openDataRegion("PO_cyd").setValue(setEmptyString(cyd));
        doc.openDataRegion("PO_wts").setValue(setEmptyString(wts));
        doc.openDataRegion("PO_jsht").setValue(setEmptyString(jsht));
        doc.openDataRegion("PO_jswjqt").setValue(setEmptyString(jswjqtg));
        doc.openDataRegion("PO_jswjqtz").setValue(setEmptyString(jswjqtn));



        doc.openDataRegion("PO_ypbm").setValue(setEmptyString(ypbm));
        doc.openDataRegion("PO_wtid").setValue(setEmptyString(cydbm));
        doc.openDataRegion("PO_wtjy").setValue(setEmptyString(wtjy));
        doc.openDataRegion("PO_zxjy").setValue(setEmptyString(zxjy));
        doc.openDataRegion("PO_jdjy").setValue(setEmptyString(jdjy));
        doc.openDataRegion("PO_xsjy").setValue(setEmptyString(xsjy));
        doc.openDataRegion("PO_dbjy").setValue(setEmptyString(dbsy));
        doc.openDataRegion("PO_dxbg").setValue(setEmptyString(dxbg));
        doc.openDataRegion("PO_zxbz").setValue(setEmptyString(azxbz));
        doc.openDataRegion("PO_jswj").setValue(setEmptyString(ajswj));
        doc.openDataRegion("PO_jyyjqt").setValue(setEmptyString(jyyjqt));
        doc.openDataRegion("PO_jyyjqtz").setValue(setEmptyString(jyyjqtz));


        doc.openDataRegion("PO_cpmc").setValue(setEmptyString(ypmc));
        doc.openDataRegion("PO_sb").setValue(setEmptyString(sb));
        doc.openDataRegion("PO_ggxh").setValue(setEmptyString(ggxh));
        doc.openDataRegion("PO_jy").setValue(setEmptyString(jy));
        doc.openDataRegion("PO_ypsljy").setValue(setEmptyString(jyslz));
        doc.openDataRegion("PO_by").setValue(setEmptyString(by));
        doc.openDataRegion("PO_ypslby").setValue(setEmptyString(byslz));

        doc.openDataRegion("PO_ypzt").setValue(setEmptyString(ypzt));
        doc.openDataRegion("PO_zxbzypms").setValue(setEmptyString(ypzxbz));
        doc.openDataRegion("PO_scrq").setValue(setEmptyString(scrq));
        doc.openDataRegion("PO_ypdj").setValue(setEmptyString(ypdj));
        doc.openDataRegion("PO_scdw").setValue(setEmptyString(scdw));


        doc.openDataRegion("PO_cyfs").setValue(setEmptyString(cyfs));
        doc.openDataRegion("PO_ypjs").setValue(setEmptyString(ybjs));
        doc.openDataRegion("PO_ftbm").setValue(setEmptyString(ftbh));

        //储藏条件
        doc.openDataRegion("PO_cw").setValue(setEmptyString(cw));
        doc.openDataRegion("PO_bg").setValue(setEmptyString(bg));
        doc.openDataRegion("PO_gz").setValue(setEmptyString(gz));
        doc.openDataRegion("PO_ld").setValue(setEmptyString(ld));
        doc.openDataRegion("PO_lc").setValue(setEmptyString(lc));
        doc.openDataRegion("PO_ypmsqt").setValue(setEmptyString(qt));
        doc.openDataRegion("PO_jswjqtz").setValue(setEmptyString(qtz));
        /*doc.openDataRegion("PO_scdw").setValue(scdw);
        doc.openDataRegion("PO_scdw").setValue(scdw);
        doc.openDataRegion("PO_scdw").setValue(scdw);
        doc.openDataRegion("PO_scdw").setValue(scdw);
        doc.openDataRegion("PO_scdw").setValue(scdw);
        doc.openDataRegion("PO_scdw").setValue(scdw);
        doc.openDataRegion("PO_scdw").setValue(scdw);
        doc.openDataRegion("PO_scdw").setValue(scdw);
        doc.openDataRegion("PO_scdw").setValue(scdw);
        doc.openDataRegion("PO_scdw").setValue(scdw);
        doc.openDataRegion("PO_scdw").setValue(scdw);
        doc.openDataRegion("PO_scdw").setValue(scdw);
        doc.openDataRegion("PO_scdw").setValue(scdw);
        doc.openDataRegion("PO_scdw").setValue(scdw);*/



        PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
        //添加保存按钮
        poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
//        poCtrl.addCustomToolButton("加盖印章", "InsertSeal()", 2);
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        poCtrl.setWriter(doc);
        //设置保存页面
        poCtrl.setSaveFilePage("savefile.do");

        //打开excel
        poCtrl.webOpen("/customermanage/doc/jywtszg.docx", OpenModeType.docAdmin,"张三");
        return "pageoffice/Word";
    }

    /**
     * 提交委托单   表示委托单录入完成，readOnly = 1
     * @param obj
     * @return
     */
    @RequestMapping(value = "/tjReadonlyController")
    @ResponseBody
    public JSONObject tjReadonlyController(@RequestBody JSONObject obj) {
        String wtids = obj.getString("wtid");
        String s1 = wtids.replaceAll("]", "");
        String s2 = s1.replaceAll("\\[", "");
        String [] wtid1  = s2.split(",");
        for (String id : wtid1) {
            String if_sl = "1";
            tqywtMapper.tjUpdateIf_sl(id,if_sl);
        }
        JSONObject object = new JSONObject();
        object.put("success",true);
        return object;
    }

    @RequestMapping(value = "/getDwInfo")
    @ResponseBody
    public JSONArray getDwInfo(String val) {
        JSONArray res = new JSONArray();
        List<Map> list = tqywtMapper.getDwInfo(val);
        res.addAll(list);
        return res;
    }

    private String setEmptyString(String val) {
        if (val == null || "".equals(val) || "null".equals(val) || "undefined".equals(val.toLowerCase())) {
            return "/";
        } else {
            return val;
        }
    }

    @RequestMapping(value = "/ckzfwt", method = RequestMethod.GET)
    public String ckzfwt(Model model,String id) {

        String type="";
        Map wtInfo = this.tqywtMapper.findWtInfoById(id);
        type = wtInfo.get("type")+"";
        if(type.equals("001"))//企业
        {
            String ymbm = "qy";
            HashMap data = new HashMap();
            data.put("ymbm",ymbm);
            List<Map> fields = configService.findById(data);
            model.addAttribute("id",id==null?"":id);
            model.addAttribute("type",type==null?"":type);
            model.addAttribute("fields", fields);
            return "/bggl/bgsh/qywt_jbxxck";
        }else if(type.equals("003"))//政府
        {
            HashMap data = new HashMap();
            data.put("ymbm","zf");
            List<Map> fields = configService.findById(data);
            model.addAttribute("id",id==null?"":id);
            model.addAttribute("fields", fields);
            return "/bggl/bgsh/zfwt_jbxxck";
        }
        else
        {
            return "";
        }
    }
}
