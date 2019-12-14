package com.xinhai.caiyun.customermanage.api;

import java.math.BigDecimal;
import java.util.Date;

public class ReportTax {
	/**
	 * id
	 */
	private String id;
	/**
	 * 客户编码
	 */
	private String customerNumber;
	/**
	 * 公司名称
	 */
	private String companyName;
	
	/**
	 * 税种
	 */
	private String taxType;
	/**
	 * 申报周期
	 */
	private String reportCycle;
	/**
	 * 报税日
	 */
	private Date taxDay;
	/**
	 * 报税期
	 */
	private String taxPeriop;
	/**
	 * 报税率
	 */
	private BigDecimal taxRate;
	/**
	 * 税款金额
	 */
	private BigDecimal taxAmount;
	/**
	 * 报税状态
	 */
	private String taxStat;
	/**
	 * 客户主管
	 */
	private String customerDirector;
	/**
	 * 纳税人识别号
	 */
	private String taxpayerNumber;

	/**
	 * 代理机构编码
	 */
	private String agencyNumber;
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
	private String inputTime;
	/**
	 * 删除日期
	 */
	private String deleteTime;
	/**
	 * 修改日期
	 */
	private String updateTime;
	/**
	 * 税种名称
	 */
	private String taxName;
	/**
	 * 申报周期名称
	 */
	private String reportCycleName;
	/**
	 * 发送标志
	 */
	private String sendFlag;
	/**
	 * 消息编码
	 */
	private String messageCode;
	/**
	 * 提醒标志
	 */
	private String remindFlag;
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCustomerNumber() {
		return customerNumber;
	}
	public void setCustomerNumber(String customerNumber) {
		this.customerNumber = customerNumber;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getTaxType() {
		return taxType;
	}
	public void setTaxType(String taxType) {
		this.taxType = taxType;
	}
	public String getReportCycle() {
		return reportCycle;
	}
	public void setReportCycle(String reportCycle) {
		this.reportCycle = reportCycle;
	}
	

	public String getTaxStat() {
		return taxStat;
	}
	public void setTaxStat(String taxStat) {
		this.taxStat = taxStat;
	}
	public String getCustomerDirector() {
		return customerDirector;
	}
	public void setCustomerDirector(String customerDirector) {
		this.customerDirector = customerDirector;
	}
	public String getTaxpayerNumber() {
		return taxpayerNumber;
	}
	public void setTaxpayerNumber(String taxpayerNumber) {
		this.taxpayerNumber = taxpayerNumber;
	}
	public String getAgencyNumber() {
		return agencyNumber;
	}
	public void setAgencyNumber(String agencyNumber) {
		this.agencyNumber = agencyNumber;
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
	

	public String getInputTime() {
		return inputTime;
	}
	public void setInputTime(String inputTime) {
		this.inputTime = inputTime;
	}
	public String getDeleteTime() {
		return deleteTime;
	}
	public void setDeleteTime(String deleteTime) {
		this.deleteTime = deleteTime;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	
	public Date getTaxDay() {
		return taxDay;
	}
	public void setTaxDay(Date taxDay) {
		this.taxDay = taxDay;
	}
	public String getTaxPeriop() {
		return taxPeriop;
	}
	public void setTaxPeriop(String taxPeriop) {
		this.taxPeriop = taxPeriop;
	}
	public BigDecimal getTaxAmount() {
		return taxAmount;
	}
	public void setTaxAmount(BigDecimal taxAmount) {
		this.taxAmount = taxAmount;
	}
	public String getTaxName() {
		return taxName;
	}
	public void setTaxName(String taxName) {
		this.taxName = taxName;
	}
	public String getReportCycleName() {
		return reportCycleName;
	}
	public void setReportCycleName(String reportCycleName) {
		this.reportCycleName = reportCycleName;
	}
	public BigDecimal getTaxRate() {
		return taxRate;
	}
	public void setTaxRate(BigDecimal taxRate) {
		this.taxRate = taxRate;
	}
	public String getSendFlag() {
		return sendFlag;
	}
	public void setSendFlag(String sendFlag) {
		this.sendFlag = sendFlag;
	}
	public String getMessageCode() {
		return messageCode;
	}
	public void setMessageCode(String messageCode) {
		this.messageCode = messageCode;
	}
	public String getRemindFlag() {
		return remindFlag;
	}
	public void setRemindFlag(String remindFlag) {
		this.remindFlag = remindFlag;
	}
	

}
