package com.xinhai.rolemanager.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.utils.GetDate;
import com.xinhai.resourcemanager.entity.Resource;
import com.xinhai.rolemanager.controller.exception.RoleHasExistException;
import com.xinhai.rolemanager.dao.PtRoleMapper;
import com.xinhai.rolemanager.dao.RoleMapper;
import com.xinhai.rolemanager.entity.PtRole;
import com.xinhai.rolemanager.entity.Role;
import com.xinhai.rolemanager.service.RoleService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import com.xinhai.usermanager.service.UserService;

import org.apache.commons.lang.StringUtils;
import org.aspectj.weaver.loadtime.definition.Definition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by fanxi on 2016-5-3.
 */
@Controller
@RequestMapping(value = "/roles")
public class RoleController {
  @Autowired
  private RoleService roleService;
  
  @Autowired
  private RoleMapper roleMapper;

  @Autowired
  private UserService userService;

  @Autowired
  private PtRoleMapper PtRoleMapper;

  /**
   * 获取所有的系统角色
   * @return 所有系统角色
   */
  @RequestMapping(value = "/role", method = RequestMethod.GET)
  @ResponseBody
  public List<Role> getRoles() {
    String roleCustomerId = CurrentLoginUser.getCustomerId();
    List<Role> list = roleService.getRolesByJsbz(roleCustomerId, "001");
    return list;
  }
  
  /**
   * 获取数据
   * @return 树结构
   */
  @RequestMapping(value = "/roleTree", method = RequestMethod.GET)
  @ResponseBody
  public JSONArray getRoleTree() {
      String customerId = CurrentLoginUser.getCustomerId();
      JSONArray arrayNode = new JSONArray();
      List<Role> XTroles = roleService.getRolesByJsbz(customerId, "001");
      //List<Role> YWroles = roleService.getRolesByJsbz(customerId, "002");
      
      JSONObject node1 = new JSONObject();
      node1.put("id", "xtjs");
      node1.put("text", "系统角色");
      
//      JSONObject node2 = new JSONObject();
//      node2.put("id", "ywjs");
//      node2.put("text", "业务角色");
      
      JSONObject stateObject = new JSONObject();
      stateObject.put("opened", true);
      node1.put("parent", "#");
      node1.put("state", stateObject);
//      node2.put("parent", "#");
//      node2.put("state", stateObject);
      arrayNode.add(node1);
//      arrayNode.add(node2);
      
      for (Role role : XTroles) {
          JSONObject node = new JSONObject();
          node.put("id", role.getJsdm());
          node.put("text", role.getName());
          node.put("type", "file");
          
          JSONObject attr = new JSONObject();
          attr.put("uuid", role.getId());
          node.put("li_attr", attr);
          node.put("parent", "xtjs");

          arrayNode.add(node);
      }
      
//      for (Role role : YWroles) {
//          JSONObject node = new JSONObject();
//          node.put("id", role.getJsdm());
//          node.put("text", role.getName());
//          node.put("type", "file");
//          
//          JSONObject attr = new JSONObject();
//          attr.put("uuid", role.getId());
//          node.put("li_attr", attr);
//          node.put("parent", "ywjs");
//    
//          arrayNode.add(node);
//      }

      return arrayNode;
  }

  @RequestMapping(value = "/role/{id}", method = RequestMethod.GET)
  @ResponseBody
  public Role getRole(@PathVariable("id") String id) {
    Role role = roleService.getRole(id);
    return role == null ? new Role() : role;
  }
  
  /**
   * 根据角色代码查询出数据
   * @param jsdm 角色代码
   * @return 查出数据
   */
  @RequestMapping(value = "/getRoleByJsdm", method = RequestMethod.GET)
  @ResponseBody
  public Role getRoleByJsdm(@RequestParam String jsdm) {
    Role role = roleService.getRoleByJsdm(jsdm);
    return role == null ? new Role() : role;
  }
  

  @RequestMapping(value = "/role", method = RequestMethod.POST)
  @OperateLog(describe = "添加角色")
  @ResponseBody
  public JSONObject addRole(@RequestBody Role role) throws ParseException {
    JSONObject returnData = new JSONObject();
    String customerId = CurrentLoginUser.getCustomerId();
    //当前用户信息
    User user = CurrentLoginUser.getUser();
    //如果同一个用户已经创建name相同的role，报异常
    if (roleService.roleHasExist(customerId, role.getName())) {
        returnData.put("success", false);
        returnData.put("message", "角色已存在！");
        return returnData;
    }

    role.setCustomerId(customerId);
    role.setNsrsbh(user.getNsrsbh()); //纳税人识别号
    role.setDljgBm(user.getDljgBm()); //代理机构编码
    role.setCreateDate(GetDate.getCurrentDate()); //获取当前日期
    role.setJsbz("001");
    roleService.addRole(role);
    Role rr = roleService.getNew(customerId,"001");
    roleMapper.setDefaultAuth(rr.getId(), "6ca1b01e-ca58-4a6e-a6f4-f79559824c7e"); //默认插入一条欢迎页数据
    returnData.put("success", true);
    returnData.put("jsdm", rr.getJsdm());
    returnData.put("name", rr.getName());
    returnData.put("id", rr.getId());
    return returnData;
  }

  @RequestMapping(value = "/role/{id}", method = RequestMethod.PUT)
  @OperateLog(describe = "修改角色")
  @ResponseBody
  public boolean updateRole(@PathVariable("id") String id, @RequestBody Role role) {
    roleService.updateRole(id, role);
    return true;
  }
  
  /**
   * 
   * @param jsdm
   * @param ifFirst
   * @param role
   * @return
   */
  @RequestMapping(value = "/updateRoleByJsdm", method = RequestMethod.PUT)
  @OperateLog(describe = "修改角色")
  @ResponseBody
  public JSONObject updateRoleByJsdm(@RequestParam String jsdm, @RequestParam boolean ifFirst, @RequestBody Role role) {
      JSONObject returnData = new JSONObject();
      if (!ifFirst) { //若名称不相同，需判断是否重名
          String customerId = CurrentLoginUser.getCustomerId();
          //如果同一个用户已经创建name相同的role，报异常
          if (roleService.roleHasExist(customerId, role.getName())) {
              returnData.put("success", false);
              returnData.put("message", "角色已存在！");
              return returnData;
          } else { //不存在，则将全部派工管理中的角色名称修改
              //roleMapper.updatePgglRole(role.getName(), jsdm);
          }
      }
    roleService.updateRoleByJsdm(jsdm, role);    
    Role rr = roleService.getRoleByJsdm(jsdm);
    returnData.put("success", true);
    returnData.put("jsdm", rr.getJsdm());
    returnData.put("name", rr.getName());
    returnData.put("id", rr.getId());
    return returnData;
  }

  /**
   * 删除角色
   * @param jsdm 删除的角色id
   * @return 是否删除成功
   */
  @RequestMapping(value = "/role/{id}", method = RequestMethod.DELETE)
  @OperateLog(describe = "删除角色")
  @ResponseBody
  public JSONObject deleteRole(@PathVariable("id") String jsdm) {
      JSONObject returnData = new JSONObject();
      Role role = roleService.getRoleByJsdm(jsdm);
      if (role != null) {
        //先检查该角色对应的用户是否存在，若存在，则不可删除
          List<String> list = roleService.selectUserrole(role.getId());
          if(list.size() > 0 && list != null){
              //有user数据，查询user是否被删除
              int i = userService.getUsersByIds(list);
              if( i == 0 ){ //代表没有用户在用此角色
                  roleService.deleteRole(role.getId());
                  returnData.put("success", true);
              }else{
                  returnData.put("success", false);
                  returnData.put("message", "该角色尚在使用中，不能进行删除操作！");
              }  
          }else{
              //该角色无对应用户
              roleService.deleteRole(role.getId());
              returnData.put("success", true);
          }
      }     
    return returnData;
  }

  @RequestMapping(value = "/roleauth/{id}", method = RequestMethod.PUT)
  @OperateLog(describe = "设置角色功能权限")
  @ResponseBody
  public void setRoleAuth(@PathVariable("id") String id, @RequestBody List<String> resourceIds) {
    roleService.setRoleAuth(id, resourceIds, "001");
  }
  
  @RequestMapping(value = "/setCustomerXTAuth/{id}", method = RequestMethod.POST)
  @OperateLog(describe = "代理机构设置系统角色功能权限")
  @ResponseBody
  public JSONObject setCustomerXTAuth(@PathVariable("id") String id, @RequestBody JSONObject json) {
      List<String> list = new ArrayList<String>();
      //roleMapper.getRoleAuth("ce625b28-c5bc-4fed-af11-81afc8954f55"); //初始角色的所有资源id,所有角色都得有
      list.add("6ca1b01e-ca58-4a6e-a6f4-f79559824c7e"); //欢迎页
      list.add("2c713032-4afd-4b76-aa50-429cc9d21261"); //系统公告
      list.add("1759d70e-4b52-11e7-a919-92ebcb67fe33"); //系统管理
      list.add("b9df8b20-1fd0-426a-b35a-8f6f9a102799"); //消息提醒
      list.add("41e47056-b70f-4895-a7de-d41591f5ed60"); //通讯录
      list.add("0984cd89-23ea-4bd0-9d6c-85221a251c9a"); //新手入门
      JSONArray auth = json.getJSONArray("auth");
      for (Object a : auth) {
          JSONObject o = (JSONObject) a;
          if (o.getString("auth").equals("7025a486-4970-4911-a2a9-90a44a3b1623")) { //具有合同审核页面时
                list.add("7025a486-4970-4911-a2a9-90a44a3b1623"); //首页跳转按钮
                list.add("7c2fda95-f57c-4393-b8de-381f36268d6b"); //首页跳转按钮
            continue;
          }

          //具有代账客户或一次性业务权限时，客户列表被选中
          if (o.getString("auth").equals("2327c868-34d2-4107-92f2-7fc5f94d8738") || o.getString("auth").equals("3c852e9f-3604-4e35-98ca-78fb16677942")) {
              list.add("ddcc3cba-032d-4a25-811e-a68be21dbd1a"); //客户列表菜单
              continue;
          }
//          else if (o.getString("auth").equals("xtSftjShow")) { //收费统计查看
//              list.add("04880a4c-24a0-41d5-8809-8a40de7b6fcc"); //收费统计
//              list.add("c904c3ae-561a-4a82-a80d-30972a103074"); //图表
//              continue;
//          } else if (o.getString("auth").equals("xtQftjShow")) { //欠费统计查看
//              list.add("15793de0-72bb-44ac-a556-8f6b9c2cce43"); //欠费统计
//              list.add("2082e15b-d6d5-458c-a55f-5914adccaca0"); //图表
//              continue;
//          }
//          else if (o.getString("auth").equals("xtPgtjAll")) { //派工统计全部
//              list.add("f10803c6-01e8-458f-8580-499605d1d4b9"); //派工统计
//              list.add("c85877cb-6056-41fe-b6cb-d8c6c2eb844b"); //图表
//              list.add("67dcb69e-0039-4b5e-a3be-03a2f12e969e"); //按钮
//              continue;
//          } else if (o.getString("auth").equals("xtPgtjShow")) { //派工统计查看
//              list.add("f10803c6-01e8-458f-8580-499605d1d4b9"); //派工统计
//              list.add("c85877cb-6056-41fe-b6cb-d8c6c2eb844b"); //图表
//              continue;
//          } else if (o.getString("auth").equals("xtXtggAdd")) { //系统公告新增
//              list.add("2c713032-4afd-4b76-aa50-429cc9d21261"); //系统公告
//              list.add("55d7da64-514e-498a-b133-b079baafc2fa"); //新增按钮
//              continue;
//          } else if (o.getString("auth").equals("xtXtggDel")) { //系统公告删除
//              list.add("2c713032-4afd-4b76-aa50-429cc9d21261"); //系统公告
//              list.add("b88915f2-eb3d-459a-9a25-ee4d850bd121"); //删除按钮
//              continue;
//          }
          list.add(o.getString("auth")); //所有的resourceId
      }
      
      //去重
      Set set = new  HashSet(); 
      List newList = new  ArrayList(); 
      set.addAll(list);
      newList.addAll(set);
    roleService.setRoleAuth(id, newList, "001");
    JSONObject ob = new JSONObject();
    ob.put("success", true);
    return ob;
    
  }

  @RequestMapping(value = "/getCustomerRoleAuth/{id}", method = RequestMethod.GET)
  @ResponseBody
  public List<String> getCustomerRoleAuth(@PathVariable("id") String id) {
      List<String> list = roleMapper.getCustomerRoleAuth(id, "001");
      
//      List<String> newList = new ArrayList<String>();
//
//      //系统角色
//
//      for (Iterator<String> it = list.iterator(); it.hasNext();) {
//          String val = it.next();
//
//          if (val.equals("15793de0-72bb-44ac-a556-8f6b9c2cce43")) { //欠费统计界面
//              String s = "xtQftjShow";
//              newList.add(s);
//          }
//          if (val.equals("04880a4c-24a0-41d5-8809-8a40de7b6fcc")) { //收费统计界面
//              String s = "xtSftjShow";
//              newList.add(s);
//          }
//      }
//
//      for (Iterator<String> it = list.iterator(); it.hasNext();) {
//          String val = it.next();
//          if (val.equals("04880a4c-24a0-41d5-8809-8a40de7b6fcc") || val.equals("c904c3ae-561a-4a82-a80d-30972a103074")) { //收费统计界面及图表
//              it.remove();
//          }
//          if (val.equals("15793de0-72bb-44ac-a556-8f6b9c2cce43") || val.equals("2082e15b-d6d5-458c-a55f-5914adccaca0")) { //欠费统计界面及图表
//              it.remove();
//          }
//      }
//
//      list.addAll(newList);
  
    return list;
  }
  
  @RequestMapping(value = "/roleauth/{id}", method = RequestMethod.GET)
  @ResponseBody
  public List<String> getRoleAuth(@PathVariable("id") String id) {
    return roleMapper.getCustomerRoleAuth(id, "001");
  }

  @RequestMapping(value = "/setroleusers/{roleId}", method = RequestMethod.PUT)
  @OperateLog(describe = "设置角色包含的用户")
  @ResponseBody
  public boolean setRoleUsers(
          @PathVariable("roleId") String roleId,
          @RequestBody String[] userIds) {

    List<String> ids = Arrays.asList(userIds);
    
    return roleService.setRoleUsers(roleId, ids);
  }

  @RequestMapping(value = "/getroleuser/{roleId}", method = RequestMethod.GET)
  @ResponseBody
  public List<User> getRoleUser(@PathVariable("roleId") String roleId) {
    return userService.getUsersByRoleId(roleId);
  }


    /**
     * @Description: 根据类型，查询菜单
     * @Param: [type]
     * @return: java.util.List<com.xinhai.resourcemanager.entity.Resource>
     * @Author: Mr.Li
     * @Date: 2018/3/24 0024
     */
    @RequestMapping(value = "/getParentMenus/{type}", method = RequestMethod.GET)
    @ResponseBody
    public List<Resource> getParentMenus(@PathVariable("type") String type) {
      return null;
    }

    @RequestMapping(value = "/insertMenu", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject insertMenu(@RequestBody PtRole role){
        //先查询同级所有，再进行编码
        String fldm = role.getFldm(); //分类代码
        JSONObject obj = new JSONObject();
        if (fldm.equals("2")) { // 菜单级别
            //查询改上级部门下的代码最大值
            String dm = PtRoleMapper.getSonMenuDm(role.getSjdm());
            role.setDm(dm);
        } else if (fldm.equals("3")) { //按钮级别
            //查询改上级部门下的代码最大值
            String dm = PtRoleMapper.getBtnMenuDm(role.getSjdm());
            role.setDm(dm);
        } else{ //模块级别
            //得到最新的模块代码
            String dm = PtRoleMapper.getPMenuDm();
            role.setDm(dm);
            role.setSjdm("0");
        }
        role.setLrry(CurrentLoginUser.getUser().getZydm());
        PtRoleMapper.insert(role);
        obj.put("success",true);
        return obj;
    }


    /**
     * @Description: 根据代码查询上级菜单
     * @Param: [role]
     * @return: java.util.List<com.xinhai.rolemanager.entity.PtRole>
     * @Author: Mr.Li
     * @Date: 2018/3/26 0026
     */
    @RequestMapping(value = "/getPMenu/{sjdm}", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject getPMenu(@PathVariable("sjdm") String sjdm){
        JSONObject obj = new JSONObject();
        List<PtRole> list = PtRoleMapper.getPMenu(sjdm);
        obj.put("success",true);
        obj.put("data",list);
        return obj;
    }

    /**
     * @Description: 获取全部菜单选项
     * @Param: []
     * @return: java.util.List<com.xinhai.rolemanager.entity.PtRole>
     * @Author: Mr.Li
     * @Date: 2018/3/28 0028
     */
    @RequestMapping(value = "/getAllMenu", method = RequestMethod.GET)
    @ResponseBody
    public List<PtRole> getAllMenu(){
        List<PtRole> list = PtRoleMapper.findAll();
        return list;
    }

}
