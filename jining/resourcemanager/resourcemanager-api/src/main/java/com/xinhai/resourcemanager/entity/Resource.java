package com.xinhai.resourcemanager.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by fanxi on 2016-4-26.
 */
public class Resource implements Serializable {
	private static final long serialVersionUID = -1996143827980563595L;
	private String id;
	private String funcId;
	private String customerId;
	private String name;
	private Boolean enabled;
	private String description;
	private String identifier;
	private String menuIcon;
	private String url;
	private String category;
	private String parentId;
	private int orderNo;
	private List<Resource> children;

	public List<Resource> getChildren() {
		if (children == null) {
			children = new ArrayList<>();
		}

		return children;
	}

	public void setChildren(List<Resource> children) {
		this.children = children;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFuncId() {
		return funcId;
	}

	public void setFuncId(String funcId) {
		this.funcId = funcId;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getIdentifier() {
		return identifier;
	}

	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}

	public String getMenuIcon() {
		return menuIcon;
	}

	public void setMenuIcon(String menuIcon) {
		this.menuIcon = menuIcon;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public int getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(int orderNo) {
		this.orderNo = orderNo;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}


}
