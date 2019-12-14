package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.Lygl;
import com.xinhai.caiyun.customermanage.api.Ypzbwc;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface LyglMapper {
    public List<Map> findAll(@Param("map") Map map);

    public Integer findCount(@Param("map") Map map);

    public void updatelqzt(@Param("map") Map map);

    public List<Ypzbwc> findYpzb(Lygl lygl);

    /*检测项关联制备样*/
    public void updatejcYp(@Param("map") Map map);

    /**
     *
     * 通过样品id  得到样品的制备剩余量
     */
    public Integer queryYpNumByYpid(@Param("ypid") String ypid);

    Integer findZbzlById(@Param("id") String id);

    /*删除*/
    public void deletedlqzt(@Param("map") Map map);

    //20190923添加检测领样退回操作
    public void thUpdate(@Param("map") Map map);

    //20190923添加校验是否存在已检测检测项
    public Integer checkJcCount(@Param("map") Map map);

}
