package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.dao.GetLoginUserInfoMapper;
import com.xinhai.caiyun.systemmanager.api.CustomerType;
import com.xinhai.caiyun.systemmanager.api.CustomerTypeService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**客户分类
 * @author pusilin
 *
 */
@Controller
@RequestMapping("/customertype")
public class CustomerTypeController {

	 Logger logger = LogManager.getLogger(CustomerTypeController.class.getName());
	 
	/**
     * 获取当前登陆的用户编码
     */
    private  String userid = "";
    
    /**
     * 自动注入
     */
    @Autowired
    CustomerTypeService service;
    @Autowired
    GetLoginUserInfoMapper getLoginUserInfoMapper;
    /**
     * 获取全部客户分类
     * @return
     */
    @RequestMapping(value = "/customertype", method = RequestMethod.GET)
    @ResponseBody
    public List<CustomerType> findAllCustomerType() {
    	userid = CurrentLoginUser.getId();//获取当前用户ID
        User user = getLoginUserInfoMapper.findUserById(userid);
        return service.findAllCustomerType(user.getDljgBm());
    }
    
    /**
     * 根据id查询客户分类 
     */
    @RequestMapping(value = "/customertype/{id}", method = RequestMethod.GET)
    @ResponseBody
    public CustomerType findByIdCustomerType(@PathVariable("id") String id) {
        return service.findByIdCustomerType(id);
    }
    
    /**
     * 根据编号修改客户分类
     * @return
     */
    @RequestMapping(value = "/customertype/{id}",method = RequestMethod.PUT)
    @ResponseBody
    public JSONObject updateCustomerType(@PathVariable String id,@RequestBody CustomerType cust){
        JSONObject returnData = new JSONObject();
        userid = CurrentLoginUser.getId();//获取当前用户ID
        User user = getLoginUserInfoMapper.findUserById(userid);//根据当前登录的ID 获取职员代码 返回用户信息USER表
        try {
        	cust.setGxrq(new Date());
        	cust.setGxry(user.getZydm());
        	cust.setLrrq(new Date());
        	cust.setLrry(user.getZydm());
            service.updateCustomerType(id,cust);
            returnData.put("success", true);
        } catch (Exception e) {
            // TODO: handle exception
            returnData.put("success", false);
            returnData.put("message", "修改失败！");
            logger.error("修改失败！", e);
        }
        return returnData;
    }
    
    /**
     * 根据ID删除客户分类
     * @param id
     * @return
     */
    @RequestMapping(value="/customertype/{id}",method = RequestMethod.DELETE)
    @ResponseBody
    public JSONObject deleteCustomerType(@PathVariable("id") String id) {
        JSONObject returnData = new JSONObject();
        userid = CurrentLoginUser.getId();//获取当前用户ID
        User user = getLoginUserInfoMapper.findUserById(userid);//根据当前登录的ID 获取职员代码 返回用户信息USER表
        try {
        	CustomerType cust = new CustomerType();
        	cust.setScbz(1);
        	cust.setScry(user.getZydm());
            cust.setScrq(new Date());
            cust.setId(id);
            service.updateCustomerType(id, cust);
            returnData.put("success", true);
        } catch (Exception e) {
            returnData.put("success", false);
            returnData.put("message", "删除失败！");
            logger.error("删除失败！", e);
        }
        return returnData;
    }
    
    /**
     * 新增客户分类
     * @return
     */
    @RequestMapping(value = "/customertype", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject addCustomerType(@RequestBody CustomerType cust) {
    	JSONObject returnData = new JSONObject();
    	userid = CurrentLoginUser.getId();//获取当前用户ID
        User user = getLoginUserInfoMapper.findUserById(userid);
        try {
        	CustomerType hastype=service.findByNameCustomerType(cust.getKhfl_mc(),user.getDljgBm() );
        	if(hastype!=null){
    			returnData.put("success", false);
    			returnData.put("message", "保存失败，客户分类名称已经存在！");
        	}else{
        		cust.setDljg_bm(user.getDljgBm());
        		cust.setLrrq(new Date());
        		cust.setLrry(user.getZydm());
        		cust.setNsrsbh(user.getNsrsbh());
        		service.addCustomerType(cust);
        		returnData.put("success", true);
        	}
			
		} catch (Exception e) {
			returnData.put("success", false);
            returnData.put("message", "保存失败！");
            logger.error("保存失败！", e);
		}
        return returnData ;
    }
}
