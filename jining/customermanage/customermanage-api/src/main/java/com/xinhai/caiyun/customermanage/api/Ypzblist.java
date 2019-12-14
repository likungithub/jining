package com.xinhai.caiyun.customermanage.api;

import org.springframework.format.annotation.DateTimeFormat;

public class Ypzblist {
    private Integer id;//制备样品id
    private String ypbm;//样品编码
    private String ypzt;//制备样品状态
    private String zbypbm;//制备样品编码
    private String sl;//制备样品数量
    private String dw;//制备样品单位
    private String ypmc;//制备样品名称
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String zbDate;//制备样品时间
    private String zbfs;//制备方式
    private String zbzl;//制备质量

    public String getZbzl() {
        return zbzl;
    }

    public void setZbzl(String zbzl) {
        this.zbzl = zbzl;
    }

    public String getZbfs() {
        return zbfs;
    }

    public void setZbfs(String zbfs) {
        this.zbfs = zbfs;
    }

    public String getZbDate() {
        return zbDate;
    }

    public void setZbDate(String zbDate) {
        this.zbDate = zbDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getYpbm() {
        return ypbm;
    }

    public void setYpbm(String ypbm) {
        this.ypbm = ypbm;
    }

    public String getYpzt() {
        return ypzt;
    }

    public void setYpzt(String ypzt) {
        this.ypzt = ypzt;
    }

    public String getZbypbm() {
        return zbypbm;
    }

    public void setZbypbm(String zbypbm) {
        this.zbypbm = zbypbm;
    }

    public String getSl() {
        return sl;
    }

    public void setSl(String sl) {
        this.sl = sl;
    }

    public String getDw() {
        return dw;
    }

    public void setDw(String dw) {
        this.dw = dw;
    }

    public String getYpmc() {
        return ypmc;
    }

    public void setYpmc(String ypmc) {
        this.ypmc = ypmc;
    }
}
