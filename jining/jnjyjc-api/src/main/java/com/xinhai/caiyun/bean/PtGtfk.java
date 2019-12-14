package com.xinhai.caiyun.bean;

import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * @description: 沟通反馈信息实体类
 * @author  xinl
 * @date: 2017年6月29日 上午19:14:40
 * @version: v1.0
 */
@Table(name = "pt_gtfk")
public class PtGtfk implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 手机类型
     */
    private String sjlx;

    /**
     * 纳税人识别号
     */
    private String nsrsbh;

    /**
     * 代理机构编码
     */
    private String dljgbm;

    /**
     * 用户编码
     */
    private String khbm;
    
    /**
     * 职员代码
     */
    private String zybm;

    /**
     * 用户名称
     */
    private String yhmc;
    
    /**
     * 用户电话
     */
    private String yhdh;
    
    /**
     * 公司名称
     */
    private String gsmc;

    /**
     * 反馈信息
     */
    private String fkxx;

    /**
     * 反馈日期
     */
    private Date fkrq;

    public String getSjlx() {
        return sjlx;
    }

    public void setSjlx(String sjlx) {
        this.sjlx = sjlx;
    }

    public String getNsrsbh() {
        return nsrsbh;
    }

    public void setNsrsbh(String nsrsbh) {
        this.nsrsbh = nsrsbh;
    }

    public String getDljgbm() {
        return dljgbm;
    }

    public void setDljgbm(String dljgbm) {
        this.dljgbm = dljgbm;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }
    
    public String getZybm() {
        return zybm;
    }

    public void setZybm(String zybm) {
        this.zybm = zybm;
    }

    public String getFkxx() {
        return fkxx;
    }

    public void setFkxx(String fkxx) {
        this.fkxx = fkxx;
    }

    public Date getFkrq() {
        return fkrq;
    }

    public void setFkrq(Date fkrq) {
        this.fkrq = fkrq;
    }

    public String getYhmc() {
        return yhmc;
    }

    public void setYhmc(String yhmc) {
        this.yhmc = yhmc;
    }

    public String getYhdh() {
        return yhdh;
    }

    public void setYhdh(String yhdh) {
        this.yhdh = yhdh;
    }

    public String getGsmc() {
        return gsmc;
    }

    public void setGsmc(String gsmc) {
        this.gsmc = gsmc;
    }
    
}
