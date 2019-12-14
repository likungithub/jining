package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.Tqywt;
import com.xinhai.caiyun.customermanage.api.Typgl;
import com.xinhai.caiyun.customermanage.api.Tzfwt;
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
public interface TzfwtMapper {
    /*
     * 一对一委托样品信息导入
     * */
    public void createTzfwtliu(@Param("list") List list);

    /**
     * 通过id获取数据
     *
     * @param id
     * @return
     */
    Map findTzfwt(String id);

    /**
     * 通过id获取数据
     *
     * @param id
     * @return
     */
    List<Map> findTzfwtByCydbm(String id);

    /**
     * 通过id获取数据
     *
     * @param id
     * @return
     */
    Tqywt findYddcy(String id);

    /**
     * 通过id获取数据
     *
     * @param id
     * @return
     */
    Typgl getyddcyyp(String id);

    /**
     * 获取全部数据
     * @return
     */
    List<Tqywt> findTzfwtAll(@Param("start") int start, @Param("len") int len, @Param("wtid") String wtid, @Param("ypmc") String ypmc,@Param("cydh") String cydh, @Param("bcjdwmc") String bcjdwmc, @Param("ny") String ny);

    /**
     * 获取全部数据
     * @return
     */
    int findTzfwtAllNums(@Param("start") int start, @Param("len") int len, @Param("wtid") String wtid, @Param("ypmc") String ypmc,@Param("cydh") String cydh,@Param("bcjdwmc") String bcjdwmc, @Param("ny") String ny);

    /**
     * 单条插入数据
     * @param tzfwt
     */
    void createTzfwt(Tqywt tzfwt);

    /**
     * 通过id删除
     * @param
     */
    void deleteTzfwtbyId(@Param("id") String id);

    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertList(List<Tzfwt> list);

    /**
     * 通过id更新数据
     * @param tzfwt
     * @return
     */
    void updateTzfwt(@Param("tqywt") Tqywt tzfwt);

    List<Tzfwt> findAllWt();

    String selectCydbh(String id);

    /**
     * 获取全部数据
     * @return
     */
    List<Typgl> findYddcyypAll(@Param("start") int start, @Param("len") int len, @Param("ypmc") String ypmc, @Param("wtid") String wtid);

    /**
     * 获取全部数据
     * @return
     */
    int findYddcyypAllNums(@Param("start") int start, @Param("len") int len, @Param("ypmc") String ypmc, @Param("wtid") String wtid);

    /**
     * 企业委托登记模块    客户信息 弹出框分页信息查看
     */
    List<Map> getQueryAllCustomerInformationM(@Param("start") int start, @Param("len") int len);

    /**
     * 企业委托登记模块    客户信息 弹出框分页 总数
     */
    Integer getQuerySumCustomerInformationM (@Param("start") int start, @Param("len") int len);

    /**
     * 企业委托登记模块 回显单条客户信息
     * @param id
     * @return
     */
    Map queryCustomerInformationM(@Param("id") String id);

    /**
     * 通过 样品id的集合 删除 这些样品下所有的检测项
     * @param
     */
    void delAllYpJcxm(@Param("ypid") String ypid);

    /**
     * 通过 样品id的集合 删除 这些样品下所有的检测项
     * @param
     */
    public List<String> checkYpbm(@Param("wtid") String  ypbm);;
}
