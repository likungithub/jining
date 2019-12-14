package com.xinhai.caiyun.customermanage.business;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.FollowUpFile;
import com.xinhai.caiyun.customermanage.api.FollowUpInfo;
import com.xinhai.caiyun.customermanage.api.IntentionCustomerFollowUpService;
import com.xinhai.caiyun.customermanage.api.ShareCustomer;

/**
 * 意向客户跟进接口实现类
 * Created by 王硕 on 2018/4/11 0011.
 */
@Repository
public class IntentionCustomerFollowUpServiceImpl implements IntentionCustomerFollowUpService {

	@Override
	public void addShareCustomer(ShareCustomer shareCustomer) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<ShareCustomer> findByYxId(String yxid, String dljgBm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteShareCustomer(String yxid, String dljgBm,
			String currentZydm, Date date) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addFollowUpContent(FollowUpInfo followUpInfo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addFollowUpFiles(FollowUpFile followUpFile) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public FollowUpInfo findFollowInfoById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateFollowUpContent(FollowUpInfo followUpInfo, String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateFollowUpFiles(FollowUpFile followUpFile, String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<FollowUpInfo> findFollowUpInfoByAgencyCodeAndIntentionCode(
			String dljgBm, String intentionCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FollowUpFile> findFollowUpFilesByAgencyCodeAndIntentionCode(
			String dljgBm, String gjId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteFile(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteFollowUpInfo(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public FollowUpInfo findFollowInfoBygjId(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String findByYxIdForLrry_dm(String yxid, String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String findByGjidForLrry_dm(String gjId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FollowUpFile> findByGjId(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteFollowUpInfoByGjId(String id, String inputPeopleCode,
			Date date) {
		// TODO Auto-generated method stub
		
	}
    
}
