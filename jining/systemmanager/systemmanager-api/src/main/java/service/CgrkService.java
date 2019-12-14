package service;

import java.util.List;
import java.util.Map;

public interface CgrkService {
    /**
     * 陈
     * 得到采购入库的信息
     */
    public List<Map> selectCgrk(Map map);

    /**
     * 陈
     * 得到采购入库的信息
     */
    public Integer selectCount(Map map);

    /**
     * 陈
     * 通过hcbm  在采购申请表中查找信息
     */
    public List<Map> queryCgsqByHcbm(String hcbm);

    /**
     * 陈
     * 将申请表中的信息 放入入库表中
     */
    public void addCgrkFromCgsq(Map map);
    /**
     * 陈
     * 根据耗材编码查找id
     * t_cgrk_jbxx
     */
    public List<String>  queryIdByHcbm(String hcbm);
}
