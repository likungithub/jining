package com.xinhai.caiyun.systemmanager.controller;

import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.systemmanager.api.AnnouncementType;
import com.xinhai.caiyun.systemmanager.api.AnnouncementTypeService;
import com.xinhai.security.api.CurrentLoginUser;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 公告类型
 * @author huxinquan
 */
@Controller
@RequestMapping("announcementType")
public class AnnouncementTypeController {
    /**
     * 日志
     */
    Logger logger = LogManager.getLogger(AnnouncementTypeController.class.getName());

    /**
     * 接口
     */
    @Autowired
    private AnnouncementTypeService announcementTypeService;

    /**
     * 查找所有公告类型
     * @return 公告类型集合
     */
    @RequestMapping(value = "/getAllAnnouncementType", method = RequestMethod.GET)
    @OperateLog(describe = "查找所有公告类型")
    @ResponseBody
    public List<AnnouncementType> getAllAnnouncementType() {
        return announcementTypeService.getAllAnnouncementType(CurrentLoginUser.getUser().getDljgBm());
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
        return announcementTypeService.getAnnouncementTypeById(id);
    }

    /**
     * 添加公告类型
     * @param announcementTypeName 公告类型名称
     * @return true||false
     */
    @RequestMapping(value = "/addAnnouncementType", method = RequestMethod.POST)
    @OperateLog(describe = "添加公告类型")
    @ResponseBody
    public Boolean addAnnouncementType(@RequestParam("announcementTypeName") String announcementTypeName) {
        try {
            AnnouncementType announcementType = new AnnouncementType();
            if (!"".equals(announcementTypeName)) {
                announcementType.setAnnouncementTypeName(announcementTypeName);
            } else {
                return false;
            }
            announcementType.setTaxpayerIdentificationNumber(CurrentLoginUser.getCustomer().getNsrsbh());
            announcementType.setAgencyCode(CurrentLoginUser.getUser().getDljgBm());
            announcementType.setEnterStaff(CurrentLoginUser.getUser().getZydm());
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date currentTime = sdf.parse(sdf.format(date));
            announcementType.setEnterDate(currentTime);
            announcementTypeService.addAnnouncementType(announcementType);
            return true;
        } catch (Exception e) {
            logger.error("添加公告类型", e);
        }

        return false;
    }

    /**
     * 修改公告类型
     * @param id id
     * @param announcementTypeName 公告类型名称
     * @return true||false
     */
    @RequestMapping(value = "/updateAnnouncementType", method = RequestMethod.PUT)
    @OperateLog(describe = "修改公告类型")
    @ResponseBody
    public Boolean updateAnnouncementType(@RequestParam("id") String id, @RequestParam("announcementTypeName") String announcementTypeName) {
        try {
            AnnouncementType announcementType = announcementTypeService.getAnnouncementTypeById(id);
            if (!"".equals(announcementTypeName)) {
                announcementType.setAnnouncementTypeName(announcementTypeName);
            } else {
                return false;
            }
            announcementType.setUpdateStaff(CurrentLoginUser.getUser().getZydm());
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date currentTime = sdf.parse(sdf.format(date));
            announcementType.setUpdateDate(currentTime);
            announcementTypeService.updateAnnouncementType(announcementType);
            announcementTypeService.updateUsedAnnouncementTypeName(id, announcementTypeName);
            return true;
        } catch (Exception e) {
            logger.error("修改公告类型", e);
        }

        return false;
    }

    /**
     * 删除公告类型
     * @param id id
     * @return true||false
     */
    @RequestMapping(value = "/deleteAnnouncementType", method = RequestMethod.PUT)
    @OperateLog(describe = "删除公告类型")
    @ResponseBody
    public Boolean deleteAnnouncementType(@RequestParam("id") String id) {
        try {
            AnnouncementType announcementType = announcementTypeService.getAnnouncementTypeById(id);
            announcementType.setIsDelete(1);
            announcementType.setDeleteStaff(CurrentLoginUser.getUser().getZydm());
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date currentTime = sdf.parse(sdf.format(date));
            announcementType.setDeleteDate(currentTime);
            announcementTypeService.updateAnnouncementType(announcementType);
            return true;
        } catch (Exception e) {
            logger.error("删除公告类型", e);
        }

        return false;
    }

    /**
     * 获取公告类型使用情况
     * @param id id
     * @return 公告类型使用条数
     */
    @RequestMapping(value = "/getUsedAnnouncementType", method = RequestMethod.GET)
    @OperateLog(describe = "获取公告类型使用情况")
    @ResponseBody
    public int getUsedAnnouncementType(@RequestParam("id") String id) {
        return announcementTypeService.getUsedAnnouncementType(id);
    }

    /**
     * 模糊查询公告类型
     * @param searchText 查询文本
     * @return 公告类型集合
     */
    @RequestMapping(value = "/searchAnnouncementTypeByText", method = RequestMethod.GET)
    @OperateLog(describe = "模糊查询公告类型")
    @ResponseBody
    public List<AnnouncementType> searchAnnouncementTypeByText(@RequestParam("searchText") String searchText) {
        return announcementTypeService.searchAnnouncementTypeByText(CurrentLoginUser.getUser().getDljgBm(), searchText);
    }

    /**
     * 根据分页查询公告类型
     * @param start 起始数
     * @param length 显示条数
     * @param searchText 模糊搜索
     * @return 公告类型集合
     */
    @RequestMapping(value="/getAnnouncementTypeByPaging", method=RequestMethod.GET)
    @OperateLog(describe = "根据分页查询公告类型")
    @ResponseBody
    public DatatablesViewPage<AnnouncementType> getAnnouncementTypeByPaging(@RequestParam("start") String start,
                                                                            @RequestParam("length") String length,
                                                                            @RequestParam("searchText") String searchText){

        long totalCount = announcementTypeService.getAnnouncementTypeTotalCount(CurrentLoginUser.getUser().getDljgBm(), searchText);
        List<AnnouncementType> announcementTypeList = announcementTypeService.getAnnouncementTypeByPaging(CurrentLoginUser.getUser().getDljgBm(), Integer.parseInt(start), Integer.parseInt(length), searchText);

        DatatablesViewPage<AnnouncementType> datatablesViewPage = new DatatablesViewPage<AnnouncementType>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(announcementTypeList);

        return datatablesViewPage;
    }
}
