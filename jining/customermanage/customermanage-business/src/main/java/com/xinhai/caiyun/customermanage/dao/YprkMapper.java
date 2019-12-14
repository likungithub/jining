package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.Yprk;
import com.xinhai.caiyun.customermanage.api.Yprkxx;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface YprkMapper {
    //查询样品入库详情
    public List<Map> selectYprkAll(@Param("map") Map map);
    public Integer selectYprkCount(@Param("map") Map map);
    /*通过受控编号查找设备信息*/
    public Yprk findByYpbm(@Param("map")Map map);
    /*导入Excel数据*/
    public void importYprkExcel(@Param("map")Map map);
    //查询样品是否存在
    public String selectYpCount(@Param("map") Map map);
    //删除已存在的样品
    public void deleteYp(@Param("id") String id);
    /*修改入库样品信息*/
    public void updateYprk(@Param("map")Map map);
    //新增入库样品
    public void addYprk(Yprkxx ypclxx);

}
