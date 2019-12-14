package com.xinhai.caiyun.customermanage.controller;

import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.SystemMessages;
import com.xinhai.caiyun.customermanage.api.SystemMessagesService;
import com.xinhai.caiyun.customermanage.dao.BgglMapper;
import com.xinhai.caiyun.customermanage.dao.JcglMapper;
import com.xinhai.caiyun.customermanage.dao.TypglMapper;
import com.xinhai.caiyun.customermanage.dao.YpzbinfoMapper;
import com.xinhai.caiyun.customermanage.service.TypglService;
import com.xinhai.security.api.CurrentLoginUser;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.KcglService;
import sun.misc.BASE64Encoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/ypzb")
public class YpzbController {
    @Autowired
    private KcglService kcglService;
    @Autowired
    private YpzbinfoMapper ypzbinfoMapper;
    @Autowired
    private BgglMapper bgglMapper;
    @Autowired
    private SystemMessagesService systemMessagesService;
    @Autowired
    private JcglMapper jcglMapper;
    @Autowired
    private TypglMapper typglMapper;
    @Autowired
    private TypglService typglService;
    @ResponseBody
    @RequestMapping(value = "/getAll")
    public DatatablesViewPage getAll(@RequestParam("start") Integer start,
                                     @RequestParam("length") Integer length,
                                     @RequestParam("ypmc") String ypmc,
                                     @RequestParam("ypbm") String ypbm){
        Map map = new HashMap();
        map.put("start",start);
        map.put("length",length);
        map.put("ypmc",ypmc);
        map.put("ypbm",ypbm);
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        List<Map> list = this.ypzbinfoMapper.getAll(map);
        Integer count = this.ypzbinfoMapper.getCount(map);
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalDisplayRecords(count);
        datatablesViewPage.setiTotalRecords(count);
        return  datatablesViewPage;
    }
    @ResponseBody
    @RequestMapping(value = "/saveypzb")
    public JSONObject saveYpzb(HttpServletRequest request){
       JSONObject jsonObject = new JSONObject();
       Map ypzbinfo = new HashMap();
//        try {
            Map map = getMap(request.getParameterMap());
            String zydm = map.get("zydm") + "";
            String ypbm = map.get("id") + "";
            String jszt = map.get("jszt") + "";
            String lx = map.get("lx")+"";
            String tjsj = map.get("tjsj")+"";
            String tjrydm = CurrentLoginUser.getUser().getZydm();
            String tjryname = CurrentLoginUser.getUser().getName();
            String lrry = CurrentLoginUser.getUser().getZydm();
            ypzbinfo.put("tjsj",tjsj);
            ypzbinfo.put("tjrydm",tjrydm);
            ypzbinfo.put("tjryname",tjryname);
            String[] ids = ypbm.split(",");
            ypzbinfo.put("list",ids);
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
                ypzbinfoMapper.insert(mapList);
                ypzbinfoMapper.updateYpzbInfo(ypzbinfo);
            });
            if ("204".equals(jszt)){
                for (int i=0;i<ids.length;i++){
                    this.jcglMapper.updateWtLrry(ids[i],zydm);
                    String ypid = this.typglMapper.findypid(ypbm);
                    Map map1 = new HashMap();
                    map1.put("ypid",ypid);
                    map1.put("zxr",zydm);
                    this.typglMapper.insertYpqr(map1);
                }
            }

            jsonObject.put("success", true);
       /* }catch (Exception e){
            jsonObject.put("success", false);
            jsonObject.put("message","保存失败！");
        }*/
        return jsonObject;
    }
    @ResponseBody
    @RequestMapping(value = "/zbypjs")
    public JSONObject zbypjs(@RequestBody JSONObject object){
       JSONArray ids =  object.getJSONArray("id");
       JSONArray ypbms = object.getJSONArray("ypbms");
       String jssj = object.getString("jssj");
       List id = new ArrayList();
        List ypbm = new ArrayList();
       for (Object s:ids){
           JSONObject YPID = (JSONObject) s;
           id.add(YPID.get("yptyid"));
       }
       for (Object s:ypbms){
           JSONObject bm = (JSONObject) s;
           ypbm.add(bm.get("bm"));
           SystemMessages systemMessages = new SystemMessages();
           List<String> zydmList = kcglService.queryZydm(null);
               for (String zydm : zydmList) {
                   try {
                       String iypmc = bm.getString("bm");
                       //消息提醒
                       String txbt = "";
                       String txnr = "";
                       String txlx = "";
                       txbt = "制备样品接收完成提醒";
                       txlx = "201";
                       txnr = CurrentLoginUser.getUser().getName() +"接收了制备样品，样品编码为："+iypmc;
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
       String zydm = CurrentLoginUser.getUser().getZydm();
       String zyname = CurrentLoginUser.getUser().getName();
       Map map = new HashMap();
       map.put("list",id);
       map.put("jssj",jssj);
       map.put("zydm",zydm);
       map.put("zyname",zyname);
       map.put("ypbm",ypbm);
       this.ypzbinfoMapper.updateYpzbTjInfo(map);
       JSONObject object1 = new JSONObject();
       object1.put("info",true);
       return  object1;

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
    public  String getImageStr(HttpServletRequest request,String imgFile) {
        InputStream in = null;
        byte[] data = null;
        File file = new File(request.getSession().getServletContext().getRealPath("/")+"/"+imgFile);
        try {
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
}
