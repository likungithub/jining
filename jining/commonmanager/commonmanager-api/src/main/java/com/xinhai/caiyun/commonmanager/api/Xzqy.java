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
@Table(name = "dm_xzqh")
public class Xzqy implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键行政区划代码
     */
    @Id
    private int xzqhDm;

    /**
     * 行政区划名称
     */
    private String xzqhMc;
    
    /**
     * 上级代码
     */
    private String sjdm;
    
    /**
     * 行政级别
     */
    private String xzjb;
    
    /**
     * 删除标志
     */
    private Boolean scbz;
    
    /**
     * 录入人员
     */
    private String lrry;
    
    /**
     * 更新人员
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

    public void setXzqhDm(int xzqhDm) {
        this.xzqhDm = xzqhDm;
    }

    public int getXzqhDm() {
        return xzqhDm;
    }

    public String getXzqhMc() {
        return xzqhMc;
    }

    public void setXzqhMc(String xzqhMc) {
        this.xzqhMc = xzqhMc;
    }

    public String getSjdm() {
        return sjdm;
    }

    public void setSjdm(String sjdm) {
        this.sjdm = sjdm;
    }

    public String getXzjb() {
        return xzjb;
    }

    public void setXzjb(String xzjb) {
        this.xzjb = xzjb;
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