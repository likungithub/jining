package com.xinhai.caiyun.commonmanager.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.xinhai.caiyun.commonmanager.api.DmHylx;

/**
 * @author 李茂飞
 *
 * @version
 */
public interface DmHylxMapper {

    /**
     * 查询全部
     * 
     * @return 返回list
     */
    List<DmHylx> getDmHylxList();
    
    /**
     * 查询全部门类
     * 
     * @return 返回list
     */
    List<DmHylx> getML();

    /**
     * 查询大类
     * 
     * @return 返回list
     */
    List<DmHylx> getDL(@Param("sjdm") String sjdm);
    
    /**
     * 根据上级代码查询对应下级list
     * 
     * @param sjdm
     *            上级代码
     * @return 返回下级list
     */
    List<DmHylx> findNext(@Param("sjhyDm") String sjhyDm);
}