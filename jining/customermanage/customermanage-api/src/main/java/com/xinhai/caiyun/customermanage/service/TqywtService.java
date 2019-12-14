package com.xinhai.caiyun.customermanage.service;

import com.xinhai.caiyun.customermanage.api.Tqywt;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 样品管理
 */
public interface TqywtService {

    /**
     * 通过id获取数据
     * @param id
     * @return
     */
    Tqywt findTqywt(String id);

    /**
     * 获取全部数据
     * @return
     */
    List<Tqywt> findTqywtAll(int start, int len, String wtdwmc, String ypmc, String type, String ypbm, String ny);
    //, Date BgstartDate, Date BgendDate , Date HtstartDate, Date HtendDate

    /**
     * 获取全部数据的数量
     * @return
     */
    int findTqywtAllNums(int start, int len, String wtdwmc, String ypmc, String type, String ypbm, String ny);
    //, Date BgstartDate, Date BgendDate , Date HtstartDate, Date HtendDate

    /**
     * 获取全部送样数据
     * @return
     */
    List<Tqywt> findTqywtAllsy(int start, int len, String wtid);

    /**
     * 获取全部送样数据的数量
     * @return
     */
    int findTqywtAllNumssy(int start, int len, String wtid);

    /**
     * 单条插入数据
     * @param tqywt
     */
    void createTqywt(Tqywt tqywt);

    /**
     * 通过id删除
     * @param 
     */
    void deleteTqywtbyId(String id);

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
    void updateTqywt(Tqywt ypgl);

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

    Integer findWtForSave(Map map);
}
