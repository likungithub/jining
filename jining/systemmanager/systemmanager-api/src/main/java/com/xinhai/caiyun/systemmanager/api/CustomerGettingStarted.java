package com.xinhai.caiyun.systemmanager.api;

import java.io.Serializable;

/**
 * 新手入门实体类、
 * Created by wangshuo on 2017/6/20.
 */

public class CustomerGettingStarted implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6935122994881474895L;
	private String id;
	/**
	 * 上传附件名称
	 */
	private String fileName;
	/**
	 * 上传附件描述
	 */
	private String fileContent;
	/**
	 * 上传附件路径
	 */
	private String filePath;
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
	private String deleteFlag;
	/**
	 * 录入人员
	 */
	private String inputPeople;
	/**
	 * 修改人员
	 */
	private String updatePeople;
	/**
	 * 删除人员
	 */
	private String deletePeople;
	/**
	 * 录入时间
	 */
	private String inputTime;
	/**
	 * 修改时间
	 */
	private String updateTime;
	/**
	 * 删除时间
	 */
	private String deleteTime;
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFileContent() {
		return fileContent;
	}
	public void setFileContent(String fileContent) {
		this.fileContent = fileContent;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
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
	public String getUpdatePeople() {
		return updatePeople;
	}
	public void setUpdatePeople(String updatePeople) {
		this.updatePeople = updatePeople;
	}
	public String getDeletePeople() {
		return deletePeople;
	}
	public void setDeletePeople(String deletePeople) {
		this.deletePeople = deletePeople;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getInputTime() {
		return inputTime;
	}
	public void setInputTime(String inputTime) {
		this.inputTime = inputTime;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public String getDeleteTime() {
		return deleteTime;
	}
	public void setDeleteTime(String deleteTime) {
		this.deleteTime = deleteTime;
	}
	
}
