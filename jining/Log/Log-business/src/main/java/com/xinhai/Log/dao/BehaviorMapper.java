package com.xinhai.Log.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.xinhai.Log.api.Behavior;

public interface BehaviorMapper {
    
    /**
     * 创建行为日志
     * @param behavior
     *          行为日志对象
     */
    void createBehavior(Behavior behavior);
    
    /**
     * 查询出所有行为记录
     * @param starDate
     *          开始时间
     * @param endDate
     *          结束时间
     * @return
     *          返回行为记录list
     */
    List<Behavior> findAll(@Param("starDate") Date starDate, @Param("endDate") Date endDate);
    
    /**
     * 根据编号查询
     * @param id
     *          编号
     * @return
     *          返回操作对象
     */
    Behavior findById(String id);
    
    /**
     * 查询数量
     * @param starDate
     * @param endDate
     * @return
     */
    long findAllLoginLogSize(@Param("starDate") Date starDate, @Param("endDate") Date endDate);
    
    /**
     * 分页查询
     * @param start
     * @param length
     * @param starDate
     * @param endDate
     * @return
     */
    List<Behavior> getLoginLogByPage(@Param("start") int start, @Param("length") int length, @Param("starDate") Date starDate,
            @Param("endDate") Date endDate);

    /**
     * 查询近登录情况
     * @return
     */
	List<Map<String, Object>> searchCompanyCountByWeek();
}
