package com.xinhai.organization.api;

import java.math.BigDecimal;

public class Nums {
    /**
     * 员工数量
     */
    private int userNum;
    
    /**
     * 客户数量
     */
    private int khNum;
    
    /**
     * 任务数量
     */
    private int rwNum;
    
    /**
     * 已删除数据
     */
    private int delNum;
    
    /**
     * 子节点数目
     */
    private int sonNum;

    /**
     * 负责的数目
     */
    private int fzNum;

    /**
     * 发起的数目
     */
    private int fqNum;

    /**
     * 执行的数目
     */
    private int zxNum;

    /**
     * 该任务已完成的步骤（首页计算使用）
     */
    private int ywc;

    /**
     * 该任务全部的步骤（首页计算使用）
     */
    private int zsm;

    /**
     * 该任步骤的完成率（首页计算使用）
     */
    private BigDecimal wcl;

    public int getYwc() {
        return ywc;
    }

    public void setYwc(int ywc) {
        this.ywc = ywc;
    }

    public int getZsm() {
        return zsm;
    }

    public void setZsm(int zsm) {
        this.zsm = zsm;
    }

    public BigDecimal getWcl() {
        return wcl;
    }

    public void setWcl(BigDecimal wcl) {
        this.wcl = wcl;
    }

    public int getFzNum() {
        return fzNum;
    }

    public void setFzNum(int fzNum) {
        this.fzNum = fzNum;
    }

    public int getFqNum() {
        return fqNum;
    }

    public void setFqNum(int fqNum) {
        this.fqNum = fqNum;
    }

    public int getZxNum() {
        return zxNum;
    }

    public void setZxNum(int zxNum) {
        this.zxNum = zxNum;
    }

    public int getDelNum() {
        return delNum;
    }

    public void setDelNum(int delNum) {
        this.delNum = delNum;
    }

    public int getSonNum() {
        return sonNum;
    }

    public void setSonNum(int sonNum) {
        this.sonNum = sonNum;
    }

    public int getUserNum() {
        return userNum;
    }

    public void setUserNum(int userNum) {
        this.userNum = userNum;
    }

    public int getKhNum() {
        return khNum;
    }

    public void setKhNum(int khNum) {
        this.khNum = khNum;
    }

    public int getRwNum() {
        return rwNum;
    }

    public void setRwNum(int rwNum) {
        this.rwNum = rwNum;
    }
    
    
}
