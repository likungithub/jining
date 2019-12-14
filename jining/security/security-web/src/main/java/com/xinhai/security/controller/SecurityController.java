package com.xinhai.security.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AccountException;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.subject.support.DefaultSubjectContext;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import redis.clients.jedis.JedisPool;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.systemmanager.api.RwglJbxxService;
import com.xinhai.resourcemanager.entity.Resource;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.security.api.Customer;
import com.xinhai.security.api.MD5EncryptService;
import com.xinhai.security.api.ShiroUser;
import com.xinhai.security.dao.SecurityMapper;
import com.xinhai.security.shiro.SecurityConfig;

@Controller
public class SecurityController {
	private static final org.slf4j.Logger LOGGER = LoggerFactory
			.getLogger(SecurityController.class);

	@Autowired
	private SecurityConfig securityConfig;
	
	@Autowired
	private SecurityMapper securityMapper;
	
    @Autowired
    private RwglJbxxService rwglJbxxService;
	
    /**
     * redis存储对象客户端
     */
    @Autowired
    private JedisPool jedisPool;

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() {

		return "login";
	}

	@RequestMapping(value = "/xinhai/login/{username}/{pwd}", method = RequestMethod.GET)
	@OperateLog
	@ResponseBody
	public InvokeResult login(HttpServletRequest request,
			@PathVariable("username") String userName,
			@PathVariable("pwd") String pwd) {
		LoginCommand command = new LoginCommand();
		command.setUsername(userName);
		command.setjCaptchaCode("xinhai");

		MD5EncryptService encryptService = new MD5EncryptService();
		String str1 = encryptService.encryptPassword(pwd, "");
		String str2 = encryptService.encryptPassword(str1 + userName, "");
		String str3 = encryptService.encryptPassword(str2
				+ command.getjCaptchaCode().toUpperCase(), "");
		command.setPassword(str3);

		return execLogin(request, command);
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@OperateLog
	@ResponseBody
	public InvokeResult login(HttpServletRequest request, LoginCommand command) {
		return execLogin(request, command);
	}

	private InvokeResult execLogin(HttpServletRequest request,
			LoginCommand command) {
		InvokeResult result = new InvokeResult();

		String shiroLoginFailure = (String) request
				.getAttribute("shiroLoginFailure");
		if (!StringUtils.isBlank(shiroLoginFailure)) {
			result.setFailed(true);
			result.setMsg("验证码输入有误。");
		} else {
			kickUser(command.getUsername(), request);
			UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(
					command.getUsername() + "&&" + command.getjCaptchaCode(),
					command.getPassword(), command.getRemember());
			usernamePasswordToken.setRememberMe(command.getRemember());
			try {
				SecurityUtils.getSubject().login(usernamePasswordToken);
				 /*Jedis jedis = jedisPool.getResource();
			        new Thread(new Runnable() {  
			            public void run() {  
			                try {  
			                    Map cxtj = new HashMap();
			                   
			                    cxtj.put("zydm", CurrentLoginUser.getUser().getZydm());
			                    cxtj.put("dljgbm",CurrentLoginUser.getUser().getDljgBm());
			                    Map<String,String> map = rwglJbxxService.selectCspzXxtx(cxtj);
			                    cxtj.put("cqts",map.get("cqts"));//超期天数
			                    cxtj.put("syts",map.get("syts"));//剩余天数
			                 
			                    List<Map<String,String>> rwgljbxxList = rwglJbxxService.selectRwjbxxXxtx(cxtj);
			                    
			                Thread.sleep(6000);
			                    //即时通讯
			                    HashSet hs = new HashSet();
			                        List<Map<String, Object>> ls = new ArrayList<Map<String, Object>>();
			                  
			                            Map<String, Object> xxnr = new HashMap<String, Object>();
			                         
			                              
                                      for (Map<String, String> map2 : rwgljbxxList) {
                                          xxnr.put("txbt", "您有新的消息");
                                          
                                          String rwmc = map2.get("rwmc");
                                          Object syts = map2.get("syts");
                                          xxnr.put("txnr", rwmc +"剩余天数为:"+syts+"天");
                                          xxnr.put("glbm", map2.get("rwid"));
                                       //   xxnr.put("xxid", map2.get("xxid"));
                                          xxnr.put("jsdm",CurrentLoginUser.getUser().getZydm());
                                          ls.add(xxnr);
                                          xxnr = new HashMap<String, Object>();
                                    }      
          
			                        Map<String, Object> map1 = new HashMap<String, Object>();
			                        map1.put("txlxdm", "009");
			                        map1.put("xxnr",ls); 
			                        String jstx = JSONObject.toJSONString(map1);
			                        hs.add(jstx);
			           
			                      //向订阅号中推送消息
			                      jedis.publish(SettingKEYS.INSTANTMESSAGEING, jstx);  
			                } catch (Exception e) {  
			                    e.printStackTrace();
			                }  
			            }  
			  
			        }).start();
			        
				*/
				result.setFailed(false);
				result.setMsg("登录成功。");
			} catch (UnknownAccountException e) {
				LOGGER.error(e.getMessage(), e);
				result.setFailed(true);
				result.setMsg("账号不存在。");
			} catch (LockedAccountException e) {
				LOGGER.error(e.getMessage(), e);
				result.setFailed(true);
				result.setMsg("尊敬的用户您好，客服人员正在审核中，我们将在48小时内与您核对信息，请耐心等待。");
			} catch (AccountException e) {
                LOGGER.error(e.getMessage(), e);
                result.setFailed(true);
                result.setMsg("尊敬的用户您好，该账户为已离职状态，请联系账户所属公司。");
            } catch (AuthenticationException e) {
				LOGGER.error(e.getMessage(), e);
				result.setFailed(true);
				result.setMsg("账号或者密码不正确。");
			} catch (Exception e) {
				LOGGER.error(e.getMessage(), e);
				result.setFailed(true);
				result.setMsg("登录失败。");
			}
		}

		return result;
	}

	private void kickUser(String userName, HttpServletRequest request) {
		// 处理session
		DefaultWebSecurityManager securityManager = (DefaultWebSecurityManager) SecurityUtils
				.getSecurityManager();
		DefaultWebSessionManager sessionManager = (DefaultWebSessionManager) securityManager
				.getSessionManager();
		String currentSessionId = request.getSession().getId();
		Collection<Session> sessions = sessionManager.getSessionDAO()
				.getActiveSessions();

		// 获取当前已登录的用户session列表
		// 清除该用户以前登录时保存的session
		for (Session session : sessions) {
			Object obj = session
					.getAttribute(DefaultSubjectContext.PRINCIPALS_SESSION_KEY);
			if (obj instanceof SimplePrincipalCollection) {
				ShiroUser shiroUser = (ShiroUser) ((SimplePrincipalCollection) obj)
						.getPrimaryPrincipal();
				if (StringUtils.equals(userName, shiroUser.getUserAccount())
						&& !StringUtils.equalsIgnoreCase(currentSessionId,
								String.valueOf(session.getId()))) {
					sessionManager.getSessionDAO().delete(session);
				}
			}
		}
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	@OperateLog(describe = "退出系统")
	@ResponseBody
	public InvokeResult logout() {
		SecurityUtils.getSubject().logout();
		InvokeResult result = new InvokeResult();
		result.setFailed(false);
		return result;
	}
	
	@RequestMapping(value = "/updateNsrsbh", method = RequestMethod.POST)
    @OperateLog(describe = "更新税号")
    @ResponseBody
    public JSONObject updateNsrsbh(String nsrsbh) {
	    JSONObject resultDatas = new JSONObject();
	    String dljgbm = CurrentLoginUser.getUser().getDljgBm(); //当前代理机构编码
		int num = securityMapper.checkNsrsbh(dljgbm, nsrsbh);
		if (num > 0) {
			resultDatas.put("success", false);
			resultDatas.put("message","纳税人识别号已存在！");
			return resultDatas;
		} else {
			securityMapper.updateNsrsbh(dljgbm, nsrsbh);
			resultDatas.put("success", true);
			resultDatas.put("data", nsrsbh);
			return resultDatas;
		}
    }

	/**
	 * 检查当前试用日期超时情况
	 * @return
	 */
	@RequestMapping(value = "/checkDate", method = RequestMethod.GET)
	@ResponseBody
	public JSONObject checkDate() {
	    JSONObject resultDatas = new JSONObject();
		JSONObject shzt = getyyzzShzt();
		//营业执照显示
		resultDatas.put("yyzzxs",shzt.getBooleanValue("success"));

	    //获得当前用户所在代理机构的管理员信息
		Customer manager = securityMapper.findbycode(CurrentLoginUser.getUser().getDljgBm());
		if (manager == null) {
		    resultDatas.put("success", false);
		    return resultDatas;
		} else {
    		Date end = manager.getFwjsrq(); //服务结束日期
            Date today = null;
            //统一格式
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            if (end != null) {
                try {
                end = format.parse(format.format(end));
                today = format.parse(format.format(new Date()));
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                long beginTime = today.getTime(); 
                long endTime = end.getTime(); 
                long betweenDays = (long)((endTime - beginTime) / (1000 * 60 * 60 *24) + 0.5); 
                if (betweenDays > 15 || betweenDays < 0) {
                    resultDatas.put("success", false);
                } else {
                    resultDatas.put("success", true);
                    resultDatas.put("status", betweenDays);
                    //缴费状态，未交过钱为false，已交过为true
                    resultDatas.put("jfzt", manager.isJfzt());
                }
            } else {
                resultDatas.put("success", false);
            }
            return resultDatas;
		}
	    
	}
	
	/**
     * 检查当前试用日期超时情况
     * @return
     */
    @RequestMapping(value = "/getTimer", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject getTimer() {
        JSONObject resultDatas = new JSONObject();

        //获得当前用户所在代理机构的管理员信息
        Customer manager = securityMapper.findbycode(CurrentLoginUser.getUser().getDljgBm());
        Date end = manager.getFwjsrq(); //服务结束日期
        Date today = null;
        //统一格式
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (end != null) {
            try {
            end = format.parse(format.format(end));
            today = format.parse(format.format(new Date()));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            Calendar kaishi = Calendar.getInstance();
            kaishi.setTime(today);
            Calendar jieshu = Calendar.getInstance();
            jieshu.setTime(end);
            long difference = jieshu.getTimeInMillis() - kaishi.getTimeInMillis();
            
            //long day = difference/(3600*24*1000); //天数
            //long hours = (difference - day*3600*24*1000)/(3600*1000); //小时
            //long minute= (difference - day*3600*24*1000 - hours*3600*1000) / (60*1000); //分钟
            //long second= (difference - day*3600*24*1000 - hours*3600*1000 - minute*60*1000) / 1000; //秒            
            
//            long beginTime = today.getTime(); 
//            long endTime = end.getTime(); 
//            long betweenDays = (long)((endTime - beginTime) / (1000 * 60 * 60 *24) + 0.5); 
            
            resultDatas.put("amountTimes", difference);
            resultDatas.put("startFWTime", manager.getFwksrq()); //服务结束日期
            resultDatas.put("endFWTime", manager.getFwjsrq()); //服务开始日期
            resultDatas.put("success", true);
        } else {
            resultDatas.put("success", false);
        }
        return resultDatas;
    }


	//获取营业执照审核状态
	private JSONObject getyyzzShzt() {
		JSONObject jobj = new JSONObject();
		jobj.put("success", false);
		try {
			if (!"DL0000000001".equals(CurrentLoginUser.getUser().getDljgBm())) {
				String id = CurrentLoginUser.getCustomerId();
				String zszt = securityMapper.getCustomerById(id).getZszt();
				//管理员不提示
				//其他如果 未审核则提示
				/*if ("0".equals(CurrentLoginUser.getCustomer().getZszt())) {*/
				if ("0".equals(zszt)) {
						jobj.put("success", true);
				}
			}
		}catch (Exception e){

		}
		return jobj;
	}
	
	@RequestMapping(value = "/verifylogin", method = RequestMethod.GET)
    @ResponseBody
    public Boolean verifyLogin() {
        if (securityConfig.isSecurityDisabled()) {
            return true;
        }

        return CurrentLoginUser.isLogin();
    }

	@RequestMapping(value = "/menu", method = RequestMethod.GET)
	@ResponseBody
	public JSONObject getMenus(
			@RequestParam(value = "rootId", required = false) String rootId) {
		JSONObject resultDatas = new JSONObject();

		JSONArray arrayNode = new JSONArray();
		List<Resource> resources = CurrentLoginUser.getResources();
		List<Resource> rootResource = findRootResources(resources, rootId);
		builderResourceTree(resources, rootResource, arrayNode);
		resultDatas.put("menus", arrayNode);

		return resultDatas;
	}

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index() {
		return "index";
	}

	@RequestMapping(value = "/getsysinfo", method = RequestMethod.GET)
	@ResponseBody
	public JSONObject getSysInfo() {
		JSONObject resultDatas = new JSONObject();

		resultDatas.put("userinfo", CurrentLoginUser.getUserName());
		resultDatas.put("title", "检测管理系统");
		resultDatas.put("copyright", securityConfig.getCopyright());
		resultDatas.put("jCaptchaDisabled", securityConfig.isCaptchaDisabled());
		if (StringUtils.equals(CurrentLoginUser.getUserAccount(), "superadmin")) {
			resultDatas.put("verifytype", "normal");
		} else {
			resultDatas.put("verifytype", securityConfig.getVerifyType());
		}

		return resultDatas;
	}

	private void builderResourceTree(List<Resource> allResources,
			List<Resource> currentResource, JSONArray resourceTree) {
		for (Resource resource : currentResource) {
		    if(resource.getId().equals("6ca1b01e-ca58-4a6e-a6f4-f79559824c7e")){ //欢迎页
		        continue;
		    }
			JSONObject node = new JSONObject();
			node.put("id", resource.getId());
			node.put("url", resource.getUrl());
			node.put("icon", resource.getMenuIcon());
			node.put("text", resource.getName());

			List<Resource> children = allResources
					.stream()
					.filter(f -> Objects.equals(f.getParentId(),
							resource.getFuncId())).collect(Collectors.toList());
			if (children.size() > 0) {
				JSONArray childrenNode = new JSONArray();
				builderResourceTree(allResources, children, childrenNode);
				node.put("children", childrenNode);
			}

			resourceTree.add(node);
		}
	}

	private List<Resource> findRootResources(List<Resource> resources,
			String rootId) {
		List<Resource> rootResources = new ArrayList<>();
		if (!StringUtils.isEmpty(rootId)) {
			Optional<Resource> rootResource = resources
					.stream()
					.filter(f -> StringUtils.equalsIgnoreCase(rootId,
							f.getFuncId())).findFirst();

			if (rootResource.isPresent()) {
				rootResources = resources
						.stream()
						.filter(f -> Objects.equals(f.getParentId(),
								rootResource.get().getFuncId()))
						.collect(Collectors.toList());
			}
		} else {
			rootResources = resources
					.stream()
					.filter(f -> f.getParentId() == null
							|| f.getParentId().isEmpty())
					.collect(Collectors.toList());
		}

		return rootResources;
	}

	@RequestMapping(value = "/phonelogin", method = RequestMethod.POST)
	@OperateLog
	@ResponseBody
	public InvokeResult phonelogin(HttpServletRequest request, LoginCommand command) {
		return execPhoneLogin(request, command);
	}

	private InvokeResult execPhoneLogin(HttpServletRequest request,
								   LoginCommand command) {
		InvokeResult result = new InvokeResult();
		kickUser(command.getUsername(), request); //清理过期session
		UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(
				command.getUsername() + "&&" + command.getjCaptchaCode(),
				command.getPassword(), command.getRemember());
		usernamePasswordToken.setRememberMe(command.getRemember());
		try {
			SecurityUtils.getSubject().login(usernamePasswordToken);
			result.setFailed(false);
			result.setMsg("登录成功。");
		} catch (UnknownAccountException e) {
			LOGGER.error(e.getMessage(), e);
			result.setFailed(true);
			result.setMsg("账号不存在。");
		} catch (LockedAccountException e) {
			LOGGER.error(e.getMessage(), e);
			result.setFailed(true);
			result.setMsg("尊敬的用户您好，客服人员正在审核中，我们将在48小时内与您核对信息，请耐心等待。");
		} catch (AccountException e) {
			LOGGER.error(e.getMessage(), e);
			result.setFailed(true);
			result.setMsg("尊敬的用户您好，该账户为已离职状态，请联系账户所属代理记账公司。");
		} catch (AuthenticationException e) {
			LOGGER.error(e.getMessage(), e);
			result.setFailed(true);
			result.setMsg("账号或者密码不正确。");
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			result.setFailed(true);
			result.setMsg("登录失败。");
		}
		return result;
	}

}
