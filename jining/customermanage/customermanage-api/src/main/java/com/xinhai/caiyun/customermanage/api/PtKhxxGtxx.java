package com.xinhai.caiyun.customermanage.api;

import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Created by  on 2018/4/11 0011.
 *
 * @Description: 沟通信息实体类
 * @tableName: pt_kh_gtxx
 */
public class PtKhxxGtxx implements Serializable {

    @Id
    private long id;

    /**
     * 客户编码
     */
    private String khbm;

    /**
     * khmc
     */
    private String khmc;

    /**
     * 代理机构编码
     */
    private String dljg_bm;

    /**
     * 沟通信息
     */
    private String gtxx;

    /**
     * 回复ID
     */
    private String hfid;

    /**
     * 所属ID
     */
    private String ssid;

    /**
     * 是否提醒
     */
    private boolean if_tx;

    /**
     * 是否回复
     */
    private boolean if_hf;

    /**
     * 删除标志
     */
    private boolean scbz;

    /**
     * 录入人员
     */
    private String lrry;

    /**
     * 录入人员姓名
     */
    private String lrmc;

    /**
     * 删除人员
     */
    private String scry;

    /**
     * 录入日期
     */
    private Date lrrq;

    /**
     * 沟通时间
     */
    private Date gtsj;

    /**
     * 删除日期
     */
    private Date scrq;

    /**
     * 个人头像
     */
    private String grtx;

    /**
     * 当前人姓名
     */
    private String name;

    /**
     * 回复人姓名
     */
    private String hfxm;

    /**
     * 回复人职员代码
     */
    private String hfzydm;

    /**
     * 附件路径
     */
    private String fjUrl;

    private List<PtKhxxGtxxReply> list;

    private List<PtGtxxFjxx> data;

    public List<PtGtxxFjxx> getData() {
        return data;
    }

    public void setData(List<PtGtxxFjxx> data) {
        this.data = data;
    }

    public String getFjUrl() {
        return fjUrl;
    }

    public void setFjUrl(String fjUrl) {
        this.fjUrl = fjUrl;
    }

    public String getHfzydm() {
        return hfzydm;
    }

    public void setHfzydm(String hfzydm) {
        this.hfzydm = hfzydm;
    }

    public String getKhmc() {
        return khmc;
    }

    public void setKhmc(String khmc) {
        this.khmc = khmc;
    }

    public boolean isIf_hf() {
        return if_hf;
    }

    public void setIf_hf(boolean if_hf) {
        this.if_hf = if_hf;
    }

    public List<PtKhxxGtxxReply> getList() {
        return list;
    }

    public void setList(List<PtKhxxGtxxReply> list) {
        this.list = list;
    }

    public String getLrmc() {
        return lrmc;
    }

    public void setLrmc(String lrmc) {
        this.lrmc = lrmc;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHfxm() {
        return hfxm;
    }

    public void setHfxm(String hfxm) {
        this.hfxm = hfxm;
    }

    public String getGrtx() {
        return grtx;
    }

    public void setGrtx(String grtx) {
        this.grtx = grtx;
    }

    public String getHfid() {
        return hfid;
    }

    public void setHfid(String hfid) {
        this.hfid = hfid;
    }

    public String getSsid() {
        return ssid;
    }

    public void setSsid(String ssid) {
        this.ssid = ssid;
    }

    public Date getGtsj() {
        return gtsj;
    }

    public void setGtsj(Date gtsj) {
        this.gtsj = gtsj;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }

    public String getDljg_bm() {
        return dljg_bm;
    }

    public void setDljg_bm(String dljg_bm) {
        this.dljg_bm = dljg_bm;
    }

    public String getGtxx() {
        return gtxx;
    }

    public void setGtxx(String gtxx) {
        this.gtxx = gtxx;
    }

    public boolean isIf_tx() {
        return if_tx;
    }

    public void setIf_tx(boolean if_tx) {
        this.if_tx = if_tx;
    }

    public boolean isScbz() {
        return scbz;
    }

    public void setScbz(boolean scbz) {
        this.scbz = scbz;
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
}
