package com.xinhai.caiyun.customermanage.api;

import org.springframework.format.annotation.DateTimeFormat;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.SimpleTimeZone;

public class Jcx {
    private String jczxry;//检测执行人员
    private String sd;//检测湿度
    private String wd;//检测温度
    private String jcz;//检测值
    private String name;//检测人员名字
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date lrrq;//录入日期
    private String jcxmc;//检测项名称

    public String getJxcmc() {
        return jcxmc;
    }

    public void setJxcmc(String jxcmc) {
        this.jcxmc = jxcmc;
    }

    public String getJczxry() {
        return jczxry;
    }

    public void setJczxry(String jczxry) {
        this.jczxry = jczxry;
    }

    public String getSd() {
        return sd;
    }

    public void setSd(String sd) {
        this.sd = sd;
    }

    public String getWd() {
        return wd;
    }

    public void setWd(String wd) {
        this.wd = wd;
    }

    public String getJcz() {
        return jcz;
    }

    public void setJcz(String jcz) {
        this.jcz = jcz;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLrrq() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String s = simpleDateFormat.format(this.lrrq);
        return s;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }
}
