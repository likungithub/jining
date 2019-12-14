package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.CgrkMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.CgrkService;

import java.util.List;
import java.util.Map;
@Service
@Transactional
public class CgrkServiceImpl implements CgrkService {
    @Autowired
    private CgrkMapper cgrkMapper;

    /**陈
     *
     * 得到采购入库的信息
     */
    public List<Map> selectCgrk(Map map) {
        return cgrkMapper.selectCgrk(map);
    }

    ;

    /**陈
     *
     * 得到采购入库的信息数量
     */
    public Integer selectCount(Map map) {
        return cgrkMapper.selectCount(map);
    }

    ;
    /**陈
     *通过hcbm  在采购申请表中查找信息
     */
    public  List<Map> queryCgsqByHcbm(String hcbm){
        return cgrkMapper.queryCgsqByHcbm(hcbm);
    };
    /**陈
     * 将申请表中的信息 放入入库表中
     */
    public void addCgrkFromCgsq(Map map){
        cgrkMapper.addCgrkFromCgsq(map);
    };
    /**
     * 陈
     * 根据耗材编码查找id
     * t_cgrk_jbxx
     */
    public List<String>  queryIdByHcbm(String hcbm){
        return cgrkMapper.queryIdByHcbm(hcbm);
    };
}
