package com.xinhai.caiyun.customermanage.api;

import java.util.List;

import org.springframework.stereotype.Service;

/**
 * 收费项目接口
 * @author tangck
 *
 */
@Service
public interface ContractPayService {

    /**
     * 保存收费项目
     * @param cp
     *          收费项目对象
     */
    void insertPayService(ContractPay cp);

    /**
     * 根据合同编码获取合同收费
     * @param htbm
     *          合同编码
     * @return
     *          返回收费项目list
     */
    List<ContractPay> findContractPayByHtbm(String htbm);

    /**
     * 删除原本的合同收费项目
     * @param cps 
     *          收费项目对象
     */
    void deleteContractPay(ContractPay cps);

    /**
     * 获取收费类型，如果是1，表示是代理记账，如果是0，表示是其他
     * @param htbm
     *              合同编码
     * @return
     */
    long findContractPayTypeByHtbm(String htbm);


}
