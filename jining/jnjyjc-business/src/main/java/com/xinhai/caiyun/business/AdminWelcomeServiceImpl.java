package com.xinhai.caiyun.business;

import com.xinhai.caiyun.api.AdminWelcomeService;
import com.xinhai.caiyun.bean.PtKhtj;
import com.xinhai.caiyun.dao.AdminWelcomeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

/**
 * @description:管理员欢迎页接口实现类
 * @author xinl
 * @date: 2017年11月17日 上午09:12:00
 * @version: v1.0
 */
@Repository
public class AdminWelcomeServiceImpl  implements AdminWelcomeService{

    @Autowired
    AdminWelcomeMapper mapper;
    /**
     * 客户统计
     * @param tjlx 统计类型
     *             01 代理员工
     *             02 代理新增客户
     *             03 代理新增潜在客户
     *             04 新增代理记账公司
     *             05 初审代理记账公司
     *             06 终审代理记账公司
     * @return
     */
    public List<PtKhtj> findKhtj(String  tjlx){
        return mapper.findKhtj(tjlx);
    }

    /**
     * @Author: shanliang
     * @Description:启动统计
     * @Date:2018-03-08 9:40
     **/

    public List<Map<String,String>> qdtj(Map  cxtj){
        return mapper.qdtj(cxtj);
    }
}
