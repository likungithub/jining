package com.xinhai.caiyun.customermanage.business;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.PtKhxx;
import com.xinhai.caiyun.customermanage.api.Ptqdgsbssz;
import com.xinhai.caiyun.customermanage.api.PtswsbService;
import com.xinhai.caiyun.customermanage.api.QddsBssz;

/**
 * 税务申报
 * Created by zhangzixiang  on 2018/3/5
 */
@Repository
public class PtswsbServiceImpl implements PtswsbService {

	@Override
	public DatatablesViewPage<PtKhxx> getSbKhList(Integer type, Boolean fwzt,
			String other, String khfldm, String khmc, String startTime,
			String endTime, String start, String length) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setTaxdeclaration(Ptqdgsbssz ptqdgsbssz) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Ptqdgsbssz getTaxdeclarationByKhbm(String khbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateTaxdeclaration(Ptqdgsbssz ptqdgsbssz) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ByteArrayOutputStream downSwsbExport(Integer type, Boolean fwzt,
			String other, String swjlx, String khfldm, String khmc,
			String startTime, String endTime) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> uploadSwsbModel(InputStream is, String swjlx) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public QddsBssz selectDsPzbyKhbm(String khbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void insertSelectiveDs(QddsBssz qddsBssz) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateByPrimaryKeySelectiveDs(QddsBssz qddsBssz) {
		// TODO Auto-generated method stub
		
	}
  
}
