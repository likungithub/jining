package com.xinhai.Log.api;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

/**
 * 登录日志接口
 * @author tangck
 *
 */
@Service
public interface LoginLogService {
	
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
     *          返回查询出的一条登录日志信息
     */
    LoginLog findLoginLog(String id);
	
    /**
     * 查询出所有登录日志
     * @param starDate
     *          开始时间
     * @param endDate
     *          结束时间
     * @return
     *          返回查询出的登录信息list
     */
    List<LoginLog> findAllLoginLog(Date starDate, Date endDate);
	
    /**
     * 修改登录日志（增加退出时间）
     * @param id
     *          登录日志编号
     * @param outtime
     *          退出时间
     */
    void updateLoginLog(String id, Date outtime);
	
    /**
     * 查询登录日志
     * @param keyword
     *          查询条件
     * @return
     *          返回查询出的登录信息list
     */
    List<LoginLog> searchLoginLog(String keyword);
    
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
    long findAllLoginLogSize(Date starDate, Date endDate);

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
    List<LoginLog> getLoginLogByPage(int start, int length,
            Date starDate, Date endDate);

    /**
     * 查询所有用户的登录情况
     * @param begin
     * @param end
     * @return
     */
	List<Map<String, Object>> allCustomerLoginCount(String begin, String end);

	/**
	 * 根据月份查询所有用户的登录情况
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String, Object>> allCustomerLoginCountByMonth(String begin,
			String end);

	/**
	 * 用户登录次数（TOP10）
	 * @param end 
	 * @param begin 
	 * @return
	 */
	List<Map<String, Object>> LoginStationByEveryDay(String begin, String end);

	/**
	 * 近7天用户登录情况
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String, Object>> loginStatByWeek(String begin, String end);

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
    long findLoginLogSize(String starDate, String endDate, String zydm, String dljgbm);

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
	List<LoginLog> findLoginLogList(int start, int length, String starDate, String endDate, String zydm, String dljgbm);
}
