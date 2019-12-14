package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.SyhcljlMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.SyhcljlService;

import java.util.List;
import java.util.Map;
@Service
@Transactional
public class SyhcljlServiceImpl implements SyhcljlService {
    @Autowired
    private SyhcljlMapper syhcljlMapper;
    /*
     * 获得剩余耗材量
     */
    public List<Map> findByNaTy(Map map){
        return syhcljlMapper.findByNaTy(map);
    };

    /*
     * 获得剩余耗材量数量
     */
    public Integer findByNaTyNum(Map map){
        return syhcljlMapper.findByNaTyNum(map);
    };

    /*
     * 增加剩余耗材量信息
     */
    public void addCgsq(Map map){
        syhcljlMapper.addCgsq(map);
    };

    /*
     *批量删除信息
     */
    public void deleteCgsq(List<String> ids){
        syhcljlMapper.deleteCgsq(ids);
    };

    /*打印样品条码*/
    @Override
    public List<Map> yp(List dy){return syhcljlMapper.yp(dy); };
}
