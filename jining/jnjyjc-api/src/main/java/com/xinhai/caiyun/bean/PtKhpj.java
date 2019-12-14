package com.xinhai.caiyun.bean;

import javax.persistence.Table;
import java.util.Date;

/**
 * @description: 员工评价—客户评价
 * @author  xinl
 * @date: 2017年7月03日 上午19:14:40
 * @version: v1.0
 */
@Table(name = "pt_ygpj_khpj")
public class PtKhpj {
    /**
     * 客户编码
     */
    private String khbm;
    
    /**
     * 客户名称
     */
    private String khmc;
    
    /**
     * 真实名称
     */
    private String zsmc;

    /**
     * 职员代码
     */
    private String zydm;
    
    /**
     * 员工姓名
     */
    private String ygxm;

    /**
     * 服务态度
     */
    private int fwtd;

    /**
     * 专业水准
     */
    private int zysz;

    /**
     * 员工工龄
     */
    private int yggl;

    /**
     * 业务能力
     */
    private int ywnl;

    /**
     * 评论信息
     */
    private String plxx;
    
    /**
     * 匿名评论  0匿名 1实名
     */
    private String pjlx;

    /**
     * 客户评价时间
     */
    private Date khpjsj;
    
    /**
     * 客户评价修改时间
     */
    private Date khpjxgsj;

    /**
     * 纳税人识别号
     */
    private String nsrsbh;
    
    /**
     * 公司名称
     */
    private String gsmc;
    
    /**
     * 代理机构编码
     */
    private String dljgbm;

    /**
     * 及时性
     */
    private int jsx;
   
    /**
     * 个人头像
     */
    private String grtx;
    
    /**
     * 关联编码
     */
    private String glbm;
    
    
    
    public String getGlbm() {
        return glbm;
    }

    public void setGlbm(String glbm) {
        this.glbm = glbm;
    }

    public String getPjlx() {
        return pjlx;
    }

    public void setPjlx(String pjlx) {
        this.pjlx = pjlx;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }

    public String getZydm() {
        return zydm;
    }

    public void setZydm(String zydm) {
        this.zydm = zydm;
    }

    public int getFwtd() {
        return fwtd;
    }

    
    public void setFwtd(int fwtd) {
        this.fwtd = fwtd;
    }

    public int getZysz() {
        return zysz;
    }

    public void setZysz(int zysz) {
        this.zysz = zysz;
    }

    public int getYggl() {
        return yggl;
    }

    public void setYggl(int yggl) {
        this.yggl = yggl;
    }

    public int getYwnl() {
        return ywnl;
    }

    public void setYwnl(int ywnl) {
        this.ywnl = ywnl;
    }

    
    
    public String getZsmc() {
        return zsmc;
    }

    public void setZsmc(String zsmc) {
        this.zsmc = zsmc;
    }

    public String getPlxx() {
        return plxx;
    }

    public void setPlxx(String plxx) {
        this.plxx = plxx;
    }

    public String getNsrsbh() {
        return nsrsbh;
    }

    public void setNsrsbh(String nsrsbh) {
        this.nsrsbh = nsrsbh;
    }

    public String getDljgbm() {
        return dljgbm;
    }

    public void setDljgbm(String dljgbm) {
        this.dljgbm = dljgbm;
    }

    public Date getKhpjsj() {
        return khpjsj;
    }

    public void setKhpjsj(Date khpjsj) {
        this.khpjsj = khpjsj;
    }

    public int getJsx() {
        return jsx;
    }

    public void setJsx(int jsx) {
        this.jsx = jsx;
    }

    public String getKhmc() {
        return khmc;
    }

    public void setKhmc(String khmc) {
        this.khmc = khmc;
    }

    public String getYgxm() {
        return ygxm;
    }

    public void setYgxm(String ygxm) {
        this.ygxm = ygxm;
    }

    public Date getKhpjxgsj() {
        return khpjxgsj;
    }

    public void setKhpjxgsj(Date khpjxgsj) {
        this.khpjxgsj = khpjxgsj;
    }

    public String getGsmc() {
        return gsmc;
    }

    public void setGsmc(String gsmc) {
        this.gsmc = gsmc;
    }

    public String getGrtx() {
        return grtx;
    }

    public void setGrtx(String grtx) {
        this.grtx = grtx;
    }
    
    

}
