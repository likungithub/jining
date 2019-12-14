package com.xinhai.caiyun.customermanage.api;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 收费信息接口
 * @author tangck
 *
 */
@Service
public interface ChargeService {

	/**
	 * 根据条件查询收费台账数量（全部的合同数量）
	 * @param searchtxt
	 * 					模糊查询
	 * @param auditStatic
	 * 					审核状态
	 * @param chargeStatic
	 * 					收费状态
	 * @param chargeType
	 * 					收费项目
	 * @param chargeModel
	 * 					收费方式
	 * @param chargeMode
	 * 					收费模式
	 * @param dl
	 * 					代理机构编码
	 * @param zy
	 * 					职员代码
	 * @param khbm
	 * 					客户编码
	 * @param type
	 *					展示类型
	 * @param fwzt
	 * 					客户服务状态
	 * @return
	 * 					返回台账数量（合同数量）
	 */
	long findAllChargeSizeMore(String searchtxt, String auditStatic, String chargeStatic, String chargeType,
							   String chargeModel, String chargeMode, String dl,String zy, String khbm, String type,
							   int fwzt, String sfqd, String sfr, String khzg, String lx, String ifSearch);

	/**
	 * 根据条件查询收费台账列表（全部的合同列表）
	 * @param searchtxt
	 * 					模糊查询
	 * @param startInt
	 * 					开始条数
	 * @param lengthInt
	 * 					每页条数
	 * @param auditStatic
	 * 					审核状态
	 * @param chargeStatic
	 * 					收费状态
	 * @param chargeType
	 * 					收费项目
	 * @param chargeModel
	 * 					收费方式
	 * @param chargeMode
	 * 					收费模式
	 * @param dl
	 * 					代理机构编码
	 * @param zy
	 * 					职员代码
	 * @param khbm
	 * 					客户编码
	 * @param type
	 *					展示类型
	 * @param fwzt
	 * 					客户服务状态
	 * @return
	 * 					返回台账列表（合同列表）
	 */
	List<Charge> findAllChargeList(String searchtxt, int startInt, int lengthInt, String auditStatic, String chargeStatic,
								   String chargeType, String chargeModel, String chargeMode, String dl,String zy,
								   String khbm, String type, int fwzt, String sfqd, String sfr, String khzg, String lx, String ifSearch);

	/**
	 * 根据条件查询收费台账数量（个人的合同数量）
	 * @param searchtxt
	 * 					模糊查询
	 * @param auditStatic
	 * 					审核状态
	 * @param chargeStatic
	 * 					收费状态
	 * @param chargeType
	 * 					收费项目
	 * @param chargeModel
	 * 					收费方式
	 * @param chargeMode
	 * 					收费模式
	 * @param dl
	 * 					代理机构编码
	 * @param zy
	 * 					职员代码
	 * @param khbm
	 * 					客户编码
	 * @param type
	 *					展示类型
	 * @param fwzt
	 * 					客户服务状态
	 * @return
	 * 					返回台账数量（合同数量）
	 */
	long findGrChargeSizeMore(String searchtxt, String auditStatic, String chargeStatic, String chargeType,
							   String chargeModel, String chargeMode, String dl,String zy, String khbm, String type,
							   int fwzt, String sfqd, String sfr, String khzg);

	/**
	 * 根据条件查询收费台账列表（个人的合同列表）
	 * @param searchtxt
	 * 					模糊查询
	 * @param startInt
	 * 					开始条数
	 * @param lengthInt
	 * 					每页条数
	 * @param auditStatic
	 * 					审核状态
	 * @param chargeStatic
	 * 					收费状态
	 * @param chargeType
	 * 					收费项目
	 * @param chargeModel
	 * 					收费方式
	 * @param chargeMode
	 * 					收费模式
	 * @param dl
	 * 					代理机构编码
	 * @param zy
	 * 					职员代码
	 * @param khbm
	 * 					客户编码
	 * @param type
	 *					展示类型
	 * @param fwzt
	 * 					客户服务状态
	 * @return
	 * 					返回台账列表（合同列表）
	 */
	List<Charge> findGrChargeList(String searchtxt, int startInt, int lengthInt, String auditStatic, String chargeStatic,
								   String chargeType, String chargeModel, String chargeMode, String dl,String zy,
								   String khbm, String type, int fwzt, String sfqd, String sfr, String khzg);

	/**
	 * 根据条件查询收费台账数量（部门的合同数量）
	 * @param searchtxt
	 * 					模糊查询
	 * @param auditStatic
	 * 					审核状态
	 * @param chargeStatic
	 * 					收费状态
	 * @param chargeType
	 * 					收费项目
	 * @param chargeModel
	 * 					收费方式
	 * @param chargeMode
	 * 					收费模式
	 * @param dl
	 * 					代理机构编码
	 * @param Bmdm
	 * 					部门代码
	 * @param khbm
	 * 					客户编码
	 * @param type
	 *					展示类型
	 * @param fwzt
	 * 					客户服务状态
	 * @return
	 * 					返回台账数量（合同数量）
	 */
	long findBmChargeSizeMore(String searchtxt, String auditStatic, String chargeStatic, String chargeType,
							String chargeModel, String chargeMode, String dl,String Bmdm, String khbm, String type,
							int fwzt, String sfqd, String sfr, String khzg);

	/**
	 * 根据条件查询收费台账列表（部门的合同列表）
	 * @param searchtxt
	 * 					模糊查询
	 * @param startInt
	 * 					开始条数
	 * @param lengthInt
	 * 					每页条数
	 * @param auditStatic
	 * 					审核状态
	 * @param chargeStatic
	 * 					收费状态
	 * @param chargeType
	 * 					收费项目
	 * @param chargeModel
	 * 					收费方式
	 * @param chargeMode
	 * 					收费模式
	 * @param dl
	 * 					代理机构编码
	 * @param Bmdm
	 * 					部门代码
	 * @param khbm
	 * 					客户编码
	 * @param type
	 *					展示类型
	 * @param fwzt
	 * 					客户服务状态
	 * @return
	 * 					返回台账列表（合同列表）
	 */
	List<Charge> findBmChargeList(String searchtxt, int startInt, int lengthInt, String auditStatic, String chargeStatic,
								  String chargeType, String chargeModel, String chargeMode, String dl,String Bmdm,
								  String khbm, String type, int fwzt, String sfqd, String sfr, String khzg);

	/**
	 * 根据条件获取收费订单列表
	 * @param htbm
	 *             合同编码
	 * @param audit
	 *             审核状态
	 * @param charge
	 *             收费状态
	 * @return
	 * 				返回收费台账详细列表
	 */
	List<Charge> searchChargeListByHtbm(String htbm, String audit, String charge, String sfqd, String sfr);

	/**
	 * 修改实收金额
	 * @param id
	 *          收费订单编号
	 * @param realMoney
	 *          实际收费金额
	 */
	void updateRealMoney(String id, BigDecimal realMoney, BigDecimal yhMoney, BigDecimal ysMoney);

	/**
	 * 获取当前选中的收费的总金额
	 * @param htbm
	 * 				合同编码
	 * @return
	 * 				返回合同总金额
	 */
	BigDecimal getMoney(String htbm);

	/**
	 * 修改优惠金额
	 * @param id
	 * 			收费编号
	 * @param yhMoney
	 * 			优惠金额
	 */
	void updateyhMoney(String id, BigDecimal yhMoney, BigDecimal ssMoney);

	/**
	 * 修改应收实收金额
	 * @param oldcharge
	 * 				收费信息
	 */
	void updateMoney(Charge oldcharge);

	/**
	 * 新增收费记录
	 * @param charge
	 *          收费记录
	 */
	void insertCharge(Charge charge);

	/**
	 * 删除收费信息
	 * @param charge
	 *          收费信息
	 */
	void deleteCharge(Charge charge);

	/**
	 * 根据idlist查询收费订单
	 * @param list
	 *              id
	 * @return
	 * 				返回收费台账列表
	 */
	List<Charge> findChargeByList(List<String> list);

	/**
	 * 修改收费提醒次数
	 * @param ddbh
	 *          订单编号
	 */
	void updateOrderReminderTime(String ddbh);

	/**
	 * 更新订单编号
	 * @param list
	 *          订单编号
	 * @param orderNumber
	 *          订单编号
	 */
	void updateOrderNumber(List<String> list, String orderNumber);

	/**
	 * 插入收费汇总订单
	 * @param datamap
	 *          订单信息
	 */
	void insertOrder(Map<String, Object> datamap);

	/**
	 * 收费提醒记录
	 * @param datamap
	 *             信息
	 */
	void reminderRecord(Map<String, Object> datamap);

	/**
	 * 获取当前代理机构的支付方式
	 * @param dl
	 *          代理机构编码
	 * @return
	 * 			返回支付渠道列表
	 */
	List<Map<String, Object>> getPayType(String dl);

	/**
	 * 获取当前代理机构的支付方式
	 * @param dl
	 *          代理机构编码
	 * @return
	 * 			返回支付渠道列表
	 */
	List<Map<String, Object>> getPayTypeAll(String dl);

	/**
	 * 提交收费审核
	 * @param list
	 *          收费订单id
	 * @param charge
	 *          订单信息
	 */
	void sendChargeAudit(List<String> list, Charge charge);

	/**
	 * 根据订单编号删除订单
	 * @param ddbh
	 * 				订单编号
	 * @param dl
	 * 				代理机构编码
	 */
	void deleteOrder(String ddbh, String dl);

	/**
	 * 发送消息提醒
	 * @param dataMap
	 * 				消息内容
	 */
	void sendAuditMessage(Map<String, Object> dataMap);

	/**
	 * 根据编号获取收费信息
	 * @param id
	 *          收费信息编码
	 * @return
	 *          返回收费信息
	 */
	Charge findChargeInfo(String id);

	/**
	 * 修改台账为坏账
	 * @param idList
	 * 				收费台账id
	 * @param lrrq
	 * 				录入日期
	 */
	void badebts(List<String> idList, Date lrrq);

	/**
	 * 获取收费附件列表
	 * @param ddbh
	 *          订单编号
	 * @return
	 * 			返回附件列表
	 */
	List<Map<String, Object>> findChargeFileList(String ddbh);

	/**
	 * 根据id获取收费附件
	 * @param id
	 *          主键id
	 * @return
	 * 			返回存储路径
	 */
	String findChargeFileById(String id);

	/**
	 * 删除收费附件
	 * @param dataMap
	 *          附件信息
	 */
	void deleteChargeFile(Map<String, Object> dataMap);

	/**
	 * 上传附件
	 * @param dataMap
	 *              附件信息
	 */
	void insertChargeFile(Map<String, Object> dataMap);

	/**
	 * 查询收费审核订单数量（全部的）
	 * @param searchtxt
	 * 				模糊查询
	 * @param auditStatic
	 * 				审核状态
	 * @param chargeStatic
	 * 				收费状态
	 * @param chargeType
	 * 				收费项目
	 * @param chargeModel
	 * 				收费方式
	 * @param chargeMode
	 * 				收费模式
	 * @param dl
	 * 				代理机构编码
	 * @param zy
	 * 				职员代码
	 * @param fwzt
	 * 				客户服务状态
	 * @return
	 * 				返回收费审核列表数量
	 */
	long findAllOrderSizeMore(String searchtxt, String auditStatic, String chargeStatic,
							  String chargeType, String chargeModel, String chargeMode,
							  String dl, String zy, int fwzt, String sfqd, String sfr, String khzg, String lx, String ifSearch);

	/**
	 * 查询收费审核台账列表（全部的）
	 * @param searchtxt
	 * 				模糊查询
	 * @param startInt
	 * 				开始条数
	 * @param lengthInt
	 * 				每页条数
	 * @param auditStatic
	 * 				审核状态
	 * @param chargeStatic
	 * 				收费状态
	 * @param chargeType
	 * 				收费项目
	 * @param chargeModel
	 * 				收费方式
	 * @param chargeMode
	 * 				收费模式
	 * @param dl
	 * 				代理机构编码
	 * @param zy
	 * 				职员代码
	 * @param fwzt
	 * 				服务状态
	 * @return
	 * 				返回收费审核台账列表
	 */
	List<Charge> findAllOrderList(String searchtxt, int startInt, int lengthInt, String auditStatic,
								  String chargeStatic, String chargeType, String chargeModel, String chargeMode,
								  String dl, String zy, int fwzt, String sfqd, String sfr, String khzg, String lx, String ifSearch);

	/**
	 * 查询收费审核订单数量（部门的）
	 * @param searchtxt
	 * 				模糊查询
	 * @param auditStatic
	 * 				审核状态
	 * @param chargeStatic
	 * 				收费状态
	 * @param chargeType
	 * 				收费项目
	 * @param chargeModel
	 * 				收费方式
	 * @param chargeMode
	 * 				收费模式
	 * @param dl
	 * 				代理机构编码
	 * @param zy
	 * 				职员代码
	 * @param fwzt
	 * 				客户服务状态
	 * @return
	 * 				返回收费审核列表数量
	 */
	long findBmOrderSizeMore(String searchtxt, String auditStatic, String chargeStatic,
							  String chargeType, String chargeModel, String chargeMode,
							  String dl, String bmdm, int fwzt, String sfqd, String sfr, String khzg);

	/**
	 * 查询收费审核台账列表（部门的）
	 * @param searchtxt
	 * 				模糊查询
	 * @param startInt
	 * 				开始条数
	 * @param lengthInt
	 * 				每页条数
	 * @param auditStatic
	 * 				审核状态
	 * @param chargeStatic
	 * 				收费状态
	 * @param chargeType
	 * 				收费项目
	 * @param chargeModel
	 * 				收费方式
	 * @param chargeMode
	 * 				收费模式
	 * @param dl
	 * 				代理机构编码
	 * @param zy
	 * 				职员代码
	 * @param fwzt
	 * 				服务状态
	 * @return
	 * 				返回收费审核台账列表
	 */
	List<Charge> findBmOrderList(String searchtxt, int startInt, int lengthInt, String auditStatic,
								  String chargeStatic, String chargeType, String chargeModel, String chargeMode,
								  String dl, String bmdm, int fwzt, String sfqd, String sfr, String khzg);

	/**
	 * 查询收费审核订单数量（个人的）
	 * @param searchtxt
	 * 				模糊查询
	 * @param auditStatic
	 * 				审核状态
	 * @param chargeStatic
	 * 				收费状态
	 * @param chargeType
	 * 				收费项目
	 * @param chargeModel
	 * 				收费方式
	 * @param chargeMode
	 * 				收费模式
	 * @param dl
	 * 				代理机构编码
	 * @param zy
	 * 				职员代码
	 * @param fwzt
	 * 				客户服务状态
	 * @return
	 * 				返回收费审核列表数量
	 */
	long findGrOrderSizeMore(String searchtxt, String auditStatic, String chargeStatic,
							  String chargeType, String chargeModel, String chargeMode,
							  String dl, String zy, int fwzt, String sfqd, String sfr, String khzg);

	/**
	 * 查询收费审核台账列表（个人的）
	 * @param searchtxt
	 * 				模糊查询
	 * @param startInt
	 * 				开始条数
	 * @param lengthInt
	 * 				每页条数
	 * @param auditStatic
	 * 				审核状态
	 * @param chargeStatic
	 * 				收费状态
	 * @param chargeType
	 * 				收费项目
	 * @param chargeModel
	 * 				收费方式
	 * @param chargeMode
	 * 				收费模式
	 * @param dl
	 * 				代理机构编码
	 * @param zy
	 * 				职员代码
	 * @param fwzt
	 * 				服务状态
	 * @return
	 * 				返回收费审核台账列表
	 */
	List<Charge> findGrOrderList(String searchtxt, int startInt, int lengthInt, String auditStatic,
								  String chargeStatic, String chargeType, String chargeModel, String chargeMode,
								  String dl, String zy, int fwzt, String sfqd, String sfr, String khzg);

	/**
	 * 更新收费审核状态
	 * @param list
	 *          收费编号
	 * @param charge
	 *          收费信息
	 */
	void updateAudit(List<String> list, Charge charge);

	/**
	 * 获取收据数量
	 * @param khmc
	 * 				客户名称
	 * @param sDate
	 * 				开始时间
	 * @param eDate
	 * 				结束时间
	 * @param dl
	 * 				代理机构编码
	 * @param zy
	 * 				职员代码
	 * @param 	fwzt
	 * 				服务状态代码
	 * @param 	type
	 * 				类别 1 全部 2 部门 3 个人
	 * @return
	 * 				返回收据总数量
	 */
	long findReceiptSize(String khmc, Date sDate, Date eDate, String dl, String zy, int fwzt, int type, String ifSearch);

	/**
	 * 获取收据列表
	 * @param startInt
	 * 					开始条数
	 * @param lengthInt
	 * 					每页条数
	 * @param khmc
	 * 					客户名称
	 * @param sDate
	 * 					开始时间
	 * @param eDate
	 * 					结束时间
	 * @param dl
	 * 					代理机构编码
	 * @param zy
	 * 					职员代码
	 * @param 	fwzt
	 * 				服务状态代码
	 * @param 	type
	 * 				类别 1 全部 2 部门 3 个人
	 * @return
	 * 					返回收据列表
	 */
	List<Map<String, Object>> findReceiptList(int startInt, int lengthInt, String khmc, Date sDate, Date eDate, String dl, String zy, int fwzt, int type, String ifSearch);






















	/**
	 * 查询所选中的收费订单是否已存在收费提醒
	 * @param list
	 *          收费id list
	 * @return
	 * 			返回收费台账列表
	 */
	List<Charge> findChargeReminder(List<String> list);

    /**
     * 查询所有收费信息
     * @param startDate
     *              开始时间
     * @param endDate
     *              结束时间
     * @param status
     *              审核状态
     * @param khxx
     *              客户信息
     * @param dljg
     *              代理机构编码
     * @return
     *              返回收费信息
     */
    List<Charge> findAllCharge(Date startDate, Date endDate, String status,
            String khxx, String dljg);

	/**
	 * 撤销收费审核
	 * @param charge
	 *          收费信息
	 */
	void revokeOrder(Charge charge);


















    /**
     * 审核收费
     * @param charge
     *              收费对象
     * @param list 
     */
    void auditCharge(Charge charge, List<Map<String, String>> list);


    /**
     * 根据合同编码查询收费记录
     * @param htbm
     *          合同编码
     * @return
     *          返回收费记录条数
     */
    long findChargeByHtbm(String htbm);
    /**
     * 根据代理机构编码查到收费记录（分三条）
     * @param dl
     *          代理机构编码
     * @param end 
     * @param begin 
     * @return  收费集合
     * 
     */

	List<Map<String, String>> searchByAuditMark(String dl, String begin, String end);
	 /**
     * 根据代理机构编码查到收费户数
     * @param dl
     *          代理机构编码
	 * @param end 
	 * @param begin 
     * @return  户数集合
     * 
     */
	List<Map<String, String>> searchByTollNumber(String dl, String begin, String end);
	/**
	 * 根据代理机构编码查到本月的收费户数
	 * @param dl
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String, Object>> searchBySituation(String dl, String begin,String end);
	/**
	 * 根据代理机构编码查到本月的已审核同意收费金额
	 * @param dl
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String, Object>> searchByFeeAmount(String dl, String begin,
			String end);

	/**
	 * 根据合同编码查询收费信息
	 * @param htbm
	 *             合同编码
	 * @return
	 *             返回收费信息列表
	 */
    List<Charge> findChargeListByHtbm(String htbm);

    /**
     * 根据收费编号查询收费信息
     * @param list
     *          收费编号列表
     * @return
     */
    List<Charge> findChargeListById(List<Map<String, String>> list);

    /**
     * 修改单个的收费信息
     * @param id
     *          收费编号
     * @param charge
     *          收费信息
     */
    void auditChargeById(String id, Charge charge);

    /**
     * 获取当前代理机构最大的收据编码
     * @param dljgBm
     *          代理机构编码
     * @return
     */
    String findMaxSJBM(String dljgBm);

    /**
	 * 根据代理机构编码查到本月的收费户数
	 * @param dl
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String, Object>> searchBySituationByYear(String dl, String begin,
			String end);

	/**
	 * 根据代理机构编码查到本月的已审核同意收费金额
	 * @param dl
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String, Object>> searchByFeeAmountByYear(String dl, String begin,
			String end);

	/**
	 * 根据收据编码和合同编码查询收费信息
	 * @param ddbh
	 *             订单编号
	 * @return
	 */
	Map<String, String> findChargeInfoBySJBMAndHTBM(String ddbh);

    /**
     * 自动生成收费订单
     * @param dataMap
     *          订单信息
     */
    void insertChargeByProcedures(Map<String, Object> dataMap);

    /**
     * 查询出所有的收费订单汇总       
     * @return
     */
    Map<String,String> findAllChargeInfo(String dl,String zy, String khbm);

    /**
     * 查询该合同编码下的收费订单中所有状态不为未审核的订单数量
     * @param htbm
     *          合同编码   
     * @return
     *          返回订单数量
     */
    long findChargeSizeIsBeUse(String htbm);

    /**
     * 根据合同编码删除收费订单
     * @param charge
     *          收费信息
     */
    void deleteChargeByHtbm(Charge charge);
	/**
	 * 代理按部门查询欠费户数
     * @param agencyCode
     * @param begin
     * @param end @return
     * @param zy
     */
	List<Map<String,Object>> arrearsStatisticByDepartmentsMember(String agencyCode, String begin, String end, String zy);

	/**
	 * 代理按部门查询欠费金额
	 * @param agencyCode
	 * @param begin
	 * @param end
	 * @param zy
     * @return
	 */
	List<Map<String,Object>> arrearsStatisticByDepartmentsMoney(String agencyCode, String begin, String end, String zy);

	/**
	 * 近7天欠费金额统计
	 * @param agencyCode
	 * @param begin
	 * @param end
	 * @param zy
     * @return
	 */
	List<Map<String,Object>> arrearsStatisticMoneyByTime(String agencyCode, String begin, String end, String zy);

	/**
	 * 近7天欠费户数统计
	 * @param agencyCode
	 * @param begin
	 * @param end
	 * @param zy
	 * @return
	 */
	List<Map<String,Object>> arrearsStatisticMumberByTime(String agencyCode, String begin, String end, String zy);

	/**
	 * 欠费户客户收费项目占比情况
	 * @param begin
	 * @param end
	 * @param agencyCode
	 * @param zy
     * @return
	 */
	List<Map<String,Object>> arrearsStatisticByProject(String begin, String end, String agencyCode, String zy);

	/**
	 * 今日收费项目总数
	 * @param begin
	 * @param end
	 * @param agencyCode
	 * @param zy
	 * @return
	 */
	int findAllProject(String begin, String end, String agencyCode, String zy);

	/**
	 * 今日欠费客户收费方式占比情况
	 * @param begin
	 * @param end
	 * @param agencyCode
	 * @param zy
	 * @return
	 */
	List<Map<String,Object>> arrearsStatisticByType(String begin, String end, String agencyCode, String zy);

	/**
	 * 查询今日所有的欠费客户收费方式的总数
	 * @param begin
	 * @param end
	 * @param agencyCode
	 * @param zy
	 * @return
	 */
    int findAllType(String begin, String end, String agencyCode, String zy);

    long findAllChargeByAgency(String searchtxt, String auditStatic, String begin, String end, String dl, String zy, int startInt, int lengthInt);

    List<Charge> findAllChargeByAgencyList(String searchtxt, String auditStatic, String begin, String end, String dl, String zy, int startInt, int lengthInt);

	/**
	 * 收费状态户数占比情况
	 * @param 
	 * @return
	 */
	List<Map<String,Object>> chargeAuditByMumberCount(String dl, String zy, String begin, String end);

	/**
	 *
	 * @param dl
	 * @param zy
	 * @param begin
	 * @param end
	 * @return
	 */
	int searchAllchargeAuditByMumberCount(String dl, String zy, String begin, String end);

	/**
	 *
	 * @param dl
	 * @param zy
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String,Object>> chargeStatMemberCount(String dl, String zy, String begin, String end);

	/**
	 *
	 * @param dl
	 * @param zy
	 * @param begin
	 * @param end
	 * @return
	 */
	int searchAllchargeStatMemberCount(String dl, String zy, String begin, String end);

	/**
	 *
	 * @param dl
	 * @param zy
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String,Object>> alreadyCharge(String dl, String zy, String begin, String end);

	/**
	 *
	 * @param dl
	 * @param zy
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String,Object>> noCharge(String dl, String zy, String begin, String end);

	/**
	 *
	 * @param dl
	 * @param zy
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String,Object>> arrearsCharge(String dl, String zy, String begin, String end);

	/**
	 *
	 * @param dl
	 * @param zy
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String,Object>> remindFee(String dl, String zy, String begin, String end);

	/**
	 *
	 * @param dl
	 * @param zy
	 * @param begin
	 *@param end @return
	 */
	List<Map<String,Object>> rankingByDepartment(String dl, String zy, String begin, String end);

	/**
	 *
	 * @param dl
	 * @param zy
	 * @param begin
	 *@param end @return
	 */
	List<Map<String,Object>> auditedByDepartment(String dl, String zy, String begin, String end);

	/**
	 *
	 * @param dl
	 * @param zy
	 * @param begin
	 *@param end @return
	 */
	List<Map<String,Object>> arrearsByDepartment(String dl, String zy, String begin, String end);

	/**
	 * 收费统计查询数据条数
     * @param searchtxt
     * @param auditStatic
     * @param chargeStatic
     * @param chargeType
     * @param chargeModel
     * @param chargeMode
     * @param dl
     * @param zy
     * @param sflx
     * @param department
     * @param employee
     * @param fwqq
     * @param fwqz
     * @param fwzt
     * @param chargeAccount
     * @param chargePeople @return
     * @param chargeStartTime
     * @param chargeEndTime
     * @param khjl
     */
    long findAllChargeSizeMoreByws(String searchtxt, String auditStatic, String chargeStatic, String chargeType, String chargeModel, String chargeMode, String dl, String zy, String sflx, String department, String employee, String fwqq, String fwqz, String now, String fwzt, String chargeAccount, String chargePeople, String chargeStartTime, String chargeEndTime, String khjl);

	/**
	 * 收费统计查询
	 * @param searchtxt
	 * @param startInt
	 * @param lengthInt
	 * @param auditStatic
	 * @param chargeStatic
	 * @param chargeType
	 * @param chargeModel
	 * @param chargeMode
	 * @param dl
	 * @param zy
	 * @param sflx
	 * @param department
	 * @param employee
	 * @param fwqq
	 * @param fwqz
	 * @param fwzt
	 * @param chargeAccount
	 * @param chargePeople @return
	 * @param chargeStartTime
	 * @param chargeEndTime
	 * @param khjl
	 */
	List<Charge> findAllChargeListByws(String searchtxt, int startInt, int lengthInt, String auditStatic, String chargeStatic, String chargeType, String chargeModel, String chargeMode, String dl, String zy, String sflx, String department, String employee, String fwqq, String fwqz, String now, String fwzt, String chargeAccount, String chargePeople, String chargeStartTime, String chargeEndTime, String khjl);

	/**
	 * 查询收费列表
     * @param htbm
     * @param audit
     * @param charges
     * @param chargespro
     * @param chargeTy
     * @param chargeMod
     * @param department
     * @param employee
     * @param startTime
     * @param endTime
     * @param chargews
     * @param now
     * @param fwzt
     * @param chargeAccount
     * @param chargePeople @return
     * @param chargeStartTime
     * @param chargeEndTime
     */
	List<Charge> searchChargeListByHtbmByws(String htbm, String audit, String charges, String chargespro, String chargeTy, String chargeMod, String department, String employee, String startTime, String endTime, String chargews, String now, String fwzt, String chargeAccount, String chargePeople, String chargeStartTime, String chargeEndTime);


	List<Charge> findChargeByDDBH(String ddbh);


	void updateCharge(Charge nullcharge, List<String> list);

    /**
     * @param ddbh
     * @return
     */
	List<Map<String,String>> findsfsm(String ddbh);

	
	/**
	 * ****************************************************************
	 * ****************************************************************
	 * 以下为整理
	 * ****************************************************************
	 * ****************************************************************
	 */
	
	
	
	

    /**
     * 收费统计未收费统计
     * @param dl
     * @param zy
     * @param begin
     * @param end
     * @return
     */
    List<Map<String,Object>> noChargeByYear(String dl, String zy, String begin, String end);

    /**
     * 收费统计欠费统计
     * @param dl
     * @param zy
     * @param begin
     * @param end
     * @return
     */
    List<Map<String,Object>> arrearsChargeByYear(String dl, String zy, String begin, String end);

    /**
     * 收费统计催费统计
     * @param dl
     * @param zy
     * @param begin
     * @param end
     * @return
     */
    List<Map<String,Object>> remindFeeByYear(String dl, String zy, String begin, String end);

    /**
     * 收费统计已收费统计
     * @param dl
     * @param zy
     * @param begin
     * @param end
     * @return
     */
    List<Map<String,Object>> alreadyChargeByYear(String dl, String zy, String begin, String end);

	long findAllChargeSizeMoreBywsByaa(String dl, String zy, String khbm, String startTime, String endTime);

	List<Charge> findAllChargeListBywsByaa(int startInt, int lengthInt, String dl, String zy, String khbm, String startTime, String endTime);

	/**
	 * 获取收费信息并下载
	 * @param searchMap
	 * 				查询条件
	 * @return
	 */
    List<Charge> findAllChargeListDown(Map searchMap);

	/**
	 * 获取收费信息并下载
	 * @param searchMap
	 * @return
	 */
	List<Charge> findAllChargeListDownWs(Map searchMap);

	/**
	 * 查询时间段内的已到款的sum
	 * @param dl
	 * @param zy
	 * @param begin
	 * @param end
	 * @return
	 */
    List<Map<String,Object>> yidaokuan(String dl, String zy, String begin, String end);

	/**
	 * 收费统计图表查询已到账
	 * @param dl
	 * @param zy
	 * @param begin
	 * @param end
	 * @return
	 */

	List<Map<String,Object>> yidaokuanByYear(String dl, String zy, String begin, String end);

	/**
	 * 导出台账
	 * @param searchMap
	 * @return
	 */
    List<Charge> findAllChargeListBywsByaaDown(Map searchMap);

	/**
	 * 统计时间段内坏账的金额
	 * @param dl
	 * @param zy
	 * @param begin
	 * @param end
	 * @return
	 */
    List<Map<String,Object>> huaizhang(String dl, String zy, String begin, String end);

	/**
	 * 统计一年内坏账的金额
	 * @param dl
	 * @param zy
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String,Object>> huaizhangByYear(String dl, String zy, String begin, String end);

	/**
	 * 欠费统计导出
	 * @param searchMap
	 * @return
	 */
    List<Charge> findAllChargeListDownByArreal(Map searchMap);

    List<Map<String,Object>> alreadyChargeByDay(String dl, String zy, String begin, String end);

	List<Map<String,Object>> noChargeByDay(String dl, String zy, String begin, String end);

	List<Map<String,Object>> arrearsChargeByDay(String dl, String zy, String begin, String end);

	List<Map<String,Object>> remindFeeByDay(String dl, String zy, String begin, String end);

	List<Map<String,Object>> yidaokuanByDay(String dl, String zy, String begin, String end);

	List<Map<String,Object>> huaizhangByDay(String dl, String zy, String begin, String end);

	List<Map<String,Object>> arrearsStatisticMoneyByTimeByDay(String agencyCode, String begin, String end, String zy);

	List<Map<String,Object>> arrearsStatisticMoneyByTimeByYear(String agencyCode, String begin, String end, String zy);

	List<Map<String,Object>> arrearsStatisticMumberByTimeByDay(String agencyCode, String begin, String end, String zy);

	List<Map<String,Object>> arrearsStatisticMumberByTimeByYear(String agencyCode, String begin, String end, String zy);

	/**
	 * 更新客户订单信息
	 * @param datamap
	 * 				订单数据
	 */
    void upDateKhDdxx(Map datamap);
    
    /**
     * 获取业务类型
     * @param dljgbm
     * @param sfxmdm
     * @return
     */
    Map<String, String> getYwlx(String dljgbm,String sfxmdm);

    List<Map<String,Object>> alreadyChargeNew(String dl, String zy, String startTime, String endTime);

	List<Map<String,Object>> noChargeNew(String dl, String zy, String startTime, String endTime);

	List<Map<String,Object>> reminChargeNew(String dl, String zy, String startTime, String endTime);

	List<Map<String,Object>> arrearsChargeNew(String dl, String zy, String startTime, String endTime);

	List<Map<String,Object>> yidaokuanNew(String dl, String zy, String startTime, String endTime);

	List<Map<String,Object>> huaizhangNew(String dl, String zy, String startTime, String endTime);

	List<Map<String,Object>> arrearsStatisticMumberByTimeByDayNew(String agencyCode, String startTime, String endTime, String zy);

	long findAllChargeSizeMoreArrears(String searchtxt, String auditStatic, String chargeStatic, String chargeType, String chargeModel, String chargeMode, String dl, String zy, String khbm, String type, int fwztCode, String sfqd, String sfr, String khzg, String khjl);

	List<Charge> findAllChargeListArrears(String searchtxt, int startInt, int lengthInt, String auditStatic, String chargeStatic, String chargeType, String chargeModel, String chargeMode, String dl, String zy, String khbm, String type, int fwztCode, String sfqd, String sfr, String khzg, String khjl);

	/**
	 * 获取收费台账主行（消息提醒用）
	 * @param glbm
	 * 				关联编码（订单编号）
	 * @param dljgbm
	 * 			代理机构编码
	 * @return
	 */
    Charge getMainCharge(String glbm, String dljgbm);

	/**
	 * 获取子行收费台账（消息提醒用）
	 * @param glbm
	 * 			关联编码
	 * @param dljgBm
	 * 			代理机构编码
	 * @return
	 */
	List<Charge> getChildCharge(String glbm, String dljgBm);

	/**
	 * 获取收费信息
	 * @param htbm
	 * 				合同编码
	 * @return
	 * 				返回收费信息
	 */
    List<Charge> getChargeInfo(String htbm);

	/**
	 * 根据合同编码查询收费订单编号
	 * @param htbm
	 * 				合同编码
	 * @return
	 * 				返回带有收费订单的收费信息
	 */
	List<Charge> findChargeOrder(String htbm);

	/**
	 * 更具关联编码获取收费附件数量
	 * @param glbm
	 * @return
	 */
    long findChargeFileSize(String glbm);
}