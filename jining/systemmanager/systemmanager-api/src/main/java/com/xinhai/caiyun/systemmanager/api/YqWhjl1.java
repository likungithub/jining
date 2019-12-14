package com.xinhai.caiyun.systemmanager.api;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
public class YqWhjl1 {
    private  int id;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String scrq;
    private String name;
    private String whr;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String whrq;
    private String whnr;
    private int zt;
    private String bzxx;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getScrq() {
        return scrq;
    }

    public void setScrq(String scrq) {
        this.scrq = scrq;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public int getZt() {
        return zt;
    }

    public void setZt(int zt) {
        this.zt = zt;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }
}
