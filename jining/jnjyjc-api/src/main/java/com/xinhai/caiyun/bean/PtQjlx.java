package com.xinhai.caiyun.bean;

import java.util.Date;

/**
 * Created by zhangzixiang  on 2018/3/13
 * 请假类型
 */
public class PtQjlx {

    /**
     * 主键id
     * */
   private Long id;
    /**
     *代理机构编码
     * */
    private String dljgBm;
    /**
     *请假类型代码
     * */
    private String qjlxDm;
    /**
     * 请假类型名称
     * */
    private String qjlxMc;
    /**
     * 删除标志 0未删除 1已删除
     * */
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

    public String getDljgBm() {
        return dljgBm;
    }

    public void setDljgBm(String dljgBm) {
        this.dljgBm = dljgBm;
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
