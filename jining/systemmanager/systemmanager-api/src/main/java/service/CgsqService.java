package service;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

public interface CgsqService {
    /**
     *
     * 获得采购申请的信息
     */
    public List<Map> findByNaTy(Map map);

    /**
     *
     * 获得采购信息的数量
     */
    public Integer findByNaTyNum(Map map);

    public void updatezt(Integer id);

    /**
     *通过id查找耗材信息
     */
    public List<Map> findById(String id);

    /**
     * 更新耗材的信息
     */
    public void updateCgsq(Map map);

    /**
     *
     * 增加采够申请的信息
     */
    public void addCgsq(Map map);

    /**
     *批量删除信息
     */
    public void deleteCgsq(List<String> ids);

    /**
     * 导入excel
     */
    public void importCgsqExcel(InputStream in, MultipartFile file) throws Exception;
}
