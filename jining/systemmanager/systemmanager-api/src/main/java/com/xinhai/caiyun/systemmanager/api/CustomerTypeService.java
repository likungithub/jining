package com.xinhai.caiyun.systemmanager.api;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 客户分类接口
 * @author pusilin
 *
 */
@Service
public interface CustomerTypeService {

	/**
	 * 查询全部的客户分类
	 * @return CustomerType
	 */
	List<CustomerType> findAllCustomerType(String dljgbm);
	
	/**
	 * 更具ID查看客户分类
	 */
	CustomerType findByIdCustomerType(String id);
	
	/**
	 * 根据分类名查询
	 * @param id
	 * @return
	 */
	CustomerType findByNameCustomerType(String name, String dljgbm);
	/**
	 * 更具ID修改客户分类
	 */
	void updateCustomerType(String id, CustomerType cust);
	
	/**
	 * 新增客户分类
	 * @param id
	 */
	void addCustomerType(CustomerType cust);
	
}
