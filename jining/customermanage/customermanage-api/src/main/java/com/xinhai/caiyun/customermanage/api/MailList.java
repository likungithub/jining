package com.xinhai.caiyun.customermanage.api;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * Description:通讯录管理——代理记账公司常用联系方式
 * User: 辛磊
 * Date: 2017-12-21
 * Time: 14:15
 */
public class MailList {
    /**
     * 主键ID
     */
    private  String  id;

    /**
     * 代理机构编码
     */
    private  String  dljg_bm;

    /**
     * 联系人或单位
     */
    private  String  lxrhdw;

    /**
     * 联系地址
     */
    private  String  lxdz;

    /**
     * 办公电话
     */
    private  String bgdh;

    /**
     * 手机号码
     */
    private String sjhm;

    /**
     * 电子邮箱
     */
    private String dzyx;

    /**
     * QQ号码
     */
    private  String qq;

    /**
     * 备注信息
     */
    private String bzxx;

    /**
     * 删除标志
     */
    private String scbz;

    /**
     * 录入人员
     */
    private String lrry;

    /**
     * 录入日期
     */
    private Date lrrq;

    /**
     * 更新人员
     */
    private String gxry;

    /**
     * 更新日期
     */
    private Date gxrq;

    /**
     *删除人员
     */
    private String scry;

    /**
     * 删除日期
     */
    private Date scrq;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDljg_bm() {
        return dljg_bm;
    }

    public void setDljg_bm(String dljg_bm) {
        this.dljg_bm = dljg_bm;
    }

    public String getLxrhdw() {
        return lxrhdw;
    }

    public void setLxrhdw(String lxrhdw) {
        this.lxrhdw = lxrhdw;
    }

    public String getLxdz() {
        return lxdz;
    }

    public void setLxdz(String lxdz) {
        this.lxdz = lxdz;
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

    public String getDzyx() {
        return dzyx;
    }

    public void setDzyx(String dzyx) {
        this.dzyx = dzyx;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
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

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    public String getGxry() {
        return gxry;
    }

    public void setGxry(String gxry) {
        this.gxry = gxry;
    }

    public Date getGxrq() {
        return gxrq;
    }

    public void setGxrq(Date gxrq) {
        this.gxrq = gxrq;
    }

    public String getScry() {
        return scry;
    }

    public void setScry(String scry) {
        this.scry = scry;
    }

    public Date getScrq() {
        return scrq;
    }

    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }

}
