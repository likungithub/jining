package com.xinhai.reportmanager.api;

import java.util.List;

/**
 * Created by shanmaoju on 2018/7/29.
 */
public class Sample {
    private int id;
    private String ypbm;
    private String ypmc;
    private String dwmc;
    private String wtid;
    private String lxdh;
    private String sfmc;
    private String csmc;
    private String xjmc;
    private List<SampleItem> items;

    public Sample() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getYpbm() {
        return ypbm;
    }

    public void setYpbm(String ypbm) {
        this.ypbm = ypbm;
    }

    public String getYpmc() {
        return ypmc;
    }

    public void setYpmc(String ypmc) {
        this.ypmc = ypmc;
    }

    public String getDwmc() {
        return dwmc;
    }

    public void setDwmc(String dwmc) {
        this.dwmc = dwmc;
    }

    public String getWtid() {
        return wtid;
    }

    public void setWtid(String wtid) {
        this.wtid = wtid;
    }


    public String getLxdh() {
        return lxdh;
    }

    public void setLxdh(String lxdh) {
        this.lxdh = lxdh;
    }

    public String getSfmc() {
        return sfmc;
    }

    public void setSfmc(String sfmc) {
        this.sfmc = sfmc;
    }

    public String getCsmc() {
        return csmc;
    }

    public void setCsmc(String csmc) {
        this.csmc = csmc;
    }

    public String getXjmc() {
        return xjmc;
    }

    public void setXjmc(String xjmc) {
        this.xjmc = xjmc;
    }

    public List<SampleItem> getItems() {
        return items;
    }

    public void setItems(List<SampleItem> items) {
        this.items = items;
    }

}
