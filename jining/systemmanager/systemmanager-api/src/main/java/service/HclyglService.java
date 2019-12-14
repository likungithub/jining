package service;

import java.util.List;
import java.util.Map;

public interface HclyglService {
    /**
     *
     * 得到领用出库的信息
     */
    public List<Map> queryLyglAll(Map map);

    /**
     *
     * 得到领用出库的信息的数量
     */
    public Integer queryLyglAllNum(Map map);
    /**
     *得到报告的数据  通过id的集合
     */
    public  List<Map> getReportData(List ids);
    /**
     * 删除耗材领用管理的数据  通过id的集合
     */
    public void  delLygl(List ids);
}
