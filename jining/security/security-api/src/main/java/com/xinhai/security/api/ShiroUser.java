package com.xinhai.security.api;

import com.xinhai.organization.api.Organization;
import com.xinhai.resourcemanager.entity.Resource;
import com.xinhai.usermanager.entity.User;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by fanxi on 2016-4-29.
 */
public class ShiroUser implements Serializable { 

  private static final long serialVersionUID = 9168906695730069095L;
  private String id;
  private String userName;
  private String userAccount;
  private String userPassword;
  private String salt;
  private String email;
  private Organization organization;
  private Organization independentOrg;
  private Customer customer;
  private Boolean enabled;
  private Boolean isDelete;
  private boolean isSync;
  private User user;

  public Boolean getIsDelete() {
    return isDelete;
}

public void setIsDelete(Boolean isDelete) {
    this.isDelete = isDelete;
}

public User getUser() {
      return user;
  }

  public void setUser(User user) {
      this.user = user;
  }

  public boolean isSync() {
    return isSync;
  }

  public void setSync(boolean sync) {
    isSync = sync;
  }

  private List<String> roles;
  private Set<String> operatorAuthority;
  private List<Resource> menuAuthority;

  public String getUserAccount() {
    return userAccount;
  }

  public void setUserAccount(String userAccount) {
    this.userAccount = userAccount;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Organization getOrganization() {
    return organization;
  }

  public void setOrganization(Organization organization) {
    this.organization = organization;
  }

  public Customer getCustomer() {
    return customer;
  }

  public void setCustomer(Customer customer) {
    this.customer = customer;
  }

  public Set<String> getOperatorAuthority() {
    if (operatorAuthority == null) {
      operatorAuthority = new HashSet<>();
    }

    return operatorAuthority;
  }

  public void setOperatorAuthority(Set<String> operatorAuthority) {
    this.operatorAuthority = operatorAuthority;
  }

  public Boolean getEnabled() {
    return enabled;
  }

  public void setEnabled(Boolean enabled) {
    this.enabled = enabled;
  }

  public String getUserPassword() {
    return userPassword;
  }

  public void setUserPassword(String userPassword) {
    this.userPassword = userPassword;
  }

  public String getSalt() {
    return salt;
  }

  public void setSalt(String salt) {
    this.salt = salt;
  }

  public Organization getIndependentOrg() {
    return independentOrg;
  }

  public void setIndependentOrg(Organization independentOrg) {
    this.independentOrg = independentOrg;
  }

  public List<Resource> getMenuAuthority() {
    if (menuAuthority == null) {
      return new ArrayList<>();
    }

    return menuAuthority;
  }

  public void setMenuAuthority(List<Resource> menuAuthority) {
    this.menuAuthority = menuAuthority;
  }

  public List<String> getRoles() {
    if (roles == null) {
      return new ArrayList<>();
    }

    return roles;
  }

  public void setRoles(List<String> roles) {
    this.roles = roles;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }
}
