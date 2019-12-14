package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.GgDmGetService;
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

//全项目 各种 代码列表 获取 公共控制 服务
@Controller
@RequestMapping("/ggDmGet")
public class GgDmGetController {
    /**
     * 日志
     */
    private Logger logger = LogManager.getLogger(GgDmGetController.class.getName());

    @Autowired
    private GgDmGetService getDmGetService;


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
     * 获取所有的有效制备方式
     * @param request
     * @return
     */
    @RequestMapping(value = "/getZbfsList", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> getZbfsList(HttpServletRequest request) {
        return this.getDmGetService.getZbfsList();
    }

    /**
     *  根据条件获取  检验类别  ，没有条件 则获取所有检验类别
     * @param request
     * @return
     */
    @RequestMapping(value = "/getJylbList", method = RequestMethod.POST)
    @ResponseBody
    public List<Map> getJylbList(HttpServletRequest request) {
        String fl = request.getParameter("fl");
        Map map = new HashMap();
        if(this.notNULL(fl))
        {
            map.put("fl",fl);
        }
        return this.getDmGetService.getJylbList(map);
    }
}
