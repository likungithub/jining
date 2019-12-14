package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 * APP系统消息
 * @author huxinquan
 */
public class AppSystemInformation {


    private String sjsj;//升级时间

    public String getSjsj() {
        return sjsj;
    }

    public void setSjsj(String sjsj) {
        this.sjsj = sjsj;
    }

    /**
     * id
     */
    private int id;
    /**
     * 手机类型
     */
    private String phoneType;
    /**
     * 信息类型代码
     */
    private String informationTypeCode;
    /**
     * 信息类型名称
     */
    private String informationTypeName;
    
    /**
     * 消息提醒简介
     */
    private String messageJj;


    /**
     *专题
     */
    private String informationSpecial;

    /**
     * 消息提醒内容
     */
    private String message;
    /**
     * 阅读状态代码
     */
    private int isRead;
    /**
     * 删除标志
     */
    private int isDelete;
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

    /**
     * 客户端类别
     */
    private String clientType;

    /**
     * 消息编号
     */
    private String msgNumber;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPhoneType() {
        return phoneType;
    }

    public void setPhoneType(String phoneType) {
        this.phoneType = phoneType;
    }

    public String getInformationTypeCode() {
        return informationTypeCode;
    }

    public void setInformationTypeCode(String informationTypeCode) {
        this.informationTypeCode = informationTypeCode;
    }

    public String getInformationTypeName() {
        return informationTypeName;
    }

    public void setInformationTypeName(String informationTypeName) {
        this.informationTypeName = informationTypeName;
    }
    
    public String getMessageJj() {
        return messageJj;
    }

    public void setMessageJj(String messageJj) {
        this.messageJj = messageJj;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getInformationSpecial() {
        return informationSpecial;
    }

    public void setInformationSpecial(String informationSpecial) {
        this.informationSpecial = informationSpecial;
    }

    public int getIsRead() {
        return isRead;
    }

    public void setIsRead(int isRead) {
        this.isRead = isRead;
    }

    public int getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(int isDelete) {
        this.isDelete = isDelete;
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

    public String getClientType() {
        return clientType;
    }

    public void setClientType(String clientType) {
        this.clientType = clientType;
    }

    public String getMsgNumber() {
        return msgNumber;
    }

    public void setMsgNumber(String msgNumber) {
        this.msgNumber = msgNumber;
    }

    @Override
    public String toString() {
        return "AppSystemInformation{" +
                "id=" + id +
                ", phoneType='" + phoneType + '\'' +
                ", informationTypeCode='" + informationTypeCode + '\'' +
                ", informationTypeName='" + informationTypeName + '\'' +
                ", message='" + message + '\'' +
                ", isRead=" + isRead +
                ", isDelete=" + isDelete +
                ", enterStaff='" + enterStaff + '\'' +
                ", updateStaff='" + updateStaff + '\'' +
                ", deleteStaff='" + deleteStaff + '\'' +
                ", enterDate=" + enterDate +
                ", updateDate=" + updateDate +
                ", deleteDate=" + deleteDate +
                ", msgNumber=" + msgNumber +
                '}';
    }
}
