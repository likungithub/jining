package com.xinhai.caiyun.customermanage.business;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.PtCftx;
import com.xinhai.caiyun.customermanage.api.PtCftxService;

/**
 * 催费欠费提醒
 * 
 * @author lmf
 *
 */
@Repository
public class PtCftxServiceImpl implements PtCftxService {

	@Override
	public List<PtCftx> findAllDone(String year, String month, String dljgBm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<PtCftx> findCftx(String dljgbm, String cfzt) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<PtCftx> findCftxNum(String dljgbm, String cfzt) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BigDecimal findCftxByUser(String dljgbm, String zydm, String cfzt) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer findCftxNumByUser(String dljgbm, String zydm, String cfzt) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int deleteByFzbzPtCftx(String fzbz) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void findCftxBySfxx(String id, String sfyf, String sfnf) {
		// TODO Auto-generated method stub
		
	}

}
