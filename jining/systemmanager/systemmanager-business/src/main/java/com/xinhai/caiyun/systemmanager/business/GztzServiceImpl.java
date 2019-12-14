package com.xinhai.caiyun.systemmanager.business;


import com.xinhai.caiyun.systemmanager.dao.GztzMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.GztzService;
import java.util.*;

@Service
@Transactional
public class GztzServiceImpl implements GztzService {

    @Autowired
    private GztzMapper gztzMapper;
    /**
     * 根据人员 获取 工作量统计信息
     */
    public List<Map> getGzltjByRy(Map map){
        return gztzMapper.getGzltjByRy(map);
    };    /**
     * 根据人员 获取 工作量统计信息 数量
     */
    public long getGzltjByRyNum(Map map){
        return gztzMapper.getGzltjByRyNum(map);
    };
    /**
     * 根据人员 获取 工作量统计信息
     */
    public List<Map> getGzltjByRyMx(Map map){
        return gztzMapper.getGzltjByRyMx(map);
    };    /**
     * 根据人员 获取 工作量统计信息 数量
     */
    public long getGzltjByRyMxNum(Map map){
        return gztzMapper.getGzltjByRyMxNum(map);
    };

}
