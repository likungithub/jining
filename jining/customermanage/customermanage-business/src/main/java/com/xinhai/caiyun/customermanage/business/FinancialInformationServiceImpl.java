package com.xinhai.caiyun.customermanage.business;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.FinancialInformation;
import com.xinhai.caiyun.customermanage.api.FinancialInformationService;

/**
 * 财务信息
 * @author huxinquan
 */
@Repository
public class FinancialInformationServiceImpl implements FinancialInformationService {

	@Override
	public List<FinancialInformation> getFinancialInformationByCustomerCode(
			String customerCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FinancialInformation> getFinancialInformationByTime(
			String selectTime, String customerCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FinancialInformation> getFinancialInformationByQueryData(
			String beginTime, String endTime, String customerCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addFinancialInformation(
			FinancialInformation financialInformation) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public FinancialInformation getFinancialInformationByGroupFlag(
			String groupFlag) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateWriteSigns(FinancialInformation financialInformation) {
		// TODO Auto-generated method stub
		
	}
    
}
