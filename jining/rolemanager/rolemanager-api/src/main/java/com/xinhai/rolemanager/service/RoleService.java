package com.xinhai.rolemanager.service;

import com.xinhai.rolemanager.entity.Role;

import java.util.List;

/**
 * Created by fanxi on 2016-4-28.
 */
public interface RoleService {
	/**
	 * 获取角色信息
	 * @param id 角色主键
	 * @return 角色信息
	 */
	Role getRole(String id);
	
	/**
     * 获取角色信息
     * @param jsdm 角色代码
     * @return 角色信息
     */
    Role getRoleByJsdm(String jsdm);

	/**
	 * lmf
	 * 获取客户下所有角色
	 * @param customerId 客户主键
	 * @return 角色信息
	 */
	List<Role> getRolesByJsbz(String customerId, String jsbz);
	
	/**
     * lmf
     * 获取客户下所有角色
     * @param customerId 客户主键
     * @return 角色信息
     */
    List<Role> getRoles(String customerId);

	/**
	 * 删除角色
	 * @param id 角色主键
	 */
	void deleteRole(String id);

	/**
	 * 更新角色信息
	 * @param id 角色主键
	 * @param role 角色信息
	 */
	void updateRole(String id, Role role);

	/**
     * 更新角色信息
     * @param jsdm 角色代码
     * @param role 角色信息
     */
    void updateRoleByJsdm(String jsdm, Role role);
    
    /**
     * 查出最新的角色信息
     * @param customerId 代理记账公司的id
     * @param jsbz 角色标志
     * @return 查询结果
     */
    Role getNew(String customerId ,String jsbz);
	
	/**
	 * 添加角色
	 * @param role 角色信息
	 */
	void addRole(Role role);

	/**
	 * 判断角色是否存在
	 * @param customerId 客户主键
	 * @param name 角色名称
	 * @return 是否存在
	 */
	boolean roleHasExist(String customerId, String name);

	/**
	 * 设置角色权限
	 * @param id 角色主键
	 * @param authIds 权限信息
	 */
	void setRoleAuth(String id, List<String> authIds, String jsbz);

	/**
	 * 获取角色权限信息
	 * @param id 角色主键
 	 * @return 权限信息
	 */
	List<String> getRoleAuth(String id);

	String createAdminRole(String customerId);

	/**
	 * 设置角色包含的用户
	 * @param roleId 角色主键
	 * @param userIds 用户主键列表
	 * @return 是否成功
	 */
	boolean setRoleUsers(String roleId, List<String> userIds);
	
	/**
     * 对一个客户授角色
     * @param roleId 角色主键
     * @param userId 用户主键
     * @return 是否成功
     */
    void setRoleUser(String roleId, String userId);
    
    /**
     * 根据角色id查询对应的user_id
     * @param id
     * @return user_id
     */
    List<String> selectUserrole(String id);
    
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
}
