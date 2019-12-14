package com.xinhai.caiyun.systemmanager.dao;

import com.xinhai.caiyun.systemmanager.api.AnnouncementType;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 公告类型
 * @author huxinquan
 */
public interface AnnouncementTypeMapper {
    /**
     * 获取所有公告类型
     * @return 公告类型集合
     */
    List<AnnouncementType> getAllAnnouncementType(@Param("agencyCode") String agencyCode);

    /**
     * 新增公告类型
     * @param announcementType 公告类型对象
     */
    void addAnnouncementType(@Param("announcementType") AnnouncementType announcementType);

    /**
     * 根据id获取公告类型
     * @param id id
     * @return 公告类型对象
     */
    AnnouncementType getAnnouncementTypeById(@Param("id") String id);

    /**
     * 更新公告类型
     * @param announcementType 公告类型对象
     */
    void updateAnnouncementType(@Param("announcementType") AnnouncementType announcementType);

    /**
     * 获取公告类型使用情况
     * @param id id
     * @return 公告类型使用数量
     */
    int getUsedAnnouncementType(@Param("id") String id);

    /**
     * 模糊查询公告类型
     * @param agencyCode 代理机构编码
     * @param searchText 搜索文本
     * @return 公告类型集合
     */
    List<AnnouncementType> searchAnnouncementTypeByText(@Param("agencyCode") String agencyCode, @Param("searchText") String searchText);

    /**
     * 更新使用中的公告类型名称
     * @param id id
     * @param announcementTypeName 公告类型名称
     */
    void updateUsedAnnouncementTypeName(@Param("id") String id, @Param("announcementTypeName") String announcementTypeName);

    /**
     * 获取总条数
     * @param agencyCode 代理机构编码
     * @param searchText 模糊查询
     * @return 总条数
     */
    long getAnnouncementTypeTotalCount(@Param("agencyCode") String agencyCode, @Param("searchText") String searchText);

    /**
     * 根据分页查询公告类型
     * @param agencyCode 代理机构编码
     * @param start 起始数
     * @param length 显示条数
     * @param searchText 模糊查询
     * @return 公告类型集合
     */
    List<AnnouncementType> getAnnouncementTypeByPaging(@Param("agencyCode") String agencyCode,
                                                       @Param("start") int start,
                                                       @Param("length") int length,
                                                       @Param("searchText") String searchText);
}
