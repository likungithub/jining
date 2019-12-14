package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.RedisClinet;
import com.xinhai.caiyun.customermanage.api.PtLtxxMx;
import com.xinhai.caiyun.customermanage.api.SystemMessages;
import com.xinhai.caiyun.customermanage.api.SystemMessagesService;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequestMapping("/SystemMessageController")
public class SystemMessageController {
    @Autowired
    private SystemMessagesService systemMessagesService;
    
    /**
     * redis存储对象客户端
     */
    @Autowired
    private RedisClinet redisClinet;

    
    /**
     * redis存储对象客户端
     */
    @Autowired
    private JedisPool jedisPool;
    
    /**
     * 查找所有未读系统公告简介
     * @return 公告阅读情况集合
     */
    @RequestMapping(value = "/getAllMessageReminder", method = RequestMethod.GET)
    @ResponseBody
    public int getAllMessageReminder() {
        return systemMessagesService.searchCountIndex(CurrentLoginUser.getUser().getDljgBm(), CurrentLoginUser.getUser().getZydm());
    }
    /**
     * 查找所有未读系统公告简介
     * @return 一周内未完成工作总和
     */
    @RequestMapping(value = "/getAllMessage", method = RequestMethod.GET)
    @ResponseBody
    public List<SystemMessages> getAllMessage(){
        return systemMessagesService.searchBytx(CurrentLoginUser.getUser().getDljgBm(),CurrentLoginUser.getUser().getZydm(),"0",0,20);
    }
    /**
     * 根据ID查找未读信息内容
     */
    @ResponseBody
    @RequestMapping(value = "/getMessageById")
    public SystemMessages getMessageById(HttpServletRequest request, HttpServletResponse response){
       String id = request.getParameter("systemAnnouncementId");
        return systemMessagesService.searchById(id);
    }
    /**
     * PC端及代理APP查找所有存在消息的客户列表
     * @return 客户列表
     */
    @RequestMapping(value = "/getAllKhList", method = { RequestMethod.GET,
            RequestMethod.POST })
    @ResponseBody
    public JSONObject getAllKhList(String zydm) {
        JSONObject resultDatas = new JSONObject();
        try {
            if(!StringUtils.isEmpty(zydm)){
                resultDatas.put("data", systemMessagesService.getAllKhList(zydm));
            }else{
                resultDatas.put("data", systemMessagesService.getAllKhList(CurrentLoginUser.getUser().getZydm()));
            }
            
           
            resultDatas.put("code", "1");
            resultDatas.put("message", "成功");
        } catch (Exception e) {
            resultDatas.put("code", "0");
            resultDatas.put("message", "失败");
        }
        return resultDatas;
        
    }
    
    
    /**
     * APP端查找所有存在消息的客户列表
     * @return 客户列表
     */
    @RequestMapping(value = "/getAllAppKhList", method = { RequestMethod.GET,
            RequestMethod.POST })
    @ResponseBody
    public JSONObject getAllAppKhList(String khbm) {
        JSONObject resultDatas = new JSONObject();
        try {
            resultDatas.put("data", systemMessagesService.getAllAppKhList(khbm));
            resultDatas.put("code", "1");
            resultDatas.put("message", "成功");
        } catch (Exception e) {
            resultDatas.put("code", "0");
            resultDatas.put("message", "失败");
        }
        return resultDatas;
        
    }
    
    /**
     * PC端及代理APP查找所有客户列表
     * @return 客户列表
     */
    @RequestMapping(value = "/getAllKh", method = { RequestMethod.GET,
            RequestMethod.POST })
    @ResponseBody
    public JSONObject getAllKh(String gsmc,String dljgbm,String zydm) {
        JSONObject resultDatas = new JSONObject();
        try {
            if(!StringUtils.isEmpty(zydm)){
                resultDatas.put("data", systemMessagesService.findAllPtKhxx(dljgbm,zydm,gsmc));
            }else{
                resultDatas.put("data", systemMessagesService.findAllPtKhxx(CurrentLoginUser.getUser().getDljgBm(),CurrentLoginUser.getUser().getZydm(),gsmc));
            }
            resultDatas.put("code", "1");
            resultDatas.put("message", "成功");
        } catch (Exception e) {
            resultDatas.put("code", "0");
            resultDatas.put("message", "失败");
        }
        return resultDatas;
        
    }
    
    /**
     * App查找所有客户列表
     * @return 客户列表
     */
    @RequestMapping(value = "/getAllAppKh", method = { RequestMethod.GET,
            RequestMethod.POST })
    @ResponseBody
    public JSONObject getAllAppKh(String khbm,String gsmc) {
        JSONObject resultDatas = new JSONObject();
        
        try {
            resultDatas.put("data", systemMessagesService.findAllAppPtKhxx(khbm,gsmc));
            resultDatas.put("code", "1");
            resultDatas.put("message", "成功");
        } catch (Exception e) {
            resultDatas.put("code", "0");
            resultDatas.put("message", "失败");
        }
        return resultDatas;
        
    }
    
     
    /**
     * PC端及代理APP查找消息对话
     * @return 客户列表
     */
    @RequestMapping(value = "/getLtxx", method = { RequestMethod.GET,
            RequestMethod.POST })
    @ResponseBody
    public JSONObject getLtxx(String jsrid,String zydm,String dljgbm) {
        JSONObject resultDatas = new JSONObject();
        try {
            resultDatas.put("data", systemMessagesService.getLtxx(CurrentLoginUser.getUser() != null ? CurrentLoginUser.getUser().getZydm() : zydm,jsrid));
            PtLtxxMx ptLtxx = new PtLtxxMx();
            ptLtxx.setDljgbm(CurrentLoginUser.getUser() != null ? CurrentLoginUser.getUser().getDljgBm() : dljgbm);
            ptLtxx.setJsrid(CurrentLoginUser.getUser() != null ? CurrentLoginUser.getUser().getZydm() : zydm);
            ptLtxx.setFsrid(jsrid);
            
            Jedis jedis = null;
            
            try {
                jedis = jedisPool.getResource();
                zydm =  CurrentLoginUser.getUser() != null ? CurrentLoginUser.getUser().getZydm() : zydm;
                //key KJ1000000059
                ////KJ1000000059_KH0000001582
                jedis.setex("IM"+zydm, 3000,zydm+"_"+jsrid);
            } catch (Exception e) {
               e.printStackTrace();
            }finally{
                if(jedis !=null){
                    jedis.close();
                }
            }
            
            systemMessagesService.updateLtxx(ptLtxx);
            resultDatas.put("code", "1");
            resultDatas.put("message", "成功");
        } catch (Exception e) {
            resultDatas.put("code", "0");
            resultDatas.put("message", "失败");
        }
        return resultDatas;
    }
    
    /**
     * App查找消息对话
     * @return 客户列表
     */
    @RequestMapping(value = "/getAppLtxx", method = { RequestMethod.GET,
            RequestMethod.POST })
    @ResponseBody
    public JSONObject getAppLtxx(String jsrid,String fsrid,String dljgbm) {
        JSONObject resultDatas = new JSONObject();
        try {
            resultDatas.put("data", systemMessagesService.getLtxx(fsrid,jsrid));
            PtLtxxMx ptLtxx = new PtLtxxMx();
            ptLtxx.setDljgbm(dljgbm);
            ptLtxx.setJsrid(jsrid);
            
            ptLtxx.setFsrid(fsrid);
            systemMessagesService.updateLtxx(ptLtxx);
            
            Jedis jedis = null;
            
            try {
                jedis = jedisPool.getResource();
                //key IMKH0000001582
                //KJ1000000059_KH0000001582
                jedis.setex("IM"+jsrid, 3000,fsrid +"_"+jsrid);
           
            } catch (Exception e) {
               e.printStackTrace();
            }finally{
                if(jedis !=null){
                    jedis.close();
                }
            }
            
            
            
            resultDatas.put("code", "1");
            resultDatas.put("message", "成功");
        } catch (Exception e) {
            resultDatas.put("code", "0");
            resultDatas.put("message", "失败");
        }
        return resultDatas;
    }
    
    
    
    /**
     * 聊天信息追加
     * 
     * @param ptLtxx 聊天信息
     * @return JSONObject
     * @throws UnsupportedEncodingException 
     */
  /*  @RequestMapping(value = "/addLtxx", method = { RequestMethod.POST })
    @ResponseBody
    public JSONObject addMessages(PtLtxxMx ptLtxx) throws UnsupportedEncodingException {
        
    JSONObject resultDatas = new JSONObject();
    // 省市获取
    try {
        ptLtxx.setDljgbm(CurrentLoginUser.getUser().getDljgBm());
        ptLtxx.setFsrid(CurrentLoginUser.getUser().getDljgBm());
        systemMessagesService.addLtxx(ptLtxx);
        if(redisClinet.get("JSRID_PC"+ptLtxx.getJsrid()) == null){
            redisClinet.set("JSRID_PC"+ptLtxx.getJsrid(), "0");//0 未读
        }
        resultDatas.put("code", "1");
        resultDatas.put("message", "成功");
    } catch (Exception e) {
        e.printStackTrace();
        resultDatas.put("code", "0");
        resultDatas.put("message", "失败");
    }

    return resultDatas;
    }  */
}
