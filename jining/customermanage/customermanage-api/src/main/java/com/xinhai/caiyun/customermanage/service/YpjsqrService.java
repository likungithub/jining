package com.xinhai.caiyun.customermanage.service;

import java.util.List;
import java.util.Map;

public interface YpjsqrService {
    /**
     * 查询所有样品接收确认信息
     * @return
     */
    public List<Map> findAllYpjsqr(Map map);
    /**
     * 查询所有样品接收数量
     * @return
     */
    public Integer findAllYpjsqrNum(Map map);
    /**
     * 接收确认改变状态
     */
    public  void  updateJszt(String id);
}
