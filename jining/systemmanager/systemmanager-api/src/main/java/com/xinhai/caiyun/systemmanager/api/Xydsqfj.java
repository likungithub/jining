package com.xinhai.caiyun.systemmanager.api;/*
 * Welcome to use the TableGo Tools.
 * 
 * http://vipbooks.iteye.com
 * http://blog.csdn.net/vipbooks
 * http://www.cnblogs.com/vipbooks
 * 
 * Author:bianj
 * Email:edinsker@163.com
 * Version:4.1.2
 */

import java.util.Date;

/**
 * 信用贷申请附件(PT_XYDSQ＿FJ)
 * 
 * @author bianj
 * @version 1.0.0 2018-01-23
 */
public class Xydsqfj implements java.io.Serializable {
    /** 版本号 */
    private static final long serialVersionUID = 889240743596991711L;
    
    /** ID，自增列 */
    private Long id;
    
    /** 申请ID */
    private String sqid;
    
    /** 附件名称 */
    private String fjmc;
    
    /** 附件存储路径 */
    private String fjcclj;
    
    /** 文件大小 */
    private String wjdx;
    
    /** 文件类型 */
    private String wjlx;
    
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
     * 获取申请ID
     * 
     * @return 申请ID
     */
    public String getSqid() {
        return this.sqid;
    }
     
    /**
     * 设置申请ID
     * 
     * @param sqid
     *          申请ID
     */
    public void setSqid(String sqid) {
        this.sqid = sqid;
    }
    
    /**
     * 获取附件名称
     * 
     * @return 附件名称
     */
    public String getFjmc() {
        return this.fjmc;
    }
     
    /**
     * 设置附件名称
     * 
     * @param fjmc
     *          附件名称
     */
    public void setFjmc(String fjmc) {
        this.fjmc = fjmc;
    }
    
    /**
     * 获取附件存储路径
     * 
     * @return 附件存储路径
     */
    public String getFjcclj() {
        return this.fjcclj;
    }
     
    /**
     * 设置附件存储路径
     * 
     * @param fjcclj
     *          附件存储路径
     */
    public void setFjcclj(String fjcclj) {
        this.fjcclj = fjcclj;
    }
    
    /**
     * 获取文件大小
     * 
     * @return 文件大小
     */
    public String getWjdx() {
        return this.wjdx;
    }
     
    /**
     * 设置文件大小
     * 
     * @param wjdx
     *          文件大小
     */
    public void setWjdx(String wjdx) {
        this.wjdx = wjdx;
    }
    
    /**
     * 获取文件类型
     * 
     * @return 文件类型
     */
    public String getWjlx() {
        return this.wjlx;
    }
     
    /**
     * 设置文件类型
     * 
     * @param wjlx
     *          文件类型
     */
    public void setWjlx(String wjlx) {
        this.wjlx = wjlx;
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