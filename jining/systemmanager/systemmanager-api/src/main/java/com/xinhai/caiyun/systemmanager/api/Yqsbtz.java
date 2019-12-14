package com.xinhai.caiyun.systemmanager.api;

import org.springframework.format.annotation.DateTimeFormat;

public class Yqsbtz {
    private Integer id;
    private Integer wx;
    private String name;
    private String type;
    private String number;
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private String gzrq;
    private String wxzq;
    private String dqzt;
    private String sccj;
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private String scrq;
    private String sbbh;
    private String sybm;
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private String sbwhsj;

    public Integer getWx() {
        return wx;
    }

    public void setWx(Integer wx) {
        this.wx = wx;
    }

    public String getSbwhsj() {
        return sbwhsj;
    }

    public void setSbwhsj(String sbwhsj) {
        this.sbwhsj = sbwhsj;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSybm() {
        return sybm;
    }

    public void setSybm(String sybm) {
        this.sybm = sybm;
    }

    public String getWxzq() {
        return wxzq;
    }

    public void setWxzq(String wxzq) {
        this.wxzq = wxzq;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDqzt() {
        return dqzt;
    }

    public void setDqzt(String dqzt) {
        this.dqzt = dqzt;
    }

    public String getGzrq() {
        return gzrq;
    }

    public void setGzrq(String gzrq) {
        this.gzrq = gzrq;
    }

    public String getSbbh() {
        return sbbh;
    }

    public void setSbbh(String sbbh) {
        this.sbbh = sbbh;
    }

    public String getScrq() {
        return scrq;
    }

    public void setScrq(String scrq) {
        this.scrq = scrq;
    }

    public String getSccj() {

        return sccj;
    }

    public void setSccj(String sccj) {
        this.sccj = sccj;
    }
}
