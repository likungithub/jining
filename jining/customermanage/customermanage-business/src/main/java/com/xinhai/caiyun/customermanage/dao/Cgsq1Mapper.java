package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;
@Repository
public interface Cgsq1Mapper {
    Map getCgsqInfo(@Param("id")String id);
    Map getCgsqInfo1(@Param("id")String id);
}
