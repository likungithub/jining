package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

public class AppJcgx {
    private Long id;

    private String rjlx;

    private String rjbb;

    private String xzdz;

    private Boolean scbz;

    private String lrry;

    private String gxry;

    private String scry;

    private Date gxrq;

    private Date scrq;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRjlx() {
        return rjlx;
    }

    public void setRjlx(String rjlx) {
        this.rjlx = rjlx == null ? null : rjlx.trim();
    }

    public String getRjbb() {
        return rjbb;
    }

    public void setRjbb(String rjbb) {
        this.rjbb = rjbb == null ? null : rjbb.trim();
    }

    public String getXzdz() {
        return xzdz;
    }

    public void setXzdz(String xzdz) {
        this.xzdz = xzdz == null ? null : xzdz.trim();
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
        this.lrry = lrry == null ? null : lrry.trim();
    }

    public String getGxry() {
        return gxry;
    }

    public void setGxry(String gxry) {
        this.gxry = gxry == null ? null : gxry.trim();
    }

    public String getScry() {
        return scry;
    }

    public void setScry(String scry) {
        this.scry = scry == null ? null : scry.trim();
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