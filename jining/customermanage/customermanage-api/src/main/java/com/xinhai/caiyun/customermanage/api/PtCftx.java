package com.xinhai.caiyun.customermanage.api;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Id;
import javax.persistence.Table;

import java.util.Date;

/**
 * Auto Generated Entity
 * 
 * @author Xinhai auto generated
 * 
 */
@Table(name = "pt_sfgl_cfyj")
public class PtCftx implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @Id
    private Long id;

    /**
     * 客户编码
     */
    private String khbm;
    
    /**
     * 合同编码
     */
    private String htbm;

    /**
     * 用户名称
     */
    private String yhmc;
    
    /**
     * 收费项目代码
     */
    private String sfxmDm;
    
    /**
     * 收费项目名称
     */
    private String sfxmMc;
    
    /**
     * 催费状态（001催费 002已交费 003欠费）
     */
    private String cfzt;
    
    /**
     * 实际收款
     */
    private BigDecimal sjsk;
    
    /**
     * 催费金额
     */
    private BigDecimal cfje;
    
    /**
     * 客户主管
     */
    private String zydm;
    
    /**
     * 客户姓名
     */
    private String zyxm;
    
    /**
     * 纳税人识别号
     */
    private String nsrsbh;
    
    /**
     * 代理机构编码
     */
    private String dljgBm;
    
    /**
     * 收费时间
     */
    private Date sfsj;
    
    /**
     * 收费月份
     */
    private Integer sfyf;
    
    /**
     * 收费年份
     */
    private Integer sfnf;
    
    /**
     * 录入日期
     */
    private Date lrrq;

    
    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    public String getHtbm() {
        return htbm;
    }

    public void setHtbm(String htbm) {
        this.htbm = htbm;
    }

    public String getSfxmMc() {
        return sfxmMc;
    }

    public void setSfxmMc(String sfxmMc) {
        this.sfxmMc = sfxmMc;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }

    public String getYhmc() {
        return yhmc;
    }

    public void setYhmc(String yhmc) {
        this.yhmc = yhmc;
    }

    public String getSfxmDm() {
        return sfxmDm;
    }

    public void setSfxmDm(String sfxmDm) {
        this.sfxmDm = sfxmDm;
    }

    public String getCfzt() {
        return cfzt;
    }

    public void setCfzt(String cfzt) {
        this.cfzt = cfzt;
    }

    public BigDecimal getSjsk() {
        return sjsk;
    }

    public void setSjsk(BigDecimal sjsk) {
        this.sjsk = sjsk;
    }

    public BigDecimal getCfje() {
        return cfje;
    }

    public void setCfje(BigDecimal cfje) {
        this.cfje = cfje;
    }

    public String getZydm() {
        return zydm;
    }

    public void setZydm(String zydm) {
        this.zydm = zydm;
    }

    public String getNsrsbh() {
        return nsrsbh;
    }

    public void setNsrsbh(String nsrsbh) {
        this.nsrsbh = nsrsbh;
    }

    public String getDljgBm() {
        return dljgBm;
    }

    public void setDljgBm(String dljgBm) {
        this.dljgBm = dljgBm;
    }

    public Date getSfsj() {
        return sfsj;
    }

    public void setSfsj(Date sfsj) {
        this.sfsj = sfsj;
    }

    public String getZyxm() {
        return zyxm;
    }

    public void setZyxm(String zyxm) {
        this.zyxm = zyxm;
    }

    public Integer getSfyf() {
        return sfyf;
    }

    public void setSfyf(Integer sfyf) {
        this.sfyf = sfyf;
    }

    public Integer getSfnf() {
        return sfnf;
    }

    public void setSfnf(Integer sfnf) {
        this.sfnf = sfnf;
    }

    

}