package com.xinhai.caiyun.customermanage.business;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.ContractPay;
import com.xinhai.caiyun.customermanage.api.ContractPayService;

/**
 * 收费项目实现
 * @author tangck
 *
 */
@Repository
public class ContractPayServiceImpl implements ContractPayService {

	@Override
	public void insertPayService(ContractPay cp) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<ContractPay> findContractPayByHtbm(String htbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteContractPay(ContractPay cps) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public long findContractPayTypeByHtbm(String htbm) {
		// TODO Auto-generated method stub
		return 0;
	}

    
}
