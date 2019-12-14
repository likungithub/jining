package com.xinhai.caiyun.customermanage.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.alibaba.dubbo.config.support.Parameter;
import com.xinhai.caiyun.customermanage.api.PtLtxx;
import com.xinhai.caiyun.customermanage.api.PtLtxxMx;
import com.xinhai.caiyun.customermanage.api.SystemMessages;
import org.springframework.stereotype.Repository;

/**
 * 消息提醒数据库接口
 * 
 * @author pusilin
 *
 */
@Repository
public interface SystemMessagesMapper {

	/**
	 * 新增提醒消息
	 * 
	 * @param message
	 */
	void addSystemMessages(SystemMessages message);

	/**
	 * 查询全部
	 * @param dl
	 * @param ygdm
	 * @return
	 */
	List<SystemMessages> searchByAll(@Param("dl") String dl,
			@Param("ygdm") String ygdm, @Param("start")int start1, @Param("length")int lengh1);

	/**
	 * 通过datatable中行的id逻辑删除
	 * @param id
	 * @param dl
	 * @param ygdm
	 */
	void deleteById(@Param("id") String id, @Param("dl") String dl,
			@Param("ygdm") String ygdm);

	/**
	 * 通过datatable中的id对阅读标志进行修改
	 * @param id
	 * @param dl
	 * @param ygdm
	 */
	void updateById(@Param("id") String id, @Param("dl") String dl,
			@Param("ygdm") String ygdm);

	/**
	 * 通过阅读标志查询
	 * @param dl
	 * @param ygdm
	 * @param readStat
	 * @return list
	 */
	List<SystemMessages> searchByType(@Param("dl") String dl,
			@Param("ygdm") String ygdm, @Param("readStat") int readStat);

	/**
	 * 查询一周内
	 * @param cxzt
	 * @param dl
	 * @param ygdm
	 * @param nowWeek
	 * @param now1
	 * @param last1 
	 * @return list
	 */
	List<SystemMessages> findByWeek(@Param("cxzt") String cxzt,
			@Param("dl") String dl, @Param("ygdm") String ygdm,
			@Param("typeTx") String typeTx, @Param("nowWeek") Date now1,
			@Param("lastWeek") Date last1, @Param("start") int start1,
			@Param("length") int length1);

	/**
	 * 查询本月
	 * 
	 * @param cxzt
	 * @param dl
	 * @param ygdm
	 * @param begin
	 * @param end
	 * @param typeTx
	 * @param length1 
	 * @param start1 
	 * @return list
	 */
	List<SystemMessages> findByMonth(@Param("cxzt") String cxzt,
			@Param("dl") String dl, @Param("ygdm") String ygdm,
			@Param("begin") String begin, @Param("end") String end,
			@Param("typeTx") String typeTx,@Param("start") int start1,@Param("length") int length1);

	/**
	 * 查询上月
	 * 
	 * @param cxzt
	 * @param dl
	 * @param ygdm
	 * @param begin
	 * @param end
	 * @param length1 
	 * @param start1 
	 * @return list
	 */
	List<SystemMessages> findByLastMonth(@Param("cxzt") String cxzt,
			@Param("dl") String dl, @Param("ygdm") String ygdm,
			@Param("begin") String begin, @Param("end") String end,
			@Param("typeTx") String typeTx,@Param("start") int start1, @Param("length")int length1);

	/**
	 * 查询今年
	 * 
	 * @param cxzt
	 * @param dl
	 * @param ygdm
	 * @param begin
	 * @param end
	 * @return list
	 */
	List<SystemMessages> findByYear(@Param("cxzt") String cxzt,
			@Param("dl") String dl, @Param("ygdm") String ygdm,
			@Param("begin") String begin, @Param("end") String end,
			@Param("typeTx") String typeTx,@Param("start") int start1, @Param("length")int length1);

	/**
	 * 自定义查询
	 * 
	 * @param cxzt
	 * @param dl
	 * @param ygdm
	 * @param begin
	 * @param end
	 * @param lengh1 
	 * @param start1 
	 * @return list
	 */
	List<SystemMessages> findByZdy(@Param("cxzt") String cxzt,
			@Param("dl") String dl, @Param("ygdm") String ygdm,
			@Param("begin") String begin, @Param("end") String end,
			@Param("typeTx") String typeTx, @Param("start")int start1, @Param("length")int lengh1);

	int searchCount(@Param("dl")String dl, @Param("zydm")String zydm);
	
	/**
	 * 查询该代理机构全部的
	 * @param dl 代理机构编码
	 * @return
	 */
	int searchDLCount(@Param("dl")String dl);

	/**
	 * 查询提醒类型
	 * 
	 * @param dl
	 * @param ygdm
	 * @param typeTx
	 * @param xlbz
	 * @param lengh1 
	 * @param start1 
	 * @return
	 */
	List<SystemMessages> searchBytxType(@Param("dl") String dl,
			@Param("ygdm") String ygdm, @Param("typeTx") String typeTx,
			@Param("xlbz") String xlbz, @Param("start")int start1, @Param("length")int lengh1);

	/**
	 * 通过类型查找匹配类型的所有数据
	 * 
	 * @param dl
	 * @param ygdm
	 * @param xlbz
	 * @param lengh1 
	 * @param start1 
	 * @return
	 */

	List<SystemMessages> searchBytx(@Param("dl") String dl,
			@Param("ygdm") String ygdm, @Param("xlbz") String xlbz, @Param("start")int start1, @Param("length")int lengh1);

	/**
	 * 通过id查询
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
    int searchCountIndex(@Param("dljgBm") String dljgBm, @Param("zydm") String zydm);
    
    /**
	 * 查询一周内数据条数
	 * @param ydbz
	 * @param dl
	 * @param ygdm
	 * @param type
	 * @param now1
	 * @param last1
	 * @return
	 */

	long searchByCountWeek(@Param("ydbz")String ydbz,@Param("dl") String dl, @Param("ygdm")String ygdm, @Param("type")String type,
			@Param("end")Date now1, @Param("begin")Date last1);

	/**
	 * 查询一月内数据条数
	 * @param ydbz
	 * @param dl
	 * @param ygdm
	 * @param begin
	 * @param end
	 * @param type
	 * @return
	 */
	long searchByCountMonth(@Param("ydbz")String ydbz, @Param("dl") String dl, @Param("ygdm")String ygdm,@Param("begin") String begin,
			@Param("end")String end, @Param("type")String type);

	/**
	 * 查询上一月数据条数
	 * @param ydbz
	 * @param dl
	 * @param ygdm
	 * @param begin
	 * @param end
	 * @param type
	 * @return
	 */
	long searchByCountByLastWeek(@Param("ydbz")String ydbz,@Param("dl") String dl, @Param("ygdm")String ygdm,
			@Param("begin")String begin, @Param("end")String end,@Param("type") String type);
	

	/**
	 * 查询一年数据条数
	 * @param ydbz
	 * @param dl
	 * @param ygdm
	 * @param begin
	 * @param end
	 * @param type
	 * @return
	 */
	long searchCountByYear(@Param("ydbz")String ydbz, @Param("dl")String dl,  @Param("ygdm")String ygdm, @Param("begin")String begin,
			@Param("end")String end,@Param("type") String type);

	long searchCountByZdy(@Param("ydbz")String ydbz, @Param("dl")String dl, @Param("ygdm") String ygdm,
			@Param("begin")String beginTime, @Param("end")String endTime, @Param("type")String type);

	long searchCountByAll(@Param("dl")String dl, @Param("ygdm")String ygdm);

	long searchCountBytype(@Param("dl")String dl, @Param("ygdm")String ygdm, @Param("type")String type, @Param("ydbz")String ydbz);

	Long searchCountByTx(@Param("dl")String dl, @Param("ygdm")String ygdm, @Param("ydbz")String ydbz);

	
	/**
     * 查找所有存在消息的客户列表
     * @param dljgBm 代理机构编码
     * @return 客户列表
     */
    List<Map<String, String>> searchAllKhList(@Param("zydm") String zydm);
    
    /**
    * APP查找所有存在消息的客户列表
    * @param dljgBm 代理机构编码
    * @return 客户列表
    */
   List<Map<String, String>> getAllAppKhList(@Param("khbm") String khbm);
    
    /**
    * 查找所有客户列表
    * @param dljgBm 代理机构编码
    * @return 客户列表
    */
   List<Map<String, String>> findAllPtKhxx(@Param("dljgbm") String dljgBm,@Param("zydm") String zydm,@Param("gsmc")  String gsmc);
   
   /**
    * App查找所有客户列表
    * @param dljgBm 代理机构编码
    * @return 客户列表
    */
   List<Map<String, String>> findAllAppPtKhxx(@Param("khbm") String khbm,@Param("gsmc") String gsmc);

    
    /**
     * 查找对应客户的聊天记录
     * @param dljgBm 代理机构编码，
     * @param khbm 代理机构编码，
     * @return 客户列表
     */
    List<Map<String, String>> searchLtxx(@Param("zydm") String dljgBm,@Param("khbm") String khbm);

    /**
     * 聊天信息追加
     * @param ptLtxx 聊天信息
     */
    void addLtxx(PtLtxxMx ptLtxx);
    
    void updateLtxx(PtLtxxMx ptLtxx);

    /**
     * 代理管理员查
     * @param dl 
     * @param start1
     * @param lengh1
     * @param ydbz
     * @param type
     * @return 
     */
	List<SystemMessages> searchByAllAndAdmin(@Param("dl")String dl, @Param("start")int start1, @Param("length")int lengh1, @Param("ydbz")String ydbz,@Param("type") String type);

	/**
	 * 代理管理员查询（分页）
	 * @param start1
	 * @param lengh1
	 * @param ydbz
	 * @param type
	 * @return
	 */
	long searchByAllAndAdmincount(@Param("dl")String dl,@Param("start")int start1, @Param("length")int lengh1, @Param("ydbz")String ydbz,@Param("type") String type);
	
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
    long searchByAllAndAdmincountNew(@Param("dljgBm") String dljgBm, @Param("ydbz") String ydbz, @Param("type") String type,
            @Param("ssDate") Date ssDate, @Param("seDate") Date seDate, @Param("selectTime") String selectTime, @Param("zydm") String zydm);
    
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
    List<SystemMessages> searchByAllAndAdminNew(@Param("dljgbm") String dljgbm, @Param("start") int start, @Param("length") int length, @Param("ydbz") String ydbz, 
            @Param("type") String type, @Param("ssDate") Date ssDate, @Param("seDate") Date seDate, @Param("selectTime") String selectTime, @Param("zydm") String zydm);
    
    /**
     * 遍历添加消息
     * @param sysmes
     *          消息内容
     * @param list
     *          接收人信息
     */
    void addSystemMessagesByUserList(@Param("sysmes") SystemMessages sysmes,
            @Param("list") List<Map<String, String>> list);
    
    /**
     * 遍历添加信息根据合同编码
     * @param sysmes
     *          消息内容
     * @param list
     *          合同编码
     */
    void addSystemMessagesByHtbmList(@Param("sysmes") SystemMessages sysmes,
            @Param("list") List<Map<String, String>> list);

    void addSystemMessagesByUserString(@Param("sysmes") SystemMessages sysmes, @Param("listr") String listr);

    void addSystemMessagesByUserString(Map<String, Object> map);
	
}
