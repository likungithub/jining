package service;
import java.util.List;
import java.util.Map;

public interface LysqService {
    /**陈
     *得到领用申请的信息
     */
    public List<Map> queryLysqAll(Map map);
    /**陈
     * 得到领用申请的信息的数量
     */
    public Integer queryLysqAllNum(Map map);
    /**
     * 陈
     * 通过hcbm  在采购入库表中查找信息
     */
    public List<Map> queryCgrkByHcbm(String hcbm);

    /**
     * 陈
     * 将采购入库中的数据放入领用表中  也就是入库表中的id
     */
    public void addHclyFromCgrk(Map map);

    /**
     * 陈
     * 根据耗材编码查找id
     * t_cgrk_jbxx
     */
    public List<String>  queryIdByHcbm(String hcbm);
    /**陈
     * 删除库存信息
     */
    public void  delLysq(String id);
    /**
     * 陈
     * 得到库存的数量
     */
    public String queryKcNum(String hcbm);
}
