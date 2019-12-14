package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 *  超时提醒汇总
 */
public class OverdueReminder {
    /**
     *样品 受检单位
     */
    private  String DWMC;

    /**
     * 检测环节
     */
    private String jchj;

    /**
     * 超期天数
     */
    private String cqts;

    /**
     * 录入日期 as后
     */
    private String LRRQ;
    /**
     * 委托ID
     */
    private String WTID;

    public String getDWMC() {
        return DWMC;
    }

    public void setDWMC(String DWMC) {
        this.DWMC = DWMC;
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

    public String getLRRQ() {
        return LRRQ;
    }

    public void setLRRQ(String LRRQ) {
        this.LRRQ = LRRQ;
    }

    public String getWTID() {
        return WTID;
    }

    public void setWTID(String WTID) {
        this.WTID = WTID;
    }
}
