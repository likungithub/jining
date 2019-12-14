package com.xinhai.caiyun.customermanage.business;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.FollowUp;
import com.xinhai.caiyun.customermanage.api.FollowUpService;




/**
 * @author
 *
 * @version
 */
@Repository
public class FollowUpServiceImpl implements FollowUpService {

	@Override
	public List<FollowUp> findByCustomer(String khbm, String dl) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteByCustomer(String id, String delPeople, String delTime) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertFollowup(FollowUp fu) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public FollowUp findfuByid(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateFollowUp(FollowUp fu, String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public int searchByCount(String dl, String ygbm) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<FollowUp> findBydl(String dl, String ns, String zydm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FollowUp> findByAllMind(String dl, String ns, String name,
			String cxzt, String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteById(String id, String delPeople, String delTime) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateById(String id, String updatePeo, String updateTime) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public int searchCount(String dl, String ns, String zydm) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void updateByIdBybz(String id, String uuid) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String searchBydlBykhbm(String khbm, String dljgBm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FollowUp findById(String id) {
		// TODO Auto-generated method stub
		return null;
	}
    
}
