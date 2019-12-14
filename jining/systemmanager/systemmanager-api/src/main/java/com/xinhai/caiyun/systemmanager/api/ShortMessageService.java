package com.xinhai.caiyun.systemmanager.api;


import org.springframework.stereotype.Service;

import java.util.List;


/**
 * 征税设置实体类接口
 * @author wangshuo
 *
 */
@Service
public interface ShortMessageService{

	/**
	 * 查询所有短信记录
	 * @return
	 */
	List<ShortMessageLog> findAllMs();

	/**
	 * 批量删除短息日志
	 * @param string
	 */
	void deleteAllShortMessage(String string);

	/**
	 * 单个删除
	 * @param id
	 */
	void deleteByOneShortMessage(String id);

	/**
	 * 单个查询短信信息
	 * @param id
	 * @return
	 */
	ShortMessageLog view(String id);
	
	/**
	 * 增加短信log
	 * @param shortmessageLog
	 */
	void insertShortMessage(ShortMessageLog shortmessageLog);

	/**
     * 增加短信loglist
     * @param shortmessageLog
     */
    void insertShortMessageList(List<ShortMessageLog> shortmessageLog);

	List<ShortMessageLog> searchByZdy(String searchText, String beginTime, String endTime, Integer startA, Integer lengthA, String type);

	Long findAllMsLen(String searchText, String beginTime, String endTime, String type);
}
