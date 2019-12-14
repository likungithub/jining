package com.xinhai.caiyun.customermanage.service;

import com.xinhai.caiyun.customermanage.api.Tqywt;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

public interface ScxtdjService {
    //查询抽样单信息列表
    public List<Map> selectRzAll(Map map);
    public Integer selectRzCount(Map map);
    //查询导入日志表主键
    public String selectLogid(Map map);
    //导入Excel
    public void importscxtdjExcel(InputStream in, MultipartFile file, String name, String wtid, String logId)throws Exception;
    //存储导入日志
    public void insertScdjLog(Map map);
    //查询导入Excel详情
    public List<Map> selectExcel(Map map);
    public Integer selectExcelCount(Map map);
}
