package com.xinhai.caiyun.controller.welcome;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.servlet.http.HttpServletRequest;

import com.xinhai.Log.api.BehaviorService;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.bean.LoginLog;
import com.xinhai.caiyun.bean.PtKhtj;
import com.xinhai.caiyun.bean.ReturnObj;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.commonmanager.utils.GetDate;
import com.xinhai.organization.dao.OrganizationMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.api.WelcomeService;
import com.xinhai.caiyun.commonmanager.dao.GetLoginUserInfoMapper;
import com.xinhai.caiyun.dao.WelcomeMapper;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import com.xinhai.usermanager.service.UserService;

/**
 * 首页收费排名，新增客户
 * 
 * @author pusilin
 *
 */
@Controller
@RequestMapping("/welcome")
public class WelcomeController {

	Logger logger = LogManager.getLogger(WelcomeController.class.getName());

	/**
	 * 获取当前登陆的用户编码
	 */
	private String userid = "";

	/**
	 * 自动注入
	 */
	@Autowired
	GetLoginUserInfoMapper getLoginUserInfoMapper;
	@Autowired
	WelcomeService welcomeService;
	@Autowired
	WelcomeMapper welcomeMapper;
	@Autowired
	UserService userService;
	@Autowired
	OrganizationMapper organizationMapper;

	@Autowired
	BehaviorService behaviorService;

	@RequestMapping(value="/if_first",method=RequestMethod.GET)
	@ResponseBody
	public JSONObject ifFirst(){
		JSONObject json=new JSONObject();
		String is_first=String.valueOf(userService.getUser(CurrentLoginUser.getId()).getIs_first());
		json.put("first", is_first);
		return json;
	}

	@RequestMapping(value = "/is_first", method = RequestMethod.GET)
	@ResponseBody
	public JSONObject isFirst(HttpServletRequest request) {
		JSONObject json=new JSONObject();
		String userZydm=CurrentLoginUser.getUser().getId();
		userService.updateByUser(userZydm);
		return json;
	}

	/**
	 * 首页左下角统计收费
	 * @return JSONObject JSONObject
	 */
	@ResponseBody
	@RequestMapping(value = "/charge", method = RequestMethod.GET)
	@OperateLog(describe = "首页收费排名图表")
	public JSONObject charge() {
		JSONObject resultDatas = new JSONObject();
//		userid = CurrentLoginUser.getId();
//		User user = getLoginUserInfoMapper.findUserById(userid);
		List<Map<String, String>> chargeList = null;
		chargeList = welcomeService.charge(CurrentLoginUser.getUser().getDljgBm());
		if (chargeList.size() == 0) {
			chargeList = welcomeMapper.chargeIsNull(CurrentLoginUser.getUser().getDljgBm());
		}
		resultDatas.put("list", chargeList);
		return resultDatas;
	}

	@ResponseBody
	@RequestMapping(value = "/customer", method = RequestMethod.GET)
	public JSONObject newCountCustomer() {
		JSONArray resultDatas = new JSONArray();
		User user = null;
		try {
			user = CurrentLoginUser.getUser();
		}catch (Exception e) {
			System.out.println("=========当前员工获取失败");
			e.printStackTrace();
		}
		List<Map<String, Object>> customerList = welcomeService.newCountCustomer(user.getDljgBm());
		List<Map<String,Object>> lossCustomerList=welcomeService.lossCustomerList(user.getDljgBm());
		int lcnum = welcomeMapper.getLCKhNum(user.getDljgBm()); //获得留存客户数目
		List<String> dates = new ArrayList<String>();
		List<String> dates1=new ArrayList<String>();
		SimpleDateFormat format = new SimpleDateFormat("yyyyMM");
		Calendar c = Calendar.getInstance();
		for (int i = 0; i < 12; i++) {
			// 取过去12个月的年月
			c.setTime(new Date());
			c.add(Calendar.MONTH, -i);
			Date m = c.getTime();
			String mon = format.format(m);
			// 把取出的年月放入到dates集合中
			dates1.add(mon);
			dates.add(mon);
		}
		for (Map<String, Object> map : lossCustomerList) {
			boolean isnot = dates1.contains(map.get("MONTH"));
			if (isnot) {
				dates1.remove(map.get("MONTH"));
			}
		}
		for (String date : dates1) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("MONTH", date);
			map.put("count", "0");
			lossCustomerList.add(map);
		}
		Collections.sort(lossCustomerList, new Comparator<Map<String, Object>>() {

			public int compare(Map<String, Object> o1, Map<String, Object> o2) {
				String name1 = String.valueOf(o1.get("MONTH"));// name1是从你list里面拿出来的一个
				String name2 = String.valueOf(o2.get("MONTH")); // name1是从你list里面拿出来的第二个name
				return name1.compareTo(name2);
			}

		});
/*		for (int i = 0; i < 12; i++) {
			// 取过去12个月的年月
			c.setTime(new Date());
			c.add(Calendar.MONTH, -i);
			Date m = c.getTime();
			String mon = format.format(m);
			// 把取出的年月放入到dates集合中
			dates.add(mon);
		}*/
		// 遍历数据库中的customerList,移除dates包含的年月，去重复
		for (Map<String, Object> map : customerList) {
			boolean isnot = dates.contains(map.get("MONTH"));
			if (isnot) {
				dates.remove(map.get("MONTH"));
			}
		}
		// 把dates集合中剩下的年月重新添加到customerList集合中
		for (String date : dates) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("MONTH", date);
			map.put("NUM", "0");
			customerList.add(map);
		}
		Collections.sort(customerList, new Comparator<Map<String, Object>>() {

			public int compare(Map<String, Object> o1, Map<String, Object> o2) {
				String name1 = (String) o1.get("MONTH");// name1是从你list里面拿出来的一个
				String name2 = (String) o2.get("MONTH"); // name1是从你list里面拿出来的第二个name
				return name1.compareTo(name2);
			}

		});
		
		JSONObject json=new JSONObject();
		json.put("list1",lossCustomerList);
		json.put("list", customerList);
		json.put("lcnum", lcnum); //留存数目
		return json;
	}

	@ResponseBody
	@RequestMapping(value = "/customerGrade", method = RequestMethod.GET)
	public JSONObject customerGrade() {
		JSONObject resultDatas = new JSONObject();
		userid = CurrentLoginUser.getId();
		User user = getLoginUserInfoMapper.findUserById(userid);
		List<Map<String, Object>> gardeList = null;
		gardeList = welcomeService.customerGradeByDljgbm(user.getDljgBm());
		resultDatas.put("list", gardeList);
		return resultDatas;
	}

	/**
	 * 首页汇总统计（商机转换率，记账，报税）
	 * @param tjlx tjlx
	 * @return JSONObject JSONObject
	 * @throws IOException IOException
	 */
	@RequestMapping(value = "/hztj/{tjlx}", method = RequestMethod.GET)
	@OperateLog(describe = "首页商机，记账，报税")
	@ResponseBody
	public JSONObject findHztj(@PathVariable String tjlx) throws IOException {
		JSONObject resultDatas=new JSONObject();
		String dljgbm = "";
		try {
			dljgbm = CurrentLoginUser.getUser().getDljgBm();
		}catch (Exception e) {
			System.out.println("=========代理机构编码获取失败");
			e.printStackTrace();
		}
		List<PtKhtj>  listKhtj;
		List<PtKhtj>  listKhtj2 = new ArrayList<PtKhtj>();
		try {
			listKhtj=welcomeService.findHztj(CurrentLoginUser.getUser().getZydm(),tjlx,dljgbm);
			if (listKhtj != null && listKhtj.size() > 0) {
				listKhtj2 = listKhtj;
			} else {
				PtKhtj pt = new PtKhtj();
				PtKhtj pt2 = new PtKhtj();
				PtKhtj pt3 = new PtKhtj();
				if (tjlx.equals("1")) { //商机转换率
					pt.setLxmc("未同步");
					pt2.setLxmc("已同步");
				} else	if (tjlx.equals("2")) { //记账
					pt.setLxmc("未记账");
					pt2.setLxmc("已记账");
				} else	if (tjlx.equals("3")) { //报税
					pt.setLxmc("未报税");
					pt2.setLxmc("已报税");
				}
				pt3.setLxmc("总数");
				pt.setTj("0");
				pt2.setTj("0");
				pt3.setTj("0");
				listKhtj2.add(pt);
				listKhtj2.add(pt2);
				listKhtj2.add(pt3);
			}
			resultDatas.put("data", listKhtj2);
			resultDatas.put("code", ReturnObj._State_code_Sucess);
			resultDatas.put("message", "成功！");
		}
		catch (Exception ex){
			ex.printStackTrace();
			resultDatas.put("code", ReturnObj._State_code_Error);
			resultDatas.put("message", "失败");
		}
		return resultDatas;
	}

	/**
	 *  客户记账报税列表
	 * @param type 类型
	 * @param pt 参数
	 * @return List<PtKhtj> list
	 */
	@ResponseBody
	@RequestMapping(value = "/findJZBSList/{type}", method = RequestMethod.POST)
	public List<PtKhtj> findJZBSList(@PathVariable("type") String type, @RequestBody PtKhtj pt) {
		String dljgBm = CurrentLoginUser.getUser().getDljgBm();
		String zydm = CurrentLoginUser.getUser().getZydm();
		List<PtKhtj> listKhtj = new ArrayList<PtKhtj>();
		if (type.equals("khjz")) { //客户记账
			listKhtj = welcomeService.findJZList(zydm,dljgBm,pt);
		} else { //报税
			listKhtj = welcomeService.findBSList(zydm, dljgBm, pt);
		}
		return listKhtj;
	}

	/**
	 * 首页三图表
	 * @param type1 1,2代表实收和预收，3代表欠收
	 * @param type2 1代表按月，2代表按年
	 * @return JSONObject JSONObject
	 * @throws IOException IOException
	 */
	@RequestMapping(value = "/threeDatas/{type1}/{type2}", method = RequestMethod.GET)
	@OperateLog(describe = "首页实收，预收，欠收图表")
	@ResponseBody
	public JSONObject threeDatas(@PathVariable String type1, @PathVariable String type2) throws Exception {
		User u= CurrentLoginUser.getUser();
		String dljgBm = u.getDljgBm();
		Calendar cal = Calendar.getInstance();
		int year = cal.get(Calendar.YEAR);  //当年
		int month = cal.get(Calendar.MONTH )+1;  //当月
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		Date thisFirst = null; //本月第一天
		Date thisLast = null; //本月最后一天
		Date lastFirst = null; //去年第一天
		Date lastLast = null; //最后一天
		if (type1.equals("3")) { //欠收 （所有开始的时间要提前一天，方便将开始月份统计在内）
			if (type2.equals("1")) { //按月
				thisFirst = GetDate.getFutureDay(formatter.parse(GetDate.getFirstDay(year,month)),"01",-1); //本月第一天-1
				thisLast = formatter.parse(GetDate.getLastDay(year,month)); //本月最后一天
				lastFirst = GetDate.getFutureDay(formatter.parse(GetDate.getFirstDay(year-1,month)),"01",-1); //去年同月份第一天-1
				lastLast = formatter.parse(GetDate.getLastDay(year-1,month)); //去年同月份最后一天
			} else { //按年
				thisFirst = formatter.parse(GetDate.getLastDay(year-1,month)); //去年同月份最后一天（相当与后一个月份的第一天-1）
				thisLast = formatter.parse(GetDate.getLastDay(year,month)); //当前月份最后一天
				lastFirst = formatter.parse(GetDate.getLastDay(year-2,month)); //前年同月份最后一天（相当与后一个月份的第一天-1）
				lastLast = formatter.parse(GetDate.getLastDay(year-1,month)); //去年同月份最后一天
			}
		} else { //实收和预收
			if (type2.equals("1")) { //按月
				thisFirst = formatter.parse(GetDate.getFirstDay(year,month)); //本月第一天
				thisLast = formatter.parse(GetDate.getLastDay(year,month)); //本月最后一天
				lastFirst = formatter.parse(GetDate.getFirstDay(year-1,month)); //去年同月份第一天
				lastLast = formatter.parse(GetDate.getLastDay(year-1,month)); //去年同月份最后一天
			} else { //按年
				thisFirst = GetDate.getFutureDay(formatter.parse(GetDate.getLastDay(year-1,month)),"01",1); //去年同月份最后一天+1
				thisLast = formatter.parse(GetDate.getLastDay(year,month)); //当前月份最后一天
				lastFirst = GetDate.getFutureDay(formatter.parse(GetDate.getLastDay(year-2,month)),"01",1); //前年同月份最后一天+1
				lastLast = formatter.parse(GetDate.getLastDay(year-1,month)); //去年同月份最后一天
			}
		}
		Date newDate = GetDate.getFutureDay(thisLast,"01",1);
		List<Map<String,Object>> lastDatas = welcomeMapper.threeDatas(type1,dljgBm,thisFirst,thisLast,lastFirst,lastLast,u.getBmdm().substring(0,6),newDate);

		JSONObject resultDatas=new JSONObject();
		DecimalFormat format = new DecimalFormat("0.00"); //格式化
		String [] bmmc= lastDatas.get(0).get("bmmc").toString().split(",");
		String [] thissk= lastDatas.get(0).get("thissk").toString().split(",");
		for(int i = 0; i < thissk.length; i++){
			thissk[i] = format.format(new BigDecimal(thissk[i]));
		}
		String [] lastsk= lastDatas.get(0).get("lastsk").toString().split(",");
		for(int i = 0; i < lastsk.length; i++){
			lastsk[i] = format.format(new BigDecimal(thissk[i]));
		}
		resultDatas.put("bmmc",bmmc);
		resultDatas.put("thissk",thissk);
		resultDatas.put("lastsk",lastsk);
		return resultDatas;
	}


	/**
	 * 一级部门
 	 * @return JSONObject JSONObject
	 */
	@RequestMapping(value = "/findYJBM", method = RequestMethod.GET)
	@ResponseBody
	public JSONObject findYJBM() {
		String dljgBm = CurrentLoginUser.getUser().getDljgBm();
		String bmdm = CurrentLoginUser.getUser().getBmdm().substring(0,6);
		List<Map<String,Object>> list = organizationMapper.findNextBmdm(bmdm,dljgBm);
		JSONObject resultDatas=new JSONObject();
		String [] bmmc= list.get(0).get("name").toString().split(",");
		String [] code= list.get(0).get("code").toString().split(",");
		resultDatas.put("bmmc",bmmc);
		resultDatas.put("code",code);
		return resultDatas;
	}


	/**
	 * 毛利数据
	 * @return JSONObject JSONObject
	 */
	@RequestMapping(value = "/getProfit/{bmdm}", method = RequestMethod.GET)
	@OperateLog(describe = "首页毛利")
	@ResponseBody
	public JSONObject getProfit(@PathVariable String bmdm) throws Exception {
		User u= CurrentLoginUser.getUser();
		String dljgBm = u.getDljgBm();
		String zydm = u.getZydm();
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		int year = cal.get(Calendar.YEAR); //当前年
		int month = cal.get(Calendar.MONTH )+1; //当前月
		Date thisLast = formatter.parse(GetDate.getLastDay(year,month)); //当前最后一天
		Date lastLast = formatter.parse(GetDate.getLastDay(year-1,month)); //去年最后一天

		Date thisBefore = GetDate.getFutureDay(new Date(),"02",-11); //当前时间前推11个月
		cal.setTime(thisBefore);
		year = cal.get(Calendar.YEAR); //新的年
		month = cal.get(Calendar.MONTH )+1; //新的月
		Date thisFirst = formatter.parse(GetDate.getFirstDay(year,month)); //当前第一天
		Date lastFirst = formatter.parse(GetDate.getFirstDay(year-1,month)); //去年第一天

		List<Map<String,Object>> profitDatasOne = welcomeMapper.getProfitOne(dljgBm,thisFirst,thisLast,lastFirst,lastLast,bmdm); //获取今年，去年实际收款情况
		List<Map<String,Object>> profitDatasTwo = welcomeMapper.getProfitTwo(dljgBm,thisFirst,thisLast,lastFirst,lastLast,bmdm); //获取今年，去年垫付情况

		JSONObject resultDatas=new JSONObject();
		String [] months= profitDatasOne.get(0).get("months").toString().split(","); //月份
		String [] sjsk= profitDatasOne.get(0).get("sjsk").toString().split(","); //实际收款
		String [] lastsjsk= profitDatasOne.get(0).get("lastsjsk").toString().split(","); //去年实际收款
		String [] je= profitDatasTwo.get(0).get("je").toString().split(","); //垫付
		String [] lastje= profitDatasTwo.get(0).get("lastje").toString().split(","); //去年垫付

		resultDatas.put("months",months);
		resultDatas.put("sjsk",sjsk);
		resultDatas.put("lastsjsk",lastsjsk);
		resultDatas.put("je",je);
		resultDatas.put("lastje",lastje);
		return resultDatas;
	}

	/**
	 * 大屏展示
	 * @return JSONObject JSONObject
	 */
	@RequestMapping(value = "/getScreenData", method = RequestMethod.GET)
	@OperateLog(describe = "大屏数据展示")
	@ResponseBody
	public JSONObject getScreenData() {
		//代理所在地
		List<Map<String,Object>> CustomerData1 = welcomeMapper.getCustomerScreenData1();
		Collections.sort(CustomerData1, new Comparator <Map<String,Object>>(){
			@Override
			public int compare(Map<String, Object> o1, Map<String, Object> o2) {
				String name1=(String)o1.get("name");
				String name2=(String)o2.get("name");
				return name1.compareTo(name2);
			}
		});
		List<Map<String,Object>> CustomerData2 = welcomeMapper.getCustomerScreenData2();
		Collections.sort(CustomerData2, new Comparator <Map<String,Object>>(){
			@Override
			public int compare(Map<String, Object> o1, Map<String, Object> o2) {
				String name1=(String)o1.get("name");
				String name2=(String)o2.get("name");
				return name1.compareTo(name2);
			}
		});
		//客户所在地
		List<Map<String,Object>> khData1 = welcomeMapper.getKhScreenData1();
		List<Map<String,Object>> khData2 = welcomeMapper.getKhScreenData2();

		Map<String,Object> ddd = new LinkedHashMap<String, Object>();
		JSONObject resultDatas=new JSONObject();
		for(int i = 0; i < CustomerData2.size(); i++){
			String [] location = CustomerData2.get(i).get("value").toString().split(",");

			BigDecimal [] dd = new BigDecimal[2];
			for(int j = 0; j < location.length; j++){
				dd[j] = new BigDecimal(location[j]);
			}
			ddd.put(CustomerData2.get(i).get("name").toString(),dd);
		}

		resultDatas.put("CustomerData1",CustomerData1); //地名+数目
		resultDatas.put("CustomerData2",ddd);		//地名+坐标

		Map<String,Object> ddd2 = new LinkedHashMap<String, Object>();
		for(int i = 0; i < khData2.size(); i++){
			String [] location = khData2.get(i).get("value").toString().split(",");

			BigDecimal [] dd = new BigDecimal[2];
			for(int j = 0; j < location.length; j++){
				dd[j] = new BigDecimal(location[j]);
			}
			ddd2.put(khData2.get(i).get("name").toString(),dd);
		}
		resultDatas.put("khData1",khData1); //地名+数目
		resultDatas.put("khData2",ddd2);	 //地名+坐标

		//获取客户和代理的总数
		Map<String,Object> allKhNum = welcomeMapper.getAllKhNum();
		Map<String,Object> allDlNum = welcomeMapper.getAllDlNum();
		resultDatas.put("allKhNum",allKhNum); //客户
		resultDatas.put("allDlNum",allDlNum); //代理

		//会计评价
		List<Map<String,Object>> kjpjData = welcomeMapper.getKJPJData();
		resultDatas.put("kjpjData",kjpjData);

		//企业规模
		List<Map<String,Object>> qygmData = welcomeMapper.getQYGMData();
		resultDatas.put("qygmData",qygmData);

		//代理所在省份前10名
		List<Map<String,Object>> provinceData = welcomeMapper.getCustomerLocData("1");
		resultDatas.put("provinceData",provinceData);
		//代理所在城市前10名
		List<Map<String,Object>> cityData = welcomeMapper.getCustomerLocData("2");
		resultDatas.put("cityData",cityData);

		//累计交易量（最近7天）
		Date now = new Date(); //今天
		Date tomorrow = GetDate.getFutureDay(now,"01",1); //明天
		Date before = null;
		before = GetDate.getFutureDay(now,"01",-6); //七天前
		List<Map<String,Object>> bussinessData = welcomeMapper.getBussinessData(tomorrow,before,"1");
		Map<String,Object> sumData = welcomeMapper.getSumBussinessData(); //历史总和
		resultDatas.put("bussinessData",bussinessData);
		resultDatas.put("sumData",sumData);

		//最近15天代理和客户的新增情况
		Date beforeHalfMonth = GetDate.getFutureDay(now,"01",-14); //14天前
		List<Map<String,Object>> customerAddData = welcomeMapper.getaddCusAndKhData(tomorrow,beforeHalfMonth, "1");
		resultDatas.put("customerAddData",customerAddData);
		List<Map<String,Object>> khAddData = welcomeMapper.getaddCusAndKhData(tomorrow,beforeHalfMonth, "2");
		resultDatas.put("khAddData",khAddData);

		//代理APP登陆记录
		List<Map<String,Object>> phoneDLData = welcomeMapper.phoneDLData(tomorrow,before,"1");
		resultDatas.put("phoneDLData",phoneDLData);
		//客户APP登陆记录
		List<Map<String,Object>> phoneKHData = welcomeMapper.phoneDLData(tomorrow,before,"0");
		resultDatas.put("phoneKHData",phoneKHData);

		//登陆及浏览记录
		List<Map<String,Object>> PCDLData = welcomeMapper.PCDLData(tomorrow,before,"0"); //登陆记录
		resultDatas.put("PCDLData",PCDLData);
		List<Map<String,Object>> PCCZData = welcomeMapper.PCDLData(tomorrow,before,"1"); //操作记录
		resultDatas.put("PCCZData",PCCZData);

		//代理登陆统计
		List<Map<String,Object>> customerDLData = behaviorService.searchCompanyCountByWeek();
		resultDatas.put("customerDLData", customerDLData);

		return resultDatas;
	}

	/**
	 * 大屏展示
	 * @return JSONObject JSONObject
	 */
	@RequestMapping(value = "/getSumData", method = RequestMethod.GET)
	@OperateLog(describe = "大屏数据展示")
	@ResponseBody
	public JSONObject getSumData(@RequestParam("type") String type) {
		//累计交易量（最近7天）
		Date now = new Date(); //今天
		Date tomorrow = GetDate.getFutureDay(now,"01",1); //明天
		Date before = null;
		if (type.equals("1")) { //周
			before = GetDate.getFutureDay(now,"01",-6); //七天前
		} else if (type.equals("2")) { //月
			before = GetDate.getFutureDay(now,"02",-12); //12个月前
		}
		List<Map<String,Object>> bussinessData = welcomeMapper.getBussinessData(tomorrow,before,type);
		Map<String,Object> sumData = welcomeMapper.getSumBussinessData(); //历史总和
		JSONObject resultDatas = new JSONObject();
		resultDatas.put("bussinessData",bussinessData);
		resultDatas.put("sumData",sumData);
		return resultDatas;
	}

	/**
	 * 代理及客户app登陆信息
	 * @return JSONObject JSONObject
	 */
	@RequestMapping(value = "/getAPPDLData", method = RequestMethod.GET)
	@ResponseBody
	public DatatablesViewPage getAPPDLData(@RequestParam("type") String type, @RequestParam("start") String start,
								   @RequestParam("length") String length//@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate
								   ) throws Exception{
//		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
//		Date start = null;
//		Date end = null;
//		if (!startDate.equals("")) {
//			start = formatter.parse(startDate);
//		}
//		if (!endDate.equals("")) {
//			end = formatter.parse(endDate);
//		}
		//代理APP登陆记录
		List<LoginLog> data = welcomeMapper.getAPPDLData(Integer.parseInt(start), Integer.parseInt(length),type);
		int num = welcomeMapper.getAPPDLDataNum(type);

		DatatablesViewPage<LoginLog> datatablesViewPage = new DatatablesViewPage<LoginLog>();
		datatablesViewPage.setiTotalDisplayRecords(num);
		datatablesViewPage.setiTotalRecords(num);
		datatablesViewPage.setAaData(data);

		return  datatablesViewPage;
	}

}
