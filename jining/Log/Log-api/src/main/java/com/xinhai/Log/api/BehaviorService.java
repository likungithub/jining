package com.xinhai.Log.api;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

/**
 * 
 * @author tangck
 *
 */
@Service
public interface BehaviorService {
    
    /**
     * 创建行为日志
     * @param behavior
     *          行为日志对象
     */
    void createBehavior(Behavior behavior);
    
    /**
     * 根据编号查询
     * @param id
     *          编号
     * @return
     *          行为日志对象
     */
    Behavior findById(String id);
    
    /**
     * 查询出所有行为记录
     * @param starDate
     *          开始时间
     * @param endDate
     *          结束时间
     * @return
     *          返回行为记录list
     */
    List<Behavior> findAll(Date starDate, Date endDate);

    /**
     * 查询数量
     * @param starDate
     * @param endDate
     * @return
     */
    long findAllLoginLogSize(Date starDate, Date endDate);

    /**
     * 分页查询
     * @param start
     * @param length
     * @param starDate
     * @param endDate
     * @return
     */
    List<Behavior> getLoginLogByPage(int start, int length, Date starDate,
            Date endDate);

    /**
     * 
     * @return
     */
	List<Map<String, Object>> searchCompanyCountByWeek();
    
}
