package com.xinhai.Log.api;

import java.util.Date;

/**
 * 行为记录
 * @author tangck
 *
 */
public class Behavior {
    
    /**
     * 编号
     */
    private String id;
    
    /**
     * 模块
     */
    private String module;
    
    /**
     * 页面
     */
    private String url;
    
    /**
     * 访问时间
     */
    private Date time;
    
    /**
     * ip地址
     */
    private String ip;
    
    /**
     * 退出时间
     */
    private Date outtime;
    
    /**
     * 访客地区
     */
    private String address;
    
    /**
     * 设备
     */
    private String device;
    
    /**
     * 浏览器类型
     */
    private String browser;
    
    /**
     * 标题
     */
    private String title;
    
    /**
     * 分辨率
     */
    private String resolution;
    
    /**
     * 来源
     */
    private String referrer;
    
    /**
     * 代理机构编码
     */
    private String institutionid;
    
    /**
     * 职员代码
     */
    private String staffmember;
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Date getOuttime() {
        return outtime;
    }

    public void setOuttime(Date outtime) {
        this.outtime = outtime;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDevice() {
        return device;
    }

    public void setDevice(String device) {
        this.device = device;
    }

    public String getBrowser() {
        return browser;
    }

    public void setBrowser(String browser) {
        this.browser = browser;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public String getReferrer() {
        return referrer;
    }

    public void setReferrer(String referrer) {
        this.referrer = referrer;
    }

    public String getInstitutionid() {
        return institutionid;
    }

    public void setInstitutionid(String institutionid) {
        this.institutionid = institutionid;
    }

    public String getStaffmember() {
        return staffmember;
    }

    public void setStaffmember(String staffmember) {
        this.staffmember = staffmember;
    }

}
