package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.CustomerType;
import com.xinhai.caiyun.systemmanager.api.CustomerTypeService;
import com.xinhai.caiyun.systemmanager.dao.CustomerTypeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 客户分类实现类
 * @author pusilin
 *
 */
@Repository
public class CustomerTypeServiceImpl implements CustomerTypeService {

	@Autowired
	CustomerTypeMapper mapper;
	@Override
	public List<CustomerType> findAllCustomerType(String dljgbm) {
		// TODO Auto-generated method stub
		return mapper.findAllCustomerType(dljgbm);
	}

	@Override
	public CustomerType findByIdCustomerType(String id) {
		// TODO Auto-generated method stub
		return mapper.findByIdCustomerType(id);
	}

	@Override
	public void updateCustomerType(String id,CustomerType cust) {
		// TODO Auto-generated method stub
		mapper.updateCustomerType(id,cust);
	}

	@Override
	public void addCustomerType(CustomerType cust) {
		// TODO Auto-generated method stub
		mapper.addCustomerType(cust);
	}

	@Override
	public CustomerType findByNameCustomerType(String name, String dljgbm) {
		// TODO Auto-generated method stub
		return mapper.findByNameCustomerType(name, dljgbm);
	}

}
