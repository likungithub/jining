package com.xinhai.rolemanager.entity;




import java.util.Date;

import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 角色表
 * @author 李茂飞修改
 *
 */
@Table(name = "role")
public class Role {
    
    /**
     * UUID
     */
    private String id;
        
    /**
     * 角色名称
     */
    private String name;
    
    /**
     * 角色介绍
     */
    private String remark;
    
    /**
     * 创建人UUID
     */
    private String customerId;
    
    /**
     * 排序
     */
    private int orderNo;

    /**
     * 主键id
     */
    @Id
    private int jsdm;

    /**
     * 纳税人识别号
     */
    private String nsrsbh;
    
    /**
     * 代理机构编码
     */
    private String dljgBm;
    
    /**
     * 职员代码
     */
    private int zydm;
    
    /**
     * 角色标志
     */
    private String jsbz;
    
    /**
     * 备注（预留）
     */
    private String bzxx;
    
    /**
     * 创建日期
     */
    private Date createDate;
    
    /**
     * 更新日期
     */
    private Date gxrq;
    
    /**
     * 删除日期
     */
    private Date scrq;

    private boolean scbz;

    public boolean isScbz() {
        return scbz;
    }

    public void setScbz(boolean scbz) {
        this.scbz = scbz;
    }

    public String getJsbz() {
        return jsbz;
    }

    public void setJsbz(String jsbz) {
        this.jsbz = jsbz;
    }

    public int getJsdm() {
        return jsdm;
    }

    public void setJsdm(int jsdm) {
        this.jsdm = jsdm;
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

    public int getZydm() {
        return zydm;
    }

    public void setZydm(int zydm) {
        this.zydm = zydm;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getGxrq() {
        return gxrq;
    }

    public void setGxrq(Date gxrq) {
        this.gxrq = gxrq;
    }

    public Date getScrq() {
        return scrq;
    }

    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public int getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(int orderNo) {
        this.orderNo = orderNo;
    }
}
