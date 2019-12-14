package com.xinhai.caiyun.customermanage.business;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.ContractFile;
import com.xinhai.caiyun.customermanage.api.ContractFileService;

/**
 * 合同附件
 * @author tangck
 *
 */
@Repository
public class ContractFileServiceImpl implements ContractFileService{

	@Override
	public void insertContractFile(ContractFile contractFile) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<ContractFile> findContractFileByUUID(String uuid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateFileByHtbm(String uuid, String htbm) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public long getContractFileSizeByHtbm(String htbm) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void deleteContractFile(String id, ContractFile contractFile) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteContractFileByHtbm(ContractFile contractFile) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateFileDownload(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ContractFile findContractFileById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

   
}
