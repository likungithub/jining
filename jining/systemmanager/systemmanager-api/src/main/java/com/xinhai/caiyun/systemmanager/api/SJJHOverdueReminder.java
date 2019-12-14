package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 * 超时提醒 -- 数据校核
 */
public class SJJHOverdueReminder {

    private String ID;

    /**
     *样品 受检单位
     */
    private  String DWMC;
    /**
     *样品 检测开始日期
     */
    private Date s_date;
    /**
     *样品 检测开始日期
     */
    private String LRRQ;

    /**
     * 检测环节
     */
    private String jchj = "数据校核";

    /**
     * 超期天数
     */
    private String cqts;
    /**
     *委托ID
     */
    private String WTID;

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

    public Date getS_date() {
        return s_date;
    }

    public void setS_date(Date s_date) {
        this.s_date = s_date;
    }

    public String getLRRQ() {
        return LRRQ;
    }

    public void setLRRQ(String LRRQ) {
        this.LRRQ = LRRQ;
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
}
