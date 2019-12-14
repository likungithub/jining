package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;


public class Zjgl implements java.io.Serializable {

    /** ID，自增列 */
    private Long id;
    
    private String dljgBm;
    private String dljgMc;
    
    /** 证件代码 */
    private String zjdm;
    
    /** 证件名称 */
    private String zjmc;

    /** 证件描述 */
    private String zjms;
    
    /** 删除标志1：已删除、0：未删除 */
    private Integer scbz;
    
    /** 录入人员 */
    private String lrry;
    
    /** 更新人员 */
    private String gxry;
    
    /** 删除人员 */
    private String scry;
    
    /** 录入日期 */
    private Date lrrq;
    
    /** 更新日期 */
    private Date gxrq;
    
    /** 删除日期 */
    private Date scrq;
    
    /**
     * 获取ID，自增列
     * 
     * @return ID
     */
    public Long getId() {
        return this.id;
    }

    public String getDljgMc() {
        return dljgMc;
    }

    public void setDljgMc(String dljgMc) {
        this.dljgMc = dljgMc;
    }

    /**
     * 设置ID，自增列
     * 
     * @param id
     *          ID，自增列
     */
    public void setId(Long id) {
        this.id = id;
    }
    
    /**
     * 获取代理机构编码与PT_YHXX表中的DLJG_BM进行关联
     * 
     * @return 代理机构编码与PT_YHXX表中的DLJG_BM进行关联
     */
    public String getDljgBm() {
        return this.dljgBm;
    }
     
    /**
     * 设置代理机构编码与PT_YHXX表中的DLJG_BM进行关联
     * 
     * @param dljgBm
     *          代理机构编码与PT_YHXX表中的DLJG_BM进行关联
     */
    public void setDljgBm(String dljgBm) {
        this.dljgBm = dljgBm;
    }

    public String getZjdm() {
        return zjdm;
    }

    public void setZjdm(String zjdm) {
        this.zjdm = zjdm;
    }

    public String getZjmc() {
        return zjmc;
    }

    public void setZjmc(String zjmc) {
        this.zjmc = zjmc;
    }

    public String getZjms() {
        return zjms;
    }

    public void setZjms(String zjms) {
        this.zjms = zjms;
    }

    /**
     * 获取删除标志1：已删除、0：未删除
     * 
     * @return 删除标志1
     */
    public Integer getScbz() {
        return this.scbz;
    }
     
    /**
     * 设置删除标志1：已删除、0：未删除
     * 
     * @param scbz
     *          删除标志1：已删除、0：未删除
     */
    public void setScbz(Integer scbz) {
        this.scbz = scbz;
    }
    
    /**
     * 获取录入人员
     * 
     * @return 录入人员
     */
    public String getLrry() {
        return this.lrry;
    }
     
    /**
     * 设置录入人员
     * 
     * @param lrry
     *          录入人员
     */
    public void setLrry(String lrry) {
        this.lrry = lrry;
    }
    
    /**
     * 获取更新人员
     * 
     * @return 更新人员
     */
    public String getGxry() {
        return this.gxry;
    }
     
    /**
     * 设置更新人员
     * 
     * @param gxry
     *          更新人员
     */
    public void setGxry(String gxry) {
        this.gxry = gxry;
    }
    
    /**
     * 获取删除人员
     * 
     * @return 删除人员
     */
    public String getScry() {
        return this.scry;
    }
     
    /**
     * 设置删除人员
     * 
     * @param scry
     *          删除人员
     */
    public void setScry(String scry) {
        this.scry = scry;
    }
    
    /**
     * 获取录入日期
     * 
     * @return 录入日期
     */
    public Date getLrrq() {
        return this.lrrq;
    }
     
    /**
     * 设置录入日期
     * 
     * @param lrrq
     *          录入日期
     */
    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }
    
    /**
     * 获取更新日期
     * 
     * @return 更新日期
     */
    public Date getGxrq() {
        return this.gxrq;
    }
     
    /**
     * 设置更新日期
     * 
     * @param gxrq
     *          更新日期
     */
    public void setGxrq(Date gxrq) {
        this.gxrq = gxrq;
    }
    
    /**
     * 获取删除日期
     * 
     * @return 删除日期
     */
    public Date getScrq() {
        return this.scrq;
    }
     
    /**
     * 设置删除日期
     * 
     * @param scrq
     *          删除日期
     */
    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }
}