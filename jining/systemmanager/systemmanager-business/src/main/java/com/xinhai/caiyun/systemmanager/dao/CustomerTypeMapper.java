package com.xinhai.caiyun.systemmanager.dao;

import com.xinhai.caiyun.systemmanager.api.CustomerType;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface CustomerTypeMapper {

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
	 * 更具ID修改客户分类
	 */
	void updateCustomerType(@Param(value = "id") String id, @Param(value = "cust") CustomerType cust);
	
	/**
	 * 新增客户分类
	 */
	void addCustomerType(CustomerType cust);
	
	/**
	 * 根据分类名称查询
	 * @param id
	 * @return
	 */
	CustomerType findByNameCustomerType(@Param(value = "name") String name, @Param(value = "dljgbm") String dljgbm);
}
