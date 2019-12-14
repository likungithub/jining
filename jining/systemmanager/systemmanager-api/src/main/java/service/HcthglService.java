package service;

import java.util.List;
import java.util.Map;

public interface HcthglService {
    /**
     * 得到领用申请的信息
     */
    public List<Map> queryHcthglAll(Map map);

    /**
     * 得到领用申请的信息的数量
     */
    public Integer queryHcthglAllNum(Map map);
    /**
     *得到报告的数据  通过id的集合
     */
    public  List<Map> getReportData(List ids);
    /**
     * 删除耗材领用管理的数据  通过id的集合
     */
    public void  delThgl(List ids);
}
