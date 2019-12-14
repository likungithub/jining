package com.xinhai.security.filter;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.util.AntPathMatcher;
import org.apache.shiro.util.PatternMatcher;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Properties;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class CSRFFilter implements Filter {
  private List<String> hosts = new ArrayList<>();

  @Override
  public void init(FilterConfig filterConfig) throws ServletException {
    hosts = getHost();
  }

  @Override
  public void doFilter(ServletRequest request,
                       ServletResponse response,
                       FilterChain chain) throws IOException, ServletException {
    HttpServletRequest httpRequest = (HttpServletRequest) request;
    if (hosts.isEmpty()) {
      chain.doFilter(request, response);
    } else {
      String httpHost = httpRequest.getHeader("host");
      String requestURI = httpRequest.getRequestURI();
      PatternMatcher pathMatcher = new AntPathMatcher();
      if (pathMatcher.matches("/**/assets/**", requestURI)
              || pathMatcher.matches("/**/securityassets/**", requestURI)
              || pathMatcher.matches("/**/jcaptcha.jpg", requestURI)) {
        chain.doFilter(request, response);
        return;
      }

      for (String host : hosts) {
        if (StringUtils.equalsIgnoreCase(httpHost, host)) {
          chain.doFilter(request, response);
          return;
        }
      }

      request.getRequestDispatcher("/login").forward(request, response);
    }
  }

  private List<String> getHost() {
    String host = "";
    PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
    Properties props = null;

    try {
      Resource[] resources = resolver.getResources("classpath*:**/global.properties");
      Resource resource;
      if (resources.length > 0) {
        resource = resources[resources.length - 1];
      } else {
        String path = (new File("")).getAbsolutePath() + "/resources/global.properties";
        resource = new FileSystemResource(path);
      }

      props = PropertiesLoaderUtils.loadProperties(resource);
    } catch (IOException e) {
      e.printStackTrace();
    }

    if (props != null) {
      host = props.getProperty("security.host");
    }

    List<String> hosts = new ArrayList<>();
    if (!StringUtils.isEmpty(host)) {
      Collections.addAll(hosts, host.split(";"));
    }

    return hosts;
  }

  @Override
  public void destroy() {

  }
}
