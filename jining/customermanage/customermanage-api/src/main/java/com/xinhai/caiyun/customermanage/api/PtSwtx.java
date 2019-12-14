package com.xinhai.caiyun.customermanage.api;

import java.io.Serializable;

import javax.persistence.Id;
import javax.persistence.Table;

import java.util.Date;

/**
 * 税务提醒
 * 
 * @author Xinhai auto generated
 * 
 */
@Table(name = "pt_swtx")
public class PtSwtx implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    /**
     * 客户编码
     */
    private String khbm;
    
    /**
     * 税种代码
     */
    private String zsxmDm;
    
    /**
     * 税种名称
     */
    private String zsxmMc;
    
    /**
     * 申报周期代码
     */
    private String sbzqDm;
    
    /**
     * 申报周期名称
     */
    private String sbzqMc;
    
    /**
     * 报税月份（年报时有该字段）
     */
    private String bsyf;
    
    /**
     * 报税日期（次月几日前报税）
     */
    private String bsrq;
    
    /**
     * 客户主管
     */
    private String zydm;
    
    /**
     * 纳税人识别号
     */
    private String nsrsbh;
    
    /**
     * 代理机构编码
     */
    private String dljgBm;
    
    /**
     * 删除标志
     */
    private Boolean scbz;
    
    /**
     * 录入人员
     */
    private String lrry;
    
    /**
     * 录入人所在部门编码
     */
    private String bmdm;
    
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
     * 最终产生的提醒日期
     */
    private Date txrq;

    
    public String getBmdm() {
        return bmdm;
    }

    public void setBmdm(String bmdm) {
        this.bmdm = bmdm;
    }

    public Date getTxrq() {
        return txrq;
    }

    public void setTxrq(Date txrq) {
        this.txrq = txrq;
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

    public String getZsxmDm() {
        return zsxmDm;
    }

    public void setZsxmDm(String zsxmDm) {
        this.zsxmDm = zsxmDm;
    }

    public String getZsxmMc() {
        return zsxmMc;
    }

    public void setZsxmMc(String zsxmMc) {
        this.zsxmMc = zsxmMc;
    }

    public String getSbzqDm() {
        return sbzqDm;
    }

    public void setSbzqDm(String sbzqDm) {
        this.sbzqDm = sbzqDm;
    }

    public String getSbzqMc() {
        return sbzqMc;
    }

    public void setSbzqMc(String sbzqMc) {
        this.sbzqMc = sbzqMc;
    }

    public String getBsyf() {
        return bsyf;
    }

    public void setBsyf(String bsyf) {
        this.bsyf = bsyf;
    }

    public String getBsrq() {
        return bsrq;
    }

    public void setBsrq(String bsrq) {
        this.bsrq = bsrq;
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