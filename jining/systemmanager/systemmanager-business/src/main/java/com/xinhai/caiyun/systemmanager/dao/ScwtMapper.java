package com.xinhai.caiyun.systemmanager.dao;

import com.xinhai.caiyun.systemmanager.api.Scgl;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Repository
public interface ScwtMapper {

    /**
     * 将导入的省抽Excel数据先 导入到 本地表中
     */
    public void addYpExcelToSc(@Param("list") List<Map> list);

    /**
     * 获取所有 省抽数据
     * @return
     */
    public List<Map> findAllScsj(@Param("map") Map map);
    /*
     * 获取所有 省抽数据数量
     * @return
     */
    public Integer findAllScsjNum(@Param("map") Map map);


    /**
     *   通过省抽  抽样单主键 删除 省抽抽样单信息及检测项信息
     */
    public void deleteScInfo(@Param("zjid") String zjid);

    /**
     * 将导入的数据放在委托中
     */
    public void scTbBdWt(@Param("list") List<Map> list);

    /**
     * 省抽同步到本地 委托后  更新 省抽数据的同步状态
     * @param list
     */
    public void updateScTbZtAndJcx(@Param("list") List<Map> list);

    /**
     *  批量插入抽样单的 检测项目  addCydJcx
     */
    public void addCydJcx(@Param("list") List<Map> list);

    /**
     * 根据ID获取省抽的 数据 用于导入 本地 委托
     * @return
     */
    public List<Map> getScCydById(@Param("ids") String[] ids);











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
     * 通过抽样单编号 删除对应的的任务表中的信息 t_rwgl_jbxx
     */
    public void deleteRy_RwglExcel(@Param("cydbh") String cydbh);

}
