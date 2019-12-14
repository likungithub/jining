package com.xinhai.caiyun.customermanage.business;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.Appcustomerinfo;
import com.xinhai.caiyun.customermanage.api.AppcustomerinfoService;

/**
 * APP客户信息实现类
 * @author pusilin
 *
 */
@Repository("customerinfoservice")
public class AppcustomerinfoServiceImpl implements AppcustomerinfoService {

	@Override
	public List<Appcustomerinfo> findAllAppcustomerinfo(String tjrdljg) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long querynsrsbh(Map cxtj) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Appcustomerinfo> findByTimeAppcustomerinfo(int start,
			int length, String tjrdm, String tjrdljg, String starttime,
			String endtime, String sjzt, String searchText, String zydm,
			String khzt) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findAllSize(String tjrdm, String tjrdljg, String starttime,
			String endtime, String sjzt, String searchText, String zydm,
			String khzt) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Appcustomerinfo findAppcustomerinfo(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delAppcustomerinfo(List ids) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void confirmAppcustomerinfo(List ids) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateKhbm(Map map, String khbm, String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public long findPhone(String sjhm) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void insertBusiness(Appcustomerinfo appcus) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateById(String id, Appcustomerinfo appcus) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Appcustomerinfo searchByAllId(String sjhm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> addIfRReapt(String tjrDljgBm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateFollowUpInfoType(String id, String followType) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Appcustomerinfo findByYxkhId(String randomId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Appcustomerinfo findById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateNsrsbh(String id, String nsrsbh) {
		// TODO Auto-generated method stub
		
	}
	
	
}
