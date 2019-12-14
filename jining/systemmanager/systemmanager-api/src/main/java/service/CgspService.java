package service;

import java.util.List;
import java.util.Map;

public interface CgspService {
    /**陈
     *获得审批的数据
     */
    public List<Map> queryCgspXx(Map map);
    /**陈
     *获得审批的数据的数量
     */
    public Integer queryCgspXxNum(Map map);
    /**陈
     * 审批成功和退回操作
     */
    public void  saveSqzt(Map map);
    /**陈
     * 得到退回的消息内容
     */
    public List<Map> queryMess(List<String> ids);
}
