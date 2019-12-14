package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.commonmanager.utils.PushMessageKhUtil;
import com.xinhai.caiyun.systemmanager.api.AnnouncementType;
import com.xinhai.caiyun.systemmanager.api.SystemAnnouncement;
import com.xinhai.caiyun.systemmanager.api.SystemAnnouncementRead;
import com.xinhai.caiyun.systemmanager.api.SystemAnnouncementService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by huxinquan on 2017/6/28.
 * 系统公告
 */
@Controller
@RequestMapping("systemAnnouncement")
public class SystemAnnouncementController {
    /**
     * 日志
     */
    Logger logger = LogManager.getLogger(SystemAnnouncementController.class.getName());

    /**
     * 接口
     */
    @Autowired
    private SystemAnnouncementService systemAnnouncementService;

    /**
     * 查找所有系统公告
     * @return 系统公告集合
     */
    @RequestMapping(value = "/getAllSystemAnnouncement", method = RequestMethod.GET)
    @OperateLog(describe = "查找所有系统公告")
    @ResponseBody
    public List<SystemAnnouncement> getAllSystemAnnouncement(@RequestParam("tzNumber") String tzNumber) {
        return systemAnnouncementService.getAllSystemAnnouncement(tzNumber);
    }

    /**
     * 查找所有系统公告简介
     * @return 公告阅读情况集合
     */
    @RequestMapping(value = "/getAllSystemAnnouncementRead", method = RequestMethod.GET)
    @OperateLog(describe = "查找所有系统公告简介")
    @ResponseBody
    public List<SystemAnnouncementRead> getAllSystemAnnouncementRead() {
        return systemAnnouncementService.getAllSystemAnnouncementRead(CurrentLoginUser.getUser().getDljgBm(), CurrentLoginUser.getUser().getZydm());
    }

    /**
     * 查找所有未读系统公告简介
     * @return 公告阅读情况集合
     */
    @RequestMapping(value = "/getAllSystemAnnouncementUnread", method = RequestMethod.GET)
    @OperateLog(describe = "查找所有未读系统公告简介")
    @ResponseBody
    public List<SystemAnnouncementRead> getAllSystemAnnouncementUnread() {
        return systemAnnouncementService.getAllSystemAnnouncementUnread(CurrentLoginUser.getUser().getDljgBm(), CurrentLoginUser.getUser().getZydm());
    }

    /**
     * 根据ID查找系统公告
     * @param id id
     * @return 系统公告和公告类型
     */
    @RequestMapping(value = "/getSystemAnnouncementById", method = RequestMethod.GET)
    @OperateLog(describe = "根据ID查找系统公告")
    @ResponseBody
    public JSONObject getSystemAnnouncementById(@RequestParam("id") String id) {
        JSONObject jsonObject = new JSONObject();
        SystemAnnouncement systemAnnouncement = systemAnnouncementService.getSystemAnnouncementById(id);
        jsonObject.put("systemAnnouncement", systemAnnouncement);
        jsonObject.put("announcementType", systemAnnouncementService.getAnnouncementTypeById(systemAnnouncement.getAnnouncementTypeCode() + ""));
        return jsonObject;
    }

    /**
     * 根据通知通告ID查找系统公告
     * @param systemAnnouncementId id
     * @return 系统公告和公告类型
     */
    @RequestMapping(value = "/getSystemAnnouncementBySystemAnnouncementId", method = RequestMethod.GET)
    @OperateLog(describe = "根据通知通告ID查找系统公告")
    @ResponseBody
    public JSONObject getSystemAnnouncementBySystemAnnouncementId(@RequestParam("systemAnnouncementId") String systemAnnouncementId) {
        JSONObject jsonObject = new JSONObject();
        SystemAnnouncement systemAnnouncement = systemAnnouncementService.getSystemAnnouncementBySystemAnnouncementId(systemAnnouncementId);
        jsonObject.put("systemAnnouncement", systemAnnouncement);
        jsonObject.put("announcementType", systemAnnouncementService.getAnnouncementTypeById(systemAnnouncement.getAnnouncementTypeCode() + ""));
        return jsonObject;
    }

    /**
     * 根据text模糊查询系统公告
     * @param searchText 搜索文本
     * @return 公告阅读情况集合
     */
    @RequestMapping(value = "/searchSystemAnnouncementReadByText", method = RequestMethod.GET)
    @OperateLog(describe = "根据text查找系统公告")
    @ResponseBody
    public List<SystemAnnouncementRead> searchSystemAnnouncementReadByText(@RequestParam("searchText") String searchText) {
        return systemAnnouncementService.searchSystemAnnouncementReadByText(searchText, CurrentLoginUser.getUser().getDljgBm(), CurrentLoginUser.getUser().getZydm());
    }

    /**
     * 添加系统公告
     * @param announcementName 公告名称
     * @param announcementTypeCode 公告类型编码
     * @param keyword 关键词
     * @param announcementSource 来源
     * @param announcementDescription 公告描述
     * @param announcementContent 公告内容
     * @param checkAnnouncementIsTop 置顶状态
     * @return true||false
     */
    @RequestMapping(value = "/addSystemAnnouncement", method = RequestMethod.POST)
    @OperateLog(describe = "添加系统公告")
    @ResponseBody
    public Boolean addSystemAnnouncement(@RequestParam("jsflx") String jsflx, @RequestParam("khflmc") String khflmc, @RequestParam("khfldm") String khfldm,@RequestParam("announcementName") String announcementName,
                                    @RequestParam("announcementTypeCode") String announcementTypeCode,
                                    @RequestParam("announcementTypeName") String announcementTypeName,
                                    @RequestParam("keyword") String keyword,
                                    @RequestParam("announcementSource") String announcementSource,
                                    @RequestParam("announcementDescription") String announcementDescription,
                                    @RequestParam("announcementContent") String announcementContent,
                                    @RequestParam("checkAnnouncementIsTop") Boolean checkAnnouncementIsTop) {
        try {
            String uuid = UUID.randomUUID().toString();

            SystemAnnouncement systemAnnouncement = new SystemAnnouncement();
            systemAnnouncement.setSystemAnnouncementId(uuid);
            systemAnnouncement.setJsflx(jsflx);
            systemAnnouncement.setKhfldm(khfldm);
            systemAnnouncement.setKhflmc(khflmc);
            //&& !"".equals(keyword) && !"".equals(announcementSource)
            if (!"".equals(announcementName) && !"".equals(announcementTypeCode)  /*&& !"".equals(announcementDescription)*/ && !"".equals(announcementContent)) {
                systemAnnouncement.setAnnouncementName(announcementName);
                systemAnnouncement.setAnnouncementTypeCode(Integer.parseInt(announcementTypeCode));
                systemAnnouncement.setKeyword(keyword);
                systemAnnouncement.setAnnouncementDescription(announcementDescription);
                systemAnnouncement.setAnnouncementContent(announcementContent);
                systemAnnouncement.setAnnouncementSource(announcementSource);
            } else {
                return false;
            }

            if((announcementSource==null)||("".equals(announcementContent))||("null".equals(announcementContent))){
                systemAnnouncement.setAnnouncementSource(CurrentLoginUser.getUser().getName());
            }

            systemAnnouncement.setIsTop(checkAnnouncementIsTop == true ? 1:0);
            //区域代码暂不使用↓
            systemAnnouncement.setAreaNumber(110000);
            systemAnnouncement.setTaxpayerIdentificationNumber(CurrentLoginUser.getUser().getNsrsbh());
            systemAnnouncement.setAgencyCode(CurrentLoginUser.getUser().getDljgBm());
            systemAnnouncement.setEnterStaff(CurrentLoginUser.getUser().getZydm());
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date currentTime = sdf.parse(sdf.format(date));
            systemAnnouncement.setEnterDate(currentTime);
            systemAnnouncementService.addSystemAnnouncement(systemAnnouncement);
            String commonstr = "尊敬的客户您好,有新的通知通告:"+systemAnnouncement.getAnnouncementName();

            if("0".equals(jsflx)){//0 员工 1客户
                List<User> userList = systemAnnouncementService.getUserByAgencyCode(CurrentLoginUser.getUser().getDljgBm());
                for (User user: userList) {
                    /*if(user.getZydm().equals(CurrentLoginUser.getUser().getZydm())){
                        continue;
                    }*/

                    /*if(user.isIfManager()){
                        continue;
                    }*/

                    SystemAnnouncementRead systemAnnouncementRead = new SystemAnnouncementRead();
                    systemAnnouncementRead.setSystemAnnouncementId(uuid);
                    if (!"".equals(announcementName) && !"".equals(announcementTypeCode) && !"".equals(announcementTypeName)) {
                        systemAnnouncementRead.setAnnouncementName(announcementName);
                        systemAnnouncementRead.setAnnouncementTypeCode(Integer.parseInt(announcementTypeCode));
                        systemAnnouncementRead.setAnnouncementTypeName(announcementTypeName);
                    } else {
                        return false;
                    }
                    systemAnnouncementRead.setAgencyCode(CurrentLoginUser.getUser().getDljgBm());
                    systemAnnouncementRead.setIsTop(checkAnnouncementIsTop == true ? 1:0);
                    systemAnnouncementRead.setStaffNumber(user.getZydm());
                    systemAnnouncementRead.setPublishDate(currentTime);
                    systemAnnouncementRead.setJsflx(jsflx);
                    systemAnnouncementRead.setKhfldm(khfldm);
                    systemAnnouncementRead.setKhflmc(khflmc);
                    systemAnnouncementService.addSystemAnnouncementRead(systemAnnouncementRead);
                }
            }else{
                List<Map> KhxxList = new ArrayList<>();
                if((khfldm==null)||("null".equals(khfldm))||("".equals(khfldm))){//全部
                   KhxxList = systemAnnouncementService.getKhxxByAgencyCode(CurrentLoginUser.getUser().getDljgBm(),null);
                }else{
                    KhxxList = systemAnnouncementService.getKhxxByAgencyCode(CurrentLoginUser.getUser().getDljgBm(),khfldm);
                }
                HashMap<String, String> extras = new HashMap<String, String>();
                extras.put("typeId", "1");
                extras.put("messageId", "110");
                extras.put("from", "Jpush");
                for(Map khxx:KhxxList){
                    String khbm = khxx.get("khbm")+"";
                    if (notNULL(khbm)) {
                        PushMessageKhUtil.sendPushWithCallback("001", khbm, null, null, commonstr, extras);
                    }
                    SystemAnnouncementRead systemAnnouncementRead = new SystemAnnouncementRead();
                    systemAnnouncementRead.setSystemAnnouncementId(uuid);
                    if (!"".equals(announcementName) && !"".equals(announcementTypeCode) && !"".equals(announcementTypeName)) {
                        systemAnnouncementRead.setAnnouncementName(announcementName);
                        systemAnnouncementRead.setAnnouncementTypeCode(Integer.parseInt(announcementTypeCode));
                        systemAnnouncementRead.setAnnouncementTypeName(announcementTypeName);
                    } else {
                        return false;
                    }
                    systemAnnouncementRead.setAgencyCode(CurrentLoginUser.getUser().getDljgBm());
                    systemAnnouncementRead.setIsTop(checkAnnouncementIsTop == true ? 1:0);
                    systemAnnouncementRead.setStaffNumber(khbm);
                    systemAnnouncementRead.setPublishDate(currentTime);
                    systemAnnouncementRead.setJsflx(jsflx);
                    systemAnnouncementRead.setKhfldm(khfldm);
                    systemAnnouncementRead.setKhflmc(khflmc);
                    systemAnnouncementService.addSystemAnnouncementRead(systemAnnouncementRead);
                }

            }



            return true;
        } catch (Exception e) {
            logger.error("添加系统公告", e);
        }

        return false;
    }

    /**
     * 修改系统公告
     * @param systemAnnouncementId id
     * @param announcementName 公告名称
     * @param announcementTypeCode 公告类型编码
     * @param keyword 关键字
     * @param announcementSource 公告来源
     * @param announcementDescription 公告描述
     * @param announcementContent 公告内容
     * @param checkAnnouncementIsTop 置顶状态
     * @return true||false
     */
    @RequestMapping(value = "/updateSystemAnnouncement", method = RequestMethod.PUT)
    @OperateLog(describe = "修改系统公告")
    @ResponseBody
    public Boolean updateSystemAnnouncement(@RequestParam("jsflx") String jsflx, @RequestParam("khflmc") String khflmc, @RequestParam("khfldm") String khfldm,@RequestParam("systemAnnouncementId") String systemAnnouncementId,
                                            @RequestParam("announcementName") String announcementName,
                                            @RequestParam("announcementTypeCode") String announcementTypeCode,
                                            @RequestParam("announcementTypeName") String announcementTypeName,
                                            @RequestParam("keyword") String keyword,
                                            @RequestParam("announcementSource") String announcementSource,
                                            @RequestParam("announcementDescription") String announcementDescription,
                                            @RequestParam("announcementContent") String announcementContent,
                                            @RequestParam("checkAnnouncementIsTop") Boolean checkAnnouncementIsTop) {
        try {
            SystemAnnouncement systemAnnouncement = systemAnnouncementService.getSystemAnnouncementBySystemAnnouncementId(systemAnnouncementId);
            systemAnnouncement.setJsflx(jsflx);
            systemAnnouncement.setKhfldm(khfldm);
            systemAnnouncement.setKhflmc(khflmc);
            //&& !"".equals(keyword) && !"".equals(announcementSource)&& !"".equals(announcementDescription)
            if (!"".equals(announcementName) && !"".equals(announcementTypeCode)   && !"".equals(announcementContent)) {
                systemAnnouncement.setAnnouncementName(announcementName);
                systemAnnouncement.setAnnouncementTypeCode(Integer.parseInt(announcementTypeCode));
                systemAnnouncement.setKeyword(keyword);
                systemAnnouncement.setAnnouncementDescription(announcementDescription);
                systemAnnouncement.setAnnouncementContent(announcementContent);
                systemAnnouncement.setAnnouncementSource(announcementSource);
            } else {
                return false;
            }

            String commonstr = "尊敬的客户您好,有新的通知通告:"+systemAnnouncement.getAnnouncementName();

            if("0".equals(jsflx)){//0 员工 1客户

            }else{
                List<Map> KhxxList = new ArrayList<>();
                if((khfldm==null)||("null".equals(khfldm))||("".equals(khfldm))){//全部
                    KhxxList = systemAnnouncementService.getKhxxByAgencyCode(CurrentLoginUser.getUser().getDljgBm(),null);
                }else{
                    KhxxList = systemAnnouncementService.getKhxxByAgencyCode(CurrentLoginUser.getUser().getDljgBm(),khfldm);
                }
                HashMap<String, String> extras = new HashMap<String, String>();
                extras.put("typeId", "1");
                extras.put("messageId", "110");
                extras.put("from", "Jpush");
                for(Map khxx:KhxxList){
                    String khbm = khxx.get("khbm")+"";
                    if (notNULL(khbm)) {
                        PushMessageKhUtil.sendPushWithCallback("001", khbm, null, null, commonstr, extras);
                    }
                }

            }



            if((announcementSource==null)||("".equals(announcementContent))||("null".equals(announcementContent))){
                systemAnnouncement.setAnnouncementSource(CurrentLoginUser.getUser().getName());
            }
            systemAnnouncement.setIsTop(checkAnnouncementIsTop == true ? 1:0);
            //区域代码暂不使用↓
            systemAnnouncement.setAreaNumber(110000);
            systemAnnouncement.setTaxpayerIdentificationNumber(CurrentLoginUser.getUser().getNsrsbh());
            systemAnnouncement.setAgencyCode(CurrentLoginUser.getUser().getDljgBm());
            systemAnnouncement.setUpdateStaff(CurrentLoginUser.getUser().getZydm());
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date currentTime = sdf.parse(sdf.format(date));
            systemAnnouncement.setUpdateDate(currentTime);
            systemAnnouncementService.updateSystemAnnouncement(systemAnnouncement);

            SystemAnnouncementRead systemAnnouncementRead = new SystemAnnouncementRead();
            systemAnnouncementRead.setSystemAnnouncementId(systemAnnouncement.getSystemAnnouncementId());
            if (!"".equals(announcementName) && !"".equals(announcementTypeCode) && !"".equals(announcementTypeName)) {
                systemAnnouncementRead.setAnnouncementName(announcementName);
                systemAnnouncementRead.setAnnouncementTypeCode(Integer.parseInt(announcementTypeCode));
                systemAnnouncementRead.setAnnouncementTypeName(announcementTypeName);
            }
            systemAnnouncementRead.setJsflx(jsflx);
            systemAnnouncementRead.setKhfldm(khfldm);
            systemAnnouncementRead.setKhflmc(khflmc);
            systemAnnouncementRead.setIsRead(0);
            systemAnnouncementRead.setIsTop(checkAnnouncementIsTop == true ? 1:0);
            systemAnnouncementRead.setPublishDate(currentTime);
            systemAnnouncementService.updateSystemAnnouncementRead(systemAnnouncementRead);
            return true;
        } catch (Exception e) {
            logger.error("修改系统公告", e);
        }

        return false;
    }

    /**
     * 删除系统公告
     * @param systemAnnouncementId 系统公告id
     * @return true||false
     */
    @RequestMapping(value = "/delSystemAnnouncement", method = RequestMethod.PUT)
    @OperateLog(describe = "删除系统公告")
    @ResponseBody
    public Boolean delSystemAnnouncement(@RequestParam("systemAnnouncementId") String systemAnnouncementId) {
        try {
            SystemAnnouncementRead systemAnnouncementRead = new SystemAnnouncementRead();
            systemAnnouncementRead.setSystemAnnouncementId(systemAnnouncementId);
            systemAnnouncementRead.setIsDelete(1);
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date currentTime = sdf.parse(sdf.format(date));
            systemAnnouncementRead.setDeleteDate(currentTime);
            systemAnnouncementService.updateSystemAnnouncementRead(systemAnnouncementRead);

            SystemAnnouncement systemAnnouncement = systemAnnouncementService.getSystemAnnouncementBySystemAnnouncementId(systemAnnouncementId);
            systemAnnouncement.setIsDelete(1);
            systemAnnouncement.setDeleteStaff(CurrentLoginUser.getUser().getZydm());
            systemAnnouncement.setDeleteDate(currentTime);
            systemAnnouncementService.updateSystemAnnouncement(systemAnnouncement);
            return true;
        } catch (Exception e) {
            logger.error("删除系统公告", e);
        }

        return false;
    }

    /**
     * 根据checkbox删除系统公告
     * @param systemAnnouncementIds 系统公告id集合
     * @return true||false
     */
    @RequestMapping(value = "/delCheckedSystemAnnouncement", method = RequestMethod.PUT)
    @OperateLog(describe = "根据checkbox删除系统公告")
    @ResponseBody
    public Boolean delCheckedSystemAnnouncement(@RequestParam("systemAnnouncementIds") String systemAnnouncementIds) {
        try {
            String[] systemAnnouncementIdList = systemAnnouncementIds.split(",");
            for (String systemAnnouncementId : systemAnnouncementIdList) {
                if (!"".equals(systemAnnouncementId)) {
                    SystemAnnouncementRead systemAnnouncementRead = new SystemAnnouncementRead();
                    systemAnnouncementRead.setSystemAnnouncementId(systemAnnouncementId);
                    systemAnnouncementRead.setIsDelete(1);
                    Date date = new Date();
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    Date currentTime = sdf.parse(sdf.format(date));
                    systemAnnouncementRead.setDeleteDate(currentTime);
                    systemAnnouncementService.updateSystemAnnouncementRead(systemAnnouncementRead);

                    SystemAnnouncement systemAnnouncement = systemAnnouncementService.getSystemAnnouncementBySystemAnnouncementId(systemAnnouncementId);
                    systemAnnouncement.setIsDelete(1);
                    systemAnnouncement.setDeleteStaff(CurrentLoginUser.getUser().getZydm());
                    systemAnnouncement.setDeleteDate(currentTime);
                    systemAnnouncementService.updateSystemAnnouncement(systemAnnouncement);
                }
            }
            return true;
        } catch (Exception e) {
            logger.error("根据checkbox删除系统公告", e);
        }

        return false;
    }

    /**
     * 已读系统公告
     * @param id id
     * @return true||false
     */
    @RequestMapping(value = "/readSystemAnnouncement", method = RequestMethod.PUT)
    @OperateLog(describe = "已读系统公告")
    @ResponseBody
    public Boolean readSystemAnnouncement(@RequestParam("id") String id) {
        try {
            Set<String> operatorAuthes = CurrentLoginUser.getOperatorAuth();
            if (operatorAuthes.size() != 0 && operatorAuthes.contains("editSystemAnnouncement")) {
                //可以查看所有的公告
                try {
                  SystemAnnouncement systemAnnouncement =  systemAnnouncementService.getSystemAnnouncementById(id);//主表ID
                     String tztzid = systemAnnouncement.getSystemAnnouncementId();
                     String zydm = CurrentLoginUser.getUser().getZydm();


                    SystemAnnouncementRead systemAnnouncementRead = new SystemAnnouncementRead();
                    systemAnnouncementRead.setIsRead(1);
                    Date date = new Date();
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    Date currentTime = sdf.parse(sdf.format(date));
                    systemAnnouncementRead.setReadDate(currentTime);
                    systemAnnouncementRead.setSystemAnnouncementId(tztzid);
                    systemAnnouncementRead.setStaffNumber(zydm);
                    systemAnnouncementRead.setId(0);
                    systemAnnouncementService.readSystemAnnouncement(systemAnnouncementRead);

                } catch (Exception e) {
                }
            } else {
                SystemAnnouncementRead systemAnnouncementRead = systemAnnouncementService.getSystemAnnouncementReadById(id);
                systemAnnouncementRead.setIsRead(1);
                Date date = new Date();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Date currentTime = sdf.parse(sdf.format(date));
                systemAnnouncementRead.setReadDate(currentTime);
                systemAnnouncementService.readSystemAnnouncement(systemAnnouncementRead);
            }


            return true;
        } catch (Exception e) {
            logger.error("已读系统公告", e);
        }

        return false;
    }

    /**
     * 根据checkbox已读系统公告
     * @param ids id集合
     * @return true||false
     */
    @RequestMapping(value = "/readCheckedSystemAnnouncement", method = RequestMethod.PUT)
    @OperateLog(describe = "根据checkbox已读系统公告")
    @ResponseBody
    public Boolean readCheckedSystemAnnouncement(@RequestParam("ids") String ids) {
        try {
            String[] idList = ids.split(",");
            for (String id : idList) {
                if (!"".equals(id)) {
                    SystemAnnouncementRead systemAnnouncementRead = systemAnnouncementService.getSystemAnnouncementReadById(id);
                    systemAnnouncementRead.setIsRead(1);
                    Date date = new Date();
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    Date currentTime = sdf.parse(sdf.format(date));
                    systemAnnouncementRead.setReadDate(currentTime);
                    systemAnnouncementService.readSystemAnnouncement(systemAnnouncementRead);
                }
            };
            return true;
        } catch (Exception e) {
            logger.error("根据checkbox已读系统公告", e);
        }

        return false;
    }

    /**
     * 查找所有公告类型
     * @return 公告类型集合（放在select2中，属性为id和text）
     */
    @RequestMapping(value = "/getAllAnnouncementType", method = RequestMethod.GET)
    @OperateLog(describe = "查找所有公告类型")
    @ResponseBody
    public JSONArray getAllAnnouncementType() {
        List<AnnouncementType> announcementTypeList = systemAnnouncementService.getAllAnnouncementType(CurrentLoginUser.getUser().getDljgBm());
        JSONArray jsonArray = new JSONArray();
        for (AnnouncementType announcementType : announcementTypeList) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", announcementType.getId());
            jsonObject.put("text", announcementType.getAnnouncementTypeName());
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    /**
     * 根据ID查找公告类型
     * @param id id
     * @return 公告类型对象
     */
    @RequestMapping(value = "/getAnnouncementTypeById", method = RequestMethod.GET)
    @OperateLog(describe = "根据ID查找公告类型")
    @ResponseBody
    public AnnouncementType getAnnouncementTypeById(@RequestParam("id") String id) {
        return systemAnnouncementService.getAnnouncementTypeById(id);
    }

    /**
     * 根据名称查找是否存在
     * @param name name
     * @return
     */
    @RequestMapping(value = "/getAnnouncementTypeByName", method = RequestMethod.GET)
    @OperateLog(describe = "根据名称查找是否存在")
    @ResponseBody
    public int getAnnouncementTypeByName(@RequestParam("name") String name,@RequestParam("dm") String dm) {
        String dljgbm = CurrentLoginUser.getUser().getDljgBm();
        try {
            name = URLDecoder.decode(URLDecoder.decode(name,"UTF-8"),"UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return systemAnnouncementService.getAnnouncementTypeByName(name,dljgbm,dm);
    }

    public boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
    }
    /**
     * 根据分页查询系统公告类型
     * @param start 起始数
     * @param length 显示条数
     * @param searchText 模糊搜索
     * @return 系统公告类型集合
     */
    @RequestMapping(value="/getSystemAnnouncementByPaging", method=RequestMethod.GET)
    @OperateLog(describe = "根据分页查询系统公告类型")
    @ResponseBody
    public DatatablesViewPage<Map> getSystemAnnouncementByPaging(@RequestParam("start") String start,
                                                                 @RequestParam("length") String length,
                                                                 @RequestParam("searchText") String searchText,
                                                                 @RequestParam("beginTime") String beginTime,
                                                                 @RequestParam("endTime") String endTime, @RequestParam("jsflx") String jsflx){
        if (!"".equals(endTime)) {
            endTime += " 23:59:59";
        }
        Map cxtj = new HashMap();
        String zydm = CurrentLoginUser.getUser().getZydm();
        Set<String> operatorAuthes = CurrentLoginUser.getOperatorAuth();
        systemAnnouncementService.updateydzt(cxtj);//跟新客户公告状态
        if (operatorAuthes.size() != 0 && operatorAuthes.contains("editSystemAnnouncement")) {
            cxtj.put("zzydm",zydm);
            zydm=null;
            cxtj.put("zydm",zydm);
        }

        if(notNULL(start)){
            cxtj.put("start",start);
        }
        if(notNULL(length)){
            cxtj.put("length",length);
        }
        if(notNULL(zydm)){
            cxtj.put("zydm",zydm);
        }
        if(notNULL(searchText)){
            cxtj.put("searchText",searchText);
        }
        if(notNULL(beginTime)){
            cxtj.put("beginTime",beginTime);
        }
        if(notNULL(endTime)){
            cxtj.put("endTime",endTime);
        }

        if(notNULL(jsflx)){
            cxtj.put("jsflx",jsflx);
        }



        cxtj.put("dljgbm",CurrentLoginUser.getUser().getDljgBm());


        long totalCount = systemAnnouncementService.getSystemAnnouncementTotalCount(cxtj);
        List<Map> systemAnnouncementReadList = systemAnnouncementService.getSystemAnnouncementByPaging(cxtj);

        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(systemAnnouncementReadList);

        return datatablesViewPage;
    }
}
