package com.xinhai.caiyun.customermanage.api;

import java.util.Date;

import javax.persistence.Id;

import com.xinhai.caiyun.commonmanager.api.ExcelVOAttribute;

public class PtKhAccountAndTax {

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
     * 公司名称
     */
    private String gsmc;
    
    /**
     * 客户主管代码
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
     * 所属年月
     */
    private String ssny;
    
    /**
     * 记账标志
     */
    private boolean jzbz;
    
    /**
     * 报税标志
     */
    private boolean bsbz;

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

    public String getGsmc() {
        return gsmc;
    }

    public void setGsmc(String gsmc) {
        this.gsmc = gsmc;
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

    public String getBmdm() {
        return bmdm;
    }

    public void setBmdm(String bmdm) {
        this.bmdm = bmdm;
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

    public String getSsny() {
        return ssny;
    }

    public void setSsny(String ssny) {
        this.ssny = ssny;
    }

    public boolean isJzbz() {
        return jzbz;
    }

    public void setJzbz(boolean jzbz) {
        this.jzbz = jzbz;
    }

    public boolean isBsbz() {
        return bsbz;
    }

    public void setBsbz(boolean bsbz) {
        this.bsbz = bsbz;
    }
    
    
}
