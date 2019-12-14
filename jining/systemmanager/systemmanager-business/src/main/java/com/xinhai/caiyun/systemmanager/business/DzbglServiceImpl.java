package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.DzbglMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.DzbglService;

import java.util.List;
import java.util.Map;
@Service
@Transactional
public class DzbglServiceImpl implements DzbglService {
    @Autowired
    private DzbglMapper dzbglMapper;
    //党支部基本细信息查询
    public List<Map> selectDzbgl(Map map){
        return dzbglMapper.selectDzbgl(map);
    };
    public Integer selectDzbglCount(Map map){
        return dzbglMapper.selectDzbglCount(map);
    };
    //    新增党员信息
    public void addDyxx(Map map){
        dzbglMapper.addDyxx(map);
    };
    //    删除党员信息
    public void deleteDyxx(Map map){
        dzbglMapper.deleteDyxx(map);
    };
    //    修改党员信息
    public void updateDyxx(Map map){
        dzbglMapper.updateDyxx(map);
    };
    //    查看文件详细信息
    public List<Map> selectWjsc(Map map){
        return  dzbglMapper.selectWjsc(map);
    };
    public Integer selectWjscCount(Map map){
        return  dzbglMapper.selectWjscCount(map);
    };
    //    保存文件地址
    public void addwjdz(String lx,String wjname,String path,String scry){
        dzbglMapper.addwjdz(lx,wjname,path,scry);
    };
    //    查找文件路径
    public List<Map> selectFcwjlj(Integer id){
        return dzbglMapper.selectFcwjlj(id);
    };
    //    查找一条文件信息
    public Map findFCwj(Integer id){
        return dzbglMapper.findFCwj(id);
    };
    //    查看下载记录
    public List<Map> selectXZJL(Map map){
        return dzbglMapper.selectXZJL(map);
    };
    public Integer selectXZJLCount(Map map){
        return dzbglMapper.selectXZJLCount(map);
    };
    //    增加下载记录
    public void insertFcwjxzjl(Map map){
        dzbglMapper.insertFcwjxzjl(map);
    };
    //    指定人员
    public void insertRyqx(Map map){
        dzbglMapper.insertRyqx(map);
    };
    //    下载前的查询
    public Integer selectwjry(Map map){
        return  dzbglMapper.selectwjry(map);
    };
    //    指定人员权限查看
    public List<Map> selectscry(Map map){
        return dzbglMapper.selectscry(map);
    };
}
