package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.CgspMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.CgspService;

import java.util.List;
import java.util.Map;

@Service
@Transactional
/**
 * 采购审批实现类
 */
public class CgspServiceImpl implements CgspService {
    @Autowired
    private CgspMapper cgspMapper;
    /**陈
     *获得审批的数据
     */
    public List<Map> queryCgspXx(Map map){
        return  cgspMapper.queryCgspXx(map);
    };
    /**陈
     *获得审批的数据的数量
     */
    public Integer queryCgspXxNum(Map map){
        return  cgspMapper.queryCgspXxNum(map);
    };
    /**陈
     * 审批成功和退回操作
     */
    public void  saveSqzt(Map map){
        cgspMapper.saveSqzt(map);
    };
    /**陈
     * 得到退回的消息内容
     */
    public List<Map> queryMess(List<String> ids){
       return cgspMapper.queryMess(ids);
    };
}
