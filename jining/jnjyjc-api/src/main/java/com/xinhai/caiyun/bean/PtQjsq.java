package com.xinhai.caiyun.bean;

import java.util.Date;

/**
 * Created by zhangzixiang  on 2018/3/13
 * 请假申请
 */
public class PtQjsq {
    /**主键id*/
    private Long id;
    /**
     * 代理机构编码
     */
    /**请假申请UUID*/
    private String qjsqId;
    /**代理机构编码*/
    private String dljgBm;
    /**部门编码*/
    private String bmbm;
    /**部门名称*/
    private String bmmc;
    /**请假类型代码 001事假002婚假*/
    private String qjlxDm;
    /**请假类型名称*/
    private String qjlxMc;
    /**请假时间起*/
    private Date qjsjQ;
    /**请假时间止*/
    private Date qjsjZ;
    /**请假天数*/
    private Double qjts;
    /**请假事由*/
    private String qjsy;
    /**审批类型*/
    private Integer splx;
    /**审批意见*/
    private String spyj;
    /**审批时间*/
    private Date spsj;
    /**删除标志0未删除1已删除*/
    private Integer scbz;
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
     * 录入人名称
     */
    private String lrryMc;

    /**
     * 更新日期
     */
    private Date gxrq;

    /**
     * 删除日期
     */
    private Date scrq;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQjsqId() {
        return qjsqId;
    }

    public void setQjsqId(String qjsqId) {
        this.qjsqId = qjsqId;
    }

    public String getDljgBm() {
        return dljgBm;
    }

    public void setDljgBm(String dljgBm) {
        this.dljgBm = dljgBm;
    }

    public String getLrryMc() {
        return lrryMc;
    }

    public void setLrryMc(String lrryMc) {
        this.lrryMc = lrryMc;
    }

    public String getBmbm() {
        return bmbm;
    }

    public void setBmbm(String bmbm) {
        this.bmbm = bmbm;
    }

    public String getBmmc() {
        return bmmc;
    }

    public void setBmmc(String bmmc) {
        this.bmmc = bmmc;
    }

    public String getQjlxDm() {
        return qjlxDm;
    }

    public void setQjlxDm(String qjlxDm) {
        this.qjlxDm = qjlxDm;
    }

    public String getQjlxMc() {
        return qjlxMc;
    }

    public void setQjlxMc(String qjlxMc) {
        this.qjlxMc = qjlxMc;
    }

    public Date getQjsjQ() {
        return qjsjQ;
    }

    public void setQjsjQ(Date qjsjQ) {
        this.qjsjQ = qjsjQ;
    }

    public Date getQjsjZ() {
        return qjsjZ;
    }

    public void setQjsjZ(Date qjsjZ) {
        this.qjsjZ = qjsjZ;
    }

    public Double getQjts() {
        return qjts;
    }

    public void setQjts(Double qjts) {
        this.qjts = qjts;
    }

    public String getQjsy() {
        return qjsy;
    }

    public void setQjsy(String qjsy) {
        this.qjsy = qjsy;
    }

    public Integer getSplx() {
        return splx;
    }

    public void setSplx(Integer splx) {
        this.splx = splx;
    }

    public String getSpyj() {
        return spyj;
    }

    public void setSpyj(String spyj) {
        this.spyj = spyj;
    }

    public Date getSpsj() {
        return spsj;
    }

    public void setSpsj(Date spsj) {
        this.spsj = spsj;
    }

    public Integer getScbz() {
        return scbz;
    }

    public void setScbz(Integer scbz) {
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
