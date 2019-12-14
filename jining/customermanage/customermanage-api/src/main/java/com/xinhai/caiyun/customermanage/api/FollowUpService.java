package com.xinhai.caiyun.customermanage.api;

import java.util.List;




public interface FollowUpService {

	List<FollowUp> findByCustomer(String khbm, String dl);

	void deleteByCustomer(String id, String delPeople, String delTime);

	void insertFollowup(FollowUp fu);

	FollowUp findfuByid(String id);

	void updateFollowUp(FollowUp fu, String id);

	int searchByCount(String dl, String ygbm);

	List<FollowUp> findBydl(String dl, String ns, String zydm);

	List<FollowUp> findByAllMind(String dl, String ns, String name,
			String cxzt, String begin, String end);

	void deleteById(String id, String delPeople, String delTime);
 
	
	void updateById(String id, String updatePeo, String updateTime);

	int searchCount(String dl, String ns, String zydm);

	void updateByIdBybz(String id, String uuid);

	String searchBydlBykhbm(String khbm, String dljgBm);

	FollowUp findById(String id);   


}

