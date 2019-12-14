package com.xinhai.caiyun.customermanage.api;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

/**
 * 消息提醒接口
 * @author pusilin
 *
 */
@Service
public interface SystemMessagesService {
	/**
	 * 新增消息
	 * @param message
	 */
	void addSystemMessages(SystemMessages message);
	/**
	 * 查找全部
	 * @param dl
	 * @param ygdm
	 * @return
	 */
	List<SystemMessages> searchByAll(String dl, String ygdm, int start1, int lengh1);
	/**
	 * 删除
	 * @param id
	 * @param dl
	 * @param ygdm
	 */

	void deleteById(String id, String dl, String ygdm);
	/**
	 * 修改阅读状态
	 * @param id
	 * @param dl
	 * @param ygdm
	 */

	void updateById(String id, String dl, String ygdm);
	/**
	 * 通过阅读状态查询
	 * @param dl
	 * @param ygdm
	 * @param readStat
	 * @return list
	 */

	List<SystemMessages> searchByType(String dl, String ygdm, int readStat);
	/**
	 * 查询近一周
	 * @param cxzt
	 * @param dl
	 * @param ygdm
	 * @param nowWeek
	 * @param now1
	 * @param last1 
	 * @return
	 */

	List<SystemMessages> findByWeek(String cxzt, String dl, String ygdm,
			String typeTx, Date now1, Date last1, int start1, int length);

	/**
	 * 查询本月
	 * @param cxzt
	 * @param dl
	 * @param ygdm
	 * @param begin
	 * @param end
	 * @return
	 */
	List<SystemMessages> findByMonth(String cxzt, String dl, String ygdm,
			String begin, String end, String typeTx, int start1, int lengh1);
	/**
	 * 查询上月
	 * @param cxzt
	 * @param dl
	 * @param ygdm
	 * @param begin
	 * @param end
	 * @param typeTx 
	 * @return
	 */
	List<SystemMessages> findByLastMonth(String cxzt, String dl, String ygdm,
			String begin, String end, String typeTx, int start1, int lengh1);
	/**
	 * 查询今年
	 * @param cxzt
	 * @param dl
	 * @param ygdm
	 * @param begin
	 * @param end
	 * @return
	 */

	List<SystemMessages> findByYear(String cxzt, String dl, String ygdm,
			String begin, String end, String typeTx, int start1, int lengh1);
	/**
	 * 自定义查询
	 * @param cxzt
	 * @param dl
	 * @param ygdm
	 * @param begin
	 * @param end
	 * @return
	 */
	List<SystemMessages> findByZdy(String cxzt, String dl, String ygdm,
			String begin, String end, String typeTx, int start1, int lengh1);
	/**
	 * 查询数量
	 * @param dl
	 * @param name
	 * @return
	 */
	int searchCount(String dl, String zydm);
	/**
	 * 查询提醒类型
	 * @param dl
	 * @param ygdm
	 * @param typeTx
	 * @param xlbz 
	 * @return
	 */
	List<SystemMessages> searchBytxType(String dl, String ygdm, String typeTx, String xlbz, int start1, int lengh1);
	/**
	 * 根据类型查找陪陪类型所有数据
	 * @param dl
	 * @param ygdm
	 * @param xlbz
	 * @return
	 */
	List<SystemMessages> searchBytx(String dl, String ygdm, String xlbz, int start1, int lengh1);
	/**
	 * 根据id查询
	 * @param id
	 * @return
	 */
	SystemMessages searchById(String id);
	
	/**
	 * 首页查询所有未读信息
	 * @param dljgBm
	 *             代理机构编码
	 * @param zydm
	 *             职员代码
	 * @return
	 *             返回数量
	 */
    int searchCountIndex(String dljgBm, String zydm);
    /**
	 * 查询近一周数据条数数量
	 * @param ydbz
	 * @param dl
	 * @param ygdm
	 * @param type
	 * @param now1
	 * @param last1
	 * @return
	 */
	long searchByCountWeek(String ydbz, String dl, String ygdm, String type,
			Date now1, Date last1);
	/**
	 * 
	 * @param ydbz
	 * @param dl
	 * @param ygdm
	 * @param begin
	 * @param end
	 * @param type
	 * @return
	 */
	long searchByCountMonth(String ydbz, String dl, String ygdm, String begin,
			String end, String type);
	/**
	 * 查询上一月的数据条数
	 * @param ydbz
	 * @param dl
	 * @param ygdm
	 * @param begin
	 * @param end
	 * @param type
	 * @return
	 */
	long searchByCountByLastWeek(String ydbz, String dl, String ygdm, String begin,
			String end, String type);
	
	/**
	 * 查询今年的数据条数
	 * @param ydbz
	 * @param dl
	 * @param ygdm
	 * @param begin
	 * @param end
	 * @param type
	 * @return
	 */
	long searchCountByYear(String ydbz, String dl, String ygdm, String begin,
			String end, String type);
	
	
	/**
	 * 查询自定义查询数据条数
	 * @param ydbz
	 * @param dl
	 * @param ygdm
	 * @param beginTime
	 * @param endTime
	 * @param type
	 * @return
	 */
	long searchCountByZdy(String ydbz, String dl, String ygdm,
			String beginTime, String endTime, String type);
	
	
	/**
	 * 查询所有数据条数
	 * @param ydbz
	 * @param dl
	 * @return
	 */
	long searchCountByAll(String ygdm, String dl);
	/**
	 * 查询通过类型查找数据条数
	 * @param dl
	 * @param ygdm
	 * @param type
	 * @param ydbz
	 * @return
	 */
	long searchCountBytype(String dl, String ygdm, String type, String ydbz);
	
	Long searchCountByTx(String dl, String ygdm, String ydbz);
	
	
    /**
     * 查找所有存在消息的客户列表
     * @param dljgBm 代理机构编码
     * @return 客户列表
     */
	List<Map<String, String>> getAllKhList(String zydm);
	
	 /**
     * APP查找所有存在消息的客户列表
     * @param dljgBm 代理机构编码
     * @return 客户列表
     */
    List<Map<String, String>> getAllAppKhList(String khbm);
	
	
	 /**
     * 查找所有客户列表
     * @param dljgBm 代理机构编码
     * @return 客户列表
     */
    List<Map<String, String>> findAllPtKhxx(String dljgBm,String zydm,String gsmc);
    
    /**
     * App查找所有客户列表
     * @param dljgBm 代理机构编码
     * @return 客户列表
     */
    List<Map<String, String>> findAllAppPtKhxx(String khbm,String gsmc);
    
    /**
     * 查找对应客户的聊天记录
     * @param dljgBm 代理机构编码，
     * @param khbm 代理机构编码，
     * @return 客户列表
     */
	Map<String, Object> getLtxx(String dljgBm,String khbm);
	
    /**
     * @param ptLtxx 聊天信息
     */
    void addLtxx(PtLtxxMx ptLtxx);
    
    /**
     * @param ptLtxx 聊天信息
     */
    void updateLtxx(PtLtxxMx ptLtxx);
    
    /**
     * 代理管理员查找
     * @param dl 
     * @param start1
     * @param lengh1
     * @param ydbz
     * @param type
     */
    List<SystemMessages> searchByAllAndAdmin(String dl, int start1, int lengh1, String ydbz, String type);
    /**
     * 代理管理员查找（分页）
     * @param start1
     * @param lengh1
     * @param ydbz
     * @param type
     * @return
     */
	long searchByAllAndAdmincount(String dl ,int start1, int lengh1, String ydbz,
			String type);
	
	/**
	 * 按条件查询数量
	 * @param dljgBm
	 *             代理机构编码
	 * @param ydbz
	 *             阅读标志
	 * @param type
	 *             类型
	 * @param ssDate
	 *             开始时间
	 * @param seDate
	 *             结束时间
	 * @param selectTime
	 *             快速选择
	 * @param zydm 
	 *             职员代码
	 * @return
	 */
    long searchByAllAndAdmincountNew(String dljgBm, String ydbz, String type,
            Date ssDate, Date seDate, String selectTime, String zydm);
    
    /**
     * 按条件分类查询
     * @param dljgbm
     *              代理机构编码
     * @param start
     *              开始条数
     * @param length
     *              每页条数
     * @param ydbz
     *              阅读标志
     * @param type
     *              类型
     * @param ssDate
     *              开始时间
     * @param seDate
     *              结束时间
     * @param selectTime
     *              快捷选择
     * @param zydm
     *              职员代码
     * @return
     */
    List<SystemMessages> searchByAllAndAdminNew(String dljgbm, int start,
            int length, String ydbz, String type, Date ssDate, Date seDate,
            String selectTime, String zydm);
    
    /**
     * 遍历添加消息根据接收人
     * @param sysmes
     *          消息内容
     * @param list
     *          接收人信息
     */
    void addSystemMessagesByUserList(SystemMessages sysmes,
            List<Map<String, String>> list);
    
    /**
     * 遍历添加信息根据合同编码
     * @param sysmes
     *          消息内容
     * @param list
     *          合同编码
     */
    void addSystemMessagesByHtbmList(SystemMessages sysmes,
            List<Map<String, String>> list);
    
    
    /**
     * 发送消息提醒
     * @param map
     *          提醒内容
     */
    void addSystemMessagesByUserString(Map<String, Object> map);
}
