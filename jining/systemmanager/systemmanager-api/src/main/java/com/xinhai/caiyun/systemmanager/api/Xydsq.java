package com.xinhai.caiyun.systemmanager.api;/*
 * Welcome to use the TableGo Tools.
 * 
 * http://vipbooks.iteye.com
 * http://blog.csdn.net/vipbooks
 * http://www.cnblogs.com/vipbooks
 * 
 * Author:bianj
 * Email:edinsker@163.com
 * Version:4.1.2
 */

import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 信用贷申请(PT_XYDSQ)
 * 
 * @author bianj
 * @version 1.0.0 2018-01-19
 */
public class Xydsq implements java.io.Serializable {


    private String fkyh;//放款银行
    private String ywlxrxm;//业务联系人姓名
    private String ywlxrsjh;//业务联系人手机号


    public String getFkyh() {
        return fkyh;
    }

    public void setFkyh(String fkyh) {
        this.fkyh = fkyh;
    }

    public String getYwlxrxm() {
        return ywlxrxm;
    }

    public void setYwlxrxm(String ywlxrxm) {
        this.ywlxrxm = ywlxrxm;
    }

    public String getYwlxrsjh() {
        return ywlxrsjh;
    }

    public void setYwlxrsjh(String ywlxrsjh) {
        this.ywlxrsjh = ywlxrsjh;
    }

    /** ID，自增列 */
    private Long id;

    /** 申请ID */
    private String sqid;

    /** 客户编码 */
    private String khbm;

    /** 代理机构编码 */
    private String dljgBm;

    /** 职员代码 */
    private String zydm;

    /** 职员名称 */
    private String zymc;

    /** 部门编码 */
    private String bmbm;

    /** 部门名称 */
    private String bmmc;

    /** 申请贷款金额 */
    private BigDecimal sqdkje;

    /** 申请期限3月;6月;12月 */
    private Integer sqqx;

    /** 贷款用途 */
    private String dkyt;

    /** 借款人姓名 */
    private String jkrxm;

    /** 借款人性别　0男；1女 */
    private Integer jkrxb;

    /** 借款人手机号 */
    private String jkrsjh;

    /** 借款人身份证号 */
    private String jkrsfzh;

    /** 借款人省份代码 */
    private String jkrsfdm;

    /** 借款人城市代码 */
    private String jkrcsdm;

    /** 借款人县区代码 */
    private String jkrxqdm;

    /** 借款人省份名称 */
    private String jkrsfmc;

    /** 借款人城市名称 */
    private String jkrcsmc;

    /** 借款人县区名称 */
    private String jkrxqmc;

    /** 借款人路／街名称 */
    private String jkrljmc;

    /** 借款人小区／楼名称 */
    private String jkrqlmc;

    /** 借款人楼号 */
    private String jkrlh;

    /** 借款人楼单元号 */
    private String jkrldy;

    /** 借款人室号 */
    private String jkrsh;

    /** 借款人职务 */
    private String jkrzw;

    /** 企业名称 */
    private String qymc;

    /** 企业性质　１股份２私营３外资４有限公司５其他 */
    private Integer qyxz;

    /** 纳税人识别号 */
    private String nsrsbh;

    /** 经营行业DM */
    private String jyhyDm;

    /** 经营行业MC */
    private String jyhyMc;

    /** 成立时间 */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date clsj;

    /** 企业人数 */
    private Integer qyrs;

    /** 企业固话 */
    private String qygh;

    /** 企业地址 */
    private String qydz;

    /** 基本开户行 */
    private String jbkhh;

    /** 企业登记注册类型名称 */
    private String qydjzclxmc;

    /** 企业登记注册类型代码 */
    private String qydjzclxdm;

    /** 增值税纳税人类型名称　１一般纳税人　２小规模纳税人 */
    private String zzsnsrlxmc;

    /** 增值税纳税人类型代码　１一般纳税人　２小规模纳税人 */
    private Integer zzsnsrlxdm;

    /** 去年开票金额 */
    private BigDecimal snkpje;

    /** 前年开票金额 */
    private BigDecimal qnkpje;

    /** 审批人代码初审 */
    private String sprdmCs;

    /** 审批人名称初审 */
    private String sprmcCs;

    /** 审批类型初审0未审批1同意2不同意 */
    private Integer splxCs;

    /** 审批意见初审 */
    private String spyjCs;

    /** 审批时间初审 */
    private Date spsjCs;

    /** 审批人代码终审 */
    private String sprdmZs;

    /** 审批人名称终审 */
    private String sprmcZs;

    /** 审批类型终审0未审批1同意2不同意 */
    private Integer splxZs;

    /** 审批意见终审 */
    private String spyjZs;

    /** 审批时间终审 */
    private Date spsjZs;

    /** 删除标志1：已删除、0：未删除 */
    private Integer scbz;

    /** 录入人员 */
    private String lrry;

    /** 更新人员 */
    private String gxry;

    /** 删除人员 */
    private String scry;

    /** 录入日期 */
    private Date lrrq;

    /** 更新日期 */
    private Date gxrq;

    /** 删除日期 */
    private Date scrq;

    /**
     * 获取ID，自增列
     *
     * @return ID
     */
    public Long getId() {
        return this.id;
    }

    /**
     * 设置ID，自增列
     *
     * @param id
     *          ID，自增列
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 获取申请ID
     *
     * @return 申请ID
     */
    public String getSqid() {
        return this.sqid;
    }

    /**
     * 设置申请ID
     *
     * @param sqid
     *          申请ID
     */
    public void setSqid(String sqid) {
        this.sqid = sqid;
    }

    /**
     * 获取客户编码
     *
     * @return 客户编码
     */
    public String getKhbm() {
        return this.khbm;
    }

    /**
     * 设置客户编码
     *
     * @param khbm
     *          客户编码
     */
    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }

    /**
     * 获取代理机构编码
     *
     * @return 代理机构编码
     */
    public String getDljgBm() {
        return this.dljgBm;
    }

    /**
     * 设置代理机构编码
     *
     * @param dljgBm
     *          代理机构编码
     */
    public void setDljgBm(String dljgBm) {
        this.dljgBm = dljgBm;
    }

    /**
     * 获取职员代码
     *
     * @return 职员代码
     */
    public String getZydm() {
        return this.zydm;
    }

    /**
     * 设置职员代码
     *
     * @param zydm
     *          职员代码
     */
    public void setZydm(String zydm) {
        this.zydm = zydm;
    }

    /**
     * 获取职员名称
     *
     * @return 职员名称
     */
    public String getZymc() {
        return this.zymc;
    }

    /**
     * 设置职员名称
     *
     * @param zymc
     *          职员名称
     */
    public void setZymc(String zymc) {
        this.zymc = zymc;
    }

    /**
     * 获取部门编码
     *
     * @return 部门编码
     */
    public String getBmbm() {
        return this.bmbm;
    }

    /**
     * 设置部门编码
     *
     * @param bmbm
     *          部门编码
     */
    public void setBmbm(String bmbm) {
        this.bmbm = bmbm;
    }

    /**
     * 获取部门名称
     *
     * @return 部门名称
     */
    public String getBmmc() {
        return this.bmmc;
    }

    /**
     * 设置部门名称
     *
     * @param bmmc
     *          部门名称
     */
    public void setBmmc(String bmmc) {
        this.bmmc = bmmc;
    }

    /**
     * 获取申请贷款金额
     *
     * @return 申请贷款金额
     */
    public BigDecimal getSqdkje() {
        return this.sqdkje;
    }

    /**
     * 设置申请贷款金额
     *
     * @param sqdkje
     *          申请贷款金额
     */
    public void setSqdkje(BigDecimal sqdkje) {
        this.sqdkje = sqdkje;
    }

    /**
     * 获取申请期限3月;6月;12月
     *
     * @return 申请期限3月;6月;12月
     */
    public Integer getSqqx() {
        return this.sqqx;
    }

    /**
     * 设置申请期限3月;6月;12月
     *
     * @param sqqx
     *          申请期限3月;6月;12月
     */
    public void setSqqx(Integer sqqx) {
        this.sqqx = sqqx;
    }

    /**
     * 获取贷款用途
     *
     * @return 贷款用途
     */
    public String getDkyt() {
        return this.dkyt;
    }

    /**
     * 设置贷款用途
     *
     * @param dkyt
     *          贷款用途
     */
    public void setDkyt(String dkyt) {
        this.dkyt = dkyt;
    }

    /**
     * 获取借款人姓名
     *
     * @return 借款人姓名
     */
    public String getJkrxm() {
        return this.jkrxm;
    }

    /**
     * 设置借款人姓名
     *
     * @param jkrxm
     *          借款人姓名
     */
    public void setJkrxm(String jkrxm) {
        this.jkrxm = jkrxm;
    }

    /**
     * 获取借款人性别　0男；1女
     *
     * @return 借款人性别　0男；1女
     */
    public Integer getJkrxb() {
        return this.jkrxb;
    }

    /**
     * 设置借款人性别　0男；1女
     *
     * @param jkrxb
     *          借款人性别　0男；1女
     */
    public void setJkrxb(Integer jkrxb) {
        this.jkrxb = jkrxb;
    }

    /**
     * 获取借款人手机号
     *
     * @return 借款人手机号
     */
    public String getJkrsjh() {
        return this.jkrsjh;
    }

    /**
     * 设置借款人手机号
     *
     * @param jkrsjh
     *          借款人手机号
     */
    public void setJkrsjh(String jkrsjh) {
        this.jkrsjh = jkrsjh;
    }

    /**
     * 获取借款人身份证号
     *
     * @return 借款人身份证号
     */
    public String getJkrsfzh() {
        return this.jkrsfzh;
    }

    /**
     * 设置借款人身份证号
     *
     * @param jkrsfzh
     *          借款人身份证号
     */
    public void setJkrsfzh(String jkrsfzh) {
        this.jkrsfzh = jkrsfzh;
    }

    /**
     * 获取借款人省份代码
     *
     * @return 借款人省份代码
     */
    public String getJkrsfdm() {
        return this.jkrsfdm;
    }

    /**
     * 设置借款人省份代码
     *
     * @param jkrsfdm
     *          借款人省份代码
     */
    public void setJkrsfdm(String jkrsfdm) {
        this.jkrsfdm = jkrsfdm;
    }

    /**
     * 获取借款人城市代码
     *
     * @return 借款人城市代码
     */
    public String getJkrcsdm() {
        return this.jkrcsdm;
    }

    /**
     * 设置借款人城市代码
     *
     * @param jkrcsdm
     *          借款人城市代码
     */
    public void setJkrcsdm(String jkrcsdm) {
        this.jkrcsdm = jkrcsdm;
    }

    /**
     * 获取借款人县区代码
     *
     * @return 借款人县区代码
     */
    public String getJkrxqdm() {
        return this.jkrxqdm;
    }

    /**
     * 设置借款人县区代码
     *
     * @param jkrxqdm
     *          借款人县区代码
     */
    public void setJkrxqdm(String jkrxqdm) {
        this.jkrxqdm = jkrxqdm;
    }

    /**
     * 获取借款人省份名称
     *
     * @return 借款人省份名称
     */
    public String getJkrsfmc() {
        return this.jkrsfmc;
    }

    /**
     * 设置借款人省份名称
     *
     * @param jkrsfmc
     *          借款人省份名称
     */
    public void setJkrsfmc(String jkrsfmc) {
        this.jkrsfmc = jkrsfmc;
    }

    /**
     * 获取借款人城市名称
     *
     * @return 借款人城市名称
     */
    public String getJkrcsmc() {
        return this.jkrcsmc;
    }

    /**
     * 设置借款人城市名称
     *
     * @param jkrcsmc
     *          借款人城市名称
     */
    public void setJkrcsmc(String jkrcsmc) {
        this.jkrcsmc = jkrcsmc;
    }

    /**
     * 获取借款人县区名称
     *
     * @return 借款人县区名称
     */
    public String getJkrxqmc() {
        return this.jkrxqmc;
    }

    /**
     * 设置借款人县区名称
     *
     * @param jkrxqmc
     *          借款人县区名称
     */
    public void setJkrxqmc(String jkrxqmc) {
        this.jkrxqmc = jkrxqmc;
    }

    /**
     * 获取借款人路／街名称
     *
     * @return 借款人路／街名称
     */
    public String getJkrljmc() {
        return this.jkrljmc;
    }

    /**
     * 设置借款人路／街名称
     *
     * @param jkrljmc
     *          借款人路／街名称
     */
    public void setJkrljmc(String jkrljmc) {
        this.jkrljmc = jkrljmc;
    }

    /**
     * 获取借款人小区／楼名称
     *
     * @return 借款人小区／楼名称
     */
    public String getJkrqlmc() {
        return this.jkrqlmc;
    }

    /**
     * 设置借款人小区／楼名称
     *
     * @param jkrqlmc
     *          借款人小区／楼名称
     */
    public void setJkrqlmc(String jkrqlmc) {
        this.jkrqlmc = jkrqlmc;
    }

    /**
     * 获取借款人楼号
     *
     * @return 借款人楼号
     */
    public String getJkrlh() {
        return this.jkrlh;
    }

    /**
     * 设置借款人楼号
     *
     * @param jkrlh
     *          借款人楼号
     */
    public void setJkrlh(String jkrlh) {
        this.jkrlh = jkrlh;
    }

    /**
     * 获取借款人楼单元号
     *
     * @return 借款人楼单元号
     */
    public String getJkrldy() {
        return this.jkrldy;
    }

    /**
     * 设置借款人楼单元号
     *
     * @param jkrldy
     *          借款人楼单元号
     */
    public void setJkrldy(String jkrldy) {
        this.jkrldy = jkrldy;
    }

    /**
     * 获取借款人室号
     *
     * @return 借款人室号
     */
    public String getJkrsh() {
        return this.jkrsh;
    }

    /**
     * 设置借款人室号
     *
     * @param jkrsh
     *          借款人室号
     */
    public void setJkrsh(String jkrsh) {
        this.jkrsh = jkrsh;
    }

    /**
     * 获取借款人职务
     *
     * @return 借款人职务
     */
    public String getJkrzw() {
        return this.jkrzw;
    }

    /**
     * 设置借款人职务
     *
     * @param jkrzw
     *          借款人职务
     */
    public void setJkrzw(String jkrzw) {
        this.jkrzw = jkrzw;
    }

    /**
     * 获取企业名称
     *
     * @return 企业名称
     */
    public String getQymc() {
        return this.qymc;
    }

    /**
     * 设置企业名称
     *
     * @param qymc
     *          企业名称
     */
    public void setQymc(String qymc) {
        this.qymc = qymc;
    }

    /**
     * 获取企业性质　１股份２私营３外资４有限公司５其他
     *
     * @return 企业性质　１股份２私营３外资４有限公司５其他
     */
    public Integer getQyxz() {
        return this.qyxz;
    }

    /**
     * 设置企业性质　１股份２私营３外资４有限公司５其他
     *
     * @param qyxz
     *          企业性质　１股份２私营３外资４有限公司５其他
     */
    public void setQyxz(Integer qyxz) {
        this.qyxz = qyxz;
    }

    /**
     * 获取纳税人识别号
     *
     * @return 纳税人识别号
     */
    public String getNsrsbh() {
        return this.nsrsbh;
    }

    /**
     * 设置纳税人识别号
     *
     * @param nsrsbh
     *          纳税人识别号
     */
    public void setNsrsbh(String nsrsbh) {
        this.nsrsbh = nsrsbh;
    }

    /**
     * 获取经营行业DM
     *
     * @return 经营行业DM
     */
    public String getJyhyDm() {
        return this.jyhyDm;
    }

    /**
     * 设置经营行业DM
     *
     * @param jyhyDm
     *          经营行业DM
     */
    public void setJyhyDm(String jyhyDm) {
        this.jyhyDm = jyhyDm;
    }

    /**
     * 获取经营行业MC
     *
     * @return 经营行业MC
     */
    public String getJyhyMc() {
        return this.jyhyMc;
    }

    /**
     * 设置经营行业MC
     *
     * @param jyhyMc
     *          经营行业MC
     */
    public void setJyhyMc(String jyhyMc) {
        this.jyhyMc = jyhyMc;
    }

    /**
     * 获取成立时间
     *
     * @return 成立时间
     */
    public Date getClsj() {
        return this.clsj;
    }

    /**
     * 设置成立时间
     *
     * @param clsj
     *          成立时间
     */
    public void setClsj(Date clsj) {
        this.clsj = clsj;
    }

    /**
     * 获取企业人数
     *
     * @return 企业人数
     */
    public Integer getQyrs() {
        return this.qyrs;
    }

    /**
     * 设置企业人数
     *
     * @param qyrs
     *          企业人数
     */
    public void setQyrs(Integer qyrs) {
        this.qyrs = qyrs;
    }

    /**
     * 获取企业固话
     *
     * @return 企业固话
     */
    public String getQygh() {
        return this.qygh;
    }

    /**
     * 设置企业固话
     *
     * @param qygh
     *          企业固话
     */
    public void setQygh(String qygh) {
        this.qygh = qygh;
    }

    /**
     * 获取企业地址
     *
     * @return 企业地址
     */
    public String getQydz() {
        return this.qydz;
    }

    /**
     * 设置企业地址
     *
     * @param qydz
     *          企业地址
     */
    public void setQydz(String qydz) {
        this.qydz = qydz;
    }

    /**
     * 获取基本开户行
     *
     * @return 基本开户行
     */
    public String getJbkhh() {
        return this.jbkhh;
    }

    /**
     * 设置基本开户行
     *
     * @param jbkhh
     *          基本开户行
     */
    public void setJbkhh(String jbkhh) {
        this.jbkhh = jbkhh;
    }

    /**
     * 获取企业登记注册类型名称
     *
     * @return 企业登记注册类型名称
     */
    public String getQydjzclxmc() {
        return this.qydjzclxmc;
    }

    /**
     * 设置企业登记注册类型名称
     *
     * @param qydjzclxmc
     *          企业登记注册类型名称
     */
    public void setQydjzclxmc(String qydjzclxmc) {
        this.qydjzclxmc = qydjzclxmc;
    }

    /**
     * 获取企业登记注册类型代码
     *
     * @return 企业登记注册类型代码
     */
    public String getQydjzclxdm() {
        return this.qydjzclxdm;
    }

    /**
     * 设置企业登记注册类型代码
     *
     * @param qydjzclxdm
     *          企业登记注册类型代码
     */
    public void setQydjzclxdm(String qydjzclxdm) {
        this.qydjzclxdm = qydjzclxdm;
    }

    /**
     * 获取增值税纳税人类型名称　１一般纳税人　２小规模纳税人
     *
     * @return 增值税纳税人类型名称　１一般纳税人　２小规模纳税人
     */
    public String getZzsnsrlxmc() {
        return this.zzsnsrlxmc;
    }

    /**
     * 设置增值税纳税人类型名称　１一般纳税人　２小规模纳税人
     *
     * @param zzsnsrlxmc
     *          增值税纳税人类型名称　１一般纳税人　２小规模纳税人
     */
    public void setZzsnsrlxmc(String zzsnsrlxmc) {
        this.zzsnsrlxmc = zzsnsrlxmc;
    }

    /**
     * 获取增值税纳税人类型代码　１一般纳税人　２小规模纳税人
     *
     * @return 增值税纳税人类型代码　１一般纳税人　２小规模纳税人
     */
    public Integer getZzsnsrlxdm() {
        return this.zzsnsrlxdm;
    }

    /**
     * 设置增值税纳税人类型代码　１一般纳税人　２小规模纳税人
     *
     * @param zzsnsrlxdm
     *          增值税纳税人类型代码　１一般纳税人　２小规模纳税人
     */
    public void setZzsnsrlxdm(Integer zzsnsrlxdm) {
        this.zzsnsrlxdm = zzsnsrlxdm;
    }

    /**
     * 获取去年开票金额
     *
     * @return 去年开票金额
     */
    public BigDecimal getSnkpje() {
        return this.snkpje;
    }

    /**
     * 设置去年开票金额
     *
     * @param snkpje
     *          去年开票金额
     */
    public void setSnkpje(BigDecimal snkpje) {
        this.snkpje = snkpje;
    }

    /**
     * 获取前年开票金额
     *
     * @return 前年开票金额
     */
    public BigDecimal getQnkpje() {
        return this.qnkpje;
    }

    /**
     * 设置前年开票金额
     *
     * @param qnkpje
     *          前年开票金额
     */
    public void setQnkpje(BigDecimal qnkpje) {
        this.qnkpje = qnkpje;
    }

    /**
     * 获取审批人代码初审
     *
     * @return 审批人代码初审
     */
    public String getSprdmCs() {
        return this.sprdmCs;
    }

    /**
     * 设置审批人代码初审
     *
     * @param sprdmCs
     *          审批人代码初审
     */
    public void setSprdmCs(String sprdmCs) {
        this.sprdmCs = sprdmCs;
    }

    /**
     * 获取审批人名称初审
     *
     * @return 审批人名称初审
     */
    public String getSprmcCs() {
        return this.sprmcCs;
    }

    /**
     * 设置审批人名称初审
     *
     * @param sprmcCs
     *          审批人名称初审
     */
    public void setSprmcCs(String sprmcCs) {
        this.sprmcCs = sprmcCs;
    }

    /**
     * 获取审批类型初审0未审批1同意2不同意
     *
     * @return 审批类型初审0未审批1同意2不同意
     */
    public Integer getSplxCs() {
        return this.splxCs;
    }

    /**
     * 设置审批类型初审0未审批1同意2不同意
     *
     * @param splxCs
     *          审批类型初审0未审批1同意2不同意
     */
    public void setSplxCs(Integer splxCs) {
        this.splxCs = splxCs;
    }

    /**
     * 获取审批意见初审
     *
     * @return 审批意见初审
     */
    public String getSpyjCs() {
        return this.spyjCs;
    }

    /**
     * 设置审批意见初审
     *
     * @param spyjCs
     *          审批意见初审
     */
    public void setSpyjCs(String spyjCs) {
        this.spyjCs = spyjCs;
    }

    /**
     * 获取审批时间初审
     *
     * @return 审批时间初审
     */
    public Date getSpsjCs() {
        return this.spsjCs;
    }

    /**
     * 设置审批时间初审
     *
     * @param spsjCs
     *          审批时间初审
     */
    public void setSpsjCs(Date spsjCs) {
        this.spsjCs = spsjCs;
    }

    /**
     * 获取审批人代码终审
     *
     * @return 审批人代码终审
     */
    public String getSprdmZs() {
        return this.sprdmZs;
    }

    /**
     * 设置审批人代码终审
     *
     * @param sprdmZs
     *          审批人代码终审
     */
    public void setSprdmZs(String sprdmZs) {
        this.sprdmZs = sprdmZs;
    }

    /**
     * 获取审批人名称终审
     *
     * @return 审批人名称终审
     */
    public String getSprmcZs() {
        return this.sprmcZs;
    }

    /**
     * 设置审批人名称终审
     *
     * @param sprmcZs
     *          审批人名称终审
     */
    public void setSprmcZs(String sprmcZs) {
        this.sprmcZs = sprmcZs;
    }

    /**
     * 获取审批类型终审0未审批1同意2不同意
     *
     * @return 审批类型终审0未审批1同意2不同意
     */
    public Integer getSplxZs() {
        return this.splxZs;
    }

    /**
     * 设置审批类型终审0未审批1同意2不同意
     *
     * @param splxZs
     *          审批类型终审0未审批1同意2不同意
     */
    public void setSplxZs(Integer splxZs) {
        this.splxZs = splxZs;
    }

    /**
     * 获取审批意见终审
     *
     * @return 审批意见终审
     */
    public String getSpyjZs() {
        return this.spyjZs;
    }

    /**
     * 设置审批意见终审
     *
     * @param spyjZs
     *          审批意见终审
     */
    public void setSpyjZs(String spyjZs) {
        this.spyjZs = spyjZs;
    }

    /**
     * 获取审批时间终审
     *
     * @return 审批时间终审
     */
    public Date getSpsjZs() {
        return this.spsjZs;
    }

    /**
     * 设置审批时间终审
     *
     * @param spsjZs
     *          审批时间终审
     */
    public void setSpsjZs(Date spsjZs) {
        this.spsjZs = spsjZs;
    }

    /**
     * 获取删除标志1：已删除、0：未删除
     *
     * @return 删除标志1
     */
    public Integer getScbz() {
        return this.scbz;
    }

    /**
     * 设置删除标志1：已删除、0：未删除
     *
     * @param scbz
     *          删除标志1：已删除、0：未删除
     */
    public void setScbz(Integer scbz) {
        this.scbz = scbz;
    }

    /**
     * 获取录入人员
     *
     * @return 录入人员
     */
    public String getLrry() {
        return this.lrry;
    }

    /**
     * 设置录入人员
     *
     * @param lrry
     *          录入人员
     */
    public void setLrry(String lrry) {
        this.lrry = lrry;
    }

    /**
     * 获取更新人员
     *
     * @return 更新人员
     */
    public String getGxry() {
        return this.gxry;
    }

    /**
     * 设置更新人员
     *
     * @param gxry
     *          更新人员
     */
    public void setGxry(String gxry) {
        this.gxry = gxry;
    }

    /**
     * 获取删除人员
     *
     * @return 删除人员
     */
    public String getScry() {
        return this.scry;
    }

    /**
     * 设置删除人员
     *
     * @param scry
     *          删除人员
     */
    public void setScry(String scry) {
        this.scry = scry;
    }

    /**
     * 获取录入日期
     *
     * @return 录入日期
     */
    public Date getLrrq() {
        return this.lrrq;
    }

    /**
     * 设置录入日期
     *
     * @param lrrq
     *          录入日期
     */
    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    /**
     * 获取更新日期
     *
     * @return 更新日期
     */
    public Date getGxrq() {
        return this.gxrq;
    }

    /**
     * 设置更新日期
     *
     * @param gxrq
     *          更新日期
     */
    public void setGxrq(Date gxrq) {
        this.gxrq = gxrq;
    }

    /**
     * 获取删除日期
     *
     * @return 删除日期
     */
    public Date getScrq() {
        return this.scrq;
    }

    /**
     * 设置删除日期
     *
     * @param scrq
     *          删除日期
     */
    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }
}