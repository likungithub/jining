package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface YpjcMapper {
    public List<Map> selectLr(@Param("map") Map map);
    public Integer selectCount(@Param("map") Map map);
    /*修改检测值及状态*/
    public void updateYpjc(@Param("map") Map map);
    public void submitYpjc(@Param("map") Map map);
    public List<Map> findNotSubmit(@Param("map") Map map);
    public List<Map> findNotRwfp(@Param("map") Map map);
    /**
     *  查询仪器所有信息
     */
    public List<Map> findAllYq(@Param("map") Map map);

    /**
     * 查询仪器所有统计数
     */
    public Integer findAllYqNum(@Param("map") Map map);
    //根据样品id查询仪器
    public List<Map> findYqByYpid(@Param("map") Map map);
    //根据样品id查询仪器数量
    public Integer findYqNumByYpid(@Param("map") Map map);
    /**
     * 更样品的检测状态 001 检测中
     */
    public void updteYpjczt(@Param("map") Map map);
    /**
     * 在yp_jcxm表中增加仪器
     */
    public void addYqOnJcxm(@Param("map") Map map);

    /**
     *通过名称的集合获得获得职员代码的集合
     */
    public List<String> queryZydmByNames(@Param("list") List<String> list);
    //查询是否在报告编制里选择过仪器
    public String yqsb(@Param("map") Map map);
    //插入报告编制页面选择的仪器
    public void insertYqsb(@Param("map") Map map);
    //删除报告编制仪器
    public void delYqsb(@Param("map") Map map);
}
