package com.xinhai.caiyun.customermanage.api;

import java.sql.Date;

import javax.persistence.Table;

/**
 * 通讯录
 * @author pusilin
 *
 */
@Table(name = "USER")
public class Contacts {
	
	/**
	 * id 主键
	 */
	private String id;
	
	/**
	 * 员工id
	 */
	private int ygid;
	
	/**
	 * 登录账号
	 */
	private String user_account;
	
	/**
	 * 员工姓名（需要加密）
	 */
	private String name;
	
	/**
	 * 登录密码（需要加密）| 登录密码默认6个0
	 */
	private String password;
	
	/**
	 * 是否启用（1启用；0未启用）
	 */
	private int is_enabled;
	
	/**
	 * 电子邮箱（需要加密）
	 */
	private String email;
	
	/**
	 * 所属客户
	 */
	private String customer_id;
	
	/**
	 * 所属组织UUID
	 */
	private String org_id;
	
	/**
	 * 部门编码（用于标记员工所在部门）
	 */
	private String bmdm;
	
	/**
	 * 最近一次登陆时间
	 */
	private Date last_login_date;
	
	/**
	 * 评论
	 */
	private String remark;
	
	/**
	 * 是否删除（0未删除，1已删除）
	 */
	private int is_delete;
	
	/**
	 * 职员代码（会计代码）| 编码规则如下KJ1000000001，数字10位，每次加1
	 */
	private String zydm;
	
	/**
	 * 员工性别（0男；1女）
	 */
	private int xbdm;
	
	/**
	 * 出生日期
	 */
	private Date csrq;
	
	/**
	 * 移动电话（需要加密）
	 */
	private String yddh;
	
	/**
	 * 联系电话（需要加密）
	 */
	private String tel;
	
	/**
	 * QQ（需要加密）
	 */
	private String qq;
	
	/**
	 * 员工头像
	 */
	private String ygtx;
	
	/**
	 * 备注信息
	 */
	private String bzxx;
	
	/**
	 * 联系地址（需要加密）
	 */
	private String lxdz;
	
	/**
	 * 角色代码（用于标记员工所属的角色 | 角色代码存储以逗号（，）分割）
	 */
	private String jsdm;
	
	/**
	 * 纳税人识别号（备用）
	 */
	private String nsrsbh;
	
	/**
	 * 代理机构编码 （用于标记职员所属代理记账公司 | 编码规则如下DL1000000001，数字10位，每次加1）
	 */
	private String dljg_bm;
	
	/**
	 * 录入人员（员工编码）
	 */
	private String lrry;
	
	/**
	 * 更新人员（员工编码）
	 */
	private String gxry;
	
	/**
	 * 删除人员（员工编码）
	 */
	private String scry;
	
	/**
	 * 录入日期
	 */
	private Date create_date;
	
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

	public int getYgid() {
		return ygid;
	}

	public void setYgid(int ygid) {
		this.ygid = ygid;
	}

	public String getUser_account() {
		return user_account;
	}

	public void setUser_account(String user_account) {
		this.user_account = user_account;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getIs_enabled() {
		return is_enabled;
	}

	public void setIs_enabled(int is_enabled) {
		this.is_enabled = is_enabled;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(String customer_id) {
		this.customer_id = customer_id;
	}

	public String getOrg_id() {
		return org_id;
	}

	public void setOrg_id(String org_id) {
		this.org_id = org_id;
	}

	public String getBmdm() {
		return bmdm;
	}

	public void setBmdm(String bmdm) {
		this.bmdm = bmdm;
	}

	public Date getLast_login_date() {
		return last_login_date;
	}

	public void setLast_login_date(Date last_login_date) {
		this.last_login_date = last_login_date;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public int getIs_delete() {
		return is_delete;
	}

	public void setIs_delete(int is_delete) {
		this.is_delete = is_delete;
	}

	public String getZydm() {
		return zydm;
	}

	public void setZydm(String zydm) {
		this.zydm = zydm;
	}

	public int getXbdm() {
		return xbdm;
	}

	public void setXbdm(int xbdm) {
		this.xbdm = xbdm;
	}

	public Date getCsrq() {
		return csrq;
	}

	public void setCsrq(Date csrq) {
		this.csrq = csrq;
	}

	public String getYddh() {
		return yddh;
	}

	public void setYddh(String yddh) {
		this.yddh = yddh;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getYgtx() {
		return ygtx;
	}

	public void setYgtx(String ygtx) {
		this.ygtx = ygtx;
	}

	public String getBzxx() {
		return bzxx;
	}

	public void setBzxx(String bzxx) {
		this.bzxx = bzxx;
	}

	public String getLxdz() {
		return lxdz;
	}

	public void setLxdz(String lxdz) {
		this.lxdz = lxdz;
	}

	public String getJsdm() {
		return jsdm;
	}

	public void setJsdm(String jsdm) {
		this.jsdm = jsdm;
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

	public Date getCreate_date() {
		return create_date;
	}

	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
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
