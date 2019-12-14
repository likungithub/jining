package com.xinhai.security.api;


import com.xinhai.resourcemanager.entity.Resource;

import java.io.Serializable;
import java.util.List;

/**
 * Created by fanxi on 2016-5-6.
 */
public class UserAuthority implements Serializable { 
	private static final long serialVersionUID = -7028496300157480490L;

	private String resourceId;
	private String userAccount;
	private Resource resource;

	public String getResourceId() {
		return resourceId;
	}

	public void setResourceId(String resourceId) {
		this.resourceId = resourceId;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public Resource getResource() {
		return resource;
	}

	public void setResource(Resource resource) {
		this.resource = resource;
	}
}
