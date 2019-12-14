package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.JcglService;
import com.xinhai.caiyun.customermanage.dao.JcglMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;


@Service
public class JcglServiceImpl implements JcglService {

	@Autowired
	JcglMapper jcglMapper;

	/**陈
	 * 得到显示数据的数量
	 * @param cxtj
	 * @return
	 */
	@Override
	public long findCount(Map cxtj) {
		return jcglMapper.findCount(cxtj);
	}
	/**陈
	 * 得到样品管理的显示数据
	 * @param cxtj
	 * @return
	 */
	@Override
	public List<Map> findAll(Map cxtj) {
		return jcglMapper.findAll(cxtj);
	}
	@Override
	public List<Map> jcxmAll(Map cxtj) {
		return jcglMapper.jcxmAll(cxtj);
	}

	@Override
	public void insert(List<Map> mapList) {
         jcglMapper.insert(mapList);
	}

	@Override
	public void updatezt(List<Map> data) {
		jcglMapper.updatezt(data);
	}

	@Override
	public List<Map> sjxg_queryList(Map cxtj) {
		return jcglMapper.sjxg_queryList(cxtj);
	}

	@Override
	public void sjxg_update(List<Map> cxtj) {
		jcglMapper.sjxg_update(cxtj);
	}
	/**陈
	 * 获得退回记录信息
	 */
	public List<Map> findThjlList(Map map){
		return jcglMapper.findThjlList(map);
	};
	/**陈
	 * 获得退回记录信息的数量
	 */
	public Integer findThjlListNum(Map map){
		return jcglMapper.findThjlListNum(map);
	};
	/**陈
	 * 删除退回记录信息
	 */
	public void  delThjlByIds(List<String> list){
		jcglMapper.delThjlByIds(list);
	};
	/**陈
	 * 获得检验结果录入的信息
	 */
	public List<Map> findJcxxlrList(Map map){
		return jcglMapper.findJcxxlrList(map);
	};
	/**陈
	 * 获得检验结果录入的信的数量
	 */
	public Integer findJcxxlrListNum(Map map){
		return jcglMapper.findJcxxlrListNum(map);
	};
	/**陈
	 * 通过仪器的id集合获得仪器的名称集合
	 */
	public List<String> queryYqNameByIds(List ids){
		return jcglMapper.queryYqNameByIds(ids);
	};
	/**陈
	 * 获得主检人的信息
	 */
	public List<String> getZJR(Map map){
		return jcglMapper.getZJR(map);
	};
	/**陈
	 *将主检人到数据库中  t_ypgl_jbxx
	 */
	public void  saveZJR(Map map){
		jcglMapper.saveZJR(map);
	};
	/**陈
	 * 查找样品中的是否是水食品工业产品    if_ssg
	 */
	public  String  queryIf_ssg(String ypid){
		return jcglMapper.queryIf_ssg(ypid);
	};
	/**陈
	 * 检测项任务分配
	 */
	public void  rwfp_ypjc(Map map){
		jcglMapper.rwfp_ypjc(map);
	}

	@Override
	public long findLWLQCount(Map map) {
		return jcglMapper.findLWLQCount(map);
	}

	@Override
	public List<Map> findLWLQAll(Map map) {
		return jcglMapper.findLWLQAll(map);
	}

	@Override
	public void upTaskCollection(Map map) {
		this.jcglMapper.upTaskCollection(map);
	}
	@Override
	public String findYpJcZt(Map map) {
		return this.jcglMapper.findYpJcZt(map);
	}

	//20190916添加审核环节
	@Override
	public void updateztSh(List<Map> data) {
		jcglMapper.updateztSh(data);
	}
}
