package com.xinhai.caiyun.customermanage.business;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.PtXgjl;
import com.xinhai.caiyun.customermanage.service.PtXgjlService;

/**
 * Created by  on 2018/3/28 0028.
 *
 * @escription:
 * @tableName:
 */
@Repository
public class PtXgjlServiceImpl implements PtXgjlService {

	@Override
	public void insert(PtXgjl pt) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delByKhbm(String khbm) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<PtXgjl> getByDl(String dl, String khmc, Date start, Date end,
			int begin, int len) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getNum(String dl, String khmc, Date start, Date end) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public PtXgjl getByKh(String khbm) {
		// TODO Auto-generated method stub
		return null;
	}

   
}
