package com.xinhai.caiyun.commonmanager.utils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;

/**
 * @description:AES加解密方法
 * @author lixp
 * @date: 2017年6月15日 下午4:58:06
 * @version: v1.0
 */
public class MD5 {
    /**
     * 對字符串進行MD5加密
     * @param s 原文
     * @return 加密后
     */
    public static final  String getStringMD5(String s) {
        
        StringBuffer sb = new StringBuffer("");
        sb.append(s);
        byte[] strTemp = sb.toString().getBytes();
        return MD5.getByteArrayMD5(strTemp);
    }

    /**
     *  對byte数组進行MD5加密
     * @param source byte【】
     * @return 加密后
     */
    public static final  String getByteArrayMD5(byte[] source) {
        char[] hexDigits = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'a', 'b', 'c', 'd', 'e', 'f' };
        try {
            // 使用MD5创建MessageDigest对象
            MessageDigest mdTemp = MessageDigest.getInstance("MD5");
            mdTemp.update(source);
            byte[] md = mdTemp.digest();
            int j = md.length;
            char[] str = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte b = md[i];
                // 将没个数(int)b进行双字节加密
                str[k++] = hexDigits[b >> 4 & 0xf];
                str[k++] = hexDigits[b & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            return null;
        }
    }
    
    /**
     *  字符串进行UTF-8编码MD5加密
     * @param s s
     * @return 加密后
     * @throws UnsupportedEncodingException 
     */
    public static final  String getMD5ForUTF8(String s) throws UnsupportedEncodingException {
        
        //此处加密KEY【欢迎登录云管家】千万不要进行修改，否则旧用户会不能登录
        StringBuffer sb = new StringBuffer("欢迎登录云管家");
        sb.append(s);
        byte[] strTemp = sb.toString().getBytes("UTF-8");
        
        char[] hexDigits = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'a', 'b', 'c', 'd', 'e', 'f' };
        try {
            // 使用MD5创建MessageDigest对象
            MessageDigest mdTemp = MessageDigest.getInstance("MD5");
            mdTemp.update(strTemp);
            byte[] md = mdTemp.digest();
            int j = md.length;
            char[] str = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte b = md[i];
                // 将没个数(int)b进行双字节加密
                str[k++] = hexDigits[b >> 4 & 0xf];
                str[k++] = hexDigits[b & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            return null;
        }
    }
    
/*    public static void main(String[] args) throws UnsupportedEncodingException {
        System.out.println(getMD5ForUTF8("token=1d231690-1e62-4e69-a934-fabdc899c4bc&dlmm=797989ce2bd3dfd88b02ba16600fbed0&dlzh=13316982430&timestamp=1499332850724&xdlmm=b2a0e2b2c4b692527d4c26354ade88b6"));
    }*/
}
