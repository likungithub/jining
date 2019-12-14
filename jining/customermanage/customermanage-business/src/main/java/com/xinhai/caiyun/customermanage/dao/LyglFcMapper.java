package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.Lygl;
import com.xinhai.caiyun.customermanage.api.Ypzbwc;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface LyglFcMapper {
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

    /**
     * 肥城专用——在 检测管理下 的 肥城检测领样 进行领样时 调用此方法，模拟原 检测任务分配 初始化数据，保持后续流程一致性。 原因：肥城 将 检测任务分配 流程提前到 样品领样前!!
     */
    public void jclyMnNwfp(@Param("map") Map map);

    public List<Map> getRwfpXx(@Param("map") Map map);
}
