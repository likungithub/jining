package com.xinhai.caiyun.bean;

import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.Table;
import java.security.Timestamp;
import java.util.Date;
import java.util.List;

/**
 * Auto Generated Entity
 * 
 * @author Xinhai auto generated
 * 
 */
@Table(name = "pt_app_gnjs")
public class PtAppGnjs implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;
    private String gnjs;
    private String lrr;
    private String scbz;
    private String lrry;
    private String gxry;
    private String scry;
    private String fbrq;
    private String gxrq;
    private String scrq;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getGnjs() {
        return gnjs;
    }
    public void setGnjs(String gnjs) {
        this.gnjs = gnjs;
    }
    public String getLrr() {
        return lrr;
    }
    public void setLrr(String lrr) {
        this.lrr = lrr;
    }
    public String getScbz() {
        return scbz;
    }
    public void setScbz(String scbz) {
        this.scbz = scbz;
    }
    public String getLrry() {
        return lrry;
    }
    public void setLrry(String lrry) {
        this.lrry = lrry;
    }
    public String getGxry() {
        return gxry;
    }
    public void setGxry(String gxry) {
        this.gxry = gxry;
    }
    public String getScry() {
        return scry;
    }
    public void setScry(String scry) {
        this.scry = scry;
    }
    public String getFbrq() {
        return fbrq;
    }
    public void setFbrq(String fbrq) {
        this.fbrq = fbrq;
    }
    public String getGxrq() {
        return gxrq;
    }
    public void setGxrq(String gxrq) {
        this.gxrq = gxrq;
    }
    public String getScrq() {
        return scrq;
    }
    public void setScrq(String scrq) {
        this.scrq = scrq;
    }

}