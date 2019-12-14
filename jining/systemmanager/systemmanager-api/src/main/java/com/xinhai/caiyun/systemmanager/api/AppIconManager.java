package com.xinhai.caiyun.systemmanager.api;


public class AppIconManager {

	private String applx;

	public String getApplx() {
		return applx;
	}

	public void setApplx(String applx) {
		this.applx = applx;
	}

	/**
	 * id
	 */
	private String id;
	/**
	 * 图标状态
	 * 0为顶部轮播，1为常用图标，3为财务分析
	 */
	private String  iconType;
	/**
	 * 图标编号
	 */
	private String iconCode;
	/**
	 * 图片连接
	 */
	private String pictureLink;
	/**
	 * 图片名称
	 */
	private String pictureName;
	/**
	 * 图片描述
	 */
	private String pictureContent;
	/**
	 * 备注信息
	 */
	private String momoInfo;
	/**
	 * 图表状态
	 */
	private String iconStat;
	/**
	 * 所在地址
	 */
	private String location;
	/**
	 * 有效期起
	 */
	private String StartTime;
	/**
	 * 有效期止
	 */
	private String endTime;
	/**
	 * 删除标志
	 */
	private int delFlag;
	/**
	 * 录入人员
	 */
	private String importPeople;
	/**
	 * 修改人员
	 */
	private String updatePeople;
	/**
	 * 删除人员
	 */
	private String delPeople;
	/**
	 * 录入时间
	 */
	private String importTime;
	/**
	 * 修改时间
	 */
	private String updateTime;
	/**
	 * 删除时间
	 */
	private String delTime;
	
	
	public String getIconCode() {
		return iconCode;
	}
	public void setIconCode(String iconCode) {
		this.iconCode = iconCode;
	}
	public String getPictureLink() {
		return pictureLink;
	}
	public void setPictureLink(String pictureLink) {
		this.pictureLink = pictureLink;
	}
	public String getPictureName() {
		return pictureName;
	}
	public void setPictureName(String pictureName) {
		this.pictureName = pictureName;
	}
	public String getPictureContent() {
		return pictureContent;
	}
	public void setPictureContent(String pictureContent) {
		this.pictureContent = pictureContent;
	}
	public String getMomoInfo() {
		return momoInfo;
	}
	public void setMomoInfo(String momoInfo) {
		this.momoInfo = momoInfo;
	}
	

	public String getStartTime() {
		return StartTime;
	}
	public void setStartTime(String startTime) {
		StartTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public int getDelFlag() {
		return delFlag;
	}
	public void setDelFlag(int delFlag) {
		this.delFlag = delFlag;
	}
	public String getImportPeople() {
		return importPeople;
	}
	public void setImportPeople(String importPeople) {
		this.importPeople = importPeople;
	}
	public String getUpdatePeople() {
		return updatePeople;
	}
	public void setUpdatePeople(String updatePeople) {
		this.updatePeople = updatePeople;
	}
	public String getDelPeople() {
		return delPeople;
	}
	public void setDelPeople(String delPeople) {
		this.delPeople = delPeople;
	}
	public String getImportTime() {
		return importTime;
	}
	public void setImportTime(String importTime) {
		this.importTime = importTime;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public String getDelTime() {
		return delTime;
	}
	public void setDelTime(String delTime) {
		this.delTime = delTime;
	}
	public String getIconType() {
		return iconType;
	}
	public void setIconType(String iconType) {
		this.iconType = iconType;
	}
	public String getIconStat() {
		return iconStat;
	}
	public void setIconStat(String iconStat) {
		this.iconStat = iconStat;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	
	

}
