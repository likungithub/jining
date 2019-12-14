package com.xinhai.caiyun.customermanage.controller;

import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.Lygl;
import com.xinhai.caiyun.customermanage.api.Ypzbwc;
import com.xinhai.caiyun.customermanage.dao.LyglFcMapper;
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
@RequestMapping(value = "lyglFc")
public class LyglFcController {
    @Autowired
    private LyglService lyglService;
    @Autowired
    private LyglFcMapper lyglFcMapper;
    //查询
    @RequestMapping(value = "/findAll")
    @ResponseBody
    public DatatablesViewPage yycx_queryList(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("ypmc") String ypmc,
                                             @RequestParam("lx") String lx,
                                             @RequestParam("jclbdm") String jclbdm,
                                             @RequestParam("lqzt") String lqzt
    ) {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        String zydm = CurrentLoginUser.getUser().getZydm();
        map.put("zydm", zydm);

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
        List<Map> list = lyglFcMapper.findAll(map);
        int totalCount = 0;
        totalCount = this.lyglFcMapper.findCount(map);
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

    //检测管理——检测领样操作
    @RequestMapping(value = "/updatelqzt")
    @ResponseBody
    public Map updatelqzt(HttpServletRequest request) {
//    public Map updatelqzt(Integer[] che, HttpServletRequest request) {
        Map map1 = new HashMap();
        try {
            String ids = request.getParameter("id");
            String[] idArr = ids.split(",");
            Map map = null;
            for (String ch : idArr) {
                map = new HashMap();
                Integer zbzl =this.lyglFcMapper.findZbzlById(ch+"");
                map.put("id", ch);
                SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
                String str = sf.format(new Date().getTime());
                map.put("lqsj", str);
                map.put("zydm", CurrentLoginUser.getUser().getZydm());
                map.put("zyname",CurrentLoginUser.getUser().getName());
                map.put("lyzl",zbzl);
                this.lyglFcMapper.updatelqzt(map);
            }
            jclyMnJcrwfp(request);
            map1.put("success", true);
        } catch (Exception e) {
            map1.put("success", false);
        }
        return map1;
    }

    /**
     * 模拟生成任务分配 数据
     * @param request
     */
    private void jclyMnJcrwfp(HttpServletRequest request)
    {
            String ypids = request.getParameter("ypid");
            String ids = request.getParameter("id");
            String jcxmids = request.getParameter("jcxmid");
            String rydmid = request.getParameter("rydmid");
            String rwfprybm = CurrentLoginUser.getUser().getZydm();//操作人员代码

            String[] jcxmidArr = jcxmids.split(";");//检测项目id
            String[] ypidArr = ypids.split(",");//t_yp_zbwc的 ypid
            String[] idArr = ids.split(",");  //t_yp_zbwc 的ID
            int ypcount = jcxmidArr.length;
            for (int c = 0; c < ypcount; c++) {
                String ypid = ypidArr[c];
                String jcxmid = jcxmidArr[c];
                String id = idArr[c];
                List<Map> list_zxry = new ArrayList<Map>();
                Map map = new HashMap();
                map.put("zt", "002");//任务分配已分配
                Map list_map = null;
                if (notNULL(ypid)) {
                    map.put("ypid", ypid);
                }
                if (notNULL(jcxmid)) {
                    map.put("jcxmid", jcxmid);
                }
                if (notNULL(id)) {
                    map.put("id", id);
                }
                if (notNULL(rydmid)) {
                    map.put("rydmid", rydmid);
                }
                map.put("rwfprybm", rwfprybm);
                map.put("ypjcxm", ypid + jcxmid + "");//样品和检测项目的拼接字符串
                //获取 提前流程 的  任务分配信息 用来 组织模拟原来的 任务分配信息的 结构
                Map cxMap = new HashMap();
                cxMap.put("ypid",ypid);
                List<Map> fpxxList = this.lyglFcMapper.getRwfpXx(cxMap);
                for (Map fpXxMap : fpxxList) {
                    String fhry_dm = fpXxMap.get("fhry_dm")+"";
                    String lrry = fpXxMap.get("lrry")+"";
                    String lrrq = fpXxMap.get("lrrq")+"";
                    String zxry_dm = fpXxMap.get("zxry_dm")+"";
                    list_map = new HashMap();
                    list_map.putAll(map);
                    list_map.put("zxry",zxry_dm );
                    list_map.put("fhry_dm", fhry_dm);
                    list_map.put("lrry",lrry );
                    list_map.put("lrrq", lrrq);
                    list_zxry.add(list_map);
                }

                if (list_zxry.size() != 0) {
                    map.put("list_zxry", list_zxry);
                }
                this.lyglFcMapper.jclyMnNwfp(map);
            }
    }
    private boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
    }

    //查询样品制备信息
    @RequestMapping(value = "/findYpzb")
    @ResponseBody
    public List<Ypzbwc> findYpzb(Lygl lygl) {
        System.out.println(lygl.getYpbm());
        return lyglFcMapper.findYpzb(lygl);
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
                lyglFcMapper.deletedlqzt(map);
            }
            map1.put("success", true);
        } catch (Exception e) {
            map1.put("success", true);
        }
        return map1;
    }
}
