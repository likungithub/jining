package com.xinhai.caiyun.statisticalanalysis.business;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.statisticalanalysis.api.Arrears;
import com.xinhai.caiyun.statisticalanalysis.api.ArrearsService;

/**
 * 催费统计实现类
 * @author pusilin
 *
 */
@Repository
public class ArrearsServiceImpl implements ArrearsService {

	@Override
	public List<Arrears> findAllArrears(String dl, String searchText,
			Integer startA, Integer lengthA) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Arrears> findByTimeArrears(String dljgbm, String starttime,
			String endtime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String countArrearsNum(String dljgbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String countArrearsMoney(String dljgbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> echarsArrearsNum(int year, int lastyear,
			int month, String dljgbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> echarsArrearsMoney(int year, int lastyear,
			int month, String dljgbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findAllArrearsLen(String dl, String searchText) {
		// TODO Auto-generated method stub
		return 0;
	}

	
}
