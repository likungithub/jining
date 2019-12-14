package com.xinhai.caiyun.customermanage.business;
import com.xinhai.caiyun.customermanage.dao.YpzbfpMapper;
import com.xinhai.caiyun.customermanage.service.YpzbfpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class YpzbfplServiceImpl implements YpzbfpService {
	@Autowired
	private YpzbfpMapper ypzbfpMapper;
	/**
	 * 获得制备分配的信息
	 */
	public List<Map> queryAll(Map map){
		return ypzbfpMapper.queryAll(map);
	};
	/**
	 * 获得制备分配的信息的数量
	 */
	public Integer queryAllNum(Map map){
		return ypzbfpMapper.queryAllNum(map);
	};
	/**
	 * 保存任务分配的数据
	 */
	public void saveFp(Map map){
		ypzbfpMapper.saveFp(map);
	};
	/**
	 * 通过职员代码获得
	 */
	public String getUserName(String zydm){
		return ypzbfpMapper.getUserName(zydm);
	};
	/**
	 * 分配任务退回
	 */
	public void saveBack(Map map){
		ypzbfpMapper.saveBack(map);
	};
}
