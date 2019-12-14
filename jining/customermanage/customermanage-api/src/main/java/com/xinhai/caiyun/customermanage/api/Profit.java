package com.xinhai.caiyun.customermanage.api;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 利润表
 *
 * @author huxinquan
 */
public class Profit {
    /**
     * id
     */
    private int id;
    /**
     * 分组标志
     */
    private String groupFlag;
    /**
     * 客户编码
     */
    private String customerCode;
    /**
     * 纳税人识别号
     */
    private String taxpayerIdentificationNumber;
    /**
     * 纳税人名称
     */
    private String taxpayerName;
    /**
     * 编制单位
     */
    private String companyName;
    /**
     * 时间单元
     */
    private Date timeUnit;
    /**
     * 行次
     */
    private int lineNumber;
    /**
     * 本月数
     */
    private BigDecimal currentMonth;
    /**
     * 本年累计数
     */
    private BigDecimal currentYear;
    /**
     * 是否补充资料
     */
    private int isSupplementalMaterials;
    /**
     * 单位负责人
     */
    private String principal;
    /**
     * 审核人
     */
    private String auditor;
    /**
     * 制表人
     */
    private String tabulators;
    /**
     * 删除标志
     */
    private int isDelete;
    /**
     * 代理机构编码
     */
    private String agencyCode;
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGroupFlag() {
        return groupFlag;
    }

    public void setGroupFlag(String groupFlag) {
        this.groupFlag = groupFlag;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getTaxpayerIdentificationNumber() {
        return taxpayerIdentificationNumber;
    }

    public void setTaxpayerIdentificationNumber(String taxpayerIdentificationNumber) {
        this.taxpayerIdentificationNumber = taxpayerIdentificationNumber;
    }

    public String getTaxpayerName() {
        return taxpayerName;
    }

    public void setTaxpayerName(String taxpayerName) {
        this.taxpayerName = taxpayerName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public Date getTimeUnit() {
        return timeUnit;
    }

    public void setTimeUnit(Date timeUnit) {
        this.timeUnit = timeUnit;
    }

    public int getLineNumber() {
        return lineNumber;
    }

    public void setLineNumber(int lineNumber) {
        this.lineNumber = lineNumber;
    }

    public BigDecimal getCurrentMonth() {
        return currentMonth;
    }

    public void setCurrentMonth(BigDecimal currentMonth) {
        this.currentMonth = currentMonth;
    }

    public BigDecimal getCurrentYear() {
        return currentYear;
    }

    public void setCurrentYear(BigDecimal currentYear) {
        this.currentYear = currentYear;
    }

    public int getIsSupplementalMaterials() {
        return isSupplementalMaterials;
    }

    public void setIsSupplementalMaterials(int isSupplementalMaterials) {
        this.isSupplementalMaterials = isSupplementalMaterials;
    }

    public String getPrincipal() {
        return principal;
    }

    public void setPrincipal(String principal) {
        this.principal = principal;
    }

    public String getAuditor() {
        return auditor;
    }

    public void setAuditor(String auditor) {
        this.auditor = auditor;
    }

    public String getTabulators() {
        return tabulators;
    }

    public void setTabulators(String tabulators) {
        this.tabulators = tabulators;
    }

    public int getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(int isDelete) {
        this.isDelete = isDelete;
    }

    public String getAgencyCode() {
        return agencyCode;
    }

    public void setAgencyCode(String agencyCode) {
        this.agencyCode = agencyCode;
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
        return "Profit{" +
                "id=" + id +
                ", groupFlag='" + groupFlag + '\'' +
                ", customerCode='" + customerCode + '\'' +
                ", taxpayerIdentificationNumber='" + taxpayerIdentificationNumber + '\'' +
                ", taxpayerName='" + taxpayerName + '\'' +
                ", companyName='" + companyName + '\'' +
                ", timeUnit=" + timeUnit +
                ", lineNumber=" + lineNumber +
                ", currentMonth=" + currentMonth +
                ", currentYear=" + currentYear +
                ", isSupplementalMaterials=" + isSupplementalMaterials +
                ", principal='" + principal + '\'' +
                ", auditor='" + auditor + '\'' +
                ", tabulators='" + tabulators + '\'' +
                ", isDelete=" + isDelete +
                ", agencyCode='" + agencyCode + '\'' +
                ", enterStaff='" + enterStaff + '\'' +
                ", updateStaff='" + updateStaff + '\'' +
                ", deleteStaff='" + deleteStaff + '\'' +
                ", enterDate=" + enterDate +
                ", updateDate=" + updateDate +
                ", deleteDate=" + deleteDate +
                '}';
    }
}
