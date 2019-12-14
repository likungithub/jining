package com.xinhai.caiyun.customermanage.business;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.ReportTax;
import com.xinhai.caiyun.customermanage.api.ReportTaxService;

/**
 * @author wangshuo
 *
 * @version
 */
@Repository
public class ReportTaxServiceImpl implements ReportTaxService {

	@Override
	public List<ReportTax> findreporttax(String khbm, String dl) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updatereporttax(String id, BigDecimal shuikuan, double shuilv,
			String gxry) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updatereporttax1(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<ReportTax> searchByweek(String dl, String khbm,
			String dateWeek, String datenow, int reportFlag2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ReportTax> seachBymonth(String khbm, String dl,
			String dateMonth, String datenow, int reportFlag2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ReportTax> searchBySeasons(String dl, String dateSeasons,
			String khbm, String datenow, int reportFlag2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ReportTax> searchByYear(String dl, String dateYear,
			String khbm, String datenow, int reportFlag2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ReportTax> searchByweek1(String khbm, String dl,
			String dateWeek, String datenow) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ReportTax> seachBymonth1(String khbm, String dateMonth,
			String dl, String datenow) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ReportTax> searchBySeasons1(String khbm, String dateSeasons,
			String dl, String datenow) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ReportTax> searchByYear1(String khbm, String dateYear,
			String dl, String datenow) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ReportTax> findreporttax1(String khbm, String dl,
			int reportFlag2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ReportTax> findreporttax2(String khbm, String dl,
			int reportFlag1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ReportTax> searchByweek2(String khbm, String dl,
			String dateWeek, String datenow, int reportFlag1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ReportTax> seachBymonth2(String khbm, String dateMonth,
			String dl, String datenow, int reportFlag1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ReportTax> searchBySeasons2(String khbm, String dateSeasons,
			String dl, String datenow, int reportFlag1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ReportTax> searchByYear2(String khbm, String dateYear,
			String dl, String datenow, int reportFlag1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ReportTax searchById(String string) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateById(String string, String uuid, String shuikuan) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateByIdByFs(String string) {
		// TODO Auto-generated method stub
		
	}
	
	

}
