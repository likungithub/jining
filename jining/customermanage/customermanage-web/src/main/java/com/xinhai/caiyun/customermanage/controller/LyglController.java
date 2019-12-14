package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.Lygl;
import com.xinhai.caiyun.customermanage.api.Ypzbwc;
import com.xinhai.caiyun.customermanage.dao.LyglMapper;
import com.xinhai.caiyun.customermanage.service.LyglService;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping(value = "lygl")
public class LyglController {
    @Autowired
    private LyglService lyglService;
    @Autowired
    private LyglMapper lyglMapper;
    //查询
    @RequestMapping(value = "/findAll")
    @ResponseBody
    public DatatablesViewPage yycx_queryList(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("ypmc") String ypmc,
                                             @RequestParam("lx") String lx,
                                             @RequestParam("jclbdm") String jclbdm,
                                             @RequestParam("lqzt") String lqzt,
                                             @RequestParam("ypbm") String ypbm
    ) {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        if (notNull(ypmc)) {
            map.put("ypmc", ypmc);
        }
        if (notNull(lx)) {
            map.put("lx", lx);
        }
        if(notNull(jclbdm)){
            map.put("jclbdm",jclbdm);
        }
        if(notNull(lqzt)){
            map.put("lqzt",lqzt);
        }
        if(notNull(ypbm)){
            map.put("ypbm",ypbm);
        }
        List<Map> list = lyglService.findAll(map);
//        for(Map map1 : list){
//            try {
//                String ypid=map1.get("ypid").toString();
//                Integer zbsyl=lyglService.queryYpNumByYpid(ypid);
//                map1.put("zbsyl",zbsyl);//制备剩余量
//            } catch (Exception e) {
//                map1.put("zbsyl","0");//制备剩余量
//            }
//        }
        int totalCount = 0;
        totalCount = lyglService.findCount(map);
        DatatablesViewPage<Map> dv = new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }

    public boolean notNull(String str) {
        boolean flag = false;
        if (str != null && !"".equals(str) && !"null".equals(str) && !"undefined".equals(str)) {
            flag = true;
        }
        return flag;
    }

    //领样操作
    @RequestMapping(value = "/updatelqzt")
    @ResponseBody
    public Map updatelqzt(Integer[] che) {
        Map map1 = new HashMap();
        try {
            Map map = null;
            for (Integer ch : che) {
                map = new HashMap();
                Integer zbzl =this.lyglMapper.findZbzlById(ch+"");
                map.put("id", ch);
                SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
                String str = sf.format(new Date().getTime());
                map.put("lqsj", str);
                map.put("zydm", CurrentLoginUser.getUser().getZydm());
                map.put("zyname",CurrentLoginUser.getUser().getName());
                map.put("lyzl",zbzl);
                lyglService.updatelqzt(map);
              //  lyglService.updatejcYp(map);
            }
            map1.put("success", true);
        } catch (Exception e) {
            map1.put("success", false);
        }
        return map1;
    }

    //查询样品制备信息
    @RequestMapping(value = "/findYpzb")
    @ResponseBody
    public List<Ypzbwc> findYpzb(Lygl lygl) {
        System.out.println(lygl.getYpbm());
        return lyglService.findYpzb(lygl);
    }

    /**
     * 删除操作  还原样品领取状态，清空领取人员、领取时间、领取量
     * @param che
     * @return
     */

    @RequestMapping(value = "/deletedlqzt")
    @ResponseBody
    public Map deletedlqzt(Integer[] che) {
        Map map1 = new HashMap();
        try {
            Map map = null;
            for (Integer ch : che) {
                map = new HashMap();
                map.put("id", ch);
                lyglService.deletedlqzt(map);
            }
            map1.put("success", true);
        } catch (Exception e) {
            map1.put("success", true);
        }
        return map1;
    }

    //20190923添加退回操作
    @RequestMapping(value = "/thUpdate")
    @ResponseBody
    public JSONObject thUpdate(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            Map map = new HashMap();
            String ypids = request.getParameter("ypids");
//            String id = data.get("id") + "";
//            String ids[] = ypids.split(",");
            map.put("ypid", ypids);
            int count = lyglService.checkJcCount(map);
            if(count>0)
            {
                jsonObject.put("success", false);
                jsonObject.put("message", "该样品存在已检测项！");
                return jsonObject;
            }
            lyglService.thUpdate(map);
            jsonObject.put("success", true);
        } catch (Exception e) {
            jsonObject.put("success", false);
            jsonObject.put("message", "退回失败！");
        }
        return jsonObject;
    }
}
