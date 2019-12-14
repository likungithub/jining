package com.xinhai.security.dao;

import com.xinhai.organization.api.Organization;
import com.xinhai.resourcemanager.entity.Resource;
import com.xinhai.security.api.Customer;
import com.xinhai.security.api.OrgUrlAuthority;
import com.xinhai.usermanager.entity.User;

import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by fanxi on 2016-5-6.
 */
public interface SecurityMapper {
  User findUser(String userAccount);
  
  /**
   * 通过代理机构编码查找该代理机构管理员信息
   * @param dljgBm
   * @return
   */
  User findManager(String dljgBm);

  Organization findOrganization(String orgId);

  Customer findCustomerByUser(String userId);
  
  Customer findbycode(@Param("code") String customerId); 

  /**
   * 根据id获取一个Customer数据
   * @param id
   * @return
   */
  Customer getCustomerById(@Param("id") String id);
  
  List<Resource> findUserAuth(@Param("userAccount") String userAccount, @Param("type") String type);

  List<Resource> findUserAuthById(@Param("userAccount") String userAccount, @Param("type") String type,@Param("ids") List<String> ids);
  
  Organization findUserIndependentOrg(String userAccount);

  List<OrgUrlAuthority> findOrgAuthByOrgId(@Param("orgId") String orgId, @Param("type") String
          type);

  List<String> findUserRoles(String userAccount);

  String userIsExist(String id);

  void updateUser(User user);

  void addUser(User user);
  
  void updateNsrsbh (@Param("dljgbm") String dljgbm, @Param("newNsrsbh") String nsrsbh);

  Integer checkNsrsbh (@Param("dljgbm") String dljgbm, @Param("newNsrsbh") String nsrsbh);

  String orgIsExist(String id);

  void updateOrg(Organization org);

  void addOrg(Organization org);

  List<String> getAllSyncUsers();

  List<String> getAllSyncOrgs();

  void deleteSyncUser(@Param("allUsers") List<String> allUsers);

  void deleteSyncOrg(@Param("allOrgs") List<String> allOrgs);
  
  /**
   * 通过id获取user信息
   * @param id 传入id
   * @return 返回user信息
   */
  User getUserById(@Param("id") String id);
  
  /**
   * 通过bmdm查询Organization信息
   * @param code 传入bmdm
   * @return 返回Organization信息
   */
  Organization selectByCode(@Param("bmdm") String code);
}
