package com.xinhai.caiyun.statisticalanalysis.api;

import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by lmf on 2018/3/22 0022.
 *
 * @escription: 统计报表实体类
 * @tableName: r_hzsj_info
 */
public class StatisticReport {

    @Id
    private long id;

    /**
     * 代理机构编码
     */
    private String dljg_bm;

    /**
     * 代理机构名称
     */
    private String dljg_mc;

    /**
     * 版本号
     */
    private String edition;

    /**
     * 部门代码
     */
    private String bmdm;

    /**
     * 部门名称
     */
    private String bmmc;

    /**
     * 录入人员
     */
    private String zydm;

    /**
     * 职员名称
     */
    private String zymc;

    /**
     * 录入日期
     */
    private Date lrrq;

    /**
     * 删除人员
     */
    private String scry;

    /**
     * 删除人员名称
     */
    private String scrymc;

    /**
     * 删除日期
     */
    private Date scrq;

    /**
     * 删除标志
     */
    private boolean scbz;

    /**
     * 新增商机
     */
    private Integer xzsj;

    /**
     * 丢失商机
     */
    private Integer dssj;

    /**
     * 转化商机
     */
    private Integer zhsj;

    /**
     * 跟进商机
     */
    private Integer gjsj;

    /**
     * 新增客户
     */
    private Integer xzkh;

    /**
     * 丢失客户
     */
    private Integer dskh;

    /**
     * 服务中客户
     */
    private Integer fwzkh;

    /**
     * 新增合同数量
     */
    private Integer xzht;

    /**
     * 新增合同金额
     */
    private BigDecimal xzje;

    /**
     * 续约合同数量
     */
    private Integer xyht;

    /**
     * 续约合同金额
     */
    private BigDecimal xyje;

    /**
     * 已收金额
     */
    private BigDecimal ysje;

    /**
     * 超期金额（催费）
     */
    private BigDecimal cqje;

    /**
     * 欠费金额
     */
    private BigDecimal qfje;

    /**
     * 坏账金额
     */
    private BigDecimal hzje;

    /**
     * 垫付金额
     */
    private BigDecimal dfje;

    /**
     * 已记账数量
     */
    private Integer yjz;

    /**
     * 未记账数量
     */
    private Integer wjz;

    /**
     * 已报税数量
     */
    private Integer ybs;

    /**
     * 未报税数量
     */
    private Integer wbs;

    /**
     * 已完成任务节点数目
     */
    private Integer ywc;

    /**
     * 未完成任务节点数目
     */
    private Integer wwc;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDljg_bm() {
        return dljg_bm;
    }

    public void setDljg_bm(String dljg_bm) {
        this.dljg_bm = dljg_bm;
    }

    public String getDljg_mc() {
        return dljg_mc;
    }

    public void setDljg_mc(String dljg_mc) {
        this.dljg_mc = dljg_mc;
    }

    public String getEdition() {
        return edition;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public String getBmdm() {
        return bmdm;
    }

    public void setBmdm(String bmdm) {
        this.bmdm = bmdm;
    }

    public String getBmmc() {
        return bmmc;
    }

    public void setBmmc(String bmmc) {
        this.bmmc = bmmc;
    }

    public String getZydm() {
        return zydm;
    }

    public void setZydm(String zydm) {
        this.zydm = zydm;
    }

    public String getZymc() {
        return zymc;
    }

    public void setZymc(String zymc) {
        this.zymc = zymc;
    }

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    public String getScry() {
        return scry;
    }

    public void setScry(String scry) {
        this.scry = scry;
    }

    public String getScrymc() {
        return scrymc;
    }

    public void setScrymc(String scrymc) {
        this.scrymc = scrymc;
    }

    public Date getScrq() {
        return scrq;
    }

    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }

    public boolean isScbz() {
        return scbz;
    }

    public void setScbz(boolean scbz) {
        this.scbz = scbz;
    }

    public Integer getXzsj() {
        return xzsj;
    }

    public void setXzsj(Integer xzsj) {
        this.xzsj = xzsj;
    }

    public Integer getDssj() {
        return dssj;
    }

    public void setDssj(Integer dssj) {
        this.dssj = dssj;
    }

    public Integer getZhsj() {
        return zhsj;
    }

    public void setZhsj(Integer zhsj) {
        this.zhsj = zhsj;
    }

    public Integer getGjsj() {
        return gjsj;
    }

    public void setGjsj(Integer gjsj) {
        this.gjsj = gjsj;
    }

    public Integer getXzkh() {
        return xzkh;
    }

    public void setXzkh(Integer xzkh) {
        this.xzkh = xzkh;
    }

    public Integer getDskh() {
        return dskh;
    }

    public void setDskh(Integer dskh) {
        this.dskh = dskh;
    }

    public Integer getFwzkh() {
        return fwzkh;
    }

    public void setFwzkh(Integer fwzkh) {
        this.fwzkh = fwzkh;
    }

    public Integer getXzht() {
        return xzht;
    }

    public void setXzht(Integer xzht) {
        this.xzht = xzht;
    }

    public BigDecimal getXzje() {
        return xzje;
    }

    public void setXzje(BigDecimal xzje) {
        this.xzje = xzje;
    }

    public Integer getXyht() {
        return xyht;
    }

    public void setXyht(Integer xyht) {
        this.xyht = xyht;
    }

    public BigDecimal getXyje() {
        return xyje;
    }

    public void setXyje(BigDecimal xyje) {
        this.xyje = xyje;
    }

    public BigDecimal getYsje() {
        return ysje;
    }

    public void setYsje(BigDecimal ysje) {
        this.ysje = ysje;
    }

    public BigDecimal getCqje() {
        return cqje;
    }

    public void setCqje(BigDecimal cqje) {
        this.cqje = cqje;
    }

    public BigDecimal getQfje() {
        return qfje;
    }

    public void setQfje(BigDecimal qfje) {
        this.qfje = qfje;
    }

    public BigDecimal getHzje() {
        return hzje;
    }

    public void setHzje(BigDecimal hzje) {
        this.hzje = hzje;
    }

    public BigDecimal getDfje() {
        return dfje;
    }

    public void setDfje(BigDecimal dfje) {
        this.dfje = dfje;
    }

    public Integer getYjz() {
        return yjz;
    }

    public void setYjz(Integer yjz) {
        this.yjz = yjz;
    }

    public Integer getWjz() {
        return wjz;
    }

    public void setWjz(Integer wjz) {
        this.wjz = wjz;
    }

    public Integer getYbs() {
        return ybs;
    }

    public void setYbs(Integer ybs) {
        this.ybs = ybs;
    }

    public Integer getWbs() {
        return wbs;
    }

    public void setWbs(Integer wbs) {
        this.wbs = wbs;
    }

    public Integer getYwc() {
        return ywc;
    }

    public void setYwc(Integer ywc) {
        this.ywc = ywc;
    }

    public Integer getWwc() {
        return wwc;
    }

    public void setWwc(Integer wwc) {
        this.wwc = wwc;
    }
}
