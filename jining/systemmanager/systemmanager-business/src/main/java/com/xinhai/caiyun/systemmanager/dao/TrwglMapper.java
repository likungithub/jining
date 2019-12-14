package com.xinhai.caiyun.systemmanager.dao;


import com.xinhai.caiyun.systemmanager.api.T_ypgl;
import com.xinhai.caiyun.systemmanager.api.Trwgl;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 任务管理
 */
@Repository
public interface TrwglMapper {

    /**
     * 通过id获取任务数据
     * @param id
     * @return
     */
    Trwgl findTrwgl(String id);

    /**
     * 单条插入任务数据
     * @param Trwgl
     */
    void createTrwgl(Trwgl Trwgl);

    /**
     * 通过id删除
     * @param
     */
    void deleteTrwglbyId(Trwgl Trwgl);

    /**
     * 批量删除
     * @param
     */
    void deleteTrwgl(List<String> id);

    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertList(List<Trwgl> list);

    /**
     * 通过id更新数据
     * @param ypgl
     * @return
     */
    void updateTrwgl(Trwgl ypgl);

    /**
     * 任务信息列表
     * @param start
     * @param len
     * @param type
     * @param searchText
     * @return
     */
    List<Trwgl> findTrwgllist(@Param("start") int start, @Param("len") int len, @Param("rwType") String rwType,
                              @Param("wtType") String wtType, @Param("searchText") String searchText, @Param("zydm") String zydm,@Param("rwzt") String rwzt);

    /**
     * 任务信息列表数目
     * @param type
     * @param searchText
     * @return
     */
    int findTrwgllistNums(@Param("rwType") String rwType, @Param("wtType") String wtType, @Param("searchText") String searchText, @Param("zydm") String zydm);

    void updateCYYP(@Param("yp") T_ypgl ypgl);

    /**
     * 更新任务状态
     * @param id
     * @param idlist
     */
    void updateBlzt(@Param("idlist") Integer[] idlist,@Param("blzt") String blzt,@Param("if_jd") String if_jd);
    void updateBlzt002(@Param("idlist") Integer[] idlist);
    void deleteRw(@Param("ypbm") String[] ypbm);
    void gxrwwry(@Param("wtid")String[] wtid,@Param("zxry")String zxry);
    Integer getYpId(@Param("ypbm") String ypbm);
    String updatejszt(@Param("id") String id,String jszt);

    /**
     * 通过wtid更新数据
     * @param trwgl
     */
    void updateTrwglWtid(Trwgl trwgl);

}
