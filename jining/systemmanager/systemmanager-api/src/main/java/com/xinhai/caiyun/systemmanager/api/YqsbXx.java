package com.xinhai.caiyun.systemmanager.api;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class YqsbXx {
    private String skbh;
    private String sbmc;
    private String ggxh;
    private String zqddj;
    private String fbl;
    private String sccs;
    private String sbyz;
    private String jdjg;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date jdrq;
    private String bzxx;

    public String getSkbh() {
        return skbh;
    }

    public void setSkbh(String skbh) {
        this.skbh = skbh;
    }

    public String getSbmc() {
        return sbmc;
    }

    public void setSbmc(String sbmc) {
        this.sbmc = sbmc;
    }

    public String getGgxh() {
        return ggxh;
    }

    public void setGgxh(String ggxh) {
        this.ggxh = ggxh;
    }

    public String getZqddj() {
        return zqddj;
    }

    public void setZqddj(String zqddj) {
        this.zqddj = zqddj;
    }

    public String getFbl() {
        return fbl;
    }

    public void setFbl(String fbl) {
        this.fbl = fbl;
    }

    public String getSccs() {
        return sccs;
    }

    public void setSccs(String sccs) {
        this.sccs = sccs;
    }

    public String getSbyz() {
        return sbyz;
    }

    public void setSbyz(String sbyz) {
        this.sbyz = sbyz;
    }

    public String getJdjg() {
        return jdjg;
    }

    public void setJdjg(String jdjg) {
        this.jdjg = jdjg;
    }

    public Date getJdrq() {
        return jdrq;
    }

    public void setJdrq(Date jdrq) {
        this.jdrq = jdrq;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    @Override
    public String toString() {
        return "YqsbXx{" +
                "skbh='" + skbh + '\'' +
                ", sbmc='" + sbmc + '\'' +
                ", ggxh='" + ggxh + '\'' +
                ", zqddj='" + zqddj + '\'' +
                ", fbl='" + fbl + '\'' +
                ", sccs='" + sccs + '\'' +
                ", sbyz='" + sbyz + '\'' +
                ", jdjg='" + jdjg + '\'' +
                ", jdrq=" + jdrq +
                ", bzxx='" + bzxx + '\'' +
                '}';
    }
}
