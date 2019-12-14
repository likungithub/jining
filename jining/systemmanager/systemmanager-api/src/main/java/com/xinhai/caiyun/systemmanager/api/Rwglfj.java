package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 * 平台任务附件表(PT_RWGL_FJ)
 *
 * @author bianj
 * @version 1.0.0 2017-10-25
 */
public class Rwglfj implements java.io.Serializable {
    /** 版本号 */
    private static final long serialVersionUID = 3181437344767862031L;


    /*
    * 文件类型
    * */
    private String wjlx;

    /*
    * 文件大小
    * */
    private String wjdx;

    public String getWjlx() {
        return wjlx;
    }

    public void setWjlx(String wjlx) {
        this.wjlx = wjlx;
    }

    public String getWjdx() {
        return wjdx;
    }

    public void setWjdx(String wjdx) {
        this.wjdx = wjdx;
    }

    /**
     * ID，自增列
     */
    private Long id;

    /**
     * 附件ID
     */
    private String fjid;

    /**
     * 任务ID
     */
    private String rwid;

    /**
     * 附件序号
     */
    private Byte fjxh;

    /**
     * 附件名称
     */
    private String fjmc;

    /**
     * 附件存储路径
     */
    private String fjcclj;

    /**
     * 状态1已删除0未删除
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
     * 附件ID
     * @return FJID 附件ID
     */
    public String getFjid() {
        return fjid;
    }

    /**
     * 附件ID
     * @param fjid 附件ID
     */
    public void setFjid(String fjid) {
        this.fjid = fjid == null ? null : fjid.trim();
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
     * 附件序号
     * @return FJXH 附件序号
     */
    public Byte getFjxh() {
        return fjxh;
    }

    /**
     * 附件序号
     * @param fjxh 附件序号
     */
    public void setFjxh(Byte fjxh) {
        this.fjxh = fjxh;
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
     * 状态1已删除0未删除
     * @return SCBZ 状态1已删除0未删除
     */
    public Byte getScbz() {
        return scbz;
    }

    /**
     * 状态1已删除0未删除
     * @param scbz 状态1已删除0未删除
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