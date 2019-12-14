package service;

import java.util.List;
import java.util.Map;

public interface BzwjglService {
    /***
     * 查找所有文件信息
     * @param map
     * @return
     */
    public List<Map> findAllBzwjgl(Map map);
    /**
     * 统计所有文件数
     */
    public  Integer findAllBzwjglNum(Map map);
    /**
     * 新增标准项目文件
     */
    public void addlBzwjgl(Map map);
    /**
     * 删除标准项目文件
     */
    public void delBzwjgl(Integer id);
    /**
     * 修改标准项目文件
     */
    public void enditBzwjgl(Map map);
    /**
     * 通过id获得一个tBzwjgl数据
     */
    public Map findOneBzwjgl(Integer id);
    /**
     * 审核事件
     */
    public void addShenhe(Map map);
    /**
     * 修订事件
     */
    public void addXiuding(Map map);
    /**
     * 借阅事件
     */
    public void addJieyue(Map map);
    /**
     * 回收事件
     */
    public void addHuishou(Map map);

}
