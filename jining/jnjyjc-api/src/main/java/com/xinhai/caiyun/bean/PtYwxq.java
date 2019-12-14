package com.xinhai.caiyun.bean;

import javax.persistence.Table;

/**
 * @description: 获取当前代理记账公司的业务需求信息
 * @author  xinl
 * @date: 2017年11月03日 上午08:54:40
 * @version: v1.0
 */
@Table(name = "PT_APP_YWHZ")
public class PtYwxq {

    /**
     * 收费项目ID
     */
    private  String  hzid;

    /**
     * 申请日期
     */
    private  String  sqrq;

    /**
     * 联系方式（手机号码、QQ、邮箱）
     */
    private String lxfs;

    /**
     * 留言信息
     */
    private  String  lyxx;

    /**
     * 受理状态
     */
    private  String  slzt;

    /**
     * 受理时间
     */
    private  String  slsj;

    /**
     * 办理进度
     */
    private  String  bljd;

    public String getHzid() {
        return hzid;
    }

    public void setHzid(String hzid) {
        this.hzid = hzid;
    }

    public String getSqrq() {
        return sqrq;
    }

    public void setSqrq(String sqrq) {
        this.sqrq = sqrq;
    }

    public String getLxfs() {
        return lxfs;
    }

    public void setLxfs(String lxfs) {
        this.lxfs = lxfs;
    }

    public String getLyxx() {
        return lyxx;
    }

    public void setLyxx(String lyxx) {
        this.lyxx = lyxx;
    }

    public String getSlzt() {
        return slzt;
    }

    public void setSlzt(String slzt) {
        this.slzt = slzt;
    }

    public String getSlsj() {
        return slsj;
    }

    public void setSlsj(String slsj) {
        this.slsj = slsj;
    }

    public String getBljd() {
        return bljd;
    }

    public void setBljd(String bljd) {
        this.bljd = bljd;
    }

}
