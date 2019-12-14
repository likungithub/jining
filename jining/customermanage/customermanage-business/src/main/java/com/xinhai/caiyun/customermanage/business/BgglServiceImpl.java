package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.BgglService;
import com.xinhai.caiyun.customermanage.api.JcglService;
import com.xinhai.caiyun.customermanage.dao.BgglMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class BgglServiceImpl implements BgglService {


	@Autowired
	BgglMapper bgglMapper;

	@Override
	public long findCount(Map cxtj) {
		return bgglMapper.findCount(cxtj);
	}

	@Override
	public List<Map> findAll(Map cxtj) {
		return bgglMapper.findAll(cxtj);
	}

	@Override
	public List<Map> findAllJjd(Map cxtj) {
		return bgglMapper.findAll(cxtj);
	}

	@Override
	public void insert(List<Map> mapList) {
		bgglMapper.insert(mapList);
	}

	@Override
	public void updatezt(List<Map> data) {
		bgglMapper.updatezt(data);
	}

	@Override
	public void updatebg(List<Map> data) {
		bgglMapper.updatebg(data);
	}

	@Override
	public List<Map> sjxg_queryList(Map cxtj) {
		return bgglMapper.sjxg_queryList(cxtj);
	}

	@Override
	public void sjxg_update(List<Map> cxtj) {
		bgglMapper.sjxg_update(cxtj);
	}

	public HashMap<String,Object> getYplzd(String ypbm) {
		return this.bgglMapper.getYplzd(ypbm);
	}
	@Override
	public List<Map> findById(String id) {
		return bgglMapper.findById(id);
	}

	@Override
	public List<Map> findJcx(String id) {
		return bgglMapper.findJcx(id);
	}

	@Override
	public List<Map> findFfbz(String id) {
		return bgglMapper.findFfbz(id);
	}

    @Override
    public List<Map> getjcyj(String id) {
        return bgglMapper.getjcyj(id);
    }

    @Override
	public List<Map> findjcz(String id) {
		return bgglMapper.findjczz(id);
	}

	@Override
	public List<Map> findjcrq(String id) {
		return bgglMapper.findjcrq(id);
	}

	@Override
	public List<Map> findjyyq(String id) {
		return bgglMapper.findjyyq(id);
	}

	@Override
	public void bgshAutomaticPassing(String ypid,String shr_zydm) {   //因即墨4.19需求变更，取消报告审核默认通过功能
		List<Map> mapList = new ArrayList<>();
		Map m = new HashMap();
		m.put("lx","1");  //1 = 报告审核
		m.put("id",ypid);
		m.put("zt","002");
		m.put("zydm",shr_zydm);
		m.put("if_zx","001");
		mapList.add(m);
		bgglMapper.updatezt(mapList);
	}
	@Override
	public void bgspAutomaticPassing(String ypid,String spr_zydm) {   //报告编制时 记录 报告审批 ，直接跳到 总审核
		List<Map> mapList = new ArrayList<>();
		Map m = new HashMap();
		m.put("lx","2");  //2 = 报告批准
		m.put("id",ypid);
		m.put("zt","002");
		m.put("zydm",spr_zydm);
		m.put("if_zx","001");
		mapList.add(m);
		bgglMapper.updatezt(mapList);
	}
	//20190917添加退回跳过批准
	@Override
	public void updateztNew(List<Map> data) {
		bgglMapper.updateztNew(data);
	}
}
