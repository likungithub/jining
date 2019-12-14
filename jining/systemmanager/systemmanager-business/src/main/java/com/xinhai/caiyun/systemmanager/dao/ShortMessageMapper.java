package com.xinhai.caiyun.systemmanager.dao;

import com.xinhai.caiyun.systemmanager.api.ShortMessageLog;
import org.apache.ibatis.annotations.Param;

import java.util.List;


/**
 * 新手入门数据库映射,对应同名称的xml文件。
 * @author pc
 *
 */

public interface ShortMessageMapper {

	/**
	 * 查询所有的短信日志
	 * @return
	 */
	List<ShortMessageLog> findAllMs();

	/**
	 * 批量删除短信日志
	 * @param string
	 */
	void deleteAllShortMessage(String string);

	/**
	 * 单个删除
	 * @param id
	 */
	void deleteByOneShortMessage(String id);

	/**
	 * 查询单个短信的信息
	 * @param id
	 * @return
	 */
	ShortMessageLog view(String id);

	

	/**
	 * 增加短信日志
	 * @param shortmessageLog
	 */
	void insertShortMessage(ShortMessageLog shortmessageLog);
	
	/**
     * 增加短信loglist
     * @param shortmessageLog
     */
    void insertShortMessageList(@Param("list") List<ShortMessageLog> shortmessageLog);

	/**
	 * 自定义查询短信日志
	 * @param searchText
	 * @param beginTime
	 * @param endTime
	 * @param startA
	 * @param lengthA
	 * @param type
	 * @return
	 */
	List<ShortMessageLog> searchByZdy(@Param("searchText") String searchText, @Param("beginTime") String beginTime, @Param("endTime") String endTime, @Param("start") Integer startA, @Param("length") Integer lengthA, @Param("type") String type);

	/**
	 * 自定义查询短信日志长度
	 * @param searchText
	 * @param beginTime
	 * @param endTime
	 * @param type
	 * @return
	 */
	Long findAllMsLen(@Param("searchText") String searchText, @Param("beginTime") String beginTime, @Param("endTime") String endTime, @Param("type") String type);
}
