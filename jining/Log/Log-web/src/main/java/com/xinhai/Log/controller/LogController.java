package com.xinhai.Log.controller;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.Behavior;
import com.xinhai.Log.api.BehaviorService;
import com.xinhai.Log.api.Log;
import com.xinhai.Log.api.LogService;
import com.xinhai.Log.dao.LogMapper;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.organization.service.OrganizationService;
import com.xinhai.resourcemanager.service.ResourceService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.service.UserService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/Log")
public class LogController {
	Logger logger = LogManager.getLogger(LogController.class.getName());
	
	@Autowired
	private LogService logService;
	@Autowired
	private LogMapper logmapper;
	@Autowired
	private ResourceService resourceServie;
	@Autowired
	private OrganizationService organizationService;
	@Autowired
	private UserService userService;
	@Autowired
	private BehaviorService behaviorservice;
	@Autowired
	private GetDevice getdevice;
	
	
	/**
     * ip地址长度
     */
    private final int iplength = 15;
    
	/**
     * 行为记录
     * 
     * @param request
     */
    @RequestMapping(value = "/1.gif", method = RequestMethod.GET)
    @ResponseBody
    public void createlog(HttpServletRequest request) {
        Behavior log = new Behavior();
        log.setModule(request.getParameter("realTitle"));
        log.setUrl(request.getParameter("realURL"));
        log.setTime(new Date());
        log.setIp(getIRealIPAddr(request));
        log.setOuttime(null);
        log.setAddress(request.getParameter("cityName"));
        log.setDevice(getdevice.getType(request));
        log.setBrowser(request.getParameter("userAgent"));
        log.setTitle(request.getParameter("realTitle"));
        log.setResolution(request.getParameter("windowScreen"));
        log.setReferrer(request.getParameter("referrer"));
        log.setInstitutionid(CurrentLoginUser.getUser().getDljgBm());
        log.setStaffmember(CurrentLoginUser.getUser().getZydm());
        behaviorservice.createBehavior(log);
    }
	
	/**
	 * 按照id查询，查看页面
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/log/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Log getLog(@PathVariable("id") String id) {
		try {
			Log log = logService.findLog(id);
			return log;
		} catch (Exception e) {
			logger.error("", e);
		}
		return null;
	}
	
	@RequestMapping(value = "/log", method = RequestMethod.POST)
	@ResponseBody
	public List<Log> searchLog(@RequestBody JSONObject date) {
		Date starDate=date.getDate("starDate");
		Date endDate=date.getDate("endDate");
		try {
			List<Log> log = logService.searchLog(starDate,endDate);
			return log;
		} catch (Exception e) {
			logger.error("", e);
		}
		return null;
	}
	
	
//	@RequestMapping(value = "/menu", method = RequestMethod.GET)
//	@ResponseBody
//	public JSONArray getResource() {
//		try {
//			List<Resource> data = resourceServie.getResources(CurrentLoginUser.getCustomerId());
//			JSONArray jsonArray = new JSONArray();	
//			for(Resource detail:data)
//			{
//				JSONObject jsonObject = new JSONObject();
//		        jsonObject.put("id", detail.getFuncId());
//		        jsonObject.put("text", detail.getName());
//		        if (detail.getParentId() == null || detail.getParentId().equals("")) {
//		        	jsonObject.put("parent", "#");
//
//		        } else {
//		        	jsonObject.put("parent", detail.getParentId());
//		        }
//		        jsonArray.add(jsonObject);
//			}
//			return jsonArray;
//		} catch (Exception e) {
//			logger.error("", e);
//		}
//		return new JSONArray();
//	}
	
	
//	@RequestMapping(value = "/org", method = RequestMethod.GET)
//	@ResponseBody
//	public JSONArray getOrganization() {
//		try {
//			List<Organization> data =  organizationService.getOrgByCustomer(CurrentLoginUser.getCustomerId());
//			JSONArray jsonArray = new JSONArray();		
//			for(Organization detail:data)
//			{
//				 JSONObject jsonObject = new JSONObject();
//		         jsonObject.put("id", detail.getId()+"@");
//		         jsonObject.put("text", detail.getName());
//		         if (detail.getParentId() == null || detail.getParentId().equals("")) {
//		        	 jsonObject.put("parent", "#");		        	 
//		         } else {
//		        	 jsonObject.put("parent", detail.getParentId()+"@");
//		         }
//		         jsonArray.add(jsonObject);
//		         List<String> list1=new ArrayList<String>();
//		         list1.add(detail.getId());
//		         List<User> users=userService.getUsersByOrg(CurrentLoginUser.getCustomerId(), list1);
//	        	 for(User userDetail:users)
//	        	 {
//	        		 JSONObject jsonObject1 = new JSONObject();
//	        		 jsonObject1.put("id", userDetail.getId());
//	        		 jsonObject1.put("text", userDetail.getName());
//	        		 jsonObject1.put("parent", detail.getId()+"@");
//	        		 jsonArray.add(jsonObject1);
//	        	 }		         
//			}
//			return jsonArray;
//		} catch (Exception e) {
//			logger.error("", e);
//		}
//		return new JSONArray();
//	}
	
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
    
    /**
     * 分页查询
     * @param start
     *              开始条数
     * @param length
     *              每页数据量
     * @param starDate
     *              开始时间
     * @param endDate
     *              结束时间
     * @return
     *              返回数据
     * @throws ParseException
     */
    @RequestMapping(value= "/log", method = RequestMethod.GET)
    @ResponseBody
    public DatatablesViewPage<Log> findAllLog(@RequestParam("start") String start,
            @RequestParam("length") String length,@RequestParam("starDate") String starDate,@RequestParam("endDate") String endDate) throws ParseException{
        String add = "";
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");//小写的mm表示的是分钟  
        Date sDate = sdf.parse(starDate);
        Date eDate = sdf.parse(endDate);
        Calendar begin=Calendar.getInstance();
        begin.setTime(eDate);
        begin.add(Calendar.DAY_OF_MONTH,1);
        add = sdf.format(begin.getTime());
        eDate = sdf.parse(add);
        long totalCount = logService.findAllLoginLogSize(sDate, eDate);
        List<Log> commonProblemTypeList = logService.getLoginLogByPage(Integer.parseInt(start), Integer.parseInt(length), sDate, eDate);
        DatatablesViewPage<Log> datatablesViewPage = new DatatablesViewPage<Log>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(commonProblemTypeList);
        return datatablesViewPage;
    }
}
