package com.xinhai.usermanager.entity;

import java.util.Date;

/**
 * Created by Administrator on 2018/3/29 0029.
 */
public class PtKqWiFi {

    /**
     * 编号
     */
    private long id;

    /**
     * 考勤编号
     */
    private String kqbh;

    /**
     * 关联WiFi代码mac地址
     */
    private String glwfdm;

    /**
     * 关联WiFi名称
     */
    private String glwfmc;

    /**
     * 删除标志
     */
    private boolean scbz;

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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getKqbh() {
        return kqbh;
    }

    public void setKqbh(String kqbh) {
        this.kqbh = kqbh;
    }

    public String getGlwfdm() {
        return glwfdm;
    }

    public void setGlwfdm(String glwfdm) {
        this.glwfdm = glwfdm;
    }

    public String getGlwfmc() {
        return glwfmc;
    }

    public void setGlwfmc(String glwfmc) {
        this.glwfmc = glwfmc;
    }

    public boolean isScbz() {
        return scbz;
    }

    public void setScbz(boolean scbz) {
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
