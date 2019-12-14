package com.xinhai.usermanager.entity;

import java.math.BigDecimal;
import java.util.Date;

public class PtKqdd {
    /**
     * 主键id
     */
    private long id;
    /**
     * 考勤编号
     */
    private String kqbh;
    /**
     * 考勤地点经度
     */
    private BigDecimal kqddJd;
    /**
     * 考勤地点维度
     */
    private BigDecimal kqddWd;
    /**
     * 考勤地址
     */
    private String kqdz;
    /**
     * 删除标志
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

    public BigDecimal getKqddJd() {
        return kqddJd;
    }

    public void setKqddJd(BigDecimal kqddJd) {
        this.kqddJd = kqddJd;
    }

    public BigDecimal getKqddWd() {
        return kqddWd;
    }

    public void setKqddWd(BigDecimal kqddWd) {
        this.kqddWd = kqddWd;
    }

    public String getKqdz() {
        return kqdz;
    }

    public void setKqdz(String kqdz) {
        this.kqdz = kqdz;
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
