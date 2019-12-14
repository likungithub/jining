package com.xinhai.caiyun.systemmanager.dao;

import com.xinhai.caiyun.systemmanager.api.AppSystemInformation;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * App系统消息
 * @author huxinquan
 */
public interface AppSystemInformationMapper {
    /**
     * 查询所有App系统消息
     * @return App系统消息集合
     * @param begin
     * @param end
     * @param startA
     * @param lengthA
     */
    List<AppSystemInformation> getAllAppSystemInformation(@Param("begin") String begin, @Param("end") String end, @Param("start") Integer startA, @Param("length") Integer lengthA);

    /**
     * 根据ID查询App系统消息
     * @param id id
     * @return App系统消息对象
     */
    AppSystemInformation getAppSystemInformationById(@Param("id") String id);

    /**
     * 模糊查询App系统消息
     * @param searchText 搜索文本
     * @return App系统消息集合
     */
    List<AppSystemInformation> searchAppSystemInformationByText(@Param("searchText") String searchText);

    /**
     * 根据日期查询App系统消息
     * @param beginTime 开始日期
     * @param endTime 结束日期
     * @return App系统消息集合
     */
    List<AppSystemInformation> getAppSystemInformationByDate(@Param("beginTime") String beginTime, @Param("endTime") String endTime);

    /**
     * 新增App系统消息
     * @param appSystemInformation App系统消息对象
     */
    void addAppSystemInformation(@Param("appSystemInformation") AppSystemInformation appSystemInformation);

    /**
     * 更新App系统消息
     * @param appSystemInformation App系统消息对象
     */
    void updateAppSystemInformation(@Param("appSystemInformation") AppSystemInformation appSystemInformation);

    Long getAllAppSystemInformationLen(@Param("begin") String begin, @Param("end") String end);
}
