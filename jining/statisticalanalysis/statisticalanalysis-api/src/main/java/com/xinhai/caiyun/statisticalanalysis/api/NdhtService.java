package com.xinhai.caiyun.statisticalanalysis.api;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface NdhtService {
    /**
     * 查询年度合同的所有信息
     */
    public List<Map> findAllNndht(Map map);
    /**
     *得到所有年度的统计数
     */
    public Integer findAllNdhtNum(Map map);

    /**
     * 导出年度合同的EXcel表
     * @param ids
     * @return
     * @throws InvocationTargetException
     * @throws ClassNotFoundException
     * @throws IntrospectionException
     * @throws ParseException
     * @throws IllegalAccessException
     */
    public XSSFWorkbook exportNdhtExcel(String[] ids) throws InvocationTargetException, ClassNotFoundException, IntrospectionException, ParseException, IllegalAccessException;

}
