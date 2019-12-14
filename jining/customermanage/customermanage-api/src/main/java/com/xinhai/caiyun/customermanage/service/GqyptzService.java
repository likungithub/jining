package com.xinhai.caiyun.customermanage.service;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.util.List;
import java.util.Map;

public interface GqyptzService {
    //查询过期样品列表
    public List<Map> selectGqypAll(Map map);
    public Integer selectGqypCount(Map map);
    /*导出功能*/
    public XSSFWorkbook exportgqypExcel(String []skbhs)throws Exception;
}
