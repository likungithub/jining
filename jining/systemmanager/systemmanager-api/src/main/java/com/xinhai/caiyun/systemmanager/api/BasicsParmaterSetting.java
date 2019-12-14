package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

public class BasicsParmaterSetting {

	/**
	 * id
	 */
	private String id;
	/**
	 * 代理机构编码
	 */
	private String agencyNumber;
	/**
	 * 纳税人识别号
	 */
	private String taxpayerNumber;

	/**
	 * 提醒类型编码
	 */
	private String remindTypeEncoding;
	/**
	 * 提醒信息
	 */
	private String remindMessage;
	/**
	 * 删除标志
	 */
	private int deleteFlag;
	/**
	 * 录入人员
	 */
	private String inputPeople;
	/**
	 * 删除人员
	 */
	private String deletePeople;
	/**
	 * 修改人员
	 */
	private String updatePeople;
	/**
	 * 录入日期
	 */
	private Date inputTime;
	/**
	 * 删除日期
	 */
	private Date deleteTime;
	/**
	 * 修改日期
	 */
	private Date updateTime;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAgencyNumber() {
		return agencyNumber;
	}

	public void setAgencyNumber(String agencyNumber) {
		this.agencyNumber = agencyNumber;
	}

	public String getTaxpayerNumber() {
		return taxpayerNumber;
	}

	public void setTaxpayerNumber(String taxpayerNumber) {
		this.taxpayerNumber = taxpayerNumber;
	}

	

	public int getDeleteFlag() {
		return deleteFlag;
	}

	public void setDeleteFlag(int deleteFlag) {
		this.deleteFlag = deleteFlag;
	}

	public String getInputPeople() {
		return inputPeople;
	}

	public void setInputPeople(String inputPeople) {
		this.inputPeople = inputPeople;
	}

	public String getDeletePeople() {
		return deletePeople;
	}

	public void setDeletePeople(String deletePeople) {
		this.deletePeople = deletePeople;
	}

	public String getUpdatePeople() {
		return updatePeople;
	}

	public void setUpdatePeople(String updatePeople) {
		this.updatePeople = updatePeople;
	}

	public Date getInputTime() {
		return inputTime;
	}

	public void setInputTime(Date inputTime) {
		this.inputTime = inputTime;
	}

	public Date getDeleteTime() {
		return deleteTime;
	}

	public void setDeleteTime(Date deleteTime) {
		this.deleteTime = deleteTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public String getRemindTypeEncoding() {
		return remindTypeEncoding;
	}

	public void setRemindTypeEncoding(String remindTypeEncoding) {
		this.remindTypeEncoding = remindTypeEncoding;
	}

	public String getRemindMessage() {
		return remindMessage;
	}

	public void setRemindMessage(String remindMessage) {
		this.remindMessage = remindMessage;
	}

	

}
