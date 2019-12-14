package com.xinhai.caiyun.bean;

import java.util.Date;

/**
 * 登陆日志实体类
 *
 */
public class LoginLog {
	
    /**
     * 编号
     */
    private String id;
	
    /**
     * 职员代码
     */
    private String personcode;
    
    /**
     * 人员姓名
     */
    private String personname;
    
	/**
	 * 登录账号
	 */
    private String loginaccount;
	
    /**
     * 登录时间
     */
    private Date logintime;
	
    /**
     * 退出时间
     */
    private Date outtime;
	
    /**
     * 登录类型
     */
    private String logintype;
	
    /**
     * 用户IP
     */
    private String ip;
	
    /**
     * MAC地址
     */
    private String mac;
    
    /**
     * 用户类型代码
     */
    private String usertype;

    /**
     * 代理机构编码
     */
    private String dljg_bm;

    /**
     * 代理机构名称
     */
    private String dljg_mc;

    /**
     * 0财云互联APP  1代理APP
     */
    private String applx;

    public String getDljg_mc() {
        return dljg_mc;
    }

    public void setDljg_mc(String dljg_mc) {
        this.dljg_mc = dljg_mc;
    }

    public String getDljg_bm() {
        return dljg_bm;
    }

    public void setDljg_bm(String dljg_bm) {
        this.dljg_bm = dljg_bm;
    }

    public String getApplx() {
        return applx;
    }

    public void setApplx(String applx) {
        this.applx = applx;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPersoncode() {
        return personcode;
    }

    public void setPersoncode(String personcode) {
        this.personcode = personcode;
    }

    public String getPersonname() {
        return personname;
    }

    public void setPersonname(String personname) {
        this.personname = personname;
    }

    public String getLoginaccount() {
        return loginaccount;
    }

    public void setLoginaccount(String loginaccount) {
        this.loginaccount = loginaccount;
    }

    public Date getLogintime() {
        return logintime;
    }

    public void setLogintime(Date logintime) {
        this.logintime = logintime;
    }

    public Date getOuttime() {
        return outtime;
    }

    public void setOuttime(Date outtime) {
        this.outtime = outtime;
    }

    public String getLogintype() {
        return logintype;
    }

    public void setLogintype(String logintype) {
        this.logintype = logintype;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac;
    }

    public String getUsertype() {
        return usertype;
    }

    public void setUsertype(String usertype) {
        this.usertype = usertype;
    }
}
