package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.Tqywt;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by  on 2018/3/28 0028.
 *
 * @escription:
 * @tableName:
 */
@Repository
public interface TqywtMapper {

    /**
     * 通过id获取数据
     * @param id
     * @return
     */
    Tqywt findTqywt(String id);
    Tqywt findTqywtByYpbm(String ypbm);

    /**
     * 单条插入数据
     * @param tqywt
     */
    void createTqywt(Tqywt tqywt);

    /**
     * 获取全部数据
     * @return
     */
    List<Tqywt> findTqywtAll(@Param("start") int start, @Param("len") int len, @Param("wtdwmc") String wtdwmc, @Param("ypmc") String ypmc, @Param("type") String type, @Param("ypbm") String ypbm, @Param("ny") String ny);

    /**
     * 获取全部数据
     * @return
     */
    int findTqywtAllNums(@Param("start") int start, @Param("len") int len, @Param("wtdwmc") String wtdwmc, @Param("ypmc") String ypmc, @Param("type") String type, @Param("ypbm") String ypbm, @Param("ny") String ny);

    /**
     * 获取全部送样数据
     * @return
     */
    List<Tqywt> findTqywtAllsy(@Param("start") int start, @Param("len") int len, @Param("wtid") String wtid);

    /**
     * 获取全部送样数据数量
     * @return
     */
    int findTqywtAllNumssy(@Param("start") int start, @Param("len") int len, @Param("wtid") String wtid);

    /**
     * 通过id删除
     * @param
     */
    void deleteTqywtbyId(@Param("id") String id);

    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertList(List<Tqywt> list);

    /**
     * 通过id更新数据
     * @param ypgl
     * @return
     */
    void updateTqywt(@Param("tqywt") Tqywt ypgl);

    /**
     * 获取委托ID最大值
     * @param s
     * @return
     */
    String findWtid(String s);

    /**
     * 通过id查询单条数据生成委托单
     * @param id
     * @return
     */
    List<Map> findById(String id);
    void updateWtdlj(@Param("id") String id,@Param("wtdlj") String wtdlj);
    String getWtdljById(@Param("id")String id);

    /**
     * 根据样品id查询委托报告路经
     * @param ypid
     * @return
     */
    String getWtbgljById(@Param("ypid")String ypid);
    /**
     * 根据委托id查询委托报告路经
     * @param id
     * @return
     */
    String getYddcybgljById(@Param("id")String id);
    /**
     * 通过id查询委托id
     * @param id
     * @return
     */
    String findwtidw(String id);

    /**
     * 通过检测项目id查询检测项
     * @param id
     * @return
     */
    String findJcxm(String id);

    /**
     * 通过wtid查询ypid
     * @param wtid
     * @return
     */
    String findypid(String wtid);

    /**
     * 通过样品编码查询样品id
     * @param ypbm
     * @return
     */
    String findYpidByYpbm(String ypbm);

    /**
     * 通过抽样单编号查询ypid
     * @param wtid
     * @return
     */
    String findcyypid(String wtid);

    /**
     * 通过委托id插入检测项
     * @param jcxm
     * @param id
     */
    void insertjcxm(@Param("jcxm") String jcxm,@Param("id") String id);

    /**
     * 通过id修改样品状态
     * @param id
     */
    void updateYpzt(String id);

    /**
     * 通过ypid查询wtid
     * @param id
     * @return
     */
    String findwtidd(String id);

    String findid(String wtid);

    void updateslQYWT(@Param("id") String id,@Param("if_sl") String if_sl,@Param("wtslr") String wtslr,@Param("slrq") String slrq);

    /**
     * 通过id查询抽样单编号
     * @param id
     * @return
     */
    String findcydbh(String id);

    /**
     * 通过样品id查询委托id
     */
    String selectwtid(String id);
    /**
     * 通过委托id查询(查询状态)
     * @param id
     * @return
     */
    String findCxzt(String id);

    /**
     * 查询委托受理人
     * @param id
     * @return
     */
    String getTjry(String id);
    /**
     * 查询委托受理人
     * @param ypid
     * @return
     */
    String getBgzjsp(String ypid);
    /**
     * 查询委托受理人
     * @param ypid
     * @return
     */
    String getBgsh(String ypid);
    /**
     * 查询委托受理人
     */
    String getBgpz(String ypid);
    /**
     * 通过ypid获得对应下的所有样品信息
     */
    public List<Map> getJcxmDataByYpid(@Param("map") Map map);
    /**
     * 通过ypid获得对应下的所有样品信息的数量
     */
    public Integer getJcxmDataNumByYpid(@Param("map") Map map);
    /**
     * 通过样品id和检测项目id  删除对应的检测项目
     */
    public void delYpJcxm(@Param("list") List<Map> list);
    /**ch
     * 查看样品编码是否存在
     */
    public List<String> checkYpbm(@Param("ypbm") String  ypbm);
    /**ch
     * 查看委托id是否存在
     */
    public List<String> checkWtid(@Param("wtid") String  wtid);
    //通过委托id查询样品
    public List<Map> findYpidByWtid(@Param("map") Map map);
    //通过委托抽样单编码查询样品
    public List<Map> findYpidByCydbm(@Param("map") Map map);
    //通过委托id打印委托
    public List<Map> findwtByWtid(@Param("map") Map map);
    //查询检测项目总数
    public String jcxmAllCount();
    //查询样品检测项目
    public String ypJcxm(@Param("map") Map map);
    //通过样品编码查询样品名称
    public String findYpmc(@Param("map") Map map);
    //通过样品编码查询样品抽样单号
    public String findCydbm(@Param("map") Map map);
    //提交功能，该表readOnly 值
    void tjUpdateIf_sl(@Param("id") String id,@Param("if_sl") String if_sl);

    public List<Map> getDwInfo(@Param("val") String val);

    /**
     * 企业委托保存前判断，委托单编码、样品编码、执行标准是否存在，存在了就不保存了。
     * @param map
     * @return
     */
    public Integer findWtForSave(@Param("map") Map map);
    public Map findWtInfoById(@Param("id") String id);
}
