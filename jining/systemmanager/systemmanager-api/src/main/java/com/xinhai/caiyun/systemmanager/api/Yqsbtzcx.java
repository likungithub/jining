package com.xinhai.caiyun.systemmanager.api;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class Yqsbtzcx {
    private String name;//仪器名称
    private String type;//仪器种类
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date stardate;//开始时间
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date enddate;//结束时间
    private Integer start;
    private Integer length;

    public Integer getStart() {
        return start;
    }

    public void setStart(Integer start) {
        this.start = start;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getStardate() {
        return stardate;
    }

    public void setStardate(Date stardate) {
        this.stardate = stardate;
    }

    public Date getEnddate() {
        return enddate;
    }

    public void setEnddate(Date enddate) {
        this.enddate = enddate;
    }
}

