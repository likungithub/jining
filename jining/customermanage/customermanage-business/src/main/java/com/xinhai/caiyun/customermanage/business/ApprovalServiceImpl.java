package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.Approval;
import com.xinhai.caiyun.customermanage.api.ApprovalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * APP客户信息实现类
 * @author pusilin
 *
 */
@Repository
public class ApprovalServiceImpl implements ApprovalService {

	@Override
	public long getHistorySize(long id, String type) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Approval> getHistoryList(int start, int length, long id,
			String type) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}
