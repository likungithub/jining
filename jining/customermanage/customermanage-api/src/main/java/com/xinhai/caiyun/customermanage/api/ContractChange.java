package com.xinhai.caiyun.customermanage.api;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by Administrator on 2018/4/11 0011.
 */
public class ContractChange {

    /**
     * id主键
     */
    private long id;

    /**
     * 代理机构编码
     */
    private String dljg_bm;

    /**
     * 合同编码
     */
    private String htbm;

    /**
     * 总金额
     */
    private BigDecimal zje;

    /**
     * 每月金额
     */
    private BigDecimal myje;

    /**
     * 公司名称
     */
    private String gsmc;

    /**
     * 签约日期
     */
    private Date qyrq;

    /**
     * 服务期限
     */
    private String fwqx;

    /**
     * 收费项目
     */
    private String sfxm;

    /**
     * 付款方式
     */
    private String fkfs;

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

    /**
     * 删除标志
     */
    private int scbz;

    /**
     * 审核状态
     */
    private String shzt;

    /**
     * 录入人名称
     */
    private String lrrmc;

    /**
     * 审核人员
     */
    private String shry;

    /**
     * 审核人名称
     */
    private String shrmc;

    /**
     * 审核日期
     */
    private Date shrq;

    /**
     * 审核意见
     */
    private String shyj;

    /**
     * 变更id
     */
    private String bgid;

    /**
     * 客户编码
     */
    private String khbm;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getHtbm() {
        return htbm;
    }

    public void setHtbm(String htbm) {
        this.htbm = htbm;
    }

    public BigDecimal getZje() {
        return zje;
    }

    public void setZje(BigDecimal zje) {
        this.zje = zje;
    }

    public BigDecimal getMyje() {
        return myje;
    }

    public void setMyje(BigDecimal myje) {
        this.myje = myje;
    }

    public String getGsmc() {
        return gsmc;
    }

    public void setGsmc(String gsmc) {
        this.gsmc = gsmc;
    }

    public Date getQyrq() {
        return qyrq;
    }

    public void setQyrq(Date qyrq) {
        this.qyrq = qyrq;
    }

    public String getFwqx() {
        return fwqx;
    }

    public void setFwqx(String fwqx) {
        this.fwqx = fwqx;
    }

    public String getFkfs() {
        return fkfs;
    }

    public void setFkfs(String fkfs) {
        this.fkfs = fkfs;
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

    public int getScbz() {
        return scbz;
    }

    public void setScbz(int scbz) {
        this.scbz = scbz;
    }

    public String getShzt() {
        return shzt;
    }

    public void setShzt(String shzt) {
        this.shzt = shzt;
    }

    public String getSfxm() {
        return sfxm;
    }

    public void setSfxm(String sfxm) {
        this.sfxm = sfxm;
    }

    public String getDljg_bm() {
        return dljg_bm;
    }

    public void setDljg_bm(String dljg_bm) {
        this.dljg_bm = dljg_bm;
    }

    public String getLrrmc() {
        return lrrmc;
    }

    public void setLrrmc(String lrrmc) {
        this.lrrmc = lrrmc;
    }

    public String getShry() {
        return shry;
    }

    public void setShry(String shry) {
        this.shry = shry;
    }

    public String getShrmc() {
        return shrmc;
    }

    public void setShrmc(String shrmc) {
        this.shrmc = shrmc;
    }

    public Date getShrq() {
        return shrq;
    }

    public void setShrq(Date shrq) {
        this.shrq = shrq;
    }

    public String getShyj() {
        return shyj;
    }

    public void setShyj(String shyj) {
        this.shyj = shyj;
    }

    public String getBgid() {
        return bgid;
    }

    public void setBgid(String bgid) {
        this.bgid = bgid;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }
}
