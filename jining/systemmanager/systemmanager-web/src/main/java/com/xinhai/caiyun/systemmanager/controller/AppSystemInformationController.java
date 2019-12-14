package com.xinhai.caiyun.systemmanager.controller;

import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.commonmanager.email.JavaMailAttachment;
import com.xinhai.caiyun.commonmanager.utils.PushMessageKhUtil;
import com.xinhai.caiyun.commonmanager.utils.PushMessageUtil;
import com.xinhai.caiyun.systemmanager.api.AppSystemInformation;
import com.xinhai.caiyun.systemmanager.api.AppSystemInformationService;
import com.xinhai.security.api.CurrentLoginUser;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

/**
 * App系统消息
 * @author huxinquan
 */
@Controller
@RequestMapping("appSystemInformation")
public class AppSystemInformationController {
    /**
     * 日志
     */
    Logger logger = LogManager.getLogger(AppSystemInformationController.class.getName());

    /**
     * 接口
     */
    @Autowired
    private AppSystemInformationService appSystemInformationService;

    @Autowired
    private JavaMailAttachment javaMailAttachment;
    /**
     * 查询所有App系统消息
     * @return App系统消息集合
     */
    @RequestMapping(value = "/getAllAppSystemInformation", method = RequestMethod.GET)
    @OperateLog(describe = "查询所有App系统消息")
    @ResponseBody
    public DatatablesViewPage<AppSystemInformation> getAllAppSystemInformation(@RequestParam("begin")String begin, @RequestParam("end")String end
            , @RequestParam("start")String start, @RequestParam("length")String length) {
        Integer startA=Integer.parseInt(start);
        Integer lengthA=Integer.parseInt(length);
        DatatablesViewPage datatablesViewPage=new DatatablesViewPage();
        if(null==begin||"".equals(begin)){
            begin="2017-01";
        }
        if(null==end||"".equals(end)){
            end ="3016-01";
        }
        Long len=appSystemInformationService.getAllAppSystemInformationLen(begin,end);
        List<AppSystemInformation> list=appSystemInformationService.getAllAppSystemInformation(begin,end,startA,lengthA);
        datatablesViewPage.setiTotalRecords(len);
        datatablesViewPage.setiTotalDisplayRecords(len);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 根据ID查询App系统消息
     * @param id id
     * @return App系统消息对象
     */
    @RequestMapping(value = "/getAppSystemInformationById", method = RequestMethod.GET)
    @OperateLog(describe = "根据ID查询App系统消息")
    @ResponseBody
    public AppSystemInformation getAppSystemInformationById(@RequestParam("id") String id) {
        return appSystemInformationService.getAppSystemInformationById(id);
    }

    /**
     * 模糊查询App系统消息
     * @param searchText 搜索文本
     * @return App系统消息集合
     */
    @RequestMapping(value = "/searchAppSystemInformationByText", method = RequestMethod.GET)
    @OperateLog(describe = "模糊查询App系统消息")
    @ResponseBody
    public List<AppSystemInformation> searchAppSystemInformationByText(@RequestParam("searchText") String searchText) {
        return appSystemInformationService.searchAppSystemInformationByText(searchText);
    }

    /**
     * 根据日期查询App系统消息
     * @param beginTime 开始时间
     * @param endTime 结束时间
     * @return App系统消息集合
     */
    @RequestMapping(value = "/getAppSystemInformationByDate", method = RequestMethod.GET)
    @OperateLog(describe = "根据日期查询App系统消息")
    @ResponseBody
    public List<AppSystemInformation> getAppSystemInformationByDate(@RequestParam("beginTime") String beginTime,
                                                                    @RequestParam("endTime") String endTime) {
        return appSystemInformationService.getAppSystemInformationByDate(beginTime, endTime);
    }

    /**
     * 新增App系统消息
     * @param phoneType 手机类型
     * @param informationTypeCode 信息类型代码
     * @param message 消息提醒内容
     * @return true||false
     */
    @RequestMapping(value = "/addAppSystemInformation", method = RequestMethod.POST)
    @OperateLog(describe = "新增系统消息")
    @ResponseBody
    public Boolean addAppSystemInformation(@RequestParam("phoneType") String phoneType,
                                           @RequestParam("informationTypeCode") String informationTypeCode,
                                           @RequestParam("messageJj") String messageJj,
                                           @RequestParam("messageZt") String messageZt,
                                           @RequestParam("message") String message,
                                           @RequestParam("clientType") String clientType,
                                           @RequestParam("sjsj") String sjsj) {
        try {
            AppSystemInformation appSystemInformation = new AppSystemInformation();
            appSystemInformation.setPhoneType(phoneType);
            appSystemInformation.setInformationTypeCode(informationTypeCode);
            if(sjsj==null){
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                sjsj = sdf.format(new Date());
            }
            if ("001".equals(informationTypeCode)) {
                appSystemInformation.setInformationTypeName("系统维护");
                /*
                *
                *   004：ALL所有
     *             005：IOS 平台
     *             006：android 平台*/
                HashMap<String, String> extras = new HashMap<String, String>();
                extras.put("typeId", "1");
                extras.put("messageId", "");
                extras.put("from", "Jpush");
                String msgContent = javaMailAttachment.getSysMb("004", "001");
                String nr = MessageFormat.format(msgContent, sjsj);
                if("0".equals(clientType)){
                    //代理APP
                    if("2".equals(phoneType)){
                        //所有移动端
                        PushMessageUtil.sendPushWithCallback("004", null, null, null, nr,extras);

                    }else if("1".equals(phoneType)){
                        //android
                        PushMessageUtil.sendPushWithCallback("006", null, null, null, nr,extras);

                    }else if("0".equals(phoneType)){
                        //ios
                        PushMessageUtil.sendPushWithCallback("005", null, null, null, nr,extras);

                    }else if("3".equals(phoneType)){
                        //pc端

                    }
                }else if("1".equals(clientType)){
                    //客户APP
                    if("2".equals(phoneType)){
                        //所有移动端
                        PushMessageKhUtil.sendPushWithCallback("004", null, null, null, nr,extras);

                    }else if("1".equals(phoneType)){
                        //android
                        PushMessageKhUtil.sendPushWithCallback("006", null, null, null, nr,extras);

                    }else if("0".equals(phoneType)){
                        //ios
                        PushMessageKhUtil.sendPushWithCallback("005", null, null, null, nr,extras);

                    }else if("3".equals(phoneType)){
                        //pc端

                    }
                }else if("2".equals(clientType)){
                    //财云管家
                }
            } else if ("002".equals(informationTypeCode)) {
                appSystemInformation.setInformationTypeName("预警信息");
            }
            appSystemInformation.setMessageJj(messageJj);
            appSystemInformation.setInformationSpecial(messageZt);
            appSystemInformation.setMessage(message);
            appSystemInformation.setSjsj(sjsj);
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date currentTime = sdf.parse(sdf.format(date));
            appSystemInformation.setEnterDate(currentTime);
            appSystemInformation.setClientType(clientType);//客户端类别

            appSystemInformation.setEnterStaff(CurrentLoginUser.getUser().getZydm());



            //消息编号
            SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
            String sNow = fmt.format(new Date());
            Random random = new Random();
            int s = random.nextInt(999)%(999-100+1) + 100;
            String xxbh = sNow + s;
            appSystemInformation.setMsgNumber(xxbh);

            appSystemInformationService.addAppSystemInformation(appSystemInformation);
            return true;
        } catch (Exception e) {
            logger.error("新增系统消息", e);
        }

        return false;
    }

    /**
     * 跟新App系统消息
     * @param id id
     * @param phoneType 手机类型
     * @param informationTypeCode 信息类型代码
     * @param message 消息提醒内容
     * @return true||false
     */
    @RequestMapping(value = "/updateAppSystemInformation", method = RequestMethod.PUT)
    @OperateLog(describe = "更新App系统消息")
    @ResponseBody
    public Boolean updateAppSystemInformation(@RequestParam("id") String id,
                                              @RequestParam("phoneType") String phoneType,
                                              @RequestParam("informationTypeCode") String informationTypeCode,
                                              @RequestParam("messageJj") String messageJj,
                                              @RequestParam("messageZt") String messageZt,
                                              @RequestParam("message") String message,
                                              @RequestParam("clientType") String clientType,
                                              @RequestParam("sjsj") String sjsj) {
        try {
            AppSystemInformation appSystemInformation = new AppSystemInformation();
            appSystemInformation.setId(Integer.parseInt(id));
            appSystemInformation.setPhoneType(phoneType);
            appSystemInformation.setInformationTypeCode(informationTypeCode);
            if ("001".equals(informationTypeCode)) {
                appSystemInformation.setInformationTypeName("系统维护");
            } else if ("002".equals(informationTypeCode)) {
                appSystemInformation.setInformationTypeName("预警信息");
            }
            appSystemInformation.setMessageJj(messageJj);
            appSystemInformation.setInformationSpecial(messageZt);
            appSystemInformation.setMessage(message);
            appSystemInformation.setSjsj(sjsj);
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date currentTime = sdf.parse(sdf.format(date));
            appSystemInformation.setUpdateDate(currentTime);
            appSystemInformation.setClientType(clientType);

            appSystemInformation.setUpdateStaff(CurrentLoginUser.getUser().getZydm());

            //消息编号
            SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmssSSS");
            String sNow = fmt.format(new Date());
            Random random = new Random();
            int s = random.nextInt(999)%(999-100+1) + 100;
            String xxbh = sNow + s;
            appSystemInformation.setMsgNumber(xxbh);
            appSystemInformationService.updateAppSystemInformation(appSystemInformation);
            return true;
        } catch (Exception e) {
            logger.error("更新App系统消息", e);
        }

        return false;
    }

    /**
     * 逻辑删除App系统消息
     * @param id id
     * @return true||false
     */
    @RequestMapping(value = "/deleteAppSystemInformation", method = RequestMethod.PUT)
    @OperateLog(describe = "逻辑删除App系统消息")
    @ResponseBody
    public Boolean deleteAppSystemInformation(@RequestParam("id") String id) {
        try {
            AppSystemInformation appSystemInformation = new AppSystemInformation();
            appSystemInformation.setId(Integer.parseInt(id));
            appSystemInformation.setIsDelete(1);
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date currentTime = sdf.parse(sdf.format(date));
            appSystemInformation.setDeleteDate(currentTime);
            appSystemInformation.setDeleteStaff(CurrentLoginUser.getUser().getZydm());
            appSystemInformationService.updateAppSystemInformation(appSystemInformation);
            return true;
        } catch (Exception e) {
            logger.error("逻辑删除App系统消息", e);
        }

        return false;
    }

    /**
     * 批量删除App系统消息
     * @param ids id
     * @return true||false
     */
    @RequestMapping(value = "/delCheckedAppSystemInformation", method = RequestMethod.PUT)
    @OperateLog(describe = "批量删除App系统消息")
    @ResponseBody
    public Boolean delCheckedAppSystemInformation(@RequestParam("ids") String ids) {
        try {
            String[] idList = ids.split(",");
            for (String id : idList) {
                if (!"".equals(id)) {
                    AppSystemInformation appSystemInformation = new AppSystemInformation();
                    appSystemInformation.setId(Integer.parseInt(id));
                    appSystemInformation.setIsDelete(1);
                    Date date = new Date();
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    Date currentTime = sdf.parse(sdf.format(date));
                    appSystemInformation.setDeleteDate(currentTime);
                    appSystemInformationService.updateAppSystemInformation(appSystemInformation);
                }
            };
            return true;
        } catch (Exception e) {
            logger.error("批量删除App系统消息", e);
        }

        return false;
    }
}
