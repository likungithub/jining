package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 * 样品收样 -- 超时提醒
 */
public class YPSYOverdueReminder {
    private String ID;

    /**
     *样品 受检单位
     */
    private  String DWMC;
    /**
     *样品 录入日期
     */
    private Date SYRQ;

    /**
     * 检测环节
     */
    private String jchj = "样品收样";

    /**
     * 超期天数
     */
    private String cqts;

    /**
     *委托ID
     */
    private String WTID;
    /**
     * 录入日期 as后
     */
    private String LRRQ;

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getDWMC() {
        return DWMC;
    }

    public void setDWMC(String DWMC) {
        this.DWMC = DWMC;
    }

    public Date getSYRQ() {
        return SYRQ;
    }

    public void setSYRQ(Date SYRQ) {
        this.SYRQ = SYRQ;
    }

    public String getJchj() {
        return jchj;
    }

    public void setJchj(String jchj) {
        this.jchj = jchj;
    }

    public String getCqts() {
        return cqts;
    }

    public void setCqts(String cqts) {
        this.cqts = cqts;
    }

    public String getWTID() {
        return WTID;
    }

    public void setWTID(String WTID) {
        this.WTID = WTID;
    }

    public String getLRRQ() {
        return LRRQ;
    }

    public void setLRRQ(String LRRQ) {
        this.LRRQ = LRRQ;
    }
}
