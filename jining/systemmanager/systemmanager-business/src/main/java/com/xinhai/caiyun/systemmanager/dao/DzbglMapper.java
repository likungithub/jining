package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface DzbglMapper {
    //党支部基本细信息查询
    public List<Map> selectDzbgl(@Param("map") Map map);
    public Integer selectDzbglCount(@Param("map") Map map);
    //    新增党员信息
    public void addDyxx(@Param("map") Map map);
    //    删除党员信息
    public void deleteDyxx(@Param("map") Map map);
    //    修改党员信息
    public void updateDyxx(@Param("map") Map map);
    //    查看文件详细信息
    public List<Map> selectWjsc(@Param("map") Map map);
    public Integer selectWjscCount(@Param("map") Map map);
    //    保存文件地址
    public void addwjdz(@Param("lx")String lx,@Param("wjname")String wjname,@Param("path")String path,@Param("scry")String scry);
    //    查找文件路径
    public List<Map> selectFcwjlj(@Param("id") Integer id);
    //    查找一条文件信息
    public Map findFCwj(@Param("id") Integer id);
    //    查看下载记录
    public List<Map> selectXZJL(@Param("map") Map map);
    public Integer selectXZJLCount(@Param("map")Map map);
    //    增加下载记录
    public void insertFcwjxzjl(@Param("map")Map map);
    //    指定人员
    public void insertRyqx(@Param("map") Map map);
    //    下载前的查询
    public Integer selectwjry(@Param("map") Map map);
    //    指定人员权限查看
    List<Map> selectscry(@Param("map") Map map);

}
