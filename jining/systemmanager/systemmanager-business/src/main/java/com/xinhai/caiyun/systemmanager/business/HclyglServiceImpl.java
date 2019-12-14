package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.HclyglMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.HclyglService;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class HclyglServiceImpl implements HclyglService {
    @Autowired
    private HclyglMapper hclyglMapper;

    /**
     *
     * 得到领用申请的信息
     */
    public List<Map> queryLyglAll(Map map) {
        return hclyglMapper.queryLyglAll(map);
    }

    /**
     *
     * 得到领用申请的信息的数量
     */
    public Integer queryLyglAllNum(Map map) {
        return hclyglMapper.queryLyglAllNum(map);
    }

    /**
     * 得到报告的数据  通过id的集合
     */
    public List<Map> getReportData(List ids) {
        return hclyglMapper.getReportData(ids);
    }

    /**
     * 删除耗材领用管理的数据  通过id的集合
     */
    public void delLygl(List ids) {
        hclyglMapper.delLygl(ids);
    }


}
