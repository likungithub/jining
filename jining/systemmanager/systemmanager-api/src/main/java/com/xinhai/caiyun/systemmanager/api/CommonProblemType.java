package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 * 系统公告类型
 * @author huxinquan
 */
public class CommonProblemType {
    /**
     * id
     */
    private int id;
    /**
     * 常见问题类型名称
     */
    private String commonProblemTypeName;
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCommonProblemTypeName() {
        return commonProblemTypeName;
    }

    public void setCommonProblemTypeName(String commonProblemTypeName) {
        this.commonProblemTypeName = commonProblemTypeName;
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
        return "CommonProblemType{" +
                "id=" + id +
                ", commonProblemTypeName='" + commonProblemTypeName + '\'' +
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
