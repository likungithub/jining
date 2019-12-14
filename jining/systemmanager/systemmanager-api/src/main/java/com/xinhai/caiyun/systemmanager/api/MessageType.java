package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 * Created by wangshuo on 2018/1/17 0017.
 */
public class MessageType {
    /**
     * id
     */
    private long id;
    /**
     * 消息类型代码
     */
    private String messageTypeCode;
    /**
     * 消息类型名称
     */
    private String messageTypeName;
    /**
     * 备注信息
     */
    private String remarkContent;
    /**
     * 录入人
     */
    private String inputPeople;
    /**
     * 修改人
     */
    private String updatePeople;
    /**
     * 删除人
     */
    private String deletePeople;
    /**
     * 录入日期
     */
    private Date inputTime;
    /**
     * 修改日期
     */
    private Date updateTime;
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

    public String getMessageTypeCode() {
        return messageTypeCode;
    }

    public void setMessageTypeCode(String messageTypeCode) {
        this.messageTypeCode = messageTypeCode;
    }

    public String getMessageTypeName() {
        return messageTypeName;
    }

    public void setMessageTypeName(String messageTypeName) {
        this.messageTypeName = messageTypeName;
    }

    public String getRemarkContent() {
        return remarkContent;
    }

    public void setRemarkContent(String remarkContent) {
        this.remarkContent = remarkContent;
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

    public Date getInputTime() {
        return inputTime;
    }

    public void setInputTime(Date inputTime) {
        this.inputTime = inputTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Date getDeleteTime() {
        return deleteTime;
    }

    public void setDeleteTime(Date deleteTime) {
        this.deleteTime = deleteTime;
    }
}
