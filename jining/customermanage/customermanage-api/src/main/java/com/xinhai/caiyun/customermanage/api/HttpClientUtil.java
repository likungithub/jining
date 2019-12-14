package com.xinhai.caiyun.customermanage.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.CookieStore;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultConnectionKeepAliveStrategy;
import org.apache.http.impl.client.DefaultRedirectStrategy;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class HttpClientUtil {
	
	//private static final Logger LOG = LogManager.getLogger(HttpClientUtil.class);  
    private    CloseableHttpClient httpClient = null;
	private   HttpClientContext context = null;
	private  static CookieStore cookieStore = null;
	private   RequestConfig requestConfig = null;


	public void initcookie(String cookie,String sstCookie){
		context = HttpClientContext.create();
		//cookieStore = new BasicCookieStore();



		// 配置超时时间（连接服务端超时1秒，请求数据返回超时2秒）
		requestConfig = RequestConfig.custom().setConnectTimeout(120000).setSocketTimeout(60000)
				.setConnectionRequestTimeout(60000).build();
		// 设置默认跳转以及存储cookie
		httpClient = HttpClientBuilder.create()
				.setKeepAliveStrategy(new DefaultConnectionKeepAliveStrategy())
				.setRedirectStrategy(new DefaultRedirectStrategy()).setDefaultRequestConfig(requestConfig)
				.setDefaultCookieStore(cookieStore).build();

	}

	public void init(){
		context = HttpClientContext.create();
		cookieStore = new BasicCookieStore();
		// 配置超时时间（连接服务端超时1秒，请求数据返回超时2秒）
		requestConfig = RequestConfig.custom().setConnectTimeout(120000).setSocketTimeout(60000)
				.setConnectionRequestTimeout(60000).build();
		// 设置默认跳转以及存储cookie
		httpClient = HttpClientBuilder.create()
				.setKeepAliveStrategy(new DefaultConnectionKeepAliveStrategy())
				.setRedirectStrategy(new DefaultRedirectStrategy()).setDefaultRequestConfig(requestConfig)
				.setDefaultCookieStore(cookieStore).build();

	}




	public  Map doPost(String url,Map<String,String>map) throws ClientProtocolException, IOException{
		HashMap resultMap = new HashMap<>();
    	String result="";
		//创建默认的httpclient对象
//		CloseableHttpClient httpclient = HttpClients.createDefault();
		//创建httpclient post请求对象
		HttpPost httppost = new HttpPost(url);
		//创建组织请求参数列表
		List<NameValuePair>params=new ArrayList<NameValuePair>();
		for(Map.Entry<String, String> entity:map.entrySet()){
			params.add(new BasicNameValuePair(entity.getKey(), entity.getValue()));
		}
		//设置请求参数
		UrlEncodedFormEntity uefEntity= new UrlEncodedFormEntity(params, "UTF-8"); 
		httppost.setEntity(uefEntity);
		CloseableHttpResponse response = null;
		//发送http请求
		response = httpClient.execute(httppost,context);
		cookieStore = context.getCookieStore();  
        List<Cookie> cookies = cookieStore.getCookies();
        for (Cookie cookie : cookies) {
			resultMap.put(cookie.getName(),cookie.getValue());
            System.out.println("key:" + cookie.getName() + "  value:" + cookie.getValue());  
        }  
		 //获取响应参数
		HttpEntity entity= response.getEntity(); 
		 if(entity!=null)
		 {
			 result=EntityUtils.toString(entity, "UTF-8");
		 }
		 if(response!=null)
		 {
		     response.close();
		 }
		resultMap.put("result",result);

		return resultMap;
	}
	
	
	public  String doGet(String url,Map<String,String>map) throws ClientProtocolException, IOException
	{
		String result = null;//返回结果
		//创建httpclient默认对象
		CloseableHttpClient httpclient = HttpClients.createDefault();
		// 创建组织请求参数列表
		List<NameValuePair> params = new ArrayList<NameValuePair>();
		for (Map.Entry<String, String> entity : map.entrySet()) {
			params.add(new BasicNameValuePair(entity.getKey(), entity
					.getValue()));
		}
		// 设置请求参数
		UrlEncodedFormEntity uefEntity = new UrlEncodedFormEntity(params,
				"UTF-8");
		//发送get请求
		HttpGet httpget = new HttpGet(url + "?"
				+ EntityUtils.toString(uefEntity));
		CloseableHttpResponse response = httpclient.execute(httpget);
		 //获取响应参数
		HttpEntity entity= response.getEntity(); 
		 if(entity!=null)
		 {
		     result=EntityUtils.toString(entity, "UTF-8");
		 }
		 if(response!=null)
		 {
		     response.close();
		 }
		if(httpclient!=null)
		 {
			httpclient.close();
		 }
		return result;
	}
}
