package com.xinhai.caiyun.systemmanager.api;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class Yqwxcx {
    private String name;//申请人
    private String sqbm;//申请部门
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date stardate;//开始时间
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date enddate;//结束时间

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSqbm() {
        return sqbm;
    }

    public void setSqbm(String sqbm) {
        this.sqbm = sqbm;
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
