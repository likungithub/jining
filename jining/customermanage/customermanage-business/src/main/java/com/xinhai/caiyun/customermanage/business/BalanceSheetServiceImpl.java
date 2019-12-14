package com.xinhai.caiyun.customermanage.business;
import java.util.List;
import org.springframework.stereotype.Repository;
import com.xinhai.caiyun.customermanage.api.BalanceSheet;
import com.xinhai.caiyun.customermanage.api.BalanceSheetService;

/**
 * 资产负债表
 * @author huxinquan
 */
@Repository
public class BalanceSheetServiceImpl implements BalanceSheetService {

	@Override
	public List<BalanceSheet> getAllBalanceSheet() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<BalanceSheet> getBalanceSheetByLineNumber(int lineNumber) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<BalanceSheet> getBalanceSheetByGroupFlag(String groupFlag) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<BalanceSheet> searchBalanceSheetByText(String searchText) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addBalanceSheet(List<BalanceSheet> balanceSheetList) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateBalanceSheet(List<BalanceSheet> balanceSheetList) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteBalanceSheetByGroupFlag(String groupFlag) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void tombstonedBalanceSheet(BalanceSheet balanceSheet) {
		// TODO Auto-generated method stub
		
	} 
  
}
