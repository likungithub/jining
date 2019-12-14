package com.xinhai.caiyun.systemmanager.api;
import java.util.List;

/**
 * @description:垫付信息
 * @author xinl
 * @date: 2017年11月21日 上午20:18:00
 * @version: v1.0
 */
public class AdvanceInfo {

  private String fyxmdm;
  private String htbh;
  private String khmc;
  private String fyxmmc;
  private String dfymc;

    public String getFyxmdm() {
        return fyxmdm;
    }

    public void setFyxmdm(String fyxmdm) {
        this.fyxmdm = fyxmdm;
    }

    public String getHtbh() {
        return htbh;
    }

    public void setHtbh(String htbh) {
        this.htbh = htbh;
    }

    public String getKhmc() {
        return khmc;
    }

    public void setKhmc(String khmc) {
        this.khmc = khmc;
    }

    public String getFyxmmc() {
        return fyxmmc;
    }

    public void setFyxmmc(String fyxmmc) {
        this.fyxmmc = fyxmmc;
    }

    public String getDfymc() {
        return dfymc;
    }

    public void setDfymc(String dfymc) {
        this.dfymc = dfymc;
    }

    private String rwmc;

    public String getRwmc() {
        return rwmc;
    }

    public void setRwmc(String rwmc) {
        this.rwmc = rwmc;
    }

    /**
     * ID
     */
    private String id;

    /**
     * 收费项目代码
     */
    private String sfxmdm;

    /**
     * 收费项目名称
     */
    private String sfxmmc;

    /**
     * 任务ID
     */
    private String rwid;

    /**
     * 垫付金额
     */
    private String je;

    /**
     * 收费时间
     */
    private String sfsj;

    /**
     * 收费标志  0正常缴费 1垫付
     */
    private String sfbz;

    /**
     * 备注信息
     */
    private String bzxx;

    /**
     * 企业名称
     */
    private String qymc;

    /**
     * 企业税号
     */
    private String qysh;

    /**
     * 联系人姓名
     */
    private String lxrxm;

    /**
     * 联系人电话
     */
    private String lxrdh;

    /**
     * 删除标志
     */
    private String scbz;

    /**
     * 录入人员
     */
    private String lrry;

    /**
     * 录入人所在部门代码
     */
    private String bmdm;

    /**
     * 更新人员
     */
    private String gxry;

    /**
     * 删除人员
     */
    private String scry;

    /**
     * 删除日期
     */
    private String scrq;

    /**
     * 录入日期
     */
    private String lrrq;

    /**
     * 更新日期
     */
    private String gxrq;

    private List<AdvanceInfo> advanceInfos;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSfxmdm() {
        return sfxmdm;
    }

    public void setSfxmdm(String sfxmdm) {
        this.sfxmdm = sfxmdm;
    }

    public String getSfxmmc() {
        return sfxmmc;
    }

    public void setSfxmmc(String sfxmmc) {
        this.sfxmmc = sfxmmc;
    }

    public String getRwid() {
        return rwid;
    }

    public void setRwid(String rwid) {
        this.rwid = rwid;
    }

    public String getJe() {
        return je;
    }

    public void setJe(String je) {
        this.je = je;
    }

    public String getSfsj() {
        return sfsj;
    }

    public void setSfsj(String sfsj) {
        this.sfsj = sfsj;
    }

    public String getSfbz() {
        return sfbz;
    }

    public void setSfbz(String sfbz) {
        this.sfbz = sfbz;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    public String getQymc() {
        return qymc;
    }

    public void setQymc(String qymc) {
        this.qymc = qymc;
    }

    public String getQysh() {
        return qysh;
    }

    public void setQysh(String qysh) {
        this.qysh = qysh;
    }

    public String getLxrxm() {
        return lxrxm;
    }

    public void setLxrxm(String lxrxm) {
        this.lxrxm = lxrxm;
    }

    public String getLxrdh() {
        return lxrdh;
    }

    public void setLxrdh(String lxrdh) {
        this.lxrdh = lxrdh;
    }

    public String getScbz() {
        return scbz;
    }

    public void setScbz(String scbz) {
        this.scbz = scbz;
    }

    public String getLrry() {
        return lrry;
    }

    public void setLrry(String lrry) {
        this.lrry = lrry;
    }

    public String getBmdm() {
        return bmdm;
    }

    public void setBmdm(String bmdm) {
        this.bmdm = bmdm;
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

    public String getScrq() {
        return scrq;
    }

    public void setScrq(String scrq) {
        this.scrq = scrq;
    }

    public String getLrrq() {
        return lrrq;
    }

    public void setLrrq(String lrrq) {
        this.lrrq = lrrq;
    }

    public String getGxrq() {
        return gxrq;
    }

    public void setGxrq(String gxrq) {
        this.gxrq = gxrq;
    }

    public List<AdvanceInfo> getAdvanceInfos() {
        return advanceInfos;
    }

    public void setAdvanceInfos(List<AdvanceInfo> advanceInfos) {
        this.advanceInfos = advanceInfos;
    }

}
