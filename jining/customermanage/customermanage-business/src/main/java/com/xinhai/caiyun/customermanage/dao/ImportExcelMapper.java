package com.xinhai.caiyun.customermanage.dao;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImportExcelMapper {
/**
 * 将一对多抽样的样品信息批量导入
 */
public void importCyypExcel(@Param("list") List list);

}