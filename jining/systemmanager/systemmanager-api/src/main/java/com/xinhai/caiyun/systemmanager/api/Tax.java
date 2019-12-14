package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

public class Tax {
	/**
	 * id
	 */
	private Long id;
	/**
	 * 代理机构编码
	 */
	private String agencyNumber;
	/**
	 * 纳税人识别号
	 */
	private String taxpayerNumber;
	/**
	 * 征收税种编码
	 * 
	 */
	private String taxcode;
	/**
	 * 征收税种名称
	 */
	private String taxName;
	/**
	 * 备注信息
	 */
	private String memoMessage;
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

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

	public String getTaxcode() {
		return taxcode;
	}

	public void setTaxcode(String taxcode) {
		this.taxcode = taxcode;
	}

	public String getMemoMessage() {
		return memoMessage;
	}

	public void setMemoMessage(String memoMessage) {
		this.memoMessage = memoMessage;
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

	public String getTaxName() {
		return taxName;
	}

	public void setTaxName(String taxName) {
		this.taxName = taxName;
	}

}
