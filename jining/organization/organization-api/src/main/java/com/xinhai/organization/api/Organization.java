package com.xinhai.organization.api;

import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * 组织结构实体类
 * @author 李茂飞
 *
 */
@Table(name = "organization")
public class Organization implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 部门id 自增
     */
    @Id
    private Long bmid;

    /**
     * UUID
     */
    private String id;
    
    /**
     * 部门代码（区分依据）
     */
    private String code;
    
    /**
     * 部门名称
     */
    private String name;
    
    /**
     * 部门父节点
     */
    private String parentId;
    
    /**
     * 部门父节点
     */
    private String parent_code;
    
    /**
     * 是否为独立应用组织
     */
    private Boolean independent;
    
    /**
     * 组织类型
     */
    private String orgType;
    
    /**
     *  not know
     */
    private String path;
    
    /**
     * 备注
     */
    private String remark;
    
    /**
     * 排序
     */
    private int orderNo;
    
    /**
     * 客户UUID
     */
    private String customerId;
    
    /**
     * 是否删除
     */
    private Boolean isDelete;
    
    /**
     * 是否为末节组织
     */
    private Boolean mjcd;
    
    /**
     * 纳税人识别号
     */
    private String nsrsbh;
    
    /**
     * 代理机构编码
     */
    private String dljgBm;
    
    /**
     * 录入日期
     */
    private Date lrrq;
    
    /**
     * 更新日期
     */
    private Date updateDate;
    
    /**
     * 删除日期
     */
    private Date scrq;

    public String getParent_code() {
        return parent_code;
    }

    public void setParent_code(String parent_code) {
        this.parent_code = parent_code;
    }

    public Long getBmid() {
        return bmid;
    }

    public void setBmid(Long bmid) {
        this.bmid = bmid;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public Boolean getIndependent() {
        return independent;
    }

    public void setIndependent(Boolean independent) {
        this.independent = independent;
    }

    public String getOrgType() {
        return orgType;
    }

    public void setOrgType(String orgType) {
        this.orgType = orgType;
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

    public int getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(int orderNo) {
        this.orderNo = orderNo;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public Boolean getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Boolean isDelete) {
        this.isDelete = isDelete;
    }

    public Boolean getMjcd() {
        return mjcd;
    }

    public void setMjcd(Boolean mjcd) {
        this.mjcd = mjcd;
    }

    public String getNsrsbh() {
        return nsrsbh;
    }

    public void setNsrsbh(String nsrsbh) {
        this.nsrsbh = nsrsbh;
    }

    public String getDljgBm() {
        return dljgBm;
    }

    public void setDljgBm(String dljgBm) {
        this.dljgBm = dljgBm;
    }

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public Date getScrq() {
        return scrq;
    }

    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }

}
