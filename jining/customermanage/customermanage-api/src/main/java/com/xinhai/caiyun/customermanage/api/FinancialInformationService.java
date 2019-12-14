package com.xinhai.caiyun.customermanage.api;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 财务信息接口
 * @author huxinquan
 */
@Service
public interface FinancialInformationService {
    /**
     * 根据客户编码查询财务信息
     * @param customerCode 客户编码
     * @return 财务信息集合
     */
    List<FinancialInformation> getFinancialInformationByCustomerCode(String customerCode);

    /**
     * 根据日期查询财务信息
     * @param selectTime 日期
     * @param customerCode 客户编码
     * @return 财务信息集合
     */
    List<FinancialInformation> getFinancialInformationByTime(String selectTime, String customerCode);

    /**
     * 根据条件查询财务信息
     * @param beginTime 开始日期
     * @param endTime 结束日期
     * @param customerCode 客户编码
     * @return 财务信息集合
     */
    List<FinancialInformation> getFinancialInformationByQueryData(String beginTime, String endTime, String customerCode);

    /**
     * 新增财务信息
     * @param financialInformation 财务信息对象
     */
    void addFinancialInformation(FinancialInformation financialInformation);

    /**
     * 根据分组标志查询财务信息
     * @param groupFlag 分组标志
     * @return 财务信息对象
     */
    FinancialInformation getFinancialInformationByGroupFlag(String groupFlag);

    /**
     * 更改财务信息表格编写状态
     * @param financialInformation 财务信息对象
     */
    void updateWriteSigns(FinancialInformation financialInformation);
}
