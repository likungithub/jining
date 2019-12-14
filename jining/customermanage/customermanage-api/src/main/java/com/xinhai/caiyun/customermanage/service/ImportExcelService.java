package com.xinhai.caiyun.customermanage.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

public interface ImportExcelService {
    /**
     *导入抽样一对多中的样品信息
     */
    public void importCyypExcel(InputStream in, MultipartFile file,String wtid) throws Exception;
}
