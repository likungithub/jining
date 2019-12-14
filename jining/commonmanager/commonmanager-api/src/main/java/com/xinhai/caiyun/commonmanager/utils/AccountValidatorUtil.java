package com.xinhai.caiyun.commonmanager.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 账户相关属性验证工具
 *@author 李茂飞
 */
public class AccountValidatorUtil {
    /**
     * 正则表达式：验证账号
     */
    public static final String REGEX_USERNAME = "^[a-zA-Z0-9]{6,20}$";
    
    /**
     * 正则表达式：验证用户姓名
     */
    public static final String REGEX_USERXM = "^([·\\u4E00-\\u9FA5]{1,20}|[A-Za-z·]{1,20})$";
 
    /**
     * 正则表达式：验证密码
     */
    public static final String REGEX_PASSWORD = "(?!^\\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,20}";
 
    /**
     * 正则表达式：验证手机号
     */
    public static final String REGEX_MOBILE = "^[1][3-9][0-9]{9}$";
 
    /**
     * 正则表达式：验证邮箱
     */
    public static final String REGEX_EMAIL = "^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w{2,3}){1,3})$";
 
    /**
     * 正则表达式：验证汉字
     */
    public static final String REGEX_CHINESE = "^[\u4e00-\u9fa5],{0,}$";
 
    /**
     * 正则表达式：验证身份证
     */
    //public static final String REGEX_ID_CARD = "^\\d{15}|\\d{}18$";
    //严格验证方式
    public static final String REGEX_ID_CARD = "^(^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$)|(^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])((\\d{4})|\\d{3}[Xx])$)$";
 
    /**
     * 正则表达式：验证URL
     */
    public static final String REGEX_URL = "http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?";
 
    /**
     * 正则表达式：验证IP地址
     */
    public static final String REGEX_IP_ADDR = "(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)";

    /**
     * 正则表达式：验证有1-3位小数的正实数：
     */
    public static final String REGEX_ZSSXS = "^[0-9]+(.[0-9]{1,3})?$";

    /**
     * 正则表达式：验证固定电话：
     */
    public static final String REGEX_GDDH = "^(\\(\\d{3,4}\\)|\\d{3,4}-|\\s)?\\d{7,14}$";
    
    /**
     * 正则表达式：验证QQ：
     */
    public static final String REGEX_QQ = "^[1-9][0-9]{4,9}$";
    
    /**
     * 正则表达式:验证有纯英文
     */
    public static final String REGEX_CHUNENG=" [^(A-Za-z)]";
    
    /**
     * 正则表达式:验证有纯数字
     */
    public static final String REGEX_CHUNUMBER="^\\d+$";
    
    /**
     * 正则表达式:中英数长度500
     */
    public static final String REGEX_Length="^[\\s\\S]{0,500}$";
    
    /**
     * 正则表达式:组织结构代码
     */
    public static final String ZZJGDM="(^([0-9A-Z]){8}$)|(^([0-9A-Z]){9}$)";

    /**
     * 简单的身份证号（15-18位英文或数字）
     */
    public static final String JDSFZH="[0-9A-Z]{15,18}";

    /**
     * 验证简单的正则身份证校验
     * @param number 参数
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isSimpleSFZ(String number) {
        return Pattern.matches(JDSFZH, number);
    }

    /**
     * 验证长度
     * @param number 参数
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isLength(String number) {
        return Pattern.matches(REGEX_Length, number);
    }
    
    /**
     * 验证是否为纯数字
     * @param number 参数
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isChunNumber(String number) {
    	return Pattern.matches(REGEX_CHUNUMBER, number);
    }
    
    /**
     * 校验是否为纯英文
     * @param xxx 参数
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isEnglish(String xxx) {
		return Pattern.matches(REGEX_CHUNENG, xxx);
    }
    
    /**
     * 校验账号
     * 
     * @param username 用户账号
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isUsername(String username) {
        return Pattern.matches(REGEX_USERNAME, username);
        
    }
    
    /**
     * 校验用户姓名
     * 
     * @param userxm 用户姓名
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isUserxm(String userxm) {
        return Pattern.matches(REGEX_USERXM, userxm);
        
    }
 
    /**
     * 校验密码
     * 
     * @param password 密码
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isPassword(String password) {
        return Pattern.matches(REGEX_PASSWORD, password);
    }
 
    /**
     * 校验手机号
     * 
     * @param mobile 手机
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isMobile(String mobile) {
        //return Pattern.matches(REGEX_MOBILE, mobile);
        System.out.println(Pattern.matches(REGEX_MOBILE, mobile));
        return mobile.matches(REGEX_MOBILE);
    }
 
    /**
     * 校验邮箱
     * 
     * @param email 邮箱
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isEmail(String email) {
        return Pattern.matches(REGEX_EMAIL, email);
    }
 
    /**
     * 校验汉字
     * 
     * @param chinese 中文
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isChinese(String chinese) {
        return Pattern.matches(REGEX_CHINESE, chinese);
    }
 
    /**
     * 校验身份证
     * 
     * @param idCard 身份ID
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isIDCard(String idCard) {
        return Pattern.matches(REGEX_ID_CARD, idCard);
    }
 
    /**
     * 校验URL
     * 
     * @param url 地址
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isUrl(String url) {
        return Pattern.matches(REGEX_URL, url);
    }
 
    /**
     * 校验IP地址
     * 
     * @param ipAddr  IP
     * @return ip地址格式是否正确
     */
    public static boolean isIPAddr(String ipAddr) {
        return Pattern.matches(REGEX_IP_ADDR, ipAddr);
    }
    
    /**
     * 金额验证
     * @param je  传入金额
     * @return  金额格式是否正确
     */

    public static boolean isNumber(String je) {   
         // 判断小数点后2位的数字的正则表达式  
        Pattern pattern = Pattern.compile("^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$"); 
        Matcher match = pattern.matcher(je);   
        return (match.matches());    
    }
    
    /**
     * 校验纳税人识别号
     * 
     * @param nsrsbh 纳税人识别号
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isNsrsbh(String nsrsbh) {
        boolean nsr = Pattern.matches("^((?![a-zA-Z]*$)[a-zA-Z0-9]{15,20})$|(^\\d{15,20}$)", nsrsbh);
        return nsr;
    }
    
    /**
     * 校验有1-3位小数的正实数：
     * 
     * @param xs 传进的小数
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isZssxs(String xs) {
        return Pattern.matches(REGEX_ZSSXS, xs);
    }
    
    /**
     * 校验固定电话
     * 
     * @param gddh 固定电话
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isGddh(String gddh) {
        return Pattern.matches(REGEX_GDDH, gddh);
    }
    
    /**
     * 校验QQ
     * 
     * @param qq QQ
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isQq(String qq) {
        return Pattern.matches(REGEX_QQ, qq);
    }
    
    /**
     * 校验组织结构代码
     * 
     * @param zzjgdm 邮箱
     * @return 校验通过返回true，否则返回false
     */
    public static boolean isZZJGDM(String zzjgdm) {
        return Pattern.matches(ZZJGDM, zzjgdm);
    }
}


