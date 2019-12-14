package com.xinhai.caiyun.customermanage.api;

import java.util.Date;

public class QddsBssz {
    /** ID，自增列 */
    private Long id;

    /** 代理机构编码 */
    private String dljgBm;

    /** 客户编码 */
    private String khbm;

    /** 公司名称 */
    private String gsmc;

    /** 省份代码 */
    private String sfdm;

    /** 省份名称 */
    private String sfmc;

    /** 城市代码 */
    private String csdm;

    /** 城市名称 */
    private String csmc;

    /** 登陆类型0用户登陆1证件登陆 */
    private String dllx;

    /** 手机号或者邮箱 */
    private String sjh_yx;

    /** 证件类型名称 */
    private String zjlx_mc;

    /** 证件类型代码 */
    private String zjlx_dm;

    /** 证件号码 */
    private String zjhm;

    /** 办税人姓名 */
    private String bsrmc;

    /** 删除标志 */
    private String scbz;

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

    /** 删除日期 */
    private Date scrq;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDljgBm() {
        return dljgBm;
    }

    public void setDljgBm(String dljgBm) {
        this.dljgBm = dljgBm;
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



    public String getSfmc() {
        return sfmc;
    }

    public void setSfmc(String sfmc) {
        this.sfmc = sfmc;
    }



    public String getCsmc() {
        return csmc;
    }

    public void setCsmc(String csmc) {
        this.csmc = csmc;
    }

    public String getSjh_yx() {
        return sjh_yx;
    }

    public void setSjh_yx(String sjh_yx) {
        this.sjh_yx = sjh_yx;
    }

    public String getZjlx_mc() {
        return zjlx_mc;
    }

    public void setZjlx_mc(String zjlx_mc) {
        this.zjlx_mc = zjlx_mc;
    }

    public String getZjlx_dm() {
        return zjlx_dm;
    }

    public void setZjlx_dm(String zjlx_dm) {
        this.zjlx_dm = zjlx_dm;
    }

    public String getZjhm() {
        return zjhm;
    }

    public void setZjhm(String zjhm) {
        this.zjhm = zjhm;
    }

    public String getBsrmc() {
        return bsrmc;
    }

    public void setBsrmc(String bsrmc) {
        this.bsrmc = bsrmc;
    }

    public String getSfdm() {
        return sfdm;
    }

    public void setSfdm(String sfdm) {
        this.sfdm = sfdm;
    }

    public String getCsdm() {
        return csdm;
    }

    public void setCsdm(String csdm) {
        this.csdm = csdm;
    }

    public String getDllx() {
        return dllx;
    }

    public void setDllx(String dllx) {
        this.dllx = dllx;
    }

    public String getScbz() {
        return scbz;
    }

    public void setScbz(String scbz) {
        this.scbz = scbz;
    }

    public String getLrry() {
        return lrry;
    }

    public void setLrry(String lrry) {
        this.lrry = lrry;
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
}