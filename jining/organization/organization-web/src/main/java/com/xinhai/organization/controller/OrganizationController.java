package com.xinhai.organization.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.utils.GetDate;
import com.xinhai.organization.api.Nums;
import com.xinhai.organization.api.Organization;
import com.xinhai.organization.api.OrganizationType;
import com.xinhai.organization.dao.OrganizationMapper;
import com.xinhai.organization.service.OrganizationService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import com.xinhai.usermanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 对于组织的操作
 * @author 李茂飞
 *
 */
@Controller
@RequestMapping(value = "/organization")
public class OrganizationController {
    /**
     * 注入OrganizationService
     */
    @Autowired
    private OrganizationService organizationService;
    
    @Autowired
    private OrganizationMapper organizationMapper;

    /**
     * 注入UserService
     */
    @Autowired
    private UserService userService;
    
    /**
     * 定义常量
     */
    private static final int TEN = 10;
    
    /**
     * 定义常量
     */
    private static final int HUNDRED = 10;

    /**
     * 获取数据
     * @return 树结构
     */
    @RequestMapping(value = "/org", method = RequestMethod.GET)
    @ResponseBody
    public JSONArray getOrg() {
        String customerId = CurrentLoginUser.getCustomerId();
        JSONArray arrayNode = new JSONArray();
        Organization independentOrg = CurrentLoginUser.getIndependentOrg();
        List<Organization> organizations;
        if (independentOrg != null) {
            organizations = organizationService.getOrgByIndependentOrg(
                independentOrg.getId(), customerId);
        } else {
            organizations = organizationService.getOrgByCustomer(customerId);
        }
        Set<String> orgIds = organizations.stream().map(Organization::getId)
                .collect(Collectors.toSet());
        for (Organization org : organizations) {
            JSONObject node = new JSONObject();
            node.put("id", org.getId());
            node.put("text", org.getName());
    
            if (org.getParentId() != null && !org.getParentId().isEmpty()
                    && orgIds.contains(org.getParentId())) {
                node.put("parent", org.getParentId());
            } else {
                node.put("parent", "#");  
                //全部节点打开
                JSONObject stateObject = new JSONObject();
                stateObject.put("opened", true);
                node.put("state", stateObject);
            }
            arrayNode.add(node);
        }

        return arrayNode;
    }
    
    /**
     * 设置所属部门时获取数据
     * @return 树结构
     */
    @RequestMapping(value = "/setBelongOrg", method = RequestMethod.GET)
    @ResponseBody
    public JSONArray setBelongOrg() {
        String customerId = CurrentLoginUser.getCustomerId();
        JSONArray arrayNode = new JSONArray();
        List<Organization> organizations = organizationService.getOrgByCustomer(customerId);
        Set<String> orgIds = organizations.stream().map(Organization::getCode)
                .collect(Collectors.toSet());
        for (Organization org : organizations) {
            JSONObject node = new JSONObject();
            node.put("id", org.getCode());
            node.put("text", org.getName());
    
            if (org.getParent_code() != null && !org.getParent_code().isEmpty()
                    && orgIds.contains(org.getParent_code())) {
                node.put("parent", org.getParent_code());
            } else {
                node.put("parent", "#");  
            }
            //全部节点打开
            JSONObject stateObject = new JSONObject();
            stateObject.put("opened", true);
            node.put("state", stateObject);
            arrayNode.add(node);
        }

        return arrayNode;
    }
    
    /**
     * 代理机构中获取组织结构树
     * @return 树结构
     */
    @RequestMapping(value = "/getDLOrg", method = RequestMethod.GET)
    @ResponseBody
    public JSONArray getDLOrg() {
        JSONArray arrayNode = new JSONArray();
        List<Organization> organizations = organizationService.getOrgByDljgBm(CurrentLoginUser.getUser().getDljgBm());

        Set<String> orgCodes = organizations.stream().map(Organization::getCode)
                .collect(Collectors.toSet());
        for (Organization org : organizations) {
            JSONObject node = new JSONObject();
            node.put("id", org.getCode());
            node.put("text", org.getName());
    
//            JSONObject attr = new JSONObject();
//            attr.put("independent", org.getIndependent());
//            node.put("li_attr", attr);
    
            if (!org.getParent_code().equals("0") && orgCodes.contains(org.getParent_code())) { //父节点不为0且父节点code存在所有的code中
                node.put("parent", org.getParent_code());
            } else {
                JSONObject stateObject = new JSONObject();
                stateObject.put("opened", true);
                node.put("parent", "#");
                node.put("state", stateObject);
            }
            arrayNode.add(node);
        }
        return arrayNode;
    }
    
    /**
     * 获取数据权限时的树
     * @return 树结构
     */
    @RequestMapping(value = "/orgAuthTree", method = RequestMethod.GET)
    @ResponseBody
    public JSONArray getOrgAuthTree() {
        String customerId = CurrentLoginUser.getCustomerId();
        JSONArray arrayNode = new JSONArray();
        List<Organization> organizations = organizationService.getOrgByCustomer(customerId);

        Set<String> orgIds = organizations.stream().map(Organization::getCode)   //将list转为流对象——>映射每个对象的code属性
                .collect(Collectors.toSet());                                    //将结果重新放到set中   
        for (Organization org : organizations) {
            JSONObject node = new JSONObject();
            node.put("id", org.getCode());
            node.put("text", org.getName());
    
            if (org.getParent_code() != null && !org.getParent_code().isEmpty() && !org.getParent_code().equals("0")
                    && orgIds.contains(org.getParent_code())) {
                node.put("parent", org.getParent_code());
            } else {
                JSONObject stateObject = new JSONObject();
                stateObject.put("opened", true);
                node.put("parent", "#");
                node.put("state", stateObject);
            }

            arrayNode.add(node);
        }

        return arrayNode;
    }

    /**
     * 获取数据
     * @return 树结构
     */
    @RequestMapping(value = "/orgAndUser", method = RequestMethod.GET)
    @ResponseBody
    public JSONArray getOrgAndUser() {
        String customerId = CurrentLoginUser.getCustomerId();
        JSONArray arrayNode = new JSONArray();
        
        List<Organization> organizations = organizationService.getOrgByCustomer(customerId);
        
        List<String> bmdms = new ArrayList<>();
        
        List<User> users = new ArrayList<>();
        
        if (organizations.size() > 0) {
            for (Organization organization : organizations) {
                bmdms.add(organization.getCode());
            }
        }

        if (bmdms.size() > 0) {
            users = userService.getUsersByBmdm(customerId, bmdms);
        }

        Set<String> orgIds = organizations.stream().map(Organization::getId)
                .collect(Collectors.toSet());
        
        //增加正在服务的客户信息
        JSONObject nodeWork = new JSONObject();
        nodeWork.put("id", "workCustomer");
        nodeWork.put("text", "员工信息");
        nodeWork.put("parent", "#");
        JSONObject stateObject1 = new JSONObject();
        stateObject1.put("opened", true);
        nodeWork.put("state", stateObject1);
        arrayNode.add(nodeWork);
        
        for (Organization org : organizations) {
            JSONObject node = new JSONObject();
            node.put("id", org.getId());
            node.put("text", org.getName());
    
            JSONObject attr = new JSONObject();

            attr.put("bmbz", true);
            node.put("li_attr", attr);
    
            if (org.getParentId() != null && !org.getParentId().isEmpty()
                    && orgIds.contains(org.getParentId())) {
                node.put("parent", org.getParentId());
            } else {
                JSONObject stateObject = new JSONObject();
                stateObject.put("opened", true);
                node.put("parent", "workCustomer");
                node.put("state", stateObject);
            }
        
            arrayNode.add(node);
            for (User u :users) {
                JSONObject node2 = new JSONObject();
                if (u.getBmdm().equals(org.getCode())) {
                    //若该员工属于该部门
                    node2.put("parent", org.getId());
                    node2.put("id", u.getId());
                    node2.put("text", u.getName());
                    node2.put("type", "people");
                    node2.put("icon", u.getYgtx());
                    //用户头像url
                    JSONObject liAttr = new JSONObject();
                    liAttr.put("userImg", "0");
                    liAttr.put("zydm", u.getZydm());
                    liAttr.put("userText", u.getName());
                    node2.put("li_attr", liAttr);
                }
                arrayNode.add(node2);
            }
        }
        JSONObject nodeAdd = new JSONObject();
        nodeAdd.put("id", "stopCustomer");
        nodeAdd.put("text", "停止服务客户");
        nodeAdd.put("parent", "#");
       // arrayNode.add(nodeAdd);

        return arrayNode;
    }


    /**
     * 获取数据带有管理员
     * @return 树结构
     */
    @RequestMapping(value = "/getOrgAndUserAddMananger", method = RequestMethod.GET)
    @ResponseBody
    public JSONArray getOrgAndUserAddMananger() {
        String customerId = CurrentLoginUser.getCustomerId();
        JSONArray arrayNode = new JSONArray();

        List<Organization> organizations = organizationService.getOrgByCustomer(customerId);

        List<String> bmdms = new ArrayList<>();

        List<User> users = new ArrayList<>();

        if (organizations.size() > 0) {
            for (Organization organization : organizations) {
                bmdms.add(organization.getCode());
            }
        }

        if (bmdms.size() > 0) {
            users = userService.getUsersByBmdm(customerId, bmdms);
        }

        Set<String> orgIds = organizations.stream().map(Organization::getId)
                .collect(Collectors.toSet());
        String dljgBm=CurrentLoginUser.getUser().getDljgBm();
        User mananger=userService.getMananger(dljgBm);
        //增加正在服务的客户信息
        JSONObject nodeWork = new JSONObject();
        nodeWork.put("id", "workCustomer");
        nodeWork.put("text", "正在服务客户");
        nodeWork.put("parent", "#");
        JSONObject stateObject1 = new JSONObject();
        stateObject1.put("opened", true);
        nodeWork.put("state", stateObject1);
        arrayNode.add(nodeWork);

        JSONObject node2 = new JSONObject();
        //若该员工属于该部门
        node2.put("parent", "workCustomer");
        node2.put("id", mananger.getId());
        node2.put("text", mananger.getName());
        node2.put("type", "people");
        node2.put("icon", mananger.getYgtx());
//            node2.put("BMDM", "0");
        //用户头像url
        JSONObject liAttr = new JSONObject();
        liAttr.put("userImg", mananger.getYgtx());
//            liAttr.put("BMDM", "0");
        liAttr.put("zydm", mananger.getZydm());
        liAttr.put("userText", mananger.getName());
        liAttr.put("BMBZ", "0"); //部门标志，判断是否为部门
        node2.put("li_attr", liAttr);
        arrayNode.add(node2);
        for (Organization org : organizations) {
            JSONObject node = new JSONObject();
            node.put("id", org.getId());
            node.put("text", org.getName());

//            JSONObject attr = new JSONObject();
//            attr.put("independent", org.getIndependent());
//            node.put("li_attr", attr);

            if (org.getParentId() != null && !org.getParentId().isEmpty()
                    && orgIds.contains(org.getParentId())) {
                node.put("parent", org.getParentId());
            } else {
                JSONObject stateObject = new JSONObject();
                stateObject.put("opened", true);
                node.put("parent", "workCustomer");
                node.put("state", stateObject);
            }

            arrayNode.add(node);
            for (User u :users) {
                JSONObject node3 = new JSONObject();
                if (u.getBmdm().equals(org.getCode())) {
                    //若该员工属于该部门
                    node3.put("parent", org.getId());
                    node3.put("id", u.getId());
                    node3.put("text", u.getName());
                    node3.put("type", "people");
                    node3.put("icon", u.getYgtx());
                    //用户头像url
                    JSONObject liAttr1 = new JSONObject();
                    liAttr1.put("userImg", "0");
                    liAttr1.put("zydm", u.getZydm());
                    liAttr1.put("userText", u.getName());
                    node3.put("li_attr", liAttr1);
                }
                arrayNode.add(node3);
            }
        }
        JSONObject nodeAdd = new JSONObject();
        nodeAdd.put("id", "stopCustomer");
        nodeAdd.put("text", "停止服务客户");
        nodeAdd.put("parent", "#");
        arrayNode.add(nodeAdd);

        return arrayNode;
    }




    /**
     * （客户列表树结构）获取数据通过数据权限
     * @return 树结构
     */
    @RequestMapping(value = "/orgAndUserAuth", method = RequestMethod.GET)
    @OperateLog(describe = "客户列表树")
    @ResponseBody
    public JSONArray getOrgAndUserAuth() {
        String customerId = CurrentLoginUser.getCustomerId();
        JSONArray arrayNode = new JSONArray();
        //默认查询全部部门信息（管理员用到的）
        List<Organization> organizations = organizationService.getOrgByCustomer(customerId);
        boolean if_contain = true; //部门权限是否包含当前员工的部门
        User user =  userService.getUserByZydm(CurrentLoginUser.getUser().getZydm());
        String oo = "";

        //增加正在服务的客户信息
        JSONObject nodeWork = new JSONObject();
        nodeWork.put("id", "workCustomer");
        nodeWork.put("text", "正在服务客户");
        nodeWork.put("parent", "#");
        JSONObject stateObject1 = new JSONObject();
        stateObject1.put("opened", true);
        nodeWork.put("state", stateObject1);
        arrayNode.add(nodeWork);

        if(!user.isIfManager()){ //若当前员工不为管理员
            if (user.getBmqxdm().equals("0")) { //员工具有个人权限
                /**
                 * 1.只查询该员工所在部门
                 * 2.查询该员工所在部门的所有上级部门
                 * 3.所有部门下只展示本人的数据
                 */
                String bmdm = user.getBmdm(); //该员工的部门代码
                String allParentString = organizationService.getParentList(bmdm); //获取该部门所有上级部门的部门编码
                List<String> allParentList = GetDate.StringToList(allParentString);
                organizations = organizationService.getOrginCode(allParentList); //查询到所有的部门信息
                //oo = organizationService.getOrgByUserCode(user.getBmdm());
                
                Set<String> orgIds = organizations.stream().map(Organization::getId).collect(Collectors.toSet());
                
//                //增加正在服务的客户信息
//                JSONObject nodeWork = new JSONObject();
//                nodeWork.put("id", "workCustomer");
//                nodeWork.put("text", "正在服务客户");
//                nodeWork.put("parent", "#");
//                JSONObject stateObject1 = new JSONObject();
//                stateObject1.put("opened", true);
//                nodeWork.put("state", stateObject1);
//                arrayNode.add(nodeWork);
                
                for (Organization org : organizations) {
                    JSONObject node = new JSONObject();
                    node.put("id", org.getId());
                    node.put("text", org.getName());
            
                    if (org.getParentId() != null && !org.getParentId().isEmpty()
                            && orgIds.contains(org.getParentId())) {
                        node.put("parent", org.getParentId());
                    } else {
                        JSONObject stateObject = new JSONObject();
                        stateObject.put("opened", true);
                        node.put("parent", "workCustomer");
                        node.put("state", stateObject);
                    }
                    JSONObject oliAttr = new JSONObject();
                    oliAttr.put("BMBZ", "1"); //部门标志，判断是否为部门
                    oliAttr.put("bmdm", org.getCode()); //部门编码
                    node.put("li_attr", oliAttr);
                    arrayNode.add(node);
                    
                    JSONObject node2 = new JSONObject();
                    if (bmdm.equals(org.getCode())) {
                        //若该员工属于该部门
                        node2.put("parent", org.getId());
                        node2.put("id", user.getId());
                        node2.put("text", user.getName());
                        node2.put("type", "people");
                        node2.put("icon", user.getYgtx());
                        //用户头像url
                        JSONObject liAttr = new JSONObject();
                        liAttr.put("userImg", "0");
                        liAttr.put("zydm", user.getZydm());
                        //liAttr.put("userText", user.getName());
                        liAttr.put("BMBZ", "0"); //部门标志，判断是否为部门
                        node2.put("li_attr", liAttr);
                    }
                    arrayNode.add(node2);
                    
                }
                JSONObject nodeAdd = new JSONObject();
                nodeAdd.put("id", "stopCustomer");
                nodeAdd.put("text", "停止服务客户");
                nodeAdd.put("parent", "#");
                arrayNode.add(nodeAdd);              
                return arrayNode;
            } else { //员工具有部门权限
                /**
                 * 1.查询该员工部门权限具有的部门
                 *  ①若权限部门包含员工当前所在部门，正常部门权限
                 *  ②若不包含，单独拿出员工个人权限添加到节点中
                 * 2.查询该员工所有部门的所有上级部门
                 * 3.所有部门下只展示该部门下的员工的相关信息
                 */
                List<String> userbmqxList = organizationMapper.getUserFromBmqx(user.getZydm());
                if (!userbmqxList.contains(user.getBmdm())) { //是否包含当前员工所在的部门
                    //不包含
                    //先把当前个人的添加到节点树上
                    String bmdm = user.getBmdm(); //该员工的部门代码
                    String allParentString = organizationService.getParentList(bmdm); //获取该部门所有上级部门的部门编码
                    List<String> allParentList = GetDate.StringToList(allParentString);
                    organizations = organizationService.getOrginCode(allParentList); //查询到所有的部门信息

                    Set<String> orgIds = organizations.stream().map(Organization::getId).collect(Collectors.toSet());

                    for (Organization org : organizations) {
                        JSONObject node = new JSONObject();
                        node.put("id", org.getId());
                        node.put("text", org.getName());

                        if (org.getParentId() != null && !org.getParentId().isEmpty()
                                && orgIds.contains(org.getParentId())) {
                            node.put("parent", org.getParentId());
                        } else {
                            JSONObject stateObject = new JSONObject();
                            stateObject.put("opened", true);
                            node.put("parent", "workCustomer");
                            node.put("state", stateObject);
                        }
                        JSONObject oliAttr = new JSONObject();
                        oliAttr.put("BMBZ", "1"); //部门标志，判断是否为部门
                        oliAttr.put("bmdm", org.getCode()); //部门编码
                        node.put("li_attr", oliAttr);
                        arrayNode.add(node);

                        JSONObject node2 = new JSONObject();
                        if (bmdm.equals(org.getCode())) {
                            //若该员工属于该部门
                            node2.put("parent", org.getId());
                            node2.put("id", user.getId());
                            node2.put("text", user.getName());
                            node2.put("type", "people");
                            node2.put("icon", user.getYgtx());
                            //用户头像url
                            JSONObject liAttr = new JSONObject();
                            liAttr.put("userImg", "0");
                            liAttr.put("zydm", user.getZydm());
                            //liAttr.put("userText", user.getName());
                            liAttr.put("BMBZ", "0"); //部门标志，判断是否为部门
                            node2.put("li_attr", liAttr);
                        }
                        arrayNode.add(node2);

                    }
                }

                for (int i = 0; i < userbmqxList.size() ; i++) { //遍历获取所有权限部门的所有上级部门的部门编码
                    String oo2 = organizationService.getParentList(userbmqxList.get(i));
                    oo += "," + oo2;
                }
            }
            List<String> bmdmList = GetDate.StringToList(oo);
            //去重
            Set<String> set = new  HashSet<String>(); 
            List<String> newList = new  ArrayList<String>(); 
            set.addAll(bmdmList);
            newList.addAll(set);
            //查询到所有的部门信息
            if(newList != null && newList.size() > 0) { //若出现user表中数据权限有值，但未插入到user_bmdm表中时，查询本人所在部门的所有数据
                organizations = organizationService.getOrginCode(newList); 
            } else {
                String bmdm = user.getBmdm(); //该员工的部门代码
                String allParentString = organizationService.getParentList(bmdm); //获取该部门所有上级部门的部门编码
                List<String> allParentList = GetDate.StringToList(allParentString);
                organizations = organizationService.getOrginCode(allParentList); //查询到所有的部门信息
            }
                       
        }
        
        List<String> bmdms = new ArrayList<>();
        List<User> users = new ArrayList<>();
        
        if (organizations.size() > 0) {
            for (Organization organization : organizations) {
                bmdms.add(organization.getCode());
            }
        }

        if (bmdms.size() > 0) {
            users = userService.getUsersByBmdm(customerId, bmdms);
        }

        Set<String> orgIds = organizations.stream().map(Organization::getId)
                .collect(Collectors.toSet());

        
        if(user.isIfManager()){ //若当前员工为管理员，则在正在服务的客户下增加管理员（与一级部门平级）
            JSONObject node2 = new JSONObject();
            //若该员工属于该部门
            node2.put("parent", "workCustomer");
            node2.put("id", user.getId());
            node2.put("text", user.getName());
            node2.put("type", "people");
            node2.put("icon", user.getYgtx());
//            node2.put("BMDM", "0");
            //用户头像url
            JSONObject liAttr = new JSONObject();
            liAttr.put("userImg", "0");
//            liAttr.put("BMDM", "0");
            liAttr.put("zydm", user.getZydm());
            //liAttr.put("userText", user.getName());
            liAttr.put("BMBZ", "0"); //部门标志，判断是否为部门
            node2.put("li_attr", liAttr);
            arrayNode.add(node2);
        }
        
        //其他按照部门权限增加部门与员工
        for (Organization org : organizations) {
            JSONObject node = new JSONObject();
            node.put("id", org.getId());
            node.put("text", org.getName());
    
            if (org.getParentId() != null && !org.getParentId().isEmpty()&& orgIds.contains(org.getParentId())) {
                node.put("parent", org.getParentId());
            } else {
                JSONObject stateObject = new JSONObject();
                stateObject.put("opened", false);
                node.put("parent", "workCustomer");
                node.put("state", stateObject);
            }
            JSONObject oliAttr = new JSONObject();
            oliAttr.put("BMBZ", "1"); //部门标志，判断是否为部门
            oliAttr.put("bmdm", org.getCode()); //部门编码
            node.put("li_attr", oliAttr);
            arrayNode.add(node);
            
            for (User u :users) {
                JSONObject node2 = new JSONObject();
                if (u.getBmdm().equals(org.getCode())) {
                    //若该员工属于该部门
                    node2.put("parent", org.getId());
                    node2.put("id", u.getId());
                    node2.put("text", u.getName());
                    node2.put("type", "people");
                    node2.put("icon", u.getYgtx());
                    //用户头像url
                    JSONObject liAttr = new JSONObject();
                    liAttr.put("userImg","0");
                    liAttr.put("zydm", u.getZydm());
                    //liAttr.put("userText", u.getName());
                    liAttr.put("BMBZ", "0"); //部门标志，判断是否为部门
                    node2.put("li_attr", liAttr);
                }
                arrayNode.add(node2);
            }
        }
        JSONObject nodeAdd = new JSONObject();
        nodeAdd.put("id", "stopCustomer");
        nodeAdd.put("text", "停止服务客户");
        nodeAdd.put("parent", "#");
        arrayNode.add(nodeAdd);

        return arrayNode;
    }

    /**
     * 代理部门管理界面获取数据方法
     * @param code
     * @return
     */
    @RequestMapping(value = "/org/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Organization getOrg(@PathVariable("id") String code) {
        Organization organization = organizationService.selectByCode(code);
        return organization == null ? new Organization() : organization;
    }
    
    /**
     * 平台部门管理界面获取数据方法
     * @param id
     * @return
     */
    @RequestMapping(value = "/PTorg/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Organization getPtOrg(@PathVariable("id") String id) {
        Organization organization = organizationService.getOrg(id);
        return organization == null ? new Organization() : organization;
    }
    
    /**
     * 代理部门管理界面删除数据方法
     * @param code
     * @return
     */
    @RequestMapping(value = "/org/{id}", method = RequestMethod.DELETE)
    @OperateLog(describe = "删除组织结构")
    @ResponseBody
    public JSONObject deleteOrg(@PathVariable("id") String code) {
        String customerId = CurrentLoginUser.getCustomerId();
        JSONObject result = new JSONObject();
        Nums nums = organizationMapper.getSomeNumUnderOrg(code, CurrentLoginUser.getUser().getDljgBm()); //查询子节点数目
        if (nums.getUserNum() > 0) { //存在员工
            result.put("msg", "请先移除本部门中的员工，客户，任务后再添加子部门！");
        } else if (nums.getKhNum() > 0) { //查询部门的客户数量情况
            result.put("msg", "请先移除本部门中的客户，任务信息后再添加子部门！");
        } else if (nums.getRwNum() > 0) { //查询部门的任务数量情况
            result.put("msg", "请先移除本部门中的任务信息后再添加子部门！");
        } else {
            //根据bmdm删除
            organizationService.deleteOrg(code);
            result.put("msg", "");
        }
        //根据部门代码，查出该部门下的员工数量
        //List<User> users = userService.getUsersByOrg(customerId, code);
        //根据部门编码，查出具有该部门权限的职员代码
        //List<String> zydms = organizationMapper.getZydmFromBmqx(code);

//        if (users.size() > 0) {
//            result.put("msg", "组织结构下存在用户，不能进行删除！");
//        } else if (zydms.size() > 0) {
//            result.put("msg", "该部门数据权限已经使用，请先删除员工的部门权限!");
//        } else {
//            //根据bmdm删除
//            organizationService.deleteOrg(code);
//            result.put("msg", "");
//        }

        return result;
    }
    
    /**
     * 平台部门管理界面删除数据方法
     * @param id id
     * @return
     */
    @RequestMapping(value = "/PTorg/{id}", method = RequestMethod.DELETE)
    @OperateLog(describe = "删除组织结构")
    @ResponseBody
    public JSONObject deletePtOrg(@PathVariable("id") String id) {
        String customerId = CurrentLoginUser.getCustomerId();
        Organization organization = organizationService.getOrg(id); //通过id查出组织信息
        //根据部门代码，查出该部门下的员工数量
        List<User> users = userService.getUsersByOrg(customerId, organization.getCode());
        //根据部门编码，查出具有该部门权限的职员代码
        //List<String> zydms = organizationMapper.getZydmFromBmqx(code);
        JSONObject result = new JSONObject();
        if (users.size() > 0) {
            result.put("msg", "组织结构下存在用户，不能进行删除！");
        } else {
            //根据bmdm删除
            organizationService.deleteOrg(organization.getCode());
            result.put("msg", "");
        }
        return result;
    }

    /**
     * 增加组织结构
     * @param org 页面传来的实体类
     * @return 返回树节点
     */
    @RequestMapping(value = "/org", method = RequestMethod.POST)
    @OperateLog(describe = "添加组织结构")
    @ResponseBody
    public JSONObject addOrg(@RequestBody Organization org) {
        String customerId = CurrentLoginUser.getCustomerId();
        // 获取当前用户信息
        User user = CurrentLoginUser.getUser();
        String dljgBm = user.getDljgBm();
        // 通过customerId和部门名称查询是否已存在
        boolean hasOrgExist = organizationService.hasOrgCodeExist(org.getName(), customerId);
        JSONObject object = new JSONObject();
        if (hasOrgExist) {
            object.put("errmsg", "组织已经存在！");
        } else {
            // 为当前公司下的一级组织目录
            if (org.getParent_code().length() == 6) { //增加第一级部门
                org.setParent_code(user.getBmdm().substring(0, 6)); //父节点为当前代理机构
                // 1.查询出该组织在当前公司下的所有一级组织中的排序
//                order = organizationService.getMaxOrder(customerId, oo.getId());
//                order++;
            } else {
                /**
                 * 1.先判断当前父节点是否为最后一级
                 * 2.最后一级组织需先检测是否存在员工
                 * 3.若员工存在，需先提示移除员工后继续增加
                 */
                int sonNum = organizationMapper.getSonNum(org.getParent_code(), dljgBm); //查询子节点数目
                if (sonNum == 0) { //不存在，代表当前就是最后一级
                    //查询该部门下是否存在用户
                    Nums nums = organizationMapper.getSomeNumUnderOrg(org.getParent_code(), dljgBm); //查询子节点数目
                    if (nums.getUserNum() > 0) { //存在员工
                        object.put("errmsg", "请先移除本部门中的员工后再添加子部门！");
                        return object;
                    }
//                    else if (nums.getKhNum() > 0) { //查询部门的客户数量情况
//                        object.put("errmsg", "请先移除本部门中的客户，任务信息后再添加子部门！");
//                        return object;
//                    } else if (nums.getRwNum() > 0) { //查询部门的任务数量情况
//                        object.put("errmsg", "请先移除本部门中的任务信息后再添加子部门！");
//                        return object;
//                    }
                }
            }

            //根据当前部门的父节点code和代理机构编码，查询出新增加的部门的bmdm
            String dm = organizationMapper.getMaxBmdm(org.getParent_code(), dljgBm);
            if (dm == null || dm.equals("")) { //若下方不存在子节点
                dm = org.getParent_code() + "_001";
            }
            org.setCode(dm);
            Organization oo = organizationService.selectByCode(org.getParent_code()); //根据code查出id
            org.setParentId(oo.getId()); //父节点id
            org.setNsrsbh(user.getNsrsbh()); //纳税人识别号
            org.setDljgBm(user.getDljgBm()); //代理机构编码
            int order = organizationService.getMaxOrder(dljgBm); //获取新的order
            org.setOrderNo(order);
            String orgId = organizationService.addOrg(customerId, org);
            object.put("id", dm);
        }

        return object;
    }
    
    /**
     * 平台增加组织结构
     * @param org 页面传来的实体类
     * @return 返回树节点
     */
    @RequestMapping(value = "/PTorg", method = RequestMethod.POST)
    @OperateLog(describe = "添加组织结构")
    @ResponseBody
    public JSONObject addPtOrg(@RequestBody Organization org) {
        String customerId = CurrentLoginUser.getCustomerId();
        // 获取当前用户信息
        User user = CurrentLoginUser.getUser();
        String dljgBm = user.getDljgBm();
        // 通过customerId和部门名称查询是否已存在
        boolean hasOrgExist = organizationService.hasOrgCodeExist(org.getName(), customerId);
        JSONObject object = new JSONObject();
        if (hasOrgExist) {
            object.put("errmsg", "组织已经存在！");
        } else {
            // 为当前公司下的一级组织目录
            if (org.getParentId().equals("#")) { //增加第一级部门 
                Organization oo = organizationService.selectByCode(user.getBmdm().substring(0, 6)); //根据code查出id
                org.setParentId(oo.getId()); //父节点
                org.setParent_code(user.getBmdm().substring(0, 6)); //父节点为当前代理机构
            } 
            /**
             * 1.先判断当前父节点是否为最后一级
             * 2.最后一级组织需先检测是否存在员工
             * 3.若员工存在，需先提示移除员工后继续增加
             */
            Organization organization = organizationService.getOrg(org.getParentId()); //通过id查出组织信息(新增节点的父节点信息)
            int sonNum = organizationMapper.getSonNum(organization.getCode(), dljgBm); //查询子节点数目
            if (sonNum == 0) { //不存在，代表当前就是最后一级
                //查询该部门下是否存在用户
                Nums nums = organizationMapper.getSomeNumUnderOrg(organization.getCode(), dljgBm); //查询子节点数目
                if (nums.getUserNum() > 0) { //存在员工
                    object.put("errmsg", "请先移除本部门中的员工后再添加子部门！");
                    return object;
                }
            }
            
            //根据当前部门的父节点code和代理机构编码，查询出新增加的部门的bmdm
            String dm = organizationMapper.getMaxBmdm(organization.getCode(), dljgBm);
            if (dm == null || dm.equals("")) { //若下方不存在子节点
                dm = organization.getCode() + "_001";
            }
            if (org.getParent_code() == null) {
                org.setParent_code(organization.getCode());
            }
            org.setCode(dm);
            org.setParentId(organization.getId()); //父节点id
            org.setNsrsbh(user.getNsrsbh()); //纳税人识别号
            org.setDljgBm(user.getDljgBm()); //代理机构编码
            int order = organizationService.getMaxOrder(dljgBm); //获取新的order
            org.setOrderNo(order);
            String orgId = organizationService.addOrg(customerId, org);
            object.put("id", orgId);
        }

        return object;
    }
    
    /**
     * 从添加修改用户界面增加组织结构
     * @param org 页面传来的实体类
     * @return 返回树节点
     */
    @RequestMapping(value = "/userAddOrg", method = RequestMethod.POST)
    @OperateLog(describe = "添加组织结构")
    @ResponseBody
    public JSONObject userAddOrg(@RequestBody Organization org) {
        String customerId = CurrentLoginUser.getCustomerId();
        // 获取当前用户信息
        User user = CurrentLoginUser.getUser();
        String dljgBm = user.getDljgBm();
        // 通过customerId和部门名称查询是否已存在
        boolean hasOrgExist = organizationService.hasOrgCodeExist(org.getName(), customerId);
        JSONObject object = new JSONObject();
        if (hasOrgExist) {
            object.put("errmsg", "组织已经存在！");
        } else { //默认增加的都是一级部门，父节点为当前代理机构
            org.setParent_code(user.getBmdm().substring(0, 6)); //父节点为当前代理机构
            String dm = organizationMapper.getMaxBmdm(org.getParent_code(), dljgBm);
            if (dm == null || dm.equals("")) { //若下方不存在子节点
                dm = org.getParent_code() + "_001";
            }
            org.setCode(dm);
            Organization oo = organizationService.selectByCode(org.getParent_code()); //根据code查出id
            org.setParentId(oo.getId()); //父节点id
            org.setNsrsbh(user.getNsrsbh()); //纳税人识别号
            org.setDljgBm(user.getDljgBm()); //代理机构编码
            int order = organizationService.getMaxOrder(dljgBm); //获取新的order
            org.setOrderNo(order);
            String orgId = organizationService.addOrg(customerId, org);
        }
        object.put("success", true);
        return object;
    }
    

    /**
     * 根据用户信息，生成新的部门代码
     * @param order 传入的当前排序
     * @param bmdm 传入的当前代理公司的bmdm
     * @return String 返回生成的部门代码
     */
    private String getBmdm(int order, String bmdm) {
        if (order < TEN) {
            return bmdm + "_00" + order;
        } else if (order < HUNDRED) {
            return bmdm + "_0" + order;
        } else {
            return bmdm + "_" + order;
        }
    }

    /**
     * 根据当前选中的节点id更新节点内容(代理)
     * @param code bmdm
     * @param ifChange 名称是否改变
     * @param org 更新内容
     * @return 树节点
     */
    @RequestMapping(value = "/org/{id}/{ifChange}", method = RequestMethod.PUT)
    @OperateLog(describe = "更新组织结构")
    @ResponseBody
    public JSONObject updateOrg(@PathVariable("id") String code, @PathVariable("ifChange") int ifChange, @RequestBody Organization org) {
        JSONObject object = new JSONObject();
        if (ifChange == 1) { //名称改变，需校验名称是否重复
            boolean hasOrgExist = organizationService.hasOrgCodeExist(org.getName(), CurrentLoginUser.getCustomerId());
            if (hasOrgExist) {
                object.put("errmsg", "组织已经存在！");
                return object;
            } else {
                //批量更新部门名称
                organizationMapper.changName(code, org.getName());
            }
        }
        organizationService.updateOrg(code, org);
        object.put("id", code);
        return object;
    }
    
    /**
     * 根据当前选中的节点id更新节点内容(平台)
     * @param id orgid
     * @param org 更新内容
     * @return 树节点
     */
    @RequestMapping(value = "/PTorg/{id}/{ifChange}", method = RequestMethod.PUT)
    @OperateLog(describe = "更新组织结构")
    @ResponseBody
    public JSONObject updatePtOrg(@PathVariable("id") String id, @PathVariable("ifChange") int ifChange, @RequestBody Organization org) {
        JSONObject object = new JSONObject();
        if (ifChange == 1) { //名称改变，需校验名称是否重复
            boolean hasOrgExist = organizationService.hasOrgCodeExist(org.getName(), CurrentLoginUser.getCustomerId());
            if (hasOrgExist) {
                object.put("errmsg", "组织已经存在！");
                return object;
            }
        }
        Organization organization = organizationService.getOrg(id); //根据id获得信息
        organizationService.updateOrg(organization.getCode(), org);
        object.put("id", id);
        return object;
    }

    @RequestMapping(value = "/orgauth/{id}", method = RequestMethod.GET)
    @ResponseBody
    public List<String> getOrgAuth(@PathVariable("id") String id) {
        return organizationService.getOrgAuth(id);
    }

    @RequestMapping(value = "/orgauth/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public void getOrgAuth(@PathVariable("id") String id,
            @RequestBody List<String> resourceIds) {
        organizationService.setOrgAuth(id, resourceIds);
    }

    @RequestMapping(value = "/orgtype", method = RequestMethod.GET)
    @ResponseBody
    public List<OrganizationType> getOrgType() {
        return organizationService.getOrgType();
    }

    /**
     * 原版jstree
     * @return jsonArray
     */
    @RequestMapping(value = "/jstreeOrg", method = RequestMethod.GET)
    @ResponseBody
    public JSONArray jstreeOrg() {
        String customerId = CurrentLoginUser.getCustomerId();
        JSONArray arrayNode = new JSONArray();
        //默认查询全部部门信息（管理员用到的）
        List<Organization> organizations = organizationService.getOrgByCustomer(customerId);

        List<String> bmdms = new ArrayList<>();

        List<User> users = new ArrayList<>();

        if (organizations.size() > 0) {
            for (Organization organization : organizations) {
                bmdms.add(organization.getCode());
            }
        }
        if (bmdms.size() > 0) {
            users = userService.getUsersByBmdm(customerId, bmdms);
        }

        Set<String> orgIds = organizations.stream().map(Organization::getId)
                .collect(Collectors.toSet());


        //增加正在服务的客户信息
        JSONObject nodeWork = new JSONObject();
        nodeWork.put("id", "workCustomer");
        nodeWork.put("text", "正在服务客户");
        nodeWork.put("parent", "#");
        JSONObject stateObject1 = new JSONObject();
        stateObject1.put("opened", true);
        nodeWork.put("state", stateObject1);
        arrayNode.add(nodeWork);

        for (Organization org : organizations) {
            JSONObject node = new JSONObject();
            node.put("id", org.getId());
            node.put("text", org.getName());

            if (org.getParentId() != null && !org.getParentId().isEmpty()
                    && orgIds.contains(org.getParentId())) {
                node.put("parent", org.getParentId());
            } else {
                JSONObject stateObject = new JSONObject();
                stateObject.put("opened", true);
                node.put("parent", "workCustomer");
                node.put("state", stateObject);
            }

            arrayNode.add(node);
            for (User u :users) {
                JSONObject node2 = new JSONObject();
                if (u.getBmdm().equals(org.getCode())) {
                    //员工属于该部门
                    node2.put("parent", org.getId());
                    node2.put("id", u.getId());
                    node2.put("text", "");
                    node2.put("type", "people");
                    //员工头像
                    JSONObject liAttr = new JSONObject();
                    liAttr.put("userImg", u.getYgtx());
                    liAttr.put("zydm", u.getZydm());
                    liAttr.put("userText", u.getName());
                    node2.put("li_attr", liAttr);
                }
                arrayNode.add(node2);
            }
        }
        JSONObject nodeAdd = new JSONObject();
        nodeAdd.put("id", "stopCustomer");
        nodeAdd.put("text", "停止服务客户");
        nodeAdd.put("parent", "#");
        arrayNode.add(nodeAdd);

        return arrayNode;
    }
}
