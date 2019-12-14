package com.xinhai.caiyun.systemmanager.api;

public class BGBZOverdueReminder {
    private String ID;

    /**
     * 检测环节
     */
    private String jchj = "报告编制";

    /**
     *样品 受检单位
     */
    private  String DWMC;

    /**
     * 录入日期
     */
    private String LRRQ;

    /**
     * 超期天数
     */
    private String cqts;

    /**
     *委托ID/任务ID
     */
    private String YPID;

    /**
     *类型 任务类型1样品检测2数据校验3数据审查
     */
    private String LX;

    private String WTID;

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getJchj() {
        return jchj;
    }

    public void setJchj(String jchj) {
        this.jchj = jchj;
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

    public String getCqts() {
        return cqts;
    }

    public void setCqts(String cqts) {
        this.cqts = cqts;
    }

    public String getYPID() {
        return YPID;
    }

    public void setYPID(String YPID) {
        this.YPID = YPID;
    }

    public String getLX() {
        return LX;
    }

    public void setLX(String LX) {
        this.LX = LX;
    }

    public String getWTID() {
        return WTID;
    }

    public void setWtid(String WTID) {
        this.WTID = WTID;
    }
}
