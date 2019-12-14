package service;


import java.util.List;
import java.util.Map;

public interface GztzService {

    /**
     * 根据人员 获取 工作量统计信息
     * @param map
     * @return
     */
    public List<Map> getGzltjByRy(Map map);


    public long getGzltjByRyNum(Map map);
    /**
     * 根据人员 获取 工作量统计信息
     * @param map
     * @return
     */
    public List<Map> getGzltjByRyMx(Map map);


    public long getGzltjByRyMxNum(Map map);

}
