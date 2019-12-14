package com.xinhai.caiyun.systemmanager.dao;

import com.xinhai.caiyun.systemmanager.api.Scgl;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Repository
public interface RwglMapper {
    /**
     * 查找所有任务管理的信息信息
     * @return
     */
    public List<Map> findAllRwgl(@Param("map") Map map);
    /**
     * c查找所有任务管理的数量
     * @return
     */
    public Integer findAllRwglNum(@Param("map") Map map);
    /**
     * 导入批量插入 t_scgl_jbxx
     */
    public void addRwglExcel(@Param("list") List<Map> list);
    /**
     * 将导入的数据放入样品表中
     */
    public void addYpExcel(@Param("list") List<Map> list);
    /**
     * 将导入的数据放在委托中
     */
    public void addWtExcel(@Param("list") List<Map> list);
    /**
     * 将导入的信息放在任务管理表中
     */
    public void addT_RwglExcel(@Param("list") List<Map> list);
    /**
     * 将接口中的json数据放到数据库中
     */
    public void addInterfaceJson(@Param("list") List<Scgl> list);
    /**
     * 根据cydbh查找对应的检验项目信息（可以进行修改）
     */
    public List<Scgl> findJyxmByCydbh(@Param("cydbh") String cydbh);
    /**
     * 根据cydbh查找对应的检验报告主信息（可以进行修改）
     */
    public Scgl findBgzxxByCydbh(@Param("cydbh") String cydbh);
    /**
     *根据抽样单编号查找抽样样品的信息（可进行修改）
     */
    public Scgl findCyypByCydbh(@Param("cydbh") String cydbh);
    /**
     * 清空检省抽测项目临时表的信息
     */
    public void cleanTempScJcxm();
    /**
     * 通过抽样单编号查找对应的食品分类id
     */
    public Set<String> findSpflidByCydbh(@Param("cydbh") String cydbh);
    /**
     * 通过抽样单编号 删除对应的省抽管理信息(t_scgl_jbxx)
     */
    public void deleteRwglExcel(@Param("cydbh") String cydbh);
    /**
     * 通过抽样单编号 删除对应的样品表中的信息t_ypgl_jbxx
     */
    public void deleteYpglExcel(@Param("cydbh") String cydbh);
    /**
     * 通过抽样单编号， 删除对应的委托表的信息 t_wt_jbxx
     */
    public void deleteWtExcel(@Param("cydbh") String cydbh);
    /**
     * 通过抽样单编号 删除对应的的任务表中的信息 t_rwgl_jbxx
     */
    public void deleteRy_RwglExcel(@Param("cydbh") String cydbh);

}
