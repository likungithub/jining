package com.xinhai.caiyun.customermanage.service;

import com.xinhai.caiyun.customermanage.api.Tqywt;
import com.xinhai.caiyun.customermanage.api.Typgl;
import com.xinhai.caiyun.customermanage.api.Tzfwt;
import org.jboss.logging.Param;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 样品管理
 */
public interface TzfwtService {

    /**
     * 通过id获取数据
     * @param id
     * @return
     */
    Map findTzfwt(String id);
    /**
     * 通过id获取数据
     * @param id
     * @return
     */
    List<Map> findTzfwtByCydbm(String id);
    /**
     * 获取全部数据
     * @return
     */
    List<Tqywt> findTzfwtAll(int start, int len, String wtid, String ypmc,String cydh, String bcjdwmc, String ny);

    /**
     * 获取全部数据的数量
     * @return
     */
    int findTzfwtAllNums(int start, int len, String wtid, String ypmc,String cydh,String bcjdwmc, String ny);

    /**
     * 获取全部数据
     * @return
     */
    List<Typgl> findYddcyypAll(int start, int len, String ypmc, String wtid);

    /**
     * 获取全部数据的数量
     * @return
     */
    int findYddcyypAllNums(int start, int len, String ypmc, String wtid);

    /**
     * 单条插入数据
     * @param tqywt
     */
    void createTzfwt(Tqywt tqywt);

    /**
     * 通过id删除
     * @param
     */
    void deleteTzfwtbyId(String id);

    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertList(List<Tzfwt> list);

    /**
     * 通过id更新数据
     * @param id
     * @param ypgl
     * @return
     */
    void updateTzfwt(Tqywt ypgl);

    List<Tzfwt> findAllWt();
    /**
     * 导入excel
     */
    public void importydywtExcel(InputStream in, MultipartFile file) throws Exception;

    /**
     * 企业委托登记模块    客户信息 弹出框分页信息查看
     */
    public List<Map> getQueryAllCustomerInformation(int start, int len);

    /**
     * 企业委托登记模块    客户信息 弹出框分页 总数
     */
    Integer getQuerySumCustomerInformation (int start, int len);



}
