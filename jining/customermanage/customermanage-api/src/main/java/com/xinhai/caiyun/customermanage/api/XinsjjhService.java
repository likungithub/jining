package com.xinhai.caiyun.customermanage.api;

import java.util.List;
import java.util.Map;

public interface XinsjjhService {
    //检测量统计  查找所有信息
   public List<Map> sjjh_queryList(Map map);
   //统计当前所有的数量
   public Integer sjjh_findCount(Map map);

    //检测量统计  查找所有信息
    public List<Map> sjfh_queryList(Map map);
    //统计当前所有的数量
    public Integer sjfh_findCount(Map map);
}
