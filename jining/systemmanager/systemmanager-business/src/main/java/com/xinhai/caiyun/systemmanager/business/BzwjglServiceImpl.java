package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.BzwjglMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.BzwjglService;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class BzwjglServiceImpl implements BzwjglService {
	@Autowired
    private BzwjglMapper bzwjglMapper;
	@Override
	public List<Map> findAllBzwjgl(Map map) {
		return bzwjglMapper.findAllBzwjgl(map);
	}
	public  Integer findAllBzwjglNum(Map map){
		return  bzwjglMapper.findAllBzwjglNum(map);
	};
	/**
	 * 新增标准项目文件
	 */
	public void addlBzwjgl(Map map){
	    bzwjglMapper.addlBzwjgl(map);
	};
	/**
	 * 删除标准项目文件
	 */
	public void delBzwjgl(Integer id){
		bzwjglMapper.delBzwjgl(id);
	};
	/**
	 * 修改标准项目文件
	 */
	public void enditBzwjgl(Map map){
		bzwjglMapper.enditBzwjgl(map);
	};
	/**
	 * 通过id获得一个tBzwjgl数据
	 */
	public Map findOneBzwjgl(Integer id){
		return bzwjglMapper.findOneBzwjgl(id);
	};
	/**
	 * 审核事件
	 */
	public void addShenhe(Map map){
		bzwjglMapper.addShenhe(map);
	};
	/**
	 * 修订事件
	 */
	public void addXiuding(Map map){
		bzwjglMapper.addXiuding(map);
	};
	/**
	 * 借阅事件
	 */
	public void addJieyue(Map map){
		bzwjglMapper.addJieyue(map);
	};
	/**
	 * 回收事件
	 */
	public void addHuishou(Map map){
		bzwjglMapper.addHuishou(map);
	};
}
