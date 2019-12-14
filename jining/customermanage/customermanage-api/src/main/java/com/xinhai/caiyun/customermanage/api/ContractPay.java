package com.xinhai.caiyun.customermanage.api;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Date;

/**
 * 合同收费项目
 * @author tangck
 *
 */
public class ContractPay {
    
    /**
     * 编号
     */
    private String id;
    
    /**
     * 合同编码
     */
    private String htbm;
    
    /**
     * 客户编码
     */
    private String khbm;
    
    /**
     * 收费项目编码
     */
    private String sfxm_dm;
    
    /**
     * 收费项目名称
     */
    private String sfxm_mc;
    
    /**
     * 收费金额
     */
    private BigDecimal sfje;
    
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
    
    public BigDecimal getSfje() {
        return sfje;
    }
    
    public void setSfje(BigDecimal sfje) {
        this.sfje = sfje;
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
