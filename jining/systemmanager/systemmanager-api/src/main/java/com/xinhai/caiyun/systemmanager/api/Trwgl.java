package com.xinhai.caiyun.systemmanager.api;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

/**
 * 描述:t_rwgl_jbxx表的实体类
 * @version
 * @author:  super man
 * @创建时间: 2018-05-21
 */
public class Trwgl {
    /**
     * ID，自增列
     */
    private Long id;

    /**
     * 任务IDRW20171027093320123321
     */
    private String rwid;

    /**
     * 任务名称
     */
    private String rwmc;

    /**
     * 任务类型
     */
    private String rwType;

    /**
     * 001已完成\002进行中（默认）
     */
    private String blzt;

    /**
     * 抽样日期
     */
    private Date cyrq;

    /**
     * 抽样地点
     */
    private String cydd;

    /**
     * 抽样联系人
     */
    private String cylxr;

    /**
     * 备注信息
     */
    private String bzxx;

    /**
     * 删除标志1：已删除、0：未删除
     */
    private boolean scbz;

    /**
     * 数据来源 1委托登记
     */
    private String sjly;

    /**
     * 委托ID
     */
    private String wtid;

    /**
     * 委托单位名称
     */
    private String wtdwmc;

    /**
     * 委托类型
     */
    private String wtType;

    /**
     * 录入人所在部门代码
     */
    private String bmdm;

    /**
     * 录入人员
     */
    private String lrry;

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
     * 更新日期
     */
    private Date gxrq;

    /**
     * 删除日期
     */
    private Date scrq;

    /**
     * 合同名称
     */
    private String htmc;
    /**
     * 抽样时间
     */
    private String cysj;

    private String szsf;

    private String szcs;
    private String ggxh;//规格型号
    private String ypdj;//样品登记
    private String scdw;//生产单位
    private String jclbdm;//检测类别代码
    private String ypsl;//样品数量
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String scrq1;//生产日期
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String rq;//日期
    private String ypbm;//样品编码
    private String ypxtdm;//样品代码
    private String bzq;//保质期
    private String bz;//包装
    private String ypzt;//样品状态
    private String bctj;//保存条件
    private String ypbctj;//样品保存条件
    private List<T_ypgl> list;
    private String cx;//查询
    private String zldj;//质量等级
    private String sczdz;//生产地址
    private String cyjs;//抽样基数
    private String zxry;//执行人员
    private String cylxfs;//抽样联系方式
    private String if_jd;//是否就地制样
    private String cydw;//抽样联系方式



    public String getIf_jd() {
        return if_jd;
    }

    public void setIf_jd(String if_jd) {
        this.if_jd = if_jd;
    }

    public String getCylxfs() {
        return cylxfs;
    }

    public void setCylxfs(String cylxfs) {
        this.cylxfs = cylxfs;
    }

    public String getZxry() {
        return zxry;
    }

    public void setZxry(String zxry) {
        this.zxry = zxry;
    }

    public String getCyjs() {
        return cyjs;
    }

    public void setCyjs(String cyjs) {
        this.cyjs = cyjs;
    }

    public String getSczdz() {
        return sczdz;
    }

    public void setSczdz(String sczdz) {
        this.sczdz = sczdz;
    }

    public String getRq() {
        return rq;
    }

    public void setRq(String rq) {
        this.rq = rq;
    }

    public String getZldj() {
        return zldj;
    }

    public void setZldj(String zldj) {
        this.zldj = zldj;
    }

    public String getYpxtdm() {
        String mc = null;
        if ("001".equals(ypxtdm)) {
            mc = "固态";
        }else  if ("002".equals(ypxtdm)){
            mc = "半固态";
        }else  if ("003".equals(ypxtdm)){
            mc = "液态";
        }else if ("004".equals(ypxtdm)){
            mc = "气体";
        }else  if ("005".equals(ypxtdm)){
            mc = "Solid";
        }else if ("006".equals(ypxtdm)) {
            mc = "Liquid";
        }else  if ("007".equals(ypxtdm)) {
            mc = "Gas";
        }else if ("008".equals(ypxtdm)) {
            mc = "Semisolid";
        }else {
            mc="";
        }
        return mc;
    }

    public void setYpxtdm(String ypxtdm) {
        this.ypxtdm = ypxtdm;
    }

    public String getBctj() {
        return bctj;
    }

    public void setBctj(String bctj) {
        this.bctj = bctj;
    }


    public String getGgxh() {
        return ggxh;
    }

    public void setGgxh(String ggxh) {
        this.ggxh = ggxh;
    }

    public String getYpdj() {
        return ypdj;
    }

    public void setYpdj(String ypdj) {
        this.ypdj = ypdj;
    }

    public String getScdw() {
        return scdw;
    }

    public void setScdw(String scdw) {
        this.scdw = scdw;
    }

    public String getJclbdm() {
        return jclbdm;
    }

    public void setJclbdm(String jclbdm) {
        this.jclbdm = jclbdm;
    }

    public String getYpsl() {
        return ypsl;
    }

    public void setYpsl(String ypsl) {
        this.ypsl = ypsl;
    }

    public String getScrq1() {
        return scrq1;
    }

    public void setScrq1(String scrq1) {
        this.scrq1 = scrq1;
    }

    public String getYpbm() {
        return ypbm;
    }

    public void setYpbm(String ypbm) {
        this.ypbm = ypbm;
    }

    public String getBzq() {
        return bzq;
    }

    public void setBzq(String bzq) {
        this.bzq = bzq;
    }

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }

    public String getYpzt() {
        return ypzt;
    }

    public void setYpzt(String ypzt) {
        this.ypzt = ypzt;
    }

    public String getYpbctj() {
        String yptj = null;
        if ("001".equals(ypbctj)) {
            yptj="常温";
        }else if ("002".equals(ypbctj)) {
            yptj="冷藏";
        }else if ("003".equals(ypbctj)){
            yptj="冷冻";
        }else if ("004".equals(ypbctj)){
            yptj="避光";
        }else if ("005".equals(ypbctj)) {
            yptj="食密闭";
        }else if ("006".equals(ypbctj)) {
            yptj="干燥";
        }else if ("007".equals(ypbctj)){
            yptj="其它";
        }else  if ("008".equals(ypbctj)) {
            yptj="Normal temperature";
        }else if ("009".equals(ypbctj)){
            yptj="Cold Storage";
        }else  if ("010".equals(ypbctj)) {
            yptj="Freeze";
        }else  if ("011".equals(ypbctj)) {
            yptj="Lucifuge";
        }else  if ("012".equals(ypbctj)) {
            yptj="Dry";
        }else  if ("013".equals(ypbctj)) {
            yptj="卫生";
        }else  if("014".equals(ypbctj)){
            yptj="阴凉";
        }else  if ("015".equals(ypbctj)) {
            yptj="通风";
        }else if ("016".equals(ypbctj)) {
            yptj="干燥处";
        }else if ("017".equals(ypbctj)) {
            yptj="0℃--4℃";
        }else{
            yptj="";
        }

        return yptj;
    }

    public void setYpbctj(String ypbctj) {
        this.ypbctj = ypbctj;
    }

    public String getCx() {
        return cx;
    }

    public void setCx(String cx) {
        this.cx = cx;
    }

    public List<T_ypgl> getList() {
        return list;
    }

    public void setList(List<T_ypgl> list) {
        this.list = list;
    }

    public String getHtmc() {
        return htmc;
    }

    public void setHtmc(String htmc) {
        this.htmc = htmc;
    }

    public String getSzsf() {
        return szsf;
    }

    public void setSzsf(String szsf) {
        this.szsf = szsf;
    }

    public String getSzcs() {
        return szcs;
    }

    public void setSzcs(String szcs) {
        this.szcs = szcs;
    }

    public Date getCyrq() {
        return cyrq;
    }

    public void setCyrq(Date cyrq) {
        this.cyrq = cyrq;
    }

    public String getCydd() {
        return cydd;
    }

    public void setCydd(String cydd) {
        this.cydd = cydd;
    }

    public String getCylxr() {
        return cylxr;
    }

    public void setCylxr(String cylxr) {
        this.cylxr = cylxr;
    }

    /**
     * ID，自增列
     * @return ID ID，自增列
     */
    public Long getId() {
        return id;
    }

    /**
     * ID，自增列
     * @param id ID，自增列
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 任务IDRW20171027093320123321
     * @return RWID 任务IDRW20171027093320123321
     */
    public String getRwid() {
        return rwid;
    }

    /**
     * 任务IDRW20171027093320123321
     * @param rwid 任务IDRW20171027093320123321
     */
    public void setRwid(String rwid) {
        this.rwid = rwid == null ? null : rwid.trim();
    }

    /**
     * 任务名称
     * @return RWMC 任务名称
     */
    public String getRwmc() {
        return rwmc;
    }

    /**
     * 任务名称
     * @param rwmc 任务名称
     */
    public void setRwmc(String rwmc) {
        this.rwmc = rwmc == null ? null : rwmc.trim();
    }

    /**
     * 任务类型
     * @return RW_TYPE 任务类型
     */
    public String getRwType() {
        return rwType;
    }

    /**
     * 任务类型
     * @param rwType 任务类型
     */
    public void setRwType(String rwType) {
        this.rwType = rwType == null ? null : rwType.trim();
    }

    /**
     * 001已完成\002进行中（默认）
     * @return BLZT 001已完成\002进行中（默认）
     */
    public String getBlzt() {
        return blzt;
    }

    /**
     * 001已完成\002进行中（默认）
     * @param blzt 001已完成\002进行中（默认）
     */
    public void setBlzt(String blzt) {
        this.blzt = blzt == null ? null : blzt.trim();
    }

    /**
     * 备注信息
     * @return BZXX 备注信息
     */
    public String getBzxx() {
        return bzxx;
    }

    /**
     * 备注信息
     * @param bzxx 备注信息
     */
    public void setBzxx(String bzxx) {
        this.bzxx = bzxx == null ? null : bzxx.trim();
    }

    public boolean isScbz() {
        return scbz;
    }

    public void setScbz(boolean scbz) {
        this.scbz = scbz;
    }

    /**
     * 数据来源 1委托登记
     * @return SJLY 数据来源 1委托登记
     */
    public String getSjly() {
        return sjly;
    }

    /**
     * 数据来源 1委托登记
     * @param sjly 数据来源 1委托登记
     */
    public void setSjly(String sjly) {
        this.sjly = sjly == null ? null : sjly.trim();
    }

    /**
     * 委托ID
     * @return WTID 委托ID
     */
    public String getWtid() {
        return wtid;
    }

    /**
     * 委托ID
     * @param wtid 委托ID
     */
    public void setWtid(String wtid) {
        this.wtid = wtid == null ? null : wtid.trim();
    }

    /**
     * 委托单位名称
     * @return WTDWMC 委托单位名称
     */
    public String getWtdwmc() {
        return wtdwmc;
    }

    /**
     * 委托单位名称
     * @param wtdwmc 委托单位名称
     */
    public void setWtdwmc(String wtdwmc) {
        this.wtdwmc = wtdwmc == null ? null : wtdwmc.trim();
    }

    /**
     * 委托类型
     * @return WT_TYPE 委托类型
     */
    public String getWtType() {
        return wtType;
    }

    /**
     * 委托类型
     * @param wtType 委托类型
     */
    public void setWtType(String wtType) {
        this.wtType = wtType == null ? null : wtType.trim();
    }

    /**
     * 录入人所在部门代码
     * @return BMDM 录入人所在部门代码
     */
    public String getBmdm() {
        return bmdm;
    }

    /**
     * 录入人所在部门代码
     * @param bmdm 录入人所在部门代码
     */
    public void setBmdm(String bmdm) {
        this.bmdm = bmdm == null ? null : bmdm.trim();
    }

    /**
     * 录入人员
     * @return LRRY 录入人员
     */
    public String getLrry() {
        return lrry;
    }

    /**
     * 录入人员
     * @param lrry 录入人员
     */
    public void setLrry(String lrry) {
        this.lrry = lrry == null ? null : lrry.trim();
    }

    /**
     * 更新人员
     * @return GXRY 更新人员
     */
    public String getGxry() {
        return gxry;
    }

    /**
     * 更新人员
     * @param gxry 更新人员
     */
    public void setGxry(String gxry) {
        this.gxry = gxry == null ? null : gxry.trim();
    }

    /**
     * 删除人员
     * @return SCRY 删除人员
     */
    public String getScry() {
        return scry;
    }

    /**
     * 删除人员
     * @param scry 删除人员
     */
    public void setScry(String scry) {
        this.scry = scry == null ? null : scry.trim();
    }

    /**
     * 录入日期
     * @return LRRQ 录入日期
     */
    public Date getLrrq() {
        return lrrq;
    }

    /**
     * 录入日期
     * @param lrrq 录入日期
     */
    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    /**
     * 更新日期
     * @return GXRQ 更新日期
     */
    public Date getGxrq() {
        return gxrq;
    }

    /**
     * 更新日期
     * @param gxrq 更新日期
     */
    public void setGxrq(Date gxrq) {
        this.gxrq = gxrq;
    }

    /**
     * 删除日期
     * @return SCRQ 删除日期
     */
    public Date getScrq() {
        return scrq;
    }

    /**
     * 删除日期
     * @param scrq 删除日期
     */
    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }

    public String getCydw() {
        return cydw;
    }

    public void setCydw(String cydw) {
        this.cydw = cydw;
    }

    public String getCysj() {
        return cysj;
    }

    public void setCysj(String cysj) {
        this.cysj = cysj;
    }
}