package com.xinhai.caiyun.systemmanager.api;

import java.io.Serializable;
import java.util.Date;

/**
 * 启动图
 * @author xinl
 */
public class StartPicture  implements Serializable {

    private String applx;

    public String getApplx() {
        return applx;
    }

    public void setApplx(String applx) {
        this.applx = applx;
    }

    /**
     * 主键，自增列
     */
    private String id;

    /**
     * 图片编号
     */
    private String tpbh;

    /**
     * 图片链接
     */
    private String tplj;

    /**
     * 图片名称
     */
    private String tpmc;

    /**
     * 图片描述
     */
    private String tpms;

    /**
     * 备注信息
     */
    private String bzxx;

    /**
     * 启动图状态
     */
    private String qdtzt;

    /**
     * 有效期起
     */
    private Date yxqq;

    /**
     * 有效期止
     */
    private Date yxqz;

    /**
     * 删除标志
     */
    private int scbz;

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTpbh() {
        return tpbh;
    }

    public void setTpbh(String tpbh) {
        this.tpbh = tpbh;
    }

    public String getTplj() {
        return tplj;
    }

    public void setTplj(String tplj) {
        this.tplj = tplj;
    }

    public String getTpmc() {
        return tpmc;
    }

    public void setTpmc(String tpmc) {
        this.tpmc = tpmc;
    }

    public String getTpms() {
        return tpms;
    }

    public void setTpms(String tpms) {
        this.tpms = tpms;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    public String getQdtzt() {
        return qdtzt;
    }

    public void setQdtzt(String qdtzt) {
        this.qdtzt = qdtzt;
    }

    public Date getYxqq() {
        return yxqq;
    }

    public void setYxqq(Date yxqq) {
        this.yxqq = yxqq;
    }

    public Date getYxqz() {
        return yxqz;
    }

    public void setYxqz(Date yxqz) {
        this.yxqz = yxqz;
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
