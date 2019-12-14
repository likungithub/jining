package com.xinhai.caiyun.systemmanager.api;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 基础参数设置实体类接口
 * 
 * @author wangshuo
 *
 */
@Service
public interface BasicsParmaterSettingService {

	List<BasicsParmaterSetting> finddayByDl(String dl, String remindCode);

	/**
	 * 通过代理机构编码查询所有信息
	 * 
	 * @param dl
	 *            代理机构编码
	 * @param lxdm
	 *            查询的是哪种提示信息
	 * @return list 信息列表
	 */
	List<BasicsParmaterSetting> findAllByDl(String dl, String lxdm);

	List<BasicsParmaterSetting> findByTaskOut(String dl, String remindCode);

	List<BasicsParmaterSetting> findByTaskExpiration(String dl,
                                                     String remindCode);

	List<BasicsParmaterSetting> findByOnTrial(String dl, String remindCode);

	int insertXx1(String dl, String taxpayerNumber);

	int insertXx2(String dl, String taxpayerNumber);

	int insertXx3(String dl, String taxpayerNumber);

	int insertXx4(String dl, String taxpayerNumber);

	int insertXx5(String dl, String taxpayerNumber);

	int insertXx6(String dl, String taxpayerNumber);

	void updateTaskOut(String taxbeforeday, String dl);

	void updateTaskExpiration(String taxbeforeday, String dl);

	void updateOnTrial(String taxbeforeday, String dl);

	void updateRemindDay1(String taxbeforeday, String dl);

	void updateRemindDay2(String paybeforeday, String dl);

	void updateRemindDay3(String afterpayday, String dl);

    void updateExpirecontract(String taxbeforeday, String dl);

	void updateOverduecontract(String taxbeforeday, String dl);
}
