package com.xinhai.caiyun.commonmanager.api;

public class ServiceNotificationCode {
	private int id;
	private String notificationName;
	private String notificationCode;
	private String notificationContent;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNotificationName() {
		return notificationName;
	}
	public void setNotificationName(String notificationName) {
		this.notificationName = notificationName;
	}
	public String getNotificationCode() {
		return notificationCode;
	}
	public void setNotificationCode(String notificationCode) {
		this.notificationCode = notificationCode;
	}
	public String getNotificationContent() {
		return notificationContent;
	}
	public void setNotificationContent(String notificationContent) {
		this.notificationContent = notificationContent;
	}
}
