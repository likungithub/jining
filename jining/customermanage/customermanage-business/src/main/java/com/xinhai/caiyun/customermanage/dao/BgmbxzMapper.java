package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface BgmbxzMapper {

    public Map mbsjzd(@Param("map") Map map);
    public Map ypsjzd(@Param("map") Map map);

    List<Map> mbzdlx(@Param("map") Map map);

    List<Map> mbxz();

    long bglqfindCount(@Param("cxtj") Map cxtj);

    List<Map> bglqfindAll(@Param("cxtj") Map cxtj);

    Map ifsl(@Param("map") Map map);

    //增加报告领取人签字图片
    public  void updateqzlj(@Param("map") Map map);
    //增加委托经办人签字图片
    public  void updatewtqz(@Param("map") Map map);

    long pdfqzfindCount(@Param("cxtj") Map cxtj);

    List<Map> pdfqzfindAll(@Param("cxtj") Map cxtj);
    //不带分页的所有的数据
    List<Map> pdfqzfindAll2(@Param("cxtj") Map cxtj);

    /**
     *增加不存在的PDF名字
     */
    public  void  addpdfname(@Param("map") Map map);

    //增加pdf签字记录
    public  void updatepdfsj(@Param("data") List<Map> data);

    //增加pdf检验签字记录
    public  void updatepdfjy(@Param("data") List<Map> data);

    //增加pdf校核签字记录
    public  void updatepdfjh(@Param("data") List<Map> data);

    //查询样品是否存在于样品表
    public Integer selectYpbm(@Param("ypbm") String ypbm);

    //通过样品编码查询样品ID
    Map selectYpid(@Param("map") Map map);
    //插入样品表退还人签字
    public void upThrqz(@Param("map") Map map);

}
