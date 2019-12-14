package com.xinhai.caiyun.systemmanager.dao;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;
@Repository
public interface CgsqMapper {
    /**
     * 陈
     * 获得采购申请的信息
     *
     */
    public List<Map> findByNaTy(@Param("map") Map map);

    /**
     * 陈
     * 获得采购信息的数量
     *
     */
    public Integer findByNaTyNum(@Param("map") Map map);

    public void updatezt(Integer id);

    /**陈
     *通过id查找耗材信息
     */
    public List<Map> findById(@Param("id") String id);

    /**陈
     * 更新耗材的信息
     */
    public void updateCgsq(@Param("map") Map map);

    /**
     * 陈
     * 增加采够申请的信息
     */
    public void addCgsq(@Param("map") Map map);

    /**陈
     *批量删除信息
     */
    public void deleteCgsq(@Param("ids") List<String> ids);

    /**陈
     * 将导入的Excel表的信息加载到数据库中
     */
    public void addCgsqExcel(@Param("list") List<Map> list);
}
