package com.xinhai.caiyun.customermanage.business;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.CashFlowStatements;
import com.xinhai.caiyun.customermanage.api.CashFlowStatementsService;

/**
 * 现金流量表
 * @author huxinquan
 */
@Repository
public class CashFlowStatementsServiceImpl implements CashFlowStatementsService {

	@Override
	public List<CashFlowStatements> getCashFlowStatementsByLineNumber(
			int lineNumber) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CashFlowStatements> getCashFlowStatementsByGroupFlag(
			String groupFlag) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CashFlowStatements> searchCashFlowStatementsByText(
			String searchText) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addCashFlowStatements(
			List<CashFlowStatements> cashFlowStatementsList) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteCashFlowStatementsByGroupFlag(String groupFlag) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void tombstonedCashFlowStatements(
			CashFlowStatements cashFlowStatements) {
		// TODO Auto-generated method stub
		
	}
   
}
