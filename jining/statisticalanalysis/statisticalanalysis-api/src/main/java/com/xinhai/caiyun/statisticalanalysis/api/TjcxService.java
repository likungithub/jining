package com.xinhai.caiyun.statisticalanalysis.api;

import java.util.List;
import java.util.Map;

public interface TjcxService {
    //检测量统计  查找所有信息
   public List<Map> jcltj_queryList(Map map);
   //统计当前所有的数量
   public Integer jcltj_findCount(Map map);

    //科室检测量统计  查找所有信息
    public List<Map> ksjcl_queryList(Map map);
    //统计当前所有的数量
    public Integer ksjcl_findCount(Map map);

    //报告发放统计  查找所有信息
    public List<Map> bgfftj_queryList(Map map);
    //统计当前所有的数量
    public Integer bgfftj_findCount(Map map);
    //报告发放
    public void updateBgff(Map map);
    //通过id的集合 获取报告领数据
    public List<Map> bgfftj_getData(List ids);

}
