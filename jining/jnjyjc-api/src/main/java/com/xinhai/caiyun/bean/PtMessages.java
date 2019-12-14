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
public class PtMessages implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;
    private String lyxx;
    private String fssj;
    private String dljgbm;
    private String fsrid;
    private String jsrid;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
   
    public String getLyxx() {
        return lyxx;
    }
    public void setLyxx(String lyxx) {
        this.lyxx = lyxx;
    }
    
    public String getFssj() {
        return fssj;
    }
    public void setFssj(String fssj) {
        this.fssj = fssj;
    }
    public String getDljgbm() {
        return dljgbm;
    }
    public void setDljgbm(String dljgbm) {
        this.dljgbm = dljgbm;
    }
    public String getFsrid() {
        return fsrid;
    }
    public void setFsrid(String fsrid) {
        this.fsrid = fsrid;
    }
    public String getJsrid() {
        return jsrid;
    }
    public void setJsrid(String jsrid) {
        this.jsrid = jsrid;
    }
}