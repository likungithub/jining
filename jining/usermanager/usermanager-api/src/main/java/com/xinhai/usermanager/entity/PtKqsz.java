package com.xinhai.usermanager.entity;

import java.util.Date;

public class PtKqsz {
    /**
     * 自增id
     */
    private long id;

    /**
     * 代理机构编码
     */
    private String dljgBm;

    /**
     * 考勤编码
     */
    private String kqbh;

    /**
     * 上班时间 如 8:00
     */
    private String sbsj;

    /**
     * 下班时间 如 17:00
     */
    private String xbsj;

    /**
     * 休息时间起 如 12:00
     */
    private String xxsjq;

    /**
     * 休息时间止 如 13:00
     */
    private String xxsjz;

    /**
     * 试用范围 试用那个部门
     */
    private String syfw;

    /**
     * 打卡有效范围
     */
    private int dkyxfw;

    /**
     * 补卡期限
     */
    private int bkqx;

    /**
     * 加班开始时间
     */
    private String jbkssj;

    /**
     * 是否关联wifi  true 关联 false 不关联
     */
    private Boolean sfglwf;

    /**
     * 删除标志 true 删除 false 未删除
     */
    private Boolean scbz;

    /**
     * 录入人员
     */
    private String lrry;

    /**
     * 更新人员
     */
    private String gxry;
    /**
     * 删除人员
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

    /**
     * 工作日设置
     */
    private String gzrsz;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDljgBm() {
        return dljgBm;
    }

    public void setDljgBm(String dljgBm) {
        this.dljgBm = dljgBm;
    }

    public String getKqbh() {
        return kqbh;
    }

    public void setKqbh(String kqbh) {
        this.kqbh = kqbh;
    }

    public String getSbsj() {
        return sbsj;
    }

    public void setSbsj(String sbsj) {
        this.sbsj = sbsj;
    }

    public String getXbsj() {
        return xbsj;
    }

    public void setXbsj(String xbsj) {
        this.xbsj = xbsj;
    }

    public String getXxsjq() {
        return xxsjq;
    }

    public void setXxsjq(String xxsjq) {
        this.xxsjq = xxsjq;
    }

    public String getXxsjz() {
        return xxsjz;
    }

    public void setXxsjz(String xxsjz) {
        this.xxsjz = xxsjz;
    }

    public String getSyfw() {
        return syfw;
    }

    public void setSyfw(String syfw) {
        this.syfw = syfw;
    }

    public int getDkyxfw() {
        return dkyxfw;
    }

    public void setDkyxfw(int dkyxfw) {
        this.dkyxfw = dkyxfw;
    }

    public int getBkqx() {
        return bkqx;
    }

    public void setBkqx(int bkqx) {
        this.bkqx = bkqx;
    }

    public String getJbkssj() {
        return jbkssj;
    }

    public void setJbkssj(String jbkssj) {
        this.jbkssj = jbkssj;
    }

    public Boolean getSfglwf() {
        return sfglwf;
    }

    public void setSfglwf(Boolean sfglwf) {
        this.sfglwf = sfglwf;
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

    public String getGzrsz() {
        return gzrsz;
    }

    public void setGzrsz(String gzrsz) {
        this.gzrsz = gzrsz;
    }
}
