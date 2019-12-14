package com.xinhai.security.api;

import com.xinhai.organization.api.Organization;
import com.xinhai.resourcemanager.entity.Resource;
import com.xinhai.usermanager.entity.User;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 当前用户，能够直接获取当前用户，也能够直接获取当前用户的账户，当前用户的角色
 */
public final class CurrentLoginUser { 

  private static Subject getSubject() {
    try {
      return SecurityUtils.getSubject();
    } catch (Exception ex) {
    }

    return null;
  }

  private static ShiroUser getPrincipal() {
    return (ShiroUser) getSubject().getPrincipal();
  }

  public static boolean isLogin() {
    Subject subject = getSubject();
    if (subject == null) {
      return false;
    }

    return getSubject().isAuthenticated();
  }
  
  public static User getUser() {
      if (!isLogin()) {
        return null;
      }

      return getPrincipal().getUser();
    }

  public static String getId() {
    if (!isLogin()) {
      return "";
    }

    return getPrincipal().getId();
  }

  public static String getUserName(){
    if (!isLogin()) {
      return "";
    }

    return getPrincipal().getUserName();
  }

  public static String getUserAccount() {
    if (!isLogin()) {
      return "";
    }

    return getPrincipal().getUserAccount();
  }

  public static String getUserEmail() {
    if (!isLogin()) {
      return "";
    }

    return getPrincipal().getEmail();
  }

  public static Organization getOrganization() {
    if (!isLogin()) {
      return null;
    }

    return getPrincipal().getOrganization();
  }

  public static Organization getIndependentOrg() {
    if (!isLogin()) {
      return null;
    }

    return getPrincipal().getIndependentOrg();
  }

  public static String getOrgId() {
    if (!isLogin()) {
      return "";
    }
    Organization org = getPrincipal().getOrganization();
    if (org != null) {
      return getPrincipal().getOrganization().getId();
    }

    return "";
  }

  public static Customer getCustomer() {
    if (!isLogin()) {
      return null;
    }

    return getPrincipal().getCustomer();
  }

  public static String getCustomerId() {
    if (!isLogin()) {
      return "";
    }

    Customer customer = getPrincipal().getCustomer();
    if (customer != null) {
      return getPrincipal().getCustomer().getId();
    }

    return "";
  }

  public static List<Resource> getResources() {
    if (!isLogin()) {
      return new ArrayList<>();
    }

    return getPrincipal().getMenuAuthority();
  }

  public static Set<String> getOperatorAuth() {
    if (!isLogin()) {
      return new HashSet<>();
    }

    return getPrincipal().getOperatorAuthority();
  }
}
