package service;
import java.util.List;
import java.util.Map;

public interface SjscService {
    /**
     * c查找所有的检测项目信息
     * @return
     */
    public List<Map> findAllSjsc(Map map);
    /**
     * 查找所有的检测项数量
     * @return
     */
    public Integer findAllSjscNum(Map map);
   /* *//**
     * 导入excel
     *//*
    public void importExcelInfo(InputStream in, MultipartFile file) throws Exception;
    *//**
     * 导出excel
     *//*
    public XSSFWorkbook exportExcelInfo(String[] ids) throws InvocationTargetException, ClassNotFoundException, IntrospectionException, ParseException,IllegalAccessException;*/
}

