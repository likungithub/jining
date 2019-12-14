package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.Bgjcxm;
import com.xinhai.caiyun.customermanage.api.Bgzxx;
import com.xinhai.caiyun.customermanage.api.Tqywt;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface CydxxglMapper {
    //查询抽样单信息列表
    public List<Map> selectCydLong(@Param("map") Map map);
    public Integer selectCydLogCount(@Param("map") Map map);
    /*导入操作*/
    public void importcydExcel(@Param("map")Map map);
    //存储导入日志
    public void insertWtLog(@Param("map") Map map);
    //查询导入日志表主键
    public String selectLogid(@Param("map") Map map);
    //委托列表
    List<Tqywt> findWtAll(@Param("start") int start, @Param("len") int len);
    int findWtAllNums(@Param("start") int start, @Param("len") int len);
    //查询导入Excel详情
    public List<Map> selectExcel(@Param("map") Map map);
    public Integer selectExcelCount(@Param("map") Map map);
    //查询委托单是否存在
    public Integer selectWtd(@Param("wtid") String wtid);
    public Map selectWtInfo(@Param("wtid") String wtid);
    //删除已存在的委托样品
    public void deleteWtYp(@Param("wtid") String wtid);
    /*导入t_ypgl_jbxx表操作*/
    public void importYpglExcel(@Param("map")Map map);
    //查询导出Sheet页1
    public List<Bgzxx> daochuSheet1(@Param("map") Map map);
    //查询导出Sheet页2
    public List<Bgjcxm> daochuSheet2(@Param("map") Map map);
}
