package com.xinhai.caiyun.customermanage.service;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

public interface JcbaoService {
    //导入Excel
    public void importjcbExcel(InputStream in, MultipartFile file, String name)throws Exception;
    /*导出功能*/
    public XSSFWorkbook exportjcbExcel(String []skbhs)throws Exception;
}
