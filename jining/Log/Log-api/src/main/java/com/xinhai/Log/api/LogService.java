package com.xinhai.Log.api;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

/**
 * 操作日志接口
 * @author tangck
 *
 */
@Service
public interface LogService {
	
    /**
     * 根据id查询一条操作日志
     * @param id
     *          编号
     * @return
     *          返回一条操作日志对象
     */
    Log findLog(String id);

    /**
     * 创建操作日志
     * @param log
     *          操作日志对象
     */
    void createLog(Log log);
    
    /**
     * 更新一条操作日志
     * @param id
     *          编号
     * @param log
     *          操作日志对象
     */
    void updateLog(String id, Log log);

    /**
     * 根据id删除操作日志
     * @param id
     *          编号
     */
    void deleteLog(String id);

    /**
     * 删除多条操作日志
     * @param ids
     *          编号list
     */
    void deleteLog(List<String> ids);
	
    /**
     * 查询操作日志
     * @param menuID
     * @param userID
     * @param starDate
     * @param endDate
     * @return
     */
    List<Log> searchLog(Date starDate,Date endDate);

    /**
     * 获取数量
     * @param sDate
     *          开始时间
     * @param eDate
     *          结束时间
     * @return
     *          返回数量
     */
    long findAllLoginLogSize(Date starDate, Date endDate);

    /**
     * 分页查询
     * @param start
     *              开始条数
     * @param length
     *              每页条数
     * @param sDate
     *              开始时间
     * @param eDate
     *              结束时间
     * @return
     *              返回list
     */
    List<Log> getLoginLogByPage(int start, int length, Date starDate,
            Date endDate);
}
