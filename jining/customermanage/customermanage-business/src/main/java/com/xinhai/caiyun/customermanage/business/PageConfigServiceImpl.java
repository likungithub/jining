package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.CompanyInfoImage;
import com.xinhai.caiyun.customermanage.api.CustomerManage;
import com.xinhai.caiyun.customermanage.api.CustomerManageService;
import com.xinhai.caiyun.customermanage.dao.CustomerManageMapper;
import com.xinhai.caiyun.customermanage.dao.PageConfigMapper;
import com.xinhai.caiyun.customermanage.service.PageConfigService;
import com.xinhai.customer.api.Customer;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Map;


/**
 * @author 李茂飞
 *
 * @version
 */
@Repository
public class PageConfigServiceImpl implements PageConfigService {

    /**
     * 定义mapper
     */
    @Autowired
    private PageConfigMapper pageMapper;

    /**
     * 查询
     * @param map
     */
    public List<Map> findById(Map map) {
        return pageMapper.findById(map);
    }

    /**
     * 根据id更新操作实现
     * @param map
     */
    public void update(Map map) {
        pageMapper.add(map);
    }

    /**
     * 新增
     * @param map
     */
    public void add(Map map) {
        pageMapper.add(map);
    }

    public void del(Map map) {
        pageMapper.del(map);
    }
}
