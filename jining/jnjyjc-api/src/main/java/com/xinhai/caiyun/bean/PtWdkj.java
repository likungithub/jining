package com.xinhai.caiyun.bean;

import javax.persistence.Table;

/**
 * @description: 根据客户编码获取当前代理记账公司的我的会计信息
 * @author  xinl
 * @date: 2017年11月06日 上午08:54:40
 * @version: v1.0
 */
@Table(name = "PT_SFXMGL")
public class PtWdkj {

    /**
     * 会计编码
     */
     private String kjbm;

    /**
     * 会计名称
     */
    private String kjmc;

    /**
     * 员工头像
     */
    private String ygtx;

    /**
     * 手机号码
     */
    private String sjhm;

    /**
     * 电子邮箱
     */
    private String dzyx;

    /**
     * 从业日期
     */
    private String cyrq;

    public String getKjbm() {
        return kjbm;
    }

    public void setKjbm(String kjbm) {
        this.kjbm = kjbm;
    }

    public String getKjmc() {
        return kjmc;
    }

    public void setKjmc(String kjmc) {
        this.kjmc = kjmc;
    }

    public String getYgtx() {
        return ygtx;
    }

    public void setYgtx(String ygtx) {
        this.ygtx = ygtx;
    }

    public String getSjhm() {
        return sjhm;
    }

    public void setSjhm(String sjhm) {
        this.sjhm = sjhm;
    }

    public String getDzyx() {
        return dzyx;
    }

    public void setDzyx(String dzyx) {
        this.dzyx = dzyx;
    }

    public String getCyrq() {
        return cyrq;
    }

    public void setCyrq(String cyrq) {
        this.cyrq = cyrq;
    }

}