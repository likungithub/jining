package com.xinhai.caiyun.commonmanager.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * @Author shanliang
 * @Description：
 * @Date: 2018-01-12 14:56
 * @Modified By:
 */
public class GenerateID {

    /**
     * @Author: shanliang
     * @Description:消息提醒ID
     * @Date:2018-01-12 14:56
     **/
    public static String xxtxid(){
        String id = "";
        try {
            Thread.sleep(10);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        id = formatter.format(new Date());
        return id;
    }

    /**
     * @Author: shanliang
     * @Description:贷款申请ID
     * @Date:2018-01-12 14:56
     **/
    public static String dksqid(){
        SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String sNow = fmt.format(new Date());
        Random random = new Random();
        int s = random.nextInt(999)%(999-100+1) + 100;
        return sNow + s;
    }


    public static String zjsqid(){
        SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmss");
        String sNow = fmt.format(new Date());
        Random random = new Random();
        int s = random.nextInt(999)%(999-100+1) + 100;
        return sNow + s;
    }

}
