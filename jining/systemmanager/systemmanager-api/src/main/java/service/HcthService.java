package service;

import java.util.List;
import java.util.Map;

public interface HcthService {
    /**
     * 得到领用申请的信息
     */
    public List<Map> queryHcthAll(Map map);

    /**
     * 得到领用申请的信息的数量
     */
    public Integer queryHcthAllNum(Map map);

    /**
     * 通过hcbm  在采购入库表中查找信息
     */
    public List<Map> queryCgrkByHcbm(String hcbm);

    /**
     * 将采购入库中的数据放入领用表中  也就是入库表中的id
     */
    public void addHcthFromCgrk(Map map);
    /**
     * 删除退回信息
     */
    public void delHcth(String id);
}
