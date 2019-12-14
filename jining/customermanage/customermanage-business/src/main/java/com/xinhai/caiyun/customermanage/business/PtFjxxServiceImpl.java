package com.xinhai.caiyun.customermanage.business;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.PtFjxx;
import com.xinhai.caiyun.customermanage.api.PtFjxxService;

/**
 * 附件信息
 * @author Administrator
 *
 */
@Repository
public class PtFjxxServiceImpl implements PtFjxxService{

	@Override
	public List<PtFjxx> findPtFjxxByKhbm(String khbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void insertCustomerFile(PtFjxx fjxx) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public PtFjxx findPtFjxxById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deletePtFjxxFile(String id, PtFjxx ptfjxx) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateFileDownload(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateFileInfo(String uuid, String khbm) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public long getFileSzie(String khdm) {
		// TODO Auto-generated method stub
		return 0;
	}

 
}
