package com.xinhai.security.shiro;

/**
 * Created by fanxi on 2016-5-23.
 */
public class SecurityConfig {
  private boolean securityDisabled;

  private String sysTitle;

  private String copyright;

  private boolean captchaDisabled;

  private String verifyType;

  private String adUrl;

  private String adDomain;

  private String adAdminUser;

  private String adAdminPwd;

  private String adRootOrg;

  private String adGroup;

  public String getAdAdminUser() {
    return adAdminUser;
  }

  public void setAdAdminUser(String adAdminUser) {
    this.adAdminUser = adAdminUser;
  }

  public String getAdAdminPwd() {
    return adAdminPwd;
  }

  public void setAdAdminPwd(String adAdminPwd) {
    this.adAdminPwd = adAdminPwd;
  }

  public String getAdUrl() {
    return adUrl;
  }

  public void setAdUrl(String adUrl) {
    this.adUrl = adUrl;
  }

  public String getAdDomain() {
    return adDomain;
  }

  public void setAdDomain(String adDomain) {
    this.adDomain = adDomain;
  }

  public boolean isSecurityDisabled() {
    return securityDisabled;
  }

  public void setSecurityDisabled(boolean securityDisabled) {
    this.securityDisabled = securityDisabled;
  }

  public String getSysTitle() {
    return sysTitle;
  }

  public void setSysTitle(String sysTitle) {
    this.sysTitle = sysTitle;
  }

  public String getCopyright() {
    return copyright;
  }

  public void setCopyright(String copyright) {
    this.copyright = copyright;
  }

  public boolean isCaptchaDisabled() {
    return captchaDisabled;
  }

  public void setCaptchaDisabled(boolean captchaDisabled) {
    this.captchaDisabled = captchaDisabled;
  }

  public String getVerifyType() {
    return verifyType;
  }

  public void setVerifyType(String verifyType) {
    this.verifyType = verifyType;
  }

  public String getAdRootOrg() {
    return adRootOrg;
  }

  public void setAdRootOrg(String adRootOrg) {
    this.adRootOrg = adRootOrg;
  }

  public String getAdGroup() {
    return adGroup;
  }

  public void setAdGroup(String adGroup) {
    this.adGroup = adGroup;
  }
}
