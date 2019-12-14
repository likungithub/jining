package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;
/**
 * 平台任务步骤信息表(PT_RWGL_BZXX)
 *
 * @author bianj
 * @version 1.0.0 2017-10-25
 */
public class Rwglbzxx implements java.io.Serializable {
    /** 版本号 */
    private static final long serialVersionUID = 2887918242854539955L;



    //任务步骤名称
    private String rwbzmc;

    public String getRwbzmc() {
        return rwbzmc;
    }

    public void setRwbzmc(String rwbzmc) {
        this.rwbzmc = rwbzmc;
    }

    /**
     * ID，自增列
     */
    private Long id;

    /**
     * 任务ID
     */
    private String rwid;


    public String getBlztmc() {
        return blztmc;
    }

    public void setBlztmc(String blztmc) {
        this.blztmc = blztmc;
    }


    /**
     * 步骤ID
     */
    private String bzid;

    /**
     * 备注信息
     */
    private String bzxx;

    /**
     * 执行人员
     */
    private String blry;

    /**
     * 删除状态1已删除0未删除
     */
    private Byte scbz;

    /**
     * 办理状态001已完成、002进行中（默认）、003已取消、004以延迟、005暂停中、006未开始
     */
    private String blzt;

    /**
     * 办理日期
     */
    private Date blrq;

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

    /**
     * 执行人员
     * @return BLRY 执行人员
     */
    public String getBlry() {
        return blry;
    }

    /**
     * 执行人员
     * @param blry 执行人员
     */
    public void setBlry(String blry) {
        this.blry = blry == null ? null : blry.trim();
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
     * 办理状态001已完成、002进行中（默认）、003已取消、004以延迟、005暂停中、006未开始
     * @return BLZT 办理状态001已完成、002进行中（默认）、003已取消、004以延迟、005暂停中、006未开始
     */
    public String getBlzt() {

        return blzt;
    }

    /**
     * 办理状态001已完成、002进行中（默认）、003已取消、004以延迟、005暂停中、006未开始
     * @param blzt 办理状态001已完成、002进行中（默认）、003已取消、004以延迟、005暂停中、006未开始
     */
    public void setBlzt(String blzt) {
        switch (blzt){
            case "001":{
                setBlztmc("已完成");
                break;
            }
            case "002":{
                setBlztmc("进行中");
                break;
            }
            case "003":{
                setBlztmc("已取消");
                break;
            }
            case "004":{
                setBlztmc("已延迟");
                break;
            }
            case "005":{
                setBlztmc("暂停中");
                break;
            }
            case "006":{
                setBlztmc("未开始") ;
                break;
            }
            default:{
                setBlztmc("进行中") ;
                break;
            }
        }
        this.blzt = blzt == null ? null : blzt.trim();
    }

    /**
     * 办理日期
     * @return BLRQ 办理日期
     */
    public Date getBlrq() {
        return blrq;
    }

    /**
     * 办理日期
     * @param blrq 办理日期
     */
    public void setBlrq(Date blrq) {
        this.blrq = blrq;
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

    /*
    * 办理状态名称
    * */
    private  String blztmc;

}