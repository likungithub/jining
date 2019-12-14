package com.xinhai.caiyun.bean;

import java.io.Serializable;

import javax.persistence.Id;
import javax.persistence.Table;

import java.security.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Auto Generated Entity
 * 
 * @author Xinhai auto generated
 * 
 */
public class PtFwtz implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;
    private String fwtzlxdm;
    private String fwtzlxmc;
    private String dljgbm;
    private String zydm;
    private String khbm;
    private String xxbm;
    private String xxnr;
    private String xxfsrq;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
   
    public String getFwtzlxdm() {
        return fwtzlxdm;
    }
    public void setFwtzlxdm(String fwtzlxdm) {
        this.fwtzlxdm = fwtzlxdm;
    }
    public String getFwtzlxmc() {
        return fwtzlxmc;
    }
    public void setFwtzlxmc(String fwtzlxmc) {
        this.fwtzlxmc = fwtzlxmc;
    }
    public String getDljgbm() {
        return dljgbm;
    }
    public void setDljgbm(String dljgbm) {
        this.dljgbm = dljgbm;
    }
    public String getZydm() {
        return zydm;
    }
    public void setZydm(String zydm) {
        this.zydm = zydm;
    }
    public String getKhbm() {
        return khbm;
    }
    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }
    public String getXxbm() {
        return xxbm;
    }
    public void setXxbm(String xxbm) {
        this.xxbm = xxbm;
    }
    
    public String getXxfsrq() {
        return xxfsrq;
    }
    public void setXxfsrq(String xxfsrq) {
        this.xxfsrq = xxfsrq;
    }
    public String getXxnr() {
        return xxnr;
    }
    public void setXxnr(String xxnr) {
        this.xxnr = xxnr;
    }
}