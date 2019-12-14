package com.xinhai.caiyun.customermanage.business;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.xinhai.caiyun.customermanage.api.HttpClientUtil;
import com.xinhai.caiyun.customermanage.api.Resouce;
import com.xinhai.caiyun.customermanage.api.Response;
import org.apache.http.client.ClientProtocolException;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

/**
 * @author liuhao
 * 获取短信验证码，用于验证用户身份
 */
public class SendMsg{
	//log4j输出日志
	private Logger log=LogManager.getLogger(SendMsg.class.getName());
	/**
	 * @param tel
	 * @return Response
	 * 调用接口发送短信验证码
	 */
	public Response getMsg(HttpClientUtil httpClientUtil,String tel)
	{
		Response response=new Response();
		//装备接口调用参数
		Map<String, String>map=new HashMap<String, String>();
		map.put("tel",tel);
		try {
			//调用接口
			Map resultMap = httpClientUtil.doPost(Resouce.SMGURL, map);
			String result= resultMap.get("result").toString();
			//处理接口返回参数
			if(result!=null)
			{
				JSONObject jsonObject=JSON.parseObject(result);
				String ret=jsonObject.get("ret").toString();
				if("success".equalsIgnoreCase(ret)){
					response.setResultMap(resultMap);
					response.setFlag(true);
					response.setMsg("短信发送成功");
				}else{
					response.setFlag(false);
					response.setMsg("短信发送失败");
				}
				System.out.println(ret);
			}else{
				response.setFlag(false);
				response.setMsg("接口调用失败");
			}
			response.setData(result);
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			log.error(e);
			response.setFlag(false);
			response.setMsg("后台系统错误,请稍后再试");
			response.setData(null);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			log.error(e);
			response.setFlag(false);
			response.setMsg("后台IO异常,请稍后再试");
			response.setData(null);
		}
		return response;
	}
	
}
