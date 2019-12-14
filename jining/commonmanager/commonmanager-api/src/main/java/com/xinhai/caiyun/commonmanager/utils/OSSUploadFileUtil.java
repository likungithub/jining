package com.xinhai.caiyun.commonmanager.utils;

import com.aliyun.oss.OSSClient;
import com.aliyun.oss.event.ProgressEvent;
import com.aliyun.oss.event.ProgressEventType;
import com.aliyun.oss.event.ProgressListener;
import com.aliyun.oss.model.CannedAccessControlList;
import com.aliyun.oss.model.ObjectMetadata;
import com.aliyun.oss.model.PutObjectRequest;
import com.aliyun.oss.model.PutObjectResult;
import com.xinhai.caiyun.commonmanager.api.RedisClinet;
import com.xinhai.caiyun.systemmanager.api.CsXtpz;
import com.xinhai.caiyun.systemmanager.api.CsXtpzService;
import com.xinhai.security.api.CurrentLoginUser;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.*;
import java.net.URI;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * OSS上传文件接口
 * @author tangck
 *
 */
@Component
public class OSSUploadFileUtil {

    @Autowired
    CsXtpzService csXtpzService;

    @Autowired
    RedisClinet redisClient;

    /**
     * 日志
     */
    private Logger logger = Logger.getLogger(OSSUploadFileUtil.class);

    /**
     * 域名
     */
    private static String ENDPOINT = "4444444444";
    /**
     * 子用户读写权限秘钥ACCESSKEYID
     */

    private static String ACCESSKEYID = "s";

    /**
     * 子用户读写权限秘钥ACCESSKEYSECRET
     */
    private static String ACCESSKEYSECRET = "454L";

    /**
     * 存储空间
     */
//    private static String BUCKETNAME = "tui518";
    private static String BUCKETNAME = "";

    /**
     * 回调地址
     */
    private String callbackUrl = "";

    /**
     * RoleArn 需要在 RAM 控制台上获取
     */
    private String roleArn = "";

    /**
     * 上传状态，0：未开始，1：开始上传，-1：上传失败，2：上传结束
     */
    private static String STARTSTATUS = "0";

    /**
     * 上传进度
     */
    private static String SCHEDULE = "0%";

    /**
     * 进度条map
     */
    static Map<String, String> MAPS = new HashMap<String, String>();


    //@PostConstruct
    public void init(){
        try {
            //查询数据库参数
            CsXtpz csXtpz = null;
            if (csXtpz != null) {
              
                BUCKETNAME = csXtpz.getKey4();
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public  void get(){
        try {
            System.out.println();
        }catch (Exception e){
            e.printStackTrace();
        };
    }
    /**
     * 使用文件形式上传文件
     * @param plate
     *          文件夹
     * @param file
     *          文件
     * @param contentType
     *          文件类型
     * @return
     *          返回文件路径以及上传信息
     * @throws IOException
     */
    @Deprecated
    public static Map<String, Object> upLoadFile(String plate, File file, String contentType) throws IOException {


        Map<String, Object> info = new HashMap<String, Object>();
        
        return info;
    }

    /**
     * 删除文件
     * @param plate
     *          文件key:对象名
     * @return
     *          返回是否删除
     */
    public static boolean deleteFile(String plate) {

        boolean status = true;
        // 创建OSSClient实例
        OSSClient ossClient = new OSSClient(ENDPOINT, ACCESSKEYID, ACCESSKEYSECRET);
        // 删除Object
        ossClient.deleteObject(BUCKETNAME, plate);
        //如果文件依然存在，表示未删除
        if (ossClient.doesObjectExist(BUCKETNAME, plate)) {
            status = false;
        }
        // 关闭client
        ossClient.shutdown();
        return status;
    }

    /**
     * 访问私有文件
     * @param plate
     *          object名
     * @return
     *          返回文件地址
     */
    public static URL temporary(String plate) {

        OSSClient client = new OSSClient(ENDPOINT, ACCESSKEYID, ACCESSKEYSECRET);
        // 设置URL过期时间为1小时
        Date expiration = new Date(new Date().getTime() + 3600 * 1000);
        // 生成URL
        URL url = client.generatePresignedUrl(BUCKETNAME, plate, expiration);
        client.shutdown();
        return url;
    }

    /**
     * 获取新的文件名称
     *
     * @param plate
     *            板块名称
     * @param filename
     *            以前的文件名称
     * @return 新的文件名称
     */
    private static String getNewFileName(String plate, String filename) {

        if (StringUtils.isNotEmpty(filename)) {
            Date now = new Date();
            String newFileName = new StringBuffer().append(new SimpleDateFormat("yyyyMMddHHmmss").format(now))
                    .append((int) ((Math.random() * 9 + 1) * 100000)) + "." + filename.split("\\.")[filename.split("\\.").length - 1];
            return new StringBuffer().append(plate).append("/").append(newFileName).toString();
        }
        return "";
    }

    /**
     * 进度条
     * @return
     *      返回进度条
     */
    public static Map<String, String> getSchedule() {

        MAPS.put("startStatus", STARTSTATUS);
        MAPS.put("schedule", SCHEDULE);
        return MAPS;
    }

    /**
     * 获取上传进度回调
     */
    static class PutObjectProgressListener implements ProgressListener {

        private long bytesWritten = 0;

        private long totalBytes = -1;

        private boolean succeed = false;

        @Override
        public void progressChanged(ProgressEvent progressEvent) {
            
        }

        public boolean isSucceed() {
            return succeed;
        }
    }


    /**
     * 使用文件流传输文件
     * @param plate
     *              文件夹
     * @param is
     *              文件流
     * @param filename
     *              文件名
     * @param contentType
     *              文件类型
     * @return
     *              返回文件路径和上传信息
     * @throws IOException
     */
    public static Map<String, Object> upLoadFileByInputStream(String plate, InputStream is, String filename, String contentType) throws IOException {

    	Map<String, Object> info = new HashMap<String, Object>();
        return info;
    }

    /**
     * ueditor上传图片至阿里云
     * @param inputStream 输入流
     * @param fileName 文件名
     * @throws FileNotFoundException 异常
     */
    public static String uploadImgAliyun(InputStream inputStream, String fileName)
            throws FileNotFoundException {

      return "";
    }
}
