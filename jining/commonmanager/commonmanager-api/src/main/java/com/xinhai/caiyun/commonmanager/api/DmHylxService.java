package com.xinhai.caiyun.commonmanager.api;

import java.util.List;

/**
 * 查询区域代码问题
 * @author Administrator
 *
 */
public interface DmHylxService {

    /**
     * 查询全部
     * @return 返回list
     */
    List<DmHylx> findAllDmHylx();
    
    /**
     * 根据上级代码查询对应下级list
     * @param sjdm 上级代码
     * @return 返回下级list
     */
    List<DmHylx> findNext(String sjdm);

}
