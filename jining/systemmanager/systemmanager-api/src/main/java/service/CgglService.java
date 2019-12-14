package service;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;
public interface CgglService {
    /**
     * 获得采购管理的信息
     */
    public List<Map> selectCggl(Map map);
    /**
     * 获得采购管理的信息数量
     */
    public Integer selectCount(Map map);
    /**
     * 编制成功和退回操作  修改状态
     */
    public void  saveBzzt(Map map);
    /*
     *
     * 修改耗材单价总价*/
    public void updateCgsqhcbz(Map map);
    /*
     * 导出采购管理信息
     */
    public XSSFWorkbook exportCgglExcel(String[] ids) throws InvocationTargetException, ClassNotFoundException, IntrospectionException, ParseException, IllegalAccessException ;
    /**
     * 获得采购验收的信息
     */
    public List<Map> queryCgys(Map map);

    /**
     * 获得采购验收的信息的数量
     */
    public Integer queryCgysNum(Map map);
    /**
     * 采购验收  更改采购状态和申请状态
     */
    public void  saveCgysZt(List ids);
    /**
     * 通过ids  获得对应的采购验收的信息
     */
    public List<Map>  queryCgysByIds(List ids);
    /**
     * 更新采购管理中的总价
     */
    public void saveZj(Map map);
}
