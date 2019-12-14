package com.xinhai.caiyun.systemmanager.api;

/**
 * 任务分配
 */
public class RWFPOverdueReminder {
    private String ID;

    /**
     *样品 受检单位
     */
    private  String DWMC;
    /**
     *样品 录入日期
     */
    private String LRRQ;

    /**
     * 检测环节
     */
    private String jchj = "任务分配";

    /**
     * 超期天数
     */
    private String cqts;

    /**
     *委托ID
     */
    private String WTID;

    /**
     *ypcf表 委托
     */
    private String htbm;

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

    public String getHtbm() {
        return htbm;
    }

    public void setHtbm(String htbm) {
        this.htbm = htbm;
    }
}
