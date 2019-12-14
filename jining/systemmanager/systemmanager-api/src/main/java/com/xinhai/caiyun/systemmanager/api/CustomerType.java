package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 * 客户分类实体类
 * @author pusilin
 *
 */
public class CustomerType {

	/**
	 * id
	 */
	private String id;

	/**
	 * 代理机构编码
	 */
	private String dljg_bm;

	/**
	 * 纳税人识别号
	 */
	private String nsrsbh;

	/**
	 * 客户分类代码
	 */
	private String khfl_dm;

	/**
	 * 客户分类名称
	 */
	private String khfl_mc;

	/**
	 * 职员代码（员工编号）
	 */
	private String zydm;

	/**
	 * 
	 */
	private int scbz;

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

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDljg_bm() {
		return dljg_bm;
	}

	public void setDljg_bm(String dljg_bm) {
		this.dljg_bm = dljg_bm;
	}

	public String getNsrsbh() {
		return nsrsbh;
	}

	public void setNsrsbh(String nsrsbh) {
		this.nsrsbh = nsrsbh;
	}

	public String getKhfl_dm() {
		return khfl_dm;
	}

	public void setKhfl_dm(String khfl_dm) {
		this.khfl_dm = khfl_dm;
	}

	public String getKhfl_mc() {
		return khfl_mc;
	}

	public void setKhfl_mc(String khfl_mc) {
		this.khfl_mc = khfl_mc;
	}

	public String getZydm() {
		return zydm;
	}

	public void setZydm(String zydm) {
		this.zydm = zydm;
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
	
}
