package com.xinhai.caiyun.bean;

/**
 * @description:管理员欢迎页
 * @author xinl
 * @date: 2017年11月17日 上午09:12:00
 * @version: v1.0
 */
public class PtKhtj {
    /**
     * 统计类型名称
     */
    private  String lxmc;

    /**
     * 统计类型数量
     */
    private  String tj;

    /**
     * 客户编码
     */
    private String khbm;

    /**
     * 公司名称
     */
    private String gsmc;

    /**
     * 记账报税标志
     */
    private String bz;

    /**
     * 所属年月
     */
    private String ssny;

    public String getGsmc() {
        return gsmc;
    }

    public void setGsmc(String gsmc) {
        this.gsmc = gsmc;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }

    public String getLxmc() {
        return lxmc;
    }

    public void setLxmc(String lxmc) {
        this.lxmc = lxmc;
    }

    public String getTj() {
        return tj;
    }

    public void setTj(String tj) {
        this.tj = tj;
    }

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }

    public String getSsny() {
        return ssny;
    }

    public void setSsny(String ssny) {
        this.ssny = ssny;
    }
}
