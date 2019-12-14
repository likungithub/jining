package service;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

public interface SyhcljlService {
    /*
     * 获得剩余耗材量
     */
    public List<Map> findByNaTy(Map map);

    /*
     * 获得剩余耗材量数量
     */
    public Integer findByNaTyNum(Map map);

    /*
     * 增加剩余耗材量信息
     */
    public void addCgsq(Map map);

    /*
     *批量删除信息
     */
    public void deleteCgsq(List<String> ids);

    /*打印*/
    List<Map> yp(List dy);

}
