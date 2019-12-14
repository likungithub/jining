package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.Ypqcl;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface YpqclMapper {

    /**
     * 查询所有"样品前处理" 的信息
     * @return
     */
    public List<Map> queryYPqclAllM(@Param("map") Map map);
    /**
     * 查询所有"样品前处理" 的信息数量
     * @return
     */
    public  Integer queryYPqclCountM(@Param("map") Map map);

    /**
     * 查询 样品类型为蔬果肉的 样品处理信息
     * @return
     */
    public List<Map> queryYPqclSGRM(Map map);

    /**
     * 查询 样品类型为蔬果肉的 样品处理数量
     * @return
     */
    public Integer queryYPqclSGRCountM(Map map);

    /**
     * 样品信息选择页面  回显单条样品信息
     * @return
     */
    Map queryYPqclSGRAloneChoiceM(String id);

    /**
     * 样品前处理信息  添加
     * @param
     */
    void addCreateYpqclM(Ypqcl ypqcl);

    /***
     * 删除已存在的样品
     * @param id
     */
    void deleteYpqclM(@Param("id") String id);

    /**
     * 修改 样品前处理 信息
     * @param map
     */
     void updateYpqcllingquM(@Param("map")Map map);

    /**
     * 样品领取
     * @param map
     */
    void updateYpqclchuliM(@Param("map")Map map);

    /**
     * 样品退还
     * @param map
     */
    void updateYpqcltuihuanM(@Param("map")Map map);
}
