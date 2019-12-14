package com.xinhai.caiyun.systemmanager.api;

import java.math.BigInteger;
import java.util.Date;

/**
 * Created by Administrator on 2018/2/23 0023.
 */
public class DomainNameOther {
    /**
     * id
     */
    private BigInteger id;
    /**
     * 关键词
     */
    private String keyWord;
    /**
     * 代理机构编码
     */
    private String agencyCode;
    /**
     * 栏目编码
     */
    private String columnCode;
    /**
     * 栏目描述
     */
    private String columnDescript;
    /**
     * 栏目内容
     */
    private String columnContent;
    /**
     * 是否启用
     */
    private String ifUsed;
    /**
     * 删除标志
     */
    private String deleteFlag;
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

    public BigInteger getId() {
        return id;
    }

    public String getKeyWord() {
        return keyWord;
    }

    public void setKeyWord(String keyWord) {
        this.keyWord = keyWord;
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

    public String getColumnCode() {
        return columnCode;
    }

    public void setColumnCode(String columnCode) {
        this.columnCode = columnCode;
    }

    public String getColumnContent() {
        return columnContent;
    }

    public void setColumnContent(String columnContent) {
        this.columnContent = columnContent;
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

    public String getColumnDescript() {
        return columnDescript;
    }

    public void setColumnDescript(String columnDescript) {
        this.columnDescript = columnDescript;
    }

    public String getIfUsed() {
        return ifUsed;
    }

    public void setIfUsed(String ifUsed) {
        this.ifUsed = ifUsed;
    }
}
