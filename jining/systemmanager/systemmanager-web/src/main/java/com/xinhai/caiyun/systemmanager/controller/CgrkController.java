package com.xinhai.caiyun.systemmanager.controller;

import com.sun.javafx.collections.MappingChange;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.security.api.CurrentLoginUser;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.CgrkService;

import javax.servlet.http.HttpServletRequest;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/cgrk")
public class CgrkController {
    @Autowired
    private CgrkService cgrkService;

    /**
     * 得到采购入库的信息
     */
    @RequestMapping(value = "/cgrkSeach",method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage yycx_queryList(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("hclx") String hclx
    ) throws Exception {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        if(notNULL(hclx)){
            map.put("hclx",hclx);
        }
        List<Map> list = cgrkService.selectCgrk(map);
        int totalCount = 0;
        totalCount = cgrkService.selectCount(map);
        DatatablesViewPage<Map> dv = new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }

    ;

    /**
     * 不为空的检测
     */
    public boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
    }

    ;


    /**
     *
     * 条码扫描将申请库信息放入入库信息表
     */
    @RequestMapping(value = "/addCgrk", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject addCgrk(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String sl = request.getParameter("sl");//获得耗材数量
            if (sl == null || "".equals(sl)) {
                sl = "0";
            }
            String hcbm = request.getParameter("hcbm");//获得耗材编码
            List<Map> list = cgrkService.queryCgsqByHcbm(hcbm);
            Map map = null;
            boolean flag = true;
            try {
                map = list.get(0);
            } catch (Exception e) {
                flag = false;
            }
            if (flag) {
                map.put("rkr", CurrentLoginUser.getUser().getZydm());
                map.put("sl", sl);
                String dj=map.get("dj")+"";
                if(dj==null || "".equals(dj)){
                    dj="0";
                }
                DecimalFormat df = new DecimalFormat("#.00");//保存两位小数
                Double d_sl = Double.parseDouble(sl);
                Double d_dj = Double.parseDouble(dj);
                String zj = df.format(d_dj * d_sl);//格式化保存两位小数
                map.put("zj",zj);
                cgrkService.addCgrkFromCgsq(map);
            }
            json.put("success", true);
        } catch (Exception e) {
            json.put("success", false);
        }

        return json;
    }

    ;

    /**
     *
     * 检测数据是否有重复的耗材编码
     */
    @RequestMapping(value = "/checkHcbm", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject checkHcbm(HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            String hcbm = request.getParameter("hcbm");
            List<String> list = cgrkService.queryIdByHcbm(hcbm);
            if (list.size() > 0) {
                json.put("flag", true);
            } else {
                json.put("flag", false);
            }
        } catch (Exception e) {
            json.put("flag", true);
        }
        return json;
    }
}
