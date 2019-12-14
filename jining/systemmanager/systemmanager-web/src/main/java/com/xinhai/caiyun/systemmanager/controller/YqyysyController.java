package com.xinhai.caiyun.systemmanager.controller;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.YqyysyService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Controller
@Transactional
@RequestMapping("/yqyysy")
public class YqyysyController {
	@Autowired
	private YqyysyService yqyysyService;
	String[] jcxIds=null;
	/**
	 * 查询仪器所有信息
	 */
	@RequestMapping("/findAllYq")
	@ResponseBody
	public DatatablesViewPage<Map> findAllYq(@RequestParam("start") String start,
											  @RequestParam("length") String length,
											  @RequestParam("startDate") String startDate,
											  @RequestParam("endDate") String endDate,
											  @RequestParam("yqmc") String yqmc
											 ){
		Map map=new HashMap();
		SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd");
		if(startDate!=null && !"".equals(startDate)){
			try {
				map.put("startDate",sf.parse(startDate));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		if(endDate!=null && !"".equals(endDate)){
			try {
				map.put("endDate",sf.parse(endDate));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		map.put("start",Integer.parseInt(start));
		map.put("length",Integer.parseInt(length));
		map.put("yqmc",yqmc);
		DatatablesViewPage<Map> datatablesViewPage=new DatatablesViewPage<Map>();
		List<Map> list=yqyysyService.findAllYq(map);
		Integer  num=yqyysyService.findAllYqNum(map);
		datatablesViewPage.setAaData(list);
		datatablesViewPage.setiTotalRecords(num);
		datatablesViewPage.setiTotalDisplayRecords(num);
		return datatablesViewPage;
	};
	/**
	 * 查询检测项目信息
	 */
	@RequestMapping("/findAllJcxm")
	@ResponseBody
	public DatatablesViewPage<Map> findAllJcxm(@RequestParam("start") String start,
											 @RequestParam("length") String length,
											 @RequestParam("jcxmc") String jcxmc
											 /*  @RequestParam("if_yqfp") String if_yifp*/
	){
		Map map=new HashMap();
		map.put("start",Integer.parseInt(start));
		map.put("length",Integer.parseInt(length));
		map.put("jcxmc",jcxmc);
		/*map.put("if_yqfp",if_yifp);*/
		DatatablesViewPage<Map> datatablesViewPage=new DatatablesViewPage<Map>();
		List<Map> list=yqyysyService.findAllJcxm(map);
		Integer  num=yqyysyService.findAllJcxmNum(map);
		datatablesViewPage.setAaData(list);
		datatablesViewPage.setiTotalRecords(num);
		datatablesViewPage.setiTotalDisplayRecords(num);
		return datatablesViewPage;
	};
	@RequestMapping("/addJcxIds")
	@ResponseBody
	public Map addJcxIds(String[] id){
		jcxIds=null;
		jcxIds=id;
		Map map=new HashMap();
		map.put("info","增加成功");
		return map;
	}
	@RequestMapping("/addYq")
	@ResponseBody
	public Map addYq(String[] yqids){
		String[] yqIds=yqids;
		Map jcxm=new HashMap();
		Map yq=new HashMap();
		Map jcxmYq=new HashMap();
		jcxm.put("if_yqfp","002");
		yq.put("dqzt","使用中");
		for(int i=0;i<jcxIds.length;i++){//遍历检测项数组
			jcxmYq.put("jcxmid",jcxIds[i]);//将检测项数据放在检测项仪器map中
			for(int j=0;j<yqIds.length;j++){//遍历仪器id数组
				jcxmYq.put("yqid",yqIds[j]);//将仪器的id放在放在检测项仪器map中
				yqyysyService.addJcxYq(jcxmYq);//将数据添加到数据库中
			}
		}
		for(int i=0;i<jcxIds.length;i++){//遍历检测id
			jcxm.put("id",Integer.parseInt(jcxIds[i]));
			yqyysyService.updataJcxm_If_yqfp(jcxm);//修改检测表的状态
		}
		for(int i=0;i<yqIds.length;i++){
			yq.put("id",Integer.parseInt(yqIds[i]));
			yqyysyService.updateYq_dqzt(yq);//修改仪器表的状态
		}
		Map map=new HashMap();
		map.put("info","增加成功");
		return map;
	}
}
