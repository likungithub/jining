package com.xinhai.caiyun.commonmanager.api;

import java.util.List;

/**
 * 查询区域代码问题
 * @author Administrator
 *
 */
public interface XzqyService {

    Xzqy findXzqy(Integer xzqhDm);

    void createXzqy(Xzqy xzqy);

    void updateXzqy(Integer xzqhDm, Xzqy xzqy);

    void deleteXzqy(Integer xzqhDm);

    void deleteXzqy(List<Integer> xzqhDms);

    /**
     * 查询省一级
     * @return 返回list
     */
    List<Xzqy> findAllXzqy();
    
    /**
     * 查询全部
     * 
     * @return 返回list
     */
    List<Xzqy> getAllXzqyList();
    
    /**
     * 根据上级代码查询对应下级list
     * @param sjdm 上级代码
     * @return 返回下级list
     */
    List<Xzqy> findNext(String sjdm);

}
