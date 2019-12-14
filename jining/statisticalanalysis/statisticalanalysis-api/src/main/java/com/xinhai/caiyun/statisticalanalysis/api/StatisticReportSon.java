package com.xinhai.caiyun.statisticalanalysis.api;

import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by lmf on 2018/3/22 0022.
 *
 * @escription: 汇总报表子表
 * @tableName:
 */
public class StatisticReportSon {

    @Id
    private long id;

    /**
     * 代理机构编码
     */
    private String dljg_bm;

    /**
     * 客户编码
     */
    private String khbm;

    /**
     * 版本号
     */
    private String edition;

    /**
     * 部门代码
     */
    private String bmdm;

    /**
     * 所属年月
     */
    private String ssny;

    /**
     * 报税标志：0:未报税；1已报税
     */
    private boolean bsbz;

    /**
     * 录入人员
     */
    private String lrry;

    /**
     * 录入日期
     */
    private Date lrrq;

    /**
     * 合同编码
     */
    private String htbm;

    /**
     * 续签状态
     */
    private boolean xqzt;

    /**
     * 审核状态	000未审核，001同意，002不同意
     */
    private String shzt_dm;

    /**
     * 记账标志	0:未记账；1已记账
     */
    private boolean jzbz;

    /**
     * 服务状态	1启动服务，0停止服务
     */
    private boolean fwzt_dm;

    /**
     * 签约状态	1签约，0未签约，
     */
    private boolean qyzt_dm;

    /**
     * 意向客户编码
     */
    private String yxkhbm;

    /**
     * 任务ID
     */
    private String rwid;

    /**
     * 办理状态（001已完成、002进行中（默认）、003已取消、004以延迟、005暂停中、006未开始）
     */
    private String blzt;

    /**
     * 步骤ID
     */
    private String bzid;

    /**
     * 任务录入人员
     */
    private String rwlrry;

    /**
     * 任务录入人部门编码
     */
    private String rwbmdm;

    /**
     * 任务录入日期
     */
    private Date rwlrrq;

    /**
     * 节点录入人员
     */
    private String jdlrry;

    /**
     * 节点录入人部门编码
     */
    private String jdbmdm;

    /**
     * 节点录入日期
     */
    private Date jdlrrq;

    /**
     * 收据编码
     */
    private String sjbm;

    /**
     * 收费状态（000未收，001已收，002催费，003欠费，004已到账, 005坏账）
     */
    private String sfzt;

    /**
     * 收费金额
     */
    private BigDecimal sfje;

    /**
     * 同步状态(0未同步1已同步)
     */
    private boolean tbzt;

    /**
     * 商机状态(未跟进：001  已跟进：002    已完成：003    已流失：004)
     */
    private String sjzt;

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

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
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

    public String getSsny() {
        return ssny;
    }

    public void setSsny(String ssny) {
        this.ssny = ssny;
    }

    public boolean isBsbz() {
        return bsbz;
    }

    public void setBsbz(boolean bsbz) {
        this.bsbz = bsbz;
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

    public String getHtbm() {
        return htbm;
    }

    public void setHtbm(String htbm) {
        this.htbm = htbm;
    }

    public boolean isXqzt() {
        return xqzt;
    }

    public void setXqzt(boolean xqzt) {
        this.xqzt = xqzt;
    }

    public String getShzt_dm() {
        return shzt_dm;
    }

    public void setShzt_dm(String shzt_dm) {
        this.shzt_dm = shzt_dm;
    }

    public boolean isJzbz() {
        return jzbz;
    }

    public void setJzbz(boolean jzbz) {
        this.jzbz = jzbz;
    }

    public boolean isFwzt_dm() {
        return fwzt_dm;
    }

    public void setFwzt_dm(boolean fwzt_dm) {
        this.fwzt_dm = fwzt_dm;
    }

    public boolean isQyzt_dm() {
        return qyzt_dm;
    }

    public void setQyzt_dm(boolean qyzt_dm) {
        this.qyzt_dm = qyzt_dm;
    }

    public String getYxkhbm() {
        return yxkhbm;
    }

    public void setYxkhbm(String yxkhbm) {
        this.yxkhbm = yxkhbm;
    }

    public String getRwid() {
        return rwid;
    }

    public void setRwid(String rwid) {
        this.rwid = rwid;
    }

    public String getBlzt() {
        return blzt;
    }

    public void setBlzt(String blzt) {
        this.blzt = blzt;
    }

    public String getBzid() {
        return bzid;
    }

    public void setBzid(String bzid) {
        this.bzid = bzid;
    }

    public String getRwlrry() {
        return rwlrry;
    }

    public void setRwlrry(String rwlrry) {
        this.rwlrry = rwlrry;
    }

    public String getRwbmdm() {
        return rwbmdm;
    }

    public void setRwbmdm(String rwbmdm) {
        this.rwbmdm = rwbmdm;
    }

    public Date getRwlrrq() {
        return rwlrrq;
    }

    public void setRwlrrq(Date rwlrrq) {
        this.rwlrrq = rwlrrq;
    }

    public String getJdlrry() {
        return jdlrry;
    }

    public void setJdlrry(String jdlrry) {
        this.jdlrry = jdlrry;
    }

    public String getJdbmdm() {
        return jdbmdm;
    }

    public void setJdbmdm(String jdbmdm) {
        this.jdbmdm = jdbmdm;
    }

    public Date getJdlrrq() {
        return jdlrrq;
    }

    public void setJdlrrq(Date jdlrrq) {
        this.jdlrrq = jdlrrq;
    }

    public String getSjbm() {
        return sjbm;
    }

    public void setSjbm(String sjbm) {
        this.sjbm = sjbm;
    }

    public String getSfzt() {
        return sfzt;
    }

    public void setSfzt(String sfzt) {
        this.sfzt = sfzt;
    }

    public BigDecimal getSfje() {
        return sfje;
    }

    public void setSfje(BigDecimal sfje) {
        this.sfje = sfje;
    }

    public boolean isTbzt() {
        return tbzt;
    }

    public void setTbzt(boolean tbzt) {
        this.tbzt = tbzt;
    }

    public String getSjzt() {
        return sjzt;
    }

    public void setSjzt(String sjzt) {
        this.sjzt = sjzt;
    }
}
