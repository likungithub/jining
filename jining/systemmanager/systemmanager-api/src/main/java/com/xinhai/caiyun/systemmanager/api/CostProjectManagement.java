package com.xinhai.caiyun.systemmanager.api;

import java.math.BigDecimal;
import java.math.BigInteger;

/**
 * 收费项目管理实体类
 * @author Wangshuo
 *
 */
public class CostProjectManagement {

	
	/**
	 * id
	 */
	private BigInteger id;
	/**
	 * 代理机构编码
	 */
	private String agencyCode;
	/**
	 * 纳税人识别号
	 */
	private String TaxpayNum;
	/**
	 * 服务项目名称
	 */
	private String serviceName;
	/**
	 * 服务项目代码
	 */
	private String serviceCode;

	/**
	 * 业务类型
	 */
	private String businessType;
	/**
	 * 收费标准
	 */
	private BigDecimal payStandard;
	/**
	 * 费用折扣
	 */
	private int costDiscount;
	/**
	 * 实际收费
	 */
	private BigDecimal actualCharge;
	/**
	 * 图片连接
	 */
	private String photoLink;
	/**
	 * 备注信息
	 */
	private String memoInformation;
	/**
	 * 服务规则
	 */
	private String serviceRegulations;
	/**
	 * 删除标志
	 */
	private int deleteFlag;
	/**
	 * 录入人
	 */
	private String inputPeople;
	/**
	 * 录入日期
	 */
	private String inputTime;
	/**
	 * 修改人
	 */
	private String updatePeople;
	/**
	 * 修改日期
	 */
	private String updateTime;
	/**
	 * 删除人
	 */
	private String deletePeople;
	/**
	 * 删除日期
	 */
	private String deleteTime;
	/**
	 * 部门编码
	 */
	private String departmentCode;
	public String getDepartmentCode() {
		return departmentCode;
	}
	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}
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
	public String getTaxpayNum() {
		return TaxpayNum;
	}
	public void setTaxpayNum(String taxpayNum) {
		TaxpayNum = taxpayNum;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public String getServiceCode() {
		return serviceCode;
	}
	public void setServiceCode(String serviceCode) {
		this.serviceCode = serviceCode;
	}
	public BigDecimal getPayStandard() {
		return payStandard;
	}
	public void setPayStandard(BigDecimal payStandard) {
		this.payStandard = payStandard;
	}
	public int getCostDiscount() {
		return costDiscount;
	}
	public void setCostDiscount(int costDiscount) {
		this.costDiscount = costDiscount;
	}
	public BigDecimal getActualCharge() {
		return actualCharge;
	}
	public void setActualCharge(BigDecimal actualCharge) {
		this.actualCharge = actualCharge;
	}
	public String getPhotoLink() {
		return photoLink;
	}
	public void setPhotoLink(String photoLink) {
		this.photoLink = photoLink;
	}
	public String getMemoInformation() {
		return memoInformation;
	}
	public void setMemoInformation(String memoInformation) {
		this.memoInformation = memoInformation;
	}
	public String getServiceRegulations() {
		return serviceRegulations;
	}
	public void setServiceRegulations(String serviceRegulations) {
		this.serviceRegulations = serviceRegulations;
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
	public String getInputTime() {
		return inputTime;
	}
	public void setInputTime(String inputTime) {
		this.inputTime = inputTime;
	}
	public String getUpdatePeople() {
		return updatePeople;
	}
	public void setUpdatePeople(String updatePeople) {
		this.updatePeople = updatePeople;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public String getDeletePeople() {
		return deletePeople;
	}
	public void setDeletePeople(String deletePeople) {
		this.deletePeople = deletePeople;
	}
	public String getDeleteTime() {
		return deleteTime;
	}
	public void setDeleteTime(String deleteTime) {
		this.deleteTime = deleteTime;
	}
	public String getBusinessType() {
		return businessType;
	}

	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}


}
