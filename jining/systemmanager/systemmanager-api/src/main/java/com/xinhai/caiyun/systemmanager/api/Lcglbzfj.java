package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;
/**
 * 平台流程步骤附件表(PT_LCGL_BZFJ)
 * 
 * @author lixp
 * @version 1.0.0 2017-10-25
 */
public class Lcglbzfj  implements java.io.Serializable {
    /** 版本号 */
    private static final long serialVersionUID = -4413438927864189980L;
    /**
     * ID
     */
    private Long id;

    /**
     * 步骤ID
     */
    private String bzid;
    
    /**
     * 步骤ID
     */
    private String lcid;

    /**
     * 附件名称
     */
    private String fjmc;

    /**
     * 附件存储路径
     */
    private String fjcclj;

    /**
     * 删除标志
     */
    private Boolean scbz;

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
     * 步骤ID
     * @return BZID 步骤ID
     */
    public String getBzid() {
        return bzid;
    }

    /**
     * 步骤ID
     * @param bzid 步骤ID
     */
    public void setBzid(String bzid) {
        this.bzid = bzid == null ? null : bzid.trim();
    }

    
    
    public String getLcid() {
        return lcid;
    }

    public void setLcid(String lcid) {
        this.lcid = lcid;
    }

    /**
     * 附件名称
     * @return FJMC 附件名称
     */
    public String getFjmc() {
        return fjmc;
    }

    /**
     * 附件名称
     * @param fjmc 附件名称
     */
    public void setFjmc(String fjmc) {
        this.fjmc = fjmc == null ? null : fjmc.trim();
    }

    /**
     * 附件存储路径
     * @return FJCCLJ 附件存储路径
     */
    public String getFjcclj() {
        return fjcclj;
    }

    /**
     * 附件存储路径
     * @param fjcclj 附件存储路径
     */
    public void setFjcclj(String fjcclj) {
        this.fjcclj = fjcclj == null ? null : fjcclj.trim();
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
}