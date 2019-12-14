package service;

import java.util.List;
import java.util.Map;

public interface LyckService {
    /**
     * 陈
     * 得到领用出库的信息
     */
    public List<Map> queryLyckAll(Map map);

    /**
     * 陈
     * 得到领用出库的信息的数量
     */
    public Integer queryLyckAllNum(Map map);
    /**陈
     * 保存出库状态
     */
    public void saveCkzt(Map map);
    /**陈
     * 得到库存数量
     */
    public String queryKcNum(String id);
    /**陈
     * 得到领用数量
     */
    public String queryLyNum(String id);
}
