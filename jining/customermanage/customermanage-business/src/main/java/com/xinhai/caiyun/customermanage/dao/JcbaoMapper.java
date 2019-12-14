package com.xinhai.caiyun.customermanage.dao;
import com.xinhai.caiyun.customermanage.api.Jcb;
import com.xinhai.caiyun.customermanage.api.Jcxmbgl;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface JcbaoMapper {
    List<Map> getAll(@Param("start") Integer start, @Param("length") Integer length, @Param("jcbname") String jcbname);
    List<Map> getAllJcx(@Param("start") Integer start, @Param("length") Integer length, @Param("jcbid") String jcbid);
    List<Map> getAllJcxNew(@Param("jcbid") String jcbid);
    Map findJcbinfo(@Param("jcbid") String jcbid);
    void addJcx(@Param("list") List list, @Param("jcbid") String jcbid, @Param("jcbname") String jcbname, @Param("jcbdl") String jcbdl);
    List<String> getAllJcxId(@Param("jcbid") String jcbid);
    void deletejcx(@Param("list") List list, @Param("jcbid") String jcbid);
    void addjcb(@Param("jcbname") String jcbname, @Param("jcbdl") String jcbdl, @Param("jcbid") String jcbid);
    void insertYpJcxmList(@Param("jcxids") List jcxids, @Param("ypid") String ypid);
    List<Map> findAll(@Param("ypmc") String ypmc,@Param("wtdwmc") String wtdwmc,@Param("start") Integer start,@Param("length") Integer length,@Param("zydm")String zydm);
    //查询检测包数量
    Long getAllCount(@Param("jcbname") String jcbname);
    Long JcbCount();
    Long JcxSl(@Param("jcbid") String jcbid);
    String findWtidById(@Param("id") String id);
    //查询导入检测项id
    public String selectJcxmId(@Param("map") Map map);
    //插入检测项目表导入数据
    public void insertJcxm(@Param("map") Map map);
    //插入检测包表导入数据
    public void insertJcb(@Param("map") Map map);
    //根据检测包查询检测项
    public Jcxmbgl findByJcbid(@Param("id")String id);
    //根据检测包ID查询检测包
    public Jcb findJcbByJcbid(@Param("map")Map map);
    //查询检测项id
    public List<Jcxmbgl> jcxid(@Param("map") Map map);
    //查询检测项id
    public List<Map> jcbid(@Param("map") Map map);
    public String selectJbcmc(@Param("map") Map map);
    //删除检测包 2019.06.30新加
    void deletejcb(@Param("list") List list);

    void updatejcbName(@Param("jcbmc") String jcbmc,@Param("jcbid") String jcbid);

    List<Map> getJcbByJcbAndJcxMc(@Param("start") Integer start, @Param("length") Integer length, @Param("jcbid") String jcbid,@Param("jcxMc") String jcxMc);
    Long getJcbByJcbAndJcxMcNum(@Param("jcbid") String jcbid,@Param("jcxMc") String jcxMc);
    //20190830添加新方法
    void updatejcbNameNew(@Param("map") Map map);
}
