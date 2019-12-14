package com.xinhai.caiyun.customermanage.api;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;


/**
 * 合同接口
 * @author tangck
 *
 */
@Service
public interface ContractInfoService {

    /**
     * 获取合同列表数量（如果客户编码不为空，查询当前客户的所有合同，如果为空，查询当前职员所负责的客户的所有未审核合同）
     * @param dljgBm
     *              代理机构编码
     * @param zydm
     *              职员代码
     * @param khbm
     *              客户编码
     * @return
     *              返回合同列表数量
     */
    long searchContractListSize(String dljgBm, String zydm, String khbm);

    /**
     * 获取合同列表（如果客户编码不为空，查询当前客户的所有合同，如果为空，查询当前职员所负责的客户的所有未审核合同）
     * @param sta
     *              开始条数
     * @param len
     *              每页条数
     * @param dljgBm
     *              代理机构编码
     * @param zydm
     *              职员代码
     * @param khbm
     *              客户编码
     * @return
     *              返回合同列表list
     */
    List<ContractInfo> searchContractList(int sta, int len, String dljgBm, String zydm, String khbm);

    /**
     * 获取客户在所选日期内收费项目为*的合同
     * @param khbm
     *              客户编码
     * @param startDate
     *              服务开始时间
     * @param endDateDay
     *              服务结束时间
     * @param sfxm
     *              收费项目
     * @return
     *              返回合同列表
     */
    List<ContractInfo> checkDateHas(String khbm, Date startDate, Date endDateDay, String sfxm);

    /**
     * 根据合同编码获取合同
     * @param htbm
     *              合同编码
     * @return
     *              返回合同信息
     */
    ContractInfo findContractInfoByHtbm(String htbm);

    /**
     * 根据合同编号获取合同信息
     * @param id
     *          合同编号
     * @return
     *          返回合同对象
     */
    ContractInfo findContractInfoById(String id);

    /**
     * 增加合同信息
     * @param ci
     *          合同对象
     */
    void insertContractInfo(ContractInfo ci);

    /**
     * 修改合同
     * @param htbm
     *          合同编号
     * @param ci
     *          合同对象
     */
    void updateContractInfo(String htbm, ContractInfo ci);












    /**
     * 根据客户编号获取合同
     * @param id
     *          客户编号
     * @return
     *          返回合同对象
     */
    List<ContractInfo> findContractInfo(String id);

    List<ContractInfo> findContractInfoSHTG(String id);


    
    /**
     * 根据代理机构编码编号获取合同
     * @param dljgBm
     *          代理机构编码
     * @return
     *          返回合同对象
     */
    List<ContractInfo> findAllContract(String dljgBm);
    
    /**
     * 删除合同
     * @param ci 
     *          合同对象
     */
    void deleteContractInfo(ContractInfo ci);

    /**
     * 查询合同信息
     * @param startDate
     *          开始日期
     * @param endDate
     *          结束日期
     * @param status
     *          状态
     * @param khxx
     *          客户名
     * @param dljg 
     * @return
     *          返回合同对象
     */
    List<ContractInfo> searchContractInfo(Date startDate, Date endDate,
            String status, String khxx, String dljg, String zy);

    /**
     * 修改合同
     * @param htbm
     *          合同编号
     * @param ci
     *          合同对象
     */
    void updateContractInfoAdopt(String htbm, ContractInfo ci);

    /**
     * 修改合同按照list
     * @param ci
     *          合同对象
     * @param list
     *          合同编码list
     */
    void updateContractInfoAdoptList(ContractInfo ci, List<String> list);

    /**
     * 查询当前新增日期是否存在重叠
     * @param id 
     *              客户编码
     * @param startDate
     *              开始时间
     * @param endDate
     *              结束时间
     * @return
     *              返回list
     */
    long findContractDate(String id, Date startDate, Date endDate);

    /**
     * 更具年份以及客户编码查询合同
     * @param year
     *          年份
     * @param khbm
     *          客户编码
     * @param shzt_dm 
     *          审核状态代码
     * @return
     *          返回合同list
     */
    List<ContractInfo> findCharge(Date year, String khbm);



    /**
     * 查询所选客户在所选时间内是否存在合同
     * @param id
     *          客户编码
     * @param startDate
     *          开始时间
     * @param endDate
     *          结束时间
     * @return
     *          返回合同list
     */
    List<ContractInfo> checkDate(String id, Date startDate, Date endDate);

    /**
     * 修改续签状态
     * @param htbm
     *          合同编码
     */
    void updateXqzt(String htbm);

    /**
     * 查询出当前代理机构的所有的合同信息
     * @param dljgBm
     *              代理机构编码
     * @return
     *              返回合同数量
     */
    long findAllContractSize(String dljgBm);

    /**
     * 分页查询
     * @param start
     *              开始
     * @param length
     *              每页条数
     * @param dljgBm
     *              代理机构编码
     * @return
     *              返回合同信息list
     */
    List<ContractInfo> getContractByPage(int start, int length, String dljgBm);

    /**
     * 查询当前代理机构所有待续约的合同
     * @param dljgBm
     *              代理机构编码
     * @param now
     *              当前日期
     * @return
     */
    long findContinueContractSize(String dljgBm);

    /**
     * 分页查询所有待续签合同
     * @param start
     *              开始
     * @param length
     *              每页条数
     * @param dljgBm
     *              代理机构
     * @param now
     *              当前时间
     * @return
     *              返回合同列表
     */
    List<ContractInfo> getContinueContractByPage(int start, int length,
            String dljgBm);
    
    /**
     * 分页查询员工的待续签合同
     * @param start
     *              开始
     * @param length
     *              每页条数
     * @param dljgBm
     *              代理机构
     * @param zydm
     *              职员代码
     * @param days
     *              提前提醒天数
     * @param thisTime
     *              当前时间
     * @return
     *              返回合同列表
     */
    List<ContractInfo> getContinueContractByUser(int start, int length,
            String dljgBm, String zydm, int days, Date thisTime, int fwzt, int type);

    /**
     * 根据合同编码查询所有的客户编码
     * @param list
     * @return
     */
    List<ContractInfo> findKHBMGroupByHTBM(List<String> list);

    /**
     * 撤销合同
     * @param contract
     *          合同信息
     */
    void revokeContract(ContractInfo contract);

    /**
     * 获取当前职员负责的客户的合同列表
     * @param start
     *          开始条数
     * @param length
     *          每页条数
     * @param dljgBm
     *          代理机构编码
     * @param zydm
     *          职员代码
     * @return
     */
    List<ContractInfo> findContractListByMyself(int start, int length,
            String dljgBm, String zydm);

    /**
     * 获取当前职员所能看到的客户合同列表合同数量
     * @param khmc
     *          模糊查询客户名称
     * @param dl
     *          代理机构编码
     * @param zy
     *          职员代码
     * @param 	fwzt
     * 				服务状态代码
     * @param 	type
     * 				类别 1 全部 2 部门 3 个人
     * @return
     */
    long findMyContractSize(String khmc, String dl, String zy, Date startDate, Date endDate, String status, int fwzt, int type, String ifSearch);

    /**
     * 获取当前职员所能看到的客户合同列表
     * @param start
     *          开始条数
     * @param length
     *          每页条数
     * @param khmc
     *          模糊查询客户名称
     * @param dl
     *          代理机构编码
     * @param zy
     *          职员代码
     * @param 	fwzt
     * 				服务状态代码
     * @param 	type
     * 				类别 1 全部 2 部门 3 个人
     * @return
     */
    List<ContractInfo> findMyContractList(int start, int length,
            String khmc, String dl, String zy, Date startDate, Date endDate, String status, int fwzt, int type, String ifSearch);

    /**
     * 更新合同的收费金额
     * @param htbm
     *              合同编码
     * @param ysMoney
     *              收费金额
     */
    void updateMoney(String htbm, BigDecimal ysMoney);

    /**
     * 插入审批记录
     * @param datamap
     *              审批信息
     */
    void insertApprove(Map datamap);

    /**
     * 根据合同编码list查询出其id，
     * @param list
     *          合同编码list
     * @return
     *          返回合同编码对应的id
     */
    String getIDbyHTBM(List<String> list);

    /**
     * 根据合同编码获取合同审核状态
     * @param htbm
     *              合同编码
     * @return
     *              返回审核状态
     */
    String getHtShzt(String htbm);

    /**
     * 设置当前合同为变更中状态
     * @param htbm
     *              合同编码
     */
    void setBgz(String htbm, boolean zt);
}
