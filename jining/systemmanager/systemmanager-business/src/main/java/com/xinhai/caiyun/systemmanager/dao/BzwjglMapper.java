package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface BzwjglMapper {
    /***
     * 查找所有文件信息
     * @param map
     * @return
     */
   public List<Map> findAllBzwjgl(@Param("map") Map map);
    /**
     * 统计所有文件数
     */
    public  Integer findAllBzwjglNum(@Param("map") Map map);
    /**
     * 新增标准项目文件
     */
    public void addlBzwjgl(@Param("map") Map map);
    /**
     * 删除标准项目文件
     */
    public void delBzwjgl(@Param("id") Integer id);
    /**
     * 修改标准项目文件
     */
    public void enditBzwjgl(@Param("map") Map map);
    /**
     * 通过id获得一个tBzwjgl数据
     */
    public Map findOneBzwjgl(@Param("id") Integer id);
 /**
  * 获得文件的下载路径
  */
 public String findOneFilePath(@Param("id") Integer id);
 /**
  * 审核事件
  */
 public void addShenhe(@Param("map") Map map);
 /**
  * 修订事件
  */
 public void addXiuding(@Param("map") Map map);
 /**
  * 借阅事件
  */
 public void addJieyue(@Param("map") Map map);
 /**
  * 回收事件
  */
 public void addHuishou(@Param("map") Map map);

}
