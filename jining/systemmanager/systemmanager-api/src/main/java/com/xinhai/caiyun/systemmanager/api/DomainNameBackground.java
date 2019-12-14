package com.xinhai.caiyun.systemmanager.api;

import java.math.BigInteger;
import java.util.Date;

/**
 * Created by Administrator on 2018/2/28 0028.
 */
public class DomainNameBackground {

    /**
     * id
     */
    private BigInteger id;

    public String getBackgroundImgCode() {
        return backgroundImgCode;
    }

    public void setBackgroundImgCode(String backgroundImgCode) {
        this.backgroundImgCode = backgroundImgCode;
    }

    /**
     * 图片编码
     */
    private String backgroundImgCode;
    /**
     * 代理机构编码
     */
    private String agencyCode;
    /**
     * 公司名称
     */
    private String companyName;
    /**
     * 背景图地址
     */
    private String backgroundImg;
    /**
     * 描述信息
     */
    private String descriptionInfo;
    /**
     * 删除标志
     */
    private String deleteFlag;
    /**
     * 录入人
     */
    private String inputPeople;
    /**
     * 更新人
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

    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public String getAgencyCode() {
        return agencyCode;
    }

    public void setAgencyCode(String agencyCode) {
        this.agencyCode = agencyCode;
    }

    public String getBackgroundImg() {
        return backgroundImg;
    }

    public void setBackgroundImg(String backgroundImg) {
        this.backgroundImg = backgroundImg;
    }

    public String getDescriptionInfo() {
        return descriptionInfo;
    }

    public void setDescriptionInfo(String descriptionInfo) {
        this.descriptionInfo = descriptionInfo;
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

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
}
