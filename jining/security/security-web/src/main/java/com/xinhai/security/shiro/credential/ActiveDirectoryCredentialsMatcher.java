package com.xinhai.security.shiro.credential;

import com.xinhai.security.api.Customer;
import com.xinhai.security.api.ShiroUser;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;

import java.util.Hashtable;

import javax.naming.Context;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;

public class ActiveDirectoryCredentialsMatcher extends CustomCredentialsMatcher {
  private String url;
  private String domain;

  public ActiveDirectoryCredentialsMatcher(String adUrl, String adDomain) {
    url = adUrl;
    domain = adDomain;
  }

  @Override
  public boolean doCredentialsMatch(AuthenticationToken authcToken, AuthenticationInfo info) {
    UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
    String[] strs = token.getUsername().split("&&");
    String[] pwd = String.valueOf(token.getPassword()).split("\\|@");
    String userCode = strs[0];
    ShiroUser user = securityService.findUserByUserName(userCode);
    if (user == null) {
      return false;
    }

    if (!user.isSync()) {
      ((UsernamePasswordToken) authcToken).setPassword(pwd[0].toCharArray());
      return super.doCredentialsMatch(authcToken, info);
    } else {
      LdapContext ctx = null;
      Hashtable hashEnv = new Hashtable();
      hashEnv.put(Context.SECURITY_AUTHENTICATION, "simple");
      hashEnv.put(Context.SECURITY_PRINCIPAL, String.format("%s@%s", userCode, domain));
      hashEnv.put(Context.SECURITY_CREDENTIALS, pwd[1]);
      hashEnv.put(Context.INITIAL_CONTEXT_FACTORY,
              "com.sun.jndi.ldap.LdapCtxFactory");
      hashEnv.put(Context.PROVIDER_URL, String.format("ldap://%s", url));
      try {
        ctx = new InitialLdapContext(hashEnv, null);
        Customer customer = securityService.findCustomerByUser(user.getCustomer().getId());
        if (customer != null && !customer.isState()) {
          throw new LockedAccountException("current user is suspend.");
        }

        initLoginUser(user, customer, info);
        return true;
      } catch (Exception e) {
        e.printStackTrace();
      } finally {
        if (null != ctx) {
          try {
            ctx.close();
          } catch (Exception e) {
            e.printStackTrace();
          }
        }
      }

      return false;
    }
  }
}
