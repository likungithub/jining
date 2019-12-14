package com.xinhai.caiyun.systemmanager.api;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * App系统消息
 * @author huxinquan
 */
@Service
public interface AppSystemInformationService {
    /**
     * 获取所有App系统消息
     * @return
     * @param begin
     * @param end
     * @param startA
     * @param lengthA
     */
    List<AppSystemInformation> getAllAppSystemInformation(String begin, String end, Integer startA, Integer lengthA);

    /**
     * 根据ID查询App系统消息
     * @param id id
     * @return App系统消息对象
     */
    AppSystemInformation getAppSystemInformationById(String id);

    /**
     * 模糊查询App系统消息
     * @param searchText 搜索文本
     * @return App系统消息集合
     */
    List<AppSystemInformation> searchAppSystemInformationByText(String searchText);

    /**
     * 根据日期查询App系统消息
     * @param beginTime 开始日期
     * @param endTime 结束日期
     * @return App系统消息集合
     */
    List<AppSystemInformation> getAppSystemInformationByDate(String beginTime, String endTime);

    /**
     * 新增App系统消息
     * @param appSystemInformation App系统消息对象
     */
    void addAppSystemInformation(AppSystemInformation appSystemInformation);

    /**
     * 更新App系统消息
     * @param appSystemInformation App系统消息对象
     */
    void updateAppSystemInformation(AppSystemInformation appSystemInformation);

    /**
     * 分页查询app系统消息的条数
     * @param begin
     * @param end
     * @return
     */
    Long getAllAppSystemInformationLen(String begin, String end);
}
