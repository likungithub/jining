package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.dao.YpjcMapper;
import com.xinhai.caiyun.customermanage.service.YpjcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class YpjcServiceImpl implements YpjcService {
    @Autowired
    private YpjcMapper ypjcMapper;

    public List<Map> selectLr(Map map){
        return ypjcMapper.selectLr(map);
    };

    public Integer selectCount(Map map){
        return ypjcMapper.selectCount(map);
    };
    /*修改检测值及状态*/
    public void updateYpjc(Map map){
        ypjcMapper.updateYpjc(map);
    };
    /**
     * 查询仪器所有信息
     */
    public List<Map> findAllYq(Map map){
        return ypjcMapper.findAllYq(map);
    };
    /**
     * 查询仪器所有统计数
     */
    public Integer findAllYqNum(Map map){
        return ypjcMapper.findAllYqNum(map);
    };
    /**
     * 更样品的检测状态 001 检测中
     */
    public void updteYpjczt(Map map){
        ypjcMapper.updteYpjczt(map);
    };
    /**
     * 在yp_jcxm表中增加仪器
     */
    public void addYqOnJcxm(Map map){
        ypjcMapper.addYqOnJcxm(map);
    };
    /**
     *通过名称的集合获得获得职员代码的集合
     */
    public List<String> queryZydmByNames(List<String> list){
        return ypjcMapper.queryZydmByNames(list);
    };
}
