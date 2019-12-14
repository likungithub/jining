package com.xinhai.caiyun.commonmanager.dao;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;

import org.apache.ibatis.annotations.Param;

import com.xinhai.caiyun.commonmanager.api.Xzqy;

/**
 * @author 李茂飞
 *
 * @version
 */
public interface XzqyMapper {

    void createXzqy(Xzqy xzqy);

    void updateXzqy(@Param("id") Integer xzqhDm, @Param("xzqy") Xzqy xzqy);

    void deleteXzqyList(List<Integer> xzqhDm);

    void deleteXzqy(Integer xzqhDm);

    Xzqy getXzqy(Integer xzqhDm);

    /**
     * 查询省一级
     * 
     * @return 返回list
     */
    List<Xzqy> getXzqyList();
    
    /**
     * 查询全部
     * 
     * @return 返回list
     */
    List<Xzqy> getAllXzqyList();

    List<Xzqy> getXzqyListByKeyword(@Param("keyword") String keyword);

    List<JSONObject> getAllXzqy(Map<String, Object> parameters);

    /**
     * 根据上级代码查询对应下级list
     * 
     * @param sjdm
     *            上级代码
     * @return 返回下级list
     */
    List<Xzqy> findNext(@Param("sjdm") String sjdm);
}