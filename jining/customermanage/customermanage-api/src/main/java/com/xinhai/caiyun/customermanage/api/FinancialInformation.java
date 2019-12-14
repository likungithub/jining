package com.xinhai.caiyun.customermanage.api;

import java.util.Date;

/**
 * 财务信息
 * @author huxinquan
 */
public class FinancialInformation {
    /**
     * id
     */
    private int id;
    /**
     * 代理机构编码
     */
    private String agencyCode;
    /**
     * 客户编码
     */
    private String customerCode;
    /**
     * 客户公司名称
     */
    private String customerCompany;
    /**
     * 时间单元
     */
    private Date timeUnit;
    /**
     * 分组标志
     */
    private String groupFlag;
    /**
     * 资产负债表填写标志
     */
    private int balanceSheetFlag;
    /**
     * 利润表填写标志
     */
    private int profitFlag;
    /**
     * 现金流量表填写标志
     */
    private int cashFlowStatementsFlag;
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

    public String getAgencyCode() {
        return agencyCode;
    }

    public void setAgencyCode(String agencyCode) {
        this.agencyCode = agencyCode;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getCustomerCompany() {
        return customerCompany;
    }

    public void setCustomerCompany(String customerCompany) {
        this.customerCompany = customerCompany;
    }

    public Date getTimeUnit() {
        return timeUnit;
    }

    public void setTimeUnit(Date timeUnit) {
        this.timeUnit = timeUnit;
    }

    public String getGroupFlag() {
        return groupFlag;
    }

    public void setGroupFlag(String groupFlag) {
        this.groupFlag = groupFlag;
    }

    public int getBalanceSheetFlag() {
        return balanceSheetFlag;
    }

    public void setBalanceSheetFlag(int balanceSheetFlag) {
        this.balanceSheetFlag = balanceSheetFlag;
    }

    public int getProfitFlag() {
        return profitFlag;
    }

    public void setProfitFlag(int profitFlag) {
        this.profitFlag = profitFlag;
    }

    public int getCashFlowStatementsFlag() {
        return cashFlowStatementsFlag;
    }

    public void setCashFlowStatementsFlag(int cashFlowStatementsFlag) {
        this.cashFlowStatementsFlag = cashFlowStatementsFlag;
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
        return "FinancialInformation{" +
                "id=" + id +
                ", agencyCode='" + agencyCode + '\'' +
                ", customerCode='" + customerCode + '\'' +
                ", customerCompany='" + customerCompany + '\'' +
                ", timeUnit=" + timeUnit +
                ", groupFlag='" + groupFlag + '\'' +
                ", profitFlag=" + profitFlag +
                ", balanceSheetFlag=" + balanceSheetFlag +
                ", cashFlowStatementsFlag=" + cashFlowStatementsFlag +
                ", enterStaff='" + enterStaff + '\'' +
                ", updateStaff='" + updateStaff + '\'' +
                ", deleteStaff='" + deleteStaff + '\'' +
                ", enterDate=" + enterDate +
                ", updateDate=" + updateDate +
                ", deleteDate=" + deleteDate +
                '}';
    }
}
