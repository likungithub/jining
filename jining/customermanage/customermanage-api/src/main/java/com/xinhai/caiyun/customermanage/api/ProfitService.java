package com.xinhai.caiyun.customermanage.api;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 利润表接口
 * @author huxinquan
 *
 */
@Service
public interface ProfitService {
    /**
     * 根据分组标志查询利润表
     * @param groupFlag 分组标志
     * @return 利润表
     */
    List<Profit> getProfitByGroupFlag(String groupFlag);

    /**
     * 新建利润表
     * @param profitList 利润表对象集合
     */
    void addProfit(List<Profit> profitList);

    /**
     * 物理删除利润表
     * @param groupFlag 分组标志
     */
    void deleteProfitByGroupFlag(String groupFlag);
}
