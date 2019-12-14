package com.xinhai.caiyun.bean;

import javax.persistence.Table;


/**
 * @description: 获取当前代理记账公司员工信息
 * @author  xinl
 * @date: 2017年11月02日 上午17:14:40
 * @version: v1.0
 */
@Table(name = "customer")
public class PtYgxx {

    /**
     * 职员代码
     */
    private String zydm;

    /**
     * 职员姓名
     */
    private String zyxm;

    /**
     * 员工头像
     */
    private String ygtx;

    public String getZydm() {
        return zydm;
    }

    public void setZydm(String zydm) {
        this.zydm = zydm;
    }

    public String getZyxm() {
        return zyxm;
    }

    public void setZyxm(String zyxm) {
        this.zyxm = zyxm;
    }

    public String getYgtx() {
        return ygtx;
    }

    public void setYgtx(String ygtx) {
        this.ygtx = ygtx;
    }

}
