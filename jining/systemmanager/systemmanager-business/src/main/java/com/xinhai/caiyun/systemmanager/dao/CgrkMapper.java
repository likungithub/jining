package com.xinhai.caiyun.systemmanager.dao;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;
@Repository
public interface CgrkMapper {
    /**
     * 陈
     * 得到采购入库的信息
     */
    public List<Map> selectCgrk(@Param("map") Map map);

    /**
     * 陈
     * 得到采购入库信息的数量
     */
    public Integer selectCount(@Param("map") Map map);

    /**
     * 陈
     * 通过hcbm  在采购申请表中查找信息
     */
    public List<Map> queryCgsqByHcbm(@Param("hcbm") String hcbm);

    /**
     * 陈
     * 将申请表中的信息 放入入库表中
     */
    public void addCgrkFromCgsq(@Param("map") Map map);

    /**
     * 陈
     * 根据耗材编码查找id
     * t_cgrk_jbxx
     */
    public List<String>  queryIdByHcbm(@Param("hcbm") String hcbm);
}
