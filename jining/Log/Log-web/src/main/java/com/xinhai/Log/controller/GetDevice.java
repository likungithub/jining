package com.xinhai.Log.controller;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;

/**
 * 判断设备类型
 * @author tnagck
 *
 */
@Controller
public class GetDevice {
    
    // \b 是单词边界(连着的两个(字母字符 与 非字母字符) 之间的逻辑上的间隔),  
    // 字符串在编译时会被转码一次,所以是 "\\b"  
    // \B 是单词内部逻辑间隔(连着的两个字母字符之间的逻辑上的间隔)  
	static String phoneReg = "\\b(ip(hone|od)|android|opera m(ob|in)i" + "|windows (phone|ce)|blackberry" + "|s(ymbian|eries60|amsung)|p(laybook|alm|rofile/midp"  
            + "|laystation portable)|nokia|fennec|htc[-_]" + "|mobile|up.browser|[1-4][0-9]{2}x[1-4][0-9]{2})\\b";  
    static String tableReg = "\\b(ipad|tablet|(Nexus 7)|up.browser" + "|[1-4][0-9]{2}x[1-4][0-9]{2})\\b";  
  
    // 移动设备正则匹配：手机端、平板
    static Pattern phonePat = Pattern.compile(phoneReg, Pattern.CASE_INSENSITIVE);  
    static Pattern tablePat = Pattern.compile(tableReg, Pattern.CASE_INSENSITIVE); 
	/** 
	 * 检测是否是移动设备访问 
     *  
     * @Title: check 
     * @Date : 2014-7-7 下午01:29:07 
     * @param userAgent 
     *            浏览器标识 
     * @return true:移动设备接入，false:pc端接入 
     */  
	protected String check(String userAgent) {  
		if (null == userAgent) {  
			userAgent = "";  
		} 
		String type = "";
		// 匹配  
        Matcher matcherPhone = phonePat.matcher(userAgent);  
        Matcher matcherTable = tablePat.matcher(userAgent);  
        if (matcherPhone.find()) {
            type = "mobile";
        } else if (matcherTable.find()){  
            type = "pad";
        } else if(userAgent.indexOf("micromessenger")!=-1) {
            type = "weixin";
        } else {
            type = "PC";
        }
        return type;
    }  
      
    /** 
     * 获取设备名称 
     * @param userAgent 
     * @return 
     */  
    protected String getDeviceName(String userAgent) {  
        if (null == userAgent) {  
            userAgent = "";  
        }  
        // 匹配  
        Matcher matcherPhone = phonePat.matcher(userAgent);  
        Matcher matcherTable = tablePat.matcher(userAgent);  
        if (matcherPhone.find()) {  
            return matcherPhone.group();  
        } else if (matcherTable.find()) {  
            return matcherTable.group();  
        } else {  
            return "pc";  
        }  
    }
    /**
     * 返回设备类型
     * @return
     */
    public String getType(HttpServletRequest request){
    	String ua = request.getHeader("User-Agent").toLowerCase(); 
    	String type = this.check(ua);
    	return type;
    }
}
