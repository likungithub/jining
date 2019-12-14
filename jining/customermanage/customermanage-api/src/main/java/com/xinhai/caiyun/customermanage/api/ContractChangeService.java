package com.xinhai.caiyun.customermanage.api;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2018/4/11 0011.
 */
@Service
public interface ContractChangeService {

    /**
     * 保存合同变更
     * @param contractChange
     *              合同变更信息
     */
    void saveChange(ContractChange contractChange);

    /**
     * 获取合同变更数量
     * @param status
     *              审核状态
     * @param khxx
     *              客户信息
     * @param dljgBm
     *              代理机构编码
     * @return
     *              返回变更数量
     */
    long getContractChangeSize(String status, String khxx, String dljgBm, String zydm, String lx, int fwzt, String ifSearch);

    /**
     * 获取合同变更列表
     * @param start
     *              开始长度
     * @param length
     *              每页条数
     * @param status
     *              审核状态
     * @param khxx
     *              客户信息
     * @param dljgBm
     *              代理机构编码
     * @return
     *              返回合同变更列表
     */
    List<ContractChange> getContractChangeList(int start, int length, String status, String khxx, String dljgBm,
                                               String zydm, String lx, int fwzt, String ifSearch);

    /**
     * 更具变更id获取变更信息
     * @param bgid
     *              变更id
     * @return
     *              返回变更信息
     */
    ContractChange findContractChange(String bgid);

    /**
     * 更新审核状态
     * @param contractChange
     *              合同变更信息
     */
    void updateContractChange(ContractChange contractChange);

    /**
     * 变更合同以及收费相关信息
     * @param bgid
     *              变更id
     */
    void updateContractAndChange(String bgid);

    /**
     * 删除合同的变更信息
     * @param htbm
     *              合同编码
     */
    void deleteChangeByHtbm(String htbm);
}
