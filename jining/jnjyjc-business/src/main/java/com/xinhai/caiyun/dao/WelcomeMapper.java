package com.xinhai.caiyun.dao;

import com.xinhai.caiyun.bean.LoginLog;
import com.xinhai.caiyun.bean.PtKhtj;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 首页数据库连接接口
 * @author pusilin
 *
 */
public interface WelcomeMapper {
	
	/**
	 * 根据代理机构统计收费排名
	 * @param dljg_bm
	 * @return
	 */
	List<Map<String,String>> charge(String dljg_bm);

	/**
	 * 收费排名(收费数据为空时)
	 * @param dljg_bm
	 * @return
	 */
	List<Map<String,String>> chargeIsNull(String dljg_bm);
	
	
	/**
	 * 根据代理机构统计新增客户
	 * @param dljg_bm
	 * @return
	 */
	List<Map<String,Object>> newCountCustomer(String dljg_bm);
	
	/**
	 * 普通用户根据代理机构统计客户等级
	 * @param dljg_bm
	 * @return
	 */
	List<Map<String,Object>> customerGradeByDljgbm(String dljg_bm);
	
	/**
	 * 管理员用户统计全部客户等级
	 * @return
	 */
	List<Map<String,Object>> customerGradeByAdmin();


	/**
	 * 统计流失客户的数量
	 * @param dljgBm
	 * @return
	 */
	List<Map<String, Object>> lossCustomerList(String dljgBm);
	
	/**
	 * 获取该代理机构留存客户数量
	 * @param dljg_bm
	 * @return
	 */
	int getLCKhNum(String dljg_bm);

	/**
	 * 汇总统计
	 * @param tjlx  1 商机转换率  2 记账统计   3 报税统计
	 * @return
	 */
	List<PtKhtj> findHztj(@Param("zydm") String  zydm,@Param("tjlx") String  tjlx,@Param("dljgbm") String dljgbm);

	/**
	 * 记账列表
	 * @param zydm 职员代码
	 * @param dljgbm 代理机构编码
	 * @param pt 参数（公司名称，已记账还是未记账，年月）
	 * @return list
	 */
	List<PtKhtj> findJZList(@Param("zydm") String  zydm, @Param("dljgbm") String dljgbm, @Param("pt") PtKhtj pt);

	/**
	 * 报税列表
	 * @param zydm 职员代码
	 * @param dljgbm 代理机构编码
	 * @param pt 参数（公司名称，已记账还是未记账，年月）
	 * @return list
	 */
	List<PtKhtj> findBSList(@Param("zydm") String  zydm, @Param("dljgbm") String dljgbm, @Param("pt") PtKhtj pt);

	/**
	 * 首页三图表
	 * @param type 1,2代表实收和预收，3代表欠收
	 * @param dljgbm dljgbm
	 * @param firstStartDate 今年开始
	 * @param firstEndDate   今年结束
	 * @param lastStartDate  去年开始
	 * @param lastEndDate    去年结束
	 * @param bmdm  bmdm
	 * @return
	 */
	List<Map<String,Object>> threeDatas(@Param("type") String type, @Param("dljgbm") String dljgbm, @Param("firstStartDate") Date firstStartDate, @Param("firstEndDate") Date firstEndDate,
										@Param("lastStartDate") Date lastStartDate, @Param("lastEndDate") Date lastEndDate,@Param("bmdm") String bmdm, @Param("newDate") Date newDate);

	List<Map<String,Object>> getProfitOne(@Param("dljgbm") String dljgbm, @Param("firstStartDate") Date firstStartDate, @Param("firstEndDate") Date firstEndDate,
										@Param("lastStartDate") Date lastStartDate, @Param("lastEndDate") Date lastEndDate,@Param("bmdm") String bmdm);

	List<Map<String,Object>> getProfitTwo(@Param("dljgbm") String dljgbm, @Param("firstStartDate") Date firstStartDate, @Param("firstEndDate") Date firstEndDate,
										  @Param("lastStartDate") Date lastStartDate, @Param("lastEndDate") Date lastEndDate,@Param("bmdm") String bmdm);

	/**
	 * 地点+数目（代理）
	 * @return
	 */
	List<Map<String,Object>> getCustomerScreenData1();

	/**
	 * 地点+位置（代理）
	 * @return
	 */
	List<Map<String,Object>> getCustomerScreenData2();

	/**
	 * 地点+数目（客户）
	 * @return
	 */
	List<Map<String,Object>> getKhScreenData1();

	/**
	 * 地点+位置（客户）
	 * @return
	 */
	List<Map<String,Object>> getKhScreenData2();

	/**
	 * 查询最近7天的交易记录
	 * @param tomorrow
	 * @param before
	 * @Param type 1周 2月 3年
	 * @return
	 */
	List<Map<String,Object>> getBussinessData(@Param("tomorrow") Date tomorrow,@Param("before") Date before, @Param("type") String type);

	Map<String,Object> getSumBussinessData();

	/**
	 * 会计评价
	 * @return
	 */
	List<Map<String,Object>> getKJPJData();

	/**
	 * 企业规模
	 * @return
	 */
	List<Map<String,Object>> getQYGMData();

	/**
	 * 查询代理所在地数量
	 *
	 * @return
	 */
	List<Map<String,Object>> getCustomerLocData(@Param("type") String type);


	/**
	 * 最近15天代理和客户的新增情况
	 * @param tomorrow
	 * @param before
	 * @return
	 */
	List<Map<String,Object>> getaddCusAndKhData(@Param("tomorrow") Date tomorrow,@Param("before") Date before, @Param("type") String type);

	/**
	 * 手机登陆统计
	 * @param type
	 * @return
	 */
	List<Map<String,Object>> phoneDLData(@Param("tomorrow") Date tomorrow,@Param("before") Date before, @Param("type") String type);

	/**
	 * PC登陆及浏览统计
	 * @param tomorrow
	 * @param before
	 * @param type
	 * @return
	 */
	List<Map<String,Object>> PCDLData(@Param("tomorrow") Date tomorrow,@Param("before") Date before, @Param("type") String type);

	/**
	 * 手机登陆统计(详细类列表)
	 * @param type
	 * @return
	 */
	List<LoginLog> getAPPDLData(@Param("start") int start, @Param("length") int length, @Param("type") String type);

	/**
	 * 手机登陆统计数目(详细类列表)
	 * @param type
	 * @return
	 */
	Integer getAPPDLDataNum( @Param("type") String type);

	/**
	 * 客户总数
	 * @return
	 */
	Map<String,Object> getAllKhNum();

	/**
	 * 代理总数
	 * @return
	 */
	Map<String,Object> getAllDlNum();

}
