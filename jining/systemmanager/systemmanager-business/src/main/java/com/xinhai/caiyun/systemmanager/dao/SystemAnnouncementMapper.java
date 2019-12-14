package com.xinhai.caiyun.systemmanager.dao;

import com.xinhai.caiyun.systemmanager.api.AnnouncementType;
import com.xinhai.caiyun.systemmanager.api.SystemAnnouncement;
import com.xinhai.caiyun.systemmanager.api.SystemAnnouncementRead;
import com.xinhai.usermanager.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 系统公告
 * @author huxinquan
 */
public interface SystemAnnouncementMapper {
    /**
     * 获取所有系统公告
     * @return 系统公告集合
     */
    List<SystemAnnouncement> getAllSystemAnnouncement(@Param("tzNumber") String tzNumber);

    /**
     * 获取所有公告阅读状态
     * @return 公告阅读状态集合
     */
    List<SystemAnnouncementRead> getAllSystemAnnouncementRead(@Param("agencyCode") String agencyCode, @Param("staffNumber") String staffNumber);

    /**
     * 获取所有未读的公告阅读状态
     * @return 公告阅读状态集合
     */
    List<SystemAnnouncementRead> getAllSystemAnnouncementUnread(@Param("agencyCode") String agencyCode, @Param("staffNumber") String staffNumber);

    /**
     * 模糊查询公告阅读状态
     * @param SearchText 搜索文本
     * @return 公告阅读状态集合
     */
    List<SystemAnnouncementRead> searchSystemAnnouncementReadByText(@Param("searchText") String SearchText, @Param("agencyCode") String agencyCode, @Param("staffNumber") String staffNumber);

    /**
     * 根据id获取公告阅读状态
     * @param id id
     * @return 公告阅读状态对象
     */
    SystemAnnouncementRead getSystemAnnouncementReadById(@Param("id") String id);

    /**
     * 根据id获取系统公告
     * @param id id
     * @return 系统公告对象
     */
    SystemAnnouncement getSystemAnnouncementById(@Param("id") String id);

    /**
     * 根据通知通告id获取系统公告
     * @param id id
     * @return 系统公告对象
     */
    SystemAnnouncement getSystemAnnouncementBySystemAnnouncementId(@Param("id") String id);

    /**
     * 根据系统公告id获取公告阅读状态
     * @param id 系统公告id
     * @return 公告阅读状态
     */
    SystemAnnouncementRead getReadBySystemAnnouncementId(@Param("id") String id);


    int getAnnouncementTypeByName(@Param("name") String name, @Param("dljgbm") String dljgbm, @Param("dm") String dm);

    /**
     * 新增系统公告
     * @param systemAnnouncement 系统公告对象
     */
    void addSystemAnnouncement(@Param("systemAnnouncement") SystemAnnouncement systemAnnouncement);

    /**
     * 新增公告阅读状态
     * @param systemAnnouncementRead 公告阅读状态对象
     */
    void addSystemAnnouncementRead(@Param("systemAnnouncementRead") SystemAnnouncementRead systemAnnouncementRead);

    /**
     * 更新系统公告
     * @param systemAnnouncement 系统公告对象
     */
    void updateSystemAnnouncement(@Param("systemAnnouncement") SystemAnnouncement systemAnnouncement);

    /**
     * 更新公告阅读状态
     * @param systemAnnouncementRead 公告阅读状态对象
     */
    void updateSystemAnnouncementRead(@Param("systemAnnouncementRead") SystemAnnouncementRead systemAnnouncementRead);

    /**
     * 已读公告
     * @param systemAnnouncementRead 公告阅读状态对象
     */
    void readSystemAnnouncement(@Param("systemAnnouncementRead") SystemAnnouncementRead systemAnnouncementRead);

    /**
     * 获取所有公告类型
     * @return 公告类型集合
     */
    List<AnnouncementType> getAllAnnouncementType(@Param("agencyCode") String agencyCode);

    /**
     * 根据id获取公告类型
     * @param id id
     * @return 公告类型对象
     */
    AnnouncementType getAnnouncementTypeById(@Param("id") String id);


    List<Map> getKhxxByAgencyCode(@Param("agencyCode") String agencyCode, @Param("khfldm") String khfldm);
    /**
     * 根据代理机构编码获取职员
     * @param agencyCode 代理机构编码
     * @return 职员集合
     */
    List<User> getUserByAgencyCode(@Param("agencyCode") String agencyCode);

    long getSystemAnnouncementTotalCount(@Param("cxtj") Map cxtj);
    void updateydzt(@Param("cxtj") Map cxtj);



    List<Map> getSystemAnnouncementByPaging(@Param("cxtj") Map cxtj);
}
