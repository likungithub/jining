package com.xinhai.caiyun.customermanage.dao;


import com.xinhai.caiyun.customermanage.api.Tjcxm;
import com.xinhai.caiyun.customermanage.api.TjcxmJbxx;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface TjcxmMapper {

    /**
     * 获取产品大类名称
     * @return
     */
    List<Map<String,String>> getCpmc(@Param("type") String type);

    /**
    *  获取样品 检测项目关系
     *  @author 郭英旭
     */
     List<Map<String,String>> getYpJcxm(@Param("ypid") String ypid);
     /**
    *  获取样品制备 检测项目关系
     *  @author 郭英旭
     */
     List<Map<String,String>> getYpzbJcxm(@Param("ypid") String ypid);
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

    TjcxmJbxx findTjcxmJbxx(String id);

    /**
     * 通过id更新数据
     * @param jcxm
     * @return
     */
    void updateTjcxmJbxx(TjcxmJbxx jcxm);

    /**
     * 检测项目信息列表
     */
    List<Map> findTjcxmlist(@Param("start") int start, @Param("len") int len,
                                  @Param("jcxm") String jcxm, @Param("yl") String yl,
                                  @Param("xl") String xl, @Param("zydm") String zydm, @Param("jclbdm") String jclbdm,
                            @Param("ypid") String ypid,@Param("pdyj") String pdyj,@Param("jyyj") String jyyj);

    /**
     * 检测项目信息列表数目
     * @return
     */
    int findTjcxmlistNums(@Param("jcxm") String jcxm, @Param("yl") String yl,
                          @Param("xl") String xl,  @Param("zydm") String zydm, @Param("jclbdm") String jclbdm ,@Param("ypid") String ypid,@Param("pdyj") String pdyj,@Param("jyyj") String jyyj);

    void insertYpJcxmList(@Param("ids") List<String> list, @Param("ypid") String ypid);

    void delYpJcxmList(@Param("ypid") String ypid);

    /**
     * 制备 检测项目信息列表数目
     * @return
     * @author 郭英旭
     */
    
    void insertYpzbJcxmList(@Param("ids") List<String> list, @Param("ypid") String ypid);

    void delYpzbJcxmList(@Param("ypid") String ypid);

     
    /**
     * 检测项目信息列表
     * @param start
     * @param len
     * @param ypid
     * @return
     */
    List<TjcxmJbxx> findJcxmByYpid(@Param("start") int start, @Param("len") int len,
                                   @Param("type") String type, @Param("searchText") String searchText,
                                   @Param("ypid") String ypid, @Param("zydm") String zydm);

    /**
     * 检测项目信息列表数目
     * @param ypid
     * @param zydm
     * @return
     */
    int findJcxmByYpidNums(@Param("type") String type, @Param("searchText") String searchText,
                           @Param("ypid") String ypid, @Param("zydm") String zydm);


    /**
     * 将excel表中的数据放到数据库中
     */
    public  void  addJcxmExcel(@Param("list") List<Map> list);
    /**
     * 删除检测项目
     */
    public  void  delJxcmJbxx(@Param("id") String id);

    TjcxmJbxx findJcxm(String id);

    void updateJcxm(Tjcxm tjcxmJbxx);

    /**
     * 新增 检测项
     * @param tjcxmJbxx
     */
    void addJcxm(Tjcxm tjcxmJbxx);
    /**
     * 通过样品id和检测项目id查询样品表的中数据
     */
    public List<String>  getDataByYpidAndJcxmid(@Param("ypid") String ypid,@Param("jcxmid") String jcxmid);

    List<Map> findAddTjcxmlist(@Param("cxtj") Map cxtj);

    Integer findAddTjcxmlistNums(@Param("cxtj") Map cxtj);

    //20190830添加新方法列表findTjcxmlistNumsNew
    Integer findTjcxmlistNumsNew(@Param("cxtj") Map cxtj);

    List<Map> findTjcxmlistNew(@Param("cxtj") Map cxtj);

//    public List<String>  getDataByYpidAndJcxmIdAndName(@Param("ypid") String ypid,@Param("jcxmid") String jcxmid,@Param("jcxmName") String jcxmName);
    public List<String>  getDataByYpidAndJcxmName(@Param("ypid") String ypid,@Param("jcxmName") String jcxmName);
}