package com.xinhai.caiyun.bean;

import java.util.Date;

public class GdglFjxx {
    
    /**
     * 编号
     */
    private long id;
    
    /**
     * 工单编码
     */
    private String gdbm;
    
    /**
     * 代理机构编码
     */
    private String dljg_bm;
    
    /**
     * 附件名称
     */
    private String fjmc;
    
    /**
     * 附件存储路劲
     */
    private String fjcclj;
    
    /**
     * 文件类型
     */
    private String wjlx;
    
    /**
     * 文件大小
     */
    private String wjdx;
    
    /**
     * 删除标志
     */
    private int scbz;
    
    /**
     * 录入人
     */
    private String lrry;
    
    /**
     * 更新人
     */
    private String gxry;
    
    /**
     * 删除人
     */
    private String scry;
    
    /**
     * 上传时间
     */
    private Date scsj;
    
    /**
     * 更新日期
     */
    private Date gxrq;
    
    /**
     * 删除日期
     */
    private Date scrq;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getGdbm() {
        return gdbm;
    }

    public void setGdbm(String gdbm) {
        this.gdbm = gdbm;
    }

    public String getDljg_bm() {
        return dljg_bm;
    }

    public void setDljg_bm(String dljg_bm) {
        this.dljg_bm = dljg_bm;
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

    public String getWjlx() {
        return wjlx;
    }

    public void setWjlx(String wjlx) {
        this.wjlx = wjlx;
    }

    public String getWjdx() {
        return wjdx;
    }

    public void setWjdx(String wjdx) {
        this.wjdx = wjdx;
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

    public Date getScsj() {
        return scsj;
    }

    public void setScsj(Date scsj) {
        this.scsj = scsj;
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
