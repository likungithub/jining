package com.xinhai.caiyun.customermanage.service;

import com.xinhai.caiyun.customermanage.api.TwtJbxx;
import com.xinhai.caiyun.customermanage.api.TjcxmJbxx;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 检测项目管理
 */
public interface TjcxmService {

    /**
     * 通过id获取检测项目数据
     * @param id
     * @return
     */
    TjcxmJbxx findTjcxmJbxx(String id);
    
    
    /**
     * 获取检测项目数据
     * @return
     */
    List<TwtJbxx> findTjcxmJbxxAll(int start, int len, String htmc, String htbh, String htlx, String wtdwmc, Date HtstartDate,
                               Date HtendDate, Date BgstartDate, Date BgendDate, String ywry, String zydm);


    /**
     * 获取全部检测项目数据的数量
     * @return
     */
    int findTjcxmJbxxAllNums(String htmc, String htbh, String htlx, String wtdwmc, Date HtstartDate,
                         Date HtendDate, Date BgstartDate, Date BgendDate, String ywry, String zydm);
    

    /**
     * 单条插入数据
     * @param tjcxm
     */
    void createTjcxmJbxx(TjcxmJbxx tjcxm);

    /**
     * 通过id删除
     * @param
     */
    void deleteTjcxmJbxxbyId(String id);

    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertList(List<TjcxmJbxx> list);

    /**
     * 通过id更新数据
     * @param jcxm
     * @return
     */
    void updateTjcxmJbxx(TjcxmJbxx jcxm);

    /**
     * 检测项目信息
     * @return
     */
    List<Map> findTjcxmlist(int start, int len, String jcxm, String yl, String xl, String zydm,String jclbdm,String ypid,String pdyj,String jyyj);

    /**
     * 检测项目信息列表数目
     */
    int findTjcxmlistNums(String jcxm, String dl, String cyl, String zydm,String jclbdm,String ypid,String pdyj,String jyyj);

    /**
     * 检测项目信息列表
     * @param start
     * @param len
     * @param ypid
     * @return
     */
    List<TjcxmJbxx> findJcxmByYpid(int start, int len, String type, String searchText, String ypid, String zydm);

    /**
     * 检测项目信息列表数目
     * @param ypid
     * @param zydm
     * @return
     */
    int findJcxmByYpidNums(String type, String searchText, String ypid, String zydm);
    /**
     * 导入excel
     */
    public void importJcxmExcel(InputStream in, MultipartFile file) throws Exception;
    /**
     * 删除检测项目
     */
    public  void  delJxcmJbxx(String id);

    //20190830添加新方法列表

    int findTjcxmlistNumsNew(Map map);

    List<Map> findTjcxmlistNew(Map map);
}
