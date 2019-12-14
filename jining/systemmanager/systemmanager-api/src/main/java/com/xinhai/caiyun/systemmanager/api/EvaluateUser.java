package com.xinhai.caiyun.systemmanager.api;

import javax.persistence.Table;
import java.util.Date;

/**
 * 评价管理-公司评价
 * @author pusilin
 */
@Table(name = "PT_YGPJ_GSPJ")
public class EvaluateUser {
	
	/**
	 * 
	 */
	private String id;
	
	/**
	 * 职员代码
	 */
	private String zydm;

	/**
	 * 忠诚度
	 */
	private int zcd;

	/**
	 * 专业水准
	 */
	private int zysp;

	/**
	 * 员工工龄
	 */
	private int yggl;

	/**
	 * 业务能力
	 */
	private int ywnl;

	/**
	 * 公司评语
	 */
	private String gspy;

	/**
	 * 公司评价人员代码
	 */
	private String gspjrydm;

	/**
	 * 公司评价时间
	 */
	private Date gspjsj;

	/**
	 * 公司评价修改时间
	 */
	private Date gspjxgsj;

	/**
	 * 纳税人识别号
	 */
	private String nsrsbh;

	/**
	 * 代理机构代码
	 */
	private String dljg_bm;
	
	/**
	 * 员工姓名
	 */
	private String ygxm;
	
	/**
	 * 公司评价人员姓名
	 * 
	 */
	private String gspjryxm;
	
	/**
     * 员工头像
     */
    private String ygtx;

	public String getYgtx() {
		return ygtx;
	}

	public void setYgtx(String ygtx) {
		this.ygtx = ygtx;
	}
	
	public String getYgxm() {
		return ygxm;
	}

	public void setYgxm(String ygxm) {
		this.ygxm = ygxm;
	}

	public String getGspjryxm() {
		return gspjryxm;
	}

	public void setGspjryxm(String gspjryxm) {
		this.gspjryxm = gspjryxm;
	}

	public void setZcd(int zcd) {
		this.zcd = zcd;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getZydm() {
		return zydm;
	}

	public void setZydm(String zydm) {
		this.zydm = zydm;
	}

	public int getZcd() {
		return zcd;
	}

	public void setZdc(int zcd) {
		this.zcd = zcd;
	}

	public int getZysp() {
		return zysp;
	}

	public void setZysp(int zysp) {
		this.zysp = zysp;
	}

	public int getYggl() {
		return yggl;
	}

	public void setYggl(int yggl) {
		this.yggl = yggl;
	}

	public int getYwnl() {
		return ywnl;
	}

	public void setYwnl(int ywnl) {
		this.ywnl = ywnl;
	}

	public String getGspy() {
		return gspy;
	}

	public void setGspy(String gspy) {
		this.gspy = gspy;
	}

	public String getGspjrydm() {
		return gspjrydm;
	}

	public void setGspjrydm(String gspjrydm) {
		this.gspjrydm = gspjrydm;
	}

	public Date getGspjsj() {
		return gspjsj;
	}

	public void setGspjsj(Date gspjsj) {
		this.gspjsj = gspjsj;
	}

	public Date getGspjxgsj() {
		return gspjxgsj;
	}

	public void setGspjxgsj(Date gspjxgsj) {
		this.gspjxgsj = gspjxgsj;
	}

	public String getNsrsbh() {
		return nsrsbh;
	}

	public void setNsrsbh(String nsrsbh) {
		this.nsrsbh = nsrsbh;
	}

	public String getDljg_bm() {
		return dljg_bm;
	}

	public void setDljg_bm(String dljg_bm) {
		this.dljg_bm = dljg_bm;
	}
	

}
