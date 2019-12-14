package com.xinhai.caiyun.systemmanager.api;

import java.math.BigDecimal;
import java.util.Date;

public class Fygl {
    
    /**
     * 编号
     */
    private long id;
    
    /**
     * 收费类型名称
     */
    private String sflx_mc;
    
    /**
     * 收费类型代码
     */
    private String sflx_dm;
    
    /**
     * 产品费用
     */
    private BigDecimal cpfy;
    
    /**
     * 缴费年数
     */
    private int jfns;
    
    /**
     * 费用折扣
     */
    private int fyzk;
    
    /**
     * 实际费用
     */
    private BigDecimal sjfy;
    
    /**
     * 备注信息
     */
    private String bzxx;
    
    /**
     * 套餐图片
     */
    private String tctp;
    
    /**
     * 删除标志
     */
    private int scbz;
    
    /**
     * 录入人
     */
    private String lrry;
    
    /**
     * 更新人
     */
    private String gxry;
    
    /**
     * 删除人
     */
    private String scry;
    
    /**
     * 录入日期
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSflx_mc() {
        return sflx_mc;
    }

    public void setSflx_mc(String sflx_mc) {
        this.sflx_mc = sflx_mc;
    }

    public String getSflx_dm() {
        return sflx_dm;
    }

    public void setSflx_dm(String sflx_dm) {
        this.sflx_dm = sflx_dm;
    }

    public BigDecimal getCpfy() {
        return cpfy;
    }

    public void setCpfy(BigDecimal cpfy) {
        this.cpfy = cpfy;
    }

    public int getJfns() {
        return jfns;
    }

    public void setJfns(int jfns) {
        this.jfns = jfns;
    }

    public int getFyzk() {
        return fyzk;
    }

    public void setFyzk(int fyzk) {
        this.fyzk = fyzk;
    }

    public BigDecimal getSjfy() {
        return sjfy;
    }

    public void setSjfy(BigDecimal sjfy) {
        this.sjfy = sjfy;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    public String getTctp() {
        return tctp;
    }

    public void setTctp(String tctp) {
        this.tctp = tctp;
    }

    public int getScbz() {
        return scbz;
    }

    public void setScbz(int scbz) {
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
