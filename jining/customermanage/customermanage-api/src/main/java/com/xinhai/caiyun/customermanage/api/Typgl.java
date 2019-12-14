package com.xinhai.caiyun.customermanage.api;

import java.util.Date;
import java.util.List;
import java.math.BigDecimal;

import org.springframework.format.annotation.DateTimeFormat;

/**
 * 样品管理基本信息
 * @create limaofei
 * @time 2018年5月5日
 */
public class Typgl {

    private long id;

    /**
     * 委托id
     */
    private String wtid;

    /**
     * 样品ID
     */
    private long ypid;

    private String wbjg;

    private String wbjgsl;
    /**
     * 接收状态000待接收 001已接收
     */
    private String jszt;


    private String jcks;

    /**
     * 生物检测科数量
     */
    private String ks1;

    /**
     * 食品检验数量
     */
    private String ks2;
    /**
     * 样品制备状态000  未确认  001 未接收  002已接收
     */
    private String ypzbzt;

    /**
     * 抽样单编号
     */
    private String cydbh;

    /**
     *样品编码
     */
    private String ypbm;

    /**
     * 样品名称
     */
    private String ypmc;

    /**
     * 商标
     */
    private String sb;

    /**
     * 规格型号
     */
    private String ggxh;

    /**
     * 样品等级
     */
    private String ypdj;

    /**
     * 样品数量
     */
    private String ypsl;

    /**
     * 样品单位
     */
    private String ypdw;

    /**
     * 生产日期
     */
    private String scrq;

    /**
     * 样品批号或原编号
     */
    private String ypphhbh;

    /**
     * 样品状态
     */
    private String ypzt;

    /**
     * 样品保存条件  001常温  002避光  003干燥  004冷藏  005冷冻  006其他
     */
    private String ypbctj;

    /**
     * 生产单位
     */
    private String scdw;

    /**
     * 生产单位联系电话
     */
    private String scdwlxdh;

    /**
     * 封样人员
     */
    private String fyry;

    /**
     * 封样状态
     */
    private String fyzt;

    /**
     * 样品到达日期
     */
    private String ypddrq;

    /**
     * 是否蔬果肉  1是0否
     */
    private String if_sgr;

    /**
     * 是否食水工  1是0否
     */
    private String if_ssg;

    /**
     * 样本基数
     */
    private String ybjs;

    /**
     * 保质期
     */
    private String bzq;

    /**
     * 是否抽样
     */
    private String if_cy;

    /**
     * 样品退还
     */
    private String if_th;

    /**
     * 样品物态
     */
    private String ypwt;

    private String cydd;

    /**
     * 是否备样
     */
    private String if_by;

    /**
     * 备样数量
     */
    private String bysl;

    /**
     * 备样管理人员
     */
    private String byglry;

    /**
     * 样品来源
     */
    private String yplaiyuan;

    /**
     * 样品属性
     */
    private String ypshuxing;

    /**
     * 样品类型
     */
    private String ypleixin;

    /**
     * 执行标准
     */
    private String ypzxbz;

    /**
     * 生产许可编号
     */
    private String scxkbh;

    /**
     * 单价
     */
    private String ypdanjia;

    /**
     * 是否出口
     */
    private String if_ck;

    /**
     * 包装分类
     */
    private String ypbgfl;

    /**
     * 抽样样品包装
     */
    private String cyypbz;

    /**
     * 抽样方式
     */
    private String cyfangshi;

    /**
     * 生产者地址
     */
    private String scdz;

    /**
     * 录入人员
     */
    private String lrry;

    /**
     * 数据录入日期
     */
    private String lrrq;

    /**
     * 备注
     */
    private String bzxx;

    /**
     * 封条编号
     */
    private String ftbh;

    /**
     * 样品来源
     */
    private String qyyply;

    /**
     * 样品保存条件其他
     */
    private String ccyqqt;

    /**
     * 抽样方式
     */
    private String wtcyfs;

    /**
     * 样品来源其他
     */
    private String yplaiyuanqt;

    /**
     * 抽样样品包装其他
     */
    private String cyypbzqt;

    /**
     * 样品类型其他
     */
    private String ypleixinqt;

    /**
     * 样品形态
     */
    private String ypxt;

    /**
     * 生产/加工/购进日期
     */
    private String rqlxxz;

    private String rkrq;

    public long getYpid() {
        return ypid;
    }

    public void setYpid(long ypid) {
        this.ypid = ypid;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getWtid() {
        return wtid;
    }

    public void setWtid(String wtid) {
        this.wtid = wtid;
    }

    public String getJszt() {
        return jszt;
    }

    public void setJszt(String jszt) {
        this.jszt = jszt;
    }

    public String getYpzbzt() {
        return ypzbzt;
    }

    public void setYpzbzt(String ypzbzt) {
        this.ypzbzt = ypzbzt;
    }

    public String getCydbh() {
        return cydbh;
    }

    public void setCydbh(String cydbh) {
        this.cydbh = cydbh;
    }

    public String getYpbm() {
        return ypbm;
    }

    public void setYpbm(String ypbm) {
        this.ypbm = ypbm;
    }

    public String getYpmc() {
        return ypmc;
    }

    public void setYpmc(String ypmc) {
        this.ypmc = ypmc;
    }

    public String getSb() {
        return sb;
    }

    public void setSb(String sb) {
        this.sb = sb;
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

    public String getYpsl() {
        return ypsl;
    }

    public void setYpsl(String ypsl) {
        this.ypsl = ypsl;
    }

    public String getYpdw() {
        return ypdw;
    }

    public void setYpdw(String ypdw) {
        this.ypdw = ypdw;
    }

    public String getScrq() {
        return scrq;
    }

    public void setScrq(String scrq) {
        this.scrq = scrq;
    }

    public String getYpphhbh() {
        return ypphhbh;
    }

    public void setYpphhbh(String ypphhbh) {
        this.ypphhbh = ypphhbh;
    }

    public String getYpzt() {
        return ypzt;
    }

    public void setYpzt(String ypzt) {
        this.ypzt = ypzt;
    }

    public String getYpbctj() {
        return ypbctj;
    }

    public void setYpbctj(String ypbctj) {
        this.ypbctj = ypbctj;
    }

    public String getScdw() {
        return scdw;
    }

    public void setScdw(String scdw) {
        this.scdw = scdw;
    }

    public String getScdwlxdh() {
        return scdwlxdh;
    }

    public void setScdwlxdh(String scdwlxdh) {
        this.scdwlxdh = scdwlxdh;
    }

    public String getFyry() {
        return fyry;
    }

    public void setFyry(String fyry) {
        this.fyry = fyry;
    }

    public String getFyzt() {
        return fyzt;
    }

    public void setFyzt(String fyzt) {
        this.fyzt = fyzt;
    }

    public String getYpddrq() {
        return ypddrq;
    }

    public void setYpddrq(String ypddrq) {
        this.ypddrq = ypddrq;
    }

    public String getIf_sgr() {
        return if_sgr;
    }

    public void setIf_sgr(String if_sgr) {
        this.if_sgr = if_sgr;
    }

    public String getIf_ssg() {
        return if_ssg;
    }

    public void setIf_ssg(String if_ssg) {
        this.if_ssg = if_ssg;
    }

    public String getYbjs() {
        return ybjs;
    }

    public void setYbjs(String ybjs) {
        this.ybjs = ybjs;
    }

    public String getBzq() {
        return bzq;
    }

    public void setBzq(String bzq) {
        this.bzq = bzq;
    }

    public String getYpwt() {
        return ypwt;
    }

    public void setYpwt(String ypwt) {
        this.ypwt = ypwt;
    }

    public String getIf_cy() {
        return if_cy;
    }

    public void setIf_cy(String if_cy) {
        this.if_cy = if_cy;
    }

    public String getIf_th() {
        return if_th;
    }

    public void setIf_th(String if_th) {
        this.if_th = if_th;
    }

    public String getKs1() {
        return ks1;
    }

    public void setKs1(String ks1) {
        this.ks1 = ks1;
    }

    public String getKs2() {
        return ks2;
    }

    public void setKs2(String ks2) {
        this.ks2 = ks2;
    }

    public String getJcks() {
        return jcks;
    }

    public void setJcks(String jcks) {
        this.jcks = jcks;
    }

    public String getWbjg() {
        return wbjg;
    }

    public void setWbjg(String wbjg) {
        this.wbjg = wbjg;
    }

    public String getWbjgsl() {
        return wbjgsl;
    }

    public void setWbjgsl(String wbjgsl) {
        this.wbjgsl = wbjgsl;
    }

    public String getCydd() {
        return cydd;
    }

    public void setCydd(String cydd) {
        this.cydd = cydd;
    }

    public String getIf_by() {
        return if_by;
    }

    public void setIf_by(String if_by) {
        this.if_by = if_by;
    }

    public String getBysl() {
        return bysl;
    }

    public void setBysl(String bysl) {
        this.bysl = bysl;
    }

    public String getByglry() {
        return byglry;
    }

    public void setByglry(String byglry) {
        this.byglry = byglry;
    }

    public String getYplaiyuan() {
        return yplaiyuan;
    }

    public void setYplaiyuan(String yplaiyuan) {
        this.yplaiyuan = yplaiyuan;
    }

    public String getYpshuxing() {
        return ypshuxing;
    }

    public void setYpshuxing(String ypshuxing) {
        this.ypshuxing = ypshuxing;
    }

    public String getYpleixin() {
        return ypleixin;
    }

    public void setYpleixin(String ypleixin) {
        this.ypleixin = ypleixin;
    }

    public String getYpzxbz() {
        return ypzxbz;
    }

    public void setYpzxbz(String ypzxbz) {
        this.ypzxbz = ypzxbz;
    }

    public String getScxkbh() {
        return scxkbh;
    }

    public void setScxkbh(String scxkbh) {
        this.scxkbh = scxkbh;
    }

    public String getYpdanjia() {
        return ypdanjia;
    }

    public void setYpdanjia(String ypdanjia) {
        this.ypdanjia = ypdanjia;
    }

    public String getIf_ck() {
        return if_ck;
    }

    public void setIf_ck(String if_ck) {
        this.if_ck = if_ck;
    }

    public String getYpbgfl() {
        return ypbgfl;
    }

    public void setYpbgfl(String ypbgfl) {
        this.ypbgfl = ypbgfl;
    }

    public String getCyypbz() {
        return cyypbz;
    }

    public void setCyypbz(String cyypbz) {
        this.cyypbz = cyypbz;
    }

    public String getCyfangshi() {
        return cyfangshi;
    }

    public void setCyfangshi(String cyfangshi) {
        this.cyfangshi = cyfangshi;
    }

    public String getScdz() {
        return scdz;
    }

    public void setScdz(String scdz) {
        this.scdz = scdz;
    }

    public String getLrry() {
        return lrry;
    }

    public void setLrry(String lrry) {
        this.lrry = lrry;
    }

    public String getLrrq() {
        return lrrq;
    }

    public void setLrrq(String lrrq) {
        this.lrrq = lrrq;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    public String getFtbh() {
        return ftbh;
    }

    public void setFtbh(String ftbh) {
        this.ftbh = ftbh;
    }

    public String getQyyply() {
        return qyyply;
    }

    public void setQyyply(String qyyply) {
        this.qyyply = qyyply;
    }

    public String getCcyqqt() {
        return ccyqqt;
    }

    public void setCcyqqt(String ccyqqt) {
        this.ccyqqt = ccyqqt;
    }

    public String getWtcyfs() {
        return wtcyfs;
    }

    public void setWtcyfs(String wtcyfs) {
        this.wtcyfs = wtcyfs;
    }

    public String getYplaiyuanqt() {
        return yplaiyuanqt;
    }

    public void setYplaiyuanqt(String yplaiyuanqt) {
        this.yplaiyuanqt = yplaiyuanqt;
    }

    public String getCyypbzqt() {
        return cyypbzqt;
    }

    public void setCyypbzqt(String cyypbzqt) {
        this.cyypbzqt = cyypbzqt;
    }

    public String getYpleixinqt() {
        return ypleixinqt;
    }

    public void setYpleixinqt(String ypleixinqt) {
        this.ypleixinqt = ypleixinqt;
    }

    public String getYpxt() {
        return ypxt;
    }

    public void setYpxt(String ypxt) {
        this.ypxt = ypxt;
    }

    public String getRqlxxz() {
        return rqlxxz;
    }

    public void setRqlxxz(String rqlxxz) {
        this.rqlxxz = rqlxxz;
    }

    public String getRkrq() {
        return rkrq;
    }

    public void setRkrq(String rkrq) {
        this.rkrq = rkrq;
    }
}
