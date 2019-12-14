package com.xinhai.caiyun.api;

import com.xinhai.caiyun.bean.PtKhtj;

import java.util.List;
import java.util.Map;


public interface WelcomeService {
	
	/**
	 * 根据代理机构统计收费排名
	 * @param dljg_bm 代理机构编码
	 * @return list
	 */
	List<Map<String,String>> charge(String dljg_bm);
	
	
	/**
	 * 根据代理机构统计新增客户
	 * @param dljg_bm 代理机构编码
	 * @return list
	 */
	List<Map<String,Object>> newCountCustomer(String dljg_bm);
	
	/**
	 * 普通用户根据代理机构统计客户等级
	 * @param dljg_bm 代理机构编码
	 * @return list
	 */
	List<Map<String,Object>> customerGradeByDljgbm(String dljg_bm);
	
	/**
	 * 管理员用户统计全部客户等级
	 * @return list
	 */
	List<Map<String,Object>> customerGradeByAdmin();


	/**
	 * 统计流失客户的数量
	 * @param dljgBm  代理机构编码
	 * @return list
	 */
	List<Map<String, Object>> lossCustomerList(String dljgBm);

	/**
	 * 汇总统计
	 * @param tjlx  1 商机转换率  2 记账统计   3 报税统计
	 * @return list
	 */
	List<PtKhtj> findHztj(String  zydm,String  tjlx,String dljgbm);

	/**
	 * 记账列表
	 * @param zydm 职员代码
	 * @param dljgbm 代理机构编码
	 * @param pt 参数（公司名称，已记账还是未记账，年月）
	 * @return list
	 */
	List<PtKhtj> findJZList(String  zydm,String dljgbm, PtKhtj pt);

	/**
	 * 报税列表
	 * @param zydm 职员代码
	 * @param dljgbm 代理机构编码
	 * @param pt 参数（公司名称，已记账还是未记账，年月）
	 * @return list
	 */
	List<PtKhtj> findBSList(String  zydm,String dljgbm, PtKhtj pt);
}
