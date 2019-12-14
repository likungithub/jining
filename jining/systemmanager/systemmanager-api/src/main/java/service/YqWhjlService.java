package service;

import com.xinhai.caiyun.systemmanager.api.YqWhjl;
import com.xinhai.caiyun.systemmanager.api.YqWxsq;

import java.util.List;

public interface YqWhjlService {
    public List<YqWxsq> findAll();
    public YqWxsq findOne(String id);
    public void deleteOne(String id);
    public void  update(YqWxsq yqWxsq);
}
