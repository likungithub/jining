package com.xinhai.caiyun.customermanage.api;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 现金流量表接口
 * @author huxinquan
 */
@Service
public interface CashFlowStatementsService {
    /**
     * 根据行次查询现金流量表
     * @param lineNumber 行次
     * @return 现金流量表
     */
    List<CashFlowStatements> getCashFlowStatementsByLineNumber(int lineNumber);

    /**
     * 根据分组标志查询现金流量表
     * @param groupFlag 分组标志
     * @return 现金流量表集合
     */
    List<CashFlowStatements> getCashFlowStatementsByGroupFlag(String groupFlag);

    /**
     * 模糊查询
     * @param searchText 查询文本
     * @return 现金流量表集合
     */
    List<CashFlowStatements> searchCashFlowStatementsByText(String searchText);

    /**
     * 新增现金流量表
     * @param cashFlowStatementsList 现金流量表集合
     */
    void addCashFlowStatements(List<CashFlowStatements> cashFlowStatementsList);

    /**
     * 根据分组标志物理删除现金流量表
     * @param groupFlag 分组标志
     */
    void deleteCashFlowStatementsByGroupFlag(String groupFlag);

    /**
     * 根据分组标志逻辑删除现金流量表
     * @param cashFlowStatements 现金流量表对象
     */
    void tombstonedCashFlowStatements(CashFlowStatements cashFlowStatements);
}
