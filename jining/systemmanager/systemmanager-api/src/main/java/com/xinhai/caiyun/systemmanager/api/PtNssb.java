package com.xinhai.caiyun.systemmanager.api;

import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 纳税申报
 * 
 * @author lmf
 * 
 */
@Table(name = "pt_nssb")
public class PtNssb implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键 自增
     */
    @Id
    private Long id;

    /**
     * 客户编码
     */
    private String khbm;
    
    /**
     * 公司名称
     */
    private String yhmc;
    
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
     * 报税期
     */
    private String bsq;
    
    /**
     * 报率
     */
    private BigDecimal bsl;
    
    /**
     * 报税日
     */
    private Date bsr;
    
    /**
     * 提醒日期
     */
    private Date txrq;
    
    /**
     * 税款金额
     */
    private BigDecimal skje;
    
    /**
     * 报税状态
     */
    private Boolean bszt;
    
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
     * 录入人部门代码
     */
    private String bmdm;
    
    /**
     * 跟新人员
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
     * 查询开始日期
     */
    private Date startDate;
    
    /**
     * 查询结束日期
     */
    private Date endDate;
    
    /**
     * 是否是首页查询出的结果
     */
    private String isSearch;

    /**
     * 提前几天通知
     */
    private Integer days;
    
    /**
     * 下限
     */
    private Integer lowerdays;

    public String getBmdm() {
        return bmdm;
    }

    public void setBmdm(String bmdm) {
        this.bmdm = bmdm;
    }

    public Integer getLowerdays() {
        return lowerdays;
    }

    public void setLowerdays(Integer lowerdays) {
        this.lowerdays = lowerdays;
    }

    public Integer getDays() {
        return days;
    }

    public void setDays(Integer days) {
        this.days = days;
    }

    public String getIsSearch() {
        return isSearch;
    }

    public void setIsSearch(String isSearch) {
        this.isSearch = isSearch;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
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

    public String getZsxmDm() {
        return zsxmDm;
    }

    public void setZsxmDm(String zsxmDm) {
        this.zsxmDm = zsxmDm;
    }

    public String getSbzqDm() {
        return sbzqDm;
    }

    public void setSbzqDm(String sbzqDm) {
        this.sbzqDm = sbzqDm;
    }

    public BigDecimal getSkje() {
        return skje;
    }

    public void setSkje(BigDecimal skje) {
        this.skje = skje;
    }

    public Boolean getBszt() {
        return bszt;
    }

    public void setBszt(Boolean bszt) {
        this.bszt = bszt;
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

    public String getZsxmMc() {
        return zsxmMc;
    }

    public void setZsxmMc(String zsxmMc) {
        this.zsxmMc = zsxmMc;
    }

    public String getSbzqMc() {
        return sbzqMc;
    }

    public void setSbzqMc(String sbzqMc) {
        this.sbzqMc = sbzqMc;
    }

    public String getBsq() {
        return bsq;
    }

    public void setBsq(String bsq) {
        this.bsq = bsq;
    }

    public BigDecimal getBsl() {
        return bsl;
    }

    public void setBsl(BigDecimal bsl) {
        this.bsl = bsl;
    }

    public Date getBsr() {
        return bsr;
    }

    public void setBsr(Date bsr) {
        this.bsr = bsr;
    }

    public Date getTxrq() {
        return txrq;
    }

    public void setTxrq(Date txrq) {
        this.txrq = txrq;
    }
    
    

}