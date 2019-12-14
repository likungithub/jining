package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.Ypqcl;
import com.xinhai.caiyun.customermanage.service.YpqclService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import com.xinhai.usermanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping(value = "/ypqcl")
public class YpqclController {
    @Autowired
    private YpqclService ypqclService;

    @Autowired
    private UserService userService;

    @RequestMapping("/ypqcl_QueryAll")
    @ResponseBody
    public DatatablesViewPage findAllYpjsqr(@RequestParam("start")String start,
                                            @RequestParam("length")String length,
                                            @RequestParam("ypmc") String ypmc,
                                            @RequestParam("wtid") String wtid
    ) {
        Map map=new HashMap();
        map.put("start",Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("ypmc",ypmc);
        map.put("wtid",wtid);

        List<Map> list= ypqclService.queryYPqclAll(map);
        int num=ypqclService.queryYPqclCount(map);
        DatatablesViewPage<Map> datatablesViewPage=new DatatablesViewPage<Map>();
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        return datatablesViewPage;
    }

    /**
     * 样品处理信息选择页面  查询全部 蔬果肉 样品信息
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/SGR_SampleChoiceQuery")
    @ResponseBody
    public DatatablesViewPage SGR_SampleChoiceQuery(@RequestParam("start") String start,
                                                @RequestParam("length") String length) throws Exception {
        int num = 0;
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));

        num = ypqclService.queryYPqclSGRCount(map);
        List<Map> list = ypqclService.queryYPqclSGR(map);

        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 回显单条样品信息
     */
    @ResponseBody
    @RequestMapping(value = "/ypqclAloneSampleChoic")
    public Map ypqclAloneSampleChoic(HttpServletRequest request, @RequestBody String[] ids ){
        String id = ids[0];
        Map map = ypqclService.queryYPqclSGRAloneChoice(id);
        return map;
    }

    /**
     * 样品处理信息  领取
     * @param khxx
     * @return
     */
    @RequestMapping(value = "/addYPqcllingqu")
    @ResponseBody
    public JSONObject addYPqcllingqu(@RequestBody String khxx) {
        Ypqcl ypqcl = JSON.parseObject(khxx, Ypqcl.class);

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        ypqcl.setLrrq(df.format(new Date()));
        User user = userService.getUser(CurrentLoginUser.getUser().getId());//获取当前登录用户信息
        ypqcl.setLrry(user.getId());
        ypqcl.setZt("001");
        ypqclService.addCreateYpqcl(ypqcl);

        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }

    /**
     * 删除操作
     * @param request
     * @return
     */
    @RequestMapping(value = "/deleteYpqcl", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject deleteYpqcl(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        String ypqclID = request.getParameter("ypqclID");
        String[]ypqclIDs = ypqclID.split(",");
        for (int i = 0; i < ypqclIDs.length; i++){
            String  id = ypqclIDs[i];
            ypqclService.deleteYpqcl(id);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }

    /**
     * 样品处理
     * @param request
     * @return
     */
    @RequestMapping(value = "/updateYpqclchuli")
    @ResponseBody
    public JSONObject updateYpqclchuli(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("lqzl",((String[])map.get("lqzl"))[0]);
        map2.put("lqsl",((String[])map.get("lqsl"))[0]);
        map2.put("zt","002");
        map2.put("id",((String[])map.get("id"))[0]);

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        map2.put("lqrq",df.format(new Date()));
        User user = userService.getUser(CurrentLoginUser.getUser().getId());//获取当前登录用户信息
        map2.put("lqry",user.getId());

        ypqclService.updateYpqclchuli(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }

    /**
     * 样品退还/返还
     * @param request
     * @return
     */
    @RequestMapping(value = "/updateYpqclfanhuan")
    @ResponseBody
    public JSONObject updateYpqclfanhuan(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("fhzl",((String[])map.get("fhzl"))[0]);
        map2.put("fhsl",((String[])map.get("fhsl"))[0]);
        map2.put("zt","003");
        map2.put("id",((String[])map.get("id"))[0]);

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        map2.put("fhrq",df.format(new Date()));
        User user = userService.getUser(CurrentLoginUser.getUser().getId());//获取当前登录用户信息
        map2.put("fhry",user.getId());

        ypqclService.updateYpqcltuihuan(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }

    /**
     * 修改  已领取 状态
     * @param request
     * @return
     */
    @RequestMapping(value = "/updateYpqcllingqu")
    @ResponseBody
    public JSONObject updateYpqcl(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("zbff",((String[])map.get("zbff"))[0]);
        map2.put("sl",((String[])map.get("sl"))[0]);
        map2.put("zl",((String[])map.get("zl"))[0]);
        map2.put("bz",((String[])map.get("bz"))[0]);
        map2.put("id",((String[])map.get("id"))[0]);

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        map2.put("lrrq",df.format(new Date()));
        User user = userService.getUser(CurrentLoginUser.getUser().getId());//获取当前登录用户信息
        map2.put("lrry",user.getId());

        ypqclService.updateYpqcllingqu(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }

}
