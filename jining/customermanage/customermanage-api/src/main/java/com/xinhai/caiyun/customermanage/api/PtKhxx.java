package com.xinhai.caiyun.customermanage.api;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Id;
import javax.persistence.Table;

import com.alibaba.fastjson.JSONArray;
import com.xinhai.caiyun.commonmanager.api.ExcelVOAttribute;

/**
 * Auto Generated Entity
 *
 * @author Xinhai auto generated
 *
 */
@Table(name = "pt_khxx")
public class PtKhxx implements Serializable {

    private static final long serialVersionUID = 1L;


    private String yxkhbm;

    public String getYxkhbm() {
        return yxkhbm;
    }

    public void setYxkhbm(String yxkhbm) {
        this.yxkhbm = yxkhbm;
    }

    /**
     * 主键id
     */
    @Id
    private Long id;

    /**
     * 客户编码
     */
    private String khbm;

    /**
     * 意向客户id
     */
    private String yxkhid;

    /**
     * 登陆账号
     */
    private String dlzh;

    /**
     * 登陆密码
     */
    private String dlmm;

    /**
     * 用户名称
     */
    @ExcelVOAttribute(name = "用户姓名", column = "A")
    private String yhmc;

    /**
     * 公司名称
     */
    @ExcelVOAttribute(name = "公司名称", column = "B")
    private String gsmc;

    /**
     * 客户分类
     */
    private String khflDm;

    /**
     * 行业门类
     */
    private String hyml;

    /**
     * 行业大类
     */
    private String hydl;

    /**
     * 行业代码（app_khxx）
     */
    private String hydm;

    /**
     * 大类名称
     */
    private String hymc;

    /**
     * 所在地区
     */
    private int xzqhDm;

    /**
     * 法人代表
     */
    @ExcelVOAttribute(name = "法人代表", column = "C")
    private String frdb;

    /**
     * 身份证号码
     */
    @ExcelVOAttribute(name = "身份证号", column = "D")
    private String sfzhm;

    /**
     * 营业执照
     */
    @ExcelVOAttribute(name = "营业执照号", column = "E")
    private String yyzz;

    /**
     * 组织机构代码
     */
    @ExcelVOAttribute(name = "组织机构代码", column = "F")
    private String zzjgdm;

    /**
     * 成立日期
     */
    private Date clrq;

    /**
     * 开始代账日期
     */
    private Date ksdzrq;

    /**
     * 签约状态
     */
    private Boolean qyztDm;

    /**
     * 备注信息
     */
    @ExcelVOAttribute(name = "备注信息", column = "G")
    private String bzxx;

    /**
     * 服务状态
     */
    private Boolean fwztDm;

    /**
     * 客户主管代码
     */
    private String zydm;

    /**
     * 客户主管姓名
     */
    private String zyxm;

    /**
     * 海关代码
     */
    private String hgdm;
    /**
     * 操作员
     */
    private String czy;

    /**
     * 纳税人识别号
     */
    @ExcelVOAttribute(name = "纳税人识别号", column = "Q")
    private String nsrsbh;

    /**
     * 代理机构编码
     */
    private String dljgBm;

    /**
     * 增值税性质代码
     */
    private String zzsxzDm;

    /**
     * 税率
     */
    @ExcelVOAttribute(name = "税率（%）", column = "P")
    private double sl;

    /**
     * 纳税人编码
     */
    @ExcelVOAttribute(name = "纳税人编码", column = "R")
    private String nsrbm;

    /**
     * 主管税务分局
     */
    @ExcelVOAttribute(name = "主管税务分局", column = "S")
    private String zgswfj;

    /**
     * 税务资料备注
     */
    @ExcelVOAttribute(name = "税务备注", column = "T")
    private String swzlbz;

    /**
     * 个人头像
     */
    private String grtx;

    /**
     * 联系人名称
     */
    @ExcelVOAttribute(name = "联系人", column = "H")
    private String lxrmc;

    /**
     * 办公电话
     */
    @ExcelVOAttribute(name = "办公电话", column = "I")
    private String bgdh;

    /**
     * 手机号码
     */
    @ExcelVOAttribute(name = "联系人手机号码", column = "J")
    private String sjhm;

    /**
     * 传真号码
     */
    @ExcelVOAttribute(name = "传真号码", column = "K")
    private String czhm;

    /**
     * QQ号
     */
    @ExcelVOAttribute(name = "联系人QQ", column = "L")
    private String qq;

    /**
     * 邮箱
     */
    @ExcelVOAttribute(name = "联系人Email", column = "M")
    private String email;

    /**
     * 其他信息
     */
    @ExcelVOAttribute(name = "其他", column = "N")
    private String qtxx;

    /**
     * 详细地址
     */
    @ExcelVOAttribute(name = "公司详细地址", column = "O")
    private String xxdz;

    /**
     * 账套状态
     */
    private Boolean ztztDm;

    /**
     * 客户等级
     */
    private String khdjDm;

    /**
     * 用户状态
     */
    private String yhztDm;

    /**
     * 删除标志
     */
    private Boolean scbz;

    /**
     * 录入人员
     */
    private String lrry;

    /**
     * 录入人所在部门编码
     */
    private String bmdm;

    /**
     * 更新人员
     */
    private String gxry;

    /**
     * 删除人员
     */
    private String scry;

    /**
     * 停止服务人员
     */
    private String tzfwry;

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

    /**
     * 停止服务日期
     */
    private Date tzfwrq;

    /**
     * 注册标志
     * @param id
     */
    private boolean zcbz;

    /**
     * 客户分类名称
     */
    private String khflMc;

    /**
     * 省份代码
     */
    private String sfdm;

    /**
     * 省份名称
     */
    private String sfmc;

    /**
     * 城市代码
     */
    private String csdm;

    /**
     * 城市名称
     */
    private String csmc;

    /**
     * 增值税性质名称
     */
    private String zzsxzMc;

    /**
     * 客户等级名称
     */
    private String khdjMc;

    /**
     * 用户状态名称
     */
    private String yhztMc;

    /**
     * 税务提醒list
     */
    private List<PtSwtx> ptSwtxlist;

    /**
     * JSONArray
     */
    private JSONArray JsonArray;
    /**
     * 税税通账号
     */
    private String taxtaxUserName;
    /**
     * 税税通密码
     */
    private String taxtaxPassword;
    /**
     * 证件类型
     */
    private String IDType;

    /**
     * 是否已签署合同（且合同已审核）
     */
    private String ifhasHt;

    /**
     * 合同收费项目中是否存在代理服务费
     */
    private String ifhasDLFW;

    /**
     * 推荐人代码
     */
    private String tjrdm;

    /**
     * 推荐人名称
     */
    private String tjrmc;

    /**
     * 是否开通app
     */
    private boolean ifktapp;

    private String[] monthList;

    private String monthlists;

    /**
     * 派工人员
     */
    private String pgry;

    /**
     * 客户经理代码
     */
    private String khjl_dm;

    /**
     * 客户经理代码
     */
    private String khjl_mc;

    /**
     * 外部推荐人名称
     */
    private String wbtjrmc;

    /**
     * 注册资金
     */
    private String zczj;

    /**
     * 注册地址
     */
    private String zcdz;

    /**
     * 房东姓名
     */
    private String fdxm;

    /**
     * 房东身份证号
     */
    private String fdsfzh;

    /**
     * 经营范围
     */
    private String jyfw;

    /**
     * 备用公司名称
     */
    private String bygsmc;

    /**
     * 股东信息list
     */
    private List<PtGdxx> ptGdxxlist;

    /**
     * 初始主管会计
     */
    private String zydm_before;

    /**
     * 初始客户经理
     */
    private String khjl_before;

    /**
     * 收费-审核状态代码
     */
    private String shzt_dm;

    /**
     * 收费-服务项目名称
     */
    private String fwxm_mc;

    /**
     * 收费状态代码
     */
    private String sfzt;

    /**
     * 实际收款
     */
    private String sjsk;

    /**
     * 应收款
     */
    private String ysk;

    public String getSjsk() {
        return sjsk;
    }

    public void setSjsk(String sjsk) {
        this.sjsk = sjsk;
    }

    public String getYsk() {
        return ysk;
    }

    public void setYsk(String ysk) {
        this.ysk = ysk;
    }

    public String getYxkhid() {
        return yxkhid;
    }

    public void setYxkhid(String yxkhid) {
        this.yxkhid = yxkhid;
    }

    public String getSfzt() {
        return sfzt;
    }

    public void setSfzt(String sfzt) {
        this.sfzt = sfzt;
    }

    public String getShzt_dm() {
        return shzt_dm;
    }

    public void setShzt_dm(String shzt_dm) {
        this.shzt_dm = shzt_dm;
    }

    public String getFwxm_mc() {
        return fwxm_mc;
    }

    public void setFwxm_mc(String fwxm_mc) {
        this.fwxm_mc = fwxm_mc;
    }

    public String getZydm_before() {
        return zydm_before;
    }

    public void setZydm_before(String zydm_before) {
        this.zydm_before = zydm_before;
    }

    public String getKhjl_before() {
        return khjl_before;
    }

    public void setKhjl_before(String khjl_before) {
        this.khjl_before = khjl_before;
    }

    public List<PtGdxx> getPtGdxxlist() {
        return ptGdxxlist;
    }

    public void setPtGdxxlist(List<PtGdxx> ptGdxxlist) {
        this.ptGdxxlist = ptGdxxlist;
    }

    public String getBygsmc() {
        return bygsmc;
    }

    public void setBygsmc(String bygsmc) {
        this.bygsmc = bygsmc;
    }

    public String getZczj() {
        return zczj;
    }

    public void setZczj(String zczj) {
        this.zczj = zczj;
    }

    public String getZcdz() {
        return zcdz;
    }

    public void setZcdz(String zcdz) {
        this.zcdz = zcdz;
    }

    public String getFdxm() {
        return fdxm;
    }

    public void setFdxm(String fdxm) {
        this.fdxm = fdxm;
    }

    public String getFdsfzh() {
        return fdsfzh;
    }

    public void setFdsfzh(String fdsfzh) {
        this.fdsfzh = fdsfzh;
    }

    public String getJyfw() {
        return jyfw;
    }

    public void setJyfw(String jyfw) {
        this.jyfw = jyfw;
    }

    public String getWbtjrmc() {
        return wbtjrmc;
    }

    public void setWbtjrmc(String wbtjrmc) {
        this.wbtjrmc = wbtjrmc;
    }

    public String getTjrmc() {
        return tjrmc;
    }

    public void setTjrmc(String tjrmc) {
        this.tjrmc = tjrmc;
    }

    public String getKhjl_dm() {
        return khjl_dm;
    }

    public void setKhjl_dm(String khjl_dm) {
        this.khjl_dm = khjl_dm;
    }

    public String getKhjl_mc() {
        return khjl_mc;
    }

    public void setKhjl_mc(String khjl_mc) {
        this.khjl_mc = khjl_mc;
    }

    public String getPgry() {
        return pgry;
    }

    public void setPgry(String pgry) {
        this.pgry = pgry;
    }

    public String getMonthlists() {
        return monthlists;
    }

    public void setMonthlists(String monthlists) {
        this.monthlists = monthlists;
    }

    public String[] getMonthList() {
        return monthList;
    }

    public void setMonthList(String[] monthList) {
        this.monthList = monthList;
    }

    public String getHydm() {
        return hydm;
    }

    public void setHydm(String hydm) {
        this.hydm = hydm;
    }

    public boolean isIfktapp() {
        return ifktapp;
    }

    public void setIfktapp(boolean ifktapp) {
        this.ifktapp = ifktapp;
    }

    public String getTjrdm() {
        return tjrdm;
    }

    public void setTjrdm(String tjrdm) {
        this.tjrdm = tjrdm;
    }

    public String getIfhasHt() {
        return ifhasHt;
    }

    public void setIfhasHt(String ifhasHt) {
        this.ifhasHt = ifhasHt;
    }

    public String getIfhasDLFW() {
        return ifhasDLFW;
    }

    public void setIfhasDLFW(String ifhasDLFW) {
        this.ifhasDLFW = ifhasDLFW;
    }

    public String getBmdm() {
        return bmdm;
    }

    public void setBmdm(String bmdm) {
        this.bmdm = bmdm;
    }

    public String getTaxtaxUserName() {
        return taxtaxUserName;
    }

    public void setTaxtaxUserName(String taxtaxUserName) {
        this.taxtaxUserName = taxtaxUserName;
    }

    public String getTaxtaxPassword() {
        return taxtaxPassword;
    }

    public void setTaxtaxPassword(String taxtaxPassword) {
        this.taxtaxPassword = taxtaxPassword;
    }

    public String getHgdm() {
        return hgdm;
    }

    public void setHgdm(String hgdm) {
        this.hgdm = hgdm;
    }

    public String getZyxm() {
        return zyxm;
    }

    public void setZyxm(String zyxm) {
        this.zyxm = zyxm;
    }

    public JSONArray getJsonArray() {
        return JsonArray;
    }

    public void setJsonArray(JSONArray jsonArray) {
        JsonArray = jsonArray;
    }

    public List<PtSwtx> getPtSwtxlist() {
        return ptSwtxlist;
    }

    public void setPtSwtxlist(List<PtSwtx> ptSwtxlist) {
        this.ptSwtxlist = ptSwtxlist;
    }

    public String getKhflMc() {
        return khflMc;
    }

    public void setKhflMc(String khflMc) {
        this.khflMc = khflMc;
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

    public String getCsmc() {
        return csmc;
    }

    public void setCsmc(String csmc) {
        this.csmc = csmc;
    }

    public String getZzsxzMc() {
        return zzsxzMc;
    }

    public void setZzsxzMc(String zzsxzMc) {
        this.zzsxzMc = zzsxzMc;
    }

    public String getKhdjMc() {
        return khdjMc;
    }

    public void setKhdjMc(String khdjMc) {
        this.khdjMc = khdjMc;
    }

    public String getYhztMc() {
        return yhztMc;
    }

    public void setYhztMc(String yhztMc) {
        this.yhztMc = yhztMc;
    }

    public boolean isZcbz() {
        return zcbz;
    }

    public void setZcbz(boolean zcbz) {
        this.zcbz = zcbz;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }

    public String getDlzh() {
        return dlzh;
    }

    public void setDlzh(String dlzh) {
        this.dlzh = dlzh;
    }

    public String getDlmm() {
        return dlmm;
    }

    public void setDlmm(String dlmm) {
        this.dlmm = dlmm;
    }

    public String getYhmc() {
        return yhmc;
    }

    public void setYhmc(String yhmc) {
        this.yhmc = yhmc;
    }

    public String getGsmc() {
        return gsmc;
    }

    public void setGsmc(String gsmc) {
        this.gsmc = gsmc;
    }

    public String getKhflDm() {
        return khflDm;
    }

    public void setKhflDm(String khflDm) {
        this.khflDm = khflDm;
    }

    public int getXzqhDm() {
        return xzqhDm;
    }

    public void setXzqhDm(int xzqhDm) {
        this.xzqhDm = xzqhDm;
    }

    public String getFrdb() {
        return frdb;
    }

    public void setFrdb(String frdb) {
        this.frdb = frdb;
    }

    public String getSfzhm() {
        return sfzhm;
    }

    public void setSfzhm(String sfzhm) {
        this.sfzhm = sfzhm;
    }

    public String getYyzz() {
        return yyzz;
    }

    public void setYyzz(String yyzz) {
        this.yyzz = yyzz;
    }

    public String getZzjgdm() {
        return zzjgdm;
    }

    public void setZzjgdm(String zzjgdm) {
        this.zzjgdm = zzjgdm;
    }

    public Date getClrq() {
        return clrq;
    }

    public void setClrq(Date clrq) {
        this.clrq = clrq;
    }

    public Date getKsdzrq() {
        return ksdzrq;
    }

    public void setKsdzrq(Date ksdzrq) {
        this.ksdzrq = ksdzrq;
    }

    public Boolean getQyztDm() {
        return qyztDm;
    }

    public void setQyztDm(Boolean qyztDm) {
        this.qyztDm = qyztDm;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    public Boolean getFwztDm() {
        return fwztDm;
    }

    public void setFwztDm(Boolean fwztDm) {
        this.fwztDm = fwztDm;
    }

    public String getZydm() {
        return zydm;
    }

    public void setZydm(String zydm) {
        this.zydm = zydm;
    }

    public String getCzy() {
        return czy;
    }

    public void setCzy(String czy) {
        this.czy = czy;
    }

    public String getNsrsbh() {
        return nsrsbh;
    }

    public void setNsrsbh(String nsrsbh) {
        this.nsrsbh = nsrsbh;
    }

    public String getDljgBm() {
        return dljgBm;
    }

    public void setDljgBm(String dljgBm) {
        this.dljgBm = dljgBm;
    }

    public String getZzsxzDm() {
        return zzsxzDm;
    }

    public void setZzsxzDm(String zzsxzDm) {
        this.zzsxzDm = zzsxzDm;
    }

    public double getSl() {
        return sl;
    }

    public void setSl(double sl) {
        this.sl = sl;
    }

    public String getNsrbm() {
        return nsrbm;
    }

    public void setNsrbm(String nsrbm) {
        this.nsrbm = nsrbm;
    }

    public String getZgswfj() {
        return zgswfj;
    }

    public void setZgswfj(String zgswfj) {
        this.zgswfj = zgswfj;
    }

    public String getSwzlbz() {
        return swzlbz;
    }

    public void setSwzlbz(String swzlbz) {
        this.swzlbz = swzlbz;
    }

    public String getGrtx() {
        return grtx;
    }

    public void setGrtx(String grtx) {
        this.grtx = grtx;
    }

    public String getLxrmc() {
        return lxrmc;
    }

    public void setLxrmc(String lxrmc) {
        this.lxrmc = lxrmc;
    }

    public String getBgdh() {
        return bgdh;
    }

    public void setBgdh(String bgdh) {
        this.bgdh = bgdh;
    }

    public String getSjhm() {
        return sjhm;
    }

    public void setSjhm(String sjhm) {
        this.sjhm = sjhm;
    }

    public String getCzhm() {
        return czhm;
    }

    public void setCzhm(String czhm) {
        this.czhm = czhm;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getQtxx() {
        return qtxx;
    }

    public void setQtxx(String qtxx) {
        this.qtxx = qtxx;
    }

    public String getXxdz() {
        return xxdz;
    }

    public void setXxdz(String xxdz) {
        this.xxdz = xxdz;
    }

    public Boolean getZtztDm() {
        return ztztDm;
    }

    public void setZtztDm(Boolean ztztDm) {
        this.ztztDm = ztztDm;
    }

    public String getKhdjDm() {
        return khdjDm;
    }

    public void setKhdjDm(String khdjDm) {
        this.khdjDm = khdjDm;
    }

    public String getYhztDm() {
        return yhztDm;
    }

    public void setYhztDm(String yhztDm) {
        this.yhztDm = yhztDm;
    }

    public Boolean getScbz() {
        return scbz;
    }

    public void setScbz(Boolean scbz) {
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

    public String getTzfwry() {
        return tzfwry;
    }

    public void setTzfwry(String tzfwry) {
        this.tzfwry = tzfwry;
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

    public Date getTzfwrq() {
        return tzfwrq;
    }

    public void setTzfwrq(Date tzfwrq) {
        this.tzfwrq = tzfwrq;
    }

    public String getHyml() {
        return hyml;
    }

    public void setHyml(String hyml) {
        this.hyml = hyml;
    }

    public String getHydl() {
        return hydl;
    }

    public void setHydl(String hydl) {
        this.hydl = hydl;
    }

    public String getHymc() {
        return hymc;
    }

    public void setHymc(String hymc) {
        this.hymc = hymc;
    }

    public String getIDType() {
        return IDType;
    }

    public void setIDType(String iDType) {
        IDType = iDType;
    }

}