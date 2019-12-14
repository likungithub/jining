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
@Table(name = "pt_app_jcgx")
public class PtAppJcgx implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;
    private String rjlx;
    private String rjbb;
    private String xzdz;
    private Boolean scbz;
    private String lrry;
    private String gxry;
    private String scry;
    private Date gxrq;
    private Date scrq;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getRjlx() {
        return rjlx;
    }

    public void setRjlx(String rjlx) {
        this.rjlx = rjlx;
    }

    public String getRjbb() {
        return rjbb;
    }

    public void setRjbb(String rjbb) {
        this.rjbb = rjbb;
    }

    public String getXzdz() {
        return xzdz;
    }

    public void setXzdz(String xzdz) {
        this.xzdz = xzdz;
    }

    public Boolean getScbz() {
        return scbz;
    }

    public void setScbz(Boolean scbz) {
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

    public Date getGxrq() {
        return gxrq;
    }

    public void setGxrq(Date gxrq) {
        this.gxrq = gxrq;
    }

    public Date getScrq() {
        return scrq;
    }

    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }


}