package com.xinhai.caiyun.customermanage.business;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.xinhai.caiyun.customermanage.api.HttpClientUtil;
import com.xinhai.caiyun.customermanage.api.Resouce;
import com.xinhai.caiyun.customermanage.api.Response;
import com.xinhai.caiyun.customermanage.api.UserLogin;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.protocol.HTTP;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

/**
 * @author liuhao
 * 用户登录操作
 */
public class Login {
	//log4j日志
	private Logger log=LogManager.getLogger(Login.class.getName());
	/**
	 * @param url
	 * @param map
	 * @return Response
	 * 用户登录前的身份验证（通过短信验证码形式）
	 */
	public Response getAuthcLogin(HttpClientUtil httpClientUtil,String url, Map<String,String>map)
	{
		Response response=new Response();
		try {
			Map resultMap = httpClientUtil.doPost(url, map);
			String result= resultMap.get("result").toString();
			if(result!=null)
			{
				log.info(result);
				if(result.length()>15){
					response.setFlag(true);
					response.setMsg("接口请求成功");
				}else{
					response.setFlag(false);
					response.setMsg("接口请求失败");
				}
			}else{
				response.setFlag(false);
				response.setMsg("接口请求失败");
			}
			response.setData(result);
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			response.setFlag(false);
			response.setMsg("后台出现异常");
			log.error(e);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			response.setFlag(false);
			response.setMsg("后台出现异常");
			log.error(e);
		}
		return response;
	}
	
	/**
	 * @param url
	 * @param userLogin
	 * @return
	 * 提交用户登录表单，用户登录
	 */
	public Response doLogin(HttpClientUtil httpClientUtil, String url, UserLogin userLogin)
	{
		Response response=new Response();
		//组织请求参数
		Map<String,String>map=new HashMap<String, String>();
		map.put("csdlsf", userLogin.getCsdlf());
		map.put("sfzjlxdm", userLogin.getSfzjlxdm());
		map.put("sfzjhm", userLogin.getSfzjhm());
		map.put("zjdlpwd", userLogin.getZjdlpwd());
		map.put("sjyzm01", userLogin.getSjyzm01());
		map.put("zjdlpwd01", userLogin.getZjdlpwd01());
		map.put("nsrsbh", userLogin.getNsrsbh());
		map.put("pwd", userLogin.getPwd());
		map.put("ly_sys", userLogin.getLy_sys());
		map.put("validateCode", userLogin.getValidateCode());
		map.put("caLx", userLogin.getCaLx());
		map.put("rznsrsbh", userLogin.getRznsrsbh());
		map.put("rzpwd", userLogin.getRzpwd());
		map.put("isCaUser", userLogin.getIsCaUser());
		map.put("csdlsfHide", userLogin.getCsdlsfHide());
		map.put("dlrmc", userLogin.getDlrmc());
		map.put("sflx", userLogin.getSflx());
		map.put("zjhm", userLogin.getZjhm());
		map.put("zjlxdm", userLogin.getZjlxdm());
		map.put("dltel", userLogin.getDltel());
		
		try {
			Map resultMap = httpClientUtil.doPost(url, map);
			response.setResultMap(resultMap);
			String result=resultMap.get("result").toString();

			log.info(result);
			System.out.println(result+"--------------------------");
			if((result!=null)&&(result.indexOf("loginRepeat")==-1))
			{
			   //处理返回的参数
			   JSONObject jsonObject=JSON.parseObject(result);
			   String ret=jsonObject.get("ret").toString();
			   if("A1".equals(ret)){
				   response.setFlag(false);
				   response.setMsg("用户不存在，请检查您的登录用户名是否正确");
			   }else if("A2".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("登录异常请稍后再试！");
			   }else if("A4".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("用户密码错误！");
			   }else if("A5".equals(ret)){
				   response.setFlag(false);
				   response.setMsg("用户账号不存在！");
			   }else if("A6".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("验证码输入不正确！");
			   }else if("A7".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("验证码超时！");
			   }else if("A8".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("系统正忙请稍后重试！");
			   }else if("A9".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("纳税人不存在！");
			   }else if("A10".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("请点击安全退出或重新打开浏览器后进行登录！");
			   }else if("A11".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("该用户已被锁定，请10分钟后重试！");
			   }else if("A12".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("系统正忙，请稍候重试！");
			   }else if("A13".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("用户密码错误！");
			   }else if("A15".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("您的税号需要进行激活，请联系税管员进行激活操作！");
			   }else if("A27".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("初始化银税协议用户信息失败，请稍后重试！");
			   }else if("A28".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("登录系统无效！");
			   }else if("A29".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("登录失败[原因：获取纳税人登记注册信息有误。]！");
			   }else if("A40".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("登录超时！");
			   }else if("A33".equals(ret))
			   {
				   response.setFlag(false);
				   response.setMsg("登录身份不符！");
			   }else if("A3".equals(ret)||"A14".equals(ret)||"A30".equals(ret)){
				   response.setFlag(true);
				   response.setMsg(ret);
			   }
			}else{
				  response.setFlag(false);
				  response.setMsg("接口请求失败！");
			}
			response.setData(result);
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			log.error(e);
			response.setFlag(false);
			response.setMsg("后台系统异常，请稍后再试");
			response.setData(null);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			log.error(e);
			response.setFlag(false);
			response.setMsg("后台系统异常，请稍后再试");
			response.setData(null);
		}
		return response;
	}
	/**
	 * @param userName
	 * @param userPwd
	 * @param isCauser
	 * @return
	 * 用户登录跳转
	 */
	public Response loginMain(HttpClientUtil httpClientUtil,String userName,String userPwd,String isCauser)
	{
		Response response=new Response();
		response.setFlag(false);
		//准备接口参数
		Map<String,String>map=new HashMap<String, String>();
		map.put("userName", userName);
		map.put("userPwd", userPwd);
		map.put("isCauser", isCauser);
		try {
			Map resultMap = httpClientUtil.doPost(Resouce.LOGINMAINURL, map);
			response.setResultMap(resultMap);
			String result=resultMap.get("result").toString();
			response.setData(result);
			response.setFlag(true);
			response.setMsg("登录成功");
			log.info(result);
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			log.error(e);
			response.setFlag(false);
			response.setMsg("后台系统异常，请稍后再试");
			response.setData(null);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			log.error(e);
			response.setFlag(false);
			response.setMsg("后台IO异常，请稍后再试");
			response.setData(null);
		}	
		return response;
	}
	
}
