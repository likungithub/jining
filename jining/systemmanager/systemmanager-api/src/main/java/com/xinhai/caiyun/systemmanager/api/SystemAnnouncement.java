package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 * Created by huxinquan on 2017/6/27.
 * 系统公告
 */
public class SystemAnnouncement {

    private  String jsflx;
    private  String khflmc;
    private  String khfldm;

    public String getJsflx() {
        return jsflx;
    }

    public void setJsflx(String jsflx) {
        this.jsflx = jsflx;
    }

    public String getKhflmc() {
        return khflmc;
    }

    public void setKhflmc(String khflmc) {
        this.khflmc = khflmc;
    }

    public String getKhfldm() {
        return khfldm;
    }

    public void setKhfldm(String khfldm) {
        this.khfldm = khfldm;
    }

    /**
     * id
     */
    private int id;
    /**
     * 通知通告ID
     */
    private String systemAnnouncementId;
    /**
     * 公告名称
     */
    private String announcementName;
    /**
     * 公告内容
     */
    private String announcementContent;
    /**
     * 公告类型编码
     */
    private int announcementTypeCode;
    /**
     * 公告描述
     */
    private String announcementDescription;
    /**
     * 关键词
     */
    private String keyword;
    /**
     * 置顶状态
     */
    private int isTop;
    /**
     * 公告来源
     */
    private String announcementSource;
    /**
     * 区域代码
     */
    private int areaNumber;
    /**
     * 纳税人识别号
     */
    private String taxpayerIdentificationNumber;
    /**
     * 代理机构编码
     */
    private String agencyCode;
    /**
     * 删除标志
     */
    private int isDelete;
    /**
     * 录入人员
     */
    private String enterStaff;
    /**
     * 更新人员
     */
    private String updateStaff;
    /**
     * 删除人员
     */
    private String deleteStaff;
    /**
     * 录入日期
     */
    private Date enterDate;
    /**
     * 更新日期
     */
    private Date updateDate;
    /**
     * 删除日期
     */
    private Date deleteDate;

    private String tzNumber;
    public String getTzNumber() {
        return tzNumber;
    }

    public void setTzNumber(String tzNumber) {
        this.tzNumber = tzNumber;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSystemAnnouncementId() {
        return systemAnnouncementId;
    }

    public void setSystemAnnouncementId(String systemAnnouncementId) {
        this.systemAnnouncementId = systemAnnouncementId;
    }

    public String getAnnouncementName() {
        return announcementName;
    }

    public void setAnnouncementName(String announcementName) {
        this.announcementName = announcementName;
    }

    public String getAnnouncementContent() {
        return announcementContent;
    }

    public void setAnnouncementContent(String announcementContent) {
        this.announcementContent = announcementContent;
    }

    public int getAnnouncementTypeCode() {
        return announcementTypeCode;
    }

    public void setAnnouncementTypeCode(int announcementTypeCode) {
        this.announcementTypeCode = announcementTypeCode;
    }

    public String getAnnouncementDescription() {
        return announcementDescription;
    }

    public void setAnnouncementDescription(String announcementDescription) {
        this.announcementDescription = announcementDescription;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public int getIsTop() {
        return isTop;
    }

    public void setIsTop(int isTop) {
        this.isTop = isTop;
    }

    public String getAnnouncementSource() {
        return announcementSource;
    }

    public void setAnnouncementSource(String announcementSource) {
        this.announcementSource = announcementSource;
    }

    public int getAreaNumber() {
        return areaNumber;
    }

    public void setAreaNumber(int areaNumber) {
        this.areaNumber = areaNumber;
    }

    public String getTaxpayerIdentificationNumber() {
        return taxpayerIdentificationNumber;
    }

    public void setTaxpayerIdentificationNumber(String taxpayerIdentificationNumber) {
        this.taxpayerIdentificationNumber = taxpayerIdentificationNumber;
    }

    public String getAgencyCode() {
        return agencyCode;
    }

    public void setAgencyCode(String agencyCode) {
        this.agencyCode = agencyCode;
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

    @Override
    public String toString() {
        return "SystemAnnouncement{" +
                "id=" + id +
                ", systemAnnouncementId='" + systemAnnouncementId + '\'' +
                ", announcementName='" + announcementName + '\'' +
                ", announcementContent='" + announcementContent + '\'' +
                ", announcementTypeCode=" + announcementTypeCode +
                ", announcementDescription='" + announcementDescription + '\'' +
                ", keyword='" + keyword + '\'' +
                ", isTop=" + isTop +
                ", announcementSource='" + announcementSource + '\'' +
                ", areaNumber=" + areaNumber +
                ", taxpayerIdentificationNumber='" + taxpayerIdentificationNumber + '\'' +
                ", agencyCode='" + agencyCode + '\'' +
                ", isDelete=" + isDelete +
                ", enterStaff='" + enterStaff + '\'' +
                ", updateStaff='" + updateStaff + '\'' +
                ", deleteStaff='" + deleteStaff + '\'' +
                ", enterDate=" + enterDate +
                ", updateDate=" + updateDate +
                ", deleteDate=" + deleteDate +
                '}';
    }
}
