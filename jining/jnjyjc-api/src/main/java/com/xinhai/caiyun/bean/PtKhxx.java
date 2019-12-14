package com.xinhai.caiyun.bean;

import java.io.Serializable;

import javax.persistence.Id;
import javax.persistence.Table;

import java.util.Date;
import java.util.List;

/**
 * @description:平台客户信息实体类
 * @author: lixp
 * @date: 2017年6月26日 上午10:38:40
 * @version: v1.0
 */
@Table(name = "pt_khxx")
public class PtKhxx implements Serializable {

    private static final long serialVersionUID = 1L;
    
    /**
     * 主键id
     */
    @Id
    private Long id;
    
    /**
     * 客户编码
     */
    private String khbm;
    
    /**
     * 登陆账号
     */
    private String dlzh;
    
    /**
     * 登陆密码
     */
    private String dlmm;
    
    /**
     * 用户名称
     */
    private String yhmc;
    
    /**
     * 公司名称
     */
    private String gsmc;
    
    /**
     * 客户分类
     */
    private String khflDm;
    
    /**
     * 所在行业
     */
    private String hydm;
    
    /**
     * 所在地区
     */
    private int xzqhDm;
    
    /**
     * 法人代表
     */
    private String frdb;
    
    /**
     * 身份证号码
     */
    private String sfzhm;
    
    /**
     * 营业执照
     */
    private String yyzz;
    
    /**
     * 组织机构代码
     */
    private String zzjgdm;
    
    /**
     * 成立日期
     */
    private Date clrq;
    
    /**
     * 开始代账日期
     */
    private Date ksdzrq;
    
    /**
     * 签约状态
     */
    private String qyztDm;
    
    /**
     * 备注信息
     */
    private String bzxx;
    
    /**
     * 服务状态
     */
    private Boolean fwztDm;
    
    /**
     * 客户主管代码
     */
    private String zydm;
    
    /**
     * 客户主管姓名
     */
    private String zyxm;
    
    /**
     * 操作员
     */
    private String czy;
    
    /**
     * 纳税人识别号
     */
    private String nsrsbh;
    
    /**
     * 代理机构编码
     */
    private String dljgBm;
    
    /**
     * 增值税性质代码
     */
    private String zzsxzDm;
    
    /**
     * 税率
     */
    private double sl;
    
    /**
     * 纳税人编码
     */
    private String nsrbm;
    
    /**
     * 主管税务分局
     */
    private String zgswfj;
    
    /**
     * 税务资料备注
     */
    private String swzlbz;
    
    /**
     * 个人头像
     */
    private String grtx;
    
    /**
     * 联系人名称
     */
    private String lxrmc;
    
    /**
     * 办公电话
     */
    private String bgdh;
    
    /**
     * 手机号码
     */
    private String sjhm;
    
    /**
     * 传真号码
     */
    private String czhm;
    
    /**
     * QQ号
     */
    private String qq;
    
    /**
     * 邮箱
     */
    private String email;
    
    /**
     * 其他信息
     */
    private String qtxx;
    
    /**
     * 详细地址
     */
    private String xxdz;
    
    /**
     * 账套状态
     */
    private Boolean ztztDm;
    
    /**
     * 客户等级
     */
    private String khdjDm;
    
    /**
     * 用户状态
     */
    private String yhztDm;
    
    /**
     * 删除标志
     */
    private Boolean scbz;
    
    /**
     * 录入人员
     */
    private String lrry;
    
    /**
     * 跟新人员
     */
    private String gxry;
    
    /**
     * 删除人员
     */
    private String scry;
    
    /**
     * 停止服务人员
     */
    private String tzfwry;
    
    /**
     * 录入日期
     */
    private Date lrrq;
    
    /**
     * 更新日期
     */
    private Date gxrq;
    
    /**
     * 删除日期
     */
    private Date scrq;
    
    /**
     * 停止服务日期
     */
    private Date tzfwrq;
    
    /**
     * 注册标志
     * @param id
     */
    private boolean zcbz;
    
    /**
     * 客户分类名称
     */
    private String khflMc;
    
    /**
     * 行业名称
     */
    private String hymc;
    
    /**
     * 省份代码
     */
    private String sfdm;
    
    /**
     * 省份名称
     */
    private String sfmc;
    
    /**
     * 城市代码
     */
    private String csdm;
    
    /**
     * 城市名称
     */
    private String csmc;
    
    /**
     * 增值税性质名称
     */
    private String zzsxzMc;
    
    /**
     * 客户等级名称
     */
    private String khdjMc;
    
    /**
     * 用户状态名称
     */
    private String yhztMc;
    
    /**
     * 代理机构名称
     */
    private String dljgMc;
    
    public String getZyxm() {
        return zyxm;
    }

    public void setZyxm(String zyxm) {
        this.zyxm = zyxm;
    }
    
    public String getKhflMc() {
        return khflMc;
    }

    public void setKhflMc(String khflMc) {
        this.khflMc = khflMc;
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

    public String getZzsxzMc() {
        return zzsxzMc;
    }

    public void setZzsxzMc(String zzsxzMc) {
        this.zzsxzMc = zzsxzMc;
    }

    public String getKhdjMc() {
        return khdjMc;
    }

    public void setKhdjMc(String khdjMc) {
        this.khdjMc = khdjMc;
    }

    public String getYhztMc() {
        return yhztMc;
    }

    public void setYhztMc(String yhztMc) {
        this.yhztMc = yhztMc;
    }

    public boolean isZcbz() {
        return zcbz;
    }

    public void setZcbz(boolean zcbz) {
        this.zcbz = zcbz;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }

    public String getDlzh() {
        return dlzh;
    }

    public void setDlzh(String dlzh) {
        this.dlzh = dlzh;
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

    public String getKhflDm() {
        return khflDm;
    }

    public void setKhflDm(String khflDm) {
        this.khflDm = khflDm;
    }

    public String getHydm() {
        return hydm;
    }

    public void setHydm(String hydm) {
        this.hydm = hydm;
    }

    public int getXzqhDm() {
        return xzqhDm;
    }

    public void setXzqhDm(int xzqhDm) {
        this.xzqhDm = xzqhDm;
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

    public String getYyzz() {
        return yyzz;
    }

    public void setYyzz(String yyzz) {
        this.yyzz = yyzz;
    }

    public String getZzjgdm() {
        return zzjgdm;
    }

    public void setZzjgdm(String zzjgdm) {
        this.zzjgdm = zzjgdm;
    }

    public Date getClrq() {
        return clrq;
    }

    public void setClrq(Date clrq) {
        this.clrq = clrq;
    }

    public Date getKsdzrq() {
        return ksdzrq;
    }

    public void setKsdzrq(Date ksdzrq) {
        this.ksdzrq = ksdzrq;
    }

    public String getQyztDm() {
        return qyztDm;
    }

    public void setQyztDm(String qyztDm) {
        this.qyztDm = qyztDm;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    public Boolean getFwztDm() {
        return fwztDm;
    }

    public void setFwztDm(Boolean fwztDm) {
        this.fwztDm = fwztDm;
    }

    public String getZydm() {
        return zydm;
    }

    public void setZydm(String zydm) {
        this.zydm = zydm;
    }

    public String getCzy() {
        return czy;
    }

    public void setCzy(String czy) {
        this.czy = czy;
    }

    public String getNsrsbh() {
        return nsrsbh;
    }

    public void setNsrsbh(String nsrsbh) {
        this.nsrsbh = nsrsbh;
    }

    public String getDljgBm() {
        return dljgBm;
    }

    public void setDljgBm(String dljgBm) {
        this.dljgBm = dljgBm;
    }

    public String getZzsxzDm() {
        return zzsxzDm;
    }

    public void setZzsxzDm(String zzsxzDm) {
        this.zzsxzDm = zzsxzDm;
    }

    public double getSl() {
        return sl;
    }

    public void setSl(double sl) {
        this.sl = sl;
    }

    public String getNsrbm() {
        return nsrbm;
    }

    public void setNsrbm(String nsrbm) {
        this.nsrbm = nsrbm;
    }

    public String getZgswfj() {
        return zgswfj;
    }

    public void setZgswfj(String zgswfj) {
        this.zgswfj = zgswfj;
    }

    public String getSwzlbz() {
        return swzlbz;
    }

    public void setSwzlbz(String swzlbz) {
        this.swzlbz = swzlbz;
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

    public String getQtxx() {
        return qtxx;
    }

    public void setQtxx(String qtxx) {
        this.qtxx = qtxx;
    }

    public String getXxdz() {
        return xxdz;
    }

    public void setXxdz(String xxdz) {
        this.xxdz = xxdz;
    }

    public Boolean getZtztDm() {
        return ztztDm;
    }

    public void setZtztDm(Boolean ztztDm) {
        this.ztztDm = ztztDm;
    }

    public String getKhdjDm() {
        return khdjDm;
    }

    public void setKhdjDm(String khdjDm) {
        this.khdjDm = khdjDm;
    }

    public String getYhztDm() {
        return yhztDm;
    }

    public void setYhztDm(String yhztDm) {
        this.yhztDm = yhztDm;
    }

    public Boolean getScbz() {
        return scbz;
    }

    public void setScbz(Boolean scbz) {
        this.scbz = scbz;
    }

    public String getLrry() {
        return lrry;
    }

    public void setLrry(String lrry) {
        this.lrry = lrry;
    }

    public String getGxry() {
        return gxry;
    }

    public void setGxry(String gxry) {
        this.gxry = gxry;
    }

    public String getScry() {
        return scry;
    }

    public void setScry(String scry) {
        this.scry = scry;
    }

    public String getTzfwry() {
        return tzfwry;
    }

    public void setTzfwry(String tzfwry) {
        this.tzfwry = tzfwry;
    }

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    public Date getGxrq() {
        return gxrq;
    }

    public void setGxrq(Date gxrq) {
        this.gxrq = gxrq;
    }

    public Date getScrq() {
        return scrq;
    }

    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }

    public Date getTzfwrq() {
        return tzfwrq;
    }

    public void setTzfwrq(Date tzfwrq) {
        this.tzfwrq = tzfwrq;
    }
    
    
    public String getDljgMc() {
        return dljgMc;
    }

    public void setDljgMc(String dljgMc) {
        this.dljgMc = dljgMc;
    }

    @Override
    public String toString() {
        return "PtKhxx [id=" + id + ", khbm=" + khbm + ", dlzh=" + dlzh
                + ", dlmm=" + dlmm + ", yhmc=" + yhmc + ", gsmc=" + gsmc
                + ", khflDm=" + khflDm + ", hydm=" + hydm + ", xzqhDm="
                + xzqhDm + ", frdb=" + frdb + ", sfzhm=" + sfzhm + ", yyzz="
                + yyzz + ", zzjgdm=" + zzjgdm + ", clrq=" + clrq + ", ksdzrq="
                + ksdzrq + ", qyztDm=" + qyztDm + ", bzxx=" + bzxx
                + ", fwztDm=" + fwztDm + ", zydm=" + zydm + ", czy=" + czy
                + ", nsrsbh=" + nsrsbh + ", dljgBm=" + dljgBm + ", zzsxzDm="
                + zzsxzDm + ", sl=" + sl + ", nsrbm=" + nsrbm + ", zgswfj="
                + zgswfj + ", swzlbz=" + swzlbz + ", grtx=" + grtx + ", lxrmc="
                + lxrmc + ", bgdh=" + bgdh + ", sjhm=" + sjhm + ", czhm="
                + czhm + ", qq=" + qq + ", email=" + email + ", qtxx=" + qtxx
                + ", xxdz=" + xxdz + ", ztztDm=" + ztztDm + ", khdjDm="
                + khdjDm + ", yhztDm=" + yhztDm + ", scbz=" + scbz + ", lrry="
                + lrry + ", gxry=" + gxry + ", scry=" + scry + ", tzfwry="
                + tzfwry + ", lrrq=" + lrrq + ", gxrq=" + gxrq + ", scrq="
                + scrq + ", tzfwrq=" + tzfwrq + ", zcbz=" + zcbz + ", khflMc="
                + khflMc + ", hymc=" + hymc + ", sfdm=" + sfdm + ", sfmc="
                + sfmc + ", csdm=" + csdm + ", csmc=" + csmc + ", zzsxzMc="
                + zzsxzMc + ", khdjMc=" + khdjMc + ", yhztMc=" + yhztMc + "]";
    }
}