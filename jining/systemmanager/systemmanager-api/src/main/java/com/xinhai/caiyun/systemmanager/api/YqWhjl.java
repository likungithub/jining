package com.xinhai.caiyun.systemmanager.api;

import org.springframework.format.annotation.DateTimeFormat;

public class YqWhjl {
    private String mc;//名称
    private String zl;//种类
    private String xh;//型号
    private String sccj;//生产厂家
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String scrq;//生产日期
    private String sbbh;//设备编号
    private String whr;//维护人
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String whrq;//维护日期
    private String whnr;//维护内容
    private String whzq;//维护周期
    private String whjl;//维护记录
    private String bzxx;//备注信息
    public String getMc() { return mc; }

    public void setMc(String mc) {
        this.mc = mc;
    }

    public String getZl() {
        return zl;
    }

    public void setZl(String zl) {
        this.zl = zl;
    }

    public String getXh() {
        return xh;
    }

    public void setXh(String xh) {
        this.xh = xh;
    }

    public String getSccj() {
        return sccj;
    }

    public void setSccj(String sccj) {
        this.sccj = sccj;
    }

    public String getScrq() {
        return scrq;
    }

    public void setScrq(String scrq) {
        this.scrq = scrq;
    }

    public String getSbbh() {
        return sbbh;
    }

    public void setSbbh(String sbbh) {
        this.sbbh = sbbh;
    }

    public String getWhr() {
        return whr;
    }

    public void setWhr(String whr) {
        this.whr = whr;
    }

    public String getWhrq() {
        return whrq;
    }

    public void setWhrq(String whrq) {
        this.whrq = whrq;
    }

    public String getWhnr() {
        return whnr;
    }

    public void setWhnr(String whnr) {
        this.whnr = whnr;
    }

    public String getWhzq() {
        return whzq;
    }

    public void setWhzq(String whzq) {
        this.whzq = whzq;
    }

    public String getWhjl() {
        return whjl;
    }

    public void setWhjl(String whjl) {
        this.whjl = whjl;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

}
