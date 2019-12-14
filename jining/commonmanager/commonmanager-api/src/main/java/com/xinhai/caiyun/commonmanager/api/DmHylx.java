package com.xinhai.caiyun.commonmanager.api;

import java.io.Serializable;

import javax.persistence.Id;
import javax.persistence.Table;

import java.util.Date;

/**
 * Auto Generated Entity
 * 
 * @author Xinhai auto generated
 * 
 */
@Table(name = "dm_hylx")
public class DmHylx implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @Id
    private int id;

    /**
     * 行业代码
     */
    private String hydm;
    
    /**
     * 行业名称
     */
    private String hymc;
    
    /**
     * 门类标志
     */
    private String mlbz;
    
    /**
     * 大类标志
     */
    private String dlbz;
    
    /**
     * 中类标志
     */
    private String zlbz;
    
    /**
     * 小类标志
     */
    private String xlbz;
    
    /**
     * 上级行业代码
     */
    private String sjhyDm;
    
    /**
     * 删除标志
     */
    private Boolean scbz;
    
    /**
     * 选用标志
     */
    private String xybz;
    
    /**
     * 有效标志
     */
    private String yxbz;
    
    /**
     * 录入人员
     */
    private String lrry;
    
    /**
     * 跟新人员
     */
    private String gxry;
    
    /**
     * 删除人员
     */
    private String scry;
    
    /**
     * 录入日期
     */
    private Date lrrq;
    
    /**
     * 更新日期
     */
    private Date gxrq;
    
    /**
     * 删除日期
     */
    private Date scrq;

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public String getHydm() {
        return hydm;
    }

    public void setHydm(String hydm) {
        this.hydm = hydm;
    }

    public String getHymc() {
        return hymc;
    }

    public void setHymc(String hymc) {
        this.hymc = hymc;
    }

    public String getMlbz() {
        return mlbz;
    }

    public void setMlbz(String mlbz) {
        this.mlbz = mlbz;
    }

    public String getDlbz() {
        return dlbz;
    }

    public void setDlbz(String dlbz) {
        this.dlbz = dlbz;
    }

    public String getZlbz() {
        return zlbz;
    }

    public void setZlbz(String zlbz) {
        this.zlbz = zlbz;
    }

    public String getXlbz() {
        return xlbz;
    }

    public void setXlbz(String xlbz) {
        this.xlbz = xlbz;
    }

    public String getSjhyDm() {
        return sjhyDm;
    }

    public void setSjhyDm(String sjhyDm) {
        this.sjhyDm = sjhyDm;
    }

    public Boolean getScbz() {
        return scbz;
    }

    public void setScbz(Boolean scbz) {
        this.scbz = scbz;
    }

    public String getXybz() {
        return xybz;
    }

    public void setXybz(String xybz) {
        this.xybz = xybz;
    }

    public String getYxbz() {
        return yxbz;
    }

    public void setYxbz(String yxbz) {
        this.yxbz = yxbz;
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