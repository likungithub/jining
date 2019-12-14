package com.xinhai.caiyun.customermanage.api;

public class JcxFywh {

    private  int id;
    /**
     * 委托id
     */
    private  int wtid;
    /**
     * 样品id
     */
    private  int ypid;
    /**
     * 检测项id
     */
    private  int jcxid;
    /**
     * 费用
     */
    private String fy;
    /**
     * 录入人员
     */
    private String lrry;
    /**
     * 录入时间
     */
    private String lrrq;
    /**
     * 备注
     */
    private String bz;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getWtid() {
        return wtid;
    }

    public void setWtid(int wtid) {
        this.wtid = wtid;
    }

    public int getYpid() {
        return ypid;
    }

    public void setYpid(int ypid) {
        this.ypid = ypid;
    }

    public int getJcxid() {
        return jcxid;
    }

    public void setJcxid(int jcxid) {
        this.jcxid = jcxid;
    }

    public String getFy() {
        return fy;
    }

    public void setFy(String fy) {
        this.fy = fy;
    }

    public String getLrry() {
        return lrry;
    }

    public void setLrry(String lrry) {
        this.lrry = lrry;
    }

    public String getLrrq() {
        return lrrq;
    }

    public void setLrrq(String lrrq) {
        this.lrrq = lrrq;
    }

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }
}
