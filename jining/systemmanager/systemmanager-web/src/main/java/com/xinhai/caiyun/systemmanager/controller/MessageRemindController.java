package com.xinhai.caiyun.systemmanager.controller;

import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.SystemMessages;
import com.xinhai.caiyun.customermanage.api.SystemMessagesService;
import com.xinhai.caiyun.systemmanager.api.MessageType;
import com.xinhai.caiyun.systemmanager.api.MessageTypeService;
import com.xinhai.security.api.CurrentLoginUser;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/messageremind")
public class MessageRemindController {

	private Logger logger = LogManager.getLogger(MessageRemindController.class
			.getName());
	@Autowired
    SystemMessagesService systemmessagesService;
	@Autowired
    MessageTypeService messageTypeService;

	//@Autowired
	//SystemMessagesMapper systemMessagesMapper;

	/**
	 * 阅读标志
	 */
	private int ReadStat = 0;
	
	/**
	 * 按条件分页查询
	 * @param start
	 *             开始条数
	 * @param length
	 *             每页条数
	 * @param beginTime
	 *             开始时间
	 * @param endTime
	 *             结束时间
	 * @param type
	 *             类型
	 * @param ydbz
	 *             阅读标志
	 * @param selectTime
	 *             时间选择
	 * @return
	 * @throws ParseException 
	 */
	@RequestMapping(value = "/searchByAll", method = RequestMethod.GET)
	@OperateLog(describe="查看系统消息")
	@ResponseBody
	public DatatablesViewPage<SystemMessages> search(@RequestParam("start") String start, @RequestParam("length") String length, @RequestParam("beginTime") String beginTime,
                                                     @RequestParam("endTime") String endTime, @RequestParam("type") String type, @RequestParam("ydbz") String ydbz, @RequestParam("selectTime") String selectTime) throws ParseException{
	    String add = "";
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");//小写的mm表示的是分钟  
        Calendar begin=Calendar.getInstance();
        Date ssDate=null,seDate=null;
        if(!beginTime.equals("")&&beginTime!=null){
            ssDate = sdf.parse(beginTime);
        }
        if(!endTime.equals("")&&endTime!=null){
            seDate = sdf.parse(endTime);
            begin.setTime(seDate);
            begin.add(Calendar.DAY_OF_MONTH,1);
            add = sdf.format(begin.getTime());
            seDate = sdf.parse(add);
        }
        String dljgbm = CurrentLoginUser.getUser().getDljgBm();
        String zydm = CurrentLoginUser.getUser().getZydm();
        long searchByAllAndAdmincount = systemmessagesService.searchByAllAndAdmincountNew(dljgbm, ydbz,type,ssDate,seDate,selectTime,zydm);
        List<SystemMessages> searchByAllAndAdmin=systemmessagesService.searchByAllAndAdminNew(dljgbm,Integer.parseInt(start), Integer.parseInt(length), ydbz, type, ssDate,seDate,selectTime,zydm);
        DatatablesViewPage<SystemMessages> datatablesViewPage = new DatatablesViewPage<SystemMessages>();
        datatablesViewPage.setiTotalDisplayRecords(searchByAllAndAdmincount);
        datatablesViewPage.setiTotalRecords(searchByAllAndAdmincount);
        datatablesViewPage.setAaData(searchByAllAndAdmin);
        return datatablesViewPage;
	}
	@RequestMapping(value = "/findAllType",method = RequestMethod.GET)
	@ResponseBody
	public List<MessageType> findAllType(){
		return messageTypeService.findAllType();
	}

	/**
	 * 通过id删除
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deleteById/{id}", method = RequestMethod.DELETE)
	@OperateLog(describe="删除消息提醒")
	@ResponseBody
	public boolean deleteById(@PathVariable("id") String id) {
		String dl = CurrentLoginUser.getCustomer().getCode();
		String ygdm = CurrentLoginUser.getUser().getZydm();
		if (id.contains(",")) {// 批量删除
			String[] ids = id.split(",");
			for (int i = 0; i < ids.length; i++) {
				systemmessagesService.deleteById(ids[i], dl, ygdm);
			}
		} else {
			systemmessagesService.deleteById(id, dl, ygdm);
		}

		return true;

	}

	/**
	 * 通通过datetable列中的id对阅读状态进行改变
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/updateById/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public boolean updateById(@PathVariable("id") String id) {
		String dl = CurrentLoginUser.getCustomer().getCode();
		String ygdm = CurrentLoginUser.getUser().getZydm();
		if (id.contains(",")) {// 批量删除
			String[] ids = id.split(",");
			for (int i = 0; i < ids.length; i++) {
				systemmessagesService.updateById(ids[i], dl, ygdm);
			}
		} else {
			systemmessagesService.updateById(id, dl, ygdm);
		}
		return true;
	}

	/**
	 * 查询派工数量
	 * @return
	 */
	@RequestMapping(value = "/searchCount", method = RequestMethod.GET)
	@ResponseBody
	public Integer searchCount() {
		logger.debug("getSystemMessagesCount");
		//JSONObject json = new JSONObject();
		int searchCount = systemmessagesService.searchCount(CurrentLoginUser.getUser().getDljgBm(), CurrentLoginUser.getUser().getZydm());
//		String dl = CurrentLoginUser.getUser().getDljgBm();
//		if (CurrentLoginUser.getUser().isIfManager()) { // 为管理员，展示全部派工信息
//			searchCount = systemMessagesMapper.searchDLCount(dl);
//		} else { //其他人，只展示自己的派工信息
//			String zydm = CurrentLoginUser.getUser().getZydm();
//			searchCount = systemmessagesService.searchCount(dl, zydm);
//		}

		//json.put("count", searchCount);
		return searchCount;
	}

}
