package service;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

public interface KcglService {
    /**陈
     * 查找库存管理的的信息
     */
    public List<Map> selectKcgl(Map map);
    /**陈
     * 查找库存管理的信息的数量
     */
    public Integer selectKcglNum(Map map);
    /**陈
     * 删除库存信息
     */
    public void delKcgl(String id);
    /**陈
     *通过id查找耗材信息
     */
    public List<Map> findById(String id);
    /**陈
     * 更新耗材的信息
     */
    public void updateKcgl(Map map);
    /**陈
     * 设置库存的用库存数量
     */
    public void  setCyKcsl(Map map);
    /**陈
     * 获得所有的检测库存的信息
     */
    public List<Map> queryAllKcglByCheck();
    /**
     * 获得职员代码的信息
     */
    public List<String> queryZydm (String bmmc);
    /**
     * 导入excel
     */
    public void importKcglExcel(InputStream in, MultipartFile file) throws Exception;

}
