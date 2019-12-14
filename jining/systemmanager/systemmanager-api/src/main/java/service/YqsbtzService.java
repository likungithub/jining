package service;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

public interface YqsbtzService {
//    查看仪器设备台账
    public List<Map> selectYqsbtz(Map map);
    public Integer selectYqtzCount(Map map);
    /*导入操作*/
    public void importyqsbtzExcel(InputStream in, MultipartFile file,String name)throws Exception;
    /*删除台账记录*/
    public void deleteYqsbtz(Map map);
    /*关于受控编号*/
    public List<Map> selectSkbh();
    /*新增仪器设备*/
    public void insertNewYqsb(Map map);
    /*新增基本信息*/
    public void insertBaseYqsb(Map map);
    /*修改基本信息*/
    public void updateBaseYqsb(Map map);
    /*修改仪器设备台账信息*/
    public void updateYqsbtz(Map map);
    /*导出功能*/
    public XSSFWorkbook exportyqsbExcel(String []skbhs)throws Exception;
    /*消息提醒*/
    public List<Map> findyqsbjd();
    /*避免消息重复*/
    public Integer yqjdxxXZfs();
    /*检定消息提醒*/
    public List<String> findJD();

    /*消息提醒*/
    public List<Map> findyqsbwh();
    /*避免消息重复*/
    public Integer yqwhxxXZfs();
    /*检定消息提醒*/
    public List<String> findWH();

    /*消息提醒*/
    public List<Map> findyqsbhc();
    /*避免消息重复*/
    public Integer yqhcxxXZfs();
    /*检定消息提醒*/
    public List<String> findHC();
}
