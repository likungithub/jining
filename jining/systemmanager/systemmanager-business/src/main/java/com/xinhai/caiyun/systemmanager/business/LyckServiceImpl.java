package com.xinhai.caiyun.systemmanager.business;
import com.xinhai.caiyun.systemmanager.dao.LyckMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.LyckService;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class LyckServiceImpl implements LyckService {
    @Autowired
    private LyckMapper lyckMapper;
    /**
     * 陈
     * 得到领用出库的信息
     */
    public List<Map> queryLyckAll(Map map){
        return lyckMapper.queryLyckAll(map);
    };

    /**
     * 陈
     * 得到领用出库的信息的数量
     */
    public Integer queryLyckAllNum(Map map){
        return lyckMapper.queryLyckAllNum(map);
    };
    /**陈
     * 保存出库状态
     */
    public void saveCkzt(Map map){
        lyckMapper.saveCkzt(map);
    };
    /**陈
     * 得到库存数量
     */
    public String queryKcNum(String id){
        return lyckMapper.queryKcNum(id);
    };
    /**陈
     * 得到领用数量
     */
    public String queryLyNum(String id){
        return lyckMapper.queryLyNum(id);
    };

}
