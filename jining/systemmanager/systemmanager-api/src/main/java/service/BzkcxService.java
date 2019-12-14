package service;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.beans.IntrospectionException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface BzkcxService {
    /**
     * c查找所有的检测项目信息
     * @return
     */
    public List<Map> findAllBzkcx(Map map);
    /**
     * 查找所有的检测项数量
     * @return
     */
    public Integer findAllBzkcxNum(Map map);
    /**
     * 通过id删除一条数据
     */
    public void deleteBzkcxById(Integer id);
    /**
     * 增加标准库查询的信息
     */
    public void addBzkcx(Map map);
    /**
     * 通过id获得单个值
     */
    public Map findBzkcxById(Integer id);
    /**
     * 更新数据
     * @param map
     */
    public void updateBzkcx(Map map);
    /**
     * 导入excel
     */
    public void importExcelInfo(InputStream in, MultipartFile file) throws Exception;
    /**
     * 导出excel
     */
    public XSSFWorkbook exportExcelInfo(String[] ids) throws InvocationTargetException, ClassNotFoundException, IntrospectionException, ParseException, IllegalAccessException;
}
