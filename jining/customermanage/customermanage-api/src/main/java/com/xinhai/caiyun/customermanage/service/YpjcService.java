package com.xinhai.caiyun.customermanage.service;

import java.util.List;
import java.util.Map;

public interface YpjcService {
    public List<Map> selectLr(Map map);
    public Integer selectCount(Map map);
    /**
     *
     *修改检测值及状态
     */
    public void updateYpjc(Map map);
    /**
     * 查询仪器所有信息
     */
    public List<Map> findAllYq(Map map);
    /**
     * 查询仪器所有统计数
     */
    public Integer findAllYqNum(Map map);
    /**
     * 更样品的检测状态 001 检测中
     */
    public void updteYpjczt(Map map);
    /**
     * 在yp_jcxm表中增加仪器
     */
    public void addYqOnJcxm(Map map);
    /**
     *通过名称的集合获得获得职员代码的集合
     */
    public List<String> queryZydmByNames(List<String> list);
}
