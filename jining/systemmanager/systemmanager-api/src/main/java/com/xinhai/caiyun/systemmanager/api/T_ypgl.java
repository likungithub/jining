package com.xinhai.caiyun.systemmanager.api;

import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * 样品管理基本信息
 * @create limaofei
 * @time 2018年5月5日
 */
public class T_ypgl {

  private long id;

  /**
   *样品编码
   */
  private String ypbm;

  /**
   * 合同名称
   */
  private String htmc;

  /**
   * 合同编码
   */
  private String htbm;

  /**
   * 合同类型
   */
  private String ht_type;
  
  /**
   *关联类型
   */
  private String gltype;

  /**
   * 样品名称
   */
  private String ypmc;

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
   * 应出报告日期
   */
  @DateTimeFormat(pattern="yyyy-MM-dd") 
  private Date ycbgrq;

  /**
   * 样品形态代码
   */
  private String ypxtdm;

  /**
   * 样品数量
   */
  private String ypsl;

  /**
   * 备样数量
   */
  private String bysl;

  /**
   * 样品单位
   */
  private String ypdw;

  /**
   * 规格型号
   */
  private String ggxh;

  /**
   * 规格型号单位
   */
  private String ggxhdw;

  /**
   * 样品批号
   */
  private String ypph;

  /**
   * 保质期
   */
  private String bzq;

  /**
   * 执行标准/技术文件
   */
  private String zxbz;

  /**
   * 质量等级
   */
  private String zldj;

  /**
   * 商标
   */
  private String sb;

  /**
   * 日期类型代码
   */
  private String rqlxdm;

  /**
   * 日期
   */
  @DateTimeFormat(pattern="yyyy-MM-dd") 
  private Date rq;

  /**
   * 生产者名称
   */
  private String sczmc;

  /**
   * 生产者地址
   */
  private String sczdz;

  /**
   * 样品保存条件
   */
  private String ypbctj;

  /**
   * 检验费
   */
  private BigDecimal jyf;

  /**
   * 分包费
   */
  private BigDecimal fbf;

  /**
   * 送样人
   */
  private String syr;

  /**
   * 数据出具日期
   */
  @DateTimeFormat(pattern="yyyy-MM-dd") 
  private Date sjcjrq;

  /**
   * 到样时间
   */
  @DateTimeFormat(pattern="yyyy-MM-dd") 
  private Date dysj;

  /**
   * 是否分包(1是0否)
   */
  private boolean if_Fb;

  /**
   * 分包项目
   */
  private String fbxm;

  /**
   * 委托id
   */
  private String wtid;

  /**
   * 是否保留副样(1是0否)
   */
  private boolean if_Blfy;

  /**
   * 检后样品处理(1返还0不返还)
   */
  private boolean if_Fhcl;

  /**
   * 报告份数
   */
  private String bgfs;

  /**
   * 检测项目
   */
  private String jcxm;

  /**
   * 接样地点
   */
  private String jydd;

  /**
   * 是否加急(1是0否)
   */
  private boolean if_Jj;
  private boolean scbz;
  
  /**
   * 接收状态200待接收   201已接收
   */
  private String jszt;
  
  /**
   * 备注
   */
  private String bzxx;
  private String lrry;
  private String bmdm;
  private String gxry;
  private String scry;
  private Date lrrq;
  private Date gxrq;
  private Date scrq;
  private String rwly;
  private String rwlb;
  private String qylx;
  private String cyjs;
  private String bzlx;
  private String yply;
  private String ypsx;
  private String yplx;
  private BigDecimal dj;
  private String if_ck;
  private String zzly;
  private String jhl;
  private String ccl;
  private String scxkzbh;
  private String sfdm;
  private String sfmc;
  private String csdm;
  private String smc;
  private String xjdm;
  private String xjmc;
  private String jdmc;
  private String lxr ;                          
  private String dh ;  
  @DateTimeFormat(pattern="yyyy-MM-dd") 
  private Date jsypjzrq  ;                   
  private String jsypdz  ;                      
  private String ccwd  ;                        
  private String jcfcry  ;                      
  private String fyzt   ;                       
  private String bz   ;                         
  private BigDecimal gyf    ;    
  @DateTimeFormat(pattern="yyyy-MM-dd") 
  private Date gzrq ;                         
  private String ytlx     ;                     
  private String xkzlx   ;                      
  private String xkzh   ;                       
  private String syrdz   ;                      
  private String syryb  ;                       
  private String syrdh  ;

  private boolean if_cy;
  private int cysl;

    public boolean isIf_cy() {
        return if_cy;
    }

    public void setIf_cy(boolean if_cy) {
        this.if_cy = if_cy;
    }

    public int getCysl() {
        return cysl;
    }

    public void setCysl(int cysl) {
        this.cysl = cysl;
    }

    public String getRwly() {
	return rwly;
}

public void setRwly(String rwly) {
	this.rwly = rwly;
}

public String getRwlb() {
	return rwlb;
}

public void setRwlb(String rwlb) {
	this.rwlb = rwlb;
}

public String getQylx() {
	return qylx;
}

public void setQylx(String qylx) {
	this.qylx = qylx;
}

public String getCyjs() {
	return cyjs;
}

public void setCyjs(String cyjs) {
	this.cyjs = cyjs;
}

public String getBzlx() {
	return bzlx;
}

public void setBzlx(String bzlx) {
	this.bzlx = bzlx;
}

public String getYply() {
	return yply;
}

public void setYply(String yply) {
	this.yply = yply;
}

public String getYpsx() {
	return ypsx;
}

public void setYpsx(String ypsx) {
	this.ypsx = ypsx;
}

public String getYplx() {
	return yplx;
}

public void setYplx(String yplx) {
	this.yplx = yplx;
}

public BigDecimal getDj() {
	return dj;
}

public void setDj(BigDecimal dj) {
	this.dj = dj;
}

public String getIf_ck() {
	return if_ck;
}

public void setIf_ck(String if_ck) {
	this.if_ck = if_ck;
}

public String getZzly() {
	return zzly;
}

public void setZzly(String zzly) {
	this.zzly = zzly;
}

public String getJhl() {
	return jhl;
}

public void setJhl(String jhl) {
	this.jhl = jhl;
}

public String getCcl() {
	return ccl;
}

public void setCcl(String ccl) {
	this.ccl = ccl;
}

public String getScxkzbh() {
	return scxkzbh;
}

public void setScxkzbh(String scxkzbh) {
	this.scxkzbh = scxkzbh;
}

public String getSfdm() {
	return sfdm;
}

public void setSfdm(String sfdm) {
	this.sfdm = sfdm;
}

public String getSfmc() {
	return sfmc;
}

public void setSfmc(String sfmc) {
	this.sfmc = sfmc;
}

public String getCsdm() {
	return csdm;
}

public void setCsdm(String csdm) {
	this.csdm = csdm;
}

public String getSmc() {
	return smc;
}

public void setSmc(String smc) {
	this.smc = smc;
}

public String getXjdm() {
	return xjdm;
}

public void setXjdm(String xjdm) {
	this.xjdm = xjdm;
}

public String getXjmc() {
	return xjmc;
}

public void setXjmc(String xjmc) {
	this.xjmc = xjmc;
}

public String getJdmc() {
	return jdmc;
}

public void setJdmc(String jdmc) {
	this.jdmc = jdmc;
}

public String getLxr() {
	return lxr;
}

public void setLxr(String lxr) {
	this.lxr = lxr;
}

public String getDh() {
	return dh;
}

public void setDh(String dh) {
	this.dh = dh;
}

public Date getJsypjzrq() {
	return jsypjzrq;
}

public void setJsypjzrq(Date jsypjzrq) {
	this.jsypjzrq = jsypjzrq;
}

public String getJsypdz() {
	return jsypdz;
}

public void setJsypdz(String jsypdz) {
	this.jsypdz = jsypdz;
}

public String getCcwd() {
	return ccwd;
}

public void setCcwd(String ccwd) {
	this.ccwd = ccwd;
}

public String getJcfcry() {
	return jcfcry;
}

public void setJcfcry(String jcfcry) {
	this.jcfcry = jcfcry;
}

public String getFyzt() {
	return fyzt;
}

public void setFyzt(String fyzt) {
	this.fyzt = fyzt;
}

public String getBz() {
	return bz;
}

public void setBz(String bz) {
	this.bz = bz;
}

public BigDecimal getGyf() {
	return gyf;
}

public void setGyf(BigDecimal gyf) {
	this.gyf = gyf;
}

public Date getGzrq() {
	return gzrq;
}

public void setGzrq(Date gzrq) {
	this.gzrq = gzrq;
}

public String getYtlx() {
	return ytlx;
}

public void setYtlx(String ytlx) {
	this.ytlx = ytlx;
}

public String getXkzlx() {
	return xkzlx;
}

public void setXkzlx(String xkzlx) {
	this.xkzlx = xkzlx;
}

public String getXkzh() {
	return xkzh;
}

public void setXkzh(String xkzh) {
	this.xkzh = xkzh;
}

public String getSyrdz() {
	return syrdz;
}

public void setSyrdz(String syrdz) {
	this.syrdz = syrdz;
}

public String getSyryb() {
	return syryb;
}

public void setSyryb(String syryb) {
	this.syryb = syryb;
}

public String getSyrdh() {
	return syrdh;
}

public void setSyrdh(String syrdh) {
	this.syrdh = syrdh;
}

  public String getHtmc() {
    return htmc;
  }

  public void setHtmc(String htmc) {
    this.htmc = htmc;
  }

  public String getHtbm() {
    return htbm;
  }

  public void setHtbm(String htbm) {
    this.htbm = htbm;
  }

  public String getHt_type() {
    return ht_type;
  }

  public void setHt_type(String ht_type) {
    this.ht_type = ht_type;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getYpbm() {
    return ypbm;
  }

  public void setYpbm(String ypbm) {
    this.ypbm = ypbm;
  }

  public String getGltype() {
	return gltype;
}

public void setGltype(String gltype) {
	this.gltype = gltype;
}

public String getWtid() {
	return wtid;
}

public void setWtid(String wtid) {
	this.wtid = wtid;
}

public String getYpmc() {
    return ypmc;
  }

  public void setYpmc(String ypmc) {
    this.ypmc = ypmc;
  }

  public String getCpdldm() {
    return cpdldm;
  }

  public void setCpdldm(String cpdldm) {
    this.cpdldm = cpdldm;
  }

  public String getCpdlmc() {
    return cpdlmc;
  }

  public void setCpdlmc(String cpdlmc) {
    this.cpdlmc = cpdlmc;
  }

  public String getJclbdm() {
    return jclbdm;
  }

  public void setJclbdm(String jclbdm) {
    this.jclbdm = jclbdm;
  }

  public Date getYcbgrq() {
    return ycbgrq;
  }

  public void setYcbgrq(Date ycbgrq) {
    this.ycbgrq = ycbgrq;
  }

  public String getYpxtdm() {
    return ypxtdm;
  }

  public void setYpxtdm(String ypxtdm) {
    this.ypxtdm = ypxtdm;
  }

  public String getYpsl() {
    return ypsl;
  }

  public void setYpsl(String ypsl) {
    this.ypsl = ypsl;
  }

  public String getBysl() {
    return bysl;
  }

  public void setBysl(String bysl) {
    this.bysl = bysl;
  }

  public String getYpdw() {
    return ypdw;
  }

  public void setYpdw(String ypdw) {
    this.ypdw = ypdw;
  }

  public String getGgxh() {
    return ggxh;
  }

  public void setGgxh(String ggxh) {
    this.ggxh = ggxh;
  }

  public String getGgxhdw() {
    return ggxhdw;
  }

  public void setGgxhdw(String ggxhdw) {
    this.ggxhdw = ggxhdw;
  }

  public String getYpph() {
    return ypph;
  }

  public void setYpph(String ypph) {
    this.ypph = ypph;
  }

  public String getBzq() {
    return bzq;
  }

  public void setBzq(String bzq) {
    this.bzq = bzq;
  }

  public String getZxbz() {
    return zxbz;
  }

  public void setZxbz(String zxbz) {
    this.zxbz = zxbz;
  }

  public String getZldj() {
    return zldj;
  }

  public void setZldj(String zldj) {
    this.zldj = zldj;
  }

  public String getSb() {
    return sb;
  }

  public void setSb(String sb) {
    this.sb = sb;
  }

  public String getRqlxdm() {
    return rqlxdm;
  }

  public void setRqlxdm(String rqlxdm) {
    this.rqlxdm = rqlxdm;
  }

  public Date getRq() {
    return rq;
  }

  public void setRq(Date rq) {
    this.rq = rq;
  }

  public String getSczmc() {
    return sczmc;
  }

  public void setSczmc(String sczmc) {
    this.sczmc = sczmc;
  }

  public String getSczdz() {
    return sczdz;
  }

  public void setSczdz(String sczdz) {
    this.sczdz = sczdz;
  }

  public String getYpbctj() {
    return ypbctj;
  }

  public void setYpbctj(String ypbctj) {
    this.ypbctj = ypbctj;
  }

  public BigDecimal getJyf() {
    return jyf;
  }

  public void setJyf(BigDecimal jyf) {
    this.jyf = jyf;
  }

  public BigDecimal getFbf() {
    return fbf;
  }

  public void setFbf(BigDecimal fbf) {
    this.fbf = fbf;
  }

  public String getSyr() {
    return syr;
  }

  public void setSyr(String syr) {
    this.syr = syr;
  }

  public Date getSjcjrq() {
    return sjcjrq;
  }

  public void setSjcjrq(Date sjcjrq) {
    this.sjcjrq = sjcjrq;
  }

  public Date getDysj() {
    return dysj;
  }

  public void setDysj(Date dysj) {
    this.dysj = dysj;
  }

  public boolean isIf_Fb() {
    return if_Fb;
  }

  public void setIf_Fb(boolean if_Fb) {
    this.if_Fb = if_Fb;
  }

  public String getFbxm() {
    return fbxm;
  }

  public void setFbxm(String fbxm) {
    this.fbxm = fbxm;
  }

  public boolean isIf_Blfy() {
    return if_Blfy;
  }

  public void setIf_Blfy(boolean if_Blfy) {
    this.if_Blfy = if_Blfy;
  }

  public boolean isIf_Fhcl() {
    return if_Fhcl;
  }

  public void setIf_Fhcl(boolean if_Fhcl) {
    this.if_Fhcl = if_Fhcl;
  }

  public String getBgfs() {
    return bgfs;
  }

  public void setBgfs(String bgfs) {
    this.bgfs = bgfs;
  }

  public String getJcxm() {
    return jcxm;
  }

  public void setJcxm(String jcxm) {
    this.jcxm = jcxm;
  }

  public String getJydd() {
    return jydd;
  }

  public void setJydd(String jydd) {
    this.jydd = jydd;
  }

  public boolean isIf_Jj() {
    return if_Jj;
  }

  public void setIf_Jj(boolean if_Jj) {
    this.if_Jj = if_Jj;
  }

  public boolean isScbz() {
    return scbz;
  }

  public void setScbz(boolean scbz) {
    this.scbz = scbz;
  }

  public String getBzxx() {
    return bzxx;
  }

  public void setBzxx(String bzxx) {
    this.bzxx = bzxx;
  }

  public String getLrry() {
    return lrry;
  }

  public void setLrry(String lrry) {
    this.lrry = lrry;
  }

  public String getBmdm() {
    return bmdm;
  }

  public void setBmdm(String bmdm) {
    this.bmdm = bmdm;
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
  
  
  public String getJszt() {
		return jszt;
	}

	public void setJszt(String jszt) {
		this.jszt = jszt;
	}
  
}
