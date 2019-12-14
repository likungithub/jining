package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.CgshMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.CgshService;
import java.util.List;
import java.util.Map;

@Service
@Transactional
/**
 * 采购审核实现类
 */
public class CgshServiceImpl implements CgshService {
    @Autowired
    private CgshMapper cgshMapper;

    /**
     * 获得审核的数据
     */
    public List<Map> queryCgshXx(Map map) {
        return cgshMapper.queryCgshXx(map);
    }

    /**
     * 获得审核数据的数量
     */
    public Integer queryCgshXxNum(Map map) {
        return cgshMapper.queryCgshXxNum(map);
    }

    /**
     * 通过和退回操作
     */
    public void saveShzt(Map map) {
        cgshMapper.saveShzt(map);
    }

    /**
     * 获得退回的信息
     */
    public List<Map> queryMess(List<String> ids) {
        return cgshMapper.queryMess(ids);
    }
}
