package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.commonmanager.api.MaxAtomicInteger;
import com.xinhai.caiyun.commonmanager.utils.GetDate;
import com.xinhai.caiyun.systemmanager.api.T_ypgl;
import com.xinhai.caiyun.systemmanager.api.Trwgl;
import com.xinhai.caiyun.systemmanager.dao.TrwglMapper;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import service.TrwglService;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by  on 2018/3/29 0029.
 *
 * @escription: 修改记录controller
 * @tableName:
 */
@org.springframework.stereotype.Controller
@RequestMapping("rwgl")
public class TrwglController {

    @Autowired
    private MaxAtomicInteger maxAtomicInteger;

    @Autowired
    private TrwglService trwglService;

    @Autowired
    private TrwglMapper trwglMapper;

    /**
    * @Description: dataTables表格数据
    * @Param:
    * @return:
    * @Author: Mr.Li
    * @Date: 2018/3/29 0029
    */
//    @RequestMapping(value = "/saveZfwt",method = RequestMethod.POST)
//    @ResponseBody
//    public JSONObject saveZfwt(@RequestBody String khxx) {
//        Trwgl tzfwt = JSON.parseObject(khxx, Trwgl.class);
//        String wtid = maxAtomicInteger.getMaxWtbm();
//        tzfwt.setWtid(wtid);
//        tzfwt.setType("001"); //委托类型 001政府  002企业
//        tzfwt.setLrry(CurrentLoginUser.getUser().getZydm());
//        tzfwt.setBmdm(CurrentLoginUser.getUser().getBmdm());
//        tzfwtService.createTrwgl(tzfwt);
//        if (tzfwt.isIf_cy()) { // 选择抽样
//            Trwgl trwgl = new Trwgl();
//            trwgl.setRwid(generateRwId());
//            trwgl.setRwmc(tzfwt.getDwmc() + "政府委托抽样任务");
//            trwgl.setRwType("001"); // 001政府  002企业
//            trwgl.setBlzt("002"); //办理中
//            trwgl.setSjly("1"); //数据来源
//            trwgl.setWtid(wtid);
//            trwgl.setWtdwmc(tzfwt.getDwmc());
//            trwgl.setWtType("001");
//            trwgl.setLrry(CurrentLoginUser.getUser().getZydm());
//            trwgl.setBmdm(CurrentLoginUser.getUser().getBmdm());
//            trwglService.createTrwgl(trwgl);
//        }
//        JSONObject object = new JSONObject();
//        object.put("success",true);
//        return object;
//    }

    /**
     * @Description: 获取单个任务数据
     * @param id
     * @return
     */
    @RequestMapping(value = "/getRw/{id}",method = RequestMethod.GET)
    @ResponseBody
    public JSONObject getRw(@PathVariable("id") String id) {
        Trwgl tzfwt = trwglService.findTrwgl(id);
        JSONObject object = new JSONObject();
        object.put("success",true);
        object.put("data",tzfwt);
        return object;
    }

    /**
     * 更新任务
     * @param rwxx 客户信息
     * @param id id
     * @throws Exception 抛出异常
     * @return 增加状态
     */
    @RequestMapping(value = "/updateRW/{id}", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject updateRW(@RequestBody String rwxx, @PathVariable("id") String id) throws Exception {
        Trwgl trwxx = JSON.parseObject(rwxx, Trwgl.class);
        trwxx.setGxry(CurrentLoginUser.getUser().getZydm());
        trwxx.setId(Long.parseLong(id));

        List<T_ypgl> list = trwxx.getList();
        for (T_ypgl yp : list) {
            trwglMapper.updateCYYP(yp);
        }
        trwglService.updateTrwgl(trwxx);
        JSONObject returnData = new JSONObject();
        return returnData;
    }


        /**
         * @Description: dataTables表格数据
         * @Param:
         * @return:
         * @Author: Mr.Li
         * @Date: 2018/3/29 0029
         */
//    @RequestMapping(value = "/delZfwt/{id}",method = RequestMethod.POST)
//    @ResponseBody
//    public JSONObject delZfwt(@PathVariable("id") String id) {
//        tzfwtService.deleteTrwglbyId(id, CurrentLoginUser.getUser().getZydm());
//        JSONObject object = new JSONObject();
//        object.put("success",true);
//        return object;
//    }

    /**
     * 获取政府委托列表(初始跳转时)
     * @param searchText1 客户名称
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getRwAll", method = RequestMethod.GET)
    @ResponseBody
    public DatatablesViewPage<Trwgl> getRwAll(@RequestParam("start") String start,
                                              @RequestParam("length") String length,
                                              @RequestParam("searchText1") String searchText1,
                                              @RequestParam("rwType") String rwType,
                                              @RequestParam("wtType") String wtType,
                                              @RequestParam("rwzt") String rwzt) throws Exception {
        List<Trwgl> list = new ArrayList<Trwgl>();
        if (searchText1.equals("")) {
            searchText1 = null;
        }
        if (rwType.equals("")) {
            rwType = null;
        }
        if (wtType.equals("")) {
            wtType = null;
        }
        int num = 0;

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date HtstartDate=null,HtendDate=null,BgstartDate=null,BgendDate=null;
        String zydm = CurrentLoginUser.getUser().getZydm(); //代表登录时展示个人数据，当前用户无派工权限，职员代码为当前用户的

        list = trwglService.findTrwgllist(Integer.parseInt(start), Integer.parseInt(length), rwType, wtType,searchText1, zydm,rwzt);
        num = trwglService.findTrwgllistNums(rwType, wtType,searchText1, zydm);

        DatatablesViewPage<Trwgl> datatablesViewPage = new DatatablesViewPage<Trwgl>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * @Description: dataTables表格数据
     * @Param:
     * @return:
     * @Author: Mr.Li
     * @Date: 2018/3/29 0029
     */
//    @RequestMapping(value = "/saveQywt",method = RequestMethod.POST)
//    @ResponseBody
//    public JSONObject saveQywt(@RequestBody String khxx) {
//        Trwgl tqywt = JSON.parseObject(khxx, Trwgl.class);
//        String wtid = maxAtomicInteger.getMaxWtbm();
//        tqywt.setWtid(wtid);
//        tqywt.setType("001"); //委托类型 001政府  002企业
//        tqywt.setLrry(CurrentLoginUser.getUser().getZydm());
//        tqywt.setBmdm(CurrentLoginUser.getUser().getBmdm());
//        tqywtService.createTqywt(tqywt);
//        if (tqywt.isIf_cy()) { // 选择抽样
//            Trwgl trwgl = new Trwgl();
//            trwgl.setRwid(generateRwId());
//            trwgl.setRwmc(tqywt.getDwmc() + "企业委托抽样任务");
//            trwgl.setRwType("002"); // 001政府  002企业
//            trwgl.setBlzt("002"); //办理中
//            trwgl.setSjly("1"); //数据来源
//            trwgl.setWtid(wtid);
//            trwgl.setWtdwmc(tqywt.getDwmc());
//            trwgl.setWtType("002");
//            trwgl.setLrry(CurrentLoginUser.getUser().getZydm());
//            trwgl.setBmdm(CurrentLoginUser.getUser().getBmdm());
//            trwglService.createTrwgl(trwgl);
//        }
//        JSONObject object = new JSONObject();
//        object.put("success",true);
//        return object;
//    }

    /**
     * @Description: 获取单个政府委托数据
     * @param id
     * @return
     */
//    @RequestMapping(value = "/getQywt",method = RequestMethod.GET)
//    @ResponseBody
//    public JSONObject getQywt(@RequestParam("id") String id) {
//        Trwgl tqywt = tqywtService.findTqywt(id);
//        JSONObject object = new JSONObject();
//        object.put("success",true);
//        object.put("data",tqywt);
//        return object;
//    }

    /**
     * @Description: dataTables表格数据
     * @Param:
     * @return:
     * @Author: Mr.Li
     * @Date: 2018/3/29 0029
     */
//    @RequestMapping(value = "/updateQywt/{id}",method = RequestMethod.POST)
//    @ResponseBody
//    public JSONObject updateQywt(@RequestBody String khxx, @PathVariable("id") String id) {
//        Trwgl tqywt = JSON.parseObject(khxx, Trwgl.class);
//        tqywt.setGxry(CurrentLoginUser.getUser().getZydm());
//        tqywt.setId(Long.parseLong(id));
//        tqywtService.updateTqywt(tqywt);
//        JSONObject object = new JSONObject();
//        object.put("success",true);
//        return object;
//    }

    /**
     * @Description: dataTables表格数据
     * @Param:
     * @return:
     * @Author: Mr.Li
     * @Date: 2018/3/29 0029
     */
//    @RequestMapping(value = "/delQywt/{id}",method = RequestMethod.POST)
//    @ResponseBody
//    public JSONObject delQywt(@PathVariable("id") String id) {
//        tqywtService.deleteTqywtbyId(id, CurrentLoginUser.getUser().getZydm());
//        JSONObject object = new JSONObject();
//        object.put("success",true);
//        return object;
//    }

    /**
     * @Author: shanliang
     * @Description:生成任务ID
     * @Date:2017-10-27 9:57
     **/
    public String generateRwId() {
        StringBuilder sb = new StringBuilder();
        sb.append("RW");
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String formatStr = formatter.format(new Date());
        sb.append(formatStr);
        int i = (int) (Math.random() * 900) + 100;
        sb.append(i);
        return sb.toString();
    }
    @RequestMapping(value = "/updateblzt")
    @ResponseBody
    public String updateBlzt(String[] idlist,String blzt,String if_jd){
        Integer[] integer = new Integer[idlist.length];
        for (int i = 0;i<idlist.length;i++) {
            integer[i]=Integer.parseInt(idlist[i]);
        }
       this.trwglService.updateBlzt(integer,blzt,if_jd);
        return "1";
    }
    @RequestMapping(value = "/updateblzt002")
    @ResponseBody
    public String updateBlzt002(String[] idlist){
        Integer[] integer = new Integer[idlist.length];
        for (int i = 0;i<idlist.length;i++) {
            integer[i]=Integer.parseInt(idlist[i]);
        }
        this.trwglService.updateBlzt002(integer);
        return "1";
    }
    @RequestMapping(value = "/deleteRw")
    @ResponseBody
    public String deleteRw(String[] ypbm){
        System.out.print(ypbm.length);
        this.trwglService.deleteRw(ypbm);
        return  "1";
    }
    /*更新抽样任务分配i*/
    @RequestMapping(value = "/gxrwwry")
    @ResponseBody
    public String gxrwwry(String[] wtid,String zxry){
        this.trwglService.gxrwwry(wtid,zxry);
        return "1";
    }
    /*查询样品id*/
    @RequestMapping(value = "/getYpId")
    @ResponseBody
    public String getYpId(HttpServletRequest request){
        return this.trwglMapper.getYpId(request.getParameter("ypbm")).toString();
    }
    //提交
    @RequestMapping(value = "/updatejszt")
    @ResponseBody
    public String updatejszt(String id,String jszt){
        return this.trwglMapper.updatejszt(id,jszt);
    }
}
