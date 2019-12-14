package service;

import java.util.List;
import java.util.Map;

public interface RyglService {
    /**
     * 查询人员的基本信息
     * */
    public List<Map> selectRygl(Map map);
    public Integer selectRyglCount(Map map);
    /**
     * 新增人员信息
     */
    public void addRygl(Map map);
    /**
     * 删除人员信息
     */
    public void deleteRygl(Map map);
    /**
     * 修改人员基本
     */
    public void updateRygl(Map map);
}
