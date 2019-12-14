package com.xinhai.caiyun.customermanage.business;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.ContractChange;
import com.xinhai.caiyun.customermanage.api.ContractChangeService;

/**
 * Created by Administrator on 2018/4/11 0011.
 */
@Repository
public class ContractChangeServiceImpl implements ContractChangeService {

	@Override
	public void saveChange(ContractChange contractChange) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public long getContractChangeSize(String status, String khxx,
			String dljgBm, String zydm, String lx, int fwzt, String ifSearch) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<ContractChange> getContractChangeList(int start, int length,
			String status, String khxx, String dljgBm, String zydm, String lx,
			int fwzt, String ifSearch) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ContractChange findContractChange(String bgid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateContractChange(ContractChange contractChange) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateContractAndChange(String bgid) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteChangeByHtbm(String htbm) {
		// TODO Auto-generated method stub
		
	}

   
}
