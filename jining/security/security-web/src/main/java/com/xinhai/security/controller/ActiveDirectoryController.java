package com.xinhai.security.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.organization.api.Organization;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.security.api.SecurityService;
import com.xinhai.security.shiro.SecurityConfig;
import com.xinhai.usermanager.entity.User;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;

@Controller
public class ActiveDirectoryController {

  @Autowired
  @Qualifier("authorityVerify")
  private SecurityService securityService;

  @Autowired
  private SecurityConfig securityConfig;

  @RequestMapping(value = "/syncad", method = RequestMethod.GET)
  @ResponseBody
  public JSONObject syncAd() {
    JSONObject result = new JSONObject();
    String customerId = CurrentLoginUser.getCustomerId();
    boolean isSuccess = syncActiveDirectory(customerId);
    result.put("success", isSuccess);
    return result;
  }

  public boolean syncActiveDirectory(String customerId) {
    String rootOrg;
    String searchRootOrg = "";
    String[] root = securityConfig.getAdRootOrg().split(",");
    if (root.length <= 1) {
      rootOrg = root[0];
      searchRootOrg = "";
    } else {
      rootOrg = root[0];
      for (int i = 1; i < root.length; i++) {
        searchRootOrg += root[i] + ",";
      }
    }

    LdapContext ctx = null;
    Hashtable hashEnv = new Hashtable();
    hashEnv.put(Context.SECURITY_AUTHENTICATION, "simple");
    hashEnv.put(Context.SECURITY_PRINCIPAL,
            String.format("%s@%s", securityConfig.getAdAdminUser(),
                    securityConfig.getAdDomain()));
    hashEnv.put(Context.SECURITY_CREDENTIALS, securityConfig.getAdAdminPwd());
    hashEnv.put(Context.INITIAL_CONTEXT_FACTORY,
            "com.sun.jndi.ldap.LdapCtxFactory");
    hashEnv.put(Context.PROVIDER_URL,
            String.format("ldap://%s", securityConfig.getAdUrl()));
    try {
      ctx = new InitialLdapContext(hashEnv, null);
      syncAd(ctx, searchRootOrg, rootOrg, customerId);
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

  private void syncAd(LdapContext ctx, String searchRootOrg, String rootOrg, String customerId) {
    try {
      String[] returnedAtts = {
              "objectCategory",
              "sAMAccountName",
              "displayName",
              "description",
              "telephoneNumber",
              "Mail",
              "memberOf"
      };
      NamingEnumeration answer =
              getNamingEnumeration(ctx,
                      "(objectClass=user)",
                      returnedAtts, searchRootOrg);
      List<User> userInfos = new ArrayList<>();
      if (answer != null) {
        while (answer.hasMoreElements()) {
          SearchResult sr = (SearchResult) answer.next();
          Attributes attrs = sr.getAttributes();
          String name = sr.getName();
          if (attrs != null &&
                  StringUtils.containsIgnoreCase(name, rootOrg)) {
            buildUserInfo(userInfos, attrs, name, customerId);
          }
        }
      }

      answer = getNamingEnumeration(ctx,
              "(objectclass=organizationalUnit)",
              returnedAtts, searchRootOrg);
      List<Organization> organizations = new ArrayList<>();
      if (answer != null) {
        while (answer.hasMoreElements()) {
          SearchResult sr = (SearchResult) answer.next();
          Attributes attrs = sr.getAttributes();
          String name = sr.getName();
          if (attrs != null &&
                  StringUtils.containsIgnoreCase(name, rootOrg)) {
            buildOrg(organizations, attrs, name, customerId, rootOrg);
          }
        }
      }

      securityService.syncAd(userInfos, organizations);
    } catch (Exception ex) {
      ex.printStackTrace();
    }
  }

  private void buildOrg(List<Organization> organizations,
                        Attributes attrs,
                        String name,
                        String customerId,
                        String rootOrg) throws NamingException {
    Organization org = new Organization();
    String[] orgs = name.split(",");
    String ouName = orgs[0].replace("OU=", "");
    org.setId(ouName);
    org.setCode(ouName);
    org.setName(ouName);
    org.setRemark(getValue(attrs, "description"));
    org.setCustomerId(customerId);
    if (StringUtils.equalsIgnoreCase(rootOrg, ouName)) {
      org.setIndependent(true);
    } else {
      org.setIndependent(false);
    }
    if (orgs.length > 1) {
      org.setParentId(orgs[1].replace("OU=", ""));
      String path = "";
      for (int i = orgs.length - 1; i >= 0; i--) {
        path += orgs[i].replace("OU=", "") + "|&";
      }

      path = path.substring(0, path.length() - 2);
      org.setPath(path);
    } else {
      org.setPath(org.getCode());
    }

    organizations.add(org);
  }

  private void buildUserInfo(List<User> userInfos, Attributes attrs, String name, String
          customerId) throws NamingException {
    Attribute memberOfs = attrs.get("memberOf");
    if (memberOfs == null) {
      return;
    }

    for (int i = 0; i < memberOfs.size(); i++) {
      boolean hasGroup = StringUtils.containsIgnoreCase(
              memberOfs.get(i).toString(),
              securityConfig.getAdGroup());
      if (hasGroup) {
        User user = new User();
        String org = name.split(",")[1].replace("OU=", "");
        user.setOrgId(org);
        String value = getValue(attrs, "sAMAccountName");
        user.setId(value);
        user.setUserAccount(value);
        user.setPassword("syncuser");
        user.setName(getValue(attrs, "displayName"));
        user.setRemark(getValue(attrs, "description"));
        user.setTel(getValue(attrs, "telephoneNumber"));
        user.setEmail(getValue(attrs, "Mail"));
        user.setEnabled(true);
        user.setCreateDate(new Date());
        user.setCustomerId(customerId);

        if (StringUtils.isEmpty(user.getName())) {
          user.setName(user.getUserAccount());
        }
        userInfos.add(user);
        break;
      }
    }
  }

  private String getValue(Attributes attributes, String key) throws NamingException {
    Attribute attribute = attributes.get(key);
    if (attribute != null) {
      return attribute.get(0).toString();
    }

    return "";
  }

  private NamingEnumeration getNamingEnumeration(LdapContext ctx,
                                                 String searchFilter,
                                                 String[] returnedAtts,
                                                 String searchRootOrg)
          throws NamingException {
    String[] dc = securityConfig.getAdDomain().split("\\.");
    SearchControls searchCtls = new SearchControls();
    searchCtls.setSearchScope(SearchControls.SUBTREE_SCOPE);
    String searchBase = String.format("%sDC=%s,DC=%s", searchRootOrg, dc[0], dc[1]);
    searchCtls.setReturningAttributes(returnedAtts);
    return (NamingEnumeration) ctx.search(searchBase, searchFilter,
            searchCtls);
  }
}
