package com.xinhai.caiyun.commonmanager.utils;

import io.netty.handler.codec.http.HttpMethod;

import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.jiguang.common.ClientConfig;
import cn.jiguang.common.ServiceHelper;
import cn.jiguang.common.connection.NettyHttpClient;
import cn.jiguang.common.resp.ResponseWrapper;


import com.alibaba.dubbo.common.utils.StringUtils;
import com.xinhai.caiyun.commonmanager.SettingKEYS;

public class PushMessageUtil{
    protected static final Logger LOG = LoggerFactory.getLogger(PushMessageUtil.class);
    
    protected static final String APP_KEY ="2d7901953a42e7ca8a5596b5";
    protected static final String MASTER_SECRET = "f8d7680d05909cb8800cf5cf";


	public static void main(String[] args) {
	    
	    Map<String, String> extras = new HashMap<String, String>();
	    extras.put("from", "Jpush");
        extras.put("typeId", "https://community.jiguang.cn/push");
        extras.put("messageId", "https://community.jiguang.cn/push");
	   // sendPushWithCallback("001","KH0000001582",null,null,"云管家来了",extras);
	   // sendPushWithCallback("001","KH0000003222",null,null,"云管家来了",extras);
        //sendPushWithCallback("KH0000003222", "元管家欢迎您！888!!！！", extras);
      //  sendPushWithCallback("KH0000001582", "元管家欢迎您！555888!!！！", extras);
        
        sendPushWithCallback("lxp2011", "元管家欢迎您！888!!！！", extras);
	    
	    
	}
	
	/**
	 * 使用 NettyHttpClient 异步接口发送请求
	 * @param type 001：根据客户编码推送    
	 *             002：根据代理机构按组推送
	 *             003：根据职员代码推送
	 *             004：ALL所有
	 *             005：IOS 平台
	 *             006：android 平台
	 * @param khbm 客户编码
	 * @param dljgbm 代理机构编码
	 * @param message 消息通知内容
	 */
    public static void  sendPushWithCallback(String type, String khbm, String zydm, String dljgbm, String message) {
        ClientConfig clientConfig = ClientConfig.getInstance();
        String host = (String) clientConfig.get(ClientConfig.PUSH_HOST_NAME);
        final NettyHttpClient client = new NettyHttpClient(ServiceHelper.getBasicAuthorization(APP_KEY, MASTER_SECRET),
                null, clientConfig);
        try {
            URI uri = new URI(host + clientConfig.get(ClientConfig.PUSH_PATH));
            PushPayload payload = null;
            if(StringUtils.isEmpty(type) || StringUtils.isEmpty(message)){
                return;
            }
            if("001".equals(type)){
                payload = push_alert_khbm(khbm, message);
            }else if("002".equals(type)){
                payload = push_alert_dljgbm(dljgbm, message);
            }else if("003".equals(type)){
                payload = push_alert_zybm(zydm, message);
            }else if("004".equals(type)){
                payload = push_all_alert(message);
            }else if("005".equals(type)){
                payload = push_all_alert_ios(message);
            }else if("006".equals(type)){
                payload = push_all_alert_android(message);
            }else{
                return;
            }

            client.sendRequest(HttpMethod.POST, payload.toString(), uri, new NettyHttpClient.BaseCallback() {
                @Override
                public void onSucceed(ResponseWrapper responseWrapper) {
                    LOG.info("Got result: " + responseWrapper.responseContent);
                    System.out.println(responseWrapper.responseContent);
                }
            });
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }finally{
            client.close();
        }
    }
	
	/**
	 * 平台所有用户推送消息
	 * @param message 消息内容
	 * @return
	 */
	public static PushPayload push_all_alert(String message) {
		PushPayload p = new PushPayload();
	    return p;
	}
	
	/**
     * IOS平台所有用户推送消息
     * @param message 消息内容
     * @return
     */
    public static PushPayload push_all_alert_ios(String message) {
    	PushPayload p = new PushPayload();
	    return p;
    }
    
    /**
     * ANDROID平台所有用户推送消息
     * @param message 消息内容
     * @return
     */
    public static PushPayload push_all_alert_android(String message) {
    	PushPayload p = new PushPayload();
	    return p;
    }
	
	
	/**
	 * 通过客户编码发送通知
     * @param khbm 客户编码
	 * @param message 消息内容
	 * @return
	 */
    public static PushPayload push_alert_khbm(String khbm, String message) {
    	PushPayload p = new PushPayload();
	    return p;
    }
    
    /**
     * 通过客户编码发送通知
     * @param khbm 职员代码
     * @param message 消息内容
     * @return
     */
    public static PushPayload push_alert_zybm(String zydm, String message) {
    	PushPayload p = new PushPayload();
	    return p;
    }
    
    /**
     * 通过dljgbm编码批量发送通知
     * @param dljgbm 代理机构编码
     * @param message 消息内容
     * @return
     */
    public static PushPayload push_alert_dljgbm(String dljgbm, String message) {
    	PushPayload p = new PushPayload();
	    return p;
    }
    
    
    
    
    
    
   //------------------------------------------------------------------------------------------------------
    
    
    /**
     * 根据手机号码推送
     * @param  001：根据手机号码推送    
     * @param extras 扩充字段 typeId=XXX, messageId=XXX
     */
    public static void sendPushWithCallback(String sjhm ,String message, Map<String, String> extras) {
       
    }
  
    
    //
    /**
    
     */
    public static void sendPushWithCallback(String type, String khbm, String zydm, String dljgbm, String message, Map<String, String> extras) {
      
    }
    
    
    /**
     * 通过客户编码发送通知
     * @param khbm 客户编码
     * @param message 消息内容
     * @param extras 扩充字段 typeId=XXX, messageId=XXX  
     * @return
     */
    public static PushPayload push_alert_khbm(String khbm, String message, Map<String, String> extras) {
    	PushPayload p = new PushPayload();
	    return p;
    }
    
    
    /**
     * 通过dljgbm编码批量发送通知
     * @param dljgbm 代理机构编码
     * @param message 消息内容
     * @param extras 扩充字段 typeId=XXX, messageId=XXX  
     * @return
     */
    public static PushPayload push_alert_dljgbm(String dljgbm, String message, Map<String, String> extras) {
    	PushPayload p = new PushPayload();
	    return p;
    }
    
    
    /**
     * 通过客户编码发送通知
     * @param khbm 职员代码
     * @param message 消息内容
     * @param extras 扩充字段 typeId=XXX, messageId=XXX  
     * @return
     */
    public static PushPayload push_alert_zybm(String zydm, String message, Map<String, String> extras) {
    	PushPayload p = new PushPayload();
	    return p;
    }
    
    
    /**
     * 平台所有用户推送消息
     * @param message 消息内容
     * @param extras 扩充字段 typeId=XXX, messageId=XXX  
     * @return
     */
    public static PushPayload push_all_alert(String message, Map<String, String> extras) {
    	PushPayload p = new PushPayload();
	    return p;
    }
    
    
    /**
     * IOS平台所有用户推送消息
     * @param message 消息内容
     * @param extras 扩充字段 typeId=XXX, messageId=XXX  
     * @return
     */
    public static PushPayload push_all_alert_ios(String message, Map<String, String> extras) {
    	PushPayload p = new PushPayload();
	    return p;
    }
    
    /**
     * ANDROID平台所有用户推送消息
     * @param message 消息内容
     * @param extras 扩充字段 typeId=XXX, messageId=XXX  
     * @return
     */
    public static PushPayload push_all_alert_android(String message, Map<String, String> extras) {
    	PushPayload p = new PushPayload();
	    return p;
    }
    
 
}

