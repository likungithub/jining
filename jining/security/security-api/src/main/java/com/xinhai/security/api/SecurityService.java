package com.xinhai.security.api;

import com.xinhai.organization.api.Organization;
import com.xinhai.resourcemanager.entity.Resource;
import com.xinhai.usermanager.entity.User;

import java.util.List;
import java.util.Set;

/**
 * Created by fanxi on 2016-5-6.
 */
public interface SecurityService { 
  List<Resource> findAllUrlAccessResources(String userAccount);

  ShiroUser findUserByUserName(String userAccount);

  Set<String> findUserOperatorAuth(String userAccount);

  Organization findOrganizationByUser(String orgId);

  Organization findIndependentOrgByUser(String userAccount);

  Customer findCustomerByUser(String customerId);

  List<String> findUserRoles(String userAccount);

  void syncAd(List<User> userInfos, List<Organization> organizations);
  
  /**
   * 通过id获取user信息
   * @param id 传入id
   * @return 返回user信息
   */
  User getUserById(String id);
  
  /**
   * 通过bmdm查询Organization信息
   * @param code 传入bmdm
   * @return 返回Organization信息
   */
  Organization selectByCode(String code);
}
