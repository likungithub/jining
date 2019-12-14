package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.Khxxgl;
import com.xinhai.caiyun.customermanage.api.Tqywt;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Repository
public interface KhglMapper {

    /**
     * 单条插入数据
     * @param khxxgl
     */
    void createKhxxgl(Khxxgl khxxgl);

    /**
     * 获取全部数据
     * @return
     */
    List<Khxxgl> findKhglAll(@Param("start") int start, @Param("len") int len, @Param("khmc") String khmc);

    /**
     * 获取全部数据数量
     * @return
     */
    int findkhglAllNums(@Param("start") int start, @Param("len") int len, @Param("khmc") String khmc);

    void deleteById(@Param("id") String id);

    void updateKhxx(Khxxgl khxxgl);

    List<Khxxgl> cxKhxxgl(String name);

    Khxxgl findKhgl(String id);
    /*导入Excel数据*/
    public void importWtkhxxExcel(@Param("map") Map map);
    //查询省代码
    public List<Map> findDm(@Param("map") Map map);
    //查询市代码
    public List<Map> findDmsh(@Param("map") Map map);
    //查询区代码
    public List<Map> findDmqu(@Param("map") Map map);
}
