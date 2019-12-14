package com.xinhai.caiyun.commonmanager.utils;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import com.sun.crypto.provider.DESCipher;
import com.xinhai.caiyun.commonmanager.SettingKEYS;

import java.io.UnsupportedEncodingException;

/**
 * @description:AES加解密方法
 * @author lixp
 * @date: 2017年6月15日 下午4:58:06
 * @version: v1.0
 */
public class AESCipher {
    /** 
     * 初始向量
     */
    private static final String IV_STRING = "A-16-Byte-yungj!";
    
    /**
     * 编码格式
     */
    private static final String CHARSET = "UTF-8";
    
    /**
     * AES加密
     * @param content 原始内容
     * @param key 秘钥
     * @return 加密后字符串
     * @throws InvalidKeyException 异常
     * @throws NoSuchAlgorithmException 异常
     * @throws NoSuchPaddingException 异常
     * @throws InvalidAlgorithmParameterException 异常
     * @throws IllegalBlockSizeException 异常
     * @throws BadPaddingException 异常
     * @throws UnsupportedEncodingException 异常
     */
    public static String aesEncryptString(String content, String key) throws InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException,
        InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException, UnsupportedEncodingException {
        byte[] contentBytes = content.getBytes(CHARSET);
        byte[] keyBytes = key.getBytes(CHARSET);
        byte[] encryptedBytes = aesEncryptBytes(contentBytes, keyBytes);
        Encoder encoder = Base64.getEncoder();
        return encoder.encodeToString(encryptedBytes);
    }

    /**
     * AES解密 
     * @param content 加密之后
     * @param key 秘钥
     * @return 解密后字符串
     * @throws InvalidKeyException 异常
     * @throws NoSuchAlgorithmException 异常
     * @throws NoSuchPaddingException 异常
     * @throws InvalidAlgorithmParameterException 异常
     * @throws IllegalBlockSizeException 异常
     * @throws BadPaddingException 异常
     * @throws UnsupportedEncodingException 异常
     */
    public static String aesDecryptString(String content, String key) throws InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException, 
        InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException, UnsupportedEncodingException {
        Decoder decoder = Base64.getDecoder();
        byte[] encryptedBytes = decoder.decode(content);
        byte[] keyBytes = key.getBytes(CHARSET);
        byte[] decryptedBytes = aesDecryptBytes(encryptedBytes, keyBytes);
        return new String(decryptedBytes, CHARSET);        
    }
    
    /**
     * AES加密
     * @param contentBytes 原始Byte
     * @param keyBytes 秘钥Byte
     * @return 加密后字符串
     * @throws InvalidKeyException 异常
     * @throws NoSuchAlgorithmException 异常
     * @throws NoSuchPaddingException 异常
     * @throws InvalidAlgorithmParameterException 异常
     * @throws IllegalBlockSizeException 异常
     * @throws BadPaddingException 异常
     * @throws UnsupportedEncodingException 异常
     */
    public static byte[] aesEncryptBytes(byte[] contentBytes, byte[] keyBytes) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, 
        InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException, UnsupportedEncodingException {
        return cipherOperation(contentBytes, keyBytes, Cipher.ENCRYPT_MODE);
    }
    
    /**
     * AES解密 
     * @param contentBytes 解密之后
     * @param keyBytes 秘钥
     * @return 解密后字符串
     * @throws InvalidKeyException 异常
     * @throws NoSuchAlgorithmException 异常
     * @throws NoSuchPaddingException 异常
     * @throws InvalidAlgorithmParameterException 异常
     * @throws IllegalBlockSizeException 异常
     * @throws BadPaddingException 异常
     * @throws UnsupportedEncodingException 异常
     */
    public static byte[] aesDecryptBytes(byte[] contentBytes, byte[] keyBytes) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, 
        InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException, UnsupportedEncodingException {
        return cipherOperation(contentBytes, keyBytes, Cipher.DECRYPT_MODE);
    }
    
    /**
     * 加密
     * @param contentBytes 原始Byte
     * @param keyBytes 秘钥Byte
     * @param mode 加密模式
     * @return 加密byte
     * @throws UnsupportedEncodingException 异常
     * @throws NoSuchAlgorithmException 异常
     * @throws NoSuchPaddingException 异常
     * @throws InvalidKeyException 异常
     * @throws InvalidAlgorithmParameterException 异常
     * @throws IllegalBlockSizeException 异常
     * @throws BadPaddingException 异常
     */
    private static byte[] cipherOperation(byte[] contentBytes, byte[] keyBytes, int mode) throws UnsupportedEncodingException, NoSuchAlgorithmException, 
        NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
        SecretKeySpec secretKey = new SecretKeySpec(keyBytes, "AES");
        
        byte[] initParam = IV_STRING.getBytes(CHARSET);
        IvParameterSpec ivParameterSpec = new IvParameterSpec(initParam);

        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(mode, secretKey, new IvParameterSpec(initParam));

        return cipher.doFinal(contentBytes);
    }
    
    /**
     * 测试
     * @param args XXX
     * @throws Exception XXX
     */
    public static void main(String[] args) throws Exception {
//        String string = AESCipher.aesEncryptString("com.mysql.jdbc.Driver#jdbc:mysql://rm-2zeabkd79z15n5794o.mysql.rds.aliyuncs.com/cloudmanager?useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true#guanjia_2017#2017_@_ygj", SettingKEYS.AES_SECRET_KEY);
//        System.out.println(string);
//        System.out.println(AESCipher.aesDecryptString("GMRIzwBw8HOukFzcb4iVRb1lExiOcW3YvzwzEtpTwKQoEF8LHILINgxUKrcnI3tPbcMcZ6AyPxdGBpSorJCobNiflK87/emAUJjrD6d1e/di5RKGxgBtgXbH4hCXoMKrojw2/ywI8wMMtUB5fQC2ZL3n2j7RQ90L5vb/qtYumIUBaa6EHyed5oO+lJD/zxgA", SettingKEYS.AES_SECRET_KEY));
//        System.out.println("http://tui518.oss-cn-shanghai.aliyuncs.com/Process/DL0000000010/20171031150237781977.png".split("aliyuncs.com/")[1]);

//     String url = "com.mysql.jdbc.Driver#jdbc:mysql://117.78.50.2/limsfc_kf?useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true#jnjyjc#jnjvjc@_123!";
//        String url = "com.mysql.jdbc.Driver#jdbc:mysql://117.78.50.2/limsfc?useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true#jnjyjc#jnjvjc@_123!";
      /*String url = "com.mysql.jdbc.Driver#jdbc:mysql://127.0.0.1/jnjyjc?useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true#root#root";*/
        //20190924添加开发库
        String url = "com.mysql.jdbc.Driver#jdbc:mysql://117.78.50.2/jiningkf?useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true#jnjyjc#jnjvjc@_123!";
        System.out.println(AESCipher.aesEncryptString(url, SettingKEYS.AES_SECRET_KEY));
        System.out.println("数据库地址");
        System.out.println(AESCipher.aesDecryptString("GMRIzwBw8HOukFzcb4iVRb1lExiOcW3YvzwzEtpTwKSgIqoc/rmMJ53yu86uO/qTkQucvwbTJU0+vXqRbgCgHKiSGYVfAS+bc/U/p9Z38N9cioMJ0n8LL3bJcbv6AZxVafjhKkqrYADSaWtPTYmrPBe4ay7p8VM0eQFSMBvf+KEAuasR1tuCyNZDrNERO5wq", SettingKEYS.AES_SECRET_KEY));

     }
    

}