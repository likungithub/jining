package com.xinhai.caiyun.customermanage.service;

import java.util.List;
import java.util.Map;

public interface PageConfigService {
    /**
     * 查询
     * @param map
     */
    public List<Map> findById(Map map);

    /**
     * 根据id更新操作实现
     * @param map
     */
    public void update(Map map);

    /**
     * 新增
     * @param map
     */
    public void add(Map map);

    public void del(Map map);
}
