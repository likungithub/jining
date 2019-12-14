package com.xinhai.caiyun.customermanage.business;

/**
 * @Author shanliang
 * @Description：
 * @Date: 2017-11-23 19:47
 * @Modified By:
 */

import com.xinhai.caiyun.commonmanager.utils.AESCipher;
import org.apache.commons.codec.binary.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.security.Key;

public class CryptAES {
    private static String keyStr = "Gx_Cys_key@2017!";
    private static final String AESTYPE ="AES/ECB/PKCS5Padding";

    public static String AES_Encrypt(String plainText) {
        byte[] encrypt = null;
        try{
            System.out.println(Charset.defaultCharset());
            Key key = generateKey(keyStr);
            Cipher cipher = Cipher.getInstance(AESTYPE);
            cipher.init(Cipher.ENCRYPT_MODE, key);
            encrypt = cipher.doFinal(plainText.getBytes("UTF-8"));
        }catch(Exception e){
            e.printStackTrace();
        }
        return new String(Base64.encodeBase64(encrypt));
    }

    public static String AES_Decrypt(String encryptData) {
        byte[] decrypt = null;
        try{
            Key key = generateKey(keyStr);
            Cipher cipher = Cipher.getInstance(AESTYPE);
            cipher.init(Cipher.DECRYPT_MODE, key);
            decrypt = cipher.doFinal(Base64.decodeBase64(encryptData));
        }catch(Exception e){
            e.printStackTrace();
        }
        try {
            return new String(decrypt,"UTF-8").trim();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return "";
    }

    private static Key generateKey(String key)throws Exception{
        try{
            SecretKeySpec keySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");
            return keySpec;
        }catch(Exception e){
            e.printStackTrace();
            throw e;
        }

    }

    public static void main(String[] args) throws Exception {

       /* String keyStr = "UITN25LMUQC436IM";
        //String encText = AES_Encrypt(keyStr, plainText);
        String encText = "fhTD0NNIzv4jUEhJuC1htFFXJ/4S/rL6tDCJPiNvJ8mVLHWOD0HWweuxHynxoZf9";
        String decString = AES_Decrypt(keyStr, encText);
        System.out.println("解密后:"+decString);
        AES_Encrypt(keyStr,"18657589855");*/



       /* String ss = AES_Encrypt(keyStr,new String("刘媛的公司"));
        System.out.println(ss);
        String s = AES_Decrypt(keyStr,ss);
        System.out.println(s);*/
        String ss = AES_Encrypt(new String("大西瓜来了".getBytes("UTF-8"),"UTF-8"));
        System.out.println(ss);
        String s = AES_Decrypt("W6krG0csidPRfz1WKu4Zug==");


        System.out.println(s);
    }
}
