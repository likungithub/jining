package com.xinhai.caiyun.customermanage.api;

import com.xinhai.caiyun.systemmanager.api.Zjgl;

import java.util.List;
import java.util.Map;

public interface JcglService {
    /**陈
     *获得检测管理的所有数据数量
     */
    long findCount(Map cxtj);

    /**陈
     * 获得检测管理的所有数据
     */
    List<Map> findAll(Map cxtj);

    List<Map> jcxmAll(Map cxtj);

    void insert(List<Map> mapList);

    /**陈
     *修改检测管理中的所有状态
     */
    void updatezt(List<Map> data);

    List<Map> sjxg_queryList(Map cxtj);

    void sjxg_update(List<Map> cxtj);
    /**陈
     * 获得退回记录信息
     */
    public List<Map> findThjlList(Map map);
    /**陈
     * 获得退回记录信息的数量
     */
    public Integer findThjlListNum(Map map);
    /**陈
     * 删除退回记录信息
     */
    public void  delThjlByIds(List<String> list);
    /**陈
     * 获得检验结果录入的信息
     */
    public List<Map> findJcxxlrList( Map map);
    /**陈
     * 获得检验结果录入的信的数量
     */
    public Integer findJcxxlrListNum(Map map);
    /**陈
     * 通过仪器的id集合获得仪器的名称集合
     */
    public List<String> queryYqNameByIds(List ids);
    /**陈
     * 获得主检人的信息
     */
    public List<String> getZJR(Map map);
    /**陈
     *将主检人到数据库中  t_ypgl_jbxx
     */
    public void  saveZJR(Map map);
    /**陈
     * 查找样品中的是否是水食品工业产品    if_ssg
     */
    public  String  queryIf_ssg(String ypid);
    /**陈
     * 检测项任务分配
     */
    public void  rwfp_ypjc(Map map);

    /**
     *获得 样品检测任务领取 所有数据数量
     */
    long findLWLQCount(Map map);

    /**
     * 获得 样品检测任务领取 所有数据
     */
    List<Map> findLWLQAll(Map map);

    /**
     * 样品检测任务领取 操作
     */
    void upTaskCollection(Map map);
    String findYpJcZt(Map map);

    //20190916添加审核环节
    void updateztSh(List<Map> data);
}