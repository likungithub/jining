package com.xinhai.caiyun.customermanage.api;


import java.util.Date;

/**
 * 意向客户——共享客户实体类
 * Created by wangshuo on 2018/4/11 0011.
 */
public class ShareCustomer {
    /**
     * id
     */
    private long id;
    /**
     * 意向客户id
     */
    private String intentionCustomerId;
    /**
     * 代理机构编码
     */
    private String agencyCode;
    /**
     * 职员代码
     */
    private String employeeCode;
    /**
     * 职员名称
     */
    private String employeeName;
    /**
     * 部门编码
     */
    private String departmentCode;
    /**
     * 部门名称
     */
    private String departmentName;
    /**
     * 删除标志
     */
    private String deleteFlag;
    /**
     * 录入人员
     */
    private String inputPeople;
    /**
     * 删除人
     */
    private String deletePeople;
    /**
     * 录入日期
     */
    private Date inputTime;
    /**
     * 删除日期
     */
    private Date deleteTime;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getIntentionCustomerId() {
        return intentionCustomerId;
    }

    public void setIntentionCustomerId(String intentionCustomerId) {
        this.intentionCustomerId = intentionCustomerId;
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

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
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

    public String getDeletePeople() {
        return deletePeople;
    }

    public void setDeletePeople(String deletePeople) {
        this.deletePeople = deletePeople;
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
}
