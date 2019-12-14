package com.xinhai.caiyun.customermanage.service;

import com.xinhai.caiyun.customermanage.api.Ypqcl;
import org.jboss.logging.Param;

import java.util.List;
import java.util.Map;

public interface YpqclService {

    /**
     * 查询所有"样品前处理" 的信息
     * @return
     */
    public List<Map> queryYPqclAll(Map map);
    /**
     * 查询所有"样品前处理" 的信息数量
     * @return
     */
    public  Integer queryYPqclCount( Map map);

    /**
     * 查询 样品类型为蔬果肉的 样品处理信息
     * @return
     */
    public List<Map> queryYPqclSGR(Map map);

    /**
     * 查询 样品类型为蔬果肉的 样品处理数量
     * @return
     */
    public Integer queryYPqclSGRCount(Map map);

    /**
     * 样品信息选择页面  回显单条样品信息
     * @return
     */
    Map queryYPqclSGRAloneChoice(String id);

    /**
     * 样品前处理信息  领取
     * @param
     */
    void addCreateYpqcl(Ypqcl ypqcl);

    /***
     * 删除已存在的样品
     * @param id
     */
     void deleteYpqcl(String id);

    /**
     * 修改 样品前处理 信息
     * @param map
     */
    void updateYpqcllingqu(Map map);

    /**
     * 样品 处理
     * @param map
     */
    void updateYpqclchuli(Map map);

    /**
     * 样品退还
     * @param map
     */
    void updateYpqcltuihuan(Map map);

}
