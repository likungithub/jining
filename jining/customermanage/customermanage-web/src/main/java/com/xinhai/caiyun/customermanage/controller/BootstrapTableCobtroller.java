package com.xinhai.caiyun.customermanage.controller;
import com.deepoove.poi.data.PictureRenderData;
import com.deepoove.poi.data.RowRenderData;
import com.deepoove.poi.data.TextRenderData;
import com.deepoove.poi.data.style.Style;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.*;
import com.xinhai.caiyun.customermanage.controller.pageoffice.ExportExcelCrkjl;
import com.xinhai.caiyun.customermanage.controller.pageoffice.WordUtils;
import com.xinhai.caiyun.customermanage.controller.poitl.LzdglController;
import com.xinhai.caiyun.customermanage.dao.BgglMapper;
import com.xinhai.caiyun.customermanage.dao.TLZypglMapper;
import com.xinhai.caiyun.customermanage.dao.TzbfsMapper;
import com.xinhai.caiyun.customermanage.service.CydxxglService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;
import com.zhuozhengsoft.pageoffice.excelwriter.Sheet;
import com.zhuozhengsoft.pageoffice.excelwriter.Workbook;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import service.KcglService;
import sun.misc.BASE64Encoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.xml.crypto.Data;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("datatable")
public class BootstrapTableCobtroller {
    @Autowired
    private KcglService kcglService;
    @Autowired
    private SystemMessagesService systemMessagesService;
    @Autowired
    private TzbfsMapper tzbfsMapper;
    @Autowired
    private TLZypglMapper tlZypglMapper;
    @Autowired
    private BgglMapper bgglMapper;
    @Autowired
    private CydxxglService cydxxglService;
    @RequestMapping(value = "/getAll")
    @ResponseBody
    public DatatablesViewPage getAll(@RequestParam("start")Integer start,
                                     @RequestParam("length")Integer length,
                                     @RequestParam("ypmc")String ypmc,
                                     @RequestParam("dwmc")String dwmc,
                                     @RequestParam("ypbm") String ypbm,
                                     @RequestParam("cyzt")String cyzt,
                                     @RequestParam("cplb")String cplb
                                    ){
        List list = new ArrayList();
        Map map = new HashMap();
        map.put("start",start);
        map.put("length",length);
        map.put("ypmc",ypmc);
        map.put("dwmc",dwmc);
        map.put("ypbm",ypbm);
        map.put("cyzt",cyzt);
        map.put("cplb",cplb);
        list=this.tlZypglMapper.findWt(map);
        Integer count = this.tlZypglMapper.findCount(map);
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalRecords(count);
        datatablesViewPage.setiTotalDisplayRecords(count);
        return datatablesViewPage;
    }
    //样品领取
    @ResponseBody
    @RequestMapping(value = "/ypjs")
    public JSONObject ypLq(@RequestBody JSONObject obj){
        JSONArray ypjsid = obj.getJSONArray("ypjsid");
        JSONArray ypbm = obj.getJSONArray("ypbm");
        JSONArray ypmc = obj.getJSONArray("ypmc");
        List<String> list = new ArrayList<String>();
        for (int i=0;i<ypjsid.size();i++){
            JSONObject o = (JSONObject) ypjsid.get(i);
            String id = o.getString("ypjsid");
            list.add(id);

        }
        String jssj = "";
        if(obj.get("lqsj")!=null)
        {
            jssj = obj.getString("lqsj");
        }
        String lqsl ="";
        if(obj.get("lqsl")!=null)
        {
            lqsl = obj.getString("lqsl");
        }
        String lqdw ="";
        if(obj.get("lqdw")!=null)
        {
            lqdw = obj.getString("lqdw");
        }
//        String lqsl = obj.getString("lqsl");
//        String lqdw = obj.getString("lqdw");
        Map map = new HashMap();
        //获取职员代码
        map.put("zydm", CurrentLoginUser.getUser().getZydm());
        //获取领取部门
        map.put("bmdm",CurrentLoginUser.getUser().getBmdm());
        map.put("ypid",list);
        map.put("jssj",jssj);
        map.put("lqsl",lqsl);
        map.put("lqdw",lqdw);
        this.tlZypglMapper.updatJszt(map);
        //将食水工放入样品制备表中
        //查询出向制备表添加的信息
//        if (ssgList !=null)
//        this.tlZypglMapper.insertSSG(ssgList);
        //消息提醒
        JSONObject jsonObject = new JSONObject();
        SystemMessages systemMessages = new SystemMessages();
        List<String> zydmList = kcglService.queryZydm(CurrentLoginUser.getUser().getBmdm());
        for (int i=0;i<ypmc.size();i++){
            for (String zydm : zydmList) {
                try {
                    JSONObject oypmc = (JSONObject) ypmc.get(i);
                    String iypmc = oypmc.getString("ypmc");
                    //消息提醒
                    String txbt = "";
                    String txnr = "";
                    String txlx = "";
                    txbt = "样品领取完成提醒";
                    txlx = "201";
                    txnr = CurrentLoginUser.getUser().getName() +"领取了样品，样品名称为："+iypmc;
                    systemMessages.setXxid(UUID.randomUUID().toString());
                    systemMessages.setTxlx_dm(txlx);
                    systemMessages.setDljg_bm(CurrentLoginUser.getUser().getDljgBm());
                    systemMessages.setTxbt(txbt);
                    systemMessages.setTxnr(txnr);
                    systemMessages.setFsry_dm(CurrentLoginUser.getUser().getZydm());
                    systemMessages.setFsry_mc(CurrentLoginUser.getUser().getName());
                    systemMessages.setJsry_dm(zydm);
                    systemMessages.setFssj(new Date());
                    systemMessagesService.addSystemMessages(systemMessages);
                } catch (Exception e) {
                    System.out.println("发送消息提醒错误！");
                    e.printStackTrace();
                }
            }
        }
        jsonObject.put("info",true);
        return  jsonObject;
    }

    /**
     * 样品接收
     * @param
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/getypjs")
    public DatatablesViewPage getYpjs(@RequestParam("start")Integer start,
                                      @RequestParam("length")Integer length,
                                      @RequestParam("ypmc")String ypmc,
                                      @RequestParam("dwmc")String dwmc,
                                      @RequestParam("ypbm") String ypbm,
                                      @RequestParam("cyzt")String ifcy,
                                      @RequestParam("cplb")String cplb){
        List list = new ArrayList();
        Map map = new HashMap();
        map.put("start",start);
        map.put("length",length);
        map.put("ypmc",ypmc);
        map.put("dwmc",dwmc);
        map.put("ypbm",ypbm);
        map.put("cyzt",ifcy);
        map.put("cplb",cplb);
        list=this.tlZypglMapper.findWt(map);
        Integer count = this.tlZypglMapper.findCount(map);
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalRecords(count);
        datatablesViewPage.setiTotalDisplayRecords(count);
        return datatablesViewPage;
    }
    //删除样品接收
    @ResponseBody
    @RequestMapping(value = "/scypjs")
    public JSONObject scYplq(@RequestBody JSONObject obj){
        JSONArray ypjsid = obj.getJSONArray("ypjsid");
        List<String> list = new ArrayList<String>();
        for (Object ypid : ypjsid) {
            JSONObject o = (JSONObject) ypid;
            list.add(o.getString("ypjsid"));
        }
        JSONObject jsonObject = new JSONObject();
        return jsonObject;
    }
    //获取样品制备信息列表
    @ResponseBody
    @RequestMapping("/getYpzbList")
    public DatatablesViewPage getYpzbList(@RequestParam("start")Integer start,
                                          @RequestParam("length")Integer length,
                                          @RequestParam("ypmc")String ypmc,
                                          @RequestParam("dwmc")String dwmc,
                                          @RequestParam("ypbm") String ypbm,
                                          @RequestParam("YPZBZT")String ypzbzt,
                                          @RequestParam("cplb")String cplb,
                                          @RequestParam("jylb")String jylb,
                                          @RequestParam("ifcy")String ifcy,
                                          @RequestParam("btime")String btime,
                                          @RequestParam("etime")String etime){
        List list = new ArrayList();
        Map map = new HashMap();
        String zydm = CurrentLoginUser.getUser().getZydm();
        map.put("start",start);
        map.put("length",length);
        map.put("ypmc",ypmc);
        map.put("dwmc",dwmc);
        map.put("ypbm",ypbm);
        map.put("ypzbzt",ypzbzt);
        map.put("zydm",zydm);
        map.put("cplb",cplb);
        map.put("jylb",jylb);
        map.put("ifcy",ifcy);
        map.put("btime",btime);
        map.put("etime",etime);
        list=this.tlZypglMapper.findYpzb(map);
        Integer count = this.tlZypglMapper.findYpzbCount(map);
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalRecords(count);
        datatablesViewPage.setiTotalDisplayRecords(count);
        return datatablesViewPage;
    }
    @RequestMapping(value = "/addYpzb")
    @ResponseBody
    public com.alibaba.fastjson.JSONObject addYpzb(HttpServletRequest request){
        /*JSONArray jsonArray=JSONArray.fromObject(object);*/
        //获得jsonArray的第一个元素
        Map map = new HashMap();
        String sb = request.getParameter("sb");
        net.sf.json.JSONArray jsonObject = net.sf.json.JSONArray.fromObject(sb);
        String s =jsonObject.getString(0);
        net.sf.json.JSONObject j = net.sf.json.JSONObject.fromObject(s);
        String zybm = j.getString("zybm");
        String id = j.getString("id");
        String zydw = j.getString("zydw");
        String fybm = j.getString("fybm");
        String fydw = j.getString("fydw");
        String bybm = j.getString("bybm");
        String bydw = j.getString("bydw");
        String zbDate = j.getString("zbDate");
        String zbfs = j.getString("zbfs");
        String ypbm = j.getString("ypbm");
        String zyzl = j.getString("zyzl");
        String byzl = j.getString("byzl");
        String fyzl = j.getString("fyzl");
        String ypmc = j.getString("ypmc");
        String zywz = j.getString("zywz");
        String fywz = j.getString("fywz");
        String bywz = j.getString("bywz");
        boolean flag1 = false;
        boolean flag2 = false;
        boolean flag3 = false;
        String rydm = CurrentLoginUser.getUser().getZydm();
        if (!"".equals(zyzl)){
            map.put("dw",zydw);
            map.put("ypbm",ypbm);
            map.put("ypmc",ypmc);
            map.put("zbfs",zbfs);
            map.put("zbdate",zbDate);
            map.put("zbzl",zyzl);
            map.put("zbybm",ypbm+"-检样1");
            map.put("rydm",rydm);
            map.put("ccwz",zywz);
            map.put("ypid",id);
            map.put("lx","1");
            this.tlZypglMapper.addYpzb(map);
            flag1=true;
        }
        if (!"".equals(byzl)){
            map.put("dw",bydw);
            map.put("ypbm",ypbm);
            map.put("ypmc",ypmc);
            map.put("zbfs",zbfs);
            map.put("zbdate",zbDate);
            map.put("zbzl",byzl);
            map.put("zbybm",ypbm+"-检样3");
            map.put("rydm",rydm);
            map.put("ccwz",bywz);
            map.put("ypid",id);
            map.put("lx","2");
            this.tlZypglMapper.addYpzb(map);
            flag2=true;
        }
        if (!"".equals(fyzl)){
            map.put("dw",fydw);
            map.put("ypbm",ypbm);
            map.put("ypmc",ypmc);
            map.put("zbfs",zbfs);
            map.put("zbdate",zbDate);
            map.put("zbzl",fyzl);
            map.put("zbybm",ypbm+"-检样2");
            map.put("rydm",rydm);
            map.put("ccwz",fywz);
            map.put("ypid",id);
            map.put("lx","3");
            this.tlZypglMapper.addYpzb(map);
            flag3=true;
       }
       if (flag1||flag2||flag3){
            this.tlZypglMapper.updateIFZB(id);
        }
        com.alibaba.fastjson.JSONObject jsonObject1 = new com.alibaba.fastjson.JSONObject();
        jsonObject1.put("success",true);
        return  jsonObject1;
    }

    @RequestMapping(value = "/addYpzbList")
    @ResponseBody
    public com.alibaba.fastjson.JSONObject addYpzbList(HttpServletRequest request){
        /*JSONArray jsonArray=JSONArray.fromObject(object);*/
        //获得jsonArray的第一个元素
        Map map = new HashMap();
        String sb = request.getParameter("sb");
        net.sf.json.JSONArray jsonObject = net.sf.json.JSONArray.fromObject(sb);
        for (int i = 0; i < jsonObject.size(); i++) {
            String s =jsonObject.getString(i);
            net.sf.json.JSONObject j = net.sf.json.JSONObject.fromObject(s);
            String zybm = j.getString("zybm");
            String id = j.getString("id");
            String zydw = j.getString("zydw");
            String fybm = j.getString("fybm");
            String fydw = j.getString("fydw");
            String bybm = j.getString("bybm");
            String bydw = j.getString("bydw");
            String zbDate = j.getString("zbDate");
            String zbfs = j.getString("zbfs");
            String ypbm = j.getString("ypbm");
            String zyzl = j.getString("zyzl");
            String byzl = j.getString("byzl");
            String fyzl = j.getString("fyzl");
            String ypmc = j.getString("ypmc");
            String zywz = j.getString("zywz");
            String fywz = j.getString("fywz");
            String bywz = j.getString("bywz");
            String zbzs = j.getString("zbzs");
            boolean flag1 = false;
            boolean flag2 = false;
            boolean flag3 = false;
            String rydm = CurrentLoginUser.getUser().getZydm();
            if (!"".equals(zyzl)){
                map.put("dw",zydw);
                map.put("ypbm",ypbm);
                map.put("ypmc",ypmc);
                map.put("zbfs",zbfs);
                map.put("zbdate",zbDate);
                map.put("zbzl",zyzl);
                map.put("zbybm",ypbm+"-检样1");
                map.put("rydm",rydm);
                map.put("ccwz",zywz);
                map.put("ypid",id);
                map.put("lx","1");
                map.put("zbzs",zbzs);
                this.tlZypglMapper.addYpzb(map);
                flag1=true;
            }
            if (!"".equals(fyzl)){
                map.put("dw",fydw);
                map.put("ypbm",ypbm);
                map.put("ypmc",ypmc);
                map.put("zbfs",zbfs);
                map.put("zbdate",zbDate);
                map.put("zbzl",fyzl);
                map.put("zbybm",ypbm+"-检样2");
                map.put("rydm",rydm);
                map.put("ccwz",fywz);
                map.put("ypid",id);
                map.put("lx","2");
                map.put("zbzs",zbzs);
                this.tlZypglMapper.addYpzb(map);
                flag3=true;
            }
            if (!"".equals(byzl)){
                map.put("dw",bydw);
                map.put("ypbm",ypbm);
                map.put("ypmc",ypmc);
                map.put("zbfs",zbfs);
                map.put("zbdate",zbDate);
                map.put("zbzl",byzl);
                map.put("zbybm",ypbm+"-检样3");
                map.put("rydm",rydm);
                map.put("ccwz",bywz);
                map.put("ypid",id);
                map.put("lx","3");
                map.put("zbzs",zbzs);
                this.tlZypglMapper.addYpzb(map);
                flag2=true;
            }
            String zydm = CurrentLoginUser.getUser().getZydm();
            if (flag1||flag2||flag3){
                this.tlZypglMapper.updateZbSave(id,zydm);
            }
        }

        com.alibaba.fastjson.JSONObject jsonObject1 = new com.alibaba.fastjson.JSONObject();
        jsonObject1.put("success",true);
        return  jsonObject1;
    }

    @ResponseBody
    @RequestMapping(value = "/zbytj")
    public JSONObject zbytj(@RequestBody JSONObject obj){
        JSONArray ypjsid = obj.getJSONArray("ypjsid");
        List<String> list = new ArrayList<String>();
        for (Object ypid : ypjsid) {
            JSONObject o = (JSONObject) ypid;
            String id = o.getString("ypjsid");
            Map map = new HashMap();
            map.put("ypid",id);
            List countlist = tlZypglMapper.getYpzbJcxminfo(map);
            if (countlist == null || countlist.size() < 1) {    //未添加检测项
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("info",false);
                jsonObject.put("message","选择的样品尚未添加检测项不能完成制备提交。");
                return jsonObject;
            }
        }
        for (Object ypid : ypjsid) {
            JSONObject o = (JSONObject) ypid;
            list.add(o.getString("ypjsid"));
            SystemMessages systemMessages = new SystemMessages();
            List<String> zydmList = kcglService.queryZydm(null);
                for (String zydm : zydmList) {
                    try {
                        String iypmc = o.getString("ypjsid");
                        //消息提醒
                        String txbt = "";
                        String txnr = "";
                        String txlx = "";
                        txbt = "样品制备完成提醒";
                        txlx = "203";
                        txnr = CurrentLoginUser.getUser().getName() +"制备了样品，样品ID为："+iypmc;
                        systemMessages.setXxid(UUID.randomUUID().toString());
                        systemMessages.setTxlx_dm(txlx);
                        systemMessages.setDljg_bm(CurrentLoginUser.getUser().getDljgBm());
                        systemMessages.setTxbt(txbt);
                        systemMessages.setTxnr(txnr);
                        systemMessages.setFsry_dm(CurrentLoginUser.getUser().getZydm());
                        systemMessages.setFsry_mc(CurrentLoginUser.getUser().getName());
                        systemMessages.setJsry_dm(zydm);
                        systemMessages.setFssj(new Date());
                        systemMessagesService.addSystemMessages(systemMessages);
                    } catch (Exception e) {
                        System.out.println("发送消息提醒错误！");
                        e.printStackTrace();
                    }
                }
        }
        Map map = new HashMap();
        //获取职员代码
        map.put("zydm", CurrentLoginUser.getUser().getZydm());
        //获取领取部门
        map.put("bmdm",CurrentLoginUser.getUser().getBmdm());
        map.put("ypid",list);
        map.put("zyname",CurrentLoginUser.getUser().getName());
        this.tlZypglMapper.updateYpzbzt(map);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("info",true);
        return jsonObject;
    }
    //获取样品制备信息
    @ResponseBody
    @RequestMapping(value = "/getYpzbInfo")
    public DatatablesViewPage getYpzbinfo(@RequestParam("ypid") String ypid){
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        List list = this.tlZypglMapper.getYpzbinfo(ypid);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    //    制备信息回显
    @ResponseBody
    @RequestMapping(value = "/HuiXian")
    public com.alibaba.fastjson.JSONObject HuiXian(HttpServletRequest request){
        String id = request.getParameter("zbybm");
        Map map = this.tlZypglMapper.findZbyInfo(id);
        com.alibaba.fastjson.JSONObject jsonObject = new com.alibaba.fastjson.JSONObject();
        jsonObject.put("zbDate",map.get("zbDate"));
        jsonObject.put("zbfs",map.get("zbfs"));
        jsonObject.put("zbzl",map.get("zbzl"));
        jsonObject.put("dw",map.get("dw"));
        return  jsonObject;
    }
    //更新制备信息
    @ResponseBody
    @RequestMapping(value = "/updateYpzb")
    public String updateYpzb(HttpServletRequest request){
        String id = request.getParameter("id");
        String zbDate = request.getParameter("zbDate");
        String zbfs = request.getParameter("zbfs");
        String zbzl = request.getParameter("zbzl");
        String dw = request.getParameter("dw");
        this.tlZypglMapper.updateYpzb(id,zbDate,zbfs,zbzl,dw);
        return "";
    }
    //导出excel
    @ResponseBody
    @RequestMapping(value = "/importExcel")
    public JSONObject daochuexcel(HttpServletRequest request, HttpServletResponse response) throws Exception{
       Map map = new HashMap();
        //样品编码
        String ypbm = request.getParameter("ypbm");
        //样品名称
        String ypmc = request.getParameter("ypmc");
        //单位名称
        String dwmc = request.getParameter("dwmc");
        //任务状态
        String YPZBZT = request.getParameter("rwzt");
        //是否抽样
        String ifcy = request.getParameter("ifcy");
        //产品类别
        String cplb = request.getParameter("cplb");
        //检验类别
        String jylb = request.getParameter("jylb");
        //开始时间
        String btime = request.getParameter("btime");
        //结束时间
        String etime = request.getParameter("etime");
        map.put("ypmc",ypmc);
        map.put("dwmc",dwmc);
        map.put("ypbm",ypbm);
        map.put("ypzbzt",YPZBZT);
        map.put("cplb",cplb);
        map.put("jylb",jylb);
        map.put("ifcy",ifcy);
        map.put("btime",btime);
        map.put("etime",etime);
        JSONObject jsonObject = new JSONObject();
        try {
            OutputStream out = null;
            String [] names = new String[11];
            names[0] = "ID";
            names[1] = "样品编号";
            names[2] = "样品名称";
            names[3] = "制备方法";
            names[4] = "制备量（g）";
            names[5] = "";
            names[6] = "";
            names[7] = "制备人";
            names[8] = "制备日期";
            names[9] = "备注";
            //获取数据
            List<Map> list = this.tlZypglMapper.importExcel(map);
            List<Object[]> dataList = new ArrayList<Object[]>();
            Object[] objects0 = new Object[10];
            dataList.add(objects0);
            Map<String, Object> map2 = list.get(0);
            Set<String> keySet = map2.keySet();
            int m = 1;
            for (String key : keySet) {
                dataList.get(0)[m++] = key;
            }
            for (int i = 0; i < list.size(); i++) {
                Object[] objects = new Object[10];
                dataList.add(objects);
                Map<String, String> map3 = list.get(i);
                Set<String> keySet1 = map3.keySet();
                if (i==0){
                    dataList.get(i)[4] = "正样";
                    dataList.get(i)[5] = "副样";
                    dataList.get(i)[6] = "备样";
                }
                dataList.get(i+1)[0] = map3.get("id");
                dataList.get(i+1)[1] = map3.get("ypbm");
                dataList.get(i+1)[2] = map3.get("ypmc");
                dataList.get(i+1)[3] = map3.get("zbfs");
                String [] zbs = map3.get("zbzl").split(",");
                if (zbs.length==1){
                    dataList.get(i+1)[4] = zbs[0];
                    dataList.get(i+1)[5] = "";
                    dataList.get(i+1)[6] = "";
                }else if (zbs.length==2){

                }else if (zbs.length==3){
                    dataList.get(i+1)[4] = zbs[0];
                    dataList.get(i+1)[5] = zbs[1];
                    dataList.get(i+1)[6] = "";
                }
                dataList.get(i+1)[7] = map3.get("zbrydm");
                dataList.get(i+1)[8] = map3.get("zbDate");
                dataList.get(i+1)[9] = "";
            }
            String name = UUID.randomUUID()+"";
            String headStr = "attachment; filename=\""
                    + new String((name +/*下载后的文件名*/".xls").getBytes("gb2312"), "ISO8859-1") + "\"";
            response.setContentType("octets/stream");
            response.setContentType("APPLICATION/OCTET-STREAM");
            response.setHeader("Content-Disposition", headStr);
            out = response.getOutputStream();
            ExportExcel exportExcel = new ExportExcel("即墨综合检验检测中心样品制备台账",names,dataList,response,bgglMapper,request);
            exportExcel.export(out);
            jsonObject.put("info",true);
        }catch (Exception e){
            jsonObject.put("info",false);
        }
        return jsonObject;
    }
    //导出数据
    @RequestMapping("/importExcel1")
    public void daochuexce2(HttpServletRequest request, HttpServletResponse response) throws Exception {
            String [] names = new String[11];
            names[0] = "ID";
            names[1] = "样品编号";
            names[2] = "样品名称";
            names[3] = "制备方法";
            names[4] = "制备量（g）";
            names[5] = "";
            names[6] = "";
            names[7] = "制备人";
            names[8] = "制备日期";
            names[9] = "备注";
            //获取数据
        Map map = new HashMap();
        //样品编码
        String ypbm = request.getParameter("ypbm");
        //样品名称
        String ypmc = request.getParameter("ypmc");
        //单位名称
        String dwmc = request.getParameter("dwmc");
        //任务状态
        String YPZBZT = request.getParameter("rwzt");
        //是否抽样
        String ifcy = request.getParameter("ifcy");
        //产品类别
        String cplb = request.getParameter("cplb");
        //检验类别
        String jylb = request.getParameter("jylb");
        //开始时间
        String btime = request.getParameter("btime");
        //结束时间
        String etime = request.getParameter("etime");
        map.put("ypmc",ypmc);
        map.put("dwmc",dwmc);
        map.put("ypbm",ypbm);
        map.put("ypzbzt",YPZBZT);
        map.put("cplb",cplb);
        map.put("jylb",jylb);
        map.put("ifcy",ifcy);
        map.put("btime",btime);
        map.put("etime",etime);

            List<Map> list = this.tlZypglMapper.importExcel(map);
            List<Object[]> dataList = new ArrayList<Object[]>();
//            Object[] objects0 = new Object[10];
//            dataList.add(objects0);
//            Map<String, Object> map2 = list.get(0);
//            Set<String> keySet = map2.keySet();
//            int m = 1;
//            for (String key : keySet) {
//                dataList.get(0)[m++] = key;
//            }
            for (int i = 0; i < list.size(); i++) {
                Object[] objects = new Object[10];
                dataList.add(objects);
                Map<String, String> map3 = list.get(i);
                Set<String> keySet1 = map3.keySet();
                if (i==0){
                    dataList.get(i)[4] = "正样";
                    dataList.get(i)[5] = "副样";
                    dataList.get(i)[6] = "备样";
                }
                dataList.get(i+1)[0] = map3.get("id");
                dataList.get(i+1)[1] = map3.get("ypbm");
                dataList.get(i+1)[2] = map3.get("ypmc");
                dataList.get(i+1)[3] = map3.get("zbfs");
                if (i==0){
                    dataList.get(i)[4] = "正样";
                    dataList.get(i)[5] = "副样";
                    dataList.get(i)[6] = "备样";
                }
                dataList.get(i+1)[0] = map3.get("id");
                dataList.get(i+1)[1] = map3.get("ypbm");
                dataList.get(i+1)[2] = map3.get("ypmc");
                dataList.get(i+1)[3] = map3.get("zbfs");
                String [] zbs = map3.get("zbzl").split(",");
                if (zbs.length==1){
                    dataList.get(i+1)[4] = zbs[0];
                    dataList.get(i+1)[5] = "";
                    dataList.get(i+1)[6] = "";
                }else if (zbs.length==2){
                    dataList.get(i+1)[4] = zbs[0];
                    dataList.get(i+1)[5] = zbs[1];
                    dataList.get(i+1)[6] = "";
                }else if (zbs.length==3){
                    dataList.get(i+1)[4] = zbs[0];
                    dataList.get(i+1)[5] = zbs[2];
                    dataList.get(i+1)[6] = zbs[1];
                }
                dataList.get(i+1)[7] = map3.get("zbrydm");
                dataList.get(i+1)[8] = map3.get("zbDate");
                dataList.get(i+1)[9] = "";
            }
            String name = UUID.randomUUID()+"";
            String headStr = "attachment; filename=\""
                    + new String((name +/*下载后的文件名*/".xls").getBytes("gb2312"), "ISO8859-1") + "\"";
            response.setContentType("octets/stream");
            response.setContentType("APPLICATION/OCTET-STREAM");
            response.setHeader("Content-Disposition", headStr);
        OutputStream out = response.getOutputStream();
            ExportExcel exportExcel = new ExportExcel("即墨综合检验检测中心样品制备台账",names,dataList,response,bgglMapper,request);
            exportExcel.export(out);
    }
    //还样信息
    @ResponseBody
    @RequestMapping(value = "/findHuanYang")
    public DatatablesViewPage findHuanYang(@RequestParam("start") Integer start,
                                           @RequestParam("length") Integer length,
                                            @RequestParam("ypmc") String ypmc,
                                           @RequestParam("ypbm") String ypbm
                                           ){
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        //获取当前职员代码
        String zydm = CurrentLoginUser.getUser().getZydm();
        List<Map> list = this.tlZypglMapper.findHuanYang(zydm,start,length,ypmc,ypbm);
        Integer count = this.tlZypglMapper.fingHuangYangCount(zydm,ypmc,ypbm);
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalDisplayRecords(count);
        datatablesViewPage.setiTotalRecords(count);
        return datatablesViewPage;
    }
    //退样操作
    @ResponseBody
    @RequestMapping(value = "/tysl")
    public JSONObject tysl(@RequestBody JSONObject obj){
        JSONObject jsonObject = new JSONObject();
        try {
        JSONArray yptyid = obj.getJSONArray("yptyid");
        String tyzl = obj.getString("tyzl");
        List<String> list = new ArrayList<String>();
        for (Object ypid : yptyid) {
            JSONObject o = (JSONObject) ypid;
            list.add(o.getString("yptyid"));
        }
        Map map = new HashMap();
        map.put("yptyid",list);
        map.put("tyzl",tyzl);
        map.put("tyrydm",CurrentLoginUser.getUser().getZydm());
        this.tlZypglMapper.updateTyInfo(map);
        jsonObject.put("info",true);
        }catch (Exception e){
            jsonObject.put("info",false);
        }
        return jsonObject;
    }

    //扫码操作
    @ResponseBody
    @RequestMapping(value = "/tyslsm")
    public JSONObject tyslsm(@RequestBody JSONObject obj){
        JSONObject jsonObject = new JSONObject();
        try {
            String yptyid = obj.getString("yptyid");
            String tyzl = obj.getString("tyzl");
            List<String> list = new ArrayList<String>();
            String ypzbid = tlZypglMapper.findYpzbid(yptyid);
            list.add(ypzbid);

            Map map = new HashMap();
            map.put("yptyid",list);
            map.put("tyzl",tyzl);
            map.put("tyrydm",CurrentLoginUser.getUser().getZydm());
            this.tlZypglMapper.updateTyInfo(map);
            jsonObject.put("info",true);
        }catch (Exception e){
            jsonObject.put("info",false);
        }
        return jsonObject;
    }
    //还样接收信息查询
    @ResponseBody
    @RequestMapping(value = "/findJiesou")
    public DatatablesViewPage findJiesou(@RequestParam("start") Integer start,
                                         @RequestParam("length") Integer length,
                                         @RequestParam("ypmc") String ypmc,
                                         @RequestParam("ypbm") String ypbm){
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        //查询数据
        List<Map> list = this.tlZypglMapper.findJiesou(start,length,ypmc,ypbm);
        Integer count = this.tlZypglMapper.findJiesouCount(start,length,ypmc,ypbm);
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalRecords(count);
        datatablesViewPage.setiTotalDisplayRecords(count);
        return datatablesViewPage;
    }
    //还样接收信息更改
    @ResponseBody
    @RequestMapping(value = "/tyjs")
    public JSONObject tyjs(@RequestBody JSONObject jsonObject){
        JSONArray jsonArray= jsonObject.getJSONArray("yptyid");
   /*     String jszl = jsonObject.getString("jszl");*/
        JSONObject object = new JSONObject();
        List<String> list = new ArrayList<String>();
        for (Object ypid : jsonArray) {
            JSONObject o = (JSONObject) ypid;
            list.add(o.getString("yptyid"));
        }
        String zydm = CurrentLoginUser.getUser().getZydm();
        String zyname = CurrentLoginUser.getUser().getName();
        Map map = new HashMap();
        map.put("list",list);
        map.put("tyjsrydm",zydm);
        map.put("tyjsryname",zyname);
        this.tlZypglMapper.jsqr(map);
        object.put("info",true);
        return  object;
    }
    //退样信息
    @ResponseBody
    @RequestMapping(value = "thyy")
    public JSONObject thyy(@RequestBody JSONObject obj){
        JSONObject jsonObject = new JSONObject();
        try {
            JSONArray yptyid = obj.getJSONArray("yptyid");
            String thyy = obj.getString("tyzl");
            List<String> list = new ArrayList<String>();
            for (Object ypid : yptyid) {
                JSONObject o = (JSONObject) ypid;
                list.add(o.getString("yptyid"));
            }
            Map map = new HashMap();
            map.put("yptyid",list);
            map.put("thyy",thyy);
            map.put("tyrydm",CurrentLoginUser.getUser().getZydm());
            this.tlZypglMapper.tuiHuiInfo(map);
            jsonObject.put("info",true);
        }catch (Exception e){
            jsonObject.put("info",false);
        }
        return jsonObject;
    }
    /**
     * 出入库记录
     */
    @RequestMapping(value = "crkjl")
    public void importEcel(HttpServletRequest request,HttpServletResponse response) throws Exception {
        String [] names = new String[16];
        names[0] = "ID";
        names[1] = "样品编号";
        names[2] = "样品名称";
        names[3] = "正样存入量（g）";
        names[4] = "副样存入量（g）";
        names[5] = "备样存入量（g）";
        names[6] = "存放位置";
        names[7] = "";
        names[8] = "";
        names[9] = "正样";
        names[10] = "";
        names[11] = "副样";
        names[12] = "";
        names[13] = "备样";
        names[14] = "";
        names[15] = "备注";
        //获取数据
        List<Map> list = this.tlZypglMapper.findCykjl();
        List<Object[]> dataList = new ArrayList<Object[]>();
        Object[] objects0 = new Object[16];
        dataList.add(objects0);
        Map<String, Object> map2 = list.get(0);
        Set<String> keySet = map2.keySet();
        int m = 1;
        for (String key : keySet) {
            dataList.get(0)[m++] = key;
        }
        for (int i = 0; i < list.size(); i++) {
            Object[] objects = new Object[16];
            dataList.add(objects);
            Map<String, String> map3 = list.get(i);
            Set<String> keySet1 = map3.keySet();
            if (i==0){
                dataList.get(i)[6] = "正样";
                dataList.get(i)[7] = "副样";
                dataList.get(i)[8] = "备样";
                dataList.get(i)[9] = "领用量（g）";
                dataList.get(i)[10] = "返还量（g）";
                dataList.get(i)[11] = "领用量（g）";
                dataList.get(i)[12] = "返还量（g）";
                dataList.get(i)[13] = "领用量（g）";
                dataList.get(i)[14] = "返还量（g）";
            }
            dataList.get(i+1)[0] = map3.get("id");
            dataList.get(i+1)[1] = map3.get("ypbm");
            dataList.get(i+1)[2] = map3.get("ypmc");
            String [] zbs = map3.get("zbzl").split(",");
            if (zbs.length==1){
                dataList.get(i+1)[3] = zbs[0];
                dataList.get(i+1)[4] = "";
                dataList.get(i+1)[5] = "";
            }else if (zbs.length==2){
                dataList.get(i+1)[3] = zbs[0];
                dataList.get(i+1)[4] = zbs[1];
                dataList.get(i+1)[5] = "";
            }else if (zbs.length==3){
                dataList.get(i+1)[3] = zbs[0];
                dataList.get(i+1)[4] = zbs[2];
                dataList.get(i+1)[5] = zbs[1];
            }else {
                dataList.get(i+1)[3] = "";
                dataList.get(i+1)[4] = "";
                dataList.get(i+1)[5] = "";
            }
            String [] ccwz = map3.get("ccwz").split(",");
            if (ccwz.length==1){
                dataList.get(i+1)[6] = ccwz[2];
                dataList.get(i+1)[7] = "";
                dataList.get(i+1)[8] = "";
            }else if (ccwz.length==2) {
                dataList.get(i+1)[6] = ccwz[0];
                dataList.get(i+1)[7] = ccwz[1];
                dataList.get(i+1)[8] = "";
            }else if (ccwz.length==3){
                dataList.get(i+1)[6] = ccwz[0];
                dataList.get(i+1)[7] = ccwz[2];
                dataList.get(i+1)[8] = ccwz[1];
            }else {
                dataList.get(i+1)[6] = "";
                dataList.get(i+1)[7] = "";
                dataList.get(i+1)[8] = "";
            }
            String lyzl [] = map3.get("lyl").split(",");
            String fhzl [] = map3.get("tyzl").split(",");
            if (lyzl.length<=0){
                dataList.get(i+1)[9] = "";
                dataList.get(i+1)[11] = "";
                dataList.get(i+1)[13] = "";
            }else if (lyzl.length==1){
                dataList.get(i+1)[9] = lyzl[0];
                dataList.get(i+1)[11] = "";
                dataList.get(i+1)[13] = "";
            }else if (lyzl.length==2){
                dataList.get(i+1)[9] = lyzl[0];
                dataList.get(i+1)[11] = lyzl[1];
                dataList.get(i+1)[13] = "";
            }else if (lyzl.length==3){
                dataList.get(i+1)[9] = lyzl[0];
                dataList.get(i+1)[11] = lyzl[1];
                dataList.get(i+1)[13] = lyzl[2];
            }
            if (fhzl.length==3){
                dataList.get(i+1)[10] = fhzl[0];
                dataList.get(i+1)[12] = fhzl[2];
                dataList.get(i+1)[14] = fhzl[1];
            }else if (fhzl.length<=0){
                dataList.get(i+1)[10] = "";
                dataList.get(i+1)[12] = "";
                dataList.get(i+1)[14] = "";
            }else if (fhzl.length==2){
                dataList.get(i+1)[10] = fhzl[0];
                dataList.get(i+1)[12] = fhzl[2];
                dataList.get(i+1)[14] = "";
            }else if (fhzl.length==1){
                dataList.get(i+1)[10] = fhzl[0];
                dataList.get(i+1)[12] = "";
                dataList.get(i+1)[14] = "";
            }
            dataList.get(i+1)[15] = "";
        }
        String name = UUID.randomUUID()+"";
        String headStr = "attachment; filename=\""
                + new String((name +/*下载后的文件名*/".xls").getBytes("gb2312"), "ISO8859-1") + "\"";
        response.setContentType("octets/stream");
        response.setContentType("APPLICATION/OCTET-STREAM");
        response.setHeader("Content-Disposition", headStr);
        OutputStream out = response.getOutputStream();
        ExportExcelCrkjl exportExcel = new ExportExcelCrkjl("即墨综合检验检测中心农产品样品出入库记录",names,dataList);
        exportExcel.export(out);
    }
    /**
     *余样处理显示信息
     */
    @ResponseBody
    @RequestMapping(value = "/yycl")
    public DatatablesViewPage findyyclInfo(@RequestParam("start") Integer start,
                                           @RequestParam("length") Integer length,
                                           @RequestParam("ypmc") String ypmc,
                                           @RequestParam("ypbm") String ypbm){
        Map map = new HashMap();
        map.put("start",start);
        map.put("length",length);
        map.put("ypmc",ypmc);
        map.put("ypbm",ypbm);
       List<Map> list  =this.tlZypglMapper.findYycl(map);
       Integer count = this.tlZypglMapper.findYyclCount(map);
       DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
       datatablesViewPage.setAaData(list);
       datatablesViewPage.setiTotalDisplayRecords(count);
       datatablesViewPage.setiTotalRecords(count);
       return datatablesViewPage;
    }
    /*
    * 余样退还
    * */
    @ResponseBody
    @RequestMapping(value = "/yyth")
    public JSONObject yyth(@RequestBody JSONObject object){
        JSONObject jsonObject = new JSONObject();
        try {
            JSONArray yptyid = object.getJSONArray("yptyid");
            //退回时间
            String thsj = object.getString("thsj");
            //退还量
            String thl = object.getString("thl");
            //退还人
            String thr = object.getString("thry");
            List<String> list = new ArrayList<String>();
            for (Object ypid : yptyid) {
                JSONObject o = (JSONObject) ypid;
                list.add(o.getString("yptyid"));
            }
            Map map = new HashMap();
            map.put("list",list);
            map.put("thsj",thsj);
            map.put("thl",thl);
            map.put("thr",thr);
            map.put("zxrydm",CurrentLoginUser.getUser().getZydm());
            map.put("zxryname",CurrentLoginUser.getUser().getName());
            map.put("zt","1");
            this.tlZypglMapper.updateyyth(map);
            jsonObject.put("info",true);
        }catch (Exception e){
            jsonObject.put("info",false);
        }
        return jsonObject;
    }
    /**
     * 余样处理
     */
    @ResponseBody
    @RequestMapping(value = "/yyclfs")
    public JSONObject yyclfs(@RequestBody JSONObject object){
        JSONObject jsonObject = new JSONObject();
     /*  try {*/
            JSONArray yptyid = object.getJSONArray("yptyid");
            //处理时间
            String clsj = object.getString("clsj");
            //处理量
            String cll = object.getString("cll");
            //处理方式
            String clfs = object.getString("clfs");
            //处理原因
           String clyy = object.getString("clyy");
            List<String> list = new ArrayList<String>();
            for (Object ypid : yptyid) {
                JSONObject o = (JSONObject) ypid;
                list.add(o.getString("yptyid"));
            }
            Map map = new HashMap();
            map.put("list",list);
            map.put("clsj",clsj);
            map.put("cll",cll);
            map.put("clfs",clfs);
            map.put("clyy",clyy);
            map.put("clrydm",CurrentLoginUser.getUser().getZydm());
            map.put("clryname",CurrentLoginUser.getUser().getName());
            map.put("zt","2");
            this.tlZypglMapper.updateyycl(map);
            jsonObject.put("info",true);
       /* }catch (Exception e){
            jsonObject.put("info",false);
        }*/
        return jsonObject;
    }
    /**
     * @author lyh
     * 食品登记簿导出
     */
    @RequestMapping(value = "/importYPDJB")
    @ResponseBody
    public void importYPDJB(HttpServletRequest request,HttpServletResponse response){
        try {
            Map dataMap = new HashMap();
            String lx = request.getParameter("lx");
            String cplb = request.getParameter("cplb");
            if ("1".equals(lx)){
                dataMap.put("CSYRQ","抽样日期");
                dataMap.put("CSYRY","抽样人");
            }else {
                dataMap.put("CSYRQ","送样日期");
                dataMap.put("CSYRY","送样人");
            }
            Map map1 = new HashMap();
            map1.put("ifcy",lx);
            map1.put("cplb",cplb);
        List<Map> list = this.tlZypglMapper.importYPDJB(map1);
        List<YpInfo> infoList = new ArrayList<>();
        for (Map map:list){
            String jylb = map.get("JYXZ")+"";
            String JYLB = "/";
            if ("lxjc".equals(jylb)){
                JYLB="例行监测";
            }else if ("jdcc".equals(jylb)){
                JYLB="监督抽查";
            }else if ("aqcj".equals(jylb)) {
                JYLB="安全抽检";
            }else if ("jdjy".equals(jylb)){
                JYLB="监督检验";
            }else if ("dbsy".equals(jylb)){
                JYLB="对比实验";
            }else if ("lyfc".equals(jylb)){
                JYLB="留样复测";
            }else if ("wtjy".equals(jylb)){
                JYLB="委托检验";
            }
            map.put("JYXZ",JYLB);
        }
            List<RowRenderData> dataList = new ArrayList();
            Style style = new Style();
            for (int i=0;i<list.size();i++){
                Map itemMap = list.get(i);
                RowRenderData rowRenderData = RowRenderData.build(  new TextRenderData(itemMap.get("YPBM")+"",style),
                        new TextRenderData(itemMap.get("YPMC")+"",style),
                        new TextRenderData(itemMap.get("SCDW")+"",style),
                        new TextRenderData( itemMap.get("WTDW")+"",style),
                        new TextRenderData(itemMap.get("JYXZ")+"",style),
                        new TextRenderData(itemMap.get("YPSL")+"",style),
                        new TextRenderData(itemMap.get("CSYRQ")+"",style),
                        new TextRenderData(itemMap.get("BZQ")+"",style),
                        new TextRenderData(itemMap.get("CSYRY")+"",style));
                dataList.add(rowRenderData);
            }
       String url = new LzdglController().createYPDJBDocx(dataMap,dataList,"ypdjb",request,response);
            LzdglController.exportMillCertificateWord(request,response,"样品登记簿",url);
        } catch (Exception e){
        }

    }
    @ResponseBody
    @RequestMapping(value = "/importCPZLJYTX")
    public void importCPZLJYTX(HttpServletRequest request,HttpServletResponse response) throws Exception{
       try {
            List<Map> list = this.tlZypglMapper.importCPZLJYTX();
            List<YpInfoList> infoList = new ArrayList<>();
            for (Map map : list) {
                String jylb = map.get("JYXZ")+"";
                String JYLB = "/";
                if ("lxjc".equals(jylb)){
                    JYLB="例行监测";
                }else if ("jdcc".equals(jylb)){
                    JYLB="监督抽查";
                }else if ("aqcj".equals(jylb)) {
                    JYLB="安全抽检";
                }else if ("jdjy".equals(jylb)){
                    JYLB="监督检验";
                }else if ("dbsy".equals(jylb)){
                    JYLB="对比实验";
                }else if ("lyfc".equals(jylb)){
                    JYLB="留样复测";
                }else if ("wtjy".equals(jylb)){
                    JYLB="委托检验";
                }
                YpInfoList ypInfoList = new YpInfoList();
                ypInfoList.setJYXZ(JYLB);
                ypInfoList.setYPBM(map.get("YPBM") + "");
                ypInfoList.setYPMC(map.get("YPMC") + "");
                ypInfoList.setGGXH(map.get("GGXH") + "");
                ypInfoList.setSB(map.get("SB") + "");
                ypInfoList.setDJ(map.get("DJ") + "");
                ypInfoList.setSJDW(map.get("SJDW") + "");
                ypInfoList.setZT(map.get("ZT") + "");
                ypInfoList.setYPSL(map.get("YPSL") + "");
                ypInfoList.setCYRQY(map.get("CYRQY") + "");
                ypInfoList.setCYRQT(map.get("CYRQT") + "");
                ypInfoList.setDJRQY(map.get("DJRQY") + "");
                ypInfoList.setDJRQT(map.get("DJRQT") + "");
                ypInfoList.setCYDH(map.get("CYDH") + "");
                ypInfoList.setLQSJY(map.get("LQSJY") + "");
                ypInfoList.setLQSJT(map.get("LQSJT") + "");
                ypInfoList.setLQZL(map.get("LQZL") + "");
                String url = this.bgglMapper.getDzqz(map.get("LQRY") + "");
                if (url==null){
                    ypInfoList.setLQRY("");
                }else {
                    ypInfoList.setLQRY(getImageStr(request,url));
                }

                ypInfoList.setTHSJ(map.get("THSJ") + "");
                ypInfoList.setTHL(map.get("THL") + "");
                ypInfoList.setBFZL(map.get("BFZL") + "");
                ypInfoList.setCLSJY(map.get("CLSJY") + "");
                ypInfoList.setCLSJT(map.get("CLSJT") + "");
                infoList.add(ypInfoList);
            }
            Map mapinfo = new HashMap();
            mapinfo.put("YpInfoList", infoList);
            WordUtils.exportMillCertificateWord(request, response, mapinfo, "报告下载", "CPZLJYTX.ftl");
       } catch (Exception e) {

        }
    }
        public  String getImageStr(HttpServletRequest request,String imgFile) {
            InputStream in = null;
            byte[] data = null;
            try {
            File file = new File(request.getSession().getServletContext().getRealPath("/")+"/"+imgFile);
                in = new FileInputStream(file);
                data = new byte[in.available()];
                in.read(data);
                in.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            BASE64Encoder encoder = new BASE64Encoder();
            return encoder.encode(data);
        }
    /**
     * 获取所有制备方式
     * @author lyh
     */
    @RequestMapping(value = "/getAllZbfs")
    @ResponseBody
    public JSONObject getAllZbfs(HttpServletRequest request){
        JSONObject object = new JSONObject();
        String lx = request.getParameter("lx");
        List<Map<String,String>> dataList = this.tzbfsMapper.findAll(lx);
        object.put("info",dataList);
        return object;
    }
    /**
     * 制备样返还
     */
    @RequestMapping(value = "/zbypth")
    @ResponseBody
    public DatatablesViewPage getZbyAll(@RequestParam("start")Integer start,
                                        @RequestParam("length")Integer length,
                                        @RequestParam("ypmc")String ypmc,
                                        @RequestParam("ypbm")String ypbm,
                                        @RequestParam("jclbdm")String jclbdm){
        JSONObject jsonObject = new JSONObject();
        Map map = new HashMap();
        map.put("start",start);
        map.put("length",length);
        map.put("ypmc",ypmc);
        map.put("ypbm",ypbm);
        map.put("jclbdm",jclbdm);
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        List dataMap = this.tlZypglMapper.findZBfhInfo(map);
        Integer count = this.tlZypglMapper.findZBfhInfoCount(map);
        datatablesViewPage.setAaData(dataMap);
        datatablesViewPage.setiTotalRecords(count);
        datatablesViewPage.setiTotalDisplayRecords(count);
        return datatablesViewPage;
    }
    @ResponseBody
    @RequestMapping(value = "/zbypthsl")
    public JSONObject getZbypsl(@RequestBody JSONObject object){
        JSONObject jsonObject = new JSONObject();
        JSONArray array = object.getJSONArray("yptyid");
        List list = new ArrayList();
        for (int i=0;i<array.size();i++){
            JSONObject object1 =(JSONObject)array.get(i);
            String id = object1.get("yptyid").toString();
            list.add(id);
        }
        Map map = new HashMap();
        //当前人员代码
        String zydm = CurrentLoginUser.getUser().getZydm();
        //获取当前人员名称
        String zyname = CurrentLoginUser.getUser().getName();
        map.put("list",list);
        map.put("zl",object.get("tyzl").toString());
        map.put("zydm",zydm);
        map.put("zyname",zyname);
        this.tlZypglMapper.updateZBINFO(map);
        jsonObject.put("success",true);
        return jsonObject;
    }
    /**
     * 判断样品登记簿是否存有数据
     */
    @ResponseBody
    @RequestMapping(value = "/canExportYpdjb")
    public JSONObject canExport(@RequestBody JSONObject object){
        JSONObject object1 = new JSONObject();
        Map dataMap = new HashMap();
        dataMap.put("cplb",object.get("cplb")+"");
        dataMap.put("ifcy",object.get("ifcy")+"");
        dataMap.put("s_time",object.get("s_time")+"");
        dataMap.put("e_time",object.get("e_time")+"");
        Integer count = this.tlZypglMapper.canExport(dataMap);
        if (count!=null){
            object1.put("info",true);
        }else {
            object1.put("info",false);
        }
        return  object1;
    }
    /**
     * 样品领取数量和单位回显
     */
    @ResponseBody
    @RequestMapping(value = "/getypsl")
    public JSONObject getYpslandDw(HttpServletRequest request){
        String ypid = request.getParameter("ypid");
        JSONObject object = new JSONObject();
        Map dataMap = this.tlZypglMapper.findYpslAndDwByYpid(ypid);
        object.put("YPSL",dataMap.get("YPSL"));
        object.put("YPDW",dataMap.get("YPDW"));
        return object;
    }
    /**
     * 余样处理信息
     */
    @RequestMapping(value = "/exportyycl")
    public JSONObject getYYCLinfo(HttpServletRequest request,HttpServletResponse response)throws Exception{
        JSONObject object = new JSONObject();
        Map map1 = new HashMap();
        List<Map> dataList = this.tlZypglMapper.exportYPCLInfo(map1);
        List<RowRenderData> dataList1 = new ArrayList();
        Style style = new Style();
        Map map = new HashMap();
        for (int i=0;i<dataList.size();i++){
            Map itemMap = dataList.get(i);
            RowRenderData rowRenderData = RowRenderData.build(  new TextRenderData(itemMap.get("YPBM")+"",style),
                    new TextRenderData(itemMap.get("YPMC")+"",style),
                    new TextRenderData(itemMap.get("GGXH")+"",style),
                    new TextRenderData( itemMap.get("JYLB")+"",style),
                    new TextRenderData(itemMap.get("CLL")+"",style),
                    new TextRenderData(itemMap.get("CLYY")+"",style),
                    new TextRenderData(itemMap.get("CLFS")+"",style),
                    new TextRenderData("{{@CLRY"+i+"}}",style),
                    new TextRenderData(itemMap.get("CLSJ")+"",style));
            dataList1.add(rowRenderData);
            map.put("CLRY"+i,new PictureRenderData(60,40,request.getSession().getServletContext().getRealPath("/")+"/"+
            this.bgglMapper.getDzqz(itemMap.get("CLRYDM")+"")));
        }
        map.put("1","2");
       String url = new LzdglController().createYPCLJL(map,dataList1,"ypcljl",request,response);
       String imageurl = new LzdglController().createImage(url,map);
        LzdglController.exportMillCertificateWord(request,response,"样品处理记录",imageurl);
        return object;
    }
    /**
     * 余样处理
     * 样品剩余量回显
     */
    @ResponseBody
    @RequestMapping
    public JSONObject getyyclhx(HttpServletRequest request){
        JSONObject object = new JSONObject();
        return  object;
    }

    /**
     *
     * 样品删除
     */
    @ResponseBody
    @RequestMapping(value = "/ypsc")
    public JSONObject deleteSampleAll(@RequestBody String[] ids){
        for (int i = 0; i < ids.length; i++){
            tlZypglMapper.deleteSampleAll(ids[i]);
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("info",true);
        return  jsonObject;
    }

    /*导入Excel表中的数据*/
    @RequestMapping(value = "/downloadCydExcel")
    @OperateLog(describe = "loading.....")
    @ResponseBody
    public void downloadExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String importYqcgsq = "/ExcelModels/ypmodal.xlsx";//导入摸板路径
        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName="+new String("ypmodal.xlsx".getBytes("GBK"),"ISO-8859-1"));
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
    @RequestMapping(value = "/importYpExcel")
    @ResponseBody
    public com.alibaba.fastjson.JSONObject importYpExcel(HttpServletRequest request, Model model) throws Exception {
        //获取上传的文件
        String wtid = request.getParameter("wtid");
        MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
        MultipartFile file = multipart.getFile("upcydxxglFile");
        InputStream in = file.getInputStream();
        String name=file.getOriginalFilename();
        cydxxglService.importypExcel(in,file,name,wtid);
        //数据导入
        in.close();
        com.alibaba.fastjson.JSONObject jo=new com.alibaba.fastjson.JSONObject();
        jo.put("success",true);
        return jo;
    }

    @ResponseBody
    @RequestMapping(value = "/selectyplq")
    public DatatablesViewPage selectyplq(@RequestParam("start")String start,
                                      @RequestParam("length")String length,
                                      @RequestParam("ksrq")String ksrq,
                                      @RequestParam("jsrq")String jsrq){
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("ksrq",ksrq);
        map.put("jsrq",jsrq);

        List<Map> list=this.tlZypglMapper.findYplqdy(map);
        Integer count = this.tlZypglMapper.findYplqdycount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();

        dv.setAaData(list);
        dv.setiTotalDisplayRecords(count);
        dv.setiTotalRecords(count);
        return dv;
    }
    @RequestMapping(value = "/dyYplq")
    public String daYplq(HttpServletRequest request){
        Workbook wb = new Workbook();
        Sheet sheet = wb.openSheet("Sheet1");
        String ksrq = request.getParameter("ksrq");
        String jsrq = request.getParameter("jsrq");
        Map map = new HashMap();
        map.put("ksrq",ksrq);
        map.put("jsrq",jsrq);
        List<Map> list=this.tlZypglMapper.findYplq(map);

        for (int i =0;i<list.size();i++){
            sheet.openCell("A"+(i+2)).setValue(String.valueOf(i+1));
            sheet.openCell("B"+(i+2)).setValue(String.valueOf(list.get(i).get("lrrq")));
            sheet.openCell("C"+(i+2)).setValue(String.valueOf(list.get(i).get("ypmc")));
            sheet.openCell("D"+(i+2)).setValue(String.valueOf(list.get(i).get("scdw")));
            sheet.openCell("E"+(i+2)).setValue(String.valueOf(list.get(i).get("syry")));
            sheet.openCell("F"+(i+2)).setValue(String.valueOf(list.get(i).get("wtid")));
            sheet.openCell("G"+(i+2)).setValue(String.valueOf(list.get(i).get("ypbm")));
            sheet.openCell("H"+(i+2)).setValue(String.valueOf(list.get(i).get("ypsl")));
            sheet.openCell("I"+(i+2)).setValue(String.valueOf(list.get(i).get("bysl")));
            sheet.openCell("J"+(i+2)).setValue(String.valueOf(list.get(i).get("jsr")));
        }



        PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
        //添加保存按钮
        poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        //设置保存页面
        poCtrl.setSaveFilePage("savefile.do");
        poCtrl.setWriter(wb);
        //打开excel
        poCtrl.webOpen("/customermanage/doc/yplqdy.xlsx",OpenModeType.xlsNormalEdit,"张三");
        return "pageoffice/Excel";
    }

    //打印交接登记表
    @RequestMapping(value = "/dyjjdjb")
    public String dyjjdjb(HttpServletRequest request){
        Workbook wb = new Workbook();
        Sheet sheet = wb.openSheet("Sheet1");
        String ypbm = request.getParameter("ypbm");
        String[] ypbms = ypbm.split(",");
        List ypbms1 = new ArrayList();
        for (int i = 0; i < ypbms.length; i++) {
            ypbms1.add(ypbms[i]);
        }
        List<Map> list = this.tlZypglMapper.finddjb(ypbms1);
        for (int i =0;i<list.size();i++){
            sheet.openCell("A"+(i+2)).setValue(String.valueOf(list.get(i).get("ypbm")));
            sheet.openCell("B"+(i+2)).setValue(String.valueOf(list.get(i).get("ypmc")));
            sheet.openCell("C"+(i+2)).setValue(String.valueOf(list.get(i).get("ypsl")));
            sheet.openCell("D"+(i+2)).setValue(String.valueOf(list.get(i).get("jyname")));
            sheet.openCell("E"+(i+2)).setValue(String.valueOf(list.get(i).get("lqrq")));
            sheet.openCell("F"+(i+2)).setValue(String.valueOf(list.get(i).get("bysl")));
            sheet.openCell("G"+(i+2)).setValue(String.valueOf(list.get(i).get("byname")));
            sheet.openCell("H"+(i+2)).setValue(String.valueOf(list.get(i).get("lqrq")));
        }



        PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
        //添加保存按钮
        poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        //设置保存页面
        poCtrl.setSaveFilePage("savefile.do");
        poCtrl.setWriter(wb);
        //打开excel
        poCtrl.webOpen("/customermanage/doc/jjdjbModel.xlsx",OpenModeType.xlsNormalEdit,"张三");
        return "pageoffice/Excel";
    }

    //20190907优化检测领样列表获取
    @ResponseBody
    @RequestMapping("/getYpzbListNew")
    public DatatablesViewPage getYpzbListNew(HttpServletRequest request){
        Map map = getQueryTj(request);
        String ypmc = request.getParameter("ypmc");
        String dwmc = request.getParameter("dwmc");
        String ypbm = request.getParameter("ypbm");
        String ypzbzt = request.getParameter("YPZBZT");
        String cplb = request.getParameter("cplb");
        String jylb = request.getParameter("jylb");
        String ifcy = request.getParameter("ifcy");
        String btime = request.getParameter("btime");
        String etime = request.getParameter("etime");
        String xzks = request.getParameter("xzks");
        List list = new ArrayList();

        if (notNULL(ypmc)) {
            map.put("ypmc",ypmc);
        }
        if (notNULL(dwmc)) {
            map.put("dwmc",dwmc);
        }
        if (notNULL(ypbm)) {
            map.put("ypbm",ypbm);
        }
        if (notNULL(ypzbzt)) {
            map.put("ypzbzt",ypzbzt);
        }
        if (notNULL(cplb)) {
            map.put("cplb",cplb);
        }
        if (notNULL(jylb)) {
            map.put("jylb",jylb);
        }
        if (notNULL(ifcy)) {
            map.put("ifcy",ifcy);
        }
        if (notNULL(btime)) {
            map.put("btime",btime);
        }
        if (notNULL(etime)) {
            map.put("etime",etime);
        }
        if (notNULL(xzks)) {
            map.put("xzks",xzks);
        }
        list=this.tlZypglMapper.findYpzbNew(map);
        Integer count = this.tlZypglMapper.findYpzbCountNew(map);
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalRecords(count);
        datatablesViewPage.setiTotalDisplayRecords(count);
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
}
