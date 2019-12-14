package com.xinhai.Log.api;

import java.io.Serializable;
import java.util.Date;

/**
 * 操作日志
 * @author tangck
 *
 */
public class Log implements Serializable {
    
    /**
     * 编号
     */
    private String id;
    
    /**
     * 操作时间
     */
    private Date operatetime;
    
    /**
     * 公司名称
     */
    private String companyname;
    
    /**
     * 用户编码
     */
    private String userid;
    
    /**
     * 用户名
     */
    private String username;
    
    /**
     * 用户ip
     */
    private String ip;
    
    /**
     * 代理机构编码
     */
    private String institutionid;
    
//    /**
//     * 职员代码
//     */
//    private String staffmember;
//    
//    /**
//     * 职员代码
//     */
//    private String staffmembername;
    
    /**
     * 操作模块
     */
    private String module;
    
    /**
     * 日志内容
     */
    private String content;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getOperatetime() {
        return operatetime;
    }

    public void setOperatetime(Date operatetime) {
        this.operatetime = operatetime;
    }

    public String getCompanyname() {
        return companyname;
    }

    public void setCompanyname(String companyname) {
        this.companyname = companyname;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getInstitutionid() {
        return institutionid;
    }

    public void setInstitutionid(String institutionid) {
        this.institutionid = institutionid;
    }

//    public String getStaffmember() {
//        return staffmember;
//    }
//
//    public void setStaffmember(String staffmember) {
//        this.staffmember = staffmember;
//    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

//    public String getStaffmembername() {
//        return staffmembername;
//    }
//
//    public void setStaffmembername(String staffmembername) {
//        this.staffmembername = staffmembername;
//    }
    
}
