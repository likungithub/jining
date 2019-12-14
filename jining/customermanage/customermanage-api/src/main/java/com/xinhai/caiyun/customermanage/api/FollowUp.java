package com.xinhai.caiyun.customermanage.api;




public class FollowUp {
	/**
	 * id
	 */
	private String id;
	/**
	 * 公司名称
	 */
	private String companyName;
	/**
	 * 客户编码
     */
	private String customerCode;
	/**
	 * 跟进日期
	 */
	private String followUpTime;
	/**
	 * 联系人
	 */
	
	private String linkMan;
	/**
	 * QQ
	 */
	private String QQ;
	/**
	 * 跟进内容
	 */
	private String followUpcontent;
	/**
	 * 下次跟进时间
	 */
	private String nextFollowUpTime;
	/**
	 * 下次联系人
	 */
	private String nextLinkMan;
	/**
	 * 下次联系人代码
	 */
	private String nextLinkManCode;
	/**
	 * 下次跟进内容
	 */
	private String nextFollowUpContent;
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
	 * 录入人员代码
	 */
	private String inputPeopleCode;
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
	private String  inputTime;
	/**
	 * 删除日期
	 */
	private String  deleteTime;
	/**
	 * 修改日期
	 */
	private String  updateTime;
	/**
	 * 跟进标志
	 */
	private String followUpCode;
	/**
	 * 发送标志
	 */
	private String sendFlag;
	/**
	 * 消息编码
	 */
	private String messageCode;
	

	public String getCustomerCode() {
		return customerCode;
	}
	public void setCustomerCode(String customerCode) {
		this.customerCode = customerCode;
	}
	
	public String getLinkMan() {
		return linkMan;
	}
	public void setLinkMan(String linkMan) {
		this.linkMan = linkMan;
	}
	public String getQQ() {
		return QQ;
	}
	public void setQQ(String qQ) {
		QQ = qQ;
	}
	public String getFollowUpcontent() {
		return followUpcontent;
	}
	public void setFollowUpcontent(String followUpcontent) {
		this.followUpcontent = followUpcontent;
	}
	
	public String getNextLinkMan() {
		return nextLinkMan;
	}
	public void setNextLinkMan(String nextLinkMan) {
		this.nextLinkMan = nextLinkMan;
	}
	public String getNextFollowUpContent() {
		return nextFollowUpContent;
	}
	public void setNextFollowUpContent(String nextFollowUpContent) {
		this.nextFollowUpContent = nextFollowUpContent;
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
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFollowUpCode() {
		return followUpCode;
	}
	public void setFollowUpCode(String followUpCode) {
		this.followUpCode = followUpCode;
	}
	public String getFollowUpTime() {
		return followUpTime;
	}
	public void setFollowUpTime(String followUpTime) {
		this.followUpTime = followUpTime;
	}
	public String getNextFollowUpTime() {
		return nextFollowUpTime;
	}
	public void setNextFollowUpTime(String nextFollowUpTime) {
		this.nextFollowUpTime = nextFollowUpTime;
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
	public String getNextLinkManCode() {
		return nextLinkManCode;
	}
	public void setNextLinkManCode(String nextLinkManCode) {
		this.nextLinkManCode = nextLinkManCode;
	}
	public String getInputPeopleCode() {
		return inputPeopleCode;
	}
	public void setInputPeopleCode(String inputPeopleCode) {
		this.inputPeopleCode = inputPeopleCode;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
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

	

}
