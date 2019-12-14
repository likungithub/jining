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
public class Tlygl {

  private long id;
  private String if_jj;
	private String zm;
	private String htbm;
	private String htmc;
	private String ypbm;
	private String ypmc;
	private String zwmc_bm;
	private String jcfa;
	@DateTimeFormat(pattern="yyyy-MM-dd") 
	private Date ycbgrq;
	@DateTimeFormat(pattern="yyyy-MM-dd") 
	private Date sjcjrq;
	private String jcx;
	private String jldw;
	private String jcyj;
	private String cpdlmc;
	private String yl;
	private String cyl;
	private String xl;
	private String jszt;
	private String bzxx;
	private String if_zb;

	public String getIf_zb() {
		return if_zb;
	}

	public void setIf_zb(String if_zb) {
		this.if_zb = if_zb;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getIf_jj() {
		return if_jj;
	}
	public void setIf_jj(String if_jj) {
		this.if_jj = if_jj;
	}
	public String getZm() {
		return zm;
	}
	public void setZm(String zm) {
		this.zm = zm;
	}
	public String getHtbm() {
		return htbm;
	}
	public void setHtbm(String htbm) {
		this.htbm = htbm;
	}
	public String getHtmc() {
		return htmc;
	}
	public void setHtmc(String htmc) {
		this.htmc = htmc;
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
	public String getZwmc_bm() {
		return zwmc_bm;
	}
	public void setZwmc_bm(String zwmc_bm) {
		this.zwmc_bm = zwmc_bm;
	}
	public String getJcfa() {
		return jcfa;
	}
	public void setJcfa(String jcfa) {
		this.jcfa = jcfa;
	}
	
	public Date getYcbgrq() {
		return ycbgrq;
	}
	public void setYcbgrq(Date ycbgrq) {
		this.ycbgrq = ycbgrq;
	}
	public Date getSjcjrq() {
		return sjcjrq;
	}
	public void setSjcjrq(Date sjcjrq) {
		this.sjcjrq = sjcjrq;
	}
	public String getJcx() {
		return jcx;
	}
	public void setJcx(String jcx) {
		this.jcx = jcx;
	}
	public String getJldw() {
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
	public String getJcyj() {
		return jcyj;
	}
	public void setJcyj(String jcyj) {
		this.jcyj = jcyj;
	}
	public String getCpdlmc() {
		return cpdlmc;
	}
	public void setCpdlmc(String cpdlmc) {
		this.cpdlmc = cpdlmc;
	}
	public String getYl() {
		return yl;
	}
	public void setYl(String yl) {
		this.yl = yl;
	}
	public String getCyl() {
		return cyl;
	}
	public void setCyl(String cyl) {
		this.cyl = cyl;
	}
	public String getXl() {
		return xl;
	}
	public void setXl(String xl) {
		this.xl = xl;
	}
	public String getJszt() {
		return jszt;
	}
	public void setJszt(String jszt) {
		this.jszt = jszt;
	}
	public String getBzxx() {
		return bzxx;
	}
	public void setBzxx(String bzxx) {
		this.bzxx = bzxx;
	}
	
}
