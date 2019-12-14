package com.xinhai.caiyun.customermanage.controller;

import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.JcglService;
import com.xinhai.caiyun.customermanage.service.JcxFywhService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Controller
@RequestMapping("/jcxfywh")
public class JcxFywhController {

    @Autowired
    private JcxFywhService jcxFywhService;

    public boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
    }

    //组装通用查询条件
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
/*        User u = CurrentLoginUser.getUser();
        String zydm = u.getZydm();
        cxtj.put("zydm", zydm);*/
        return cxtj;
    }
    /**
     * 费用维护 数据显示(检测项已提交)
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/querylist")
    @ResponseBody
    public DatatablesViewPage jcxfywh_querylist(HttpServletRequest request) {
        Map cxtj = getQueryTj(request);
        cxtj.put("bs", "jcxfywh");
        String ypmc = request.getParameter("ypmc");
        String wtid = request.getParameter("wtid");
        if (notNULL(ypmc)) {
            cxtj.put("ypmc", ypmc);
        }
        if (notNULL(wtid)) {
            cxtj.put("wtid", wtid);
        }
        long totalCount = jcxFywhService.findCount(cxtj);
        List<Map> list = jcxFywhService.findAll(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 费用控制 录入模态框 数据源查询
     */
    @RequestMapping(value = "/fywhEdit", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage ypjc_queryList(HttpServletRequest request
    ) {
        Map map = getQueryTj(request);
        String ypid1 = request.getParameter("ypid1");
        String jcxmc = request.getParameter("jcxmc");
        if (notNULL(ypid1)) {
            map.put("ypid1", ypid1);
        }
        if (notNULL(jcxmc)) {
            map.put("jcxmc", jcxmc);
        }

        List<Map> list = jcxFywhService.selectLrFykz(map);
        int totalCount = 0;
        totalCount = jcxFywhService.selectCountFykz(map);

        DatatablesViewPage<Map> dv = new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }

    /**
     * 检测的值更新到数据库里
     */
    @RequestMapping(value = "/insertFYKZ", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject insertFYKZ(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String array = request.getParameter("questionsList");
            List<Map> list = JSONArray.fromObject(array);
            SimpleDateFormat smf = new SimpleDateFormat("yyyy-MM-dd");
            Map map = new HashMap();
            String jcxid = list.get(0).get("jcxid") + "";
            String wtid = list.get(0).get("wtid") + "";
            String fy = list.get(0).get("fy") + "";
            String bz = list.get(0).get("bz") + "";
            String ypid = list.get(0).get("ypid") + "";
            if (notNULL(jcxid)) {
                map.put("jcxid", jcxid);//样品检测项id
            }
            if (notNULL(wtid)) {
                map.put("wtid", wtid);//委托id
            }
            if (notNULL(fy)) {  //费用
                map.put("fy", fy);
            }
            if (notNULL(bz)) { //备注
                map.put("bz", bz);
            }
            if (notNULL(ypid)) {
                map.put("ypid", ypid);//样品id
            }
            map.put("lrry", CurrentLoginUser.getUser().getZydm());
            jcxFywhService.insertFYKZ(map);
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }
        return json;
    }
}
