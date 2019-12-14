package com.xinhai.caiyun.systemmanager.api;

import java.math.BigInteger;

/**
 * Created by wangshuo on 2018/2/22 0022.
 * 域名配置基本信息实体类
 */
public class DomainNameBasic {
    /**
     * id
     */
    private BigInteger id;
    /**
     * 公司名称
     */
    private String companyName;
    /**
     * 代理机构编码
     */
    private String agencyCode;
    /**
     * 公司logo
     */
    private String companyLogo;
    /**
     * 服务热线
     */
    private String servicePhone;
    /**
     * 版权信息
     */
    private String copyrightInfo;
    /**
     * icp备案
     */
    private String icpRecord;
    /**
     * 关键词
     */
    private String keyWord;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * title
     */
    private String title;
    /**
     * 描述信息
     */
    private String descriptionInfo;
    /**
     * 网站标志
     */
    private String intenetFlag;
    /**
     * 域名地址
     */
    private String domainAddress;
    /**
     * 删除标志
     */
    private String deleteFlag;
    /**
     * 录入人员
     */
    private String inputPeople;
    /**
     * 更新人员
     */
    private String updatePeople;
    /**
     * 删除人员
     */
    private String deletePeople;
    /**
     * 录入时间
     */
    private String inputTime;
    /**
     * 更新时间
     */
    private String updateTime;
    /**
     * 删除时间
     */
    private String delelteTime;

    public String getIntenetFlag() {
        return intenetFlag;
    }

    public void setIntenetFlag(String intenetFlag) {
        this.intenetFlag = intenetFlag;
    }

    public String getDomainAddress() {
        return domainAddress;
    }

    public void setDomainAddress(String domainAddress) {
        this.domainAddress = domainAddress;
    }

    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getAgencyCode() {
        return agencyCode;
    }

    public void setAgencyCode(String agencyCode) {
        this.agencyCode = agencyCode;
    }

    public String getCompanyLogo() {
        return companyLogo;
    }

    public void setCompanyLogo(String companyLogo) {
        this.companyLogo = companyLogo;
    }

    public String getServicePhone() {
        return servicePhone;
    }

    public void setServicePhone(String servicePhone) {
        this.servicePhone = servicePhone;
    }

    public String getCopyrightInfo() {
        return copyrightInfo;
    }

    public void setCopyrightInfo(String copyrightInfo) {
        this.copyrightInfo = copyrightInfo;
    }

    public String getIcpRecord() {
        return icpRecord;
    }

    public void setIcpRecord(String icpRecord) {
        this.icpRecord = icpRecord;
    }

    public String getKeyWord() {
        return keyWord;
    }

    public void setKeyWord(String keyWord) {
        this.keyWord = keyWord;
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

    public String getInputTime() {
        return inputTime;
    }

    public void setInputTime(String inputTime) {
        this.inputTime = inputTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getDelelteTime() {
        return delelteTime;
    }

    public void setDelelteTime(String delelteTime) {
        this.delelteTime = delelteTime;
    }
}
