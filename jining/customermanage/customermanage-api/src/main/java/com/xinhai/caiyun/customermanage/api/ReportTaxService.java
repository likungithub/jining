package com.xinhai.caiyun.customermanage.api;

import java.math.BigDecimal;
import java.util.List;

public interface ReportTaxService {
	/**
	 * 查找全部的全部
	 * @param khbm
	 * @param dl
	 * @return
	 */
	List<ReportTax> findreporttax(String khbm, String dl);

	/**
	 * 修改税款
	 * 
	 * @param id
	 * @param shuikuan
	 * @param shuilv 
	 */
	void updatereporttax(String id, BigDecimal shuikuan, double shuilv, String gxry);

	/**
	 * 修改申报状态
	 * 
	 * @param id
	 */
	void updatereporttax1(String id);

	/**
	 * 查找一周内且未申报
	 * 
	 * @param dl
	 * @param khbm
	 * @param dateWeek
	 * @param datenow
	 * @param reportFlag2
	 * @return
	 */
	List<ReportTax> searchByweek(String dl, String khbm, String dateWeek,
			String datenow, int reportFlag2);

	/**
	 * 查找一月内未申报
	 * 
	 * @param dl
	 * @param dateMonth
	 * @param khbm
	 * @param datenow
	 * @param reportFlag2
	 * @return
	 */
	List<ReportTax> seachBymonth(String khbm, String dl, String dateMonth,
			String datenow, int reportFlag2);

	/**
	 * 查找一季度内未申报
	 * 
	 * @param dl
	 * @param dateSeasons
	 * @param khbm
	 * @param datenow
	 * @param reportFlag2
	 * @return
	 */
	List<ReportTax> searchBySeasons(String dl, String dateSeasons, String khbm,
			String datenow, int reportFlag2);

	/**
	 * 查找一年内未申报
	 * 
	 * @param dl
	 * @param dateYear
	 * @param khbm
	 * @param datenow
	 * @param reportFlag2
	 * @return
	 */
	List<ReportTax> searchByYear(String dl, String dateYear, String khbm,
			String datenow, int reportFlag2);

	/**
	 * 查找一周内的全部
	 * 
	 * @param khbm
	 * @param dl
	 * @param dateWeek
	 * @param datenow
	 * @return
	 */
	List<ReportTax> searchByweek1(String khbm, String dl, String dateWeek,
			String datenow);

	/**
	 * 一月内全部
	 * 
	 * @param khbm
	 * @param dateMonth
	 * @param dl
	 * @param datenow
	 * @return
	 */
	List<ReportTax> seachBymonth1(String khbm, String dateMonth, String dl,
			String datenow);

	/**
	 * 一季度全部
	 * 
	 * @param khbm
	 * @param dateSeasons
	 * @param dl
	 * @param datenow
	 * @return
	 */
	List<ReportTax> searchBySeasons1(String khbm, String dateSeasons,
			String dl, String datenow);

	/**
	 * 一年内全部
	 * 
	 * @param khbm
	 * @param dateYear
	 * @param dl
	 * @param datenow
	 * @return
	 */
	List<ReportTax> searchByYear1(String khbm, String dateYear, String dl,
			String datenow);

	/**
	 * 未申报
	 * 
	 * @param khbm
	 * @param dl
	 * @param reportFlag2
	 * @return
	 */
	List<ReportTax> findreporttax1(String khbm, String dl, int reportFlag2);

	/**
	 * 已申报
	 * 
	 * @param khbm
	 * @param dl
	 * @param reportFlag1
	 * @return
	 */
	List<ReportTax> findreporttax2(String khbm, String dl, int reportFlag1);

	/**
	 * 一周内已申报
	 * 
	 * @param khbm
	 * @param dl
	 * @param dateWeek
	 * @param datenow
	 * @param reportFlag1
	 * @return
	 */
	List<ReportTax> searchByweek2(String khbm, String dl, String dateWeek,
			String datenow, int reportFlag1);

	/**
	 * 一月内已申报
	 * 
	 * @param khbm
	 * @param dateMonth
	 * @param dl
	 * @param datenow
	 * @param reportFlag1
	 * @return
	 */
	List<ReportTax> seachBymonth2(String khbm, String dateMonth, String dl,
			String datenow, int reportFlag1);

	/**
	 * 一季度内已申报
	 * 
	 * @param khbm
	 * @param dateSeasons
	 * @param dl
	 * @param datenow
	 * @param reportFlag1
	 * @return
	 */
	List<ReportTax> searchBySeasons2(String khbm, String dateSeasons,
			String dl, String datenow, int reportFlag1);

	/**
	 * 一年内已申报
	 * 
	 * @param khbm
	 * @param dateYear
	 * @param dl
	 * @param datenow
	 * @param reportFlag1
	 * @return
	 */
	List<ReportTax> searchByYear2(String khbm, String dateYear, String dl,
			String datenow, int reportFlag1);

	ReportTax searchById(String string);

	/**
	 * 修改纳税申报的消息编码
	 * @param string
	 * @param uuid 
	 * @param shuikuan 
	 */
	void updateById(String string, String uuid, String shuikuan);
	/**
	 * 通过id修改发送标志
	 * @param string
	 */

	void updateByIdByFs(String string);

}
