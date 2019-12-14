package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 * 平台任务人员代码表(PT_RWGL_RYDM)
 *
 * @author bianj
 * @version 1.0.0 2017-10-25
 */
public class Rwglrydm implements java.io.Serializable {
    /** 版本号 */
    private static final long serialVersionUID = 1684597695859270989L;

    /**
     * ID，自增列
     */
    private Long id;

    /**
     * 任务ID
     */
    private String rwid;

    /**
     * 执行人员dm
     */
    private String zxryDm;

    /**
     * 执行人员
     */
    private String zxryMc;

    /**
     * 执行人员部门dm
     */
    private String zxryBmdm;

    /**
     * 执行人员部门名称
     */
    private String zxryBmmc;

    /**
     * 删除状态1已删除0未删除
     */
    private Byte scbz;

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
     * ID，自增列
     * @return ID ID，自增列
     */
    public Long getId() {
        return id;
    }

    /**
     * ID，自增列
     * @param id ID，自增列
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 任务ID
     * @return RWID 任务ID
     */
    public String getRwid() {
        return rwid;
    }

    /**
     * 任务ID
     * @param rwid 任务ID
     */
    public void setRwid(String rwid) {
        this.rwid = rwid == null ? null : rwid.trim();
    }

    /**
     * 执行人员dm
     * @return ZXRY_DM 执行人员dm
     */
    public String getZxryDm() {
        return zxryDm;
    }

    /**
     * 执行人员dm
     * @param zxryDm 执行人员dm
     */
    public void setZxryDm(String zxryDm) {
        this.zxryDm = zxryDm == null ? null : zxryDm.trim();
    }

    /**
     * 执行人员
     * @return ZXRY_MC 执行人员
     */
    public String getZxryMc() {
        return zxryMc;
    }

    /**
     * 执行人员
     * @param zxryMc 执行人员
     */
    public void setZxryMc(String zxryMc) {
        this.zxryMc = zxryMc == null ? null : zxryMc.trim();
    }

    /**
     * 执行人员部门dm
     * @return ZXRY_BMDM 执行人员部门dm
     */
    public String getZxryBmdm() {
        return zxryBmdm;
    }

    /**
     * 执行人员部门dm
     * @param zxryBmdm 执行人员部门dm
     */
    public void setZxryBmdm(String zxryBmdm) {
        this.zxryBmdm = zxryBmdm == null ? null : zxryBmdm.trim();
    }

    /**
     * 执行人员部门名称
     * @return ZXRY_BMMC 执行人员部门名称
     */
    public String getZxryBmmc() {
        return zxryBmmc;
    }

    /**
     * 执行人员部门名称
     * @param zxryBmmc 执行人员部门名称
     */
    public void setZxryBmmc(String zxryBmmc) {
        this.zxryBmmc = zxryBmmc == null ? null : zxryBmmc.trim();
    }

    /**
     * 删除状态1已删除0未删除
     * @return SCBZ 删除状态1已删除0未删除
     */
    public Byte getScbz() {
        return scbz;
    }

    /**
     * 删除状态1已删除0未删除
     * @param scbz 删除状态1已删除0未删除
     */
    public void setScbz(Byte scbz) {
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