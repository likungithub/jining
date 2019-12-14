package com.xinhai.caiyun.systemmanager.business;
import com.xinhai.caiyun.systemmanager.dao.YqyysyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.YqyysyService;
import java.util.List;
import java.util.Map;

@Service
public class YqyysyServiceImpl implements YqyysyService {
    @Autowired
    private YqyysyMapper yqyysyMapper;
    /**
     * 查询仪器所有信息
     */
    public List<Map> findAllYq(Map map){
        return   yqyysyMapper.findAllYq(map);
    };
    /**
     * 查询仪器所有统计数
     */
    public Integer findAllYqNum(Map map){
        return  yqyysyMapper.findAllYqNum(map);
    };
    /**
     * 查找需要的检测项目信息
     */
    public List<Map> findAllJcxm(Map map){
       return yqyysyMapper.findAllJcxm(map);
    };
    /**
     * 查找所有的检测项目数量
     */
    public Integer findAllJcxmNum(Map map){
        return yqyysyMapper.findAllJcxmNum(map);
    };
    /**
     * 更新检测项目的if_yqfp 是否仪器分配
     */
    public void updataJcxm_If_yqfp(Map map){
        yqyysyMapper.updataJcxm_If_yqfp(map);
    };
    /**
     * 更新仪器项目dqzt 当前的状态
     */
    public void updateYq_dqzt(Map map){
        yqyysyMapper.updateYq_dqzt(map);
    };
    /**
     * 增加检测项和仪器表
     */
    public void addJcxYq(Map map){
        yqyysyMapper.addJcxYq(map);
    };
}
