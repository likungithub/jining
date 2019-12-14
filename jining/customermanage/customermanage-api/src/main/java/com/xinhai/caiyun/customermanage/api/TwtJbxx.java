package com.xinhai.caiyun.customermanage.api;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * 描述:t_wt_jbxx表的实体类
 * @version
 * @author:  Administrator
 * @创建时间: 2018-05-10
 */
public class TwtJbxx {
    /**
     * ID
     */
    private Long id;
    /**
     * 委托ID
     */
    private String wtid;

    public String getYpbm() {
        return ypbm;
    }

    public void setYpbm(String ypbm) {
        this.ypbm = ypbm;
    }

    /**
     * 样品编码

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
     * 委托类型 001政府  002企业
     */
    private String type;

    /**
     * 合同类型缩写
     */
    private String htlxsx;

    /**
     * 委托单位编码
     */
    private String dwbm;

    /**
     * 委托单位名称
     */
    private String dwmc;

    /**
     * 委托单位英文名称
     */
    private String ywmc;

    /**
     * 省份代码
     */
    private Integer sfdm;

    /**
     * 省份名称
     */
    private String sfmc;

    /**
     * 城市代码
     */
    private Integer csdm;

    /**
     * 城市名称
     */
    private String csmc;

    /**
     * 县级代码
     */
    private Integer xjdm;

    /**
     * 县级名称
     */
    private String xjmc;

    /**
     * 所属街道
     */
    private String jdmc;

    /**
     * 合同来源代码
     */
    private String htlydm;

    /**
     * 取报告方式代码
     */
    private String qbgdm;

    /**
     * 取报告单位
     */
    private String qbgdw;

    /**
     * 取报告地址
     */
    private String qbgdz;

    /**
     * 取报告邮编
     */
    private String qbgyb;

    /**
     * 收件人
     */
    private String sjr;

    /**
     * 操作员
     */
    private String czy;

    /**
     * 预受理编号
     */
    private String yslbh;

    /**
     * 付款单位
     */
    private String fkdw;

    /**
     * 联系邮箱
     */
    private String email;

    /**
     * 联系人名称
     */
    private String lxrmc;

    /**
     * 座机
     */
    private String bgdh;

    /**
     * 移动电话
     */
    private String sjhm;

    /**
     * 传真
     */
    private String cz;

    /**
     * 发票类型代码
     */
    private String fplxdm;

    /**
     * 测试类型代码
     */
    private String cslxdm;

    /**
     * 是否判定(1是0否)
     */
    private Byte ifPd;

    /**
     * 判定依据
     */
    private String pdyj;

    /**
     * 要求采样开始时间
     */
    private Date cykssj;

    /**
     * 要求采样结束时间
     */
    private Date cyjssj;

    /**
     * 报告类别代码
     */
    private String bglbdm;

    /**
     * 资质类型代码
     */
    private String zzlxdm;

    /**
     * 服务类型代码
     */
    private String fwlxdm;

    /**
     * 其他报告要求
     */
    private String qtyq;

    /**
     * 合同生成日期
     */
    private Date htscrq;

    /**
     * 下单日期
     */
    private Date xdrq;

    /**
     * 有效日期
     */
    private Date yxrq;

    /**
     * 执行期限
     */
    private String zxqx;

    /**
     * 最晚报告时间
     */
    private Date zwbgsj;

    /**
     * 业务员名字
     */
    private String ywyxm;

    /**
     * 指定体现生产单位名称
     */
    private String zddwmc;

    /**
     * 指定体现生产单位地址
     */
    private String zddwdz;

    /**
     * 签单日期
     */
    private Date qdrq;

    /**
     * 买样付款类型
     */
    private String myfklxdm;

    /**
     * 买样费
     */
    private BigDecimal myf;

    /**
     * 检测费用(元)
     */
/*    private BigDecimal jcfy;*/

    /**
     * 加急费用(元)
     */
    private BigDecimal jjfy;

    /**
     * 到样日期
     */
    private Date dyrq;

    /**
     * 合同额(元)
     */
    private BigDecimal htje;

    /**
     * 是否体现生产单位代码(1是0否)
     */
    private Byte ifTxscdw;

    /**
     * 是否有照片(1是0否)
     */
    private Byte ifPicture;

    /**
     * 最晚付款日期
     */
    private Date zwfkrq;

    /**
     * 付款方式
     */
    private String fkfsdm;

    /**
     * 样品保存代码
     */
    private String ypbcdm;

    /**
     * 是否抽样(1是0否)
     */
    private Byte ifCy;

    /**
     * 是否合同评审(1是0否)
     */
    private Byte ifHtps;

    /**
     * 是否文件点检(1是0否)
     */
    private Byte ifWjdj;

    /**
     * 是否质控(1是0否)
     */
    private Byte ifZk;

    /**
     * 客户来源
     */
    private String khly;

    /**
     * 是否加急(1是0否)
     */
    private Byte ifJj;

    /**
     * 备注信息
     */
    private String bzxx;

    /**
     * 是否删除
     */
    private Byte scbz;

    /**
     * 录入人员
     */
    private String lrry;

    /**
     * 录入人所在部门代码
     */
    private String bmdm;

    /**
     * 跟新人员
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
    /*
    * 是f否就地
    *
    * */
    private String if_jd;
    /*是否制样*/
    private String if_zy;

    public String getIf_zy() {
        return if_zy;
    }

    public void setIf_zy(String if_zy) {
        this.if_zy = if_zy;
    }

    public String getIf_jd() {
        return if_jd;
    }

    public void setIf_jd(String if_jd) {
        this.if_jd = if_jd;
    }

    /**
     * 样品关联LIST
     */
    private List<Typgl> ypglList;
    

    /**
     * ID
     * @return ID ID
     */
    public Long getId() {
        return id;
    }

    /**
     * ID
     * @param id ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 委托ID
     * @return WTID 委托ID
     */
    public String getWtid() {
        return wtid;
    }

    /**
     * 委托ID
     * @param wtid 委托ID
     */
    public void setWtid(String wtid) {
        this.wtid = wtid == null ? null : wtid.trim();
    }

    /**
     * 合同名称
     * @return HTMC 合同名称
     */
    public String getHtmc() {
        return htmc;
    }

    /**
     * 合同名称
     * @param htmc 合同名称
     */
    public void setHtmc(String htmc) {
        this.htmc = htmc == null ? null : htmc.trim();
    }

    
    
    public String getHtbm() {
		return htbm;
	}

	public void setHtbm(String htbm) {
		this.htbm = htbm;
	}

	/**
     * 委托类型 001政府  002企业
     * @return TYPE 委托类型 001政府  002企业
     */
    public String getType() {
        return type;
    }

    /**
     * 委托类型 001政府  002企业
     * @param type 委托类型 001政府  002企业
     */
    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    /**
     * 合同类型缩写
     * @return HTLXSX 合同类型缩写
     */
    public String getHtlxsx() {
        return htlxsx;
    }

    /**
     * 合同类型缩写
     * @param htlxsx 合同类型缩写
     */
    public void setHtlxsx(String htlxsx) {
        this.htlxsx = htlxsx == null ? null : htlxsx.trim();
    }

    /**
     * 委托单位编码
     * @return DWBM 委托单位编码
     */
    public String getDwbm() {
        return dwbm;
    }

    /**
     * 委托单位编码
     * @param dwbm 委托单位编码
     */
    public void setDwbm(String dwbm) {
        this.dwbm = dwbm == null ? null : dwbm.trim();
    }

    /**
     * 委托单位名称
     * @return DWMC 委托单位名称
     */
    public String getDwmc() {
        return dwmc;
    }

    /**
     * 委托单位名称
     * @param dwmc 委托单位名称
     */
    public void setDwmc(String dwmc) {
        this.dwmc = dwmc == null ? null : dwmc.trim();
    }

    /**
     * 委托单位英文名称
     * @return YWMC 委托单位英文名称
     */
    public String getYwmc() {
        return ywmc;
    }

    /**
     * 委托单位英文名称
     * @param ywmc 委托单位英文名称
     */
    public void setYwmc(String ywmc) {
        this.ywmc = ywmc == null ? null : ywmc.trim();
    }

    /**
     * 省份代码
     * @return SFDM 省份代码
     */
    public Integer getSfdm() {
        return sfdm;
    }

    /**
     * 省份代码
     * @param sfdm 省份代码
     */
    public void setSfdm(Integer sfdm) {
        this.sfdm = sfdm;
    }

    /**
     * 省份名称
     * @return SFMC 省份名称
     */
    public String getSfmc() {
        return sfmc;
    }

    /**
     * 省份名称
     * @param sfmc 省份名称
     */
    public void setSfmc(String sfmc) {
        this.sfmc = sfmc == null ? null : sfmc.trim();
    }

    /**
     * 城市代码
     * @return CSDM 城市代码
     */
    public Integer getCsdm() {
        return csdm;
    }

    /**
     * 城市代码
     * @param csdm 城市代码
     */
    public void setCsdm(Integer csdm) {
        this.csdm = csdm;
    }

    /**
     * 城市名称
     * @return CSMC 城市名称
     */
    public String getCsmc() {
        return csmc;
    }

    /**
     * 城市名称
     * @param csmc 城市名称
     */
    public void setCsmc(String csmc) {
        this.csmc = csmc == null ? null : csmc.trim();
    }

    /**
     * 县级代码
     * @return XJDM 县级代码
     */
    public Integer getXjdm() {
        return xjdm;
    }

    /**
     * 县级代码
     * @param xjdm 县级代码
     */
    public void setXjdm(Integer xjdm) {
        this.xjdm = xjdm;
    }

    /**
     * 县级名称
     * @return XJMC 县级名称
     */
    public String getXjmc() {
        return xjmc;
    }

    /**
     * 县级名称
     * @param xjmc 县级名称
     */
    public void setXjmc(String xjmc) {
        this.xjmc = xjmc == null ? null : xjmc.trim();
    }

    /**
     * 所属街道
     * @return JDMC 所属街道
     */
    public String getJdmc() {
        return jdmc;
    }

    /**
     * 所属街道
     * @param jdmc 所属街道
     */
    public void setJdmc(String jdmc) {
        this.jdmc = jdmc == null ? null : jdmc.trim();
    }

    /**
     * 合同来源代码
     * @return HTLYDM 合同来源代码
     */
    public String getHtlydm() {
        return htlydm;
    }

    /**
     * 合同来源代码
     * @param htlydm 合同来源代码
     */
    public void setHtlydm(String htlydm) {
        this.htlydm = htlydm == null ? null : htlydm.trim();
    }

    /**
     * 取报告方式代码
     * @return QBGDM 取报告方式代码
     */
    public String getQbgdm() {
        return qbgdm;
    }

    /**
     * 取报告方式代码
     * @param qbgdm 取报告方式代码
     */
    public void setQbgdm(String qbgdm) {
        this.qbgdm = qbgdm == null ? null : qbgdm.trim();
    }

    /**
     * 取报告单位
     * @return QBGDW 取报告单位
     */
    public String getQbgdw() {
        return qbgdw;
    }

    /**
     * 取报告单位
     * @param qbgdw 取报告单位
     */
    public void setQbgdw(String qbgdw) {
        this.qbgdw = qbgdw == null ? null : qbgdw.trim();
    }

    /**
     * 取报告地址
     * @return QBGDZ 取报告地址
     */
    public String getQbgdz() {
        return qbgdz;
    }

    /**
     * 取报告地址
     * @param qbgdz 取报告地址
     */
    public void setQbgdz(String qbgdz) {
        this.qbgdz = qbgdz == null ? null : qbgdz.trim();
    }

    /**
     * 取报告邮编
     * @return QBGYB 取报告邮编
     */
    public String getQbgyb() {
        return qbgyb;
    }

    /**
     * 取报告邮编
     * @param qbgyb 取报告邮编
     */
    public void setQbgyb(String qbgyb) {
        this.qbgyb = qbgyb == null ? null : qbgyb.trim();
    }

    /**
     * 收件人
     * @return SJR 收件人
     */
    public String getSjr() {
        return sjr;
    }

    /**
     * 收件人
     * @param sjr 收件人
     */
    public void setSjr(String sjr) {
        this.sjr = sjr == null ? null : sjr.trim();
    }

    /**
     * 操作员
     * @return CZY 操作员
     */
    public String getCzy() {
        return czy;
    }

    /**
     * 操作员
     * @param czy 操作员
     */
    public void setCzy(String czy) {
        this.czy = czy == null ? null : czy.trim();
    }

    /**
     * 预受理编号
     * @return YSLBH 预受理编号
     */
    public String getYslbh() {
        return yslbh;
    }

    /**
     * 预受理编号
     * @param yslbh 预受理编号
     */
    public void setYslbh(String yslbh) {
        this.yslbh = yslbh == null ? null : yslbh.trim();
    }

    /**
     * 付款单位
     * @return FKDW 付款单位
     */
    public String getFkdw() {
        return fkdw;
    }

    /**
     * 付款单位
     * @param fkdw 付款单位
     */
    public void setFkdw(String fkdw) {
        this.fkdw = fkdw == null ? null : fkdw.trim();
    }

    /**
     * 联系邮箱
     * @return EMAIL 联系邮箱
     */
    public String getEmail() {
        return email;
    }

    /**
     * 联系邮箱
     * @param email 联系邮箱
     */
    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    /**
     * 联系人名称
     * @return LXRMC 联系人名称
     */
    public String getLxrmc() {
        return lxrmc;
    }

    /**
     * 联系人名称
     * @param lxrmc 联系人名称
     */
    public void setLxrmc(String lxrmc) {
        this.lxrmc = lxrmc == null ? null : lxrmc.trim();
    }

    /**
     * 座机
     * @return BGDH 座机
     */
    public String getBgdh() {
        return bgdh;
    }

    /**
     * 座机
     * @param bgdh 座机
     */
    public void setBgdh(String bgdh) {
        this.bgdh = bgdh == null ? null : bgdh.trim();
    }

    /**
     * 移动电话
     * @return SJHM 移动电话
     */
    public String getSjhm() {
        return sjhm;
    }

    /**
     * 移动电话
     * @param sjhm 移动电话
     */
    public void setSjhm(String sjhm) {
        this.sjhm = sjhm == null ? null : sjhm.trim();
    }

    /**
     * 传真
     * @return CZ 传真
     */
    public String getCz() {
        return cz;
    }

    /**
     * 传真
     * @param cz 传真
     */
    public void setCz(String cz) {
        this.cz = cz == null ? null : cz.trim();
    }

    /**
     * 发票类型代码
     * @return FPLXDM 发票类型代码
     */
    public String getFplxdm() {
        return fplxdm;
    }

    /**
     * 发票类型代码
     * @param fplxdm 发票类型代码
     */
    public void setFplxdm(String fplxdm) {
        this.fplxdm = fplxdm == null ? null : fplxdm.trim();
    }

    /**
     * 测试类型代码
     * @return CSLXDM 测试类型代码
     */
    public String getCslxdm() {
        return cslxdm;
    }

    /**
     * 测试类型代码
     * @param cslxdm 测试类型代码
     */
    public void setCslxdm(String cslxdm) {
        this.cslxdm = cslxdm == null ? null : cslxdm.trim();
    }

    /**
     * 是否判定(1是0否)
     * @return IF_PD 是否判定(1是0否)
     */
    public Byte getIfPd() {
        return ifPd;
    }

    /**
     * 是否判定(1是0否)
     * @param ifPd 是否判定(1是0否)
     */
    public void setIfPd(Byte ifPd) {
        this.ifPd = ifPd;
    }

    /**
     * 判定依据
     * @return PDYJ 判定依据
     */
    public String getPdyj() {
        return pdyj;
    }

    /**
     * 判定依据
     * @param pdyj 判定依据
     */
    public void setPdyj(String pdyj) {
        this.pdyj = pdyj == null ? null : pdyj.trim();
    }

    /**
     * 要求采样开始时间
     * @return CYKSSJ 要求采样开始时间
     */
    public Date getCykssj() {
        return cykssj;
    }

    /**
     * 要求采样开始时间
     * @param cykssj 要求采样开始时间
     */
    public void setCykssj(Date cykssj) {
        this.cykssj = cykssj;
    }

    /**
     * 要求采样结束时间
     * @return CYJSSJ 要求采样结束时间
     */
    public Date getCyjssj() {
        return cyjssj;
    }

    /**
     * 要求采样结束时间
     * @param cyjssj 要求采样结束时间
     */
    public void setCyjssj(Date cyjssj) {
        this.cyjssj = cyjssj;
    }

    /**
     * 报告类别代码
     * @return BGLBDM 报告类别代码
     */
    public String getBglbdm() {
        return bglbdm;
    }

    /**
     * 报告类别代码
     * @param bglbdm 报告类别代码
     */
    public void setBglbdm(String bglbdm) {
        this.bglbdm = bglbdm == null ? null : bglbdm.trim();
    }

    /**
     * 资质类型代码
     * @return ZZLXDM 资质类型代码
     */
    public String getZzlxdm() {
        return zzlxdm;
    }

    /**
     * 资质类型代码
     * @param zzlxdm 资质类型代码
     */
    public void setZzlxdm(String zzlxdm) {
        this.zzlxdm = zzlxdm == null ? null : zzlxdm.trim();
    }

    /**
     * 服务类型代码
     * @return FWLXDM 服务类型代码
     */
    public String getFwlxdm() {
        return fwlxdm;
    }

    /**
     * 服务类型代码
     * @param fwlxdm 服务类型代码
     */
    public void setFwlxdm(String fwlxdm) {
        this.fwlxdm = fwlxdm == null ? null : fwlxdm.trim();
    }

    /**
     * 其他报告要求
     * @return QTYQ 其他报告要求
     */
    public String getQtyq() {
        return qtyq;
    }

    /**
     * 其他报告要求
     * @param qtyq 其他报告要求
     */
    public void setQtyq(String qtyq) {
        this.qtyq = qtyq == null ? null : qtyq.trim();
    }

    /**
     * 合同生成日期
     * @return HTSCRQ 合同生成日期
     */
    public Date getHtscrq() {
        return htscrq;
    }

    /**
     * 合同生成日期
     * @param htscrq 合同生成日期
     */
    public void setHtscrq(Date htscrq) {
        this.htscrq = htscrq;
    }

    /**
     * 下单日期
     * @return XDRQ 下单日期
     */
    public Date getXdrq() {
        return xdrq;
    }

    /**
     * 下单日期
     * @param xdrq 下单日期
     */
    public void setXdrq(Date xdrq) {
        this.xdrq = xdrq;
    }

    /**
     * 有效日期
     * @return YXRQ 有效日期
     */
    public Date getYxrq() {
        return yxrq;
    }

    /**
     * 有效日期
     * @param yxrq 有效日期
     */
    public void setYxrq(Date yxrq) {
        this.yxrq = yxrq;
    }

    /**
     * 执行期限
     * @return ZXQX 执行期限
     */
    public String getZxqx() {
        return zxqx;
    }

    /**
     * 执行期限
     * @param zxqx 执行期限
     */
    public void setZxqx(String zxqx) {
        this.zxqx = zxqx == null ? null : zxqx.trim();
    }

    /**
     * 最晚报告时间
     * @return ZWBGSJ 最晚报告时间
     */
    public Date getZwbgsj() {
        return zwbgsj;
    }

    /**
     * 最晚报告时间
     * @param zwbgsj 最晚报告时间
     */
    public void setZwbgsj(Date zwbgsj) {
        this.zwbgsj = zwbgsj;
    }

    /**
     * 业务员名字
     * @return YWYXM 业务员名字
     */
    public String getYwyxm() {
        return ywyxm;
    }

    /**
     * 业务员名字
     * @param ywyxm 业务员名字
     */
    public void setYwyxm(String ywyxm) {
        this.ywyxm = ywyxm == null ? null : ywyxm.trim();
    }

    /**
     * 指定体现生产单位名称
     * @return ZDDWMC 指定体现生产单位名称
     */
    public String getZddwmc() {
        return zddwmc;
    }

    /**
     * 指定体现生产单位名称
     * @param zddwmc 指定体现生产单位名称
     */
    public void setZddwmc(String zddwmc) {
        this.zddwmc = zddwmc == null ? null : zddwmc.trim();
    }

    /**
     * 指定体现生产单位地址
     * @return ZDDWDZ 指定体现生产单位地址
     */
    public String getZddwdz() {
        return zddwdz;
    }

    /**
     * 指定体现生产单位地址
     * @param zddwdz 指定体现生产单位地址
     */
    public void setZddwdz(String zddwdz) {
        this.zddwdz = zddwdz == null ? null : zddwdz.trim();
    }

    /**
     * 签单日期
     * @return QDRQ 签单日期
     */
    public Date getQdrq() {
        return qdrq;
    }

    /**
     * 签单日期
     * @param qdrq 签单日期
     */
    public void setQdrq(Date qdrq) {
        this.qdrq = qdrq;
    }

    /**
     * 买样付款类型
     * @return MYFKLXDM 买样付款类型
     */
    public String getMyfklxdm() {
        return myfklxdm;
    }

    /**
     * 买样付款类型
     * @param myfklxdm 买样付款类型
     */
    public void setMyfklxdm(String myfklxdm) {
        this.myfklxdm = myfklxdm == null ? null : myfklxdm.trim();
    }

    /**
     * 买样费
     * @return MYF 买样费
     */
    public BigDecimal getMyf() {
        return myf;
    }

    /**
     * 买样费
     * @param myf 买样费
     */
    public void setMyf(BigDecimal myf) {
        this.myf = myf;
    }

    /**
     * 检测费用(元)
     * @return JCFY 检测费用(元)
     */
   /* public BigDecimal getJcfy() {
        return jcfy;
    }*/

    /**
     * 检测费用(元)
     * @param jcfy 检测费用(元)
     */

    /**public void setJcfy(BigDecimal jcfy) {
     this.jcfy = jcfy;
     }

     * 加急费用(元)
     * @return JJFY 加急费用(元)
     */
    public BigDecimal getJjfy() {
        return jjfy;
    }

    /**
     * 加急费用(元)
     * @param jjfy 加急费用(元)
     */
    public void setJjfy(BigDecimal jjfy) {
        this.jjfy = jjfy;
    }

    /**
     * 到样日期
     * @return DYRQ 到样日期
     */
    public Date getDyrq() {
        return dyrq;
    }

    /**
     * 到样日期
     * @param dyrq 到样日期
     */
    public void setDyrq(Date dyrq) {
        this.dyrq = dyrq;
    }

    /**
     * 合同额(元)
     * @return HTJE 合同额(元)
     */
    public BigDecimal getHtje() {
        return htje;
    }

    /**
     * 合同额(元)
     * @param htje 合同额(元)
     */
    public void setHtje(BigDecimal htje) {
        this.htje = htje;
    }

    /**
     * 是否体现生产单位代码(1是0否)
     * @return IF_TXSCDW 是否体现生产单位代码(1是0否)
     */
    public Byte getIfTxscdw() {
        return ifTxscdw;
    }

    /**
     * 是否体现生产单位代码(1是0否)
     * @param ifTxscdw 是否体现生产单位代码(1是0否)
     */
    public void setIfTxscdw(Byte ifTxscdw) {
        this.ifTxscdw = ifTxscdw;
    }

    /**
     * 是否有照片(1是0否)
     * @return IF_PICTURE 是否有照片(1是0否)
     */
    public Byte getIfPicture() {
        return ifPicture;
    }

    /**
     * 是否有照片(1是0否)
     * @param ifPicture 是否有照片(1是0否)
     */
    public void setIfPicture(Byte ifPicture) {
        this.ifPicture = ifPicture;
    }

    /**
     * 最晚付款日期
     * @return ZWFKRQ 最晚付款日期
     */
    public Date getZwfkrq() {
        return zwfkrq;
    }

    /**
     * 最晚付款日期
     * @param zwfkrq 最晚付款日期
     */
    public void setZwfkrq(Date zwfkrq) {
        this.zwfkrq = zwfkrq;
    }

    /**
     * 付款方式
     * @return FKFSDM 付款方式
     */
    public String getFkfsdm() {
        return fkfsdm;
    }

    /**
     * 付款方式
     * @param fkfsdm 付款方式
     */
    public void setFkfsdm(String fkfsdm) {
        this.fkfsdm = fkfsdm == null ? null : fkfsdm.trim();
    }

    /**
     * 样品保存代码
     * @return YPBCDM 样品保存代码
     */
    public String getYpbcdm() {
        return ypbcdm;
    }

    /**
     * 样品保存代码
     * @param ypbcdm 样品保存代码
     */
    public void setYpbcdm(String ypbcdm) {
        this.ypbcdm = ypbcdm == null ? null : ypbcdm.trim();
    }

    /**
     * 是否抽样(1是0否)
     * @return IF_CY 是否抽样(1是0否)
     */
    public Byte getIfCy() {
        return ifCy;
    }

    /**
     * 是否抽样(1是0否)
     * @param ifCy 是否抽样(1是0否)
     */
    public void setIfCy(Byte ifCy) {
        this.ifCy = ifCy;
    }

    /**
     * 是否合同评审(1是0否)
     * @return IF_HTPS 是否合同评审(1是0否)
     */
    public Byte getIfHtps() {
        return ifHtps;
    }

    /**
     * 是否合同评审(1是0否)
     * @param ifHtps 是否合同评审(1是0否)
     */
    public void setIfHtps(Byte ifHtps) {
        this.ifHtps = ifHtps;
    }

    /**
     * 是否文件点检(1是0否)
     * @return IF_WJDJ 是否文件点检(1是0否)
     */
    public Byte getIfWjdj() {
        return ifWjdj;
    }

    /**
     * 是否文件点检(1是0否)
     * @param ifWjdj 是否文件点检(1是0否)
     */
    public void setIfWjdj(Byte ifWjdj) {
        this.ifWjdj = ifWjdj;
    }

    /**
     * 是否质控(1是0否)
     * @return IF_ZK 是否质控(1是0否)
     */
    public Byte getIfZk() {
        return ifZk;
    }

    /**
     * 是否质控(1是0否)
     * @param ifZk 是否质控(1是0否)
     */
    public void setIfZk(Byte ifZk) {
        this.ifZk = ifZk;
    }

    /**
     * 客户来源
     * @return KHLY 客户来源
     */
    public String getKhly() {
        return khly;
    }

    /**
     * 客户来源
     * @param khly 客户来源
     */
    public void setKhly(String khly) {
        this.khly = khly == null ? null : khly.trim();
    }

    /**
     * 是否加急(1是0否)
     * @return IF_JJ 是否加急(1是0否)
     */
    public Byte getIfJj() {
        return ifJj;
    }

    /**
     * 是否加急(1是0否)
     * @param ifJj 是否加急(1是0否)
     */
    public void setIfJj(Byte ifJj) {
        this.ifJj = ifJj;
    }

    /**
     * 备注信息
     * @return BZXX 备注信息
     */
    public String getBzxx() {
        return bzxx;
    }

    /**
     * 备注信息
     * @param bzxx 备注信息
     */
    public void setBzxx(String bzxx) {
        this.bzxx = bzxx == null ? null : bzxx.trim();
    }

    /**
     * 是否删除
     * @return SCBZ 是否删除
     */
    public Byte getScbz() {
        return scbz;
    }

    /**
     * 是否删除
     * @param scbz 是否删除
     */
    public void setScbz(Byte scbz) {
        this.scbz = scbz;
    }

    /**
     * 录入人员
     * @return LRRY 录入人员
     */
    public String getLrry() {
        return lrry;
    }

    /**
     * 录入人员
     * @param lrry 录入人员
     */
    public void setLrry(String lrry) {
        this.lrry = lrry == null ? null : lrry.trim();
    }

    /**
     * 录入人所在部门代码
     * @return BMDM 录入人所在部门代码
     */
    public String getBmdm() {
        return bmdm;
    }

    /**
     * 录入人所在部门代码
     * @param bmdm 录入人所在部门代码
     */
    public void setBmdm(String bmdm) {
        this.bmdm = bmdm == null ? null : bmdm.trim();
    }

    /**
     * 跟新人员
     * @return GXRY 跟新人员
     */
    public String getGxry() {
        return gxry;
    }

    /**
     * 跟新人员
     * @param gxry 跟新人员
     */
    public void setGxry(String gxry) {
        this.gxry = gxry == null ? null : gxry.trim();
    }
   

	/**
     * 删除人员
     * @return SCRY 删除人员
     */
    public String getScry() {
        return scry;
    }

    /**
     * 删除人员
     * @param scry 删除人员
     */
    public void setScry(String scry) {
        this.scry = scry == null ? null : scry.trim();
    }

    /**
     * 录入日期
     * @return LRRQ 录入日期
     */
    public Date getLrrq() {
        return lrrq;
    }

    /**
     * 录入日期
     * @param lrrq 录入日期
     */
    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    /**
     * 更新日期
     * @return GXRQ 更新日期
     */
    public Date getGxrq() {
        return gxrq;
    }

    /**
     * 更新日期
     * @param gxrq 更新日期
     */
    public void setGxrq(Date gxrq) {
        this.gxrq = gxrq;
    }

    /**
     * 删除日期
     * @return SCRQ 删除日期
     */
    public Date getScrq() {
        return scrq;
    }

    /**
     * 删除日期
     * @param scrq 删除日期
     */
    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }

	public List<Typgl> getYpglList() {
		return ypglList;
	}

	public void setYpglList(List<Typgl> ypglList) {
		this.ypglList = ypglList;
	}
    
    
}