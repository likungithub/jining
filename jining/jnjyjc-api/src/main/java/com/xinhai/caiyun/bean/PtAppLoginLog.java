package com.xinhai.caiyun.bean;

import java.util.Date;

/**
 * 登陆日志实体类
 *
 */
public class PtAppLoginLog {
	
    /**
     * 编号
     */
    private String id;
	
    /**
     * 职员代码
     */
    private String zydm;
    
    /**
     * 登陆账号
     */
    private String dlzh;
    
    /**
     * 登录类型
     */
    private String dllx_dm;
    
    /**
     * 企业类型代码
     */
    private String qylx_dm;
    
    /**
     * 经度
     */
    private String jd;
    
    /**
     * 维度
     */
    private String wd;
    
    
	/**
	 * 登录类型
	 */
    private String ip;
	
    /**
     * 登录时间
     */
    private Date logintime;
	
    /**
     * MAC地址
     */
    private String mac;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getZydm() {
        return zydm;
    }

    public void setZydm(String zydm) {
        this.zydm = zydm;
    }

    public String getDlzh() {
        return dlzh;
    }

    public void setDlzh(String dlzh) {
        this.dlzh = dlzh;
    }

    public String getDllx_dm() {
        return dllx_dm;
    }

    public void setDllx_dm(String dllx_dm) {
        this.dllx_dm = dllx_dm;
    }

    public String getQylx_dm() {
        return qylx_dm;
    }

    public void setQylx_dm(String qylx_dm) {
        this.qylx_dm = qylx_dm;
    }

    public String getJd() {
        return jd;
    }

    public void setJd(String jd) {
        this.jd = jd;
    }

    public String getWd() {
        return wd;
    }

    public void setWd(String wd) {
        this.wd = wd;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Date getLogintime() {
        return logintime;
    }

    public void setLogintime(Date logintime) {
        this.logintime = logintime;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac;
    }
    
   
    
}
