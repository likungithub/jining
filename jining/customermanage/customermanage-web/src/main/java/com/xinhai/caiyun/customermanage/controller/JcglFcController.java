package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.JcglService;
import com.xinhai.caiyun.customermanage.api.SystemMessages;
import com.xinhai.caiyun.customermanage.api.SystemMessagesService;
import com.xinhai.caiyun.customermanage.dao.JcglFcMapper;
import com.xinhai.caiyun.customermanage.dao.YpjcMapper;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;
//肥城专用 检测管理 类
@Controller
@RequestMapping("/jcglFc")
public class JcglFcController {
    /**
     * 日志
     */
    private Logger logger = LogManager.getLogger(JcglFcController.class.getName());

    @Autowired
    private JcglService jcglService;

    @Autowired
    private YpjcMapper ypjcMapper;

    @Autowired
    TransactionTemplate txTemplate;


    @Autowired
    private JcglFcMapper jcglMapper;
    @Autowired
    private SystemMessagesService systemMessagesService;

    public boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
    }

    /**
     * 组装通用查询条件
     * @param request
     * @return
     */
    public Map getQueryTj(HttpServletRequest request) {
        String start = request.getParameter("start");
        String length = request.getParameter("length");

        Map cxtj = new HashMap();
        if (notNULL(start)) {
            cxtj.put("start", Integer.parseInt(start));
        }

        if (notNULL(length)) {
            cxtj.put("length", Integer.parseInt(length));
        }

        User u = CurrentLoginUser.getUser();
        String zydm = u.getZydm();
        cxtj.put("zydm", zydm);
        return cxtj;
    }

    /**
     *
     * 获得人员的信息
     *
     * @return
     */
    @RequestMapping(value = "/rydm", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> rydm(HttpServletRequest request) {
        String ry_fl = request.getParameter("ry_fl");
        Map map = new HashMap();
        map.put("ry_fl",ry_fl);
        return jcglMapper.findAllRydmByBmmc(map);
    }


    //肥城 样品管理——检测任务分配 列表页面 列表数据
    @RequestMapping(value = "/querylist", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage querylist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        cxtj.put("bs", "rwfp");
        cxtj.put("zydm", CurrentLoginUser.getUser().getZydm());
        //增加当前登录人，做样品领取限制
        // cxtj.put("lqryname", CurrentLoginUser.getUser().getName());
        String ypmc = request.getParameter("ypmc");
        String ypbm = request.getParameter("ypbm");
        String fpzt = request.getParameter("fpzt");
        String tjzt = request.getParameter("tjzt");
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
        if (notNULL(ypbm)) {
            cxtj.put("ypbm", ypbm);
        }
        if (notNULL(fpzt)) {
            cxtj.put("fpzt", fpzt);
        }

        long totalCount = jcglMapper.findCount(cxtj);
        List<Map> list = jcglMapper.findAll(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 样品管理中的任务分配
     */
    @RequestMapping(value = "/rwfp_ypjc", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject rwfp_ypjc(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String lrry=CurrentLoginUser.getUser().getZydm();
            SimpleDateFormat smf = new SimpleDateFormat("yyyy-MM-dd");
            String rwfpsj = smf.format(new Date());
            String ids = request.getParameter("id"); //t_ypgl_jbxx的ID 也就是ypid
;

            String str_zxry = request.getParameter("zxry");
            String str_fhry = request.getParameter("fhry");//新增复核人
            String rwfprybm = CurrentLoginUser.getUser().getZydm();//操作人员代码

            String[] idArr = ids.split(",");//样品id集合

            //一次循环 表示 更新一次 t_ypgl_jbxx表
            //删除一次 t_jcgl_rydm  根据 ypid字段
            //对 t_jcgl_rydm 按照 执行人员数量进行插入
            for (int c = 0; c < idArr.length; c++) {
                String ypid = idArr[c]; //一个Id代表一个 被分配的数据
                List<Map> list_zxry = new ArrayList<Map>(); //执行人集合 也就是 检测人 一个样品会有多个
                //这个是 一个 样品
                Map map = new HashMap();
                map.put("zt","002");
                if (notNULL(ypid)) {
                    map.put("ypid", ypid);
                }
                if (notNULL(lrry)) {
                    map.put("lrry", lrry);
                }
//                map.put("rwfpsj",rwfpsj);
//                map.put("fhry_dm",str_fhry);
//                map.put("rwfprybm",rwfprybm);
//                map.put("ypjcxm",ypid+jcxmid+"");//样品和检测项目的拼接字符串  将来要做处理  唉。。现在没有检测项 坑
                if(str_zxry!=null &&  !"".equals(str_zxry)){        //多个 任务检测人员 做多个对象
                    String[] arr_zxry=str_zxry.split(",");
                    for (int i = 0; i < arr_zxry.length; i++) {
                        //一个执行人
                        Map list_map=new HashMap();
                        list_map.put("ypid",ypid);
                        list_map.put("fhry_dm",str_fhry);
                        list_map.put("lrry",lrry);
                        list_map.put("zxry",arr_zxry[i]);
                        list_zxry.add(list_map);
                    }
                }
                if (list_zxry.size()!=0) {
                    map.put("list_zxry", list_zxry);
                }
                jcglMapper.rwfp_ypjc(map);
            }

            json.put("success", true);
        } catch (Exception e) {
            e.printStackTrace();
            json.put("success", false);
        }
        return json;
    }
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    ////////////////////////////////下面的先不动//////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////



    /**
     * 陈
     * 样品检测信息数据显示
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/ypjc/querylist")
    @ResponseBody
    public DatatablesViewPage ypjc_querylist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        cxtj.put("bs", "ypjc");
        String ypmc = request.getParameter("ypmc");
        String jcxmc = request.getParameter("jcxmc");
        String jclbdm = request.getParameter("jclbdm");
        if (notNULL(jclbdm)){
            cxtj.put("jclbdm",jclbdm);
        }
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
        if (notNULL(jcxmc)) {
            cxtj.put("jcxmc", jcxmc);
        }
        long totalCount = jcglService.findCount(cxtj);
        List<Map> list = jcglService.findAll(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 陈
     * 数据校验
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/sjjy/querylist", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage sjjy_querylist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        cxtj.put("bs", "sjjy");
        String ypmc = request.getParameter("ypmc");
        String jcxmc = request.getParameter("jcxmc");
        String ypbm = request.getParameter("ypbm");
         String jclbdm = request.getParameter("jclbdm");
        if (notNULL(jclbdm)){
            cxtj.put("jclbdm",jclbdm);
        }
        cxtj.put("zydm", CurrentLoginUser.getUser().getZydm());
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
        if (notNULL(ypbm)) {
            cxtj.put("ypbm", ypbm);
        }
        long totalCount = jcglService.findCount(cxtj);
        List<Map> list = jcglService.findAll(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }


    /**
     * 陈
     * 数据审查
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/sjsc/querylist", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage sjsc_querylist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        cxtj.put("bs", "sjsc");
        String ypmc = request.getParameter("ypmc");
        cxtj.put("zydm", CurrentLoginUser.getUser().getZydm());
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
        //        yuanao  0714   根据样品编码查询
        String ypbm = request.getParameter("ypbm");
        if (notNULL(ypbm)) {
            cxtj.put("ypbm", ypbm);
        }
         String jclbdm = request.getParameter("jclbdm");
        if (notNULL(jclbdm)){
            cxtj.put("jclbdm",jclbdm);
        }
        long totalCount = jcglService.findCount(cxtj);
        List<Map> list = jcglService.findAll(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    //数据修改
    @RequestMapping(value = "/sjxg/querylist", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage sjxg_querylist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        cxtj.put("bs", "sjxg");
        String ypmc = request.getParameter("ypmc");
        cxtj.put("zydm", CurrentLoginUser.getUser().getZydm());
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
         String jclbdm = request.getParameter("jclbdm");
        if (notNULL(jclbdm)){
            cxtj.put("jclbdm",jclbdm);
        }
        long totalCount = jcglService.findCount(cxtj);
        List<Map> list = jcglService.findAll(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }


    //查看人员
    @RequestMapping(value = "/QueryRy", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject QueryRy(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            Map data = getQueryTj(request);
            data.put("id", request.getParameter("id"));
            data.put("bs", "queryry");
            //查询需要编辑的信息
            List<Map> m = jcglService.findAll(data);
            jsonObject.put("data", m);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }

    //查看检测项
    @RequestMapping(value = "/lookjcxm", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject lookjcxm(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            Map data = getQueryTj(request);
            data.put("id", request.getParameter("id"));
            //查询需要编辑的信息
            List<Map> m = jcglService.jcxmAll(data);
            jsonObject.put("data", m);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }


    //数据修改-修改数据
    @RequestMapping(value = "/sjxg/updateData", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject sjxg_updateData(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            //Map data = getQueryTj(request);
            //data.put("id",request.getParameter("id"));
            String[] ids = request.getParameter("id").split(",");
            String[] jczs = request.getParameter("jcz").split(",");
            String[] wds = request.getParameter("wd").split(",");
            String[] sds = request.getParameter("sd").split(",");
            List<Map> data = new ArrayList<>();
            for (int i = 0; i < ids.length; i++) {
                String id = ids[i];
                String[] idd = id.split("_");
                String ypid = idd[0];
                String xmid = idd[1];
                String jcz = "";
                String wd = "";
                String sd = "";
                String zxry_dm = CurrentLoginUser.getUser().getZydm();
                try {
                    jcz = jczs[i];
                } catch (Exception e) {
                }

                try {
                    wd = wds[i];
                } catch (Exception e) {
                }

                try {
                    sd = sds[i];
                } catch (Exception e) {
                }

                Map m = new HashMap();
                m.put("ypid", ypid);
                m.put("xmid", xmid);
                m.put("jcz", jcz);
                m.put("wd", wd);
                m.put("sd", sd);
                m.put("zxry_dm", zxry_dm);
                data.add(m);
            }

            jcglService.sjxg_update(data);
            //修改信息
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }


    //数据修改-查看详情
    @RequestMapping(value = "/sjxg/QueryOne", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject sjxg_QueryOne(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            Map data = getQueryTj(request);
            data.put("id", request.getParameter("id"));
            //查询需要编辑的信息
            List<Map> m = jcglService.sjxg_queryList(data);
            jsonObject.put("data", m);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "失败！");
        }
        return jsonObject;
    }


    //数据修改-修改状态  sjxg
    @RequestMapping(value = "/sjxg/updatezt", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject sjxg_updatezt(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            Map data = getQueryTj(request);
            Map params = getMap(request.getParameterMap());
            data.putAll(params);
            String zydm = CurrentLoginUser.getUser().getZydm();
            // 003 退回
            String id = data.get("id") + "";
            String ids[] = id.split(",");
            List<Map> mapList = new ArrayList<>();
            for (int i = 0; i < ids.length; i++) {
                Map m = new HashMap();
                m.put("lx", data.get("lx"));
                m.put("id", ids[i]);
                m.put("zt", data.get("zt"));
                m.put("zydm", zydm);
                mapList.add(m);
            }
            jcglService.updatezt(mapList);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }

    /**
     *
     * 数据审查-修改状态  sjsc
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/sjsc/updatezt", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject sjsc_updatezt(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
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
                m.put("lx", data.get("lx"));
                m.put("id", ids[i]);
                m.put("zt", data.get("zt"));
                m.put("zydm", zydm);
                mapList.add(m);
            }
            jcglService.updatezt(mapList);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }

    /**
     *
     * 数据校验-修改状态  sjjy
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/sjjy/updatezt", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject sjjy_updatezt(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
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
                m.put("lx", data.get("lx"));
                m.put("id", ids[i]);
                m.put("zt", data.get("zt"));
                String if_ssg = jcglService.queryIf_ssg(ids[i]);//得到是否是
                m.put("if_ssg", if_ssg);
                m.put("zydm", zydm);
                mapList.add(m);
            }
            jcglService.updatezt(mapList);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }

    /**
     *
     * 样品检测-修改状态
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/ypjc/updatezt", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject ypjc_updatezt(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
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
                m.put("lx", data.get("lx"));
                m.put("id", ids[i]);
                m.put("zt", data.get("zt"));
                m.put("zydm", zydm);
                m.put("tjzt","1");
                m.put("ypid",ids[i]);
                //1、判断该样品是否存在未做任务分配的检样。如果存在则停止本次操作
                List notRwfp = ypjcMapper.findNotRwfp(m);
                if (notRwfp != null && notRwfp.size() > 0) {
                    jsonObject.put("success", false);
                    jsonObject.put("message", "提交的样品存在尚未完成任务分配的检样。不能执行本次操作！");
                    return jsonObject;
                }
                //2、更新当前操作人保存了的每个检测项的提交状态为1。
                ypjcMapper.submitYpjc(m);
                //3、查询该样品所有检测项的提交状态，如果都是1则更新样品表的检测状态，否则不更新。
                List notSubmitYp = ypjcMapper.findNotSubmit(m);
                if (notSubmitYp == null || notSubmitYp.size() == 0){
                    mapList.add(m);
                }

            }
            if (mapList.size() > 0) {
                jcglService.updatezt(mapList);
            }
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }



    //任务分配列表
    @RequestMapping(value = "/queryCyrwLst", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage queryCyrwLst(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        //rwfplb
        cxtj.put("bs", "rwfp");
        String ypmc = request.getParameter("ypmc");
        String wtdwmc = request.getParameter("wtdwmc");
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
        if (notNULL(wtdwmc)) {
            cxtj.put("wtdwmc", wtdwmc);
        }
        long totalCount = jcglMapper.findCyrwCount(cxtj);
        List<Map> list = jcglMapper.findCyrwAll(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
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
    public JSONObject saveZxry(HttpServletRequest request, @RequestParam(value = "type", required = false) String type) {
        JSONObject jsonObject = new JSONObject();
        SimpleDateFormat fdm = new SimpleDateFormat("yyyy-MM-dd hh:mm");
        SystemMessages systemMessages = new SystemMessages();
        try {
            Map map = getMap(request.getParameterMap());
            String zydm = map.get("zydm") + "";
            String id = map.get("id") + "";
            String lx = map.get("lx") + "";
            String lrry = CurrentLoginUser.getUser().getZydm();
            String[] ids = id.split(",");
            List<Map> mapList = new ArrayList<>();
            Arrays.stream(ids).forEach(s_id -> {
                String[] zydms = zydm.split(",");
                Arrays.stream(zydms).forEach(s_zydm -> {
                    Map mm = new HashMap();
                    mm.put("zydm", s_zydm);
                    mm.put("lx", lx);
                    mm.put("id", s_id);
                    mm.put("lrry", lrry);
                    mapList.add(mm);

                    try {
                        //消息提醒
                        String txbt = "";
                        String txnr = "";
                        String txlx = "000";
                        //接收状态(205 抽样任务)
                        if ("cyrw".equals(type)) {
                            txbt = "抽样任务提醒";
                            txlx = "205";
                            txnr = "你好，" + CurrentLoginUser.getUser().getName() + "给你分配了任务，请及时查看。";
                        }
                        systemMessages.setXxid(UUID.randomUUID().toString());
                        systemMessages.setTxlx_dm(txlx);
                        systemMessages.setDljg_bm(CurrentLoginUser.getUser().getDljgBm());
                        systemMessages.setTxbt(txbt);
                        systemMessages.setTxnr(txnr);
                        systemMessages.setFsry_dm(CurrentLoginUser.getUser().getZydm());
                        systemMessages.setFsry_mc(CurrentLoginUser.getUser().getName());
                        systemMessages.setJsry_dm(s_zydm);
                        systemMessages.setFssj(new Date());
                        systemMessagesService.addSystemMessages(systemMessages);
                    } catch (Exception e) {
                        System.out.println("发送消息提醒错误！");
                        e.printStackTrace();
                    }
                });
            });
            jcglService.insert(mapList);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "保存失败！");
        }
        return jsonObject;
    }



    /**
     *
     * 获得检测项有没有全部检测完成、
     */
    @RequestMapping(value = "/ypjc/findTjztByYpid", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> findTjztByYpid(HttpServletRequest request) {
        String ypid = request.getParameter("ypid");
        return jcglMapper.findTjztByYpid(ypid);
    }

    /**
     *
     * 校验校核复核退回的原因
     */
    @RequestMapping(value = "/backReason", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject backReason(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            Map map = new HashMap();
            SystemMessages systemMessages = new SystemMessages();
            String ypid = request.getParameter("ypid");//样品id
            String thyy = request.getParameter("thyy");//退回原因
            String thwz = request.getParameter("thwz");//退回位置
            String ypmc = request.getParameter("ypmc");//样品名称
            String rydm = CurrentLoginUser.getUser().getZydm().toString();//执行人员
            map.put("ypid", ypid);
            map.put("ypmc", ypmc);
            map.put("thyy", thyy);
            map.put("thwz", thwz);
            map.put("rydm", rydm);
            map.put("bmmc", "检测室");
            jcglMapper.backReason(map);//将信息放入到数据库中
            List<Map> users = jcglMapper.findAllRydmByBmmc(map);
            for (Map user : users) {//发送到消息提醒中
                try {
                    //消息提醒
                    String txbt = thwz + "退回";
                    String txnr = "样品名称:" + ypmc + ";退回说明:" + thyy;
                    String txlx = "000";
                    systemMessages.setXxid(UUID.randomUUID().toString());
                    systemMessages.setTxlx_dm(txlx);
                    systemMessages.setDljg_bm(CurrentLoginUser.getUser().getDljgBm());
                    systemMessages.setTxbt(txbt);
                    systemMessages.setTxnr(txnr);
                    systemMessages.setFsry_dm(CurrentLoginUser.getUser().getZydm());
                    systemMessages.setFsry_mc(CurrentLoginUser.getUser().getName());
                    systemMessages.setJsry_dm(user.get("zydm").toString());
                    systemMessages.setFssj(new Date());
                    systemMessagesService.addSystemMessages(systemMessages);
                } catch (Exception e) {
                    System.out.println("发送消息提醒错误！");
                    e.printStackTrace();
                }
            }
            json.put("info", true);
        } catch (Exception e) {
            json.put("info", false);
        }

        return json;
    }

    /**
     *
     * 获得样品检测中样品退回的记录
     */
    @RequestMapping(value = "/ypjc/queryThjlList", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage queryThjlList(HttpServletRequest request) {
        Map map = getQueryTj(request);
        String ypmc = request.getParameter("ypmc");
        if (notNULL(ypmc)) {
            map.put("ypmc", ypmc);
        }
        Integer totalCount = jcglService.findThjlListNum(map);
        List<Map> list = jcglService.findThjlList(map);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     *
     * 删除退回记录
     */
    @RequestMapping(value = "/ypjc/delThjlByIds", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject delThjlByIds(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            List<String> list = new ArrayList<String>();
            String[] ids = request.getParameter("ids").split(",");
            for (int i = 0; i < ids.length; i++) {
                list.add(ids[i]);
            }
            jcglService.delThjlByIds(list);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }

    /**
     *
     * 获得检测项目的数据(检测信息录入)
     */
    @RequestMapping(value = "/jcxxlr/queryJcxxlrList", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage queryJcxxlrList(HttpServletRequest request) {
        Map map = getQueryTj(request);
        String jcxmc = request.getParameter("jcxmc");
        String ypmc = request.getParameter("ypmc");
        String ypbm = request.getParameter("ypbm");
        String tjzt=request.getParameter("tjzt");
        String jclbdm =request.getParameter("jclbdm");
        String jcrwlqry = CurrentLoginUser.getUser().getZydm().toString();
        map.put("jcrwlqry",jcrwlqry);
//        if (notNULL(jcxmc)) {
            map.put("jcxmc", jcxmc);
//        }
//        if (notNULL(ypmc)) {
            map.put("ypmc", ypmc);
//        }
//        if(notNULL(tjzt)){
            map.put("tjzt", tjzt);
//        }
//        if(notNULL(jclbdm)){
            map.put("jclbdm",jclbdm);
//        }
        map.put("ypbm", ypbm);
        Integer totalCount = jcglService.findJcxxlrListNum(map);
        List<Map> list = jcglService.findJcxxlrList(map);
        //下面是解析仪器的ids  将仪器的ids字符串变成仪器名称的字符串
       /* List arry_ids = null;
        for (Map map1 : list) {
            try {
                arry_ids = new ArrayList();
                String[] ids = map1.get("sbmc").toString().split(",");
                for (int i = 0; i < ids.length; i++) {
                    arry_ids.add(ids[i]);
                }
                List<String> list_sbmc = jcglService.queryYqNameByIds(arry_ids);//获得设备名称的集合
                String str_sbmc = "";
                for (String sbmc : list_sbmc) {//设备名称用逗号隔开 合并成一个字符串
                    str_sbmc += sbmc + ",";
                }
                str_sbmc = str_sbmc.substring(0, str_sbmc.length() - 1);
                map1.put("sbmc", str_sbmc);
            } catch (Exception e) {
                map1.put("sbmc", "");
            }
        }*/
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     *
     * 计算获得主检人的信息
     */
    @RequestMapping(value = "/ypjc/getZJR", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject getZJR(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String ypid = request.getParameter("ypid");
            Map mapMany = new HashMap();
            Map mapLess = new HashMap();
            Map<String, Integer> mapZxry = new HashMap<String, Integer>();
            mapMany.put("ypid", ypid);
            mapMany.put("lx", "many");
            mapLess.put("ypid", ypid);
            mapLess.put("lx", "less");
            List<String> listMany = jcglService.getZJR(mapMany);
            List<String> listLess = jcglService.getZJR(mapLess);
            Integer sum = 0;
            for (int i = 0; i < listLess.size(); i++) {
                sum = 0;
                for (int j = 0; j < listMany.size(); j++) {
                    if (listLess.get(i).equals(listMany.get(j))) {
                        sum++;
                    }
                }
                mapZxry.put(listLess.get(i), sum);
            }
            Set<String> setZxry = mapZxry.keySet();
            String maxZxry = null;
            Integer maxSum = 0;
            for (String zxry : setZxry) {
                if (mapZxry == null) {
                    maxSum = 0;
                }
                if (mapZxry.get(zxry) > maxSum) {
                    maxSum = mapZxry.get(zxry);
                    maxZxry = zxry;
                }
            }
            Map mapZjr = new HashMap();
            mapZjr.put("ypid", ypid);
            mapZjr.put("zjr", maxZxry);
            jcglService.saveZJR(mapZjr);
            json.put("info", "0k");
        } catch (Exception e) {
            json.put("info", false);
        }
        return json;
    }



    /**
     * 样品检测任务领取界面
     * @param request
     * @return
     */
    @RequestMapping(value = "/rwlq/querylistjcrwlq")
    @ResponseBody
    public DatatablesViewPage ypdjc_querylist(HttpServletRequest request) {
        Map map = getQueryTj(request); //检测任务执行人员代码
        String ZXRY_DM = CurrentLoginUser.getUser().getZydm();//样品领取人员名称
        map.put("ZXRY_DM",ZXRY_DM);
        String ypmc = request.getParameter("ypmc");
        String jcxmc = request.getParameter("jcxmc");
        String jclbdm = request.getParameter("jclbdm");
        if (notNULL(jclbdm)){
            map.put("jclbdm",jclbdm);
        }
        if (notNULL(ypmc)) {
            map.put("ypmc", ypmc);
        }
        if (notNULL(jcxmc)) {
            map.put("jcxmc", jcxmc);
        }
        long totalCount = jcglService.findLWLQCount(map);
        List<Map> list = jcglService.findLWLQAll(map);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 样品检测任务领取操作
     * @param
     * @return
     */
    @RequestMapping(value = "/rwlq/taskCollection")
    @ResponseBody
    public Map taskCollection(Integer[] ids) {
        Map map1 = new HashMap();
        try {
            Map map = null;
            for (Integer id : ids) {
                map = new HashMap();
                map.put("id", id);
                SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
                String str = sf.format(new Date().getTime());
                map.put("jcrwlqsj", str);
                map.put("jcrwlqry", CurrentLoginUser.getUser().getZydm());
                map.put("lqzt","003");
                jcglService.upTaskCollection(map);
            }
            map1.put("success", true);
        } catch (Exception e) {
            map1.put("success", false);
        }
        return map1;
    }

    /**
     * 样品检测任务领取操作
     * @param
     * @return
     */
    @RequestMapping(value = "/rwlq/taskBack")
    @ResponseBody
    public Map taskBack(Integer[] ids) {
        Map map1 = new HashMap();
        try {
            Map map = null;
            boolean ztok = true;
            for (Integer id : ids) {
                map = new HashMap();
                map.put("id", id);
                //取得样品检测状态
                String ypjczt = jcglService.findYpJcZt(map);
                if ("002".equals(ypjczt)) {
                    map1.put("success", false);
                    map1.put("message", "存在已经检测提交完成的样品，无法退回！");
                    ztok = false;
                    break;
                }
            }
            if (ztok) {
                for (Integer id : ids) {
                    map = new HashMap();
                    map.put("id", id);
                    map.put("jcrwlqsj", "");
                    map.put("jcrwlqry", "");
                    map.put("lqzt", "002");
                    jcglService.upTaskCollection(map);
                }
                map1.put("success", true);
            }
        } catch (Exception e) {
            map1.put("success", false);
        }
        return map1;
    }
}
