package com.xinhai.caiyun.customermanage.api;

import java.util.Date;

/**
 * Created by Administrator on 2018/3/22 0022.
 */
public class Approval {

    /**
     * id
     */
    long ID;

    /**
     * 代理机构编码
     */
    String DLJG_BM;

    /**
     * 审批类型
     */
    String SPLX;

    /**
     * 审批类型名
     */
    String SPLXM;

    /**
     * 提交类型
     */
    String TJLX;

    /**
     * 备注信息（收费说明）
     */
    String BZXX;

    /**
     * 审核意见
     */
    String SHYJ;

    /**
     * 审核人员
     */
    String SHRY;

    /**
     * 审核人名称
     */
    String SHRMC;

    /**
     * 关联id
     */
    long GLID;

    /**
     * 审核日期
     */
    Date SHRQ;

    /**
     * 提交人
     */
    String TJR;

    /**
     * 提交人名称
     */
    String TJRMC;

    /**
     * 提交日期
     */
    Date TJRQ;

    /**
     * 录入日期
     */
    Date LRRQ;

    /**
     * 审核状态
     */
    String SHZT;

    public long getID() {
        return ID;
    }

    public void setID(long ID) {
        this.ID = ID;
    }

    public String getDLJG_BM() {
        return DLJG_BM;
    }

    public void setDLJG_BM(String DLJG_BM) {
        this.DLJG_BM = DLJG_BM;
    }

    public String getSPLX() {
        return SPLX;
    }

    public void setSPLX(String SPLX) {
        this.SPLX = SPLX;
    }

    public String getSPLXM() {
        return SPLXM;
    }

    public void setSPLXM(String SPLXM) {
        this.SPLXM = SPLXM;
    }

    public String getTJLX() {
        return TJLX;
    }

    public void setTJLX(String TJLX) {
        this.TJLX = TJLX;
    }

    public String getBZXX() {
        return BZXX;
    }

    public void setBZXX(String BZXX) {
        this.BZXX = BZXX;
    }

    public String getSHYJ() {
        return SHYJ;
    }

    public void setSHYJ(String SHYJ) {
        this.SHYJ = SHYJ;
    }

    public String getSHRY() {
        return SHRY;
    }

    public void setSHRY(String SHRY) {
        this.SHRY = SHRY;
    }

    public String getSHRMC() {
        return SHRMC;
    }

    public void setSHRMC(String SHRMC) {
        this.SHRMC = SHRMC;
    }

    public long getGLID() {
        return GLID;
    }

    public void setGLID(long GLID) {
        this.GLID = GLID;
    }

    public Date getSHRQ() {
        return SHRQ;
    }

    public void setSHRQ(Date SHRQ) {
        this.SHRQ = SHRQ;
    }

    public String getTJR() {
        return TJR;
    }

    public void setTJR(String TJR) {
        this.TJR = TJR;
    }

    public String getTJRMC() {
        return TJRMC;
    }

    public void setTJRMC(String TJRMC) {
        this.TJRMC = TJRMC;
    }

    public Date getTJRQ() {
        return TJRQ;
    }

    public void setTJRQ(Date TJRQ) {
        this.TJRQ = TJRQ;
    }

    public Date getLRRQ() {
        return LRRQ;
    }

    public void setLRRQ(Date LRRQ) {
        this.LRRQ = LRRQ;
    }

    public String getSHZT() {
        return SHZT;
    }

    public void setSHZT(String SHZT) {
        this.SHZT = SHZT;
    }
}
