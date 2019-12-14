package service;

import java.util.List;
import java.util.Map;

public interface DzbglService {
    //党支部基本细信息查询
    public List<Map> selectDzbgl(Map map);
    public Integer selectDzbglCount(Map map);
//    新增党员信息
    public void addDyxx(Map map);
//    删除党员信息
    public void deleteDyxx(Map map);
//    修改党员信息
    public void updateDyxx(Map map);
//    查看文件详细信息
    public List<Map> selectWjsc(Map map);
    public Integer selectWjscCount(Map map);
//    保存文件地址
    public void addwjdz(String lx,String wjname,String path,String scry);
//    查找文件路径
    public List<Map> selectFcwjlj(Integer id);
//    查找一条文件信息
    public Map findFCwj(Integer id);
//    查看下载记录
    public List<Map> selectXZJL(Map map);
    public Integer selectXZJLCount(Map map);
//    增加下载记录
    public void insertFcwjxzjl(Map map);
//    指定人员
    void insertRyqx(Map map);
//    下载前的查询
    Integer selectwjry(Map map);
//    指定人员权限查看
    List<Map> selectscry(Map map);
}
