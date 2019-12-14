package com.xinhai.caiyun.bean;

import java.io.Serializable;
import java.math.BigDecimal;

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
@Table(name = "pt_zcfzb")
public class PtZcfzb implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    private String fzbz;
    private String khbm;
    private String nsrsbh;
    private String nsrmc;
    private String bzdw;
    private Timestamp sjdy;
    private int hc;
    private BigDecimal ncs;
    private BigDecimal qms;
    private String dwfzr;
    private String shr;
    private String zbr;
    private Boolean scbz;
    private String dljgBm;
    private String lrry;
    private String gxry;
    private String scry;
    private Date lrrq;
    private Date gxrq;
    private Date scrq;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getFzbz() {
        return fzbz;
    }

    public void setFzbz(String fzbz) {
        this.fzbz = fzbz;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }

    public String getNsrsbh() {
        return nsrsbh;
    }

    public void setNsrsbh(String nsrsbh) {
        this.nsrsbh = nsrsbh;
    }

    public String getNsrmc() {
        return nsrmc;
    }

    public void setNsrmc(String nsrmc) {
        this.nsrmc = nsrmc;
    }

    public String getBzdw() {
        return bzdw;
    }

    public void setBzdw(String bzdw) {
        this.bzdw = bzdw;
    }

    public Timestamp getSjdy() {
        return sjdy;
    }

    public void setSjdy(Timestamp sjdy) {
        this.sjdy = sjdy;
    }

    public int getHc() {
        return hc;
    }

    public void setHc(int hc) {
        this.hc = hc;
    }

    public BigDecimal getNcs() {
        return ncs;
    }

    public void setNcs(BigDecimal ncs) {
        this.ncs = ncs;
    }

    public BigDecimal getQms() {
        return qms;
    }

    public void setQms(BigDecimal qms) {
        this.qms = qms;
    }

    public String getDwfzr() {
        return dwfzr;
    }

    public void setDwfzr(String dwfzr) {
        this.dwfzr = dwfzr;
    }

    public String getShr() {
        return shr;
    }

    public void setShr(String shr) {
        this.shr = shr;
    }

    public String getZbr() {
        return zbr;
    }

    public void setZbr(String zbr) {
        this.zbr = zbr;
    }

    public Boolean getScbz() {
        return scbz;
    }

    public void setScbz(Boolean scbz) {
        this.scbz = scbz;
    }

    public String getDljgBm() {
        return dljgBm;
    }

    public void setDljgBm(String dljgBm) {
        this.dljgBm = dljgBm;
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

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
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