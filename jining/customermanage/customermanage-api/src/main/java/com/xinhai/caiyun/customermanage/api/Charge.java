package com.xinhai.caiyun.customermanage.api;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 收费信息
 * @author tangck
 *
 */
public class Charge {
    
    /**
     * 编号
     */
    private String id;
    
    /**
     * 收据编码
     */
    private String sjbm;
    
    /**
     * 合同编码
     */
    private String htbm;
    
    /**
     * 客户编码
     */
    private String khbm;
    
    /**
     * 用户名称
     */
    private String khmc;
    
    /**
     * 收费年份
     */
    private String sfnf;
    
    /**
     * 收费月份
     */
    private String sfyf;
    
    /**
     * 收费时间
     */
    private Date sfsj;
    
    /**
     * 应收款
     */
    private BigDecimal ysk;
    
    /**
     * 其他收费
     */
    private BigDecimal qtsf;
    
    /**
     * 实际收款
     */
    private BigDecimal sjsk;
    
    /**
     * 备注信息
     */
    private String bzxx;
    
    /**
     * 录入人
     */
    private String lrrmc;
    
    /**
     * 审核人
     */
    private String shrmc;
    
    /**
     * 审核状态
     */
    private String shzt_dm;
    
    /**
     * 审核意见
     */
    private String shyj;
    
    /**
     * 职员代码
     */
    private String zydm;
    
    /**
     * 代理机构编码
     */
    private String dljg_bm;
    
    /**
     * 删除标志
     */
    private int scbz;
    
    /**
     * 录入人员
     */
    private String lrry;
    
    /**
     * 删除人员
     */
    private String scry;
    
    /**
     * 审核人员
     */
    private String shry;
    
    /**
     * 录入日期
     */
    private Date lrrq;
    
    /**
     * 审核日期
     */
    private Date shrq;
    
    /**
     * 删除日期
     */
    private Date scrq;
    
    /**
     * 发送标志
     */
    private int fsbz;
    
    /**
     * 信息编码
     */
    private String xxbm;
    
    /**
     * 订单编号
     */
    private String ddbh;
    
    /**
     * 收费项目代码
     */
    private String sfxm_dm;
    
    /**
     * 收费项目名称
     */
    private String sfxm_mc;
    
    /**
     * 收费状态
     */
    private String sfzt;
    
    /**
     * 应收时间
     */
    private Date yssj;
    
    /**
     * 收费方式代码
     */
    private String sffs_dm;
    
    /**
     * 收费仿古式名称
     */
    private String sffs_mc;
    
    /**
     * 收费模式代码
     */
    private String sfms_dm;
    
    /**
     * 收费模式名称
     */
    private String sfms_mc;
    
    /**
     * 支付方式代码
     */
    private String zffs_dm;
    
    /**
     * 支付方式名称
     */
    private String zffs_mc;
    
    /**
     * 合同服务起
     */
    private Date ht_fwq;
    
    /**
     * 合同服务止
     */
    private Date ht_fwz;
    
    /**
     * 是否自动（1自动，0手动，默认自动）
     */
    private int ifauto;
    
    /**
     * 提醒次数
     */
    private int txcs;
    
    /**
     * 是否在线支付
     */
    private int onlinepay;

    /**
     * 客户经理
     */
    private String khjl;
    
    
    public int getOnlinepay() {
        return onlinepay;
    }

    public void setOnlinepay(int onlinepay) {
        this.onlinepay = onlinepay;
    }

    public int getIfauto() {
        return ifauto;
    }

    public void setIfauto(int ifauto) {
        this.ifauto = ifauto;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSjbm() {
        return sjbm;
    }

    public void setSjbm(String sjbm) {
        this.sjbm = sjbm;
    }

    public String getHtbm() {
        return htbm;
    }

    public void setHtbm(String htbm) {
        this.htbm = htbm;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }
    
    public String getKhmc() {
        return khmc;
    }

    public void setKhmc(String khmc) {
        this.khmc = khmc;
    }

    public String getSfnf() {
        return sfnf;
    }

    public void setSfnf(String sfnf) {
        this.sfnf = sfnf;
    }

    public String getSfyf() {
        return sfyf;
    }

    public void setSfyf(String sfyf) {
        this.sfyf = sfyf;
    }

    public Date getSfsj() {
        return sfsj;
    }

    public void setSfsj(Date sfsj) {
        this.sfsj = sfsj;
    }

    public BigDecimal getYsk() {
        return ysk;
    }

    public void setYsk(BigDecimal ysk) {
        this.ysk = ysk;
    }

    public BigDecimal getQtsf() {
        return qtsf;
    }

    public void setQtsf(BigDecimal qtsf) {
        this.qtsf = qtsf;
    }

    public BigDecimal getSjsk() {
        return sjsk;
    }

    public void setSjsk(BigDecimal sjsk) {
        this.sjsk = sjsk;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    public String getLrrmc() {
        return lrrmc;
    }

    public void setLrrmc(String lrrmc) {
        this.lrrmc = lrrmc;
    }

    public String getShrmc() {
        return shrmc;
    }

    public void setShrmc(String shrmc) {
        this.shrmc = shrmc;
    }

    public String getShzt_dm() {
        return shzt_dm;
    }

    public void setShzt_dm(String shzt_dm) {
        this.shzt_dm = shzt_dm;
    }

    public String getShyj() {
        return shyj;
    }

    public void setShyj(String shyj) {
        this.shyj = shyj;
    }

    public String getZydm() {
        return zydm;
    }

    public void setZydm(String zydm) {
        this.zydm = zydm;
    }

    public String getDljg_bm() {
        return dljg_bm;
    }

    public void setDljg_bm(String dljg_bm) {
        this.dljg_bm = dljg_bm;
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

    public String getShry() {
        return shry;
    }

    public void setShry(String shry) {
        this.shry = shry;
    }

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    public Date getShrq() {
        return shrq;
    }

    public void setShrq(Date shrq) {
        this.shrq = shrq;
    }

    public Date getScrq() {
        return scrq;
    }

    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }

    public int getFsbz() {
        return fsbz;
    }

    public void setFsbz(int fsbz) {
        this.fsbz = fsbz;
    }

    public String getXxbm() {
        return xxbm;
    }

    public void setXxbm(String xxbm) {
        this.xxbm = xxbm;
    }

    public String getDdbh() {
        return ddbh;
    }

    public void setDdbh(String ddbh) {
        this.ddbh = ddbh;
    }

    public String getSfxm_dm() {
        return sfxm_dm;
    }

    public void setSfxm_dm(String sfxm_dm) {
        this.sfxm_dm = sfxm_dm;
    }

    public String getSfxm_mc() {
        return sfxm_mc;
    }

    public void setSfxm_mc(String sfxm_mc) {
        this.sfxm_mc = sfxm_mc;
    }

    public String getSfzt() {
        return sfzt;
    }

    public void setSfzt(String sfzt) {
        this.sfzt = sfzt;
    }

    public Date getYssj() {
        return yssj;
    }

    public void setYssj(Date yssj) {
        this.yssj = yssj;
    }

    public String getSffs_dm() {
        return sffs_dm;
    }

    public void setSffs_dm(String sffs_dm) {
        this.sffs_dm = sffs_dm;
    }

    public String getSffs_mc() {
        return sffs_mc;
    }

    public void setSffs_mc(String sffs_mc) {
        this.sffs_mc = sffs_mc;
    }

    public String getSfms_dm() {
        return sfms_dm;
    }

    public void setSfms_dm(String sfms_dm) {
        this.sfms_dm = sfms_dm;
    }

    public String getSfms_mc() {
        return sfms_mc;
    }

    public void setSfms_mc(String sfms_mc) {
        this.sfms_mc = sfms_mc;
    }

    public String getZffs_dm() {
        return zffs_dm;
    }

    public void setZffs_dm(String zffs_dm) {
        this.zffs_dm = zffs_dm;
    }

    public String getZffs_mc() {
        return zffs_mc;
    }

    public void setZffs_mc(String zffs_mc) {
        this.zffs_mc = zffs_mc;
    }

    public Date getHt_fwq() {
        return ht_fwq;
    }

    public void setHt_fwq(Date ht_fwq) {
        this.ht_fwq = ht_fwq;
    }

    public Date getHt_fwz() {
        return ht_fwz;
    }

    public void setHt_fwz(Date ht_fwz) {
        this.ht_fwz = ht_fwz;
    }

    public int getTxcs() {
        return txcs;
    }

    public void setTxcs(int txcs) {
        this.txcs = txcs;
    }

    public String getKhjl() {
        return khjl;
    }

    public void setKhjl(String khjl) {
        this.khjl = khjl;
    }
}
