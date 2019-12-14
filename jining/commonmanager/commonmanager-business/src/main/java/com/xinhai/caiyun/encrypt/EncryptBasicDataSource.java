package com.xinhai.caiyun.encrypt;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.apache.commons.dbcp2.BasicDataSource;

import com.xinhai.caiyun.commonmanager.SettingKEYS;
import com.xinhai.caiyun.commonmanager.utils.AESCipher;

/**
 * @description:
 * @version: v1.0
 * @author lixp
 * @date: 2017年10月30日 下午8:17:40
 */
public class EncryptBasicDataSource extends BasicDataSource{
    
    @Override
    public synchronized void setUrl(String url) {
        try {
            //20190924添加开发库
            String u = "GMRIzwBw8HOukFzcb4iVRb1lExiOcW3YvzwzEtpTwKSgIqoc/rmMJ53yu86uO/qTkQucvwbTJU0+vXqRbgCgHKiSGYVfAS+bc/U/p9Z38N9cioMJ0n8LL3bJcbv6AZxVafjhKkqrYADSaWtPTYmrPBe4ay7p8VM0eQFSMBvf+KEAuasR1tuCyNZDrNERO5wq";
            //肥城库 开发库
//            String u = "GMRIzwBw8HOukFzcb4iVRb1lExiOcW3YvzwzEtpTwKQ5bAsXn6WfS9jUxaYc03HAcb/RuIQh86RKKRHkSknzsaK/vWL32D7Rx6LAXEV1MZfLMY2d2bzKOqmf5mH3kS+0OAH0CQGQR0zyXlOUpJvCoGG0JkLEP4+PK8IU1kVaJnxNvl4gP8KMV7/QzaqYUHMf";

            //肥城正式库
//            String u = "GMRIzwBw8HOukFzcb4iVRb1lExiOcW3YvzwzEtpTwKQ5bAsXn6WfS9jUxaYc03HA/jMR35byRyxrcAhfD07tuw50TC7trOvqMWxffaIXNBTRHddig3pYFql4Kpzo2sq/E5coiRfVWqCkcncqQNxhJLLCcUJtnbQ+KwPjrXp7AqaSJoJr668bczA4JMnp+ftu";
            String[] mysql = (AESCipher.aesDecryptString(u, SettingKEYS.AES_SECRET_KEY)).split("#");
            super.setDriverClassName(mysql[0]);
            super.setUrl(mysql[1]);
            super.setUsername(mysql[2]);
            super.setPassword(mysql[3]);
            super.setInitialSize(10);
            super.setMaxIdle(15);
            super.setMinIdle(2);
            super.setMaxTotal(30);
            super.setMinEvictableIdleTimeMillis(270);
            super.setRemoveAbandonedOnMaintenance(true);
//            super.setNumTestsPerEvictionRun(100);
            super.setTestOnBorrow(true);
            super.setTestOnReturn(false);
            super.setRemoveAbandonedTimeout(30);
        } catch (InvalidKeyException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (NoSuchPaddingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (InvalidAlgorithmParameterException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IllegalBlockSizeException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (BadPaddingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
       
    }
    
}
