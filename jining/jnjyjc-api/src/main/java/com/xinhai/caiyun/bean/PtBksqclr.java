package com.xinhai.caiyun.bean;

import java.util.Date;

/**
 * Created by zhangzixiang  on 2018/3/14
 * 补卡申请处理人
 */
public class PtBksqclr {
    /**主键id*/
    private Long id;
    /**补卡申请UUID*/
    private String bksqId;
    /**职员代码*/
    private String zydm;
    /**职员名称*/
    private String zymc;
    /**部门编码*/
    private String bmbm;
    /**部门名称*/
    private String bmmc;
    /**人员标识0审批人1抄送人*/
    private Integer rybs;
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

    public String getBksqId() {
        return bksqId;
    }

    public void setBksqId(String bksqId) {
        this.bksqId = bksqId;
    }

    public String getZydm() {
        return zydm;
    }

    public void setZydm(String zydm) {
        this.zydm = zydm;
    }

    public String getZymc() {
        return zymc;
    }

    public void setZymc(String zymc) {
        this.zymc = zymc;
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

    public Integer getRybs() {
        return rybs;
    }

    public void setRybs(Integer rybs) {
        this.rybs = rybs;
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
