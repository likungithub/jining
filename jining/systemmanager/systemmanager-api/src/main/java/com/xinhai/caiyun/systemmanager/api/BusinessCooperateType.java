package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 * 业务合作类型
 * @author huxinquan
 */
public class BusinessCooperateType {
    /**
     * id
     */
    private int id;
    /**
     * 合作id
     */
    private String cooperateId;
    /**
     * 客户编码
     */
    private String customerCode;
    /**
     * 客户名称
     */
    private String customerName;
    /**
     * 代理机构编码
     */
    private String agencyCode;
    /**
     * 业务类型代码
     */
    private String businessTypeCode;
    /**
     * 业务类型名称
     */
    private String businessTypeName;
    /**
     * 录入人
     */
    private String enterStaff;
    /**
     * 更新人
     */
    private String updateStaff;
    /**
     * 删除人
     */
    private String deleteStaff;
    /**
     * 录入时间
     */
    private Date enterDate;
    /**
     * 更新时间
     */
    private Date updateDate;
    /**
     * 删除时间
     */
    private Date deleteDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCooperateId() {
        return cooperateId;
    }

    public void setCooperateId(String cooperateId) {
        this.cooperateId = cooperateId;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getAgencyCode() {
        return agencyCode;
    }

    public void setAgencyCode(String agencyCode) {
        this.agencyCode = agencyCode;
    }

    public String getBusinessTypeCode() {
        return businessTypeCode;
    }

    public void setBusinessTypeCode(String businessTypeCode) {
        this.businessTypeCode = businessTypeCode;
    }

    public String getBusinessTypeName() {
        return businessTypeName;
    }

    public void setBusinessTypeName(String businessTypeName) {
        this.businessTypeName = businessTypeName;
    }

    public String getEnterStaff() {
        return enterStaff;
    }

    public void setEnterStaff(String enterStaff) {
        this.enterStaff = enterStaff;
    }

    public String getUpdateStaff() {
        return updateStaff;
    }

    public void setUpdateStaff(String updateStaff) {
        this.updateStaff = updateStaff;
    }

    public String getDeleteStaff() {
        return deleteStaff;
    }

    public void setDeleteStaff(String deleteStaff) {
        this.deleteStaff = deleteStaff;
    }

    public Date getEnterDate() {
        return enterDate;
    }

    public void setEnterDate(Date enterDate) {
        this.enterDate = enterDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public Date getDeleteDate() {
        return deleteDate;
    }

    public void setDeleteDate(Date deleteDate) {
        this.deleteDate = deleteDate;
    }

    @Override
    public String toString() {
        return "BusinessCooperateType{" +
                "id=" + id +
                ", cooperateId='" + cooperateId + '\'' +
                ", customerCode='" + customerCode + '\'' +
                ", customerName='" + customerName + '\'' +
                ", agencyCode='" + agencyCode + '\'' +
                ", businessTypeCode='" + businessTypeCode + '\'' +
                ", businessTypeName='" + businessTypeName + '\'' +
                ", enterStaff='" + enterStaff + '\'' +
                ", updateStaff='" + updateStaff + '\'' +
                ", deleteStaff='" + deleteStaff + '\'' +
                ", enterDate=" + enterDate +
                ", updateDate=" + updateDate +
                ", deleteDate=" + deleteDate +
                '}';
    }
}
