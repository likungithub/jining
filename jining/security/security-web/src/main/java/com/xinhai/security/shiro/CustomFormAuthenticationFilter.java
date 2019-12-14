package com.xinhai.security.shiro;

import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class CustomFormAuthenticationFilter extends FormAuthenticationFilter {

  private static final Logger LOGGER = LoggerFactory.getLogger(CustomFormAuthenticationFilter.class);

  @Autowired
  private SecurityConfig securityConfig;

  @Override
  protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
    LOGGER.info("inito CustomFormAuthenticationFilter onAccessDenied");
    if (request.getAttribute(getFailureKeyAttribute()) != null) {
      return true;
    }

    if (securityConfig.isSecurityDisabled()) {
      return true;
    }

    return super.onAccessDenied(request, response);
  }
}
