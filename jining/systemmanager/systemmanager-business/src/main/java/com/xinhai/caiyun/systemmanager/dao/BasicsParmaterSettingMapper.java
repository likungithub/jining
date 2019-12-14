package com.xinhai.caiyun.systemmanager.dao;

import com.xinhai.caiyun.systemmanager.api.BasicsParmaterSetting;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 新手入门数据库映射,对应同名称的xml文件。
 * 
 * @author pc
 *
 */

public interface BasicsParmaterSettingMapper {

    List<BasicsParmaterSetting> finddayByDl(@Param(value = "dl") String dl,
                                            @Param(value = "remindCode") String remindCode);

    /**
     * 通过代理机构编码查询所有信息(100的)
     * 
     * @param dl
     *            代理机构编码
     * @return list 信息列表
     */
    List<BasicsParmaterSetting> findOneByDl(@Param(value = "dl") String dl);
    
    /**
     * 通过代理机构编码查询所有信息(200的)
     * 
     * @param dl
     *            代理机构编码
     * @return list 信息列表
     */
    List<BasicsParmaterSetting> findTwoByDl(@Param(value = "dl") String dl);
    
    /**
     * 通过代理机构编码查询所有信息(300的)
     * 
     * @param dl
     *            代理机构编码
     * @return list 信息列表
     */
    List<BasicsParmaterSetting> findThreeByDl(@Param(value = "dl") String dl);
    
    /**
     * 通过代理机构编码查询所有信息(所有的)
     * 
     * @param dl
     *            代理机构编码
     * @return list 信息列表
     */
    List<BasicsParmaterSetting> findAllByDl(@Param(value = "dl") String dl);

    void updateRemindDay1(@Param(value = "taxbeforeday") String taxbeforeday,
                          @Param(value = "dl") String dl);

    void updateRemindDay2(@Param(value = "paybeforeday") String paybeforeday,
                          @Param(value = "dl") String dl);

    void updateRemindDay3(@Param(value = "afterpayday") String afterpayday,
                          @Param(value = "dl") String dl);

    int insertXx1(@Param(value = "dl") String dl,
                  @Param(value = "taxpayerNumber") String taxpayerNumber);

    int insertXx2(@Param(value = "dl") String dl,
                  @Param(value = "taxpayerNumber") String taxpayerNumber);

    int insertXx3(@Param(value = "dl") String dl,
                  @Param(value = "taxpayerNumber") String taxpayerNumber);

	List<BasicsParmaterSetting> findByTaskOut(@Param("dl") String dl, @Param("remindCode") String remindCode);

	List<BasicsParmaterSetting> findByTaskExpiration(@Param("dl") String dl, @Param("remindCode") String remindCode);

	int insertXx4(@Param("dl") String dl, @Param("taxpayerNumber") String taxpayerNumber);

	int insertXx5(@Param("dl") String dl, @Param("taxpayerNumber") String taxpayerNumber);

	void updateTaskOut(@Param("taxbeforeday") String taxbeforeday, @Param("dl") String dl);

	void updateTaskExpiration(@Param("taxbeforeday") String taxbeforeday, @Param("dl") String dl);

	List<BasicsParmaterSetting> findByOnTrial(@Param("dl") String dl, @Param("remindCode") String remindCode);

	int insertXx6(@Param("dl") String dl, @Param("taxpayerNumber") String taxpayerNumber);

	void updateOnTrial(@Param("taxbeforeday") String taxbeforeday, @Param("dl") String dl);

    void updateExpirecontract(@Param("day") String taxbeforeday, @Param("dl") String dl);

    void updateOverduecontract(@Param("day") String taxbeforeday, @Param("dl") String dl);
    
    BasicsParmaterSetting findMessage(@Param("dl") String dl, @Param("TXLX") String TXLX);
}
