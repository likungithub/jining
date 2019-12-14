package com.xinhai.caiyun.systemmanager.api;

import java.math.BigInteger;
import java.util.Date;

public class AdvanceCompanyManagement {
	/**
	 * id
	 */
	private BigInteger id;
	/**
	 * 代理机构编码
	 */
	private String agencyCode;
	/**
	 * 垫付企业名称
	 */
	private String companyName;
	/**
	 * 企业税号
	 */
	private String businessTax;
	/**
	 * 联系人姓名
	 */
	private String linkManName;
	/**
	 * 联系人电话
	 */
	private String linkManPhoneNum;
	/**
	 * 删除标志
	 */
	private String deleteFlag;
	/**
	 * 录入人员
	 */
	private String inputPeople;
	/**
	 * 录入时间
	 */
	private Date inputTime;
	/**
	 * 修改人员
	 */
	private String updatePeople;
	/**
	 * 修改时间
	 */
	private Date updateTime;
	/**
	 * 删除人员
	 */
	private String deletePeople;
	/**
	 * 删除时间
	 */
	private Date deleteTime;
	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
		this.id = id;
	}
	public String getAgencyCode() {
		return agencyCode;
	}
	public void setAgencyCode(String agencyCode) {
		this.agencyCode = agencyCode;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getBusinessTax() {
		return businessTax;
	}
	public void setBusinessTax(String businessTax) {
		this.businessTax = businessTax;
	}
	public String getLinkManName() {
		return linkManName;
	}
	public void setLinkManName(String linkManName) {
		this.linkManName = linkManName;
	}
	public String getLinkManPhoneNum() {
		return linkManPhoneNum;
	}
	public void setLinkManPhoneNum(String linkManPhoneNum) {
		this.linkManPhoneNum = linkManPhoneNum;
	}
	public String getDeleteFlag() {
		return deleteFlag;
	}
	public void setDeleteFlag(String deleteFlag) {
		this.deleteFlag = deleteFlag;
	}
	public String getInputPeople() {
		return inputPeople;
	}
	public void setInputPeople(String inputPeople) {
		this.inputPeople = inputPeople;
	}
	public Date getInputTime() {
		return inputTime;
	}
	public void setInputTime(Date inputTime) {
		this.inputTime = inputTime;
	}
	public String getUpdatePeople() {
		return updatePeople;
	}
	public void setUpdatePeople(String updatePeople) {
		this.updatePeople = updatePeople;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public String getDeletePeople() {
		return deletePeople;
	}
	public void setDeletePeople(String deletePeople) {
		this.deletePeople = deletePeople;
	}
	public Date getDeleteTime() {
		return deleteTime;
	}
	public void setDeleteTime(Date deleteTime) {
		this.deleteTime = deleteTime;
	}
	
}
