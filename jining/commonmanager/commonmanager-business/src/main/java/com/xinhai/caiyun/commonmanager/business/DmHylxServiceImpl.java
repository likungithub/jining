package com.xinhai.caiyun.commonmanager.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.commonmanager.api.DmHylx;
import com.xinhai.caiyun.commonmanager.api.DmHylxService;
import com.xinhai.caiyun.commonmanager.dao.DmHylxMapper;

/**
 * @author lmf
 *
 * @version
 */
@Repository
public class DmHylxServiceImpl implements DmHylxService {
    
    /**
     * 装箱
     */
    @Autowired
    private DmHylxMapper DmHylxMapper;

    /**
     * 查询全部
     * 
     * @return 返回list
     */
    public List<DmHylx> findAllDmHylx() {
        return DmHylxMapper.getDmHylxList();
    }

    /**
     * 根据上级代码查询对应下级list
     * @param sjdm 上级代码
     * @return 返回下级list
     */
    @Override
    public List<DmHylx> findNext(String sjdm) {
        return DmHylxMapper.findNext(sjdm);
    }

}
