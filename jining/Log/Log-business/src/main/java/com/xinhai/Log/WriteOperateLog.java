package com.xinhai.Log;

import com.alibaba.dubbo.common.json.JSON;
import com.alibaba.dubbo.common.json.JSONObject;
import com.xinhai.Log.api.Log;
import com.xinhai.Log.api.LogLevel;
import com.xinhai.Log.api.LogService;
import com.xinhai.Log.api.LoginLog;
import com.xinhai.Log.api.LoginLogService;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.Log.dao.LogMapper;
import com.xinhai.security.api.CurrentLoginUser;

import org.apache.commons.lang.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

import java.lang.reflect.Method;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Date;

/**
 * 登录日志以及操作日志
 * @author tangck
 *
 */
@Aspect
@Component
public class WriteOperateLog {
    /**
     * 内部操作日志
     */
    Logger logger = LoggerFactory.getLogger(WriteOperateLog.class.getName());

    /**
     * 自动绑定
     */
    @Autowired
    private LogService logservice;
  
    /**
     * ip地址长度
     */
    private final int iplength = 15;
    
    
//    /**
//     * 获取客户编码,手机端
//     */
//    private final String yhbm = "";
//    
//    /**
//     * 获取客户名称
//     */
//    private final String username = "";
//    
//    /**
//     * 获取公司名称
//     */
//    private final String companyname = "";
//    
//    /**
//     * 获取纳税人识别号
//     */
//    private final String taxpayersign = "";
//    
//    /**
//     * 获取代理机构编码
//     */
//    private final String institutionid = "";
    
    /**
     * 自动绑定
     */
    @Autowired
    private LoginLogService loginlogservice;
    
    public WriteOperateLog() {
        System.out.println("Aop");
    }
    
    @Pointcut("@annotation(com.xinhai.Log.api.OperateLog)")
    public void methodCachePointcut() { }
    
    @Around("methodCachePointcut()")
    public Object Around(ProceedingJoinPoint point) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes()).getRequest();
        Object object = null;
        try {
            object = point.proceed();
        } catch (Exception ex) {
            logger.error("", ex);
        }
        writeLog(request, point, object);
        return object;
    }
    
    private void writeLog(HttpServletRequest request, ProceedingJoinPoint point, Object object) {
        Thread thread = new Thread(() -> {
            String operateDescribe = null;
            String loginDesc = buildLoginDescirbe(request, object);
            try {
                operateDescribe = getOperateDescribe(point);
                if (!StringUtils.isEmpty(loginDesc)) {
                    operateDescribe = loginDesc;
                }
            } catch (Exception ex) {
                logger.error("从注解中获取日志内容失败！", ex);
            }
            String methodName = point.getSignature().getName();
            String packages = point.getThis().getClass().getName();
            if (packages.contains("$$EnhancerByCGLIB$$")) { // 如果是CGLIB动态生成的类
                try {
                    packages = packages.substring(0, packages.indexOf("$$"));
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
            JSONObject paramDatas = null;
            try {
                Object[] methodParams = point.getArgs(); //获取方法参数
                if (methodParams != null && methodParams.length > 0) {
                    paramDatas = new JSONObject();
                    for (int i = 0; i < methodParams.length; i++) {
                        try {
                            paramDatas.put(String.format("arg(%d)", i), JSON.json(methodParams[i]));
                            paramDatas.put(String.format("arg_app(%d)", i), methodParams[i]);
                        } catch (Exception ex) {
                        }
                    }
                }   
            } catch (Exception ex) {
                logger.error("", ex);
            }
            try {
                String khbm = "";
                String dlzh = "";
                String ryxm = "";
                if (!StringUtils.isEmpty(loginDesc) || operateDescribe.equals("手机登录")) {
                    LoginLog syslog = new LoginLog();
                    
                    String logintype = "001";//001PC端登录；002Android端登录；003IOS登录；004微信等登录
                    if (operateDescribe.equals("手机登录")) {
                        
                        JSONObject result = ((JSONObject) JSON.parse(JSON.json(object)));
                        JSONObject khxx = (JSONObject)result.get("signed");
                        JSONObject appkhxx = (JSONObject)result.get("notsigned");
                        if(khxx != null){
                            khbm = khxx.get("khbm").toString();
                        }
                        dlzh = appkhxx.getString("dlzh");
                        ryxm = appkhxx.getString("yhmc");
                        
                        if (paramDatas.get("arg_app(1)") != null) {
                            if ("0".equals(paramDatas.get("arg_app(1)"))){
                                logintype = "003";
                            } else if ("1".equals(paramDatas.get("arg_app(1)"))) {
                                logintype = "002";
                            }
                        }
                    }
                    //微信登录
                    if(request.getHeader("User-Agent").toLowerCase().indexOf("micromessenger")!=-1){
                        logintype = "004";
                    }
                    String usertype = "";   //启用类型
                    String mac = "";        //mac地址
                   
                    if(!StringUtils.isEmpty(khbm)){         //手机端登录存储客户编码
                        syslog.setPersoncode(khbm);
                    }else{                                  //PC端登录存储用户职员代码
                        syslog.setPersoncode(CurrentLoginUser.getUser() == null ? "" : CurrentLoginUser.getUser().getZydm());
                    }
                    if(!StringUtils.isEmpty(ryxm)){
                        syslog.setPersonname(ryxm);
                    }else{
                        syslog.setPersonname(CurrentLoginUser.getUser().getName());
                    }
                    if(!StringUtils.isEmpty(dlzh)){
                        syslog.setLoginaccount(dlzh);
                    }else{
                        syslog.setLoginaccount(CurrentLoginUser.getUser().getUserAccount());
                    }
                    syslog.setLogintype(logintype);
                    syslog.setLogintime(new Date());
                    syslog.setDljg_bm(CurrentLoginUser.getUser() == null?"":CurrentLoginUser.getUser().getDljgBm());
                    syslog.setOuttime(null);
                    syslog.setIp(getIRealIPAddr(request));
                    syslog.setMac(mac);
                    syslog.setUsertype(usertype);
                    loginlogservice.createLoginLog(syslog);
                } else if(operateDescribe.equals("退出系统")) {
                    //获取当前ip
                    String ip = getIRealIPAddr(request);
                    //根据ip查出当前IP地址的最新登录日志
                    LoginLog syslog = loginlogservice.findLoginLogByIP(ip);
                    Date outtime = new Date();
                    loginlogservice.updateLoginLog(syslog.getId(), outtime);
                } else {
                    Log sysLog = new Log();
                    sysLog.setOperatetime(new Date());
                    sysLog.setCompanyname(CurrentLoginUser.getCustomer() == null ? "" : CurrentLoginUser.getCustomer().getName());
                    sysLog.setUserid(CurrentLoginUser.getUser() == null ? "" : CurrentLoginUser.getUser().getZydm());
                    sysLog.setUsername(CurrentLoginUser.getUser() == null ? "" : CurrentLoginUser.getUser().getName());
                    sysLog.setIp(getIRealIPAddr(request));
                    sysLog.setInstitutionid(CurrentLoginUser.getUser() == null ? "" : CurrentLoginUser.getUser().getDljgBm());
                    sysLog.setModule(operateDescribe);
                    sysLog.setContent(String.format("[调用方法：%s.%s] [参数：%s]",
                          packages, methodName, paramDatas == null ? ""
                          : JSON.json(paramDatas)));
                    logservice.createLog(sysLog);
                }
            } catch (Exception ex) {
                logger.error("记录操作日志失败！", ex);
            }
        });
        thread.start();
    }
    
    /**
     * 获取真是ip地址
     * @param request
     *          request对象
     * @return
     *          返回ip地址
     */
    public String getIRealIPAddr(HttpServletRequest request) {
        String ipAddress;
        ipAddress = request.getHeader("x-forwarded-for");
        if (ipAddress == null || ipAddress.length() == 0
                || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }
        if (ipAddress == null || ipAddress.length() == 0
                || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ipAddress == null || ipAddress.length() == 0
                || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
            if (ipAddress.equals("127.0.0.1")
                  || ipAddress.equals("0:0:0:0:0:0:0:1")) {
                // 根据网卡取本机配置的IP
                InetAddress inet = null;
                try {
                    inet = InetAddress.getLocalHost();
                } catch (UnknownHostException e) {
                    e.printStackTrace();
                }
                ipAddress = inet.getHostAddress();
            }
        }
        // 对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割
        if (ipAddress != null && ipAddress.length() > iplength) { // "***.***.***.***".length()
            // = 15
            if (ipAddress.indexOf(",") > 0) {
                ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
            }
        }
        return ipAddress;
    }
    
    private String buildLoginDescirbe(HttpServletRequest request, Object object) {
        String url = request.getRequestURL().toString();
        if (StringUtils.contains(url, "/login")) {
            JSONObject result = null;
            try {
                result = ((JSONObject) JSON.parse(JSON.json(object)));
            } catch (Exception ex) {
                logger.error("", ex);
            }
            if (result != null) {
                return result.get("msg").toString();
            }
        }
        return "";
    }
    
      // 获取方法的中文备注，用于记录用户的操作日志描述
    private String getOperateDescribe(ProceedingJoinPoint joinPoint)
              throws Exception {
        Class<?> clazz = joinPoint.getTarget().getClass();
        String name = joinPoint.getSignature().getName();
        Object[] parameterTypes = joinPoint.getArgs();
        for (Method method : clazz.getDeclaredMethods()) {
            if (method.getName().equals(name)
                  && method.getParameterTypes().length == parameterTypes.length) {
                OperateLog operateLog = method.getAnnotation(OperateLog.class);
                if (operateLog != null) {
                    return operateLog.describe();
                }
                break;
            }
        }
        return "";
    }
}
