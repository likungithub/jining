package com.xinhai.caiyun.commonmanager.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.commonmanager.api.ServiceNotification;
import com.xinhai.caiyun.commonmanager.api.ServiceNotificationService;
import com.xinhai.caiyun.commonmanager.dao.ServiceNotificationMapper;


/**
 * @author
 *
 * @version
 */
@Repository
public class ServiceNotificationServiceImpl implements ServiceNotificationService {

	
	@Autowired
	ServiceNotificationMapper serviceNotificationMapper;
	
	@Override
	public void insertFollowUp(ServiceNotification snc) {
		// TODO Auto-generated method stub
		serviceNotificationMapper.insertFollowUp(snc);
	}

	
}
