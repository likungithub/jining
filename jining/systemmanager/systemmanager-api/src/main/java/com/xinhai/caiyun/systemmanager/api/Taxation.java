package com.xinhai.caiyun.systemmanager.api;

import java.io.Serializable;
import java.util.Date;

public class Taxation implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -1622369105536436304L;
	/**
	 * 征收税项代码
	 */
	private String taxationCode;
	/**
	 * 征收税项名称
	 */
	private String taxationName;
	/**
	 * 征收项目简称
	 */
	private String taxationAbb;
	/**
	 * 选用标志
	 */
	private String selectionFlag;
	/**
	 * 有效标志
	 */
	private String effectiveFlag;
	/**
	 * 上级征收项目代码
	 */
	private String SuperiorCode;
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

	public String getTaxationCode() {
		return taxationCode;
	}

	public void setTaxationCode(String taxationCode) {
		this.taxationCode = taxationCode;
	}

	public String getTaxationName() {
		return taxationName;
	}

	public void setTaxationName(String taxationName) {
		this.taxationName = taxationName;
	}

	public String getTaxationAbb() {
		return taxationAbb;
	}

	public void setTaxationAbb(String taxationAbb) {
		this.taxationAbb = taxationAbb;
	}

	public String getSelectionFlag() {
		return selectionFlag;
	}

	public void setSelectionFlag(String selectionFlag) {
		this.selectionFlag = selectionFlag;
	}

	public String getEffectiveFlag() {
		return effectiveFlag;
	}

	public void setEffectiveFlag(String effectiveFlag) {
		this.effectiveFlag = effectiveFlag;
	}

	public String getSuperiorCode() {
		return SuperiorCode;
	}

	public void setSuperiorCode(String superiorCode) {
		SuperiorCode = superiorCode;
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

}
