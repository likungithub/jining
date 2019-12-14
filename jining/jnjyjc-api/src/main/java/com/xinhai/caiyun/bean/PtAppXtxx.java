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
public class PtAppXtxx implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;
    private String xxlxMc;
    private String xxtxJj;
    private String xxtxNr;
    private Date lrrq;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getXxlxMc() {
        return xxlxMc;
    }

    public void setXxlxMc(String xxlxMc) {
        this.xxlxMc = xxlxMc;
    }
    
    public String getXxtxJj() {
        return xxtxJj;
    }

    public void setXxtxJj(String xxtxJj) {
        this.xxtxJj = xxtxJj;
    }

    public String getXxtxNr() {
        return xxtxNr;
    }

    public void setXxtxNr(String xxtxNr) {
        this.xxtxNr = xxtxNr;
    }

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

}