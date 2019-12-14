package com.xinhai.caiyun.systemmanager.api;

public class Lysq implements java.io.Serializable{
    private int id ;
    private String name;
    //耗材规格
    private  String gg;
    //耗材型号
    private  String xh;
    // 耗材数量
    private  String num;
    //耗材单位
    private String dw;
    //申请日期
    private  String sqrq;
    //是否加急
    private String sfjj;
    //申请状态
    private String sqzt;
    //申请理由
    private String sqly;
    //备注信息
    private String bz;


    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
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

    public String getGg() {
        return gg;
    }

    public void setGg(String gg) {
        this.gg = gg;
    }

    public String getXh() {
        return xh;
    }

    public void setXh(String xh) {
        this.xh = xh;
    }



    public String getDw() {
        return dw;
    }

    public void setDw(String dw) {
        this.dw = dw;
    }

    public String getSqrq() {
        return sqrq;
    }

    public void setSqrq(String sqrq) {
        this.sqrq = sqrq;
    }

    public String getSfjj() {
        return sfjj;
    }

    public void setSfjj(String sfjj) {
        this.sfjj = sfjj;
    }

    public String getSqzt() {
        return sqzt;
    }

    public void setSqzt(String sqzt) {
        this.sqzt = sqzt;
    }

    public String getSqly() {
        return sqly;
    }

    public void setSqly(String sqly) {
        this.sqly = sqly;
    }

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }
}
