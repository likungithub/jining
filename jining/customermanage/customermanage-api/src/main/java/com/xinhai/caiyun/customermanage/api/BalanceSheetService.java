package com.xinhai.caiyun.customermanage.api;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * 资产负债表接口
 * @author huxinquan
 */
@Service
public interface BalanceSheetService {

    /**
     * 获取所有资产负债表
     * @return 资产负债表
     */
    List<BalanceSheet> getAllBalanceSheet();

    /**
     * 根据行次获取资产负债表
     * @param lineNumber 行次
     * @return 资产负债表
     */
    List<BalanceSheet> getBalanceSheetByLineNumber(int lineNumber);

    /**
     * 根据分组标志获取资产负债表
     * @param groupFlag 分组标志
     * @return 资产负债表
     */
    List<BalanceSheet> getBalanceSheetByGroupFlag(String groupFlag);

    /**
     * 模糊查询
     * @param searchText 搜索文本
     * @return 资产负债表
     */
    List<BalanceSheet> searchBalanceSheetByText(String searchText);

    /**
     * 新增资产负债表
     * @param balanceSheetList 资产负债表集合
     */
    void addBalanceSheet(List<BalanceSheet> balanceSheetList);

    /**
     * 更新资产负债表
     * @param balanceSheetList 资产负债表集合
     */
    void updateBalanceSheet(List<BalanceSheet> balanceSheetList);

    /**
     * 根据分组标志物理删除资产负债表
     * @param groupFlag 分组标志
     */
    void deleteBalanceSheetByGroupFlag(String groupFlag);

    /**
     * 根据分组标志逻辑删除资产负债表
     * @param balanceSheet 资产负债表对象
     */
    void tombstonedBalanceSheet(BalanceSheet balanceSheet);
}
