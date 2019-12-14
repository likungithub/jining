package com.xinhai.Log.dao;

import com.xinhai.Log.api.Log;
import com.xinhai.usermanager.entity.User;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

/**
 * 数据库链接接口
 * @author tangck
 *
 */
public interface LogMapper {
	
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
    void updateLog(@Param("id") String id, @Param("log") Log log);

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
    List<Log> searchLog(@Param("starDate") Date starDate, @Param("endDate") Date endDate);

    /**
     * 更具职员代码获取用户名
     * @param staffmember
     */
    User findName(String staffmember);
    
    /**
     * 获取数量
     * @param sDate
     *          
     * @param eDate
     * @return
     */
    long findAllLoginLogSize(@Param("starDate") Date starDate, @Param("endDate") Date endDate);
    
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
    List<Log> getLoginLogByPage(@Param("start") int start, @Param("length") int length, @Param("starDate") Date starDate,
            @Param("endDate") Date endDate);
}
