package com.xinhai.caiyun.customermanage.service;

import com.xinhai.caiyun.customermanage.api.Lygl;
import com.xinhai.caiyun.customermanage.api.Ypzbwc;
import org.jboss.logging.Param;

import java.util.List;
import java.util.Map;

public interface LyglService {
    public List<Map> findAll(Map map);

    public Integer findCount(Map map);

    public void updatelqzt(Map map);

    public List<Ypzbwc> findYpzb(Lygl lygl);

    /*检测项关联制备样*/
    public void updatejcYp(Map map);

    /**
     * 陈
     * 通过样品id  得到样品的制备剩余量
     */
    public Integer queryYpNumByYpid(String ypid);

    /*删除*/
    public void deletedlqzt(Map map);
    //20190923添加退回流程
    public void thUpdate(Map map);
    //20190923添加校验样品是否存在已经检测项
    public Integer checkJcCount(Map map);
}
