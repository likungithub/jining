package com.xinhai.caiyun.commonmanager.controller;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xinhai.caiyun.commonmanager.api.DmHylx;
import com.xinhai.caiyun.commonmanager.api.Xzqy;
import com.xinhai.caiyun.commonmanager.api.XzqyService;
import com.xinhai.caiyun.commonmanager.dao.DmHylxMapper;

/**
 * 获取行政区域的实现方法
 * @author lmf
 *
 */
@Controller
@RequestMapping("/xzqy")
public class XzqyController {
    
    /**
     * 日志
     */
    private Logger logger = LogManager.getLogger(XzqyController.class.getName());

    /**
     * 装箱
     */
    @Autowired
    private XzqyService xzqyService;
    
    /**
     * 装箱
     */
    @Autowired
    private DmHylxMapper dmHylxMapper;
    

    @RequestMapping(value = "/xzqy/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Xzqy getXzqy(@PathVariable("id") Integer xzqhDm) {
        logger.debug("getxzqy" + xzqhDm);
        Xzqy xzqy = xzqyService.findXzqy(xzqhDm);
        return xzqy;
    }

    /**
     * 获取省级行政单位
     * @return 返回list
     */
    @RequestMapping(value = "/sj", method = RequestMethod.GET)
    @ResponseBody
    public List<Xzqy> getSjxzqy() {
        List<Xzqy> list = xzqyService.findAllXzqy();
        return list;

    }
    
    /**
     * 根据上级代码获取下级行政单位
     * @param sjdm 传入的上级代码
     * @return 返回list
     */
    @RequestMapping(value = "/xjXzqy", method = RequestMethod.GET)
    @ResponseBody
    public List<Xzqy> getXjxzqy(@RequestParam(value = "sjdm",required = false) String sjdm) {//@RequestParam String sjdm
        List<Xzqy> list = xzqyService.findNext(sjdm);
        return list;

    }
    
    /**
     * 获取门类
     * @return 返回list
     */
    @RequestMapping(value = "/ML", method = RequestMethod.GET)
    @ResponseBody
    public List<DmHylx> getML() {
        List<DmHylx> list = dmHylxMapper.getML();
        return list;
    }

    /**
     * 获取大类
     * @return 返回list
     */
    @RequestMapping(value = "/DL", method = RequestMethod.GET)
    @ResponseBody
    public List<DmHylx> getDL(@RequestParam String sjdm) {
        List<DmHylx> list = dmHylxMapper.getDL(sjdm);
        return list;
    }
    
    @RequestMapping(value = "/xzqy/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public Boolean updateXzqy(@PathVariable("id") Integer xzqhDm,
            @RequestBody Xzqy xzqy) {
        xzqyService.updateXzqy(xzqhDm, xzqy);
        return true;
    }

    @RequestMapping(value = "/xzqy", method = RequestMethod.POST)
    @ResponseBody
    public Boolean addXzqy(@RequestBody Xzqy xzqy) {
        xzqyService.createXzqy(xzqy);
        return true;
    }

    @RequestMapping(value = "/xzqy/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public Boolean deleteXzqy(@PathVariable("id") Integer xzqhDm) {
        xzqyService.deleteXzqy(xzqhDm);
        return true;
    }

}
