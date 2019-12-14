package service;

import java.util.List;
import java.util.Map;

public interface Cgck2Service {
    //检测量统计  查找所有信息
   public List<Map> cgck2_queryList(Map map);
   //统计当前所有的数量
   public Integer cgck2_findCount(Map map);
    /*查询库存信息*/
    public String cgck(Map map);
    /*更新数量*/
    public void updateKc(Map map);
    public void updatesqKc(Map map);
    /*更新状态*/
    public void updateZt(Map map);
}
