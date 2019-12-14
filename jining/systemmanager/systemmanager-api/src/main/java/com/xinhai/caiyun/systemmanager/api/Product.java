package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 * 财税360产品
 * @author tangck
 *
 */
public class Product {
    
    /**
     * 编号
     */
    private String id;
    
    /**
     * 产品编号
     */
    private String productNumber;
    
    /**
     * 产品名称
     */
    private String productName;
    
    /**
     * 产品描述
     */
    private String productDescription;
    
    /**
     * 下载地址
     */
    private String downloadAddress;
    
    /**
     * 下载次数
     */
    private int download;
    
    /**
     * 备注信息
     */
    private String remark;
    
    /**
     * 产品图片
     */
    private String productImg;
    
    /**
     * 删除标志
     */
    private int deleteFlag;
    
    /**
     * 录入人员
     */
    private String insertPerson;
    
    /**
     * 更新人员
     */
    private String updatePerson;
    
    /**
     * 删除人员
     */
    private String deletePerson;
    
    /**
     * 录入时间
     */
    private Date insertTime;
    
    /**
     * 更新时间
     */
    private Date updateTime;
    
    /**
     * 删除时间
     */
    private Date deleteTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProductNumber() {
        return productNumber;
    }

    public void setProductNumber(String productNumber) {
        this.productNumber = productNumber;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public String getDownloadAddress() {
        return downloadAddress;
    }

    public void setDownloadAddress(String downloadAddress) {
        this.downloadAddress = downloadAddress;
    }

    public int getDownload() {
        return download;
    }

    public void setDownload(int download) {
        this.download = download;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getProductImg() {
        return productImg;
    }

    public void setProductImg(String productImg) {
        this.productImg = productImg;
    }

    public int getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(int deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public String getInsertPerson() {
        return insertPerson;
    }

    public void setInsertPerson(String insertPerson) {
        this.insertPerson = insertPerson;
    }

    public String getUpdatePerson() {
        return updatePerson;
    }

    public void setUpdatePerson(String updatePerson) {
        this.updatePerson = updatePerson;
    }

    public String getDeletePerson() {
        return deletePerson;
    }

    public void setDeletePerson(String deletePerson) {
        this.deletePerson = deletePerson;
    }

    public Date getInsertTime() {
        return insertTime;
    }

    public void setInsertTime(Date insertTime) {
        this.insertTime = insertTime;
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
