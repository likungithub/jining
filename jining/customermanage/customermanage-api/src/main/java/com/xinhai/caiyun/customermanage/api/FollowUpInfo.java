package com.xinhai.caiyun.customermanage.api;

import java.util.Date;

/**
 * 意向客户跟进信息
 * Created by 王硕 on 2018/4/11 0011.
 */
public class FollowUpInfo {
    /**
     * id
     */
    private long id;
    /**
     * 跟进id
     */
    private String followUpId;
    /**
     * 意向客户id
     */
    private String intentionCustomerId;
    /**
     * 代理机构编码
     */
    private String agencyCode;
    /**
     * 跟进内容
     */
    private String followUpContent;
    /**
     * 删除标志
     */
    private String deleteFlag;
    /**
     * 录入人员编码
     */
    private String inputPeopleCode;
    /**
     * 录入人名称
     */
    private String inputPeopleName;
    /**
     * 录入人头像
     */
    private String inputPeoplePhoto;
    /**
     * 修改人编码
     */
    private String updatePeopleCode;
    /**
     * 修改人名称
     */
    private String updatePeopleName;
    /**
     * 删除人编码
     */
    private String deletePeopleCode;
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
    /**
     * 跟进状态
     */
    private String followType;
    /**
     * 跟进附件实体类
     */
    private FollowUpFile followUpFile;
    /**
     * 沟通时间
     */
    private Date followTime;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFollowUpId() {
        return followUpId;
    }

    public void setFollowUpId(String followUpId) {
        this.followUpId = followUpId;
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

    public String getFollowUpContent() {
        return followUpContent;
    }

    public void setFollowUpContent(String followUpContent) {
        this.followUpContent = followUpContent;
    }

    public String getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(String deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public String getInputPeopleCode() {
        return inputPeopleCode;
    }

    public void setInputPeopleCode(String inputPeopleCode) {
        this.inputPeopleCode = inputPeopleCode;
    }

    public String getInputPeopleName() {
        return inputPeopleName;
    }

    public void setInputPeopleName(String inputPeopleName) {
        this.inputPeopleName = inputPeopleName;
    }

    public String getInputPeoplePhoto() {
        return inputPeoplePhoto;
    }

    public void setInputPeoplePhoto(String inputPeoplePhoto) {
        this.inputPeoplePhoto = inputPeoplePhoto;
    }

    public String getUpdatePeopleCode() {
        return updatePeopleCode;
    }

    public void setUpdatePeopleCode(String updatePeopleCode) {
        this.updatePeopleCode = updatePeopleCode;
    }

    public String getUpdatePeopleName() {
        return updatePeopleName;
    }

    public void setUpdatePeopleName(String updatePeopleName) {
        this.updatePeopleName = updatePeopleName;
    }

    public String getDeletePeopleCode() {
        return deletePeopleCode;
    }

    public void setDeletePeopleCode(String deletePeopleCode) {
        this.deletePeopleCode = deletePeopleCode;
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

    public String getFollowType() {
        return followType;
    }

    public void setFollowType(String followType) {
        this.followType = followType;
    }

    public FollowUpFile getFollowUpFile() {
        return followUpFile;
    }

    public void setFollowUpFile(FollowUpFile followUpFile) {
        this.followUpFile = followUpFile;
    }

    public Date getFollowTime() {
        return followTime;
    }

    public void setFollowTime(Date followTime) {
        this.followTime = followTime;
    }
}
