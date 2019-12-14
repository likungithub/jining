package service;
import com.xinhai.caiyun.systemmanager.api.Scgl;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.beans.IntrospectionException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Set;

public interface RwglService {
    /**
     * 查找所有任务管理的信息信息
     * @return
     */
    public List<Map> findAllRwgl(Map map);
    /**
     * 查找所有任务管理的数量
     * @return
     */
    public Integer findAllRwglNum(Map map);
   /**
     * 导入excel
     */
    public void importRwglExcel(InputStream in, MultipartFile file) throws Exception;
    /**
     * 将接口中的json数据放到数据库中
     */
    public void addInterfaceJson(List<Scgl> list);

    /**
     * 导出抽检报告的主信息
     */
    public XSSFWorkbook exportRwglExcel(String[] ids) throws InvocationTargetException, ClassNotFoundException, IntrospectionException, ParseException, IllegalAccessException ;
    /**
     * 通过抽样单编号查找对应的食品分类id
     */
    public Set<String> findSpflidByCydbh(String cydbh);
    /**
     * 清空检省抽测项目临时表的信息
     */
    public void cleanTempScJcxm();
    /**
     * 通过抽样单编号 删除对应的省抽管理信息(t_scgl_jbxx)
     */
    public void deleteRwglExcel(String cydbh);
    /**
     * 通过抽样单编号 删除对应的样品表中的信息t_ypgl_jbxx
     */
    public void deleteYpglExcel(String cydbh);
    /**
     * 通过抽样单编号， 删除对应的委托表的信息 t_wt_jbxx
     */
    public void deleteWtExcel(String cydbh);
    /**
     * 通过抽样单编号 删除对应的的任务表中的信息 t_rwgl_jbxx
     */
    public void deleteRy_RwglExcel(String cydbh);
}
