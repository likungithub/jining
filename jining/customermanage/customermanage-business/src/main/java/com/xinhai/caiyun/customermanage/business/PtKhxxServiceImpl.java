package com.xinhai.caiyun.customermanage.business;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.PtKhxx;
import com.xinhai.caiyun.customermanage.api.PtKhxxService;
import com.xinhai.caiyun.customermanage.api.PtSwtx;

/**
 * @author
 *
 * @version
 */
@Repository
public class PtKhxxServiceImpl implements PtKhxxService {

	@Override
	public PtKhxx findPtKhxx(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void createPtKhxx(PtKhxx ptkhxx) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updatePtKhxx(Long id, PtKhxx ptkhxx) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public PtKhxx getInformationKhxxbysjh(String sjhm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deletePtKhxx(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deletePtKhxxbykhbm(String khbm) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String checkList(List<PtKhxx> list, String dljg_bm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void insertList(List<PtKhxx> list) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<PtKhxx> findAllPtKhxx(String dljg_bm, String fwzt) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PtKhxx getInformation(String nsrsbh, String khbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PtKhxx getInformationKhxx(String nsrsbh) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateFw(List<String> ids, Integer fwzt) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public PtKhxx findCustomerByKhbm(String khbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PtKhxx findPtKhxxById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int insertNssb(PtKhxx ptkhxx, List<PtSwtx> ptSwtxlist, String txsj) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateNssb(PtKhxx ptkhxx, List<PtSwtx> ptSwtxlist, String txsj) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long findPtKhxxSizeByDljgbm(String dljgbm) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<PtKhxx> getPtkhxxByPage(int start, int length, String dljgbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delKh(List<String> ids) {
		// TODO Auto-generated method stub
		
	}
    
   
}
