package com.xinhai.security.shiro;

import com.xinhai.security.api.MD5EncryptService;
import com.xinhai.security.api.SecurityService;
import com.xinhai.security.api.ShiroUser;
import com.xinhai.security.shiro.credential.ActiveDirectoryCredentialsMatcher;
import com.xinhai.security.shiro.credential.CustomCredentialsMatcher;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.subject.support.DefaultSubjectContext;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Collection;

import javax.annotation.PostConstruct;

/**
 * 这里加入一个角色。 自定义Realm 放入用户以及角色和权限
 *
 * @author luzhao
 */

@Repository("customAuthoringRealm")
public class CustomAuthoringRealm extends AuthorizingRealm {
  private SecurityService authorityVerify;

  private MD5EncryptService passwordEncryptService = new MD5EncryptService();

  @Autowired
  private SecurityConfig securityConfig;

  @Override
  protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
    return new SimpleAuthorizationInfo();
  }

  @Override
  protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws
          AuthenticationException {
    UsernamePasswordToken toToken = null;
    if (token instanceof UsernamePasswordToken) {
      toToken = (UsernamePasswordToken) token;
    }

    return new SimpleAuthenticationInfo(new ShiroUser(), toToken.getPassword(), getName());
  }

  /**
   * 初始化密码加密匹配器
   */
  @PostConstruct
  public void initCredentialsMatcher() {
    CustomCredentialsMatcher matcher = null;
    if (StringUtils.equalsIgnoreCase(securityConfig.getVerifyType(), "ad")) {
      matcher = new ActiveDirectoryCredentialsMatcher(securityConfig.getAdUrl(),
              securityConfig.getAdDomain());
    } else {
      matcher = new CustomCredentialsMatcher();
    }

    matcher.setSecurityService(authorityVerify);
    setCredentialsMatcher(matcher);
  }

  @Override
  protected void clearCachedAuthorizationInfo(PrincipalCollection principals) {
    super.clearCachedAuthorizationInfo(principals);
  }

  @Override
  protected void clearCachedAuthenticationInfo(PrincipalCollection principals) {
    super.clearCachedAuthenticationInfo(principals);
  }

  @Override
  protected void clearCache(PrincipalCollection principals) {
    super.clearCache(principals);
  }

  public void clearAllCachedAuthorizationInfo() {
    getAuthorizationCache().clear();
  }

  public void clearAllCachedAuthenticationInfo() {
    getAuthenticationCache().clear();
  }

  public void clearAllCache() {
    clearAllCachedAuthenticationInfo();
    clearAllCachedAuthorizationInfo();
  }

  public void setAuthorityVerify(SecurityService authorityVerify) {
    this.authorityVerify = authorityVerify;
  }
}
