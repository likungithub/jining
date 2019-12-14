package com.xinhai.caiyun.systemmanager.api;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 平台任务基本信息表(PT_RWGL_JBXX)
 *
 * @author bianj
 * @version 1.0.0 2017-10-25
 */
public class Rwgljbxx implements java.io.Serializable {
    /** 版本号 */
    private static final long serialVersionUID = -2759514923325564541L;

    private String sfxmdm;
    private String sfxmmc;


    public String getSfxmdm() {
        return sfxmdm;
    }

    public void setSfxmdm(String sfxmdm) {
        this.sfxmdm = sfxmdm;
    }

    public String getSfxmmc() {
        return sfxmmc;
    }

    public void setSfxmmc(String sfxmmc) {
        this.sfxmmc = sfxmmc;
    }

    private String yxkhbm;

    public String getYxkhbm() {
        return yxkhbm;
    }

    public void setYxkhbm(String yxkhbm) {
        this.yxkhbm = yxkhbm;
    }

    private String FZR_DM ;
    private String FQR_DM ;
    private String ZXR_DM ;

    public String getFZR_DM() {
        return FZR_DM;
    }

    public void setFZR_DM(String FZR_DM) {
        this.FZR_DM = FZR_DM;
    }

    public String getFQR_DM() {
        return FQR_DM;
    }

    public void setFQR_DM(String FQR_DM) {
        this.FQR_DM = FQR_DM;
    }

    public String getZXR_DM() {
        return ZXR_DM;
    }

    public void setZXR_DM(String ZXR_DM) {
        this.ZXR_DM = ZXR_DM;
    }

    private String ygtx;

    private String zxrydmmc;

    private String dqbzmc;

    public String getDqbzmc() {
        return dqbzmc;
    }

    public String getYgtx() {
        return ygtx;
    }

    public void setYgtx(String ygtx) {
        this.ygtx = ygtx;
    }

    public void setDqbzmc(String dqbzmc) {
        this.dqbzmc = dqbzmc;
    }

    public String getZxrydmmc() {
        return zxrydmmc;
    }

    public void setZxrydmmc(String zxrydmmc) {
        this.zxrydmmc = zxrydmmc;
    }

    private String sfjl;

    public String getSfjl() {
        return sfjl;
    }

    public void setSfjl(String sfjl) {
        this.sfjl = sfjl;
    }

    private String zxry;

    public String getZxry() {
        return zxry;
    }

    public void setZxry(String zxry) {
        this.zxry = zxry;
    }

    private String bmdm; //录入人部门代码

    public String getBmdm() {
        return bmdm;
    }

    public void setBmdm(String bmdm) {
        this.bmdm = bmdm;
    }

    public String getDljgbm() {
        return dljgbm;
    }

    public void setDljgbm(String dljgbm) {
        this.dljgbm = dljgbm;
    }

    /*
    * 代理机构编码
    * */
    private String dljgbm;



    /*
    * 数据来源 1业务受理
    * */
    private  String sjly;

    private String khbm;

    private String khmc;

    private String sjhm;


    /*
    * 合同编号
    * */
    private String htbh;

    public String getSjly() {
        return sjly;
    }

    public void setSjly(String sjly) {
        this.sjly = sjly;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }

    public String getKhmc() {
        return khmc;
    }

    public void setKhmc(String khmc) {
        this.khmc = khmc;
    }

    public String getSjhm() {
        return sjhm;
    }

    public void setSjhm(String sjhm) {
        this.sjhm = sjhm;
    }

    public String getHtbh() {
        return htbh;
    }

    public void setHtbh(String htbh) {
        this.htbh = htbh;
    }

    /*
        * 办理状态
        * */
    private String blzt;

    public String getRwwcl() {
        return rwwcl;
    }

    public void setRwwcl(String rwwcl) {
        this.rwwcl = rwwcl;
    }

    /*
        * 任务完成率
        * */
    private String rwwcl;

    /*
    * 剩余天数
    * */
    private String syts;


    public String getBlztmc() {
        return blztmc;
    }

    public void setBlztmc(String blztmc) {
        this.blztmc = blztmc;
    }



    public String getBlzt() {
        return blzt;
    }

    public void setBlzt(String blzt) {

        //001已完成、002进行中（默认）、003已取消、004以延迟、005暂停中、006未开始
        switch (blzt){
            //001未开始（默认）、002进行中、003已完成
            case "001":{
                setBlztmc("已完成");
                break;
            }
            case "002":{
                setBlztmc("进行中");
                break;
            }
            case "003":{
                setBlztmc("已取消");
                break;
            }
            case "004":{
                setBlztmc("已延迟");
                break;
            }
            case "005":{
                setBlztmc("暂停中");
                break;
            }
            case "006":{
                setBlztmc("未开始");
                break;
            }
        }
        this.blzt = blzt;
    }

    public String getSyts() {
        return syts;
    }

    public void setSyts(String syts) {
        this.syts = syts;
    }

    /*
        * 备注信息
        * */
    private String bzxx;

    /*
    * 创建时间
    * */
    private Date cjsj;


    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    public Date getCjsj() {
        return cjsj;
    }

    public void setCjsj(Date cjsj) {
        this.cjsj = cjsj;
    }

    /**
     * ID，自增列
     */
    private Long id;

    /**
     * 任务ID
     */
    private String rwid;

    /**
     * 任务名称
     */
    private String rwmc;

    /**
     * 负责人dm
     */
    private String fzrDm;

    /**
     * 负责人
     */
    private String fzrMc;

    /**
     * 负责人部门dm
     */
    private String fzrBmdm;

    /**
     * 负责人部门名称
     */
    private String fzrBmmc;

    /**
     * 发起人dm
     */
    private String fqrDm;

    /**
     * 发起人
     */
    private String fqrMc;

    /**
     * 发起人部门dm
     */
    private String fqrBmdm;

    /**
     * 发起人部门名称
     */
    private String fqrBmmc;

    /**
     * 紧急程度 001
     */
    private String jjcd;

    /**
     * 开始时间
     */
    private Date kssj;

    /**
     * 结束时间
     */
    private Date jssj;

    /**
     * 流程ID
     */
    private String lcid;

    /**
     * 任务提醒
     */
    private String rwtx;

    /**
     * 流程步骤数
     */
    private Byte lcbz;

    /**
     * 当前步骤
     */
    private Byte dqbz;

    /**
     * 是否末环节
     */
    private Boolean mhjbz;

    /**
     * 删除标志1已删除0未删除
     */
    private Boolean scbz;

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

    /**
     * 执行人员集合
     */
    private String zxryList;

    public String getZxryList() {
        return zxryList;
    }

    public void setZxryList(String zxryList) {
        this.zxryList = zxryList;
    }

    /**
     * ID，自增列
     * @return ID ID，自增列
     */
    public Long getId() {
        return id;
    }

    /**
     * ID，自增列
     * @param id ID，自增列
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 任务ID
     * @return RWID 任务ID
     */
    public String getRwid() {
        return rwid;
    }

    /**
     * 任务ID
     * @param rwid 任务ID
     */
    public void setRwid(String rwid) {
        this.rwid = rwid == null ? null : rwid.trim();
    }

    /**
     * 任务名称
     * @return RWMC 任务名称
     */
    public String getRwmc() {
        return rwmc;
    }

    /**
     * 任务名称
     * @param rwmc 任务名称
     */
    public void setRwmc(String rwmc) {
        this.rwmc = rwmc == null ? null : rwmc.trim();
    }

    /**
     * 负责人dm
     * @return FZR_DM 负责人dm
     */
    public String getFzrDm() {
        return fzrDm;
    }

    /**
     * 负责人dm
     * @param fzrDm 负责人dm
     */
    public void setFzrDm(String fzrDm) {
        this.fzrDm = fzrDm == null ? null : fzrDm.trim();
    }

    /**
     * 负责人
     * @return FZR_MC 负责人
     */
    public String getFzrMc() {
        return fzrMc;
    }

    /**
     * 负责人
     * @param fzrMc 负责人
     */
    public void setFzrMc(String fzrMc) {
        this.fzrMc = fzrMc == null ? null : fzrMc.trim();
    }

    /**
     * 负责人部门dm
     * @return FZR_BMDM 负责人部门dm
     */
    public String getFzrBmdm() {
        return fzrBmdm;
    }

    /**
     * 负责人部门dm
     * @param fzrBmdm 负责人部门dm
     */
    public void setFzrBmdm(String fzrBmdm) {
        this.fzrBmdm = fzrBmdm == null ? null : fzrBmdm.trim();
    }

    /**
     * 负责人部门名称
     * @return FZR_BMMC 负责人部门名称
     */
    public String getFzrBmmc() {
        return fzrBmmc;
    }

    /**
     * 负责人部门名称
     * @param fzrBmmc 负责人部门名称
     */
    public void setFzrBmmc(String fzrBmmc) {
        this.fzrBmmc = fzrBmmc == null ? null : fzrBmmc.trim();
    }

    /**
     * 发起人dm
     * @return FQR_DM 发起人dm
     */
    public String getFqrDm() {
        return fqrDm;
    }

    /**
     * 发起人dm
     * @param fqrDm 发起人dm
     */
    public void setFqrDm(String fqrDm) {
        this.fqrDm = fqrDm == null ? null : fqrDm.trim();
    }

    /**
     * 发起人
     * @return FQR_MC 发起人
     */
    public String getFqrMc() {
        return fqrMc;
    }

    /**
     * 发起人
     * @param fqrMc 发起人
     */
    public void setFqrMc(String fqrMc) {
        this.fqrMc = fqrMc == null ? null : fqrMc.trim();
    }

    /**
     * 发起人部门dm
     * @return FQR_BMDM 发起人部门dm
     */
    public String getFqrBmdm() {
        return fqrBmdm;
    }

    /**
     * 发起人部门dm
     * @param fqrBmdm 发起人部门dm
     */
    public void setFqrBmdm(String fqrBmdm) {
        this.fqrBmdm = fqrBmdm == null ? null : fqrBmdm.trim();
    }

    /**
     * 发起人部门名称
     * @return FQR_BMMC 发起人部门名称
     */
    public String getFqrBmmc() {
        return fqrBmmc;
    }

    /**
     * 发起人部门名称
     * @param fqrBmmc 发起人部门名称
     */
    public void setFqrBmmc(String fqrBmmc) {
        this.fqrBmmc = fqrBmmc == null ? null : fqrBmmc.trim();
    }

    /**
     * 紧急程度 001
     * @return JJCD 紧急程度 001
     */
    public String getJjcd() {
        //紧急程度001一般002重要003紧急
        switch(jjcd){
            case "001":{
                setJjcdmc("一般");
                break;
            }
            case "002":{
                setJjcdmc("重要");
                break;
            }
            case "003":{
                setJjcdmc("紧急");
                break;
            }
        }
        return jjcd;
    }

    /**
     * 紧急程度 001
     * @param jjcd 紧急程度 001
     */
    public void setJjcd(String jjcd) {
        this.jjcd = jjcd == null ? null : jjcd.trim();
    }

    /**
     * 开始时间
     * @return KSSJ 开始时间
     */
    public Date getKssj() {
        return kssj;
    }

    /**
     * 开始时间
     * @param kssj 开始时间
     */
    public void setKssj(Date kssj) {
        this.kssj = kssj;
    }

    /**
     * 结束时间
     * @return JSSJ 结束时间
     */
    public Date getJssj() {
        return jssj;
    }

    /**
     * 结束时间
     * @param jssj 结束时间
     */
    public void setJssj(Date jssj) {
      /*  try {
            Date now = new Date();
            SimpleDateFormat simpleFormat = new SimpleDateFormat("yyyy-MM-dd");
            String toDate = simpleFormat.format(jssj);
            long from = now.getTime();
            long to = simpleFormat.parse(toDate).getTime();
            int days = (int) ((to - from) / (1000 * 60 * 60 * 24));
            days++;
            this.setSyts(""+days);
        }catch(Exception e){}
        */
        this.jssj = jssj;
    }

    /**
     * 流程ID
     * @return LCID 流程ID
     */
    public String getLcid() {
        return lcid;
    }

    /**
     * 流程ID
     * @param lcid 流程ID
     */
    public void setLcid(String lcid) {
        this.lcid = lcid == null ? null : lcid.trim();
    }

    /**
     * 任务提醒
     * @return RWTX 任务提醒
     */
    public String getRwtx() {
        return rwtx;
    }

    /**
     * 任务提醒
     * @param rwtx 任务提醒
     */
    public void setRwtx(String rwtx) {
        this.rwtx = rwtx == null ? null : rwtx.trim();
    }

    /**
     * 流程步骤数
     * @return LCBZ 流程步骤数
     */
    public Byte getLcbz() {
        return lcbz;
    }

    /**
     * 流程步骤数
     * @param lcbz 流程步骤数
     */
    public void setLcbz(Byte lcbz) {
        this.lcbz = lcbz;
    }

    /**
     * 当前步骤
     * @return DQBZ 当前步骤
     */
    public Byte getDqbz() {
        return dqbz;
    }

    /**
     * 当前步骤
     * @param dqbz 当前步骤
     */
    public void setDqbz(Byte dqbz) {
        this.dqbz = dqbz;
    }

    /**
     * 是否末环节
     * @return MHJBZ 是否末环节
     */
    public Boolean getMhjbz() {
        return mhjbz;
    }

    /**
     * 是否末环节
     * @param mhjbz 是否末环节
     */
    public void setMhjbz(Boolean mhjbz) {
        this.mhjbz = mhjbz;
    }

    /**
     * 删除标志1已删除0未删除
     * @return SCBZ 删除标志1已删除0未删除
     */
    public Boolean getScbz() {
        return scbz;
    }

    /**
     * 删除标志1已删除0未删除
     * @param scbz 删除标志1已删除0未删除
     */
    public void setScbz(Boolean scbz) {
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
     * 更新人员
     * @return GXRY 更新人员
     */
    public String getGxry() {
        return gxry;
    }

    /**
     * 更新人员
     * @param gxry 更新人员
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

    /*
       * 办理状态名称
       * */
    private  String blztmc;

    public String getJjcdmc() {
        return jjcdmc;
    }

    public void setJjcdmc(String jjcdmc) {
        this.jjcdmc = jjcdmc;
    }

    /**
     *紧急程度名称
     */

    private String jjcdmc;
}