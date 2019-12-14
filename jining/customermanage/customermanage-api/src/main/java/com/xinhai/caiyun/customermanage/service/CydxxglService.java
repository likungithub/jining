package com.xinhai.caiyun.customermanage.service;

import com.xinhai.caiyun.customermanage.api.Tqywt;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

public interface CydxxglService {
    //查询抽样单信息列表
    public List<Map> selectCydLong(Map map);
    public Integer selectCydLogCount(Map map);
    //导入Excel
    public void importcydExcel(InputStream in, MultipartFile file, String name,String wtid,String logId)throws Exception;
    //存储导入日志
    public void insertWtLog(Map map);
    //委托列表
    List<Tqywt> findWtAll(int start, int len);
    int findWtAllNums(int start, int len);
    //查询导入日志表主键
    public String selectLogid(Map map);
    //查询导入Excel详情
    public List<Map> selectExcel(Map map);
    public Integer selectExcelCount(Map map);
    //导入Excel
    public void importypExcel(InputStream in, MultipartFile file, String name,String wtid)throws Exception;
    //    导出功能
    public XSSFWorkbook exportyqsbExcel(String logid,String zydm)throws Exception;
}
