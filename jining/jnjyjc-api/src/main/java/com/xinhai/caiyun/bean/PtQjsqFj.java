package com.xinhai.caiyun.bean;

import java.util.Date;

/**
 * Created by zhangzixiang  on 2018/3/13
 * 请假申请附件
 */
public class PtQjsqFj {
    /**
     * 主键id
     * */
    private Long id;
    /**请假申请UUID*/
    private String qjsqId;
    /**附件名称*/
    private String fjmc;
    /**附件存储路径*/
    private String fjcclj;
    /**文件大小*/
    private String wjdx;
    /**文件类型*/
    private String wjlx;
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

    public String getQjsqId() {
        return qjsqId;
    }

    public void setQjsqId(String qjsqId) {
        this.qjsqId = qjsqId;
    }

    public String getFjmc() {
        return fjmc;
    }

    public void setFjmc(String fjmc) {
        this.fjmc = fjmc;
    }

    public String getFjcclj() {
        return fjcclj;
    }

    public void setFjcclj(String fjcclj) {
        this.fjcclj = fjcclj;
    }

    public String getWjdx() {
        return wjdx;
    }

    public void setWjdx(String wjdx) {
        this.wjdx = wjdx;
    }

    public String getWjlx() {
        return wjlx;
    }

    public void setWjlx(String wjlx) {
        this.wjlx = wjlx;
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
