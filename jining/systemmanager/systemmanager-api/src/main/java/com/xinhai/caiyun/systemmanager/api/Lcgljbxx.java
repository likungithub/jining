package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;
import java.util.List;

/**
 * 流程管理(PT_LCGL_JBXX)
 * 
 * @author lixp
 * @version 1.0.0 2017-10-25
 */
public class Lcgljbxx implements java.io.Serializable {
    /** 版本号 */
    private static final long serialVersionUID = 2174004035472586476L;
    /**
     * ID
     */
    private Long id;

    //流程步骤是否完整
    private String sfwz;

    public String getSfwz() {
        return sfwz;
    }

    public void setSfwz(String sfwz) {
        this.sfwz = sfwz;
    }

    /**
     * 流程ID
     */
    private String lcid;

    /**
     * 流程名称
     */
    private String lcmc;

    /**
     * 收费项目代码
     */
    private String sfxmDm;
    
    /**
     * 收费项目代码
     */
    private String sfxmMc;

    /**
     * 流程步骤数
     */
    private String lcbz;

    /**
     * 流程描述
     */
    private String lcms;

    /**
     * 代理机构编码
     */
    private String dljgbm;
    
    /**
     * 部门编码
     */
    private String bmdm;
    
    /**
     * 平台流程管理附件
     */
    private List<Lcgljbxxfj> listLcgljbxxfj;
    
    /**
     * 平台流程管理步骤
     */
    private List<Lcglbzxx> listLcglbzxx;

    /**
     * 删除标志
     */
    private Boolean scbz;

    /**
     * 录入人员
     */
    private String lrry;
    
    /**
     * 录入人员名称
     */
    private String lrryMc;

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
     * 附件地址
     */
    private String fjdz;
    
    

    public String getFjdz() {
        return fjdz;
    }

    public void setFjdz(String fjdz) {
        this.fjdz = fjdz;
    }

    /**
     * ID
     * @return ID ID
     */
    public Long getId() {
        return id;
    }

    /**
     * ID
     * @param id ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 流程ID
     * @return LCID 流程ID
     */
    public String getLcid() {
        return lcid;
    }

    /**
     * 流程ID
     * @param lcid 流程ID
     */
    public void setLcid(String lcid) {
        this.lcid = lcid == null ? null : lcid.trim();
    }

    /**
     * 流程名称
     * @return LCMC 流程名称
     */
    public String getLcmc() {
        return lcmc;
    }

    /**
     * 流程名称
     * @param lcmc 流程名称
     */
    public void setLcmc(String lcmc) {
        this.lcmc = lcmc == null ? null : lcmc.trim();
    }

    /**
     * 收费项目代码
     * @return SFXM_DM 收费项目代码
     */
    public String getSfxmDm() {
        return sfxmDm;
    }

    /**
     * 收费项目代码
     * @param sfxmDm 收费项目代码
     */
    public void setSfxmDm(String sfxmDm) {
        this.sfxmDm = sfxmDm == null ? null : sfxmDm.trim();
    }
    
    
    
    public String getSfxmMc() {
        return sfxmMc;
    }

    public void setSfxmMc(String sfxmMc) {
        this.sfxmMc = sfxmMc;
    }

    /**
     * 流程步骤数
     * @return LCBZ 流程步骤数
     */
    public String getLcbz() {
        return lcbz;
    }

    /**
     * 流程步骤数
     * @param lcbz 流程步骤数
     */
    public void setLcbz(String lcbz) {
        this.lcbz = lcbz == null ? null : lcbz.trim();
    }

    /**
     * 流程描述
     * @return LCMS 流程描述
     */
    public String getLcms() {
        return lcms;
    }

    /**
     * 流程描述
     * @param lcms 流程描述
     */
    public void setLcms(String lcms) {
        this.lcms = lcms == null ? null : lcms.trim();
    }

    /**
     * 代理机构编码
     * @return DLJGBM 代理机构编码
     */
    public String getDljgbm() {
        return dljgbm;
    }

    /**
     * 代理机构编码
     * @param dljgbm 代理机构编码
     */
    public void setDljgbm(String dljgbm) {
        this.dljgbm = dljgbm == null ? null : dljgbm.trim();
    }
    
    
    public List<Lcgljbxxfj> getListLcgljbxxfj() {
        return listLcgljbxxfj;
    }

    public void setListLcgljbxxfj(List<Lcgljbxxfj> listLcgljbxxfj) {
        this.listLcgljbxxfj = listLcgljbxxfj;
    }
    
    
    
    public List<Lcglbzxx> getListLcglbzxx() {
        return listLcglbzxx;
    }

    public void setListLcglbzxx(List<Lcglbzxx> listLcglbzxx) {
        this.listLcglbzxx = listLcglbzxx;
    }

    /**
     * 删除标志
     * @return SCBZ 删除标志
     */
    public Boolean getScbz() {
        return scbz;
    }

    /**
     * 删除标志
     * @param scbz 删除标志
     */
    public void setScbz(Boolean scbz) {
        this.scbz = scbz;
    }

    /**
     * 录入人员
     * @return LRRY 录入人员
     */
    public String getLrry() {
        return lrry;
    }

    /**
     * 录入人员
     * @param lrry 录入人员
     */
    public void setLrry(String lrry) {
        this.lrry = lrry == null ? null : lrry.trim();
    }

    /**
     * 更新人员
     * @return GXRY 更新人员
     */
    public String getGxry() {
        return gxry;
    }

    /**
     * 更新人员
     * @param gxry 更新人员
     */
    public void setGxry(String gxry) {
        this.gxry = gxry == null ? null : gxry.trim();
    }

    /**
     * 删除人员
     * @return SCRY 删除人员
     */
    public String getScry() {
        return scry;
    }

    /**
     * 删除人员
     * @param scry 删除人员
     */
    public void setScry(String scry) {
        this.scry = scry == null ? null : scry.trim();
    }

    /**
     * 录入日期
     * @return LRRQ 录入日期
     */
    public Date getLrrq() {
        return lrrq;
    }

    /**
     * 录入日期
     * @param lrrq 录入日期
     */
    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    /**
     * 更新日期
     * @return GXRQ 更新日期
     */
    public Date getGxrq() {
        return gxrq;
    }

    /**
     * 更新日期
     * @param gxrq 更新日期
     */
    public void setGxrq(Date gxrq) {
        this.gxrq = gxrq;
    }

    /**
     * 删除日期
     * @return SCRQ 删除日期
     */
    public Date getScrq() {
        return scrq;
    }

    /**
     * 删除日期
     * @param scrq 删除日期
     */
    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }

    public String getBmdm() {
        return bmdm;
    }

    public void setBmdm(String bmdm) {
        this.bmdm = bmdm;
    }

    public String getLrryMc() {
        return lrryMc;
    }

    public void setLrryMc(String lrryMc) {
        this.lrryMc = lrryMc;
    }
    
    
    
}