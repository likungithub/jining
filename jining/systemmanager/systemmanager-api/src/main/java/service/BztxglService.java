package service;
import java.util.*;
public interface BztxglService {
    /**
     * 获取标准项目管理所有表数据
     * @return 返会所有数据
     */
    public List<Map> findAllBzxmgl(Map map);
    /**
     * 统计标准项目管理数量
     *
     * @return
     */
    public Integer findBzxmglNum(Map map);
    /**
     * 标准项目管理 增加检测项目信息
     */
    public void addBzxmglJcx(Map map);
    /**
     * 查找ypid 和 jcxmid
     */
    public Map findYJid(Integer yjid);
    /**
     * 通过ypid 查找样品信息
     */
    public Map findOneYp(Integer ypid);
    /**
     * 通过jcxmid 查找检测项目
     */
    public  Map findOneJcxm(Integer jcxmid);
    /**
     *更新检测项目
     */
    public void updateJcxm(Map map);
    /**
     *更新样品
     */
    public void updateYp(Map map);
    /**
     * 通过样品id 删除样品
     */
    public void delYpById(Integer id);
}
