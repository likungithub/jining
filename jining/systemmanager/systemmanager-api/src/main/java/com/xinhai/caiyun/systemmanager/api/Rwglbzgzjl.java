package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 * 平台任务步骤工作记录(PT_RWGL_BZGZJL)
 *
 * @author bianj
 * @version 1.0.0 2017-10-26
 */

public class Rwglbzgzjl implements java.io.Serializable {
    /** 版本号 */
    private static final long serialVersionUID = -4726659570358366422L;


    public String getLrrmc() {
        return lrrmc;
    }

    public void setLrrmc(String lrrmc) {
        this.lrrmc = lrrmc;
    }

    private String lrrmc;



    public String getJlid() {
        return jlid;
    }

    public void setJlid(String jlid) {
        this.jlid = jlid;
    }


    public String getRwtx() {
        return rwtx;
    }

    public void setRwtx(String rwtx) {
        this.rwtx = rwtx;
    }

    public String getBlztmc() {
        return blztmc;
    }

    public void setBlztmc(String blztmc) {
        this.blztmc = blztmc;
    }




    /*
        * 任务提醒
        * */
    private String rwtx;



    /*
        * 工作记录ID
        * */
    private String jlid;


    /**
     * ID，自增列
     */
    private Long id;

    /**
     * 任务ID
     */
    private String rwid;

    /**
     * 步骤ID
     */
    private String bzid;

    /**
     * 工作内容
     */
    private String gznr;

    /**
     * 办理状态001已完成、002进行中（默认）、003已取消、004以延迟、005暂停中、006未开始
     */
    private String blzt;

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

    public Date getScrq() {
        return scrq;
    }

    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }

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
     * 工作内容
     * @return GZNR 工作内容
     */
    public String getGznr() {
        return gznr;
    }

    /**
     * 工作内容
     * @param gznr 工作内容
     */
    public void setGznr(String gznr) {
        this.gznr = gznr == null ? null : gznr.trim();
    }

    /**
     * 办理状态001已完成、002进行中（默认）、003已取消、004以延迟、005暂停中、006未开始
     * @return BLZT 办理状态001已完成、002进行中（默认）、003已取消、004以延迟、005暂停中、006未开始
     */
    public String getBlzt() {
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
        return blzt;
    }

    /**
     * 办理状态001已完成、002进行中（默认）、003已取消、004以延迟、005暂停中、006未开始
     * @param blzt 办理状态001已完成、002进行中（默认）、003已取消、004以延迟、005暂停中、006未开始
     */
    public void setBlzt(String blzt) {
        this.blzt = blzt == null ? null : blzt.trim();
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
     *办理状态名称
     */

    private  String blztmc;

}