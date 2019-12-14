package com.xinhai.caiyun.commonmanager.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.commonmanager.api.Xzqy;
import com.xinhai.caiyun.commonmanager.api.XzqyService;
import com.xinhai.caiyun.commonmanager.dao.XzqyMapper;

/**
 * @author
 *
 * @version
 */
@Repository
public class XzqyServiceImpl implements XzqyService {
    @Autowired
    private XzqyMapper xzqyMapper;

    public void createXzqy(Xzqy xzqy) {
        xzqyMapper.createXzqy(xzqy);
    }

    public void updateXzqy(Integer xzqhDm, Xzqy xzqy) {
        xzqyMapper.updateXzqy(xzqhDm, xzqy);
    }

    public void deleteXzqy(List<Integer> xzqhDms) {
        xzqyMapper.deleteXzqyList(xzqhDms);
    }

    public void deleteXzqy(Integer xzqhDm) {
        xzqyMapper.deleteXzqy(xzqhDm);
    }

    /**
     * 查询省一级
     * 
     * @return 返回list
     */
    public List<Xzqy> findAllXzqy() {
        return xzqyMapper.getXzqyList();
    }
    
    /**
     * 查询全部
     * 
     * @return 返回list
     */
    public List<Xzqy> getAllXzqyList() {
        return xzqyMapper.getAllXzqyList();
    }

    public Xzqy findXzqy(Integer xzqhDm) {
        Xzqy xzqy = xzqyMapper.getXzqy(xzqhDm);
        return xzqy;
    }

    /**
     * 根据上级代码查询对应下级list
     * @param sjdm 上级代码
     * @return 返回下级list
     */
    @Override
    public List<Xzqy> findNext(String sjdm) {
        return xzqyMapper.findNext(sjdm);
    }

}
