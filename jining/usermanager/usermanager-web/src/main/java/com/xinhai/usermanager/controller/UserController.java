package com.xinhai.usermanager.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.MaxAtomicInteger;
import com.xinhai.caiyun.commonmanager.api.RedisClinet;
import com.xinhai.caiyun.commonmanager.utils.AESCipher;
import com.xinhai.caiyun.commonmanager.utils.AccountValidatorUtil;
import com.xinhai.caiyun.commonmanager.utils.GetDate;
import com.xinhai.caiyun.commonmanager.utils.GetFileType;
import com.xinhai.caiyun.commonmanager.utils.OSSUploadFileUtil;
import com.xinhai.caiyun.customermanage.api.CustomerManage;
import com.xinhai.caiyun.customermanage.api.CustomerManageService;
import com.xinhai.caiyun.customermanage.business.JZUtil;
import com.xinhai.caiyun.statisticalanalysis.api.DispatchManageService;
import com.xinhai.organization.api.Organization;
import com.xinhai.organization.dao.OrganizationMapper;
import com.xinhai.organization.service.OrganizationService;
import com.xinhai.rolemanager.entity.Role;
import com.xinhai.rolemanager.service.RoleService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.security.api.MD5EncryptService;
import com.xinhai.usermanager.dao.UserMapper;
import com.xinhai.usermanager.entity.User;
import com.xinhai.usermanager.entity.UserInfoImage;
import com.xinhai.usermanager.service.UserService;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.math.BigDecimal;
import java.net.URLConnection;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by fanxi on 2016-4-28.
 * @author 李茂飞修改
 */
@Controller
@RequestMapping(value = "/users")
public class UserController {

    /**
     * 日志
     */
    private Logger logger = LoggerFactory.getLogger(UserController.class.getName());

    /**
     * 注入UserService
     */
    @Autowired
    private UserService userService;

    @Autowired
    private CustomerManageService customermanageService;

    @Autowired
    private RoleService roleService;

    /**
     * 注入OrganizationService
     */
    @Autowired(required = false)
    private OrganizationService organizationService;
    
    /**
     * 注入OrganizationService
     */
    @Autowired(required = false)
    private OrganizationMapper organizationMapper;

    /**
     * 注入MaxAtomicInteger
     */
    @Autowired
    private MaxAtomicInteger maxAtomicInteger;

    @Autowired
    private RedisClinet redisClinet;
    
    @Autowired
    private UserMapper userMapper;
    
    @Autowired
    private DispatchManageService dispatchManageService;

    /**
     * MD5加密
     */
    private MD5EncryptService passwordEncryptService = new MD5EncryptService();
    
    /**
     * key
     */
    private String key = "Gx_Cys_key@2017!";
    
    /**
     * 装箱 pt_khxx表
     */
    //@Autowired
    //private PtKhxxMapper ptKhxxMapper;
    
    
    /**
     * 获取全部用户信息
     * @throws Exception 抛出异常
     * @return 全部用户信息
     */
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    @OperateLog(describe = "打开员工列表")
    @ResponseBody
    public List<User> getUsers() throws Exception {
        String dljgBm = CurrentLoginUser.getUser().getDljgBm(); //代理机构编码

//        User currentUser = CurrentLoginUser.getUser();
//        String oo = "";
//        if(!currentUser.isIfManager()){ //若当前员工不为管理员
//            if (currentUser.getBmqxdm().equals("0")) { //员工具有个人权限
//                //只查询该员工自己的信息
//                List<User> users = new ArrayList<User>();
//                //设置信息
//                currentUser.setOrgName(getBMname(currentUser.getBmdm()));
//                currentUser.setJsdm(getUserRoleNames(currentUser.getId()));
//                currentUser.setEmail(AESCipher.aesDecryptString(currentUser.getEmail() == null ? "" : currentUser.getEmail(), key)); // 邮箱
//                users.add(currentUser);
//                return users;
//            } else { //员工具有部门权限
//                String bmqxdm = currentUser.getBmqxdm();
//                String[] arr = bmqxdm.split(",");
//                for (int i = 0; i < arr.length ; i++) {
//                    String oo2 = organizationService.getOrgByUserCode(arr[i]);
//                    oo += "," + oo2;
//                }
//            }
//            List<String> bmdmList = GetDate.StringToList(oo);
//            //去重
//            Set<String> set = new  HashSet<String>(); 
//            List<String> newList = new  ArrayList<String>(); 
//            set.addAll(bmdmList);
//            newList.addAll(set);
//            organizations = organizationService.getOrginCode(newList);
//        }
        
        /**
         * 将属于该记账公司下的所有部门全部查出来
         */
        /*if (organizations.size() > 0) {
            for (Organization organization : organizations) {
                bmdms.add(organization.getCode());
                idToOrg.put(organization.getCode(), organization.getName());
            }
        }

        List<User> users = new ArrayList<User>();
        if (bmdms.size() > 0) {
        
            users = userService.getUsersByBmdm(customerId, bmdms);
            for (User user : users) {
                user.setOrgName((String) idToOrg.get(user.getBmdm()));
                user.setJsdm(getUserRoleNames(user.getId()));

            }  
        } else {
            users = userService.getUsers(customerId);
        }*/

        List<User> users = null;

        if (dljgBm.equals("DL0000000001")) {
            users = userMapper.getAllUsersByPt(dljgBm);
        } else {
            users = userMapper.getAllUsers(dljgBm, CurrentLoginUser.getUser().getZydm());
        }
        
        for (User user:users) {
            //对字段解密
            user.setEmail(AESCipher.aesDecryptString(user.getEmail() == null ? "" : user.getEmail(), key)); // 邮箱
        }
        return users;
    }
    
    /**
     * 获取全部用户信息
     * @throws Exception 抛出异常
     * @return 全部用户信息
     */
    @RequestMapping(value = "/resetUser", method = RequestMethod.POST)
    @ResponseBody
    public List<User> resetUser(@RequestBody JSONObject obj) throws Exception {
        String searchText = obj.getString("searchText");
        String zt = obj.getString("zt");
        String dljgBm = CurrentLoginUser.getUser().getDljgBm();
        String ygssbm = obj.getString("ygssbm");
        String ygssjs = obj.getString("ygssjs");
        Date createTime = obj.getDate("createTime");
//        List<String> bmdms = new ArrayList<>();
//        Map<String, String> idToOrg = new HashMap<String, String>();
//        List<Organization> organizations = organizationService.getOrgByCustomer(customerId);
        
        /**
         * 将属于该记账公司下的所有部门全部查出来
         */
//        if (organizations.size() > 0) {
//            for (Organization organization : organizations) {
//                bmdms.add(organization.getCode());
//                idToOrg.put(organization.getCode(), organization.getName());
//            }
//        }

        try {
            if (createTime != null) {
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                createTime = GetDate.getFutureDay(createTime,"01",1);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        List<User> users = new ArrayList<User>();
        users = userMapper.getUsersByBmdmAndSearChText(dljgBm, CurrentLoginUser.getUser().getZydm(), searchText, ygssbm, ygssjs, createTime);
        if (zt.equals("0")) { //查找离职的
            users = userMapper.getUsersByBmdmDel(dljgBm, CurrentLoginUser.getUser().getZydm(), searchText, ygssbm, ygssjs, createTime);
        }
//        if (bmdms.size() > 0) {
//            users = userMapper.getUsersByBmdmAndSearChText(customerId, bmdms, searchText);
//            if (zt.equals("0")) { //查找离职的
//                users = userMapper.getUsersByBmdmDel(customerId, bmdms, searchText);
//            } 
//        } else { //若为空，只查本人所在部门的
//            //bmdms.add(currentUser.getBmdm());
//            users = userMapper.getUsersByBmdmAndSearChText(customerId, bmdms, searchText);
//            if (zt.equals("0")) {
//                users = userMapper.getUsersByBmdmDel(customerId, bmdms, searchText);
//            }
//        }
        
        for (User user:users) {
//            user.setOrgName((String) idToOrg.get(user.getBmdm()));
//            user.setJsdm(getUserRoleNames(user.getId()));
            //对字段解密
            user.setEmail(AESCipher.aesDecryptString(user.getEmail() == null ? "" : user.getEmail(), key)); // 邮箱
        }
        return users;
    }

    /**
     * 针对输入用户查询对应角色
     * @param userId 传入用户id
     * @return 角色字符串
     */
    public String getUserRoleNames(String userId) {
        String roleNames = "";
        if (userId == null || userId.equals("")) {
            return "";
        }
        // 现根据传入用户id查询出该用户所有的角色id
        List<String> list = userService.getUserRole(userId);
        // 根据角色id查出对应角色名，并组成字符串
        if (list != null && list.size() > 0) {
            roleNames = userService.getRoleNames(list);
        }
        return roleNames;
    }
    
    /**
     * 针对部门代码查询对应部门名称
     * @param bmdm bmdm
     * @return 角色字符串
     */
    public String getBMname(String bmdm) {
        if (bmdm == null || bmdm.equals("")) {
            return "";
        }
        // 查出名称
        String bmName = organizationService.findQXBMMC(bmdm);
        return bmName;
    }

    /**
     * 通过id获取user信息
     * @param id 传入userid
     * @throws Exception 报异常
     * @return 返回user对象
     */
    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject getUser(@PathVariable("id") String id) throws Exception {
        JSONObject jsonObject = new JSONObject();
        User user = userService.getUser(id);
        if (user != null) {
            Organization org = organizationService.selectByCode(user.getBmdm()); // 通过user的bmdm查询到orgid
            //user.setOrgId(org.getId());
            //对字段解密
            user.setEmail(AESCipher.aesDecryptString(user.getEmail() == null ? "" : user.getEmail(), key)); // 邮箱
            user.setYddh(AESCipher.aesDecryptString(user.getYddh() == null ? "" : user.getYddh(), key)); //移动电话
            user.setLxdz(AESCipher.aesDecryptString(user.getLxdz() == null ? "" : user.getLxdz(), key)); //地址
            user.setTel(AESCipher.aesDecryptString(user.getTel() == null ? "" : user.getTel(), key)); //联系电话
            user.setQq(AESCipher.aesDecryptString(user.getQq() == null ? "" : user.getQq(), key)); //QQ
            user.setSfzhm(AESCipher.aesDecryptString(user.getSfzhm() == null ? "" : user.getSfzhm(), key)); //身份证号码
            if (org != null) {
                jsonObject.put("bmdm", org.getCode());
                jsonObject.put("bmmc", org.getName());
            }
        }
        String roleInfo = "";
        List<String> roleList = userService.getUserRole(id);
        for (int i = 0; i < roleList.size(); i++) {
            if (i > 0 && i < roleList.size()) {
                roleInfo += "，";
            }
            Role role = roleService.getRole(roleList.get(i));
            roleInfo += role.getName();
        }
        jsonObject.put("bmqxdm", user.getBmqxdm()); //部门权限代码
        String bmqxmc = "本人";
        if (!user.getBmqxdm().equals("0")) { //不为0时，代表不为本人
            bmqxmc = organizationService.findQXBMMC(user.getBmqxdm()); //当前人权限部门名称
        }
        String authList = organizationMapper.getUserFromBmqxString(user.getZydm()); //查询所有实际权限
        jsonObject.put("savebmqxdm", authList); //部门权限代码
        jsonObject.put("bmqxmc", bmqxmc); //部门权限名称
        jsonObject.put("roleInfo", roleInfo);
        jsonObject.put("name", user.getName());
        jsonObject.put("userAccount", user.getUserAccount());
        jsonObject.put("xbdm", user.getXbdm());
        jsonObject.put("csrq", user.getCsrq());
        jsonObject.put("email", user.getEmail());
        jsonObject.put("yddh", user.getYddh());
        jsonObject.put("tel", user.getTel());
        jsonObject.put("qq", user.getQq());
        jsonObject.put("jsdm", user.getJsdm());
        jsonObject.put("bzxx", user.getRemark());
        jsonObject.put("lxdz", user.getLxdz());
        jsonObject.put("remark", user.getRemark());
        jsonObject.put("ygxl", user.getYgxl());
        jsonObject.put("sfzhm", user.getSfzhm());
        jsonObject.put("cyzz", user.getCyzz());
        jsonObject.put("cyrq", user.getCyrq());
        return jsonObject;
    }

    /**
     * 添加用户
     * @param user 添加对象
     * @return 返回树节点
     * @throws UnsupportedEncodingException 
     * @throws BadPaddingException 
     * @throws IllegalBlockSizeException 
     * @throws InvalidAlgorithmParameterException 
     * @throws NoSuchPaddingException 
     * @throws  
     * @throws Exception 
     */
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    @OperateLog(describe = "添加用户")
    @ResponseBody
    public JSONObject addUser(@RequestBody User user) throws Exception {
        JSONObject returnData = new JSONObject();
        String userCustomerId = user.getCustomerId();
        String zydmuuid = user.getZydm();

        if (StringUtils.isEmpty(userCustomerId)) {
            userCustomerId = CurrentLoginUser.getCustomerId();
        }

        //校验工作
        if (user.getName().equals("")) {
            returnData.put("success", false);
            returnData.put("message", "用户姓名不得为空！");
    
            return returnData;
        } else if (!AccountValidatorUtil.isUserxm(user.getName())) {
            returnData.put("success", false);
            returnData.put("message", "用户姓名应为20位以内的中文或英文！");
    
            return returnData;
        } else {
            if (user.getUserAccount().equals("")) {
                returnData.put("success", false);
                returnData.put("message", "登录账户不得为空！");
        
                return returnData;
            } else if (userService.hasAccountExist(user.getUserAccount())) {
                returnData.put("success", false);
                returnData.put("message", "登录账户已经存在！");
        
                return returnData;
            } else {
                if (!user.getEmail().equals("") && !AccountValidatorUtil.isEmail(user.getEmail())) {
                    returnData.put("success", false);
                    returnData.put("message", "邮箱格式错误！");
            
                    return returnData;
                
                } else if (user.getYddh().equals("")) {
                    returnData.put("success", false);
                    returnData.put("message", "手机号码不得为空！");
            
                    return returnData;
                } else if (!AccountValidatorUtil.isMobile(user.getYddh())) {
                    returnData.put("success", false);
                    returnData.put("message", "手机号格式不合法,不是由11位有效数字组成！");
            
                    return returnData;
                } else {
                    if (user.getBmdm().equals("")) {
                        returnData.put("success", false);
                        returnData.put("message", "所属部门不得为空！");
                
                        return returnData;
                    } else {
                        if (!user.getTel().equals("") && !AccountValidatorUtil.isGddh(user.getTel())) {
                            returnData.put("success", false);
                            returnData.put("message", "联系电话的格式应为3到4位区号加-加7到14位固定号码！");
                    
                            return returnData;
                        
                        } else {
                            if (!user.getQq().equals("") && !AccountValidatorUtil.isQq(user.getQq())) {
                                returnData.put("success", false);
                                returnData.put("message", "qq号码的格式应为5到10为数字！");
                        
                                return returnData;
                            
                            } else if (!AccountValidatorUtil.isLength(user.getLxdz())) {
                                returnData.put("success", false);
                                returnData.put("message", "联系地址内容长度不超过500哟！");
                        
                                return returnData;
                            } else if (!AccountValidatorUtil.isLength(user.getRemark())) {
                                returnData.put("success", false);
                                returnData.put("message", "备注内容长度不超过500哟！");
                        
                                return returnData;
                            }
                        }
                    }
                }
            }
        }
        
        //Organization oo = null;
        User u = CurrentLoginUser.getUser(); // 获取当前用户信息
        if ((user.getBmdm() == null || user.getBmdm().isEmpty()) && u != null) {
            user.setBmdm(u.getBmdm()); // 设置新用户与当前用户为同一部门
        } 

        String id = UUID.randomUUID().toString();
        user.setId(id);
        user.setCustomerId(userCustomerId);
        user.setPassword("670b14728ad9902aecba32e22fa4f6bd");
        String zgdm = maxAtomicInteger.getMaxYgbm(); // 职工代码
        System.out.println("+++++++++添加员工获取最大编码+++++++++++++"+zgdm);
        user.setZydm(zgdm); // 职员代码
        if (u != null) {
            user.setNsrsbh(u.getNsrsbh());
            user.setDljgBm(u.getDljgBm()); // 代理机构编码
        } else {
            user.setNsrsbh("");
            user.setDljgBm(""); // 代理机构编码
        }
        user.setLrry(u.getZydm()); // 录入人编码
        
        if (!user.getBmqxdm().equals("0")) { //代表部门权限
            List<String> savebmqxList = GetDate.StringToList(user.getSavebmqxdm()); //所有最底层的部门编码
            organizationService.delUserBmdm(zgdm); //先删除原有的
            organizationService.insertUerBmdm(zgdm, savebmqxList); //插入新的职员部门权限
        }

        //对字段加密
        user.setEmail(AESCipher.aesEncryptString(user.getEmail() == null ? "" : user.getEmail(), key)); // 邮箱
        user.setYddh(AESCipher.aesEncryptString(user.getYddh() == null ? "" : user.getYddh(), key)); //移动电话
        user.setLxdz(AESCipher.aesEncryptString(user.getLxdz() == null ? "" : user.getLxdz(), key)); //地址
        user.setTel(AESCipher.aesEncryptString(user.getTel() == null ? "" : user.getTel(), key)); //联系电话
        user.setQq(AESCipher.aesEncryptString(user.getQq() == null ? "" : user.getQq(), key)); //QQ
        user.setSfzhm(AESCipher.aesEncryptString(user.getSfzhm() == null ? "" : user.getSfzhm(), key)); //身份证号码
        if (user.getJsdm().contains(",")) {
            user.setJsdm(user.getJsdm().substring(0, user.getJsdm().length() - 1));
        } else { //为选择时，默认为初始角色
            user.setJsdm("ce625b28-c5bc-4fed-af11-81afc8954f55");
        }
        user.setEnabled(true);
        user.setIfManager(false);
        
        userService.addUser(user);


        //同步信息
        /*Map m = JZUtil.tbxx("1",zgdm,"");//1用户信息同步
        String str_result = m.get("result")+"";
        if(!(str_result).equals("ok")){
            returnData.put("success", false);
            returnData.put("message", str_result);
            //删除
            userService.deleteUserbyzydm(zgdm);
            return returnData;
        }*/
        
        String[] arr = user.getJsdm().split(",");
        //转成list
        List<String> list = new ArrayList<String>();
        if (user.getJsdm().length() > 0) {
            list = Arrays.asList(arr);
        }
        //向user_role表中插入数据
        userService.setUserRoleOne(id, list);

        //修改附件
        userService.updateFileInfo(zydmuuid,user.getZydm());
        returnData.put("success", true);

        return returnData;
    }

    /**
     * 修改用户内容（个人信息）
     * @param id 用户id
     * @param user 用户信息
     * @throws Exception 异常
     * @return 修改结果
     */
    @RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
    @OperateLog(describe = "修改用户个人信息")
    @ResponseBody
    public JSONObject updateUser(@PathVariable("id") String id,
            @RequestBody User user) throws Exception {
        JSONObject returnData = new JSONObject();
        //校验工作
        if (user.getName().equals("")) {
            returnData.put("success", false);
            returnData.put("message", "用户名不得为空！");
    
            return returnData;
        } else if (!AccountValidatorUtil.isUserxm(user.getName())) {
            returnData.put("success", false);
            returnData.put("message", "用户姓名应为20位以内的中文或英文！");
    
            return returnData;
        } else {
            if (!user.getEmail().equals("") && !AccountValidatorUtil.isEmail(user.getEmail())) {
                returnData.put("success", false);
                returnData.put("message", "邮箱格式错误！");
        
                return returnData;
            
            } else if (user.getYddh().equals("")) {
                returnData.put("success", false);
                returnData.put("message", "手机号码不得为空！");
        
                return returnData;
            } else if (!AccountValidatorUtil.isMobile(user.getYddh())) {
                returnData.put("success", false);
                returnData.put("message", "手机号格式不合法,不是由11位有效数字组成！");
        
                return returnData;
            } else {
                if (!user.getTel().equals("") && !AccountValidatorUtil.isGddh(user.getTel())) {
                    returnData.put("success", false);
                    returnData.put("message", "联系电话的格式应为3到4位区号加-加7到14位固定号码！");
            
                    return returnData;
                
                } else {
                    if (!user.getQq().equals("") && !AccountValidatorUtil.isQq(user.getQq())) {
                        returnData.put("success", false);
                        returnData.put("message", "qq号码的格式应为5到10为数字！");
                
                        return returnData;
                    
                    } else if (!AccountValidatorUtil.isLength(user.getLxdz())) {
                        returnData.put("success", false);
                        returnData.put("message", "联系地址内容长度不超过500哟！");
                
                        return returnData;
                    } else if (!AccountValidatorUtil.isLength(user.getRemark())) {
                        returnData.put("success", false);
                        returnData.put("message", "备注内容长度不超过500哟！");
                
                        return returnData;
                    }
                }
            }
        }
        
//        // 对传入的用户单位进行判断
//        Organization oo = null;
//        User u = CurrentLoginUser.getUser(); // 获取当前用户信息
//        if ((user.getBmdm() == null || user.getBmdm().isEmpty()) && u != null) {
//            user.setBmdm(u.getBmdm()); // 设置新用户与当前用户为同一部门
//        } else { // 若选择了部门，选择的为orgid,需查询为bmdm
//            oo = organizationService.getOrg(user.getBmdm());
//            user.setBmdm(oo.getCode());
//        }
        
        //对字段加密
        user.setEmail(AESCipher.aesEncryptString(user.getEmail() == null ? "" : user.getEmail(), key)); // 邮箱
        user.setYddh(AESCipher.aesEncryptString(user.getYddh() == null ? "" : user.getYddh(), key)); //移动电话
        user.setLxdz(AESCipher.aesEncryptString(user.getLxdz() == null ? "" : user.getLxdz(), key)); //地址
        user.setTel(AESCipher.aesEncryptString(user.getTel() == null ? "" : user.getTel(), key)); //联系电话
        user.setQq(AESCipher.aesEncryptString(user.getQq() == null ? "" : user.getQq(), key)); //QQ
        
        try {
            User olduser = userService.getUser(id);
            
            if (user.getIfChangName().equals("1")) { //员工姓名修改，执行存储过程
                userMapper.changName(olduser.getZydm(), user.getName());
            }
            //修改派工信息
            //dispatchManageService.updateUserInfo(olduser.getDljgBm(),olduser.getZydm(),user.getName(),null,null,null);
            //修改用户信息
            userService.updateUser(id, user);
            //修改公司评价以及客户评价
            //userService.updateGSPJ(olduser.getDljgBm(),olduser.getZydm(),user.getName(),null);
            //userService.updateKHPJ(olduser.getDljgBm(),olduser.getZydm(),user.getName(),null);
            returnData.put("success", true);
            redisClinet.set(CurrentLoginUser.getUser().getId(), userService.getUser(id));
        } catch (Exception ex) {
            returnData.put("success", false);
            returnData.put("message", "修改用户失败！");
            logger.error("修改用户失败！", ex);
        }

        return returnData;
    }

    /**
     * 修改用户360中用户内容
     * @param id 用户id
     * @param user 用户信息
     * @throws Exception 异常
     * @return 修改结果
     * */
    @RequestMapping(value = "/user/user/{id}", method = RequestMethod.POST)
    @OperateLog(describe = "修改员工列表用户信息")
    @ResponseBody
    public JSONObject updateUserById(@PathVariable("id") String id,
                                 @RequestBody User user) throws Exception {
        JSONObject returnData = new JSONObject();

        //校验工作
        if (user.getName().equals("")) {
            returnData.put("success", false);
            returnData.put("message", "用户名不得为空！");

            return returnData;
        } else if (!AccountValidatorUtil.isUserxm(user.getName())) {
            returnData.put("success", false);
            returnData.put("message", "用户姓名应为20位以内的中文或英文！");
    
            return returnData;
        } else {
            if (!user.getEmail().equals("") && !AccountValidatorUtil.isEmail(user.getEmail())) {
                returnData.put("success", false);
                returnData.put("message", "邮箱格式错误！");

                return returnData;

            } else if (user.getYddh().equals("")) {
                returnData.put("success", false);
                returnData.put("message", "手机号码不得为空！");

                return returnData;
            } else if (!AccountValidatorUtil.isMobile(user.getYddh())) {
                returnData.put("success", false);
                returnData.put("message", "手机号格式不合法,不是由11位有效数字组成！");

                return returnData;
            } else {
                if (user.getBmdm().equals("")) {
                    returnData.put("success", false);
                    returnData.put("message", "所属部门不得为空！");
            
                    return returnData;
                } else {
                    if (!user.getTel().equals("") && !AccountValidatorUtil.isGddh(user.getTel())) {
                        returnData.put("success", false);
                        returnData.put("message", "联系电话的格式应为3到4位区号加-加7到14位固定号码！");
                
                        return returnData;
                    
                    } else {
                        if (!user.getQq().equals("") && !AccountValidatorUtil.isQq(user.getQq())) {
                            returnData.put("success", false);
                            returnData.put("message", "qq号码的格式应为5到10为数字！");
                    
                            return returnData;
                        
                        } else if (!AccountValidatorUtil.isLength(user.getLxdz())) {
                            returnData.put("success", false);
                            returnData.put("message", "联系地址内容长度不超过500哟！");
                    
                            return returnData;
                        } else if (!AccountValidatorUtil.isLength(user.getRemark())) {
                            returnData.put("success", false);
                            returnData.put("message", "备注内容长度不超过500哟！");
                    
                            return returnData;
                        }
                    }
                }
            }
        }

        // 对传入的用户单位进行判断
        //Organization oo = null;
        User u = CurrentLoginUser.getUser(); // 获取当前用户信息
        if ((user.getBmdm() == null || user.getBmdm().isEmpty()) && u != null) {
            user.setBmdm(u.getBmdm()); // 设置新用户与当前用户为同一部门
        } 

        //对字段加密
        user.setEmail(AESCipher.aesEncryptString(user.getEmail() == null ? "" : user.getEmail(), key)); // 邮箱
        user.setYddh(AESCipher.aesEncryptString(user.getYddh() == null ? "" : user.getYddh(), key)); //移动电话
        user.setLxdz(AESCipher.aesEncryptString(user.getLxdz() == null ? "" : user.getLxdz(), key)); //地址
        user.setTel(AESCipher.aesEncryptString(user.getTel() == null ? "" : user.getTel(), key)); //联系电话
        user.setQq(AESCipher.aesEncryptString(user.getQq() == null ? "" : user.getQq(), key)); //QQ
        user.setSfzhm(AESCipher.aesEncryptString(user.getSfzhm() == null ? "" : user.getSfzhm(), key)); //身份证号码
        if (user.getJsdm().contains(",")) {
            user.setJsdm(user.getJsdm().substring(0, user.getJsdm().length() - 1));
        }
        
        organizationService.delUserBmdm(user.getZydm()); //先删除原有的
        if (!user.getBmqxdm().equals("0")) { //代表部门权限(若重新授权的还是部门权限)
            List<String> savebmqxList = GetDate.StringToList(user.getSavebmqxdm()); //所有最底层的部门编码
            organizationService.insertUerBmdm(user.getZydm(), savebmqxList); //插入新的职员部门权限
        }

        try {
            User olduser = userService.getUser(id);
            
            /*if (user.getIfChangeJsdm().equals("1")) { //员工角色发生改变,更新派工信息的员工角色信息
                Role r = roleService.getRole(user.getJsdm());
                if (r != null) {
                    //修改派工信息
                    dispatchManageService.updateUserInfo(olduser.getDljgBm(), olduser.getZydm(), null, null, r.getJsdm() + "", user.getJsname());
                } else {
                    //修改派工信息
                    dispatchManageService.updateUserInfo(olduser.getDljgBm(), olduser.getZydm(), null, null, user.getJsdm(), user.getJsname());
                }
                
                //更新user角色
                setUserRole(id, user.getJsdm());
            }*/
            if (user.getIfChangName().equals("1")) { //员工姓名修改，执行存储过程
                userMapper.changName(user.getZydm(), user.getName());
            }
           
            //修改公司评价以及客户评价
            //userService.updateGSPJ(olduser.getDljgBm(),olduser.getZydm(),user.getName(),null);
            //userService.updateKHPJ(olduser.getDljgBm(),olduser.getZydm(),user.getName(),null);
            //更新user表
            userService.updateUser(id, user);
            returnData.put("success", true);
            User user1 = userService.getUser(id);
            boolean a = redisClinet.del(id);
            redisClinet.set(id, user1);
        } catch (Exception ex) {
            returnData.put("success", false);
            returnData.put("message", "修改用户失败！");
            logger.error("修改用户失败！", ex);
        }

        return returnData;
    }
    
    /**
     * 操作一个用户的角色
     * @param userId 用户id
     * @param roleIds 角色代码
     * @return 
     */
    private void setUserRole(String userId, String roleIds) {
        
        String[] arr = roleIds.split(",");
        //转成list
        List<String> list = new ArrayList<String>();
        if (roleIds.length() > 0) {
            list = Arrays.asList(arr);
        }
        //先将user_role表中原userId数据删除，再插入新数据
        userService.setUserRoleOne(userId, list);
        //更新user表中的数据
        userService.updateToleOne(userId, roleIds);
    }

    /**
     * 删除用户
     * @param json 用户ids
     * @return 删除结果
     */
    @RequestMapping(value = "/user/deleteUser/{e}", method = RequestMethod.PUT)
    @OperateLog(describe = "删除用户")
    @ResponseBody
    public JSONObject deleteUser(@PathVariable("e") int e, @RequestBody JSONObject json) {
        JSONObject returnData = new JSONObject();
        
        List<String> list = new ArrayList<String>();
        JSONArray user = json.getJSONArray("user");
        for (Object u : user) {
            JSONObject o = (JSONObject) u;
            if (StringUtils.equalsIgnoreCase(o.getString("user"), CurrentLoginUser.getId())) {
                returnData.put("success", false);
                returnData.put("message", "所选用户中存在当前登录账户，不能进行删除操作！");
                return returnData;
            }
            list.add(o.getString("user")); //所有的id
        }
        
        if (e == 1) { //删除
            userService.deleteList(list, CurrentLoginUser.getUser().getZydm()); //删除所有
            //将该员工在派工管理中的所有服务状态为0的客户的派工信息删除
            //需保留派工记录（2018-1-4修改）
            //ptKhxxMapper.updateStopNum(list);
            //再将原本在派工时授予员工的权限删除（user_role_kh）
            //userMapper.deleteKhRoleOne(list);
        } else { //恢复
            userMapper.revertList(list); //恢复所有
        }
        
        returnData.put("success", true);
        returnData.put("message", "删除成功！");
        return returnData;
    }

    /**
     * 重置用户密码
     * @return true
     */
    @RequestMapping(value = "/pwd", method = RequestMethod.PUT)
    @OperateLog(describe = "重置用户密码")
    @ResponseBody
    public boolean resetUserPwd(@RequestBody JSONObject json) {
        
        List<String> list = new ArrayList<String>();
        JSONArray user = json.getJSONArray("user");
        for (Object u : user) {
            JSONObject o = (JSONObject) u;
            list.add(o.getString("user")); //所有的id
        }
        
        String pwd = passwordEncryptService.encryptPassword("000000", "");
        userService.resetUserPwd(list, pwd);
        return true;
    }

    /**
     * 停用用户
     * @param id 用户id
     * @param status 状态
     * @return true
     */
    @RequestMapping(value = "/status/{id}/{status}", method = RequestMethod.PUT)
    @OperateLog(describe = "设置用户启停状态")
    @ResponseBody
    public boolean setUserStatus(@PathVariable("id") String id,
            @PathVariable("status") Boolean status) {
        userService.setUserStatus(id, status);
        return true;
    }

    /**
     * 获取用户角色
     * @param userId 用户id
     * @return 用户角色集合
     */
    @RequestMapping(value = "/userrole/{userId}", method = RequestMethod.GET)
    @ResponseBody
    public List<String> getUserRole(@PathVariable("userId") String userId) {
        return userService.getUserRole(userId);
    }

    /**
     * 修改用户角色
     *
     * @param selectedRoles
     *            传入角色id
     * @return 是否成功
     */
    @RequestMapping(value = "/userrole/{roleid}", method = RequestMethod.PUT)
    @OperateLog(describe = "批量修改用户角色")
    @ResponseBody
    public boolean setUserRole(@PathVariable("roleid") List<String> selectedRoles, @RequestBody JSONObject json) {
        
        List<String> list = new ArrayList<String>();
        JSONArray user = json.getJSONArray("user");
        for (Object u : user) {
            JSONObject o = (JSONObject) u;
            list.add(o.getString("user")); //所有的id
        }
        
        //先将user_role表中原userId数据删除，再插入新数据
        userService.setUserRole(list, selectedRoles);
        //更新user表中的数据
        userService.updateTole(list, this.listToString(selectedRoles));
        
        List<String> zydmlist = userMapper.getZydmsByIds(list);
//        aa aa
        Role r = roleService.getRole(selectedRoles.get(0));
        if (r != null) {
            //修改派工信息
            dispatchManageService.updateRoleList(CurrentLoginUser.getUser().getDljgBm(), zydmlist, r.getJsdm() + "", r.getName());
        }
        
        return true;
    }

    /**
     * list转String
     * 
     * @param list
     *            传入的list
     * @return String
     */
    public String listToString(List<String> list) {
        if (list == null) {
            return "";
        }
        StringBuilder result = new StringBuilder();
        boolean first = true;
        // 第一个前面不拼接","
        for (String string : list) {
            if (first) {
                first = false;
            } else {
                result.append(",");
            }
            result.append(string);
        }
        return result.toString();
    }

    /**
     * 更改用户所属组织机构
     * @param orgId 部门id
     * @return true
     */
    @RequestMapping(value = "/setorg/{orgId}", method = RequestMethod.PUT)
    @OperateLog(describe = "更改用户所属组织机构")
    @ResponseBody
    public boolean setUserOrg(@PathVariable("orgId") String orgId, @RequestBody JSONObject json) {
        
        List<String> list = new ArrayList<String>();
        JSONArray user = json.getJSONArray("user");
        for (Object u : user) {
            JSONObject o = (JSONObject) u;
            list.add(o.getString("user")); //所有的id
        }
        
        userService.changeOrg(list, orgId);
        return true;
    }

    /**
     * 通过当前用户的id查询出该用户所在的部门id
     * 
     * @param id
     *            用户id
     * @return 部门id
     */
    @RequestMapping(value = "/getorg/{id}", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject getUserOrg(@PathVariable("id") String id) {
        JSONObject data = new JSONObject();
        String orgId = userService.getUserOrg(id);
        data.put("orgId", orgId);
        return data;
    }

    @RequestMapping(value = "/userauth/{id}", method = RequestMethod.GET)
    @ResponseBody
    public List<String> getUserAuth(@PathVariable("id") String id) {
        return userService.getUserAuth(id);
    }

    /**
     * 更改用户功能权限
     * @param id 用户id
     * @param resourceIds 角色id
     */
    @RequestMapping(value = "/userauth/{id}", method = RequestMethod.PUT)
    @OperateLog(describe = "更改用户功能权限")
    @ResponseBody
    public void setUserAuth(@PathVariable("id") String id,
            @RequestBody List<String> resourceIds) {
        userService.setUserAuth(id, resourceIds);
    }

    /**
     * 修改用户密码
     * @param password 新密码
     * @return 修改状态
     */
    @RequestMapping(value = "/modifypwd", method = RequestMethod.PUT)
    @OperateLog(describe = "修改用户密码")
    @ResponseBody
    public JSONObject modifyPwd(@RequestBody HashMap password) {
        JSONObject result = new JSONObject();
        if (password.containsKey("origin")) {
            String currentAccount = CurrentLoginUser.getUserAccount();
            boolean verifyUser = userService.verifyPwd(currentAccount, password
                .get("origin").toString());
            if (!verifyUser) {
                result.put("errmsg", "原密码不正确！");
            } else {
                if (password.containsKey("newPwd")) {
                    String newPwd = password.get("newPwd").toString();
                    if (StringUtils.isEmpty(newPwd)) {
                        result.put("errmsg", "新密码不能为空！");
                    } else {
                        userService.updateUserPwd(currentAccount, newPwd);
                        result.put("errmsg", "");
                    }
                } else {
                    result.put("errmsg", "新密码不能为空！");
                }
            }
        } else {
            result.put("errmsg", "原密码不能为空！");
        }

        return result;
    }

    /**
     * 设置当前用户信息到redis
     */
    @RequestMapping(value = "/setCustomerInfoToRedis", method = RequestMethod.GET)
    @OperateLog(describe = "设置当前用户信息到redis")
    @ResponseBody
    public Boolean setCustomerInfoToRedis() {
        try {
            User user = userService.getUser(CurrentLoginUser.getUser().getId());
            CustomerManage customer = customermanageService.selectCustomerById(CurrentLoginUser.getCustomer().getId());
//            CurrentLoginUser.getCustomer().setIs_qfz(customer.getIs_qfz());
            redisClinet.set(CurrentLoginUser.getUser().getId(), user);
            redisClinet.set(CurrentLoginUser.getCustomer().getId(), customer);

            return true;
        } catch (Exception e) {
            logger.error("获取信息失败", e);
        }

        return false;
    }

    /**
     * 获取当前用户信息
     */
    @RequestMapping(value = "/getCustomerInfo", method = RequestMethod.GET)
    @OperateLog(describe = "获取当前用户信息")
    @ResponseBody
    public JSONObject getCustomerInfo() {
        User user = (User) redisClinet.get(CurrentLoginUser.getUser().getId());
        CustomerManage customer = (CustomerManage) redisClinet.get(CurrentLoginUser.getCustomer().getId());
        JSONObject resultDatas = new JSONObject();
        resultDatas.put("infoName", user.getName());
        resultDatas.put("logo", customer.getLogo());
//        if (customer == null) {
//            resultDatas.put("titleName", "财云升管理平台");
//        } else {
            resultDatas.put("titleName", customer.getName());
//        }
        return resultDatas;
    }
    
    @RequestMapping(value = "/saveimg", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject saveimg(@RequestBody JSONObject imgid, HttpServletRequest request) throws IOException, InterruptedException{
        JSONObject returndata = new JSONObject();
        Map<String, Object> info = new HashMap<String, Object>();
        //表单提交
        String imgurl = imgid.getString("imgurl").split("base64,")[1];
        String filename = (new Date()).getTime() + ".jpg";
        String plate = "avatar";
        ByteArrayInputStream is = null;
        try {
            //Base64解码
            byte[] b = Base64.decodeBase64(imgurl);
            for (int i = 0; i < b.length; ++i) {
                if (b[i] < 0) { //调整异常数据
                    b[i] += 256;
                }
            }
            is = new ByteArrayInputStream(b);
            //生成jpeg图片
            String contentType = "";
            info = OSSUploadFileUtil.upLoadFileByInputStream(plate, is, filename, contentType);
            if ((boolean) info.get("success")) {
                saveHeadImg(info);
                returndata.put("success", true);
                returndata.put("info", info);
            } else {
                returndata.put("success", false);
                returndata.put("message", info.get("message"));
            }
        } catch (Exception e) {
            logger.error("保存头像出错", e);
            returndata.put("success", false);
            returndata.put("message", "保存头像失败！");
        } finally {
            is.close();
        }
        return returndata;
    }
    
    //保存用户头像
    public void saveHeadImg(Map<String, Object> info){
        //获取当前登录用户信息
        User user = userService.getUser(CurrentLoginUser.getUser().getId());
        user.setYgtx(info.get("fileURL").toString());
        userService.addUserHeadImg(CurrentLoginUser.getUser().getId(), user);
//        Customer customer = customerService.getCustomer(CurrentLoginUser.getCustomer().getId());
        //修改派工信息
        dispatchManageService.updateUserInfo(user.getDljgBm(),user.getZydm(),user.getName(),user.getYgtx(), null, null);
        redisClinet.set(CurrentLoginUser.getUser().getId(), user);
        //修改公司评价以及客户评价
        userService.updateGSPJ(user.getDljgBm(),user.getZydm(),user.getName(),user.getYgtx());
        userService.updateKHPJ(user.getDljgBm(),user.getZydm(),user.getName(),user.getYgtx());
//        redisClinet.set(CurrentLoginUser.getCustomer().getId(), customer);
    }
    
    /**
     * 上传进度条
     * @return
     */
    @RequestMapping(value = "/schedule",method = RequestMethod.GET)
    @ResponseBody
    public JSONObject getSchedule() {
        JSONObject returndata = new JSONObject();
        returndata.put("startStatus", OSSUploadFileUtil.getSchedule().get("startStatus"));
        returndata.put("schedule", OSSUploadFileUtil.getSchedule().get("schedule"));
        return returndata;
    }

    @RequestMapping(value = "/userImage/{dljgbm}/{zydm}/{fjlx}", method = RequestMethod.POST)
    @OperateLog(describe="上传员工图片")
    @ResponseBody
    public JSONObject userImage(MultipartFile file,
                                   @PathVariable("dljgbm") String dljgbm,
                                   @PathVariable("zydm") String zydm,
                                   @PathVariable("fjlx") String fjlx) throws IOException {
        JSONObject returndata = new JSONObject();
        InputStream is = null;
        UserInfoImage userInfoImage = new UserInfoImage();
        String plate = "";
        try {
            int imageSize = userService.countImageSize(dljgbm, zydm, fjlx);
            if ("003".equals(fjlx) && imageSize >= 2) {
                returndata.put("success", false);
                returndata.put("message", "超出附件上传数量！");
                return returndata;
            } else if (imageSize >= 20) {
                returndata.put("success", false);
                returndata.put("message", "超出附件上传数量！");
                return returndata;
            }
            if ("003".equals(fjlx)) {
                plate = "staff/" + dljgbm + "/" + zydm + "/idcard";
            } else {
                plate = "staff/" + dljgbm + "/" + zydm;
            }
            String filename = file.getOriginalFilename();
            String contentType = file.getContentType();
            is = file.getInputStream();
            //先判断是否是图片
            //String mimeType = URLConnection.guessContentTypeFromStream(is);
            Boolean mimeType = GetFileType.isImage(is);
            if(!mimeType) {
                returndata.put("success", false);
                returndata.put("message", "请上传指定格式的附件！");
                return returndata;
            }
            is = file.getInputStream();
            String size = is.available() + "";
            Map<String, Object> info = OSSUploadFileUtil.upLoadFileByInputStream(plate, is, filename, contentType);
            if (!(boolean) info.get("success")) {
                returndata.put("success", false);
                returndata.put("message", info.get("message"));
                return returndata;
            } else {
                userInfoImage.setFjcclj(info.get("fileURL").toString());
            }
            userInfoImage.setZydm(zydm);
            userInfoImage.setNsrsbh(CurrentLoginUser.getCustomer().getNsrsbh());
            userInfoImage.setDljg_bm(CurrentLoginUser.getUser().getDljgBm());
            userInfoImage.setFjmc(filename);
            userInfoImage.setFjlx(fjlx);
            userInfoImage.setWjlx(contentType);
            userInfoImage.setWjdx(size);
            userInfoImage.setScsj(new Date());
            userInfoImage.setLrry(CurrentLoginUser.getUser().getZydm());
            userInfoImage.setScsj(new Date());
            userService.insertUserInfoImage(userInfoImage);
            returndata.put("success", true);
        } catch (Exception e) {
            logger.error("存储企业附件出错！", e);
            returndata.put("success", false);
            returndata.put("message", "附件存储失败！");
        }
        return returndata;
    }

    @RequestMapping(value = "/userImage/{dljgbm}/{zydm}/{fjlx}", method = RequestMethod.GET)
    @OperateLog(describe="查看附件列表")
    @ResponseBody
    public List<UserInfoImage> findCompanyImageList(@PathVariable("dljgbm") String dljgbm,
                                                    @PathVariable("zydm") String zydm,
                                                    @PathVariable("fjlx") String fjlx) {
        List<UserInfoImage> userImageList = userService.findUserImageList(dljgbm, zydm, fjlx);
        return userImageList;
    }

    @RequestMapping(value = "/userImage/{id}", method = RequestMethod.DELETE)
    @OperateLog(describe="删除员工附件")
    @ResponseBody
    public JSONObject deleteCompanyImage(@PathVariable("id") String id) {
        JSONObject returndata = new JSONObject();
        UserInfoImage userInfoImage = userService.findUserInfoImageById(id);
        try {
            userInfoImage.setScrq(new Date());
            userInfoImage.setScry(CurrentLoginUser.getUser().getZydm());
            userService.deleteUserImage(id, userInfoImage);
            OSSUploadFileUtil.deleteFile(userInfoImage.getFjcclj());
            returndata.put("success", true);
        } catch (Exception e) {
            logger.error("删除员工附件出错", e);
            returndata.put("success", false);
            returndata.put("message", "删除失败!");
        }
        return returndata;
    }

    @RequestMapping(value = "/getImageUrl", method = RequestMethod.POST)
    @OperateLog(describe="下载员工附件")
    @ResponseBody
    public JSONObject getImageUrl(@RequestBody JSONObject jsonObject) {
        //点击下载，下载次数增加
        JSONObject returndata = new JSONObject();
        String plate = jsonObject.getString("plate");
        String fileurl = plate;
        if(plate.indexOf("aliyuncs.com")==-1){
            fileurl = OSSUploadFileUtil.temporary(plate).toString();
        }
        returndata.put("url", fileurl);
        userService.updateFileDownload(jsonObject.getString("id"));
        return returndata;
    }

    @RequestMapping(value = "/getImagesCount/{zydm}/{dljgbm}", method = RequestMethod.GET)
    @OperateLog(describe = "获取附件数量")
    @ResponseBody
    public JSONObject getImagesCount(@PathVariable("zydm") String zydm,
                                     @PathVariable("dljgbm") String dljgbm) {
        JSONObject jsonObject = new JSONObject();
        int educationImagesCount = userService.countImageSize(dljgbm, zydm, "001");
        int qualificationsImagesCount = userService.countImageSize(dljgbm, zydm, "002");
        int idCardImagesCount = userService.countImageSize(dljgbm, zydm, "003");
        jsonObject.put("educationImage", educationImagesCount);
        jsonObject.put("qualificationsImage", qualificationsImagesCount);
        jsonObject.put("idCardImage", idCardImagesCount);

        return jsonObject;
    }
    
    @RequestMapping(value = "/getAllZydmBm", method = RequestMethod.GET)
    @OperateLog(describe = "查询该机构所有的人员所在部门")
    @ResponseBody
    public List<User> getAllZydmBm() {
        List<User> list = userMapper.getAllZydmBm(CurrentLoginUser.getUser().getDljgBm());
        return list;
    }
    
    @RequestMapping(value = "/getAllZydmJs", method = RequestMethod.GET)
    @OperateLog(describe = "查询该机构所有的人员所属角色")
    @ResponseBody
    public List<User> getAllZydmJs() {
        List<User> list = userMapper.getAllZydmJs(CurrentLoginUser.getUser().getDljgBm());
        return list;
    }

    @RequestMapping(value = "/getPhone/{account}", method = RequestMethod.GET)
    @OperateLog(describe = "根据账号查询人员手机号")
    @ResponseBody
    public JSONObject getPhone(@PathVariable("account") String account) {
        JSONObject jsonObject = new JSONObject();

        List<Map> data = userMapper.getPhone(account);
        if (data == null || data.size() == 0) {
            jsonObject.put("success", false);
            jsonObject.put("message","该账户未注册");
            return jsonObject;
        }
        String yddh = (String) data.get(0).get("yddh");
        String password = (String) data.get(0).get("password");
        //对字段解密
        try {
            yddh = AESCipher.aesDecryptString(yddh, key); // 邮箱
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (yddh.equals("")) {
            jsonObject.put("success", false);
            jsonObject.put("message","该账户手机号为空，无法发送！");
            return jsonObject;
        }
        jsonObject.put("success", true);
        jsonObject.put("yddh", yddh);
        jsonObject.put("password", password);
        return jsonObject;
    }


    /**
     * 判断当前用户是否为管理员
     * @return true
     */
//    @RequestMapping(value = "/ifmanager", method = RequestMethod.GET)
//    @OperateLog(describe = "判断当前用户是否为管理员")
//    @ResponseBody
//    public boolean resetUserPwd() {
//        boolean ifmanager = CurrentLoginUser.getUser().isIfManager();
//        return ifmanager;
//    }

//    @RequestMapping(value = "/checkUserPas", method = RequestMethod.GET)
//    @OperateLog(describe = "查询当前员工密码情况")
//    @ResponseBody
//    public JSONObject checkUserPas() {
//        JSONObject jsonObject = new JSONObject();
//        if (CurrentLoginUser.getUser().getPassword().equals("670b14728ad9902aecba32e22fa4f6bd")) { //密码为6个0
//            jsonObject.put("success", true);
//        } else {
//            jsonObject.put("success", false);
//        }
//        return jsonObject;
//    }


//    @RequestMapping(value="/getimg",method=RequestMethod.GET)
//    @ResponseBody
//    public String getimg() {
//        User user = (User) redisClinet.get(CurrentLoginUser.getUser().getId());
//        if(user == null){
//            user = CurrentLoginUser.getUser();
//        }
//        String headimg  = user.getYgtx();
//        return headimg;
//    }

    /**
     * 更新账号信息
     */
    @RequestMapping(value = "/updateZh/{newZh}/{oldZh}", method = RequestMethod.GET)
    @OperateLog(describe = "更新账号信息")
    @ResponseBody
    public JSONObject updateZh(@PathVariable("newZh") String newZh, @PathVariable("oldZh") String oldZh) {
        boolean a = customermanageService.hasExistByZh(newZh);
        JSONObject resultDatas = new JSONObject();
        if (a) { //账号已存在
            resultDatas.put("success", false);
            resultDatas.put("message", "账号已存在！");
            return resultDatas;
        } else {
            //更新账号
            userMapper.updateZh(newZh, oldZh);
            resultDatas.put("success", true);
            return resultDatas;
        }
    }
}
