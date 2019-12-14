package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.GgDmGetService;
import com.xinhai.caiyun.customermanage.dao.GgDmGetMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class GgDmGetServiceImpl implements GgDmGetService {

	@Autowired
	GgDmGetMapper ggDmGetMapper;


	/**
	 * 获取所有的有效制备方式
	 * @return
	 */
	@Override
	public List<Map> getZbfsList() {
		return ggDmGetMapper.getZbfsList();
	}


	/**
	 * 根据条件获取  检验类别  ，没有条件 则获取所有检验类别
	 * @return
	 */
	public List<Map> getJylbList( Map map)
	{
		return ggDmGetMapper.getJylbList(map);
	}
}
