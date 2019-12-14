package com.xinhai.caiyun.commonmanager.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.commonmanager.api.ServiceNotification;
import com.xinhai.caiyun.commonmanager.api.ServiceNotificationCode;
import com.xinhai.caiyun.commonmanager.api.ServiceNotificationCodeService;
import com.xinhai.caiyun.commonmanager.api.ServiceNotificationService;
import com.xinhai.caiyun.commonmanager.dao.ServiceNotificationCodeMapper;
import com.xinhai.caiyun.commonmanager.dao.ServiceNotificationMapper;


/**
 * @author
 *
 * @version
 */
@Repository
public class ServiceNotificationCodeServiceImpl implements ServiceNotificationCodeService {

	
	@Autowired
	ServiceNotificationCodeMapper serviceNotificationCodeMapper;

	@Override
	public ServiceNotificationCode searchByCode(String string) {
		// TODO Auto-generated method stub
		return serviceNotificationCodeMapper.searchByCode(string);
	}
	


	
}
