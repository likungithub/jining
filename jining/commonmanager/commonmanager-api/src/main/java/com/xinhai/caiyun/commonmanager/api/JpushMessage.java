package com.xinhai.caiyun.commonmanager.api;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @description:
 * @version: v1.0
 * @author lixp
 * @date: 2018年1月22日 上午10:14:17
 */
public class JpushMessage {
    
    /**
     * 扩展字段
     */
    private HashMap<String, String> extras = new HashMap<String, String>();

    /**
     * true代理内部提醒   false发送给客户提醒
     */
    private boolean isInside = true;
    
    /**
     *  001：根据客户编码推送    
     *             002：根据代理机构按组推送
     *             003：根据职员代码推送
     *             004：ALL所有
     *             005：IOS 平台
     *             006：android 平台
     */
    private String type;
    
    /**
     * 激光推送接收端代码
     */
    private String code;
    
    /**
     * 激光推送接收端代码集合
     */
    private List<Map<String,String>> codes;
    
    /**
     * 消息内容
     */
    private String message;
    
    /**
     *失败次数 
     */
    private int errorCount;
    
    /**
     * 发送时间
     */
    private Date fssj;
    
    

    public Date getFssj() {
        return fssj;
    }

    public void setFssj(Date fssj) {
        this.fssj = fssj;
    }

    public int getErrorCount() {
        return errorCount;
    }

    public void setErrorCount(int errorCount) {
        this.errorCount = errorCount;
    }

    public HashMap<String, String> getExtras() {
        return extras;
    }

    public void setExtras(HashMap<String, String> extras) {
        this.extras = extras;
    }

    public boolean isInside() {
        return isInside;
    }

    public void setInside(boolean isInside) {
        this.isInside = isInside;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<Map<String, String>> getCodes() {
        return codes;
    }

    public void setCodes(List<Map<String, String>> codes) {
        this.codes = codes;
    }
    
    
    
}
