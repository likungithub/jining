package com.xinhai.caiyun.systemmanager.business;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.systemmanager.api.Lcglbzfj;
import com.xinhai.caiyun.systemmanager.api.Lcglbzxx;
import com.xinhai.caiyun.systemmanager.api.Lcgljbxx;
import com.xinhai.caiyun.systemmanager.api.Lcgljbxxfj;
import com.xinhai.caiyun.systemmanager.api.RwglJbxxService;
import com.xinhai.caiyun.systemmanager.api.RwglSfjl;
import com.xinhai.caiyun.systemmanager.api.Rwglbzfj;
import com.xinhai.caiyun.systemmanager.api.Rwglbzgzjl;
import com.xinhai.caiyun.systemmanager.api.Rwglbzxx;
import com.xinhai.caiyun.systemmanager.api.Rwglfj;
import com.xinhai.caiyun.systemmanager.api.Rwgljbxx;
import com.xinhai.caiyun.systemmanager.api.Rwglrydm;

/**
 * @Author shanliang
 * @Description：
 * @Date: 2017-10-24 18:30
 * @Modified By:
 */
@Repository
public class RwglJbxxServiceImpl implements RwglJbxxService {

	@Override
	public void updaterwgljbxx(Map m) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(String sql) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Map> query(String sql) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String querybzcxwc(String rwid, String lcid, String dqbz) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List queryLcxx(String dljzbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Rwglrydm> selectRwglrydm(String rwid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Lcgljbxx selectLcjbxxbylcid(String lcid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Lcgljbxxfj> selectLcjbxxfjbylcid(String lcid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Lcglbzxx> selectLcjbzbylcid(String lcid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Lcglbzfj> selectLcjbzfjbylcidbzid(String lcid, String bzid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map queryLcxxAll(String lcid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Rwgljbxx selectRwjbxxbyrwid(String rwid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Rwglfj> selectRwjbxxfjbyrwid(String rwid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Rwglbzxx> selectRwglbzxxbyrwid(String rwid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Rwglbzfj> selectRwglbzfjbyrwidbzid(String rwid, String bzid,
			String gzjlid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Rwglbzgzjl> selectRwglbzgzjlbyrwidbzid(String rwid, String bzid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map queryRwxx(String rwid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long insertRwjbxx(Map record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long insertRwjbxxMobile(Map record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long insertRwbzxx(Map record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Map queryrwzt(Map cxtj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map> querybzzt(Map cxtj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map queryKhxx(Map cxtj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long insertrwglfj(Rwglfj record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long insertRwglrydm(Rwglrydm record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long insertRwglbzxx(Rwglbzxx record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long insertRwglbzfj(List<Rwglbzfj> record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long insertRwglbzgzjl(Rwglbzgzjl record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long delRwxx(Rwgljbxx record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long delRwjbxx(String rwid) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long delRwbzxx(String rwid, String bzid) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Rwgljbxx> selectRwjbxxbyzxry(String zxry) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Rwgljbxx> selectRwjbxxbyfzr(Map cxtj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, String>> selectRwjbxxXxtx(Map cxtj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findAllSizeCxtj(Map cxtj) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Rwglfj queryrwfjbyfjid(String fjid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delrwfjbyfjid(String fjid) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Rwglbzfj queryrwbzfjbyfjid(String fjid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delrwbzfjbyfjid(String fjid) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public long insertRwglsfjl(RwglSfjl rwglSfjl) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public String queryRwwcbzs(String rwid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String querySfxmmc(String dm, String dljgbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long findAllSize(Date ssDate, Date seDate, String type, String rwmc,
			String zydm) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Rwgljbxx> getTaskByPage(int start, int length, Date ssDate,
			Date seDate, String type, String rwmc, String zydm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateRwclzt(String blzt, String rwid, String dqbz, String dqbzmc) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public String queryendbzid(String rwid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String queryDqbz(String bzid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map> queryBmxx(String dljgbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateYwhzrwid(String rwid, String hzid, String zydm) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Rwglbzxx selectRwglbzxxbyrwidbzid(String rwid, String bzid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateYwhzBlztbyrwid(String rwid, String blzt) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Map<String, Object>> searchCountByEmployee(String employeeCode,
			String agencyCode, String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> searchCountByDayAndInsertOrOut(
			String begin, String end, String employeeCode, String agencyCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> seachCountByNewInsert(String employeeCode,
			String begin, String end, String agencyCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int allTaskCountByAgency(String agencyCode, String employeeCode,
			String begin, String end) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int isOverByae(String agencyCode, String employeeCode, String begin,
			String end) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Map<String, Object>> searcHIsOver(String agencyCode,
			String employeeCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> seachIsNotOver(String agencyCode,
			String employeeCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> searcHIsOverByD(String agencyCode,
			String departmentCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> seachIsNotOverByD(String agencyCode,
			String departmentCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map> searchByChargeInPersonAll(String agencyCode, String begin,
			String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map> searchByBM(String agencyCode, String begin, String end) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Rwgljbxx> searchAllRwgljbxx(Map searchMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, String> selectCspzXxtx(Map searchMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> searchCountByDayAndInsertOrOutByDay(
			String begin, String end, String employeeCode, String agencyCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> searchCountByDayAndInsertOrOutByYear(
			String begin, String end, String employeeCode, String agencyCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> seachCountByNewInsertByDay(
			String employeeCode, String begin, String end, String agencyCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> seachCountByNewInsertYear(
			String employeeCode, String begin, String end, String agencyCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> searchCountByDayAndInsertOrOutNew(
			String startTime, String endTime, String zy, String dl) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> seachCountByNewInsertByDayNew(
			String startTime, String endTime, String zy, String dl) {
		// TODO Auto-generated method stub
		return null;
	}

   

}
