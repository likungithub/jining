package com.xinhai.caiyun.customermanage.business;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.Charge;
import com.xinhai.caiyun.customermanage.api.ChargeService;

/**
 * 收费管理
 * @author tangck
 *
 */
@Repository
public class ChargeServiceImpl implements ChargeService {

	@Override
	public long findAllChargeSizeMore(String searchtxt, String auditStatic,
			String chargeStatic, String chargeType, String chargeModel,
			String chargeMode, String dl, String zy, String khbm, String type,
			int fwzt, String sfqd, String sfr, String khzg, String lx,
			String ifSearch) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Charge> findAllChargeList(String searchtxt, int startInt,
			int lengthInt, String auditStatic, String chargeStatic,
			String chargeType, String chargeModel, String chargeMode,
			String dl, String zy, String khbm, String type, int fwzt,
			String sfqd, String sfr, String khzg, String lx, String ifSearch) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findGrChargeSizeMore(String searchtxt, String auditStatic,
			String chargeStatic, String chargeType, String chargeModel,
			String chargeMode, String dl, String zy, String khbm, String type,
			int fwzt, String sfqd, String sfr, String khzg) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Charge> findGrChargeList(String searchtxt, int startInt,
			int lengthInt, String auditStatic, String chargeStatic,
			String chargeType, String chargeModel, String chargeMode,
			String dl, String zy, String khbm, String type, int fwzt,
			String sfqd, String sfr, String khzg) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findBmChargeSizeMore(String searchtxt, String auditStatic,
			String chargeStatic, String chargeType, String chargeModel,
			String chargeMode, String dl, String Bmdm, String khbm,
			String type, int fwzt, String sfqd, String sfr, String khzg) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Charge> findBmChargeList(String searchtxt, int startInt,
			int lengthInt, String auditStatic, String chargeStatic,
			String chargeType, String chargeModel, String chargeMode,
			String dl, String Bmdm, String khbm, String type, int fwzt,
			String sfqd, String sfr, String khzg) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Charge> searchChargeListByHtbm(String htbm, String audit,
			String charge, String sfqd, String sfr) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateRealMoney(String id, BigDecimal realMoney,
			BigDecimal yhMoney, BigDecimal ysMoney) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public BigDecimal getMoney(String htbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateyhMoney(String id, BigDecimal yhMoney, BigDecimal ssMoney) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateMoney(Charge oldcharge) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertCharge(Charge charge) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteCharge(Charge charge) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Charge> findChargeByList(List<String> list) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateOrderReminderTime(String ddbh) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateOrderNumber(List<String> list, String orderNumber) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertOrder(Map<String, Object> datamap) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void reminderRecord(Map<String, Object> datamap) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Map<String, Object>> getPayType(String dl) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getPayTypeAll(String dl) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void sendChargeAudit(List<String> list, Charge charge) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteOrder(String ddbh, String dl) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void sendAuditMessage(Map<String, Object> dataMap) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Charge findChargeInfo(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void badebts(List<String> idList, Date lrrq) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Map<String, Object>> findChargeFileList(String ddbh) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String findChargeFileById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteChargeFile(Map<String, Object> dataMap) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertChargeFile(Map<String, Object> dataMap) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public long findAllOrderSizeMore(String searchtxt, String auditStatic,
			String chargeStatic, String chargeType, String chargeModel,
			String chargeMode, String dl, String zy, int fwzt, String sfqd,
			String sfr, String khzg, String lx, String ifSearch) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Charge> findAllOrderList(String searchtxt, int startInt,
			int lengthInt, String auditStatic, String chargeStatic,
			String chargeType, String chargeModel, String chargeMode,
			String dl, String zy, int fwzt, String sfqd, String sfr,
			String khzg, String lx, String ifSearch) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findBmOrderSizeMore(String searchtxt, String auditStatic,
			String chargeStatic, String chargeType, String chargeModel,
			String chargeMode, String dl, String bmdm, int fwzt, String sfqd,
			String sfr, String khzg) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Charge> findBmOrderList(String searchtxt, int startInt,
			int lengthInt, String auditStatic, String chargeStatic,
			String chargeType, String chargeModel, String chargeMode,
			String dl, String bmdm, int fwzt, String sfqd, String sfr,
			String khzg) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findGrOrderSizeMore(String searchtxt, String auditStatic,
			String chargeStatic, String chargeType, String chargeModel,
			String chargeMode, String dl, String zy, int fwzt, String sfqd,
			String sfr, String khzg) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Charge> findGrOrderList(String searchtxt, int startInt,
			int lengthInt, String auditStatic, String chargeStatic,
			String chargeType, String chargeModel, String chargeMode,
			String dl, String zy, int fwzt, String sfqd, String sfr, String khzg) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateAudit(List<String> list, Charge charge) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public long findReceiptSize(String khmc, Date sDate, Date eDate, String dl,
			String zy, int fwzt, int type, String ifSearch) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Map<String, Object>> findReceiptList(int startInt,
			int lengthInt, String khmc, Date sDate, Date eDate, String dl,
			String zy, int fwzt, int type, String ifSearch) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Charge> findChargeReminder(List<String> list) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Charge> findAllCharge(Date startDate, Date endDate,
			String status, String khxx, String dljg) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void revokeOrder(Charge charge) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void auditCharge(Charge charge, List<Map<String, String>> list) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public long findChargeByHtbm(String htbm) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Map<String, String>> searchByAuditMark(String dl, String begin,
			String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, String>> searchByTollNumber(String dl,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> searchBySituation(String dl, String begin,
			String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> searchByFeeAmount(String dl, String begin,
			String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Charge> findChargeListByHtbm(String htbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Charge> findChargeListById(List<Map<String, String>> list) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void auditChargeById(String id, Charge charge) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String findMaxSJBM(String dljgBm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> searchBySituationByYear(String dl,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> searchByFeeAmountByYear(String dl,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, String> findChargeInfoBySJBMAndHTBM(String ddbh) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void insertChargeByProcedures(Map<String, Object> dataMap) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Map<String, String> findAllChargeInfo(String dl, String zy,
			String khbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findChargeSizeIsBeUse(String htbm) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void deleteChargeByHtbm(Charge charge) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Map<String, Object>> arrearsStatisticByDepartmentsMember(
			String agencyCode, String begin, String end, String zy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> arrearsStatisticByDepartmentsMoney(
			String agencyCode, String begin, String end, String zy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> arrearsStatisticMoneyByTime(
			String agencyCode, String begin, String end, String zy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> arrearsStatisticMumberByTime(
			String agencyCode, String begin, String end, String zy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> arrearsStatisticByProject(String begin,
			String end, String agencyCode, String zy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int findAllProject(String begin, String end, String agencyCode,
			String zy) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Map<String, Object>> arrearsStatisticByType(String begin,
			String end, String agencyCode, String zy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int findAllType(String begin, String end, String agencyCode,
			String zy) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long findAllChargeByAgency(String searchtxt, String auditStatic,
			String begin, String end, String dl, String zy, int startInt,
			int lengthInt) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Charge> findAllChargeByAgencyList(String searchtxt,
			String auditStatic, String begin, String end, String dl, String zy,
			int startInt, int lengthInt) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> chargeAuditByMumberCount(String dl,
			String zy, String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int searchAllchargeAuditByMumberCount(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Map<String, Object>> chargeStatMemberCount(String dl,
			String zy, String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int searchAllchargeStatMemberCount(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Map<String, Object>> alreadyCharge(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> noCharge(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> arrearsCharge(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> remindFee(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> rankingByDepartment(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> auditedByDepartment(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> arrearsByDepartment(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findAllChargeSizeMoreByws(String searchtxt, String auditStatic,
			String chargeStatic, String chargeType, String chargeModel,
			String chargeMode, String dl, String zy, String sflx,
			String department, String employee, String fwqq, String fwqz,
			String now, String fwzt, String chargeAccount, String chargePeople,
			String chargeStartTime, String chargeEndTime, String khjl) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Charge> findAllChargeListByws(String searchtxt, int startInt,
			int lengthInt, String auditStatic, String chargeStatic,
			String chargeType, String chargeModel, String chargeMode,
			String dl, String zy, String sflx, String department,
			String employee, String fwqq, String fwqz, String now, String fwzt,
			String chargeAccount, String chargePeople, String chargeStartTime,
			String chargeEndTime, String khjl) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Charge> searchChargeListByHtbmByws(String htbm, String audit,
			String charges, String chargespro, String chargeTy,
			String chargeMod, String department, String employee,
			String startTime, String endTime, String chargews, String now,
			String fwzt, String chargeAccount, String chargePeople,
			String chargeStartTime, String chargeEndTime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Charge> findChargeByDDBH(String ddbh) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateCharge(Charge nullcharge, List<String> list) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Map<String, String>> findsfsm(String ddbh) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> noChargeByYear(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> arrearsChargeByYear(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> remindFeeByYear(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> alreadyChargeByYear(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findAllChargeSizeMoreBywsByaa(String dl, String zy,
			String khbm, String startTime, String endTime) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Charge> findAllChargeListBywsByaa(int startInt, int lengthInt,
			String dl, String zy, String khbm, String startTime, String endTime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Charge> findAllChargeListDown(Map searchMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Charge> findAllChargeListDownWs(Map searchMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> yidaokuan(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> yidaokuanByYear(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Charge> findAllChargeListBywsByaaDown(Map searchMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> huaizhang(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> huaizhangByYear(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Charge> findAllChargeListDownByArreal(Map searchMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> alreadyChargeByDay(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> noChargeByDay(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> arrearsChargeByDay(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> remindFeeByDay(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> yidaokuanByDay(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> huaizhangByDay(String dl, String zy,
			String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> arrearsStatisticMoneyByTimeByDay(
			String agencyCode, String begin, String end, String zy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> arrearsStatisticMoneyByTimeByYear(
			String agencyCode, String begin, String end, String zy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> arrearsStatisticMumberByTimeByDay(
			String agencyCode, String begin, String end, String zy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> arrearsStatisticMumberByTimeByYear(
			String agencyCode, String begin, String end, String zy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void upDateKhDdxx(Map datamap) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Map<String, String> getYwlx(String dljgbm, String sfxmdm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> alreadyChargeNew(String dl, String zy,
			String startTime, String endTime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> noChargeNew(String dl, String zy,
			String startTime, String endTime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> reminChargeNew(String dl, String zy,
			String startTime, String endTime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> arrearsChargeNew(String dl, String zy,
			String startTime, String endTime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> yidaokuanNew(String dl, String zy,
			String startTime, String endTime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> huaizhangNew(String dl, String zy,
			String startTime, String endTime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> arrearsStatisticMumberByTimeByDayNew(
			String agencyCode, String startTime, String endTime, String zy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findAllChargeSizeMoreArrears(String searchtxt,
			String auditStatic, String chargeStatic, String chargeType,
			String chargeModel, String chargeMode, String dl, String zy,
			String khbm, String type, int fwztCode, String sfqd, String sfr,
			String khzg, String khjl) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Charge> findAllChargeListArrears(String searchtxt,
			int startInt, int lengthInt, String auditStatic,
			String chargeStatic, String chargeType, String chargeModel,
			String chargeMode, String dl, String zy, String khbm, String type,
			int fwztCode, String sfqd, String sfr, String khzg, String khjl) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Charge getMainCharge(String glbm, String dljgbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Charge> getChildCharge(String glbm, String dljgBm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Charge> getChargeInfo(String htbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Charge> findChargeOrder(String htbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findChargeFileSize(String glbm) {
		// TODO Auto-generated method stub
		return 0;
	}

   
}
