package com.xinhai.caiyun.systemmanager.api;


import java.util.Date;

/**
 * 收费记录信息(PT_RWGL_SFJL)
 * 
 * @author bianj
 * @version 1.0.0 2017-11-02
 */
public class RwglSfjl implements java.io.Serializable {
    /** 版本号 */
    private static final long serialVersionUID = 6053621822717618350L;


    private String fyxmdm;
    private String fyxmmc;

    public String getFyxmdm() {
        return fyxmdm;
    }

    public void setFyxmdm(String fyxmdm) {
        this.fyxmdm = fyxmdm;
    }

    public String getFyxmmc() {
        return fyxmmc;
    }

    public void setFyxmmc(String fyxmmc) {
        this.fyxmmc = fyxmmc;
    }

    private String bmdm;

    public String getBmdm() {
        return bmdm;
    }

    public void setBmdm(String bmdm) {
        this.bmdm = bmdm;
    }

    private String rwmc;

    public String getRwmc() {
        return rwmc;
    }

    public void setRwmc(String rwmc) {
        this.rwmc = rwmc;
    }

    private String dljgbm;

    public String getDljgbm() {
        return dljgbm;
    }

    public void setDljgbm(String dljgbm) {
        this.dljgbm = dljgbm;
    }

    /** ID，自增列 */
    private Long id;
    
    /** 收费项目代码 */
    private String sfxmDm;
    
    /** 收费项目名称 */
    private String sfxmMc;
    
    /** 任务ID */
    private String rwid;
    
    /** 收费金额或垫付金额 */
    private String je;
    
    /** 收费时间或垫付时间 */
    private Date sfsj;
    
    /** 收费标志 0正常缴费 1垫付 */
    private Byte sfbz;
    
    /** 备注信息 */
    private String bzxx;
    
    /** 企业名称 */
    private String qymc;
    
    /** 企业税号 */
    private String qysh;
    
    /** 联系人姓名 */
    private String lxrxm;
    
    /** 联系人电话 */
    private String lxrdh;
    
    /** 删除状态1：已删除、0：未删除 */
    private Byte scbz;
    
    /** 录入人员 */
    private String lrry;
    
    /** 更新人员 */
    private String gxry;
    
    /** 删除人员 */
    private String scry;
    
    /** 录入日期 */
    private Date lrrq;
    
    /** 更新日期 */
    private Date gxrq;
    
    /**
     * 获取ID，自增列
     * 
     * @return ID
     */
    public Long getId() {
        return this.id;
    }
     
    /**
     * 设置ID，自增列
     * 
     * @param id
     *          ID，自增列
     */
    public void setId(Long id) {
        this.id = id;
    }
    
    /**
     * 获取收费项目代码
     * 
     * @return 收费项目代码
     */
    public String getSfxmDm() {
        return this.sfxmDm;
    }
     
    /**
     * 设置收费项目代码
     * 
     * @param sfxmDm
     *          收费项目代码
     */
    public void setSfxmDm(String sfxmDm) {
        this.sfxmDm = sfxmDm;
    }
    
    /**
     * 获取收费项目名称
     * 
     * @return 收费项目名称
     */
    public String getSfxmMc() {
        return this.sfxmMc;
    }
     
    /**
     * 设置收费项目名称
     * 
     * @param sfxmMc
     *          收费项目名称
     */
    public void setSfxmMc(String sfxmMc) {
        this.sfxmMc = sfxmMc;
    }
    
    /**
     * 获取任务ID
     * 
     * @return 任务ID
     */
    public String getRwid() {
        return this.rwid;
    }
     
    /**
     * 设置任务ID
     * 
     * @param rwid
     *          任务ID
     */
    public void setRwid(String rwid) {
        this.rwid = rwid;
    }
    
    /**
     * 获取收费金额或垫付金额
     * 
     * @return 收费金额或垫付金额
     */
    public String getJe() {
        return this.je;
    }
     
    /**
     * 设置收费金额或垫付金额
     * 
     * @param je
     *          收费金额或垫付金额
     */
    public void setJe(String je) {
        this.je = je;
    }
    
    /**
     * 获取收费时间或垫付时间
     * 
     * @return 收费时间或垫付时间
     */
    public Date getSfsj() {
        return this.sfsj;
    }
     
    /**
     * 设置收费时间或垫付时间
     * 
     * @param sfsj
     *          收费时间或垫付时间
     */
    public void setSfsj(Date sfsj) {
        this.sfsj = sfsj;
    }
    
    /**
     * 获取收费标志 0正常缴费 1垫付
     * 
     * @return 收费标志 0正常缴费 1垫付
     */
    public Byte  getSfbz() {
        return this.sfbz;
    }
     
    /**
     * 设置收费标志 0正常缴费 1垫付
     * 
     * @param sfbz
     *          收费标志 0正常缴费 1垫付
     */
    public void setSfbz(Byte sfbz) {
        this.sfbz = sfbz;
    }
    
    /**
     * 获取备注信息
     * 
     * @return 备注信息
     */
    public String getBzxx() {
        return this.bzxx;
    }
     
    /**
     * 设置备注信息
     * 
     * @param bzxx
     *          备注信息
     */
    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }
    
    /**
     * 获取企业名称
     * 
     * @return 企业名称
     */
    public String getQymc() {
        return this.qymc;
    }
     
    /**
     * 设置企业名称
     * 
     * @param qymc
     *          企业名称
     */
    public void setQymc(String qymc) {
        this.qymc = qymc;
    }
    
    /**
     * 获取企业税号
     * 
     * @return 企业税号
     */
    public String getQysh() {
        return this.qysh;
    }
     
    /**
     * 设置企业税号
     * 
     * @param qysh
     *          企业税号
     */
    public void setQysh(String qysh) {
        this.qysh = qysh;
    }
    
    /**
     * 获取联系人姓名
     * 
     * @return 联系人姓名
     */
    public String getLxrxm() {
        return this.lxrxm;
    }
     
    /**
     * 设置联系人姓名
     * 
     * @param lxrxm
     *          联系人姓名
     */
    public void setLxrxm(String lxrxm) {
        this.lxrxm = lxrxm;
    }
    
    /**
     * 获取联系人电话
     * 
     * @return 联系人电话
     */
    public String getLxrdh() {
        return this.lxrdh;
    }
     
    /**
     * 设置联系人电话
     * 
     * @param lxrdh
     *          联系人电话
     */
    public void setLxrdh(String lxrdh) {
        this.lxrdh = lxrdh;
    }
    
    /**
     * 获取删除状态1：已删除、0：未删除
     * 
     * @return 删除状态1
     */
    public Byte getScbz() {
        return this.scbz;
    }
     
    /**
     * 设置删除状态1：已删除、0：未删除
     * 
     * @param scbz
     *          删除状态1：已删除、0：未删除
     */
    public void setScbz(Byte scbz) {
        this.scbz = scbz;
    }
    
    /**
     * 获取录入人员
     * 
     * @return 录入人员
     */
    public String getLrry() {
        return this.lrry;
    }
     
    /**
     * 设置录入人员
     * 
     * @param lrry
     *          录入人员
     */
    public void setLrry(String lrry) {
        this.lrry = lrry;
    }
    
    /**
     * 获取更新人员
     * 
     * @return 更新人员
     */
    public String getGxry() {
        return this.gxry;
    }
     
    /**
     * 设置更新人员
     * 
     * @param gxry
     *          更新人员
     */
    public void setGxry(String gxry) {
        this.gxry = gxry;
    }
    
    /**
     * 获取删除人员
     * 
     * @return 删除人员
     */
    public String getScry() {
        return this.scry;
    }
     
    /**
     * 设置删除人员
     * 
     * @param scry
     *          删除人员
     */
    public void setScry(String scry) {
        this.scry = scry;
    }
    
    /**
     * 获取录入日期
     * 
     * @return 录入日期
     */
    public Date getLrrq() {
        return this.lrrq;
    }
     
    /**
     * 设置录入日期
     * 
     * @param lrrq
     *          录入日期
     */
    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }
    
    /**
     * 获取更新日期
     * 
     * @return 更新日期
     */
    public Date getGxrq() {
        return this.gxrq;
    }
     
    /**
     * 设置更新日期
     * 
     * @param gxrq
     *          更新日期
     */
    public void setGxrq(Date gxrq) {
        this.gxrq = gxrq;
    }
}