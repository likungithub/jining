package service;
import java.util.List;
import java.util.Map;

public interface FxxmdjService {
    /**
     * c查找所有的检测项目信息
     * @return
     */
    public List<Map> findAllFxxmdj(Map map);
    /**
     * 查找所有的检测项数量
     * @return
     */
    public Integer findAllFxxmdjNum(Map map);
    /**
     * 通过id删除一条数据
     */
    public void deleteFxxmdjById(Integer id);
    /**
     * 增加标准库查询的信息
     */
    public void addFxxmdj(Map map);
    /**
     * 通过id获得单个值
     */
    public Map findFxxmdjById(Integer id);
    /**
     * 更新数据
     * @param map
     */
    public void updateFxxmdj(Map map);

}
