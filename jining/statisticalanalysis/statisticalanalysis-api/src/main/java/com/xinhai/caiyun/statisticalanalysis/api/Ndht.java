package com.xinhai.caiyun.statisticalanalysis.api;
import org.springframework.format.annotation.DateTimeFormat;
import java.io.Serializable;
import java.util.Date;
public class Ndht{
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date lrrq;
    private String wtid;
    private String htmc;
    private String dwmc;
    private String lxdh;
    private String yzbm;
    private String ypmc;

    @Override
    public String toString() {
        return "Ndht{" +
                "lrrq=" + lrrq +
                ", wtid='" + wtid + '\'' +
                ", htmc='" + htmc + '\'' +
                ", dwmc='" + dwmc + '\'' +
                ", lxdh='" + lxdh + '\'' +
                ", yzbm='" + yzbm + '\'' +
                ", ypmc='" + ypmc + '\'' +
                '}';
    }

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    public String getWtid() {
        return wtid;
    }

    public void setWtid(String wtid) {
        this.wtid = wtid;
    }

    public String getHtmc() {
        return htmc;
    }

    public void setHtmc(String htmc) {
        this.htmc = htmc;
    }

    public String getDwmc() {
        return dwmc;
    }

    public void setDwmc(String dwmc) {
        this.dwmc = dwmc;
    }

    public String getLxdh() {
        return lxdh;
    }

    public void setLxdh(String lxdh) {
        this.lxdh = lxdh;
    }

    public String getYzbm() {
        return yzbm;
    }

    public void setYzbm(String yzbm) {
        this.yzbm = yzbm;
    }

    public String getYpmc() {
        return ypmc;
    }

    public void setYpmc(String ypmc) {
        this.ypmc = ypmc;
    }
}
