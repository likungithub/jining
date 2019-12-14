package com.xinhai.security.shiro.credential;

import com.xinhai.organization.api.Organization;
import com.xinhai.security.api.Customer;
import com.xinhai.security.api.MD5EncryptService;
import com.xinhai.security.api.SecurityService;
import com.xinhai.security.api.ShiroUser;

import org.apache.shiro.authc.AccountException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by fanxi on 2016-5-19. 
 */
public class CustomCredentialsMatcher extends SimpleCredentialsMatcher {
  Logger logger = LoggerFactory.getLogger(CustomCredentialsMatcher.class);
  protected MD5EncryptService encryptService = new MD5EncryptService();
  protected SecurityService securityService;

  @Override
  public boolean doCredentialsMatch(AuthenticationToken authcToken, AuthenticationInfo info) {
    UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
    String[] strs = token.getUsername().split("&&");
    String userName = strs[0];
    ShiroUser user = securityService.findUserByUserName(userName);
    
    if (user == null) {
      throw new UnknownAccountException("current principal is not existed.");
    }

    if (user.getCustomer() != null && !user.getCustomer().isState()) { //公司审核未通过或未审核
      throw new LockedAccountException("current user is suspend.");
    } else if (user.getIsDelete()) { //当前员工账号为离职状态
      throw new AccountException("current user had been fired.");
    }

    Customer customer = securityService.findCustomerByUser(user.getCustomer().getId());
    String verifyCode = strs.length > 1 ? strs[1].toUpperCase() : "";
    String pwd = String.valueOf(user.getUserPassword());
    String newCredentials1 = encryptService.encryptPassword(pwd + strs[0], "");
    String newCredentials2 = encryptService.encryptPassword(newCredentials1 + verifyCode, "");

    boolean isSuccess = equals(token.getPassword(), newCredentials2);
    if (isSuccess) {
      initLoginUser(user, customer, info);
    }

    return isSuccess;
  }

  protected void initLoginUser(ShiroUser user, Customer customer, AuthenticationInfo info) {
    if (user != null) {
      ShiroUser shiroUser = (ShiroUser) info.getPrincipals().asList().get(0);
      shiroUser.setId(user.getId());
      shiroUser.setUserName(user.getUserName());
      shiroUser.setUserAccount(user.getUserAccount());
      shiroUser.setUserPassword(user.getUserPassword());
      shiroUser.setEmail(user.getEmail());
      shiroUser.setEnabled(user.getEnabled());
      shiroUser.setOrganization(user.getOrganization()); //获取组织信息
      shiroUser.setCustomer(customer); // 获取客户信息
      shiroUser.setUser(user.getUser()); // 获取用户信息

      try {
        if (securityService != null) {
          shiroUser.setRoles(securityService.findUserRoles(shiroUser.getUserAccount()));
          shiroUser.setMenuAuthority(securityService.findAllUrlAccessResources(shiroUser
                  .getUserAccount()));
          shiroUser.setOperatorAuthority(securityService.findUserOperatorAuth(shiroUser
                  .getUserAccount()));
          shiroUser.setOrganization(securityService.selectByCode(user.getOrganization().getId()));
          shiroUser.setIndependentOrg(securityService.findIndependentOrgByUser(shiroUser
                  .getUserAccount()));

        }
      } catch (Exception ex) {
        logger.error("初始化数据权限时出错！", ex);
      }
    }
  }

  public void setSecurityService(SecurityService securityService) {
    this.securityService = securityService;
  }
}
