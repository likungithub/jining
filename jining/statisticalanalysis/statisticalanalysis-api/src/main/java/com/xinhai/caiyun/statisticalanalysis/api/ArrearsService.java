package com.xinhai.caiyun.statisticalanalysis.api;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

/**
 * 催费统计接口
 * @author pusilin
 *
 */
@Service
public interface ArrearsService {

	/**
	 * 查询全部的欠费信息
	 * @return
	 */
	List<Arrears> findAllArrears(String dl, String searchText, Integer startA, Integer lengthA);
	
	/**
	 * 查询全部的欠费信息
	 * @return
	 */
	List<Arrears> findByTimeArrears(String dljgbm,String starttime,String endtime);
	
	/**
	 * 获取欠费总户数
	 * @return
	 */
	String countArrearsNum(String dljgbm);
	
	/**
	 * 获取欠费总金额
	 * @return
	 */
	String countArrearsMoney(String dljgbm);
	
	/**
	 * 欠费户数折线图
	 * @param year
	 * @return
	 */
	List<Map<String,Object>> echarsArrearsNum(int year,int lastyear,int month,String dljgbm);
	
	/**
	 * 欠费金额折线图
	 * @param year
	 * @return
	 */
	List<Map<String,Object>> echarsArrearsMoney(int year,int lastyear,int month,String dljgbm);

	/**
	 * 分页查询代理机构的欠费数据条数
	 * @param dl
	 * @param searchText
	 * @return
	 */
    long findAllArrearsLen(String dl, String searchText);
}
