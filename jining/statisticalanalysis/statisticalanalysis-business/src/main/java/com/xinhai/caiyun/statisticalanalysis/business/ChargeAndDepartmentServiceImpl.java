package com.xinhai.caiyun.statisticalanalysis.business;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.Charge;
import com.xinhai.caiyun.statisticalanalysis.api.ChargeAndDepartment;
import com.xinhai.caiyun.statisticalanalysis.api.ChargeAndDepartmentService;


/**
 *
 * @author wangshuo
 *
 */
@Repository
public class ChargeAndDepartmentServiceImpl implements ChargeAndDepartmentService {

	@Override
	public long getAllByEmployeelen(String type, String fwzt, String zydm,
			String dl, String startTime, String endTime) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Map<String, Object>> getAllByEmployee(String type, String fwzt,
			String zydm, String dl, Integer startA, Integer lengthA,
			String startTime, String endTime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findAllByEmpployeeLen(String type, String fwzt, String other,
			String dl, String startTime, String endTime) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Map<String, Object>> findAllByEmployee(String type,
			String fwzt, String other, String dl, Integer startA,
			Integer lengthA, String startTime, String endTime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> getAllDepartment(String s, String dl) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long getAllByDepartmentLen(String type, String fwzt, String zydm,
			String dl) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Map<String, Object>> getAllByDepartment(String type,
			String fwzt, String zydm, String dl, Integer startA, Integer lengthA) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> getAllDepartmentByzZy(String zydm, String dl) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> getAllDepartmentByBm(String other, String dl) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Charge> chargelistaaByws(String dl, String khbm, String htbm,
			String startTime, String endTime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getAll(String dl) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ChargeAndDepartment getOneEmployee(String zydm, String dl,
			String other, String startTime, String endTime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> getAllDepartmentByzZyAc(String zydm1, String s,
			String zydm, String dl) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> getAllDepartmentByzZyAg(String zydm, String dl,
			String startTime, String endTime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> getAllDepartmentac(String other, String dl,
			String startTime, String endTime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> getAllDepartmentag(String other, String dl,
			String startTime, String endTime) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ChargeAndDepartment> findAllChargeAndDepartmentListDownByBm(
			Map searchMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ChargeAndDepartment> getAllByEmployeeBydaochu(Map searchMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ChargeAndDepartment getAllDepartmentNew(String bmdm, String dl,
			String zydm, String startTime, String endTime) {
		// TODO Auto-generated method stub
		return null;
	}

  
}
