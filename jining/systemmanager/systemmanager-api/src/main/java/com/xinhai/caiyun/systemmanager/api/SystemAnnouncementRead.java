package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 * Created by huxinquan on 2017/6/30.
 * 公告阅读情况
 */
public class SystemAnnouncementRead {


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
     * 公告类型编码
     */
    private int announcementTypeCode;
    /**
     * 公告类型名称
     */
    private String announcementTypeName;
    /**
     * 代理机构编码
     */
    private String agencyCode;
    /**
     * 职员代码
     */
    private String staffNumber;
    /**
     * 置顶状态
     */
    private int isTop;
    /**
     * 已读状态
     */
    private int isRead;
    /**
     * 删除标志
     */
    private int isDelete;
    /**
     * 发布日期
     */
    private Date publishDate;
    /**
     * 阅读日期
     */
    private Date readDate;
    /**
     * 删除日期
     */
    private Date deleteDate;

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

    public int getAnnouncementTypeCode() {
        return announcementTypeCode;
    }

    public void setAnnouncementTypeCode(int announcementTypeCode) {
        this.announcementTypeCode = announcementTypeCode;
    }

    public String getAnnouncementTypeName() {
        return announcementTypeName;
    }

    public void setAnnouncementTypeName(String announcementTypeName) {
        this.announcementTypeName = announcementTypeName;
    }

    public String getAgencyCode() {
        return agencyCode;
    }

    public void setAgencyCode(String agencyCode) {
        this.agencyCode = agencyCode;
    }

    public String getStaffNumber() {
        return staffNumber;
    }

    public void setStaffNumber(String staffNumber) {
        this.staffNumber = staffNumber;
    }

    public int getIsTop() {
        return isTop;
    }

    public void setIsTop(int isTop) {
        this.isTop = isTop;
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

    public Date getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    public Date getReadDate() {
        return readDate;
    }

    public void setReadDate(Date readDate) {
        this.readDate = readDate;
    }

    public Date getDeleteDate() {
        return deleteDate;
    }

    public void setDeleteDate(Date deleteDate) {
        this.deleteDate = deleteDate;
    }

    @Override
    public String toString() {
        return "SystemAnnouncementRead{" +
                "id=" + id +
                ", systemAnnouncementId='" + systemAnnouncementId + '\'' +
                ", announcementName='" + announcementName + '\'' +
                ", announcementTypeCode=" + announcementTypeCode +
                ", announcementTypeName='" + announcementTypeName + '\'' +
                ", agencyCode='" + agencyCode + '\'' +
                ", staffNumber='" + staffNumber + '\'' +
                ", isTop=" + isTop +
                ", isRead=" + isRead +
                ", isDelete=" + isDelete +
                ", publishDate=" + publishDate +
                ", readDate=" + readDate +
                ", deleteDate=" + deleteDate +
                '}';
    }
}
