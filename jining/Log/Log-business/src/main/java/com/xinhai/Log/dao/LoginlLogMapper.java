package com.xinhai.Log.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.xinhai.Log.api.LoginLog;

/**
 * 登录日志数据库链接接口
 * @author tangck
 *
 */
public interface LoginlLogMapper {
    
    /**
     * 创建新的登录日志
     * @param log
     *          登录日志对象
     */
    void createLoginLog(LoginLog log);
	
    /**
     * 根据id查询出登录日志
     * @param id
     *          登录日志编号
     * @return
     *          返回一条登录日志对象
     */
    LoginLog findLoginLog(String id);
	
	/**
	 * 查询出所有登录日志
	 * @param endDate 
	 *         结束时间
	 * @param starDate
	 *         开始时间 
	 * @return
	 *         返回登录日志集合
	 */
    List<LoginLog> findAllLoginLog(@Param("starDate") Date starDate, @Param("endDate") Date endDate);
	
    /**
     * 修改登录日志（增加退出时间）
     * @param id
     *          登录日志编号
     * @param ip
     *          当前登录ip
     * @param tcsj
     *          退出时间
     */
    void updateLoginLog(@Param("id") String id, @Param("outtime") Date outtime);
	
    /**
     * 查询登录日志
     * @param keyword
     *          查询条件
     * @return
     *          返回登录日志集合
     */
    List<LoginLog> searchLoginLog(@Param("keyword") String keyword);

    /**
     * 删除登录日志
     * @param id
     *          登录日志编号
     */
    void deleteLoginLog(long id);

    /**
     * 查询出当前ip的最新一条登录信息
     * @param ip
     *          当前ip地址
     * @return
     *          返回一条登录日志对象
     */
    LoginLog findLoginLogByIP(String ip);
    
    /**
     * 根据开始时间和结束时间模糊查询总数量
     * @param starDate
     *              开始时间
     * @param endDate
     *              结束时间
     * @return
     *              返回数量
     */
    long findAllLoginLogSize(@Param("starDate") Date starDate, @Param("endDate") Date endDate);
    
    /**
     * 分页查询
     * @param start
     *              开始条数
     * @param length
     *              当前页面条数
     * @param starDate
     *              开始时间
     * @param endDate
     *              结束时间
     * @return
     *              返回list
     */
    List<LoginLog> getLoginLogByPage(@Param("start") int start, @Param("length") int length,
            @Param("starDate") Date starDate, @Param("endDate") Date endDate);

    /**
     * 查询所有用户的登录情况
     * @param begin
     * @param end
     * @return
     */
	List<Map<String, Object>> allCustomerLoginCount(@Param("begin")String begin, @Param("end")String end);

	/**
	 * 根据月份查询所有用户的登录情况
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String, Object>> allCustomerLoginCountByMonth(@Param("begin")String begin,
			@Param("end")String end);

	/**
	 * 每天用户登录次数（TOP10）
	 * @param end 
	 * @param begin 
	 * @return
	 */
	List<Map<String, Object>> LoginStationByEveryDay(@Param("begin")String begin, @Param("end")String end);

	/**
	 * 近7天的用户登录情况
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String, Object>> loginStatByWeek(@Param("begin")String begin,@Param("end") String end);

	/**
	 * 获取登录数量
	 * @param starDate
	 * 				开始日期
	 * @param endDate
	 * 				结束日期
	 * @param zydm
	 * 				职员代码
	 * @param dljgbm
	 * 				代理机构编码
	 * @return
	 */
	long findLoginLogSize(@Param("starDate") String starDate, @Param("endDate") String endDate,
						  @Param("zydm") String zydm, @Param("dljgbm") String dljgbm);

	/**
	 * 获取登录日志列表
	 * @param start
	 * 				开始条数
	 * @param length
	 * 				每页条数
	 * @param starDate
	 * 				开始时间
	 * @param endDate
	 * 				结束时间
	 * @param zydm
	 * 				职员代码
	 * @param dljgbm
	 * 				代理机构编码
	 * @return
	 */
	List<LoginLog> findLoginLogList(@Param("start") int start, @Param("length") int length, @Param("starDate") String starDate,
									@Param("endDate") String endDate, @Param("zydm") String zydm, @Param("dljgbm") String dljgbm);
}
