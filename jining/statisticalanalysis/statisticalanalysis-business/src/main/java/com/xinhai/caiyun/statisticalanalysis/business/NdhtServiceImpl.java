package com.xinhai.caiyun.statisticalanalysis.business;
import com.xinhai.caiyun.statisticalanalysis.api.ExcelBean;
import com.xinhai.caiyun.statisticalanalysis.api.ExcelUtil;
import com.xinhai.caiyun.statisticalanalysis.api.Ndht;
import com.xinhai.caiyun.statisticalanalysis.api.NdhtService;
import com.xinhai.caiyun.statisticalanalysis.dao.NdhtMapper;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class NdhtServiceImpl implements NdhtService {
    @Autowired
    private NdhtMapper ndhtMapper;
    /**
     * 查询年度合同的所有信息
     */
    public List<Map> findAllNndht(Map map){
        return  ndhtMapper.findAllNndht(map);
    };
    /**
     *得到所有年度的统计数
     */
    public Integer findAllNdhtNum(Map map){
        return ndhtMapper.findAllNdhtNum(map);
    };
    /**
     * 导出年度合同excel表
     */
    public XSSFWorkbook exportNdhtExcel(String[] ids) throws InvocationTargetException, ClassNotFoundException, IntrospectionException, ParseException, IllegalAccessException {
        List<Ndht> list=new ArrayList<Ndht>();
        Ndht ndht=null;
        String[] id=ids;
        for (int i=0;i<ids.length;i++){
            ndht=ndhtMapper.findOneNdhtByid(Integer.parseInt(ids[i]));
            list.add(ndht);
        }
        List<ExcelBean> excel=new ArrayList<ExcelBean>();
        Map<Integer,List<ExcelBean>> map=new LinkedHashMap<>();
        XSSFWorkbook xssfWorkbook=null;
        //设置标题栏
        excel.add(new ExcelBean("合同名称","htmc",0));
        excel.add(new ExcelBean("委托单位名称","dwmc",0));
        excel.add(new ExcelBean("样品名称","ypmc",0));
        excel.add(new ExcelBean("联系电话","lxdh",0));
        excel.add(new ExcelBean("录入日期","lrrq",0));
        excel.add(new ExcelBean("邮政编码","yzbm",0));
        map.put(0, excel);
        String sheetName = "年度合同";
        //调用ExcelUtil的方法
        xssfWorkbook = ExcelUtil.createExcelFile(Ndht.class, list, map, sheetName);
        return xssfWorkbook;
    };
}
