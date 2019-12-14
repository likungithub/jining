package service;

import java.util.List;
import java.util.Map;

public interface CgshService {
    /**
     *获得采购审核的数据
     */
    public List<Map> queryCgshXx(Map map);
    /**
     *获得审核的数据的数量
     */
    public Integer queryCgshXxNum(Map map);
    /**
     * 审批成功和退回操作
     */
    public void  saveShzt(Map map);
    /**
     * 得到退回的消息内容
     */
    public List<Map> queryMess(List<String> ids);
}
