package com.xinhai.caiyun.customermanage.api;

import java.io.Serializable;
import java.util.Date;

/**
 * @author 
 */
public class PtZjsqJjjl implements Serializable {
    /**
     * ID，自增列
     */
    private Long id;

    /**
     * 证件收取ID
     */
    private Long zjsqid;

    /**
     * 证件代码年月日时分秒+随机数
     */
    private String zjdm;

    /**
     * 证件名称
     */
    private String zjmc;

    /**
     * 证件描述
     */
    private String zjms;

    /**
     * 证件数量
     */
    private Integer zjsl;

    /**
     * 交接次数收取及归还各算一次交接
     */
    private Integer jjcs;

    /**
     * 交接状态000:无交接；001收取；002归还
     */
    private String jjzt;

    /**
     * 交接信息
     */
    private String jjxx;

    /**
     * 客户编码
     */
    private String khbm;

    /**
     * 代理机构编码
     */
    private String dljgBm;

    /**
     * 代理机构名称
     */
    private String dljgMc;

    /**
     * 删除标志
     */
    private Boolean scbz;

    /**
     * 录入人员（代码）
     */
    private String lrry;

    /**
     * 更新人员（代码）
     */
    private String gxry;

    /**
     * 删除人员（代码）
     */
    private String scry;

    /**
     * 录入日期收取或归还时间
     */
    private Date lrrq;

    /**
     * 更新日期
     */
    private Date gxrq;

    /**
     * 删除日期
     */
    private Date scrq;

    private static final long serialVersionUID = 1L;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getZjsqid() {
        return zjsqid;
    }

    public void setZjsqid(Long zjsqid) {
        this.zjsqid = zjsqid;
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

    public Integer getZjsl() {
        return zjsl;
    }

    public void setZjsl(Integer zjsl) {
        this.zjsl = zjsl;
    }

    public Integer getJjcs() {
        return jjcs;
    }

    public void setJjcs(Integer jjcs) {
        this.jjcs = jjcs;
    }

    public String getJjzt() {
        return jjzt;
    }

    public void setJjzt(String jjzt) {
        this.jjzt = jjzt;
    }

    public String getJjxx() {
        return jjxx;
    }

    public void setJjxx(String jjxx) {
        this.jjxx = jjxx;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }

    public String getDljgBm() {
        return dljgBm;
    }

    public void setDljgBm(String dljgBm) {
        this.dljgBm = dljgBm;
    }

    public String getDljgMc() {
        return dljgMc;
    }

    public void setDljgMc(String dljgMc) {
        this.dljgMc = dljgMc;
    }

    public Boolean getScbz() {
        return scbz;
    }

    public void setScbz(Boolean scbz) {
        this.scbz = scbz;
    }

    public String getLrry() {
        return lrry;
    }

    public void setLrry(String lrry) {
        this.lrry = lrry;
    }

    public String getGxry() {
        return gxry;
    }

    public void setGxry(String gxry) {
        this.gxry = gxry;
    }

    public String getScry() {
        return scry;
    }

    public void setScry(String scry) {
        this.scry = scry;
    }

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
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
}