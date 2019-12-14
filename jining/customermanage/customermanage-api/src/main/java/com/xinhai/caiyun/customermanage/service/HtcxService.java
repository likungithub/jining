package com.xinhai.caiyun.customermanage.service;

import java.util.List;
import java.util.Map;

public interface HtcxService {
    /**
     * 查询所有委托信息
     * @return
     */
    public List<Map> findAllWt(Map map);
    /**
     * 查到所有显示数
     */
    public int findWtCount(Map map);
    /**
     * 查找对应样品信息
     */
    public List<Map> findYpByWtid(Map map);
    /**
     * 查找对应样品所有数
     */
    public Integer findYpNum(Map map);
}
