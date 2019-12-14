package com.xinhai.security.shiro;

import com.xinhai.resourcemanager.entity.Resource;
import com.xinhai.security.api.ShiroUser;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.util.AntPathMatcher;
import org.apache.shiro.util.PatternMatcher;
import org.apache.shiro.web.filter.authz.AuthorizationFilter;
import org.apache.shiro.web.servlet.ShiroHttpServletRequest;
import org.springframework.stereotype.Repository;

import java.util.List;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * Created by fanxi on 2016-5-8.
 */
@Repository
public class SysUserFilter extends AuthorizationFilter {
  private PatternMatcher pathMatcher = new AntPathMatcher();

  @Override
  protected boolean isAccessAllowed(ServletRequest servletRequest, ServletResponse
          servletResponse, Object mappedValue) throws Exception {

    ShiroUser loginUser = (ShiroUser) SecurityUtils.getSubject().getPrincipal();
    if (loginUser == null) {
      return false;
    }

    if (loginUser.getRoles().contains("超级管理员")) {
      return true;
    } else {
      return true;
    }

//    String requestUrl = ((ShiroHttpServletRequest) servletRequest).getRequestURI();
//    List<Resource> resources = loginUser.getMenuAuthority();
//    for (Resource resource : resources) {
//      String identifier = resource.getIdentifier();
//      if (!StringUtils.isEmpty(identifier)) {
//        String[] identifiers = identifier.split(";");
//        for (String partten : identifiers) {
//          if (pathMatcher.matches(partten, requestUrl)) {
//            return true;
//          }
//        }
//      }
//    }
//
//    return false;
  }
}
