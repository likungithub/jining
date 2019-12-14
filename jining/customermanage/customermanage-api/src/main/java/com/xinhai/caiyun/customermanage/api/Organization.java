package com.xinhai.caiyun.customermanage.api;

import java.io.Serializable;

/**
 * 权限部门
 * 
 * @author jiangh
 *
 */
public class Organization implements Serializable {
    private static final long serialVersionUID = 1L;
    private String id;
    /**
     * 部门编码
     */
    private Long departmentNumber;
    /**
     * 部门代码
     */
    private String departmentCode;
    /**
     * 部门名称
     */
    private String departmentName;
    /**
     * 部门父节点
     */
    private String parentId;
    /**
     * 是否独立应用组织
     */
    private String isIndependent;
    /**
     * 部门类型
     */
    private String departmentType;
    /**
     * 路径
     */
    private String path;
    /**
     * 配注
     */
    private String remark;
    /**
     * 排序
     */
    private Integer orderNo;
    /**
     * 客户id
     */
    private String customerId;
    /**
     * 是否删除
     */
    private Long isDelete;
    /**
     * 末级菜单 Y是；N否
     */
    private Long finalStageMenu;
    /**
     * 纳税人识别号
     */
    private String taxpayerCode;
    /**
     * 代理机构编码
     */
    private String agencyNumber;
    /**
     * 录入日期
     */
    private String insertTime;
    /**
     * 更新日期
     */
    private String updateTime;
    /**
     * 删除日期
     */
    private String deleteTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getDepartmentNumber() {
        return departmentNumber;
    }

    public void setDepartmentNumber(Long departmentNumber) {
        this.departmentNumber = departmentNumber;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getIsIndependent() {
        return isIndependent;
    }

    public void setIsIndependent(String isIndependent) {
        this.isIndependent = isIndependent;
    }

    public String getDepartmentType() {
        return departmentType;
    }

    public void setDepartmentType(String departmentType) {
        this.departmentType = departmentType;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {
        this.orderNo = orderNo;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public Long getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Long isDelete) {
        this.isDelete = isDelete;
    }

    public Long getFinalStageMenu() {
        return finalStageMenu;
    }

    public void setFinalStageMenu(Long finalStageMenu) {
        this.finalStageMenu = finalStageMenu;
    }

    public String getTaxpayerCode() {
        return taxpayerCode;
    }

    public void setTaxpayerCode(String taxpayerCode) {
        this.taxpayerCode = taxpayerCode;
    }

    public String getAgencyNumber() {
        return agencyNumber;
    }

    public void setAgencyNumber(String agencyNumber) {
        this.agencyNumber = agencyNumber;
    }

    public String getInsertTime() {
        return insertTime;
    }

    public void setInsertTime(String insertTime) {
        this.insertTime = insertTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getDeleteTime() {
        return deleteTime;
    }

    public void setDeleteTime(String deleteTime) {
        this.deleteTime = deleteTime;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    @Override
    public String toString() {
        return "Organization [id=" + id + ", departmentNumber="
                + departmentNumber + ", departmentCode=" + departmentCode
                + ", departmentName=" + departmentName + ", parentId="
                + parentId + ", isIndependent=" + isIndependent
                + ", departmentType=" + departmentType + ", path=" + path
                + ", remark=" + remark + ", orderNo=" + orderNo
                + ", customerId=" + customerId + ", isDelete=" + isDelete
                + ", finalStageMenu=" + finalStageMenu + ", taxpayerCode="
                + taxpayerCode + ", agencyNumber=" + agencyNumber
                + ", insertTime=" + insertTime + ", updateTime=" + updateTime
                + ", deleteTime=" + deleteTime + "]";
    }

}
