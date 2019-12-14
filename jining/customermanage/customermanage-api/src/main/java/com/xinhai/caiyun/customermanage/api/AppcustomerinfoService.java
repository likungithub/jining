package com.xinhai.caiyun.customermanage.api;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


/**
 * APP客户信息接口类
 * @author pusilin
 *
 */
@Service
public interface AppcustomerinfoService {
	/**
	 * 查询所有的客户信息
	 * @return
	 */
	 List<Appcustomerinfo> findAllAppcustomerinfo(String tjrdljg);
	 long querynsrsbh( Map cxtj);


	/**
	 * 根据日期查客户信息
	 * @return
	 */
	 List<Appcustomerinfo> findByTimeAppcustomerinfo(int start, int length, String tjrdm, String tjrdljg, String starttime, String endtime, String sjzt, String searchText, String zydm, String khzt);


	long findAllSize(String tjrdm, String tjrdljg, String starttime, String endtime, String sjzt, String searchText, String zydm, String khzt);


	/**
	  * 根据id查询客户信息
	  * @param id
	  * @return 沟通反馈
	  */
	 Appcustomerinfo findAppcustomerinfo(String id);

	 void delAppcustomerinfo(List ids);

	 void confirmAppcustomerinfo(List ids);

	 void updateKhbm(Map map, String khbm, String id);

	 /**
	  * 查询手机号码是否存在
	  * @param sjhm
	  *            手机号码
	  * @return
	  */
    long findPhone(String sjhm);

    /**
     * 新增商机
     * @param appcus
     *          商机信息
     */
    void insertBusiness(Appcustomerinfo appcus);

	/**
	 * 编辑商机
	 * @param id
	 * @param appcus
	 */
	void updateById(String id, Appcustomerinfo appcus);


	/**
	 * 通过手机号查询id
	 * @param sjhm
	 * @return
	 */
    Appcustomerinfo searchByAllId(String sjhm);

	/**
	 * 查询是否有重复
	 * @param tjrDljgBm
	 * @return
	 */
	List<String> addIfRReapt(String tjrDljgBm);

	/**
	 * 修改跟进状态
	 * @param id
	 * @param followType
	 */
    void updateFollowUpInfoType(String id, String followType);

	Appcustomerinfo findByYxkhId(String randomId);

	/**
	 * 通过id 查询
	 * @param id
	 * @return
	 */
	Appcustomerinfo findById(String id);

	/**
	 * 签约后把生成的纳税人识别号再更新到意向客户
	 * @param id
	 * @param nsrsbh
	 */
	void updateNsrsbh(String id, String nsrsbh);
}
