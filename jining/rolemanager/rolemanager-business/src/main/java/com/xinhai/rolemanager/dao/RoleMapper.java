package com.xinhai.rolemanager.dao;

import com.xinhai.rolemanager.entity.Role;

import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by fanxi on 2016-4-28.
 */
public interface RoleMapper {
  Role getRole(String id);
  
  /**
   * 获取角色信息
   * @param jsdm 角色代码
   * @return 角色信息
   */
  Role getRoleByJsdm(String jsdm);

  List<Role> getRoles(@Param("customerId") String customerId);

  List<Role> getRolesByJsbz(@Param("customerId") String customerId ,@Param("jsbz") String jsbz);
  
  /**
   * 查出最新的角色信息
   * @param customerId 代理记账公司的id
   * @param jsbz 角色标志
   * @return 查询结果
   */
  Role getNew(@Param("customerId") String customerId ,@Param("jsbz") String jsbz);
  
  void deleteRole(String id);
  
  /**
   * 更新角色信息
   * @param jsdm 角色代码
   * @param role 角色信息
   */
  void updateRoleByJsdm(@Param("jsdm") String jsdm, @Param("role") Role role);

  void updateRole(@Param("id") String id, @Param("role") Role role);

  void addRole(Role role);

  Integer roleHasExist(@Param("customerId") String customerId, @Param("name") String name);

  void deleteRoleAuth(@Param("id") String id);
  
  void deleteRoleAuthWithJsbz(@Param("id") String id, @Param("jsbz") String jsbz);

  void setRoleAuth(@Param("id") String id, @Param("authIds") List<String> authIds, @Param("jsbz") String jsbz);

  List<String> getRoleAuth(String id);
  
  /**
   * 通过名称查找role
   * @param name
   * @return
   */
  Role getRoleByName(String name);

  //插入前的删除
  void deleteRoleUser(@Param("roleId") String roleId, @Param("userIds") List<String> userIds);

  void setRoleUsers(@Param("roleId") String roleId, @Param("userIds") List<String> userIds);
  
  /**
   * 对一个客户授角色
   * @param roleId
   * @param userId
   */
  void setRoleUser(@Param("roleId") String roleId, @Param("userId") String userId);
  
  /**
   * 根据角色id查询对应的user_id
   * @param id
   * @return user_id
   */
  List<String> selectUserrole(@Param("id") String id);
  
  /**
   * 
   * @param id role_id
   * @param jsbz 角色分类
   * @return List 集合
   */
  List<String> getCustomerRoleAuth(@Param("id") String id , @Param("jsbz") String jsbz);
  
  /**
   * 根据customerId创建对应角色
   * @param customerId 代理记账公司的id
   */
  void createRole(String customerId);
  
  /**
   * 根据customerId删除对应信息
   * @param customerId 用户id
   */
  void DelRole(String customerId);
  
  /**
   * 设置默认角色权限（欢迎页）
   * @param role_id
   * @param authId
   */
  void setDefaultAuth(@Param("role_id") String role_id, @Param("authId") String authId);
  
  /**
   * 更新派工管理中的派工角色名称
   * @param name
   * @param jsdm
   */
  void updatePgglRole(@Param("name") String name, @Param("jsdm") String jsdm);
}
