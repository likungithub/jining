package com.xinhai.security.shiro;

import org.apache.shiro.web.filter.mgt.FilterChainManager;
import org.apache.shiro.web.filter.mgt.PathMatchingFilterChainResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class CustomPathMatchingFilterChainResolver extends PathMatchingFilterChainResolver {
  private static final Logger LOGGER = LoggerFactory.getLogger(CustomPathMatchingFilterChainResolver.class);

  private CustomDefaultFilterChainManager customDefaultFilterChainManager;

  @Autowired
  private SecurityConfig securityConfig;

  public void setCustomDefaultFilterChainManager(CustomDefaultFilterChainManager customDefaultFilterChainManager) {
    this.customDefaultFilterChainManager = customDefaultFilterChainManager;
    setFilterChainManager(customDefaultFilterChainManager);
    if (!securityConfig.isSecurityDisabled()) {
      customDefaultFilterChainManager.init();
    }
  }

  public FilterChain getChain(ServletRequest request, ServletResponse response, FilterChain originalChain) {
    FilterChainManager filterChainManager = getFilterChainManager();
    if (!filterChainManager.hasChains()) {
      return null;
    }

    String requestURI = getPathWithinApplication(request);
    for (String pathPattern : filterChainManager.getChainNames()) {
      if (pathMatches(pathPattern, requestURI)) {
        return customDefaultFilterChainManager.proxy(originalChain, pathPattern);
      }
    }
    return null;

  }
}
