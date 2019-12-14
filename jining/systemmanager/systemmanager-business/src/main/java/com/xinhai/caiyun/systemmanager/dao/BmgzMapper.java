package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface BmgzMapper {
    /*修改委托单编码规则*/
    public void updateBmgz(@Param("map") Map map);
    /*修改样品编码规则*/
    public void updateBmgzyp(@Param("map") Map map);
    /*查询当前编码规则*/
    public List<Map> selectBmgz();
    /*新增委托单*/
    public void insertBmgz(@Param("map") Map map);
    /*新增样品*/
    public void insertBmgzyp(@Param("map") Map map);

    public String getMaxWtbm();
    public String getMaxYpbm();
    public String getMaxYpbm2();
}
