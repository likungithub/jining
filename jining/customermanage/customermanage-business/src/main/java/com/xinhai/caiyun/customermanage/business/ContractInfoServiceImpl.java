package com.xinhai.caiyun.customermanage.business;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.ContractInfo;
import com.xinhai.caiyun.customermanage.api.ContractInfoService;

/**
 * 合同接口实现
 * @author tamgck
 *
 */
@Repository
public class ContractInfoServiceImpl implements ContractInfoService {

	@Override
	public long searchContractListSize(String dljgBm, String zydm, String khbm) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<ContractInfo> searchContractList(int sta, int len,
			String dljgBm, String zydm, String khbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ContractInfo> checkDateHas(String khbm, Date startDate,
			Date endDateDay, String sfxm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ContractInfo findContractInfoByHtbm(String htbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ContractInfo findContractInfoById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void insertContractInfo(ContractInfo ci) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateContractInfo(String htbm, ContractInfo ci) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<ContractInfo> findContractInfo(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ContractInfo> findContractInfoSHTG(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ContractInfo> findAllContract(String dljgBm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteContractInfo(ContractInfo ci) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<ContractInfo> searchContractInfo(Date startDate, Date endDate,
			String status, String khxx, String dljg, String zy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateContractInfoAdopt(String htbm, ContractInfo ci) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateContractInfoAdoptList(ContractInfo ci, List<String> list) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public long findContractDate(String id, Date startDate, Date endDate) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<ContractInfo> findCharge(Date year, String khbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ContractInfo> checkDate(String id, Date startDate, Date endDate) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateXqzt(String htbm) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public long findAllContractSize(String dljgBm) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<ContractInfo> getContractByPage(int start, int length,
			String dljgBm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findContinueContractSize(String dljgBm) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<ContractInfo> getContinueContractByPage(int start, int length,
			String dljgBm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ContractInfo> getContinueContractByUser(int start, int length,
			String dljgBm, String zydm, int days, Date thisTime, int fwzt,
			int type) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ContractInfo> findKHBMGroupByHTBM(List<String> list) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void revokeContract(ContractInfo contract) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<ContractInfo> findContractListByMyself(int start, int length,
			String dljgBm, String zydm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findMyContractSize(String khmc, String dl, String zy,
			Date startDate, Date endDate, String status, int fwzt, int type,
			String ifSearch) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<ContractInfo> findMyContractList(int start, int length,
			String khmc, String dl, String zy, Date startDate, Date endDate,
			String status, int fwzt, int type, String ifSearch) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateMoney(String htbm, BigDecimal ysMoney) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertApprove(Map datamap) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getIDbyHTBM(List<String> list) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getHtShzt(String htbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setBgz(String htbm, boolean zt) {
		// TODO Auto-generated method stub
		
	}

    
}
