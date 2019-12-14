package com.xinhai.caiyun.systemmanager.api;

import com.xinhai.usermanager.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 系统公告接口
 * @author huxinquan
 */
@Service
public interface SystemAnnouncementService {
    /**
     * 获取所有的系统公告
     * @return 系统公告集合
     */
    List<SystemAnnouncement> getAllSystemAnnouncement(String tzNumber);

    /**
     * 获取所有系统公告的阅读状态
     * @return 公告阅读状态集合
     */
    List<SystemAnnouncementRead> getAllSystemAnnouncementRead(String agencyCode, String staffNumber);

    /**
     * 获取所有未读的系统公告阅读状态
     * @return 公告阅读状态集合
     */
    List<SystemAnnouncementRead> getAllSystemAnnouncementUnread(String agencyCode, String staffNumber);

    /**
     * 模糊查询系统公告阅读状态
     * @param searchText 搜索文本
     * @return 公告阅读状态集合
     */
    List<SystemAnnouncementRead> searchSystemAnnouncementReadByText(String searchText, String agencyCode, String staffNumber);

    /**
     * 根据id获取公告阅读状态
     * @param id id
     * @return 公告阅读状态对象
     */
    SystemAnnouncementRead getSystemAnnouncementReadById(String id);

    /**
     * 根据id获取系统公告
     * @param id id
     * @return 系统公告对象
     */
    SystemAnnouncement getSystemAnnouncementById(String id);

    /**
     * 根据通知通告id获取系统公告
     * @param id id
     * @return 系统公告对象
     */
    SystemAnnouncement getSystemAnnouncementBySystemAnnouncementId(String id);

    /**
     * 根据id获取公告阅读状态
     * @param id id
     * @return 公告阅读状态
     */
    SystemAnnouncementRead getReadBySystemAnnouncementId(String id);

    /**
     * 新增系统公告
     * @param systemAnnouncement 系统公告对象
     */
    void addSystemAnnouncement(SystemAnnouncement systemAnnouncement);

    /**
     * 新增公告阅读状态
     * @param systemAnnouncementRead 公告阅读状态对象
     */
    void addSystemAnnouncementRead(SystemAnnouncementRead systemAnnouncementRead);

    /**
     * 更新系统公告
     * @param systemAnnouncement 系统公告对象
     */
    void updateSystemAnnouncement(SystemAnnouncement systemAnnouncement);

    /**
     * 更新公告阅读状态
     * @param systemAnnouncementRead 公告阅读状态对象
     */
    void updateSystemAnnouncementRead(SystemAnnouncementRead systemAnnouncementRead);

    /**
     * 已读公告
     * @param systemAnnouncementRead 公告阅读信息对象
     */
    void readSystemAnnouncement(SystemAnnouncementRead systemAnnouncementRead);

    /**
     * 获取所有的公告类型
     * @return 公告类型集合
     */
    List<AnnouncementType> getAllAnnouncementType(String agencyCode);

    /**
     * 根据id获取公告类型
     * @param id id
     * @return 公告类型对象
     */
    AnnouncementType getAnnouncementTypeById(String id);



    int getAnnouncementTypeByName(String name, String dljgbm, String dm);

    List<Map> getKhxxByAgencyCode(String agencyCode, String khfldm);

    /**
     * 根据代理机构编码查找职员
     * @param agencyCode 代理机构编码
     * @return 职员集合
     */
    List<User> getUserByAgencyCode(String agencyCode);

    long getSystemAnnouncementTotalCount(Map cxtj);

    void updateydzt(Map cxtj);

    List<Map> getSystemAnnouncementByPaging(Map cxtj);
}
