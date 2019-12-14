package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.RyglMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.RyglService;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class RyglServiceImpl implements RyglService {
    @Autowired
    private RyglMapper ryglMapper;
    /**
     * 查询人员的基本信息
     * */
    public List<Map> selectRygl(Map map){
        return ryglMapper.selectRygl(map);
    };
    public Integer selectRyglCount(Map map){
        return ryglMapper.selectRyglCount(map);
    };
    /**
     * 新增人员信息
     */
    public void addRygl(Map map){
        ryglMapper.addRygl(map);
    };
    /**
     * 删除人员信息
     */
    public void deleteRygl(Map map){
        ryglMapper.deleteRygl(map);
    };
    /**
     * 修改人员基本
     */
    public void updateRygl(Map map){
        ryglMapper.updateRygl(map);
    };
}
