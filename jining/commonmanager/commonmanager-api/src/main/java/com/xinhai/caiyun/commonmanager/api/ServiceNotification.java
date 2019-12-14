package com.xinhai.caiyun.commonmanager.api;

import java.util.Date;

public class ServiceNotification {
	/**
	 * id
	 */
	private String id;
	/**
	 * 服务通知类型
	 */
	private String notificationType;
	/**
	 * 模板类型
	 */
	private String mblx;
	/**
	 * 服务通知名称
	 */
	private String notificationName;
	/**
	 * 代理机构编码
	 */
	private String agencyCode;
	/**
	 * 职员代码（发送人员代码）
	 */
	private String employeeCode;
	/**
	 * 客户编码（接受人员编码）
	 */
	private String customerCode;
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
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getNotificationType() {
		return notificationType;
	}
	public void setNotificationType(String notificationType) {
		this.notificationType = notificationType;
	}
	public String getNotificationName() {
		return notificationName;
	}
	public void setNotificationName(String notificationName) {
		this.notificationName = notificationName;
	}
	public String getAgencyCode() {
		return agencyCode;
	}
	public void setAgencyCode(String agencyCode) {
		this.agencyCode = agencyCode;
	}
	public String getEmployeeCode() {
		return employeeCode;
	}
	public void setEmployeeCode(String employeeCode) {
		this.employeeCode = employeeCode;
	}
	public String getCustomerCode() {
		return customerCode;
	}
	public void setCustomerCode(String customerCode) {
		this.customerCode = customerCode;
	}
	public String getMessageCode() {
		return messageCode;
	}
	public void setMessageCode(String messageCode) {
		this.messageCode = messageCode;
	}
	public String getMessageContent() {
		return messageContent;
	}
	public void setMessageContent(String messageContent) {
		this.messageContent = messageContent;
	}
	public Date getMessageSandTime() {
		return messageSandTime;
	}
	public void setMessageSandTime(Date messageSandTime) {
		this.messageSandTime = messageSandTime;
	}
	
	public String getMblx() {
        return mblx;
    }
    public void setMblx(String mblx) {
        this.mblx = mblx;
    }

    /**
	 * 消息代码
	 */
	private String messageCode;
	/**
	 * 消息内容
	 */
	private String messageContent;
	/**
	 * 消息发送时间
	 */
	private Date messageSandTime;
	
	 /**
     * 失败次数
     */
    private String errorCount;

    public String getErrorCount() {
        return errorCount;
    }

    public void setErrorCount(String errorCount) {
        this.errorCount = errorCount;
    }
    
    
	
}
