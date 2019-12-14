package service;
import java.util.List;
import java.util.Map;
public interface YqyysyService {
    /**
     * 查询仪器所有信息
     */
    public List<Map> findAllYq(Map map);
    /**
     * 查询仪器所有统计数
     */
    public Integer findAllYqNum(Map map);
    /**
     * 查找需要的检测项目信息
     */
    public List<Map> findAllJcxm(Map map);
    /**
     * 查找所有的检测项目数量
     */
    public Integer findAllJcxmNum(Map map);
    /**
     * 更新检测项目的if_yqfp 是否仪器分配
     */
    public void updataJcxm_If_yqfp(Map map);
    /**
     * 更新仪器项目dqzt 当前的状态
     */
    public void updateYq_dqzt(Map map);
    /**
     * 增加检测项和仪器表
     */
    public void addJcxYq(Map map);
}
