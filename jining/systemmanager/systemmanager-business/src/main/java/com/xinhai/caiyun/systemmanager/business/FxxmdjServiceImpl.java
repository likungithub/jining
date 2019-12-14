package com.xinhai.caiyun.systemmanager.business;
import com.xinhai.caiyun.systemmanager.dao.FxxmdjMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.FxxmdjService;
import java.util.List;
import java.util.Map;
@Service
public class FxxmdjServiceImpl implements FxxmdjService {
    @Autowired
    private FxxmdjMapper fxxmdjMapper;
    /**
     * c查找所有的检测项目信息
     * @return
     */
    public List<Map> findAllFxxmdj(Map map){
        return fxxmdjMapper.findAllFxxmdj(map);
    };
    /**
     * c查找所有的检测项数量
     * @return
     */
    public Integer findAllFxxmdjNum(Map map){
        return fxxmdjMapper.findAllFxxmdjNum(map);
    };
    /**
     * 通过id删除一条数据
     */
    public void deleteFxxmdjById(Integer id){
        fxxmdjMapper.deleteFxxmdjById(id);
    };
    /**
     * 增加标准库查询的信息
     */
    public void addFxxmdj(Map map){
        fxxmdjMapper.addFxxmdj(map);
    };
    /**
     * 通过id获得单个值
     */
    public Map findFxxmdjById(Integer id){
        return fxxmdjMapper.findFxxmdjById(id);
    };
    /**
     * 更新数据
     * @param map
     */
    public void updateFxxmdj(Map map){
        fxxmdjMapper.updateFxxmdj(map);
    };
}
