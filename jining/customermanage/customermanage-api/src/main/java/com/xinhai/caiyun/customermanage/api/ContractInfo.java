package com.xinhai.caiyun.customermanage.api;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 合同基本信息
 * @author tangck
 *
 */
public class ContractInfo {
    
    /**
     * 编号
     */
    private String id;
    
    /**
     * 合同编码
     */
    private String htbm;
    
    /**
     * 客户编码
     */
    private String khbm;
    
    /**
     * 用户名称（公司名称）
     */
    private String yhmc;
    
    /**
     * 服务起止期
     */
    private Date fwqxq;
    
    /**
     * 服务起止至
     */
    private Date fwqxz;
    
    /**
     * 总费用（月）
     */
    private BigDecimal zfy;
    
    /**
     * 付款方式
     */
    private String fkfs_dm;
    
    /**
     * 付款方式名称
     */
    private String fkfs_mc;
    
    /**
     * 付款先后代码
     */
    private String fkxh_dm;
    
    /**
     * 付款先后名称
     */
    private String fkxh_mc;
    
    /**
     * 特别事项
     */
    private String tbsx;
    
    /**
     * 录入人
     */
    private String lrrmc;
    
    /**
     * 审核人
     */
    private String shrmc;
    
    /**
     * 审核状态
     */
    private String shzt_dm;
    
    /**
     * 审核意见
     */
    private String shyj;
    
    /**
     * 备注信息
     */
    private String bzxx;
    
    /**
     * 职员代码（客户主管）
     */
    private String zydm;
    
    /**
     * 代理机构编码
     */
    private String dljg_bm;
    
    /**
     * 给客户app的信息编码
     */
    private String xxbm;
    
    /**
     * 给客户app的发送标志
     */
    private int fsbz;

    /**
     * 删除标志
     */
    private int scbz;
    
    /**
     * 录入人员
     */
    private String lrry;
    
    /**
     * 审核人员
     */
    private String shry;
    
    /**
     * 更新人员
     */
    private String gxry;

    /**
     * 删除人员
     */
    private String scry;

    /**
     * 录入日期
     */
    private Date lrrq;
    
    /**
     * 审核日期
     */
    private Date shrq;
    
    /**
     * 更新日期
     */
    private Date gxrq;

    /**
     * 删除日期
     */
    private Date scrq;

    /**
     * 签约日期
     */
    private Date qyrq;

    /**
     * 收费项目代码
     */
    private String sfxm_dm;
    
    /**
     * 收费项目名称
     */
    private String sfxm_mc;
    
    /**
     * 续签状态
     */
    private int xqzt;
    
    /**
     * 部门代码
     */
    private String bmdm;

    private BigDecimal hjje;
    
    private String ywlx;

    private int bgz;
    
    

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHtbm() {
        return htbm;
    }

    public void setHtbm(String htbm) {
        this.htbm = htbm;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }

    public String getYhmc() {
        return yhmc;
    }

    public void setYhmc(String yhmc) {
        this.yhmc = yhmc;
    }

    public Date getFwqxq() {
        return fwqxq;
    }

    public void setFwqxq(Date fwqxq) {
        this.fwqxq = fwqxq;
    }

    public Date getFwqxz() {
        return fwqxz;
    }

    public void setFwqxz(Date fwqxz) {
        this.fwqxz = fwqxz;
    }

    public BigDecimal getZfy() {
        return zfy;
    }

    public void setZfy(BigDecimal zfy) {
        this.zfy = zfy;
    }

    public String getFkfs_dm() {
        return fkfs_dm;
    }

    public void setFkfs_dm(String fkfs_dm) {
        this.fkfs_dm = fkfs_dm;
    }

    public String getFkfs_mc() {
        return fkfs_mc;
    }

    public void setFkfs_mc(String fkfs_mc) {
        this.fkfs_mc = fkfs_mc;
    }

    public String getFkxh_dm() {
        return fkxh_dm;
    }

    public void setFkxh_dm(String fkxh_dm) {
        this.fkxh_dm = fkxh_dm;
    }

    public String getFkxh_mc() {
        return fkxh_mc;
    }

    public void setFkxh_mc(String fkxh_mc) {
        this.fkxh_mc = fkxh_mc;
    }

    public String getTbsx() {
        return tbsx;
    }

    public void setTbsx(String tbsx) {
        this.tbsx = tbsx;
    }

    public String getLrrmc() {
        return lrrmc;
    }

    public void setLrrmc(String lrrmc) {
        this.lrrmc = lrrmc;
    }

    public String getShrmc() {
        return shrmc;
    }

    public void setShrmc(String shrmc) {
        this.shrmc = shrmc;
    }

    public String getShzt_dm() {
        return shzt_dm;
    }

    public void setShzt_dm(String shzt_dm) {
        this.shzt_dm = shzt_dm;
    }

    public String getShyj() {
        return shyj;
    }

    public void setShyj(String shyj) {
        this.shyj = shyj;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    public String getZydm() {
        return zydm;
    }

    public void setZydm(String zydm) {
        this.zydm = zydm;
    }

    public String getDljg_bm() {
        return dljg_bm;
    }

    public void setDljg_bm(String dljg_bm) {
        this.dljg_bm = dljg_bm;
    }

    public String getXxbm() {
        return xxbm;
    }

    public void setXxbm(String xxbm) {
        this.xxbm = xxbm;
    }

    public int getFsbz() {
        return fsbz;
    }

    public void setFsbz(int fsbz) {
        this.fsbz = fsbz;
    }

    public int getScbz() {
        return scbz;
    }

    public void setScbz(int scbz) {
        this.scbz = scbz;
    }

    public String getLrry() {
        return lrry;
    }

    public void setLrry(String lrry) {
        this.lrry = lrry;
    }

    public String getShry() {
        return shry;
    }

    public void setShry(String shry) {
        this.shry = shry;
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

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    public Date getShrq() {
        return shrq;
    }

    public void setShrq(Date shrq) {
        this.shrq = shrq;
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

    public Date getQyrq() {
        return qyrq;
    }

    public void setQyrq(Date qyrq) {
        this.qyrq = qyrq;
    }

    public String getSfxm_dm() {
        return sfxm_dm;
    }

    public void setSfxm_dm(String sfxm_dm) {
        this.sfxm_dm = sfxm_dm;
    }

    public String getSfxm_mc() {
        return sfxm_mc;
    }

    public void setSfxm_mc(String sfxm_mc) {
        this.sfxm_mc = sfxm_mc;
    }

    public int getXqzt() {
        return xqzt;
    }

    public void setXqzt(int xqzt) {
        this.xqzt = xqzt;
    }

    public String getBmdm() {
        return bmdm;
    }

    public void setBmdm(String bmdm) {
        this.bmdm = bmdm;
    }

    public BigDecimal getHjje() {
        return hjje;
    }

    public void setHjje(BigDecimal hjje) {
        this.hjje = hjje;
    }

    public String getYwlx() {
        return ywlx;
    }

    public void setYwlx(String ywlx) {
        this.ywlx = ywlx;
    }

    public int getBgz() {
        return bgz;
    }

    public void setBgz(int bgz) {
        this.bgz = bgz;
    }
}
