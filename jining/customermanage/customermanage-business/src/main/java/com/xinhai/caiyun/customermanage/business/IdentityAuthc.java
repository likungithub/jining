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
 *验证用户身份
 */
public class IdentityAuthc {
    private Logger log=LogManager.getLogger(IdentityAuthc.class.getName());

    /**
     * @param sfzhm
     * @param zjlxdm
     * @return
     * 验证用户身份获取手机号码
     */
	public Response doAuthc(HttpClientUtil httpClientUtil,String sfzhm, String zjlxdm)
	{
		Response response=new Response();
		//组织请求参数
		Map<String,String>map=new HashMap<String, String>();
		map.put("sfzhm", sfzhm);
		map.put("zjlxdm", zjlxdm);
		try {


			//调用身份验证接口
			Map resultMap = httpClientUtil.doPost(Resouce.AUTHCURL, map);
			String result= resultMap.get("result").toString();
			//解析返回的参数
			JSONObject jsonObject=JSON.parseObject(result);
			String ret=jsonObject.getString("ret");
			if("0".equals(ret))
			{
				response.setResultMap(resultMap);
				response.setFlag(true);
				response.setMsg("身份验证成功");
			}else{
				response.setFlag(false);
				response.setMsg("身份验证失败");
			}
			response.setData(result);
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			response.setFlag(false);
			response.setMsg("后台出现异常，稍后再试");
			response.setData(null);	
			log.error(e);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			response.setFlag(false);
			response.setMsg("后台IO异常，稍后再试");
			response.setData(null);
			log.error(e);
		}
		return response;
	}
}
