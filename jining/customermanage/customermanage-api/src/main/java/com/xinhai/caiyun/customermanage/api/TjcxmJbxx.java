package com.xinhai.caiyun.customermanage.api;

import java.util.Date;

/**
 * 描述:t_jcxm_jbxx表的实体类
 * @version
 * @author:  Administrator
 * @创建时间: 2018-05-10
 */
public class TjcxmJbxx {
    /**
     * ID
     */
    private Long id;

    /**
     * 样品编码_关联t_ypgl_jbxx
     */
    private String ypbm;

    private String zwmc_bm;

    /**
     * 中文名称及编码
     */
    private String zwmcBm;

    /**
     * 细类
     */
    private String xl;

    /**
     * 次亚类
     */
    private String cyl;

    /**
     * 亚类
     */
    private String yl;

    /**
     * 产品大类代码
     */
    private String cpdldm;

    /**
     * 产品大类名称
     */
    private String cpdlmc;

    /**
     * 检测类别代码
     */
    private String jclbdm;

    /**
     * 检测方法
     */
    private String jcfa;

    /**
     * 判定依据
     */
    private String pdyj;

    /**
     * 判定依据名称
     */
    private String pdyjmc;

    /**
     * 组名
     */
    private String zm;

    /**
     * 倍率
     */
    private String bl;

    /**
     * 是否判定(1是0否)
     */
    private String ifPd;

    /**
     * 比较符
     */
    private String bjf;

    /**
     * 判断编号
     */
    private String pdnh;

    /**
     * 限量值默认值
     */
    private String xlzmrz;

    /**
     * 检测依据
     */
    private String jcyj;

    /**
     * 检测依据名称
     */
    private String jcyjmc;

    /**
     * 是否有CMA资质(1是0否)
     */
    private boolean ifCma;

    /**
     * 是否有CMAF资质(1是0否)
     */
    private boolean ifCmaf;

    /**
     * 是否有CNAS资质(1是0否)
     */
    private boolean ifCnas;

    /**
     * 是否有CATL资质(1是0否)
     */
    private boolean ifCatl;

    /**
     * 检出限
     */
    private String jcx;

    /**
     * 限量值
     */
    private String xlz;

    /**
     * 计量单位
     */
    private String jldw;

    /**
     * 英文名称
     */
    private String ywmc;

    /**
     * 是否删除
     */
    private boolean scbz;

    /**
     * 备注
     */
    private String bzxx;

    /**
     * 录入人员
     */
    private String lrry;

    /**
     * 录入人所在部门代码
     */
    private String bmdm;

    /**
     * 跟新人员
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
     * ID
     * @return ID ID
     */
    private String bzffjcxdw;
    private String bzzxyxx;
    private String bzzxyxxdw;
    private String bzzdyxx;
    private String bzzdyxxdw;
    private String wswnz;
    private String wswmz;
    private String wswcz;
    private String jg;
    private String zbzl;
    private String zbzldw;
    private String yyckjz;
    private String bz;
    private String if_pd;
    private String if_cma;
    private String if_cmaf;
    private String if_cnas;
    private String if_catl;
    private String if_xtpd;
    private String if_bzff;

    public String getBzffjcxdw() {
        return bzffjcxdw;
    }

    public void setBzffjcxdw(String bzffjcxdw) {
        this.bzffjcxdw = bzffjcxdw;
    }

    public String getBzzxyxx() {
        return bzzxyxx;
    }

    public void setBzzxyxx(String bzzxyxx) {
        this.bzzxyxx = bzzxyxx;
    }

    public String getBzzxyxxdw() {
        return bzzxyxxdw;
    }

    public void setBzzxyxxdw(String bzzxyxxdw) {
        this.bzzxyxxdw = bzzxyxxdw;
    }

    public String getBzzdyxx() {
        return bzzdyxx;
    }

    public void setBzzdyxx(String bzzdyxx) {
        this.bzzdyxx = bzzdyxx;
    }

    public String getBzzdyxxdw() {
        return bzzdyxxdw;
    }

    public void setBzzdyxxdw(String bzzdyxxdw) {
        this.bzzdyxxdw = bzzdyxxdw;
    }

    public String getWswnz() {
        return wswnz;
    }

    public void setWswnz(String wswnz) {
        this.wswnz = wswnz;
    }

    public String getWswmz() {
        return wswmz;
    }

    public void setWswmz(String wswmz) {
        this.wswmz = wswmz;
    }

    public String getWswcz() {
        return wswcz;
    }

    public void setWswcz(String wswcz) {
        this.wswcz = wswcz;
    }

    public String getJg() {
        return jg;
    }

    public void setJg(String jg) {
        this.jg = jg;
    }

    public String getZbzl() {
        return zbzl;
    }

    public void setZbzl(String zbzl) {
        this.zbzl = zbzl;
    }

    public String getZbzldw() {
        return zbzldw;
    }

    public void setZbzldw(String zbzldw) {
        this.zbzldw = zbzldw;
    }

    public String getYyckjz() {
        return yyckjz;
    }

    public void setYyckjz(String yyckjz) {
        this.yyckjz = yyckjz;
    }

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }

    public String getIf_pd() {
        return if_pd;
    }

    public void setIf_pd(String if_pd) {
        this.if_pd = if_pd;
    }

    public String getIf_cma() {
        return if_cma;
    }

    public void setIf_cma(String if_cma) {
        this.if_cma = if_cma;
    }

    public String getIf_cmaf() {
        return if_cmaf;
    }

    public void setIf_cmaf(String if_cmaf) {
        this.if_cmaf = if_cmaf;
    }

    public String getIf_cnas() {
        return if_cnas;
    }

    public void setIf_cnas(String if_cnas) {
        this.if_cnas = if_cnas;
    }

    public String getIf_catl() {
        return if_catl;
    }

    public void setIf_catl(String if_catl) {
        this.if_catl = if_catl;
    }

    public String getIf_xtpd() {
        return if_xtpd;
    }

    public void setIf_xtpd(String if_xtpd) {
        this.if_xtpd = if_xtpd;
    }

    public String getIf_bzff() {
        return if_bzff;
    }

    public void setIf_bzff(String if_bzff) {
        this.if_bzff = if_bzff;
    }

    public Long getId() {
        return id;
    }

    /**
     * ID
     * @param id ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    public String getZwmc_bm() {
        return zwmc_bm;
    }

    public void setZwmc_bm(String zwmc_bm) {
        this.zwmc_bm = zwmc_bm;
    }

    /**
     * 样品编码_关联t_ypgl_jbxx
     * @return YPBM 样品编码_关联t_ypgl_jbxx
     */
    public String getYpbm() {
        return ypbm;
    }

    /**
     * 样品编码_关联t_ypgl_jbxx
     * @param ypbm 样品编码_关联t_ypgl_jbxx
     */
    public void setYpbm(String ypbm) {
        this.ypbm = ypbm == null ? null : ypbm.trim();
    }

    /**
     * 中文名称及编码
     * @return ZWMC_BM 中文名称及编码
     */
    public String getZwmcBm() {
        return zwmcBm;
    }

    /**
     * 中文名称及编码
     * @param zwmcBm 中文名称及编码
     */
    public void setZwmcBm(String zwmcBm) {
        this.zwmcBm = zwmcBm == null ? null : zwmcBm.trim();
    }

    /**
     * 细类
     * @return XL 细类
     */
    public String getXl() {
        return xl;
    }

    /**
     * 细类
     * @param xl 细类
     */
    public void setXl(String xl) {
        this.xl = xl == null ? null : xl.trim();
    }

    /**
     * 次亚类
     * @return CYL 次亚类
     */
    public String getCyl() {
        return cyl;
    }

    /**
     * 次亚类
     * @param cyl 次亚类
     */
    public void setCyl(String cyl) {
        this.cyl = cyl == null ? null : cyl.trim();
    }

    /**
     * 亚类
     * @return YL 亚类
     */
    public String getYl() {
        return yl;
    }

    /**
     * 亚类
     * @param yl 亚类
     */
    public void setYl(String yl) {
        this.yl = yl == null ? null : yl.trim();
    }

    /**
     * 产品大类代码
     * @return CPDLDM 产品大类代码
     */
    public String getCpdldm() {
        return cpdldm;
    }

    /**
     * 产品大类代码
     * @param cpdldm 产品大类代码
     */
    public void setCpdldm(String cpdldm) {
        this.cpdldm = cpdldm == null ? null : cpdldm.trim();
    }

    /**
     * 产品大类名称
     * @return CPDLMC 产品大类名称
     */
    public String getCpdlmc() {
        return cpdlmc;
    }

    /**
     * 产品大类名称
     * @param cpdlmc 产品大类名称
     */
    public void setCpdlmc(String cpdlmc) {
        this.cpdlmc = cpdlmc == null ? null : cpdlmc.trim();
    }

    /**
     * 检测类别代码
     * @return JCLBDM 检测类别代码
     */
    public String getJclbdm() {
        return jclbdm;
    }

    /**
     * 检测类别代码
     * @param jclbdm 检测类别代码
     */
    public void setJclbdm(String jclbdm) {
        this.jclbdm = jclbdm == null ? null : jclbdm.trim();
    }

    /**
     * 检测方法
     * @return JCFA 检测方法
     */
    public String getJcfa() {
        return jcfa;
    }

    /**
     * 检测方法
     * @param jcfa 检测方法
     */
    public void setJcfa(String jcfa) {
        this.jcfa = jcfa == null ? null : jcfa.trim();
    }

    /**
     * 判定依据
     * @return PDYJ 判定依据
     */
    public String getPdyj() {
        return pdyj;
    }

    /**
     * 判定依据
     * @param pdyj 判定依据
     */
    public void setPdyj(String pdyj) {
        this.pdyj = pdyj == null ? null : pdyj.trim();
    }

    /**
     * 判定依据名称
     * @return PDYJMC 判定依据名称
     */
    public String getPdyjmc() {
        return pdyjmc;
    }

    /**
     * 判定依据名称
     * @param pdyjmc 判定依据名称
     */
    public void setPdyjmc(String pdyjmc) {
        this.pdyjmc = pdyjmc == null ? null : pdyjmc.trim();
    }

    /**
     * 组名
     * @return ZM 组名
     */
    public String getZm() {
        return zm;
    }

    /**
     * 组名
     * @param zm 组名
     */
    public void setZm(String zm) {
        this.zm = zm == null ? null : zm.trim();
    }

    /**
     * 倍率
     * @return BL 倍率
     */
    public String getBl() {
        return bl;
    }

    /**
     * 倍率
     * @param bl 倍率
     */
    public void setBl(String bl) {
        this.bl = bl == null ? null : bl.trim();
    }

    /**
     * 是否判定(1是0否)
     * @return IF_PD 是否判定(1是0否)
     */
    public String getIfPd() {
        return ifPd;
    }

    /**
     * 是否判定(1是0否)
     * @param ifPd 是否判定(1是0否)
     */
    public void setIfPd(String ifPd) {
        this.ifPd = ifPd == null ? null : ifPd.trim();
    }

    /**
     * 比较符
     * @return BJF 比较符
     */
    public String getBjf() {
        return bjf;
    }

    /**
     * 比较符
     * @param bjf 比较符
     */
    public void setBjf(String bjf) {
        this.bjf = bjf == null ? null : bjf.trim();
    }

    /**
     * 判断编号
     * @return PDNH 判断编号
     */
    public String getPdnh() {
        return pdnh;
    }

    /**
     * 判断编号
     * @param pdnh 判断编号
     */
    public void setPdnh(String pdnh) {
        this.pdnh = pdnh == null ? null : pdnh.trim();
    }

    /**
     * 限量值默认值
     * @return XLZMRZ 限量值默认值
     */
    public String getXlzmrz() {
        return xlzmrz;
    }

    /**
     * 限量值默认值
     * @param xlzmrz 限量值默认值
     */
    public void setXlzmrz(String xlzmrz) {
        this.xlzmrz = xlzmrz == null ? null : xlzmrz.trim();
    }

    /**
     * 检测依据
     * @return JCYJ 检测依据
     */
    public String getJcyj() {
        return jcyj;
    }

    /**
     * 检测依据
     * @param jcyj 检测依据
     */
    public void setJcyj(String jcyj) {
        this.jcyj = jcyj == null ? null : jcyj.trim();
    }

    /**
     * 检测依据名称
     * @return JCYJMC 检测依据名称
     */
    public String getJcyjmc() {
        return jcyjmc;
    }

    /**
     * 检测依据名称
     * @param jcyjmc 检测依据名称
     */
    public void setJcyjmc(String jcyjmc) {
        this.jcyjmc = jcyjmc == null ? null : jcyjmc.trim();
    }

    /**
     * 检出限
     * @return JCX 检出限
     */
    public String getJcx() {
        return jcx;
    }

    /**
     * 检出限
     * @param jcx 检出限
     */
    public void setJcx(String jcx) {
        this.jcx = jcx == null ? null : jcx.trim();
    }

    /**
     * 限量值
     * @return XLZ 限量值
     */
    public String getXlz() {
        return xlz;
    }

    /**
     * 限量值
     * @param xlz 限量值
     */
    public void setXlz(String xlz) {
        this.xlz = xlz == null ? null : xlz.trim();
    }

    /**
     * 计量单位
     * @return JLDW 计量单位
     */
    public String getJldw() {
        return jldw;
    }

    /**
     * 计量单位
     * @param jldw 计量单位
     */
    public void setJldw(String jldw) {
        this.jldw = jldw == null ? null : jldw.trim();
    }

    /**
     * 英文名称
     * @return YWMC 英文名称
     */
    public String getYwmc() {
        return ywmc;
    }

    /**
     * 英文名称
     * @param ywmc 英文名称
     */
    public void setYwmc(String ywmc) {
        this.ywmc = ywmc == null ? null : ywmc.trim();
    }

    /**
     * 备注
     * @return BZXX 备注
     */
    public String getBzxx() {
        return bzxx;
    }

    /**
     * 备注
     * @param bzxx 备注
     */
    public void setBzxx(String bzxx) {
        this.bzxx = bzxx == null ? null : bzxx.trim();
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
     * 跟新人员
     * @return GXRY 跟新人员
     */
    public String getGxry() {
        return gxry;
    }

    /**
     * 跟新人员
     * @param gxry 跟新人员
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

    public boolean isIfCma() {
        return ifCma;
    }

    public void setIfCma(boolean ifCma) {
        this.ifCma = ifCma;
    }

    public boolean isIfCmaf() {
        return ifCmaf;
    }

    public void setIfCmaf(boolean ifCmaf) {
        this.ifCmaf = ifCmaf;
    }

    public boolean isIfCnas() {
        return ifCnas;
    }

    public void setIfCnas(boolean ifCnas) {
        this.ifCnas = ifCnas;
    }

    public boolean isIfCatl() {
        return ifCatl;
    }

    public void setIfCatl(boolean ifCatl) {
        this.ifCatl = ifCatl;
    }

    public boolean isScbz() {
        return scbz;
    }

    public void setScbz(boolean scbz) {
        this.scbz = scbz;
    }

}