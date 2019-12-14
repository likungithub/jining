package com.xinhai.caiyun.systemmanager.api;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class Hcmanage implements java.io.Serializable{
    //ID
    private int id ;
    //名称
    private String name ;
    //纯度级别
    private String cdjb ;
    // 规格
    private String gg ;
    //单位
    private String dw ;
    //单价（元）
    private int dj ;
    //批号
    private String ph ;
    // 编号
    private String num ;
    //生产日期
    private Date scdate ;
    // 有效期
    private int yxq ;
    //生产商
    private String scs ;
    // 库存数量
    private int kcsl ;
    //入库日期
    private Date rkrq ;
    // 保管人
    private String bgr ;
    //存放地点
    private String cfdd ;
    // 备注
    private String bz ;
    //申请人
    private String sqr ;
    // 审核人
    private String shr ;
    //审批人
    private String spr ;
    // 申请日期
    @DateTimeFormat(  pattern = "yyyy-MM-dd")
    private Date sqrq ;
    //申请数量
    private int sqsl ;
    // 归还日期
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date ghrq ;
    //类别
    private String lb ;
    //当前状态
    private  String state;
    //耗材名称
    private String hcmc;
    //耗材类型
    private String hclx;
    //
    //

    public String getHcmc() {
        return hcmc;
    }

    public void setHcmc(String hcmc) {
        this.hcmc = hcmc;
    }

    public String getHclx() {
        return hclx;
    }

    public void setHclx(String hclx) {
        this.hclx = hclx;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCdjb() {
        return cdjb;
    }

    public void setCdjb(String cdjb) {
        this.cdjb = cdjb;
    }

    public String getGg() {
        return gg;
    }

    public void setGg(String gg) {
        this.gg = gg;
    }

    public String getDw() {
        return dw;
    }

    public void setDw(String dw) {
        this.dw = dw;
    }

    public int getDj() {
        return dj;
    }

    public void setDj(int dj) {
        this.dj = dj;
    }

    public String getPh() {
        return ph;
    }

    public void setPh(String ph) {
        this.ph = ph;
    }

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public Date getScdate() {
        return scdate;
    }

    public void setScdate(Date scdate) {
        this.scdate = scdate;
    }

    public int getYxq() {
        return yxq;
    }

    public void setYxq(int yxq) {
        this.yxq = yxq;
    }

    public String getScs() {
        return scs;
    }

    public void setScs(String scs) {
        this.scs = scs;
    }

    public int getKcsl() {
        return kcsl;
    }

    public void setKcsl(int kcsl) {
        this.kcsl = kcsl;
    }

    public Date getRkrq() {
        return rkrq;
    }

    public void setRkrq(Date rkrq) {
        this.rkrq = rkrq;
    }

    public String getBgr() {
        return bgr;
    }

    public void setBgr(String bgr) {
        this.bgr = bgr;
    }

    public String getCfdd() {
        return cfdd;
    }

    public void setCfdd(String cfdd) {
        this.cfdd = cfdd;
    }

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }

    public String getSqr() {
        return sqr;
    }

    public void setSqr(String sqr) {
        this.sqr = sqr;
    }

    public String getShr() {
        return shr;
    }

    public void setShr(String shr) {
        this.shr = shr;
    }

    public String getSpr() {
        return spr;
    }

    public void setSpr(String spr) {
        this.spr = spr;
    }

    public Date getSqrq() {
        return sqrq;
    }

    public void setSqrq(Date sqrq) {
        this.sqrq = sqrq;
    }

    public int getSqsl() {
        return sqsl;
    }

    public void setSqsl(int sqsl) {
        this.sqsl = sqsl;
    }

    public Date getGhrq() {
        return ghrq;
    }

    public void setGhrq(Date ghrq) {
        this.ghrq = ghrq;
    }

    public String getLb() {
        return lb;
    }

    public void setLb(String lb) {
        this.lb = lb;
    }
}
