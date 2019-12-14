package com.xinhai.caiyun.business;

import java.util.List;
import java.util.Map;

import com.xinhai.caiyun.bean.PtKhtj;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.api.WelcomeService;
import com.xinhai.caiyun.dao.WelcomeMapper;

/**
 * 首页接口实现类
 * @author pusilin
 *
 */
@Repository
public class WelcomeServiceImpl implements WelcomeService {

	@Autowired
	WelcomeMapper mapper;
	@Override
	public List<Map<String, String>> charge(String dljg_bm) {
		return mapper.charge(dljg_bm);
	}

	@Override
	public List<Map<String, Object>> newCountCustomer(String dljg_bm) {
		return mapper.newCountCustomer(dljg_bm);
	}

	@Override
	public List<Map<String, Object>> customerGradeByDljgbm(String dljg_bm) {
		return mapper.customerGradeByDljgbm(dljg_bm);
	}

	@Override
	public List<Map<String, Object>> customerGradeByAdmin() {
		return null;
	}

	@Override
	public List<Map<String, Object>> lossCustomerList(String dljgBm) {
		return mapper.lossCustomerList(dljgBm);
	}

	/**
	 * 汇总统计
	 * @param tjlx  1 商机转换率  2 记账统计   3 报税统计
	 * @return list
	 */
	@Override
	public List<PtKhtj> findHztj(String  zydm,String  tjlx,String dljgbm){
        return  mapper.findHztj(zydm,tjlx,dljgbm); 
	}

	/**
	 * 记账列表
	 * @param zydm 职员代码
	 * @param dljgbm 代理机构编码
	 * @param pt 参数（公司名称，已记账还是未记账，年月）
	 * @return list
	 */
	@Override
	public List<PtKhtj> findJZList(String zydm, String dljgbm, PtKhtj pt) {
		return mapper.findJZList(zydm,dljgbm,pt);
	}

	/**
	 * 报税列表
	 * @param zydm 职员代码
	 * @param dljgbm 代理机构编码
	 * @param pt 参数（公司名称，已记账还是未记账，年月）
	 * @return list
	 */
	@Override
	public List<PtKhtj> findBSList(String zydm, String dljgbm, PtKhtj pt) {
		return mapper.findBSList(zydm,dljgbm,pt);
	}
}
