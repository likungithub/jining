package com.xinhai.caiyun.systemmanager.api;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class YqWxsq {
    private int id;//申请id
    private String name;//仪器名称
    private String xh;//仪器型号
    private String cj;//生产厂家
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String scrq;//生产日期
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String sqrq;//申请维修日期
    private String sqr;//申请人
    private String sqbm;//申请部门
    private String wtms;//问题描述
    private int zt;//仪器状态
    private String whr;//维护人
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String whrq;//维护日期
    private String bzxx;//备注信息
    private String yqts;
    private String whnr;//维护内容

    public String getYqts() {
        return yqts;
    }
    public void setYqts(String yqts) {
        this.yqts = yqts;
    }
    public String getBzxx() {
        return bzxx;
    }
    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    public int getId() {
        return id;
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

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getXh() {
        return xh;
    }

    public void setXh(String xh) {
        this.xh = xh;
    }

    public String getCj() {
        return cj;
    }

    public void setCj(String cj) {
        this.cj = cj;
    }

    public String getScrq() {
        return scrq;
    }

    public void setScrq(String scrq) {
        this.scrq = scrq;
    }

    public String getSqrq() {
        return sqrq;
    }

    public void setSqrq(String sqrq) {
        this.sqrq = sqrq;
    }

    public String getSqr() {
        return sqr;
    }

    public void setSqr(String sqr) {
        this.sqr = sqr;
    }

    public String getSqbm() {
        return sqbm;
    }

    public void setSqbm(String sqbm) {
        this.sqbm = sqbm;
    }

    public String getWtms() {
        return wtms;
    }

    public void setWtms(String wtms) {
        this.wtms = wtms;
    }

    public int getZt() {
        return zt;
    }

    public void setZt(int zt) {
        this.zt = zt;
    }
}
