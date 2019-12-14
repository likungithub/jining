package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 * 业务合作
 * @author huxinquan
 */
public class BusinessCooperate {


    private String khjlmc;


    public String getKhjlmc() {
        return khjlmc;
    }

    public void setKhjlmc(String khjlmc) {
        this.khjlmc = khjlmc;
    }

    private String ywmc;


    public String getYwmc() {
        return ywmc;
    }

    public void setYwmc(String ywmc) {
        this.ywmc = ywmc;
    }

    private String gsmc;

    public String getGsmc() {
        return gsmc;
    }

    public void setGsmc(String gsmc) {
        this.gsmc = gsmc;
    }

    public String getBlzt() {
        return blzt;
    }

    public void setBlzt(String blzt) {
        this.blzt = blzt;
    }

    /*
        * 办理状态  未受理：001  已受理：002    已完成：003    已流失：004
        * */
    private String blzt;



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
     * 联系方式
     */
    private String contactInformation;
    /**
     * 留言信息
     */
    private String message;
    /**
     * 答复标志
     */
    private int isAnswer;
    /**
     * 删除标志
     */
    private int isDelete;
    /**
     * 留言日期
     */
    private Date messageDate;
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

    public String getContactInformation() {
        return contactInformation;
    }

    public void setContactInformation(String contactInformation) {
        this.contactInformation = contactInformation;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getIsAnswer() {
        return isAnswer;
    }

    public void setIsAnswer(int isAnswer) {
        this.isAnswer = isAnswer;
    }

    public int getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(int isDelete) {
        this.isDelete = isDelete;
    }

    public Date getMessageDate() {
        return messageDate;
    }

    public void setMessageDate(Date messageDate) {
        this.messageDate = messageDate;
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
        return "BusinessCooperate{" +
                "id=" + id +
                ", cooperateId='" + cooperateId + '\'' +
                ", customerCode='" + customerCode + '\'' +
                ", customerName='" + customerName + '\'' +
                ", agencyCode='" + agencyCode + '\'' +
                ", contactInformation='" + contactInformation + '\'' +
                ", message='" + message + '\'' +
                ", isAnswer=" + isAnswer +
                ", isDelete=" + isDelete +
                ", messageDate=" + messageDate +
                ", enterStaff='" + enterStaff + '\'' +
                ", updateStaff='" + updateStaff + '\'' +
                ", deleteStaff='" + deleteStaff + '\'' +
                ", enterDate=" + enterDate +
                ", updateDate=" + updateDate +
                ", deleteDate=" + deleteDate +
                '}';
    }
}
