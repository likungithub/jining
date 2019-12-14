package com.xinhai.caiyun.customermanage.api;

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
public class PtLtxxMx implements Serializable {

    private static final long serialVersionUID = 1L;
    private String jsrid; 
    private String fsrid; 
    private String dljgbm; 
    private String text;
    private String date;
    private String self;
    private String ydzt;//0未读 1已读
    public String getJsrid() {
        return jsrid;
    }
    public void setJsrid(String jsrid) {
        this.jsrid = jsrid;
    }
    public String getFsrid() {
        return fsrid;
    }
    public void setFsrid(String fsrid) {
        this.fsrid = fsrid;
    }
    
    public String getDljgbm() {
        return dljgbm;
    }
    public void setDljgbm(String dljgbm) {
        this.dljgbm = dljgbm;
    }
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public String getSelf() {
        return self;
    }
    public void setSelf(String self) {
        this.self = self;
    }
    public String getYdzt() {
        return ydzt;
    }
    public void setYdzt(String ydzt) {
        this.ydzt = ydzt;
    }
    

}