package com.xinhai.caiyun.customermanage.service;

import java.util.List;
import java.util.Map;

public interface HyglService {
    public List<Map> selectHyglList(Map map);
    public Integer selectCount(Map map);
    public void updateHygl(Map map);
}
