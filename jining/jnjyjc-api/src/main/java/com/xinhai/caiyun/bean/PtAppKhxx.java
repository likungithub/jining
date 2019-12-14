package com.xinhai.caiyun.bean;

import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

/**
 * @description:移动端客户信息实体类
 * @author: lixp
 * @date: 2017年6月26日 上午10:38:40
 * @version: v1.0
 */
@Table(name = "pt_app_khxx")
public class PtAppKhxx implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 意向客户id
     */
    private String yxkhId;
    /**
     * 客户渠道类型 001员工分享，002客户分享，003手工录入，999其它
     */


    private String khqdlx;
    private String wbtjrmc;
    private String khjldm;
    private String khjlmc;

    public String getYxkhId() {
        return yxkhId;
    }

    public void setYxkhId(String yxkhId) {
        this.yxkhId = yxkhId;
    }

    public String getKhqdlx() {
        return khqdlx;
    }

    public void setKhqdlx(String khqdlx) {
        this.khqdlx = khqdlx;
    }

    public String getWbtjrmc() {
        return wbtjrmc;
    }

    public void setWbtjrmc(String wbtjrmc) {
        this.wbtjrmc = wbtjrmc;
    }

    public String getKhjldm() {
        return khjldm;
    }

    public void setKhjldm(String khjldm) {
        this.khjldm = khjldm;
    }

    public String getKhjlmc() {
        return khjlmc;
    }

    public void setKhjlmc(String khjlmc) {
        this.khjlmc = khjlmc;
    }

    private String yxkhbm;

    public String getYxkhbm() {
        return yxkhbm;
    }

    public void setYxkhbm(String yxkhbm) {
        this.yxkhbm = yxkhbm;
    }

    private String lrry;
    private String scry;
    private String gxry;

    private Date lrrq;
    private Date scrq;
    private Date gxrq;


    private String khfldm;

    public String getKhfldm() {
        return khfldm;
    }

    public void setKhfldm(String khfldm) {
        this.khfldm = khfldm;
    }

    private String zhlb;
    
    //客户信息中 签约的企业档案
    private PtKhxx ptKhxx;
    
    

    public String getZhlb() {
        return zhlb;
    }

    public void setZhlb(String zhlb) {
        this.zhlb = zhlb;
    }

    public PtKhxx getPtKhxx() {
        return ptKhxx;
    }

    public void setPtKhxx(PtKhxx ptKhxx) {
        this.ptKhxx = ptKhxx;
    }

    public String getLrry() {
        return lrry;
    }

    public void setLrry(String lrry) {
        this.lrry = lrry;
    }

    public String getScry() {
        return scry;
    }

    public void setScry(String scry) {
        this.scry = scry;
    }

    public String getGxry() {
        return gxry;
    }

    public void setGxry(String gxry) {
        this.gxry = gxry;
    }

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    public Date getScrq() {
        return scrq;
    }

    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }

    public Date getGxrq() {
        return gxrq;
    }

    public void setGxrq(Date gxrq) {
        this.gxrq = gxrq;
    }

    @Id
    private Long id;
    private String khbm;
    private String dljgbm;
    private String dlzh;
    private String dlzzh;//登陆主账号
    private String dlmm;
    private String yhmc;
    private String gsmc;
    private String frdb;
    private String sfzhm;
    private String grtx;
    private String lxrmc;
    private String bgdh;
    private String sjhm;
    private String czhm;
    private String qq;
    private String yyzz;
    private String email;
    private String xxdz;
    private String hydm;
    private String hymc;
    private String hymldm;
    private String hymlmc;
    
    private String sfdm;
    private String sfmc;
    
    private String csdm;
    private String csmc;
    private String nsrsbh;
    private String tjrdm;
    private String tjrdljg;
    private String sjzclx;
    private String yhlx;
    private String scbz = "0"; 
    private String khzt;//0已确认 1 未确认
    private Date zcrq;
    private String bzxx;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getKhbm() {
        return khbm;
    }
    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }
    
    public String getDljgbm() {
        return dljgbm;
    }

    public void setDljgbm(String dljgbm) {
        this.dljgbm = dljgbm;
    }

    public String getDlzh() {
        return dlzh;
    }
    public void setDlzh(String dlzh) {
        this.dlzh = dlzh;
    }
    
    public String getDlzzh() {
        return dlzzh;
    }

    public void setDlzzh(String dlzzh) {
        this.dlzzh = dlzzh;
    }

    public String getDlmm() {
        return dlmm;
    }
    public void setDlmm(String dlmm) {
        this.dlmm = dlmm;
    }
    public String getYhmc() {
        return yhmc;
    }
    public void setYhmc(String yhmc) {
        this.yhmc = yhmc;
    }
    public String getGsmc() {
        return gsmc;
    }
    public void setGsmc(String gsmc) {
        this.gsmc = gsmc;
    }
    public String getFrdb() {
        return frdb;
    }
    public void setFrdb(String frdb) {
        this.frdb = frdb;
    }
    public String getSfzhm() {
        return sfzhm;
    }
    public void setSfzhm(String sfzhm) {
        this.sfzhm = sfzhm;
    }
    public String getGrtx() {
        return grtx;
    }
    public void setGrtx(String grtx) {
        this.grtx = grtx;
    }
    public String getLxrmc() {
        return lxrmc;
    }
    public void setLxrmc(String lxrmc) {
        this.lxrmc = lxrmc;
    }
    public String getBgdh() {
        return bgdh;
    }
    public void setBgdh(String bgdh) {
        this.bgdh = bgdh;
    }
    public String getSjhm() {
        return sjhm;
    }
    public void setSjhm(String sjhm) {
        this.sjhm = sjhm;
    }
    public String getCzhm() {
        return czhm;
    }
    public void setCzhm(String czhm) {
        this.czhm = czhm;
    }
    
    public String getYyzz() {
        return yyzz;
    }
    public void setYyzz(String yyzz) {
        this.yyzz = yyzz;
    }
    public String getQq() {
        return qq;
    }
    public void setQq(String qq) {
        this.qq = qq;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getXxdz() {
        return xxdz;
    }
    public void setXxdz(String xxdz) {
        this.xxdz = xxdz;
    }
    public String getHydm() {
        return hydm;
    }
    public void setHydm(String hydm) {
        this.hydm = hydm;
    }
    public String getHymc() {
        return hymc;
    }
    public void setHymc(String hymc) {
        this.hymc = hymc;
    }
    public String getSfdm() {
        return sfdm;
    }
    public void setSfdm(String sfdm) {
        this.sfdm = sfdm;
    }
    public String getSfmc() {
        return sfmc;
    }
    public void setSfmc(String sfmc) {
        this.sfmc = sfmc;
    }
    public String getNsrsbh() {
        return nsrsbh;
    }
    public void setNsrsbh(String nsrsbh) {
        this.nsrsbh = nsrsbh;
    }
    public String getTjrdm() {
        return tjrdm;
    }
    public void setTjrdm(String tjrdm) {
        this.tjrdm = tjrdm;
    }
    public String getYhlx() {
        return yhlx;
    }
    public void setYhlx(String yhlx) {
        this.yhlx = yhlx;
    }
    public Date getZcrq() {
        return zcrq;
    }
    public void setZcrq(Date zcrq) {
        this.zcrq = zcrq;
    }
    public String getScbz() {
        return scbz;
    }
    public void setScbz(String scbz) {
        this.scbz = scbz;
    }
    public String getTjrdljg() {
        return tjrdljg;
    }
    public void setTjrdljg(String tjrdljg) {
        this.tjrdljg = tjrdljg;
    }
    public String getSjzclx() {
        return sjzclx;
    }
    public void setSjzclx(String sjzclx) {
        this.sjzclx = sjzclx;
    }
    public String getKhzt() {
        return khzt;
    }
    public void setKhzt(String khzt) {
        this.khzt = khzt;
    }
    public String getBzxx() {
        return bzxx;
    }
    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    public String getCsdm() {
        return csdm;
    }

    public void setCsdm(String csdm) {
        this.csdm = csdm;
    }

    public String getCsmc() {
        return csmc;
    }

    public void setCsmc(String csmc) {
        this.csmc = csmc;
    }

    public String getHymldm() {
        return hymldm;
    }

    public void setHymldm(String hymldm) {
        this.hymldm = hymldm;
    }

    public String getHymlmc() {
        return hymlmc;
    }

    public void setHymlmc(String hymlmc) {
        this.hymlmc = hymlmc;
    } 
    
}