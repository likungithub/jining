package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.ShortMessageLog;
import com.xinhai.caiyun.systemmanager.api.ShortMessageService;
import com.xinhai.caiyun.systemmanager.dao.ShortMessageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * 实现taxservice接口
 * @author wangshuo
 *
 */
@Repository
public class ShortMessageServiceImpl implements ShortMessageService {
@Autowired
ShortMessageMapper shortMessageMapper;

@Override
public List<ShortMessageLog> findAllMs() {
	// TODO Auto-generated method stub
	return shortMessageMapper.findAllMs();
}

@Override
public void deleteAllShortMessage(String string) {
	// TODO Auto-generated method stub
	shortMessageMapper.deleteAllShortMessage(string);
}

@Override
public void deleteByOneShortMessage(String id) {
	// TODO Auto-generated method stub
	shortMessageMapper.deleteByOneShortMessage(id);
}

@Override
public ShortMessageLog view(String id) {
	// TODO Auto-generated method stub
	return shortMessageMapper.view(id);
}



@Override
public void insertShortMessage(ShortMessageLog shortmessageLog) {
	shortMessageMapper.insertShortMessage(shortmessageLog);
}

@Override
public void insertShortMessageList(List<ShortMessageLog> shortmessageLog) {
    shortMessageMapper.insertShortMessageList(shortmessageLog);
}

	@Override
	public List<ShortMessageLog> searchByZdy(String searchText, String beginTime, String endTime, Integer startA, Integer lengthA, String type) {
		return shortMessageMapper.searchByZdy(searchText,beginTime,endTime,startA,lengthA,type);
	}

	@Override
	public Long findAllMsLen(String searchText, String beginTime, String endTime, String type) {
		return shortMessageMapper.findAllMsLen(searchText,beginTime,endTime,type);
	}

}
