package com.xinhai.rolemanager.business;

import com.xinhai.rolemanager.dao.RoleMapper;
import com.xinhai.rolemanager.entity.Role;
import com.xinhai.rolemanager.service.RoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Created by fanxi on 2016-4-28.
 */
@Service
public class RoleServiceImpl implements RoleService {
  @Autowired
  private RoleMapper roleMapper;

  @Override
  public Role getRole(String id) {
    return roleMapper.getRole(id);
  }
  
  /**
   * 获取角色信息
   * @param jsdm 角色代码
   * @return 角色信息
   */
  @Override
  public Role getRoleByJsdm(String jsdm) {
      return roleMapper.getRoleByJsdm(jsdm);
  }

  @Override
  public List<Role> getRolesByJsbz(String customerId, String jsbz) {
    return roleMapper.getRolesByJsbz(customerId, jsbz);
  }
  
  @Override
  public List<Role> getRoles(String customerId) {
    return roleMapper.getRoles(customerId);
  }

  @Override
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void deleteRole(String id) {
    roleMapper.deleteRoleAuth(id);
    roleMapper.deleteRole(id);
  }

  @Override
  public void updateRole(String id, Role role) {
    roleMapper.updateRole(id, role);
  }
  
  /**
   * 更新角色信息
   * @param jsdm 角色代码
   * @param role 角色信息
   */  
  @Override
  public void updateRoleByJsdm(String jsdm, Role role) {
    roleMapper.updateRoleByJsdm(jsdm, role);
  }
  
  /**
   * 查出最新的角色信息
   * @param customerId 代理记账公司的id
   * @param jsbz 角色标志
   * @return 查询结果
   */
  @Override
  public Role getNew(String customerId ,String jsbz) {
      Role role = roleMapper.getNew(customerId, jsbz);
      return role;
  }

  @Override
  public void addRole(Role role) {
    role.setId(UUID.randomUUID().toString());
    roleMapper.addRole(role);
  }

  @Override
  public boolean roleHasExist(String customerId, String name) {
    Integer id = roleMapper.roleHasExist(customerId, name);
    return id != null && id != 0;
  }

  @Override
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
  public void setRoleAuth(String id, List<String> authIds, String jsbz) {
    roleMapper.deleteRoleAuthWithJsbz(id, jsbz);
    if (authIds.size() > 0) {
      roleMapper.setRoleAuth(id, authIds, jsbz);
    }
  }

  @Override
  public List<String> getRoleAuth(String id) {
    return roleMapper.getRoleAuth(id);
  }

  @Override
  public String createAdminRole(String customerId) {
    Role role = new Role();
    String id = UUID.randomUUID().toString();
    role.setId(id);
    role.setCustomerId(customerId);
    role.setName("管理员");
    role.setOrderNo(1);
    roleMapper.addRole(role);

    return id;
  }

  @Override
  public boolean setRoleUsers(String roleId, List<String> userIds) {
    if (userIds.size() > 0) {
    //先删除之前已经插入的
      roleMapper.deleteRoleUser(roleId, userIds);
      roleMapper.setRoleUsers(roleId, userIds);
    }

    return true;
  }

  /**
   * 对一个客户授角色
   * @param roleId 角色主键
   * @param userId 用户主键
   * @return 是否成功
   */
@Override
public void setRoleUser(String roleId, String userId) {
    roleMapper.setRoleUser(roleId, userId);
}

    /**
     * 根据角色id查询对应的user_id
     * @param id
     * @return user_id
     */
    public List<String> selectUserrole(String id){
        return roleMapper.selectUserrole(id);
    }
    
    /**
     * 根据customerId创建对应角色
     * @param customerId 代理记账公司的id
     */
    public void createRole(String customerId){
        roleMapper.createRole(customerId);
    }
    
    /**
     * 根据customerId删除对应信息
     * @param customerId 用户id
     */
    public void DelRole(String customerId){
        roleMapper.DelRole(customerId);
    }
  
}
