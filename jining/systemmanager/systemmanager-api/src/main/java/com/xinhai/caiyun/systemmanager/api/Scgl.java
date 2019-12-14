package com.xinhai.caiyun.systemmanager.api;

import java.io.Serializable;

/**
 * 省抽管理实体类
 */
public class Scgl implements Serializable {
    private String cydbh;//抽样单编号
    private String bgfl1;//报告分类1
    private String bgsbh;//报告书编号
    private String bgfl;//报告分类
    private String wtdw;//委托单位
    private String bgrq;//报告日期
    private String zjr;//主键人
    private String bgqfr;//报告签发人
    private String jyjl;//检验结论
    private String jybgbz;//检验报告备注
    private String lxr;//联系人
    private String dh;//电话
    private String dzyx;//电子邮箱
    private String dz;//地址
    private String yb;//邮编
    private String cz;//传真
    private String tbr;//填报人
    private String tbrq;//填报日期
    private String tbrdh;//填报人电话、
    private String tbrdzyx;//填报人电子邮箱
    private String jyxmid;//检验报告id
    private String jyxm;//检验项目
    private String jyjg;//检验结果
    private String jgdw; //检验结果单位
    private String bzxz;//标准限值
    private String bzxzdw;//标准限值单位
    private String jgpd;//结果判定
    private String sm;//说明
    private String jyyj;//检验依据
    private String pdyj;//判定依据
    private String ffjcx;//方法检出限
    private String ffjcxdw;//方法检出限单位
    private String bzffjcx;//标准方法检出限
    private String bzffjcxdw;//标准方法检出限单位
    private String bzzxyxx;//标准最小允许限
    private String bzzxyxxdw;//标准最小允许限单位
    private String bzzdyxx;//标准最大允许限
    private String bzzdyxxdw;//标准最大允许限单位
    private String zxyxx;//最小允许限
    private String zxyxxdw;//最小允许限单位
    private String zdyxx;//最大允许限
    private String zdyxxdw;//最大允许限单位
    private String spflid;//食品分类id
    private String rwly;//任务来源
    private String rwlx;//任务类型
    private String cyrq;//抽样日期
    private String cydd;//抽样地点
    private String ypmc;//样品名称
    private String cqzl;//产品种类
    private String yply;//样品来源
    private String cyfs;//抽样方式
    private String ypsx;//样品属性
    private String yplx;//样品类型
    private String sb;//商标
    private String ypph;//样品批号
    private String scrq;//生产日期
    private String bzq;//保质期
    private String zxbz;//执行标准
    private String ggxh;//规格型号
    private String zldj;//质量等级
    private String scxkzbh;//生产许可证编号
    private String dj;//单价
    private String if_ck;//是否出口
    private String cyjs;//抽样基数
    private String cysl;//抽样数量
    private String cysldw;//抽样数量单位
    private String bysl;//备样数量
    private String bzfl;//包装分类
    private String ypxt;//样品形态
    private String ypcctj;//样品储存条件
    private String cyypbz;//抽样样品包装
    private String jsypdz;//寄送样品地址
    private String jsypjzrq;//寄送样品截止日期
    private String bcydwmc;//被抽样单位名称
    private String qylx;//区域类型
    private String bcydwdz;//被抽样单位地址
    private String bcydwfrdb;//被抽样单位法人代表
    private String bcydwnxxe;//被抽样单位年销售额
    private String bcydwyyzzh;//被抽样单位营业执照号
    private String bcydwlxr;//被抽样单位联系人
    private String bcydwdh;//被抽样单位电话
    private String bcydwcz;//被抽样单位传真
    private String bcydwyb;//被抽样单位邮编
    private String bssczmc;//标示生产者名称
    private String bssczdz;//标示生产者地址
    private String bssczlxr;//标示生产者联系人
    private String bssczlxdh;//标示生产联系电话
    private String cydwmc;//抽样单位名称
    private String cydwdz;//抽样单位地址
    private String cydwlxr;//抽样单位联系人
    private String cydwdh;//抽样单位电话
    private String cydwcz;//抽样单位传真
    private String cydwyb;//抽样单位邮编
    private String cyr;//抽样人
    private String bz;//备注
    private String cyhj;//抽样环节
    private String bcydwqygm;//被抽样单位企业规模
    private String bcydwssqy;//被抽样单位所属区域
    private String cpzl;//产品种类

    public String getCpzl() {
        return cpzl;
    }

    public void setCpzl(String cpzl) {
        this.cpzl = cpzl;
    }
    public String getCydbh() {
        return cydbh;
    }

    public void setCydbh(String cydbh) {
        this.cydbh = cydbh;
    }

    public String getBgfl1() {
        return bgfl1;
    }

    public void setBgfl1(String bgfl1) {
        this.bgfl1 = bgfl1;
    }

    public String getBgsbh() {
        return bgsbh;
    }

    public void setBgsbh(String bgsbh) {
        this.bgsbh = bgsbh;
    }

    public String getBgfl() {
        return bgfl;
    }

    public void setBgfl(String bgfl) {
        this.bgfl = bgfl;
    }

    public String getWtdw() {
        return wtdw;
    }

    public void setWtdw(String wtdw) {
        this.wtdw = wtdw;
    }

    public String getBgrq() {
        return bgrq;
    }

    public void setBgrq(String bgrq) {
        this.bgrq = bgrq;
    }

    public String getZjr() {
        return zjr;
    }

    public void setZjr(String zjr) {
        this.zjr = zjr;
    }

    public String getBgqfr() {
        return bgqfr;
    }

    public void setBgqfr(String bgqfr) {
        this.bgqfr = bgqfr;
    }

    public String getJyjl() {
        return jyjl;
    }

    public void setJyjl(String jyjl) {
        this.jyjl = jyjl;
    }

    public String getJybgbz() {
        return jybgbz;
    }

    public void setJybgbz(String jybgbz) {
        this.jybgbz = jybgbz;
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

    public String getDzyx() {
        return dzyx;
    }

    public void setDzyx(String dzyx) {
        this.dzyx = dzyx;
    }

    public String getDz() {
        return dz;
    }

    public void setDz(String dz) {
        this.dz = dz;
    }

    public String getYb() {
        return yb;
    }

    public void setYb(String yb) {
        this.yb = yb;
    }

    public String getCz() {
        return cz;
    }

    public void setCz(String cz) {
        this.cz = cz;
    }

    public String getTbr() {
        return tbr;
    }

    public void setTbr(String tbr) {
        this.tbr = tbr;
    }

    public String getTbrq() {
        return tbrq;
    }

    public void setTbrq(String tbrq) {
        this.tbrq = tbrq;
    }

    public String getTbrdh() {
        return tbrdh;
    }

    public void setTbrdh(String tbrdh) {
        this.tbrdh = tbrdh;
    }

    public String getTbrdzyx() {
        return tbrdzyx;
    }

    public void setTbrdzyx(String tbrdzyx) {
        this.tbrdzyx = tbrdzyx;
    }

    public String getJyxmid() {
        return jyxmid;
    }

    public void setJyxmid(String jyxmid) {
        this.jyxmid = jyxmid;
    }

    public String getJyxm() {
        return jyxm;
    }

    public void setJyxm(String jyxm) {
        this.jyxm = jyxm;
    }

    public String getJyjg() {
        return jyjg;
    }

    public void setJyjg(String jyjg) {
        this.jyjg = jyjg;
    }

    public String getJgdw() {
        return jgdw;
    }

    public void setJgdw(String jgdw) {
        this.jgdw = jgdw;
    }

    public String getBzxz() {
        return bzxz;
    }

    public void setBzxz(String bzxz) {
        this.bzxz = bzxz;
    }

    public String getBzxzdw() {
        return bzxzdw;
    }

    public void setBzxzdw(String bzxzdw) {
        this.bzxzdw = bzxzdw;
    }

    public String getJgpd() {
        return jgpd;
    }

    public void setJgpd(String jgpd) {
        this.jgpd = jgpd;
    }

    public String getSm() {
        return sm;
    }

    public void setSm(String sm) {
        this.sm = sm;
    }

    public String getJyyj() {
        return jyyj;
    }

    public void setJyyj(String jyyj) {
        this.jyyj = jyyj;
    }

    public String getPdyj() {
        return pdyj;
    }

    public void setPdyj(String pdyj) {
        this.pdyj = pdyj;
    }

    public String getFfjcx() {
        return ffjcx;
    }

    public void setFfjcx(String ffjcx) {
        this.ffjcx = ffjcx;
    }

    public String getFfjcxdw() {
        return ffjcxdw;
    }

    public void setFfjcxdw(String ffjcxdw) {
        this.ffjcxdw = ffjcxdw;
    }

    public String getBzffjcx() {
        return bzffjcx;
    }

    public void setBzffjcx(String bzffjcx) {
        this.bzffjcx = bzffjcx;
    }

    public String getBzffjcxdw() {
        return bzffjcxdw;
    }

    public void setBzffjcxdw(String bzffjcxdw) {
        this.bzffjcxdw = bzffjcxdw;
    }

    public String getBzzxyxx() {
        return bzzxyxx;
    }

    public void setBzzxyxx(String bzzxyxx) {
        this.bzzxyxx = bzzxyxx;
    }

    public String getBzzxyxxdw() {
        return bzzxyxxdw;
    }

    public void setBzzxyxxdw(String bzzxyxxdw) {
        this.bzzxyxxdw = bzzxyxxdw;
    }

    public String getBzzdyxx() {
        return bzzdyxx;
    }

    public void setBzzdyxx(String bzzdyxx) {
        this.bzzdyxx = bzzdyxx;
    }

    public String getBzzdyxxdw() {
        return bzzdyxxdw;
    }

    public void setBzzdyxxdw(String bzzdyxxdw) {
        this.bzzdyxxdw = bzzdyxxdw;
    }

    public String getZxyxx() {
        return zxyxx;
    }

    public void setZxyxx(String zxyxx) {
        this.zxyxx = zxyxx;
    }

    public String getZxyxxdw() {
        return zxyxxdw;
    }

    public void setZxyxxdw(String zxyxxdw) {
        this.zxyxxdw = zxyxxdw;
    }

    public String getZdyxx() {
        return zdyxx;
    }

    public void setZdyxx(String zdyxx) {
        this.zdyxx = zdyxx;
    }

    public String getZdyxxdw() {
        return zdyxxdw;
    }

    public void setZdyxxdw(String zdyxxdw) {
        this.zdyxxdw = zdyxxdw;
    }

    public String getSpflid() {
        return spflid;
    }

    public void setSpflid(String spflid) {
        this.spflid = spflid;
    }

    public String getRwly() {
        return rwly;
    }

    public void setRwly(String rwly) {
        this.rwly = rwly;
    }

    public String getRwlx() {
        return rwlx;
    }

    public void setRwlx(String rwlx) {
        this.rwlx = rwlx;
    }

    public String getCyrq() {
        return cyrq;
    }

    public void setCyrq(String cyrq) {
        this.cyrq = cyrq;
    }

    public String getCydd() {
        return cydd;
    }

    public void setCydd(String cydd) {
        this.cydd = cydd;
    }

    public String getYpmc() {
        return ypmc;
    }

    public void setYpmc(String ypmc) {
        this.ypmc = ypmc;
    }

    public String getCqzl() {
        return cqzl;
    }

    public void setCqzl(String cqzl) {
        this.cqzl = cqzl;
    }

    public String getYply() {
        return yply;
    }

    public void setYply(String yply) {
        this.yply = yply;
    }

    public String getCyfs() {
        return cyfs;
    }

    public void setCyfs(String cyfs) {
        this.cyfs = cyfs;
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

    public String getSb() {
        return sb;
    }

    public void setSb(String sb) {
        this.sb = sb;
    }

    public String getYpph() {
        return ypph;
    }

    public void setYpph(String ypph) {
        this.ypph = ypph;
    }

    public String getScrq() {
        return scrq;
    }

    public void setScrq(String scrq) {
        this.scrq = scrq;
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

    public String getGgxh() {
        return ggxh;
    }

    public void setGgxh(String ggxh) {
        this.ggxh = ggxh;
    }

    public String getZldj() {
        return zldj;
    }

    public void setZldj(String zldj) {
        this.zldj = zldj;
    }

    public String getScxkzbh() {
        return scxkzbh;
    }

    public void setScxkzbh(String scxkzbh) {
        this.scxkzbh = scxkzbh;
    }

    public String getDj() {
        return dj;
    }

    public void setDj(String dj) {
        this.dj = dj;
    }

    public String getIf_ck() {
        return if_ck;
    }

    public void setIf_ck(String if_ck) {
        this.if_ck = if_ck;
    }

    public String getCyjs() {
        return cyjs;
    }

    public void setCyjs(String cyjs) {
        this.cyjs = cyjs;
    }

    public String getCysl() {
        return cysl;
    }

    public void setCysl(String cysl) {
        this.cysl = cysl;
    }

    public String getCysldw() {
        return cysldw;
    }

    public void setCysldw(String cysldw) {
        this.cysldw = cysldw;
    }

    public String getBysl() {
        return bysl;
    }

    public void setBysl(String bysl) {
        this.bysl = bysl;
    }

    public String getBzfl() {
        return bzfl;
    }

    public void setBzfl(String bzfl) {
        this.bzfl = bzfl;
    }

    public String getYpxt() {
        return ypxt;
    }

    public void setYpxt(String ypxt) {
        this.ypxt = ypxt;
    }

    public String getYpcctj() {
        return ypcctj;
    }

    public void setYpcctj(String ypcctj) {
        this.ypcctj = ypcctj;
    }

    public String getCyypbz() {
        return cyypbz;
    }

    public void setCyypbz(String cyypbz) {
        this.cyypbz = cyypbz;
    }

    public String getJsypdz() {
        return jsypdz;
    }

    public void setJsypdz(String jsypdz) {
        this.jsypdz = jsypdz;
    }

    public String getJsypjzrq() {
        return jsypjzrq;
    }

    public void setJsypjzrq(String jsypjzrq) {
        this.jsypjzrq = jsypjzrq;
    }

    public String getBcydwmc() {
        return bcydwmc;
    }

    public void setBcydwmc(String bcydwmc) {
        this.bcydwmc = bcydwmc;
    }

    public String getQylx() {
        return qylx;
    }

    public void setQylx(String qylx) {
        this.qylx = qylx;
    }

    public String getBcydwdz() {
        return bcydwdz;
    }

    public void setBcydwdz(String bcydwdz) {
        this.bcydwdz = bcydwdz;
    }

    public String getBcydwfrdb() {
        return bcydwfrdb;
    }

    public void setBcydwfrdb(String bcydwfrdb) {
        this.bcydwfrdb = bcydwfrdb;
    }

    public String getBcydwnxxe() {
        return bcydwnxxe;
    }

    public void setBcydwnxxe(String bcydwnxxe) {
        this.bcydwnxxe = bcydwnxxe;
    }

    public String getBcydwyyzzh() {
        return bcydwyyzzh;
    }

    public void setBcydwyyzzh(String bcydwyyzzh) {
        this.bcydwyyzzh = bcydwyyzzh;
    }

    public String getBcydwlxr() {
        return bcydwlxr;
    }

    public void setBcydwlxr(String bcydwlxr) {
        this.bcydwlxr = bcydwlxr;
    }

    public String getBcydwdh() {
        return bcydwdh;
    }

    public void setBcydwdh(String bcydwdh) {
        this.bcydwdh = bcydwdh;
    }

    public String getBcydwcz() {
        return bcydwcz;
    }

    public void setBcydwcz(String bcydwcz) {
        this.bcydwcz = bcydwcz;
    }

    public String getBcydwyb() {
        return bcydwyb;
    }

    public void setBcydwyb(String bcydwyb) {
        this.bcydwyb = bcydwyb;
    }

    public String getBssczmc() {
        return bssczmc;
    }

    public void setBssczmc(String bssczmc) {
        this.bssczmc = bssczmc;
    }

    public String getBssczdz() {
        return bssczdz;
    }

    public void setBssczdz(String bssczdz) {
        this.bssczdz = bssczdz;
    }

    public String getBssczlxr() {
        return bssczlxr;
    }

    public void setBssczlxr(String bssczlxr) {
        this.bssczlxr = bssczlxr;
    }

    public String getBssczlxdh() {
        return bssczlxdh;
    }

    public void setBssczlxdh(String bssczlxdh) {
        this.bssczlxdh = bssczlxdh;
    }

    public String getCydwmc() {
        return cydwmc;
    }

    public void setCydwmc(String cydwmc) {
        this.cydwmc = cydwmc;
    }

    public String getCydwdz() {
        return cydwdz;
    }

    public void setCydwdz(String cydwdz) {
        this.cydwdz = cydwdz;
    }

    public String getCydwlxr() {
        return cydwlxr;
    }

    public void setCydwlxr(String cydwlxr) {
        this.cydwlxr = cydwlxr;
    }

    public String getCydwdh() {
        return cydwdh;
    }

    public void setCydwdh(String cydwdh) {
        this.cydwdh = cydwdh;
    }

    public String getCydwcz() {
        return cydwcz;
    }

    public void setCydwcz(String cydwcz) {
        this.cydwcz = cydwcz;
    }

    public String getCydwyb() {
        return cydwyb;
    }

    public void setCydwyb(String cydwyb) {
        this.cydwyb = cydwyb;
    }

    public String getCyr() {
        return cyr;
    }

    public void setCyr(String cyr) {
        this.cyr = cyr;
    }

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }

    public String getCyhj() {
        return cyhj;
    }

    public void setCyhj(String cyhj) {
        this.cyhj = cyhj;
    }

    public String getBcydwqygm() {
        return bcydwqygm;
    }

    public void setBcydwqygm(String bcydwqygm) {
        this.bcydwqygm = bcydwqygm;
    }

    public String getBcydwssqy() {
        return bcydwssqy;
    }

    public void setBcydwssqy(String bcydwssqy) {
        this.bcydwssqy = bcydwssqy;
    }

    @Override
    public String toString() {
        return "Scgl{" +
                "cydbh='" + cydbh + '\'' +
                ", bgfl1='" + bgfl1 + '\'' +
                ", bgsbh='" + bgsbh + '\'' +
                ", bgfl='" + bgfl + '\'' +
                ", wtdw='" + wtdw + '\'' +
                ", bgrq='" + bgrq + '\'' +
                ", zjr='" + zjr + '\'' +
                ", bgqfr='" + bgqfr + '\'' +
                ", jyjl='" + jyjl + '\'' +
                ", jybgbz='" + jybgbz + '\'' +
                ", lxr='" + lxr + '\'' +
                ", dh='" + dh + '\'' +
                ", dzyx='" + dzyx + '\'' +
                ", dz='" + dz + '\'' +
                ", yb='" + yb + '\'' +
                ", cz='" + cz + '\'' +
                ", tbr='" + tbr + '\'' +
                ", tbrq='" + tbrq + '\'' +
                ", tbrdh='" + tbrdh + '\'' +
                ", tbrdzyx='" + tbrdzyx + '\'' +
                ", jyxmid='" + jyxmid + '\'' +
                ", jyxm='" + jyxm + '\'' +
                ", jyjg='" + jyjg + '\'' +
                ", jgdw='" + jgdw + '\'' +
                ", bzxz='" + bzxz + '\'' +
                ", bzxzdw='" + bzxzdw + '\'' +
                ", jgpd='" + jgpd + '\'' +
                ", sm='" + sm + '\'' +
                ", jyyj='" + jyyj + '\'' +
                ", pdyj='" + pdyj + '\'' +
                ", ffjcx='" + ffjcx + '\'' +
                ", ffjcxdw='" + ffjcxdw + '\'' +
                ", bzffjcx='" + bzffjcx + '\'' +
                ", bzffjcxdw='" + bzffjcxdw + '\'' +
                ", bzzxyxx='" + bzzxyxx + '\'' +
                ", bzzxyxxdw='" + bzzxyxxdw + '\'' +
                ", bzzdyxx='" + bzzdyxx + '\'' +
                ", bzzdyxxdw='" + bzzdyxxdw + '\'' +
                ", zxyxx='" + zxyxx + '\'' +
                ", zxyxxdw='" + zxyxxdw + '\'' +
                ", zdyxx='" + zdyxx + '\'' +
                ", zdyxxdw='" + zdyxxdw + '\'' +
                ", spflid='" + spflid + '\'' +
                ", rwly='" + rwly + '\'' +
                ", rwlx='" + rwlx + '\'' +
                ", cyrq='" + cyrq + '\'' +
                ", cydd='" + cydd + '\'' +
                ", ypmc='" + ypmc + '\'' +
                ", cqzl='" + cqzl + '\'' +
                ", yply='" + yply + '\'' +
                ", cyfs='" + cyfs + '\'' +
                ", ypsx='" + ypsx + '\'' +
                ", yplx='" + yplx + '\'' +
                ", sb='" + sb + '\'' +
                ", ypph='" + ypph + '\'' +
                ", scrq='" + scrq + '\'' +
                ", bzq='" + bzq + '\'' +
                ", zxbz='" + zxbz + '\'' +
                ", ggxh='" + ggxh + '\'' +
                ", zldj='" + zldj + '\'' +
                ", scxkzbh='" + scxkzbh + '\'' +
                ", dj='" + dj + '\'' +
                ", if_ck='" + if_ck + '\'' +
                ", cyjs='" + cyjs + '\'' +
                ", cysl='" + cysl + '\'' +
                ", cysldw='" + cysldw + '\'' +
                ", bysl='" + bysl + '\'' +
                ", bzfl='" + bzfl + '\'' +
                ", ypxt='" + ypxt + '\'' +
                ", ypcctj='" + ypcctj + '\'' +
                ", cyypbz='" + cyypbz + '\'' +
                ", jsypdz='" + jsypdz + '\'' +
                ", jsypjzrq='" + jsypjzrq + '\'' +
                ", bcydwmc='" + bcydwmc + '\'' +
                ", qylx='" + qylx + '\'' +
                ", bcydwdz='" + bcydwdz + '\'' +
                ", bcydwfrdb='" + bcydwfrdb + '\'' +
                ", bcydwnxxe='" + bcydwnxxe + '\'' +
                ", bcydwyyzzh='" + bcydwyyzzh + '\'' +
                ", bcydwlxr='" + bcydwlxr + '\'' +
                ", bcydwdh='" + bcydwdh + '\'' +
                ", bcydwcz='" + bcydwcz + '\'' +
                ", bcydwyb='" + bcydwyb + '\'' +
                ", bssczmc='" + bssczmc + '\'' +
                ", bssczdz='" + bssczdz + '\'' +
                ", bssczlxr='" + bssczlxr + '\'' +
                ", bssczlxdh='" + bssczlxdh + '\'' +
                ", cydwmc='" + cydwmc + '\'' +
                ", cydwdz='" + cydwdz + '\'' +
                ", cydwlxr='" + cydwlxr + '\'' +
                ", cydwdh='" + cydwdh + '\'' +
                ", cydwcz='" + cydwcz + '\'' +
                ", cydwyb='" + cydwyb + '\'' +
                ", cyr='" + cyr + '\'' +
                ", bz='" + bz + '\'' +
                ", cyhj='" + cyhj + '\'' +
                ", bcydwqygm='" + bcydwqygm + '\'' +
                ", bcydwssqy='" + bcydwssqy + '\'' +
                ", cpzl='" + cpzl + '\'' +
                '}';
    }
}
