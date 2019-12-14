package com.xinhai.caiyun.customermanage.api;

import java.util.Date;

public class PtGtxxFjxx {
    
    /**
     * 编号
     */
    private String id;
    
    /**
     * 客户编码
     */
    private String khbm;
    
    /**
     * 沟通ID
     */
    private String gtid;
    
    /**
     * 附件名称
     */
    private String fjmc;

    /**
     * 备用字段2
     */
    private String fileName;
    
    /**
     * 附件存储路径
     */
    private String fjcclj;

    /**
     * 备用字段
     */
    private String data;
    
    /**
     * 附件类型 001评论的 002回复的
     */
    private String fj_type;
    
    /**
     * 删除标志
     */
    private int scbz;
    
    /**
     * 录入人员
     */
    private String lrry;

    /**
     * 录入日期
     */
    private Date lrrq;
    
    /**
     * 删除人员
     */
    private String scry;

    /**
     * 删除日期
     */
    private Date scrq;

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    public String getGtid() {
        return gtid;
    }

    public void setGtid(String gtid) {
        this.gtid = gtid;
    }

    public String getFj_type() {
        return fj_type;
    }

    public void setFj_type(String fj_type) {
        this.fj_type = fj_type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }

    public String getFjmc() {
        return fjmc;
    }

    public void setFjmc(String fjmc) {
        this.fjmc = fjmc;
    }

    public String getFjcclj() {
        return fjcclj;
    }

    public void setFjcclj(String fjcclj) {
        this.fjcclj = fjcclj;
    }

    public int getScbz() {
        return scbz;
    }

    public void setScbz(int scbz) {
        this.scbz = scbz;
    }

    public String getLrry() {
        return lrry;
    }

    public void setLrry(String lrry) {
        this.lrry = lrry;
    }

    public String getScry() {
        return scry;
    }

    public void setScry(String scry) {
        this.scry = scry;
    }

    public Date getScrq() {
        return scrq;
    }

    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }
    
}
