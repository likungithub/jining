package com.xinhai.caiyun.statisticalanalysis.business;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.statisticalanalysis.api.StatisticReport;
import com.xinhai.caiyun.statisticalanalysis.api.StatisticReportService;
import com.xinhai.caiyun.statisticalanalysis.api.StatisticReportSon;

/**
 * Created by lmf on 2018/3/22 0022.
 *
 * @escription: 接口实现
 */
@Repository
public class StatisticReportServiceImpl implements StatisticReportService {

	@Override
	public List<StatisticReport> findAll(String dl, String bmdm, String zydm,
			String edition, int start, int length) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<StatisticReport> findBMInfo(String dl, String bmdm,
			String edition, int start, int length) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer findAllNum(String dl, String bmdm, String zydm,
			String edition) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer findBMInfoNum(String dl, String bmdm, String edition) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<StatisticReportSon> findSon(String dl, String edition,
			String type, int start, int length) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer findSonNum(String dl, String edition, String type) {
		// TODO Auto-generated method stub
		return null;
	}

   
}
