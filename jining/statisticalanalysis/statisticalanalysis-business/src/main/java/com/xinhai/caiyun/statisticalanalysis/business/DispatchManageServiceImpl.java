package com.xinhai.caiyun.statisticalanalysis.business;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.statisticalanalysis.api.DispatchManage;
import com.xinhai.caiyun.statisticalanalysis.api.DispatchManageService;
import com.xinhai.organization.api.Organization;
import com.xinhai.usermanager.entity.User;

/**
 * 派工统计实现类
 * @author pusilin
 *
 */
@Repository
public class DispatchManageServiceImpl implements DispatchManageService {

	@Override
	public List<DispatchManage> findDispatchManagesByList(String dljgBm,
			List<String> list) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findDispatchHistorySize(List<String> list) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<DispatchManage> findDispatchHistoryList(int start, int length,
			List<String> list) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String findUserRole(String staffcode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DispatchManage hasDispatch(String zydm, String khbm, String dljgbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void insertDispatchInfo(User user, Organization org,
			String roleName, String roleCode, String khbm,
			DispatchManage dispatch) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delByIdDispatch(DispatchManage dispatchmanage) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public DispatchManage findByid(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delAndInsert(DispatchManage dispatch, DispatchManage dm) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertDispatchInfo(String staffcode, String staffname,
			String department, String rolename, String rolecode, String khbm,
			String zydm, String dljgbm, String bmdm, String zymc) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void sendMessage(String zydm, String gsmc, String username) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void sendMessage(String zydm, String gsmc, String username,
			String dljgbm, String dlzydm, String dlzymc) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delAndInsert(DispatchManage dispatch, DispatchManage dm,
			String zydm, String dljgbm, String bmdm, String zymc) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public long getDispatchManageTotalCount(String dljgbm, String searchText,
			String zydm) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long getDispatchManageTotalCountSLG(Map cxtj) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<DispatchManage> getDispatchManageByPaging(String dljgbm,
			int start, int length, String searchText, String zydm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<DispatchManage> getDispatchManageByPagingSLG(Map cxtj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> echarsTop(String dljgbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> echarstYesDay(String date, String dljgbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateUserInfo(String dljgBm, String zydm, String name,
			String ygtx, String jsdm, String jsname) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Map> echarsdata(Map map) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateRoleList(String dljgBm, List<String> list, String jsdm,
			String jsname) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<DispatchManage> findAllExcel(Map datamap) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
