package com.xinhai.caiyun.statisticalanalysis.api;

import java.util.Date;

import javax.persistence.Table;

/**
 * 派工统计
 * 
 * @author pusilin
 */
@Table(name = "PT_PGGL")
public class DispatchManage  {

	private String id;
	/**
	 * 客户编码
	 */
	private String khbm;
	/**
	 * 公司名称
	 */
	private String gsmc;
	/**
	 * 代理机构编码
	 */
	private String dljg_bm;
	/**
	 * 职员代码
	 */
	private String zydm;
	/**
	 * 员工姓名
	 */
	private String ygxm;
	/**
	 * 派工角色代码
	 */
	private String pgjs_dm;
	/**
	 * 派工角色名称
	 */
	private String pgjs_mc;
	/**
	 * 部门编码
	 */
	private String bmbm;
	/**
	 * 部门名称
	 */
	private String bmmc;
	/**
	 * 删除标志
	 */
	private int scbz;
	/**
	 * 个人头像
	 */
	private String grtx;
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
	 * 消息编码
	 */
	private String xxbm;
	
	/**
	 * 发送标志
	 */
	private int fsbz;
	/**
	 * 删除日期
	 */
	private Date scrq;
	/**
     * 派工说明
     */
    private String pgsm;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getKhbm() {
		return khbm;
	}
	public void setKhbm(String khbm) {
		this.khbm = khbm;
	}
	public String getGsmc() {
		return gsmc;
	}
	public void setGsmc(String gsmc) {
		this.gsmc = gsmc;
	}
	public String getDljg_bm() {
		return dljg_bm;
	}
	public void setDljg_bm(String dljg_bm) {
		this.dljg_bm = dljg_bm;
	}
	public String getZydm() {
		return zydm;
	}
	public void setZydm(String zydm) {
		this.zydm = zydm;
	}
	public String getYgxm() {
		return ygxm;
	}
	public void setYgxm(String ygxm) {
		this.ygxm = ygxm;
	}
	public String getPgjs_dm() {
		return pgjs_dm;
	}
	public void setPgjs_dm(String pgjs_dm) {
		this.pgjs_dm = pgjs_dm;
	}
	public String getPgjs_mc() {
		return pgjs_mc;
	}
	public void setPgjs_mc(String pgjs_mc) {
		this.pgjs_mc = pgjs_mc;
	}
	public String getBmbm() {
		return bmbm;
	}
	public void setBmbm(String bmbm) {
		this.bmbm = bmbm;
	}
	public String getBmmc() {
		return bmmc;
	}
	public void setBmmc(String bmmc) {
		this.bmmc = bmmc;
	}
	public int getScbz() {
		return scbz;
	}
	public void setScbz(int scbz) {
		this.scbz = scbz;
	}
	public String getGrtx() {
		return grtx;
	}
	public void setGrtx(String grtx) {
		this.grtx = grtx;
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
    public String getPgsm() {
        return pgsm;
    }
    public void setPgsm(String pgsm) {
        this.pgsm = pgsm;
    }
	
}
