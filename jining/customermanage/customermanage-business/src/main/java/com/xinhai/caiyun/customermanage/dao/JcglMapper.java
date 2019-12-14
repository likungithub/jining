package com.xinhai.caiyun.customermanage.dao;


import com.xinhai.caiyun.systemmanager.api.Zjgl;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface JcglMapper {
    /**陈
     * 得到样品检测的所有数量
     * @param cxtj
     * @return
     */
    long findCount(@Param("cxtj") Map cxtj);

    /**陈
     * 得到样品检测的所有信息
     * @param cxtj
     * @return
     */
    List<Map> findAll(@Param("cxtj") Map cxtj);

    List<Map> jcxmAll(@Param("cxtj") Map cxtj);

    List<Map> sjxg_queryList(@Param("cxtj") Map cxtj);

    void sjxg_update(@Param("cxtj") List<Map> cxtj);

    void insert(@Param("data") List<Map> mapList);

    long findCyrwCount(@Param("cxtj") Map cxtj);

    List<Map> findCyrwAll(@Param("cxtj") Map cxtj);

    void updatezt(@Param("data") List<Map> data);

    void updateWtLrry(@Param("ypbm") String ypbm,@Param("zxry") String zxry);
    /**陈
     * 查找样品检测项是否全部检测完成
     */
    public List<Map> findTjztByYpid(@Param("ypid") String ypid);
    /**陈
     * 将退回信息放入数据库中
     */
    public void backReason(@Param("map") Map map);
    /**陈
     * 通过部门名称获得人员的代码
     */
    public List<Map> findAllRydmByBmmc(@Param("map") Map map);
    /**陈
     * 获得退回记录信息
     */
    public List<Map> findThjlList(@Param("map") Map map);
    /**陈
     * 获得退回记录信息的数量
     */
    public Integer findThjlListNum(@Param("map") Map map);
    /**陈
     * 删除退回记录信息
     */
    public void  delThjlByIds(@Param("list") List<String> list);
    /**陈
     * 获得检验结果录入的信息
     */
    public List<Map> findJcxxlrList(@Param("map") Map map);
    /**陈
     * 获得检验结果录入的信的数量
     */
    public Integer findJcxxlrListNum(@Param("map") Map map);
    /**陈
     * 通过仪器的id集合获得仪器的名称集合
     */
    public List<String> queryYqNameByIds(@Param("ids") List ids);
    /**陈
     * 获得主检人的信息
     */
    public List<String> getZJR(@Param("map") Map map);
    /**陈
     *将主检人到数据库中  t_ypgl_jbxx
     */
    public void  saveZJR(@Param("map") Map map);
    /**陈
     * 查找样品中的是否是水食品工业产品    if_ssg
     */
    public  String  queryIf_ssg(@Param("ypid") String ypid);
    /**陈
     * 检测项任务分配
     */
    public void rwfp_ypjc(@Param("map") Map map);

    /**
     *获得 样品检测任务领取 所有数据数量
     */
    long findLWLQCount(@Param("map") Map map);

    /**
     * 获得 样品检测任务领取 所有数据
     */
    List<Map> findLWLQAll(@Param("map") Map map);

    /**
     * 样品检测任务领取 操作
     */
    void upTaskCollection(@Param("map") Map map);

    String findYpJcZt(@Param("map") Map map);
    //20190916添加审核环节
    void updateztSh(@Param("data") List<Map> data);
}