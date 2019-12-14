package com.xinhai.caiyun.customermanage.api;

import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

/**
 * 客户股东信息
 * Created by Administrator on 2018/3/8 0008.
 */
public class PtGdxx implements Serializable {

    /**
     * 主键id
     */
    @Id
    private Long id;
    /**
     * 客户编码
     */
    private String khbm;

    /**
     * 代理机构编码
     */
    private String dljg_bm;

    /**
     * 股东姓名
     */
    private String gdxm;

    /**
     * 股东身份证号
     */
    private String gdsfzh;

    /**
     * 股东电话
     */
    private String gddh;

    /**
     * 股东邮箱
     */
    private String gdyx;

    /**
     * 占股比例
     */
    private String gdzgbl;

    /**
     * 删除标志
     */
    private boolean scbz;

    /**
     * 录入人员
     */
    private String lrry;

    /**
     * 删除人员
     */
    private String scry;

    /**
     * 录入日期
     */
    private Date lrrq;

    /**
     * 删除日期
     */
    private Date scrq;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }

    public String getDljg_bm() {
        return dljg_bm;
    }

    public void setDljg_bm(String dljg_bm) {
        this.dljg_bm = dljg_bm;
    }

    public String getGdxm() {
        return gdxm;
    }

    public void setGdxm(String gdxm) {
        this.gdxm = gdxm;
    }

    public String getGdsfzh() {
        return gdsfzh;
    }

    public void setGdsfzh(String gdsfzh) {
        this.gdsfzh = gdsfzh;
    }

    public String getGddh() {
        return gddh;
    }

    public void setGddh(String gddh) {
        this.gddh = gddh;
    }

    public String getGdyx() {
        return gdyx;
    }

    public void setGdyx(String gdyx) {
        this.gdyx = gdyx;
    }

    public String getGdzgbl() {
        return gdzgbl;
    }

    public void setGdzgbl(String gdzgbl) {
        this.gdzgbl = gdzgbl;
    }

    public boolean isScbz() {
        return scbz;
    }

    public void setScbz(boolean scbz) {
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

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    public Date getScrq() {
        return scrq;
    }

    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }
}

