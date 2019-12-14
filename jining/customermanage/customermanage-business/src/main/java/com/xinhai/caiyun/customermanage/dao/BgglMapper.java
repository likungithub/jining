package com.xinhai.caiyun.customermanage.dao;


import com.xinhai.caiyun.customermanage.api.Jcx;
import com.xinhai.caiyun.customermanage.api.Khxxgl;
import com.xinhai.caiyun.customermanage.api.Tqywt;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Repository
public interface BgglMapper {

    long findCount(@Param("cxtj") Map cxtj);

    List<Map> findAll(@Param("cxtj") Map cxtj);

    List<Map> sjxg_queryList(@Param("cxtj") Map cxtj);

    void sjxg_update(@Param("cxtj") List<Map> cxtj);

    void insert(@Param("data") List<Map> mapList);

    long findCyrwCount(@Param("cxtj") Map cxtj);

    List<Map> findCyrwAll(@Param("cxtj") Map cxtj);

    void updatezt(@Param("data") List<Map> data);


    void updatebg(@Param("data") List<Map> data);
    HashMap<String,Object> getYplzd(@Param("ypbm") String ypbm);
    List<Jcx> getYplzdjcxm(@Param("ypbm") String ypbm);
    HashMap<String,Object> getbgbz(@Param("id") String id);
    HashMap<String,Object> getbgsh(@Param("id") String id);
    HashMap<String,Object> getbgpz(@Param("id") String id);
    HashMap<String,Object> getypdj(@Param("ypbm") String ypbm);
    void updateLZLJ(@Param("lzlj") String lj,@Param("ypbm") String ypbm);
    String selectLZLJ(@Param("ypbm") String ypbm);
    Map getlzinfo(@Param("ypbm") String ypbm);
    List<Map> getjyyj(@Param("id") String id);
    HashMap<String,Object> getyply(@Param("ypbm") String ypbm);
    HashMap<String,Object> getypzb(@Param("ypbm") String ypbm);
    HashMap<String,Object> getbgdy(@Param("id") String id);
    List<Map> findById(String id);

    List<Map> findJcx(String id);

    List<Map> findFfbz(String id);

    List<Map> findjczz(String id);

    List<Map> findjcrq(String id);

    List<Map> getjcyj(String id);

    List<Map> findjyyq(String id);

    String selectBGLJ(@Param("ypbm") String ypbm);
    String getDzqz(@Param("zydm") String zydm);
    Integer findZbsl(@Param("ypbm") String ypbm);
//    获取抽样执行人员
    String findCyzxry(@Param("ypbm") String ypbm);
    List<Map> findById1(@Param("id")String id);
    List<Map> findjcz(@Param("id")String id);
    Map findxhbg(@Param("ypbm") String ypbm);
    void ypxhbg(@Param("yplj") String yplj,@Param("ypbm") String ypbm);
    String findypxhbg(@Param("ypbm") String ypbm);
    /*技术负责人*/
    Map findJs(@Param("ypbm")String ypbm);
    /*经办人*/
    Map findJbr(@Param("ypbm")String ypbm);
    /*更改报告状态*/
    void updateBgIF_ZX(@Param("map") String map);

    void updateIF_JC(@Param("id") String id);
    Map findCyinfo(@Param("id") String id);
    String ifZy(@Param("id") String id);
    List<Map> getlyinfo(@Param("ypbm") String ypbm);
    /**
     * 获得人员的信息
     */
    public List<Map> rydm(@Param("bmmc") String bmmc);
    //报告审核批准人
    public List<Map> shrydm();
    public List<Map> pzrydm();
    public List<Map> zjrydm();

    /**
     *增加bgbl_rydm
     */
    public  void  addBgfpAll(@Param("map") Map map);
    /**
     * 修改报告编制状态
     */
    public  void updateBgbzzt(@Param("map") Map map);
    /**
     * 修改报告审核状态
     */
    public  void updateBgshzt(@Param("map") Map map);
    /**
     * 修改报告批准状态
     */
    public  void updateBgpzzt(@Param("map") Map map);
    /**
     * 修改报告打印状态
     */
    public  void updateBgdyzt(@Param("map") Map map);
    Map findfmInfo(@Param("ypbm") String ypbm);
    Map getypinfo(@Param("ypbm") String ypbm);
    String getMaxTime(@Param("ypid")String ypid);

    //报告退回原因
    public  void updatethyy(@Param("map") Map map);

     // 获得退回记录信息
    public List<Map> findThjlList(@Param("map") Map map);
    // 获得退回记录信息的数量
    public Integer findThjlListNum(@Param("map") Map map);
    // 删除退回记录信息
    public void  delThjlByIds(@Param("list") List<String> list);
    //查询报告基本信息  生成委托报告
    List<Map> findBgsj(String id);
    //更新委托报告路径
    void updateWtbglj(@Param("id1") String id1,@Param("wtbglj") String wtbglj);
    //通过样品ID获取最大和最小温度
    Map selectwd(String id);
    //通过样品ID获取最大和最小湿度
    Map selectsd(String id);
    //通过样品ID获取最大和最小检测日期
    Map selectjcrq(String id);
    //通过样品id获取检测依据
    List<String> getlzjcyj(String id);
    //更新报告生成时间
    void updateBgscsj(@Param("id") String id,@Param("bgscsj") String bgscsj, @Param("bgjyjl") String bgjyjl, @Param("bgjyjlbz") String bgjyjlbz);
    //查询一对一抽样报告基本信息  生成委托报告
    List<Map> findYdybgsj(String id);
    //通过样品id查询检测方法
    List<String> findjcff(String id);
    //更新一对多抽样报告路径
    void updateYddcybglj(@Param("id") String id,@Param("yddcybglj") String yddcybglj);
    //查询报告基本信息  生成委托报告
    List<Map> findBgsjydd(String id);
    //通过wtid获得最大样品编码和最小样品编码
    Map selectYpid(String id);
    //通过wtid获得最大样品编码和最小样品编码
    List<String> selectGgxh(String id);
    List<String> selectYpdj(String id);
    //获取温度湿度
    Tqywt findWdsd(String id);
    //修改温湿度
    void updateWdsd(Tqywt tqywt);
    /**
     * 获取抽样报告基本信息
     */
     Map findCyjbInfo(@Param("wtid")String wtid);
    /**
     * 获取判断依据
     */
    Map findPdyj(@Param("ypid")String ypid);
    /**
     * 检测项目Table
     */
    List<Map> findJcxmTable(@Param("ypid")String ypid);
    /**
     * 通过wtid获取ypid
     */
    String findYpidByWtid(@Param("wtid")String wtid);
    /**
     * 获取主检审批
     */
    Map findZJSP(@Param("ypid")String ypid);
    /**
     * 获取报告批准
     */
    Map findBGPZ(@Param("ypid")String ypid);
    /**
     * 获取报告审核
     */
    Map findBGSH(@Param("ypid")String ypid);
    /**
     * 获取报告审核
     */
    Map findBGBZ(@Param("ypid")String ypid);
    //打印委托报告
    public List<Map> dywtbg(@Param("map") Map map);
    //插入编制日期
    public void insertBzrq(@Param("map") Map map);
    //插入报告打印人和日期
    public void insertBgdyry(@Param("map") Map map);

    //获取检验报告类型
    public String bglx(@Param("map") Map map);
    //查询检测项
    public List<Map> cxJcxm(@Param("map") Map map);
    //查询仪器检测表
    public List<Map> yqsb(@Param("map") Map map);
    //查询仪器制备表
    public List<Map> yqsbz (@Param("map") Map map);
    //插入委托表readonly状态，不可修改
    public void upReadonly(@Param("map") Map map);
    //通过样品编码查询样品id
    public String selectid (@Param("map") Map map);
    //退回操作 1
    public void upThbg(@Param("wtid") String wtid);
    //退回操作 2
    public void upThYPbg(@Param("ypid") String ypid);
    //退回时查询委托受理人
    Map findWtinfo(@Param("wtid") String wtid);
    //查询打印流转单内容
    public List<Map> seLzd(@Param("map") Map map);
    //查询打印流转单检测项目
    public List<Map> seLzdJcxm(@Param("map") Map map);
    //查询检测项目温度和湿度
    public List<Map> wdAndSd(@Param("map") Map map);
    public void updateBgLj(@Param("map") Map map);

    public List<Map> findBgLjForPldy(@Param("list") List<String> list);

    //根据默认操作类型 获取 默认操作人员
    public List<Map> findMrCzry(@Param("mrfl_bz") String mrfl_bz);


    String getBgljByYpbm(@Param("ypbm")String ypbm);

    void updateByljByYpbm(@Param("ypbm")String ypbm,@Param("bglj")String bglj);
    //根据 Id获取打印流转单 所有的 复核人员
    public List<String> findFhry(@Param("ypid") String ypid);

    //生成报告时 会写  检测项 结果信息
    void bgbzJcxUpdate(@Param("jcxList") List<Map> jcxList);

    //获取不合格报告
    List<Map> getBhgBg(@Param("cxtj") Map cxtj);

    List<Map> ysjlInfo(@Param("map") Map map);

    //20190917添加退回跳过批准
    void updateztNew(@Param("data") List<Map> data);
    //20190918添加获取温湿度新方法
    public List<Map> wdAndSdNew(@Param("map") Map map);
}