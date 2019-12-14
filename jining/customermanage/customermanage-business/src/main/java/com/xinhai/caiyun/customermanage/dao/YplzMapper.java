package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface YplzMapper {
    /*获取检测任务分配时间及人员*/
    List<Map<String,String>> findJcDataAndZxry(@Param("ypid") String ypid);
    /*获取检测录入时间及执行人员*/
    List<Map<String,String>> findlrrqAndZxry(@Param("ypid")String ypid, @Param("zxry")String zxry);
}
