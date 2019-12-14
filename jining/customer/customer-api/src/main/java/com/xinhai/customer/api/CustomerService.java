package com.xinhai.customer.api;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 代理记账公司的客户管理信息
 * @author 李茂飞
 */
@Service
public interface CustomerService {
  
    Customer getCustomer(String id);
   
}
