package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;
import java.util.List;
/**
 * 平台流程步骤信息表(PT_LCGL_BZXX)
 * 
 * @author lixp
 * @version 1.0.0 2017-10-25
 */
public class Lcglbzxx  implements java.io.Serializable {
    /** 版本号 */
    private static final long serialVersionUID = -1684057838134312558L;
    /**
     * ID
     */
    private Long id;

    /**
     * 步骤ID
     */
    private String bzid;


    private String blzt;

    public String getBlzt() {
        return blzt;
    }

    public void setBlzt(String blzt) {
        this.blzt = blzt;
    }

    /**
     * 流程ID
     */
    private String lcid;

    /**
     * 步骤名称
     */
    private String bzmc;

    /**
     * 当前步骤
     */
    private String dqbz;

    /**
     * 0串行1并行
     */
    private String cxbxbz;


    /**
     * 备注信息
     */
    private String bzxx;

    /**
     * 删除标志
     */
    private Boolean scbz;
    
    /**
     * 部门代码
     */
    private String bmdm;

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
     * 步骤附件
     */
    List<Lcglbzfj> listLcglbzfj;
    
    /**
     * 附件地址 手机调用需要
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
     * 步骤名称
     * @return BZMC 步骤名称
     */
    public String getBzmc() {
        return bzmc;
    }

    /**
     * 步骤名称
     * @param bzmc 步骤名称
     */
    public void setBzmc(String bzmc) {
        this.bzmc = bzmc == null ? null : bzmc.trim();
    }

    /**
     * 当前步骤
     * @return DQBZ 当前步骤
     */
    public String getDqbz() {
        return dqbz;
    }

    /**
     * 当前步骤
     * @param dqbz 当前步骤
     */
    public void setDqbz(String dqbz) {
        this.dqbz = dqbz == null ? null : dqbz.trim();
    }

    /**
     * 0串行1并行
     * @return CXBXBZ 0串行1并行
     */
    public String getCxbxbz() {
        return cxbxbz;
    }

    /**
     * 0串行1并行
     * @param cxbxbz 0串行1并行
     */
    public void setCxbxbz(String cxbxbz) {
        this.cxbxbz = cxbxbz;
    }

    /**
     * 备注信息
     * @return BZXX 备注信息
     */
    public String getBzxx() {
        return bzxx;
    }

    /**
     * 备注信息
     * @param bzxx 备注信息
     */
    public void setBzxx(String bzxx) {
        this.bzxx = bzxx == null ? null : bzxx.trim();
    }
    
    
    
    public String getBmdm() {
        return bmdm;
    }

    public void setBmdm(String bmdm) {
        this.bmdm = bmdm;
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

    public List<Lcglbzfj> getListLcglbzfj() {
        return listLcglbzfj;
    }

    public void setListLcglbzfj(List<Lcglbzfj> listLcglbzfj) {
        this.listLcglbzfj = listLcglbzfj;
    }
    
    
}