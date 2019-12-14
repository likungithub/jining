package com.xinhai.caiyun.customermanage.service;

import java.util.List;
import java.util.Map;

public interface JcxFywhService  {
    /**
     *获得检测管理的所有数据数量
     */
    long findCount(Map cxtj);

    /**
     * 获得检测管理的所有数据
     */
    List<Map> findAll(Map cxtj);

    /**
     *费用控制 录入模态框 数据源查询
     */
    List<Map> selectLrFykz(Map map);

    /**
     *费用控制 录入模态框 数据源查询
     */
    Integer selectCountFykz(Map map);

    /**
     *  保存 检测项 费用控制
     */
    void insertFYKZ(Map map);
}
