package com.xinhai.caiyun.customermanage.api;

import java.util.Date;

public class Cfjl {
    
    /**
     * 编号
     */
    private long id;
    
    /**
     * 催费编号
     */
    private String cfbh;
    
    /**
     * 代理机构编码
     */
    private String dljg_bm;
    
    /**
     * 公司名称
     */
    private String gsmc;
    
    /**
     * 提醒方式
     */
    private int txfs;
    
    /**
     * 催费时间
     */
    private Date cfsj;
    
    /**
     * 催费内容
     */
    private String cfnr;
    
    /**
     * 删除标志
     */
    private int scbz;
    
    /**
     * 录入人名称
     */
    private String lrrmc;
    
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

    public String getCfbh() {
        return cfbh;
    }

    public void setCfbh(String cfbh) {
        this.cfbh = cfbh;
    }

    public String getDljg_bm() {
        return dljg_bm;
    }

    public void setDljg_bm(String dljg_bm) {
        this.dljg_bm = dljg_bm;
    }

    public String getGsmc() {
        return gsmc;
    }

    public void setGsmc(String gsmc) {
        this.gsmc = gsmc;
    }

    public int getTxfs() {
        return txfs;
    }

    public void setTxfs(int txfs) {
        this.txfs = txfs;
    }

    public String getCfnr() {
        return cfnr;
    }

    public void setCfnr(String cfnr) {
        this.cfnr = cfnr;
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

    public Date getCfsj() {
        return cfsj;
    }

    public void setCfsj(Date cfsj) {
        this.cfsj = cfsj;
    }

    public String getLrrmc() {
        return lrrmc;
    }

    public void setLrrmc(String lrrmc) {
        this.lrrmc = lrrmc;
    }
    
}
