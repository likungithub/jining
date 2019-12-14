package com.xinhai.caiyun.customermanage.api;

/**
 * 抽样单基本信息
 */
public class Tzfwt {
  /**
   * 自增ID
   */
  private Long id;

  /**
   * 委托ID
   */
  private String wtid;

  /**
   *抽样单编号
   */
  private String cydbh;

  /**
   * 受检单位
   */
  private String sjdw;


  /**
   * 受检单位联系人
   */
  private String sjdwlxr;


  /**
   * 受检单位联系电话
   */
  private String sjdwlxdh;


  /**
   * 受检单位详细地址
   */
  private String sjdwxxdz;


  /**
   * 抽样单位
   */
  private String cydw;


  /**
   * 抽样单位联系人
   */
  private String cydwlxr;


  /**
   * 抽样单位联系电话
   */
  private String cydwlxdh;


  /**
   * 抽样单位详细地址
   */
  private String cydwxxdz;


  /**
   * 任务来源
   */
  private String rwly;


  /**
   * 抽样日期
   */
  private String cyrq;


  /**
   * 抽样人员
   */
  private String cyry;


  /**
   * 抽样基数
   */
  private String cyjs;


  /**
   * 抽样地点
   */
  private String cydd;


  /**
   * 抽样类别
   */
  private String cylb;


  /**
   * 抽样方式
   */
  private String cyfs;

  /**
   * 抽样地点所属环节
   */
  private String cyddsshj;

  /**
   * 执行标准
   */
  private String zxbz;

  /**
   * 查询状态
   */
  private String cxzt;

  /**
   * 接收状态000待接收 001已接收
   */
  private String jszt;

  /**
   * 样品制备状态000  未确认  001 未接收  002已接收
   */
  private String ypzbzt;

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
   * 样品物态
   */
  private String ypwt;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getWtid() {
    return wtid;
  }

  public void setWtid(String wtid) {
    this.wtid = wtid;
  }

  public String getCydbh() {
    return cydbh;
  }

  public void setCydbh(String cydbh) {
    this.cydbh = cydbh;
  }

  public String getSjdw() {
    return sjdw;
  }

  public void setSjdw(String sjdw) {
    this.sjdw = sjdw;
  }

  public String getSjdwlxr() {
    return sjdwlxr;
  }

  public void setSjdwlxr(String sjdwlxr) {
    this.sjdwlxr = sjdwlxr;
  }

  public String getSjdwlxdh() {
    return sjdwlxdh;
  }

  public void setSjdwlxdh(String sjdwlxdh) {
    this.sjdwlxdh = sjdwlxdh;
  }

  public String getSjdwxxdz() {
    return sjdwxxdz;
  }

  public void setSjdwxxdz(String sjdwxxdz) {
    this.sjdwxxdz = sjdwxxdz;
  }

  public String getCydw() {
    return cydw;
  }

  public void setCydw(String cydw) {
    this.cydw = cydw;
  }

  public String getCydwlxr() {
    return cydwlxr;
  }

  public void setCydwlxr(String cydwlxr) {
    this.cydwlxr = cydwlxr;
  }

  public String getCydwlxdh() {
    return cydwlxdh;
  }

  public void setCydwlxdh(String cydwlxdh) {
    this.cydwlxdh = cydwlxdh;
  }

  public String getCydwxxdz() {
    return cydwxxdz;
  }

  public void setCydwxxdz(String cydwxxdz) {
    this.cydwxxdz = cydwxxdz;
  }

  public String getRwly() {
    return rwly;
  }

  public void setRwly(String rwly) {
    this.rwly = rwly;
  }

  public String getCyrq() {
    return cyrq;
  }

  public void setCyrq(String cyrq) {
    this.cyrq = cyrq;
  }

  public String getCyry() {
    return cyry;
  }

  public void setCyry(String cyry) {
    this.cyry = cyry;
  }

  public String getCyjs() {
    return cyjs;
  }

  public void setCyjs(String cyjs) {
    this.cyjs = cyjs;
  }

  public String getCydd() {
    return cydd;
  }

  public void setCydd(String cydd) {
    this.cydd = cydd;
  }

  public String getCylb() {
    return cylb;
  }

  public void setCylb(String cylb) {
    this.cylb = cylb;
  }

  public String getCyfs() {
    return cyfs;
  }

  public void setCyfs(String cyfs) {
    this.cyfs = cyfs;
  }

  public String getCyddsshj() {
    return cyddsshj;
  }

  public void setCyddsshj(String cyddsshj) {
    this.cyddsshj = cyddsshj;
  }

  public String getZxbz() {
    return zxbz;
  }

  public void setZxbz(String zxbz) {
    this.zxbz = zxbz;
  }

  public String getCxzt() {
    return cxzt;
  }

  public void setCxzt(String cxzt) {
    this.cxzt = cxzt;
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
}
