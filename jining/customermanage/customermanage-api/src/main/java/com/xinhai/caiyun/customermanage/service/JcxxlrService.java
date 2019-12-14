package com.xinhai.caiyun.customermanage.service;

import java.util.List;
import java.util.Map;

public interface JcxxlrService {
    //开始获得温度湿度
    public List<Map> startWsd();

    //结束获取温湿度
    public List<Map> endWsd();

    //将温度湿度保存到数据库中
    public void saveWsd(Map map);

}
