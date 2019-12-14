package com.xinhai.caiyun.bean;
/*
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

import java.math.BigDecimal;
import java.util.Date;

/**
 * 客户订单信息表(PT_KH_DDXX)
 * 
 * @author bianj
 * @version 1.0.0 2017-11-13
 */
public class PtKhDdxx implements java.io.Serializable {
    /** 版本号 */
    private static final long serialVersionUID = 8365959746217360576L;
    
    /** ID，自增列 */
    private Long id;
    
    /** 订单号20171012092415652（年月日时分秒+3位随机数） */
    private String ddbh;
    
    /** 支付宝交易号 */
    private String tradeNo;
    
    /** 订单名称 */
    private String ddmc;
    
    /** 代理机构编码 */
    private String dljgBm;
    
    /** 部门代码 */
    private String bmdm;
    
    /** 客户编码 */
    private String khbm;
    
    /** 公司名称 */
    private String gsmc;
    
    /** 套餐价格 */
    private BigDecimal tcjg;
    
    /** 实际缴费金额 */
    private BigDecimal jfje;
    
    /** 订单状态（1已付，0未付） */
    private Byte[] ddzt;
    
    /** 缴费类型（001支付宝，002微信，003其他） */
    private String jflx;
    
    /** 费用类型（001正常，002垫付） */
    private String fylx;
    
    /** 收费项目（001产品一，002产品二 */
    private String sfxm;
    
    /** 套餐类型（001月，002季，003半年，004一年） */
    private String tclx;
    
    /** 产品描述 */
    private String ddxq;
    
    /** 签名 */
    private String sign;
    
    /** 付款人姓名 */
    private String fkry;
    
    /** 付款人电话 */
    private String fkrdh;
    
    /** 删除标志 */
    private Byte[] scbz;
    
    /** 删除人员 */
    private String scry;
    
    /** 删除时间 */
    private Date scsj;
    
    /** 订单提交时间 */
    private Date tjsj;
    
    /** 订单付款时间 */
    private Date fksj;
    
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
     * 获取订单号20171012092415652（年月日时分秒+3位随机数）
     * 
     * @return 订单号20171012092415652（年月日时分秒+3位随机数）
     */
    public String getDdbh() {
        return this.ddbh;
    }
     
    /**
     * 设置订单号20171012092415652（年月日时分秒+3位随机数）
     * 
     * @param ddbh
     *          订单号20171012092415652（年月日时分秒+3位随机数）
     */
    public void setDdbh(String ddbh) {
        this.ddbh = ddbh;
    }
    
    /**
     * 获取支付宝交易号
     * 
     * @return 支付宝交易号
     */
    public String getTradeNo() {
        return this.tradeNo;
    }
     
    /**
     * 设置支付宝交易号
     * 
     * @param tradeNo
     *          支付宝交易号
     */
    public void setTradeNo(String tradeNo) {
        this.tradeNo = tradeNo;
    }
    
    /**
     * 获取订单名称
     * 
     * @return 订单名称
     */
    public String getDdmc() {
        return this.ddmc;
    }
     
    /**
     * 设置订单名称
     * 
     * @param ddmc
     *          订单名称
     */
    public void setDdmc(String ddmc) {
        this.ddmc = ddmc;
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
     * 获取部门代码
     * 
     * @return 部门代码
     */
    public String getBmdm() {
        return this.bmdm;
    }
     
    /**
     * 设置部门代码
     * 
     * @param bmdm
     *          部门代码
     */
    public void setBmdm(String bmdm) {
        this.bmdm = bmdm;
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
     * 获取公司名称
     * 
     * @return 公司名称
     */
    public String getGsmc() {
        return this.gsmc;
    }
     
    /**
     * 设置公司名称
     * 
     * @param gsmc
     *          公司名称
     */
    public void setGsmc(String gsmc) {
        this.gsmc = gsmc;
    }
    
    /**
     * 获取套餐价格
     * 
     * @return 套餐价格
     */
    public BigDecimal getTcjg() {
        return this.tcjg;
    }
     
    /**
     * 设置套餐价格
     * 
     * @param tcjg
     *          套餐价格
     */
    public void setTcjg(BigDecimal tcjg) {
        this.tcjg = tcjg;
    }
    
    /**
     * 获取实际缴费金额
     * 
     * @return 实际缴费金额
     */
    public BigDecimal getJfje() {
        return this.jfje;
    }
     
    /**
     * 设置实际缴费金额
     * 
     * @param jfje
     *          实际缴费金额
     */
    public void setJfje(BigDecimal jfje) {
        this.jfje = jfje;
    }
    
    /**
     * 获取订单状态（1已付，0未付）
     * 
     * @return 订单状态（1已付
     */
    public Byte[] getDdzt() {
        return this.ddzt;
    }
     
    /**
     * 设置订单状态（1已付，0未付）
     * 
     * @param ddzt
     *          订单状态（1已付，0未付）
     */
    public void setDdzt(Byte[] ddzt) {
        this.ddzt = ddzt;
    }
    
    /**
     * 获取缴费类型（001支付宝，002微信，003其他）
     * 
     * @return 缴费类型（001支付宝
     */
    public String getJflx() {
        return this.jflx;
    }
     
    /**
     * 设置缴费类型（001支付宝，002微信，003其他）
     * 
     * @param jflx
     *          缴费类型（001支付宝，002微信，003其他）
     */
    public void setJflx(String jflx) {
        this.jflx = jflx;
    }
    
    /**
     * 获取费用类型（001正常，002垫付）
     * 
     * @return 费用类型（001正常
     */
    public String getFylx() {
        return this.fylx;
    }
     
    /**
     * 设置费用类型（001正常，002垫付）
     * 
     * @param fylx
     *          费用类型（001正常，002垫付）
     */
    public void setFylx(String fylx) {
        this.fylx = fylx;
    }
    
    /**
     * 获取收费项目（001产品一，002产品二
     * 
     * @return 收费项目（001产品一
     */
    public String getSfxm() {
        return this.sfxm;
    }
     
    /**
     * 设置收费项目（001产品一，002产品二
     * 
     * @param sfxm
     *          收费项目（001产品一，002产品二
     */
    public void setSfxm(String sfxm) {
        this.sfxm = sfxm;
    }
    
    /**
     * 获取套餐类型（001月，002季，003半年，004一年）
     * 
     * @return 套餐类型（001月
     */
    public String getTclx() {
        return this.tclx;
    }
     
    /**
     * 设置套餐类型（001月，002季，003半年，004一年）
     * 
     * @param tclx
     *          套餐类型（001月，002季，003半年，004一年）
     */
    public void setTclx(String tclx) {
        this.tclx = tclx;
    }
    
    /**
     * 获取产品描述
     * 
     * @return 产品描述
     */
    public String getDdxq() {
        return this.ddxq;
    }
     
    /**
     * 设置产品描述
     * 
     * @param ddxq
     *          产品描述
     */
    public void setDdxq(String ddxq) {
        this.ddxq = ddxq;
    }
    
    /**
     * 获取签名
     * 
     * @return 签名
     */
    public String getSign() {
        return this.sign;
    }
     
    /**
     * 设置签名
     * 
     * @param sign
     *          签名
     */
    public void setSign(String sign) {
        this.sign = sign;
    }
    
    /**
     * 获取付款人姓名
     * 
     * @return 付款人姓名
     */
    public String getFkry() {
        return this.fkry;
    }
     
    /**
     * 设置付款人姓名
     * 
     * @param fkry
     *          付款人姓名
     */
    public void setFkry(String fkry) {
        this.fkry = fkry;
    }
    
    /**
     * 获取付款人电话
     * 
     * @return 付款人电话
     */
    public String getFkrdh() {
        return this.fkrdh;
    }
     
    /**
     * 设置付款人电话
     * 
     * @param fkrdh
     *          付款人电话
     */
    public void setFkrdh(String fkrdh) {
        this.fkrdh = fkrdh;
    }
    
    /**
     * 获取删除标志
     * 
     * @return 删除标志
     */
    public Byte[] getScbz() {
        return this.scbz;
    }
     
    /**
     * 设置删除标志
     * 
     * @param scbz
     *          删除标志
     */
    public void setScbz(Byte[] scbz) {
        this.scbz = scbz;
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
     * 获取删除时间
     * 
     * @return 删除时间
     */
    public Date getScsj() {
        return this.scsj;
    }
     
    /**
     * 设置删除时间
     * 
     * @param scsj
     *          删除时间
     */
    public void setScsj(Date scsj) {
        this.scsj = scsj;
    }
    
    /**
     * 获取订单提交时间
     * 
     * @return 订单提交时间
     */
    public Date getTjsj() {
        return this.tjsj;
    }
     
    /**
     * 设置订单提交时间
     * 
     * @param tjsj
     *          订单提交时间
     */
    public void setTjsj(Date tjsj) {
        this.tjsj = tjsj;
    }
    
    /**
     * 获取订单付款时间
     * 
     * @return 订单付款时间
     */
    public Date getFksj() {
        return this.fksj;
    }
     
    /**
     * 设置订单付款时间
     * 
     * @param fksj
     *          订单付款时间
     */
    public void setFksj(Date fksj) {
        this.fksj = fksj;
    }
}