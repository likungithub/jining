package com.xinhai.caiyun.customermanage.api;

import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

/**
 * 平台青岛国税报税设置
 *
 * Created by zhangzixiang  on 2018/3/5
 */
public class Ptqdgsbssz implements Serializable {

    private static final long serialVersionUID = 1L;
    /**
     * ID,自增列
     */
    @Id
    private Long id;
    /**
     *代理机构编码
     * */
    private String dljgBm;
    /**
     *客户编码
     * */
    private String khbm;
    /**
     * 公司名称
     * */
    private String gsmc;
    /**
     * 省份代码
     * */
    private Integer sfdm;
    /**
     * 省份名称
     * */
    private String sfmc;
    /**
     * 城市代码
     * */
    private Integer csdm;
    /**
     * 城市名称
     * */
    private String csmc;
    /**
     * 税务局类型代码  001 国税， 002 地税， 003 国地税联合
     * */
    private String swjlxDm;
    /**
     * 税务局类型名称
     * */
    private String swjlxMc;
    /**
     * 税务局名称  例：选择山东省，青岛市，国税时，税务局名称为青岛市国家税务局；选择地税时为青岛市地方税务局。
     * */
    private String swjmc;
    /**
     * 办税员证件类型代码
     * */
    private String bsyzjlxDm;
    /**
     * 办税员证件类型名称
     * */
    private String bsyzjlxMc;
    /**
     * 办税员证件号码
     * */
    private String bsyzjhm;
    /**
     * 办税员服务密码
     * */
    private String bsyfwmm;
    /**
     * 企业纳税人识别号
     * */
    private String qynsrsbh;
    /**
     * 企业登录密码
     * */
    private String qydlmm;
    /**
     * 登录时间
     * */
    private Date dlsj;
    /**
     * 删除标志
     * */
    private Integer scbz;
    /**
     * 更新人员
     * */
    private String gxry;
    /**
     * 录入人员
     * */
    private String lrry;
    /**
     * 删除人员
     * */
    private String scry;
    /**
     * 录入日期
     * */
    private Date lrrq;
    /**
     * 更新日期
     * */
    private Date gxrq;
    /**
     * 删除日期
     * */
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

    public Integer getSfdm() {
        return sfdm;
    }

    public void setSfdm(Integer sfdm) {
        this.sfdm = sfdm;
    }

    public String getSfmc() {
        return sfmc;
    }

    public void setSfmc(String sfmc) {
        this.sfmc = sfmc;
    }

    public Integer getCsdm() {
        return csdm;
    }

    public void setCsdm(Integer csdm) {
        this.csdm = csdm;
    }

    public String getCsmc() {
        return csmc;
    }

    public void setCsmc(String csmc) {
        this.csmc = csmc;
    }

    public String getSwjlxDm() {
        return swjlxDm;
    }

    public void setSwjlxDm(String swjlxDm) {
        this.swjlxDm = swjlxDm;
    }

    public String getSwjlxMc() {
        return swjlxMc;
    }

    public void setSwjlxMc(String swjlxMc) {
        this.swjlxMc = swjlxMc;
    }

    public String getSwjmc() {
        return swjmc;
    }

    public void setSwjmc(String swjmc) {
        this.swjmc = swjmc;
    }

    public String getBsyzjlxDm() {
        return bsyzjlxDm;
    }

    public void setBsyzjlxDm(String bsyzjlxDm) {
        this.bsyzjlxDm = bsyzjlxDm;
    }

    public String getBsyzjlxMc() {
        return bsyzjlxMc;
    }

    public void setBsyzjlxMc(String bsyzjlxMc) {
        this.bsyzjlxMc = bsyzjlxMc;
    }

    public String getBsyzjhm() {
        return bsyzjhm;
    }

    public void setBsyzjhm(String bsyzjhm) {
        this.bsyzjhm = bsyzjhm;
    }

    public String getBsyfwmm() {
        return bsyfwmm;
    }

    public void setBsyfwmm(String bsyfwmm) {
        this.bsyfwmm = bsyfwmm;
    }

    public String getQynsrsbh() {
        return qynsrsbh;
    }

    public void setQynsrsbh(String qynsrsbh) {
        this.qynsrsbh = qynsrsbh;
    }

    public String getQydlmm() {
        return qydlmm;
    }

    public void setQydlmm(String qydlmm) {
        this.qydlmm = qydlmm;
    }

    public Date getDlsj() {
        return dlsj;
    }

    public void setDlsj(Date dlsj) {
        this.dlsj = dlsj;
    }

    public Integer getScbz() {
        return scbz;
    }

    public void setScbz(Integer scbz) {
        this.scbz = scbz;
    }

    public String getGxry() {
        return gxry;
    }

    public void setGxry(String gxry) {
        this.gxry = gxry;
    }

    public String getLrry() {
        return lrry;
    }

    public void setLrry(String lrry) {
        this.lrry = lrry;
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
