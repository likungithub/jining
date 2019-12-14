package com.xinhai.caiyun.systemmanager.api;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * 公告类型
 * @author huxinquan
 */
@Service
public interface AnnouncementTypeService {
    /**
     * 获取所有公告类型
     * @return 公告类型集合
     */
    List<AnnouncementType> getAllAnnouncementType(String agencyCode);

    /**
     * 添加公告类型
     * @param announcementType 公告类型对象
     */
    void addAnnouncementType(AnnouncementType announcementType);

    /**
     * 根据id获取公告类型
     * @param id id
     * @return 公告类型对象
     */
    AnnouncementType getAnnouncementTypeById(String id);

    /**
     * 更新公告类型
     * @param announcementType 公告类型对象
     */
    void updateAnnouncementType(AnnouncementType announcementType);

    /**
     * 获取公告类型使用情况
     * @param id id
     * @return 使用数量
     */
    int getUsedAnnouncementType(String id);

    /**
     * 模糊查询公告类型
     * @param agencyCode 代理机构编码
     * @param searchText 搜索文本
     * @return 公告类型集合
     */
    List<AnnouncementType> searchAnnouncementTypeByText(String agencyCode, String searchText);

    /**
     * 更新使用中的公告类型名称
     * @param id id
     * @param announcementTypeName 公告类型名称
     */
    void updateUsedAnnouncementTypeName(String id, String announcementTypeName);

    /**
     * 获取总条数
     * @param agencyCode 代理机构编码
     * @param searchText 模糊搜索
     * @return 总条数
     */
    long getAnnouncementTypeTotalCount(String agencyCode, String searchText);

    /**
     * 根据分页查询公告类型
     * @param agencyCode 代理机构编码
     * @param start 起始数
     * @param length 显示条数
     * @param searchText 模糊搜索
     * @return 公告类型集合
     */
    List<AnnouncementType> getAnnouncementTypeByPaging(String agencyCode, int start, int length, String searchText);
}
