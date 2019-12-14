package com.xinhai.caiyun.customermanage.service;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

public interface YprkService {
    //查询入库详情
    public List<Map> selectYprkAll(Map map);
    public Integer selectYprkCount(Map map);
    /*导出功能*/
    public XSSFWorkbook exportYprkExcel(String [] ypbm)throws Exception;
    /*导入操作*/
    public void importYprkExcel(InputStream in, MultipartFile file, String name)throws Exception;
}
