package service;

import java.util.List;
import java.util.Map;

public interface LyspService {
    /**
     * 陈
     * 得到一级审批的信息
     */
    public List<Map> queryLysp1All(Map map);

    /**
     * 陈
     * 得到一级审批的信息的数量
     */
    public Integer queryLysp1AllNum(Map map);

    /**
     * 陈
     * 一级审批通过和退回操作
     */
    public void saveZt1(Map map);

    /**
     * 陈
     * 获得耗材的类型
     */
    public String queryHclxById(String id);

    /**
     * 陈
     * 获得领用申请人
     */
    public String queryLyrById(String id);
    /**
     * 陈
     * 得到二级审批的信息
     */
    public List<Map> queryLysp2All(Map map);

    /**
     * 陈
     * 得到二级审批的信息的数量
     */
    public Integer queryLysp2AllNum(Map map);
    /**
     * 陈
     * 二级审批通过和退回操作
     */
    public void saveZt2(Map map);
}
