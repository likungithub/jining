package com.xinhai.caiyun.customermanage.service;

import java.util.List;
import java.util.Map;

public interface YpzbfpService {
    /**
     * 获得制备分配的信息
     */
    public List<Map> queryAll(Map map);
    /**
     * 获得制备分配的信息的数量
     */
    public Integer queryAllNum(Map map);
    /**
     * 保存任务分配的数据
     */
    public void saveFp(Map map);
    /**
     * 通过职员代码获得
     */
    public String getUserName(String zydm);

    /**
     * 分配任务退回
     */
    public void saveBack(Map map);
}
