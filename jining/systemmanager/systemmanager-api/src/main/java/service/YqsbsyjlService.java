package service;

import java.util.List;
import java.util.Map;

public interface YqsbsyjlService {
    //查询受控编号
    public List<Map> selectSKbh(Map map);
    //展示关联仪器样品
    public List<Map> selectSyjl(Map map);
    public Integer selectSyjlCount(Map map);
    //查询全部仪器
    public List<Map> selectYqsb(Map map);
    //查询全部样品
    public List<Map> selectYpxx(Map map);
    //查询相关样品检测项
    public List<Map> selectYqjcx(Map map);
    //添加仪器使用记录
    public void addYqsyjl(Map map);
    //查找重复
    public Integer selectcfwt(Map map);
    //一起使用完毕
    public void finishYqsy(Map map);
}
