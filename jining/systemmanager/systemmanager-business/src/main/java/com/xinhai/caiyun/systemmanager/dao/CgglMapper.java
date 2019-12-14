package com.xinhai.caiyun.systemmanager.dao;
import com.xinhai.caiyun.systemmanager.api.Cggl;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface CgglMapper {
    /**
     *采购管理中的数据
     */
    public List<Map> selectCggl(@Param("map") Map map);
    /**
     * 采购管理中的数据个数
     *
     */
    public Integer selectCount(@Param("map") Map map);
    /**
     * 编制成功和退回操作  修改状态
     */
    public void  saveBzzt(@Param("map") Map map);
    /**
     * 修改耗材单价总价
     */
    public void updateCgsqhcbz(@Param("map") Map map);
    /**
     *获得excel导出信息
     */
    public Cggl queryCcglExcel(@Param("id") String id);
    /**
     * 获得采购验收的信息
     */
    public List<Map> queryCgys(@Param("map") Map map);

    /**
     * 获得采购验收的信息的数量
     */
    public Integer queryCgysNum(@Param("map") Map map);
    /**
     * 采购验收  更改采购状态和申请状态
     */
    public void  saveCgysZt(@Param("ids") List ids);
    /**
     * 通过ids  获得对应的采购验收的信息
     */
    public List<Map>  queryCgysByIds(@Param("ids") List ids);
    /**
     * 更新采购管理中的总价
     */
    public void saveZj(@Param("map") Map map);
}
