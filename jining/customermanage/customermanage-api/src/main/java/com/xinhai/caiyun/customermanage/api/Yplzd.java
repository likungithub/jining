package com.xinhai.caiyun.customermanage.api;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
public class Yplzd {
    private String ypmc;//样品名称
    private String ypbm;//样品编码
    private String ypxtdm;//样品形态代码
    private int ypsl;//样品数量
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String dysj;//到样时间
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private  String sjcjrq;//数据出具日期
    private String jclbdm;//检测类别代码
    private String bzq;//保质期
    private String zxbz;//执行标准
    private int if_fb;//是否换样
    private String jcxmid;//检测项目id
    private String jcz;//检测值
    private String wd;//温度
    private String sd;//湿度

    public String getYpmc() {
        return ypmc;
    }

    public void setYpmc(String ypmc) {
        this.ypmc = ypmc;
    }

    public String getYpbm() {
        return ypbm;
    }

    public void setYpbm(String ypbm) {
        this.ypbm = ypbm;
    }

    public String getYpxtdm() {
        return ypxtdm;
    }

    public void setYpxtdm(String ypxtdm) {
        this.ypxtdm = ypxtdm;
    }

    public int getYpsl() {
        return ypsl;
    }

    public void setYpsl(int ypsl) {
        this.ypsl = ypsl;
    }

    public String getDysj() {
        return dysj;
    }

    public void setDysj(String dysj) {
        this.dysj = dysj;
    }

    public String getSjcjrq() {
        return sjcjrq;
    }

    public void setSjcjrq(String sjcjrq) {
        this.sjcjrq = sjcjrq;
    }

    public String getJclbdm() {
        return jclbdm;
    }

    public void setJclbdm(String jclbdm) {
        this.jclbdm = jclbdm;
    }

    public String getBzq() {
        return bzq;
    }

    public void setBzq(String bzq) {
        this.bzq = bzq;
    }

    public String getZxbz() {
        return zxbz;
    }

    public void setZxbz(String zxbz) {
        this.zxbz = zxbz;
    }

    public int getIf_fb() {
        return if_fb;
    }

    public void setIf_fb(int if_fb) {
        this.if_fb = if_fb;
    }

    public String getJcxmid() {
        return jcxmid;
    }

    public void setJcxmid(String jcxmid) {
        this.jcxmid = jcxmid;
    }

    public String getJcz() {
        return jcz;
    }

    public void setJcz(String jcz) {
        this.jcz = jcz;
    }

    public String getWd() {
        return wd;
    }

    public void setWd(String wd) {
        this.wd = wd;
    }

    public String getSd() {
        return sd;
    }

    public void setSd(String sd) {
        this.sd = sd;
    }
}
