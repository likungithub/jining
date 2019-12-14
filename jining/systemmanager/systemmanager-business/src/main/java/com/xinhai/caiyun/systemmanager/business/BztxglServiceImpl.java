package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.BztxglMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.BztxglService;

import java.util.List;
import java.util.Map;
@Service
public class BztxglServiceImpl implements BztxglService {

    @Autowired
    private BztxglMapper bztxglMapper;
    /**
     * 获取标准项目管理所有表数据
     * @return 返会所有数据
     */
    @Override
    public List<Map> findAllBzxmgl(Map map) {
        return bztxglMapper.findAllBzxmgl(map);
    }
    /**
     * 统计标准项目管理数量
     *
     * @return
     */
    public Integer findBzxmglNum(Map map){
        return bztxglMapper.findBzxmglNum(map);
    };
    /**
     * 标准项目管理 增加检测项目信息
     */
    public void addBzxmglJcx(Map map){
        bztxglMapper.addBzxmglJcx(map);
    };
    /**
     * 查找ypid 和 jcxmid
     */
    public Map findYJid(Integer yjid){
        return bztxglMapper.findYJid(yjid);
    };
    /**
     * 通过ypid 查找样品信息
     */
    public Map findOneYp(Integer ypid){
        return bztxglMapper.findOneYp(ypid);
    };
    /**
     * 通过jcxmid 查找检测项目
     */
    public  Map findOneJcxm(Integer jcxmid){
        return bztxglMapper.findOneJcxm(jcxmid);
    };
    /**
     *更新检测项目
     */
    public void updateJcxm(Map map){
        bztxglMapper.updateJcxm(map);
    };
    /**
     *更新样品
     */
    public void updateYp(Map map){
        bztxglMapper.updateYp(map);
    };
    /**
     * 通过样品id 删除样品
     */
    public void delYpById(Integer id){
        bztxglMapper.delYpById(id);
    };

}
