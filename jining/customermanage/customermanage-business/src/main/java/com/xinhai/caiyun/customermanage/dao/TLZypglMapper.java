package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.Typgl;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Date;
import java.util.List;
import java.util.Map;
@Repository
public interface TLZypglMapper {
    public List<Map> findWt(@Param("map") Map map);
    public Integer findCount(@Param("map") Map map);
    //更改接收状态
    void updatJszt(@Param("map") Map map);
    //获取样品制备信息
    List<Map> findYpzb(@Param("map") Map map);
    //获取样品制备count
    Integer findYpzbCount(@Param("map") Map map);
    //新增样品制备
    void addYpzb(@Param("map") Map map);
    //更新制备状态
    void updateIFZB(@Param("ID")String ID);
    //更新制备 制备时间、制备人员
    void updateZbSave(@Param("ID")String ID,@Param("ZYDM")String ZYDM);
    //更新提交制备样状态
    void updateYpzbzt(@Param("map") Map map);
    List<Map> getYpzbJcxminfo(@Param("map") Map map);
    //获取样品制备信息
    List<Map> getYpzbinfo(@Param("ypid")String ypid);
    //数据回显
    Map findZbyInfo(@Param("id") String id);
    //数据修改
    void updateYpzb(@Param("id") String id,@Param("zbDate") String zbDate,@Param("zbfs")String zbfs,@Param("zbzl") String zbzl,@Param("dw") String dw);
    //导出Excel
    List<Map> importExcel(@Param("map")Map map);
    //查询还样信息列表
    List<Map> findHuanYang(@Param("zydm")String zydm,@Param("start") Integer start,@Param("length") Integer length,@Param("ypmc") String ypmc,@Param("ypbm") String ypbm);
    //获取还样信息总数
    Integer fingHuangYangCount(@Param("zydm") String zydm,@Param("ypmc") String ypmc,@Param("ypbm") String ypbm);
    //更新接收状态
    void updateTyInfo(@Param("map") Map map);
    //根据样品编码查询样品制备id
    String findYpzbid(String ypbm);
    //获取接收信息
    List<Map> findJiesou(@Param("start") Integer start,@Param("length") Integer length,@Param("ypmc") String ypmc,@Param("ypbm") String ypbm);
    //接收信息总数
    Integer findJiesouCount(@Param("start") Integer start,@Param("length") Integer length,@Param("ypmc") String ypmc,@Param("ypbm") String ypbm);
    //接收确认
    void jsqr(@Param("map") Map map);
    //退回信息
    void tuiHuiInfo(@Param("map") Map map);
    //出入库记录
    List<Map> findCykjl();
    //余样处理信息
    List<Map> findYycl(@Param("map") Map map);
    //获得总数
    Integer findYyclCount(@Param("map") Map map);
    //更新退样信息
    void updateyyth(@Param("map") Map map);
    //更新余样处理信息
    void updateyycl(@Param("map") Map map);
    Map findLZD(@Param("ID") String id);
    /*流转单职员代码*/
    Map findLzdZydm(@Param("ID") String id);
    /*更新流转单路径*/
    void updateLzd(@Param("ID")String ID,@Param("LZDLJ")String LZDLJ);
    /*获取流转单路径*/
    String findLzd(@Param("ID")String ID);
    //样品登记簿
    List<Map> importYPDJB(@Param("map")Map map);
    //产品质量检验样品台账
    List<Map> importCPZLJYTX();
    /**
     * 制备样品返还
     */
    List<Map> findZBfhInfo(@Param("map") Map map);
    /**
     * 返还信息总数
     */
    Integer findZBfhInfoCount(@Param("map") Map map);
    /**
     * 更新制备
     */
    void updateZBINFO(@Param("map")Map map);
    /**
     * 获取样品登记簿数数量
     */
    Integer canExport(@Param("map")Map map);
    /**
     * 获取样品的数量和单位
     */
    Map findYpslAndDwByYpid(@Param("ID")String id);
    /**
     * 导出样品处理信息
     */
    List<Map> exportYPCLInfo(@Param("map")Map map);
    /**
     * 添加食水工信息
     */
    void insertSSG(@Param("list")List<Map> list);

    /**
     * 样品删除
     */
    void deleteSampleAll(@Param("id") String id);
    /**
     * 委托单关联分页
     */
     List<Map> wtPaging (@Param("map") Map map);
    /**
     * 委托单关联分页
     */
     Integer wtPagingSum (@Param("map") Map map);

    //回显数据 委托单
    Map wtRepeatDisplay(@Param("id") String id);

    //样品接收 修改，查询委托和样品
    Map getWTModifyQuery(@Param("id") String id);

    /**
     * 通过id更新样品信息
     * @param
     */
    void getUPYPUpdateM(Typgl typgl);

    public List<Map> findYplqdy(@Param("map") Map map);
    public Integer findYplqdycount(@Param("map") Map map);

    public List<Map> findYplq(@Param("map") Map map);
    //打印交接登记表
    public List<Map> finddjb(@Param("ypbms1") List ypbms1);
    Integer findZbByWtid(@Param("id") String id);

    /**
     * 获取 拆分的 科室列表
     * @param map
     * @return
     */
    public List<Map> getZbks(@Param("map") Map map);

    /**
     * 获取 制备拆分的 科室列表
     * @param map
     * @return
     */
    public List<Map> getZbkszb(@Param("map") Map map);

    /**
     * 获取拆分的科室 数量
     * @param
     * @return
     */
    public Integer getZbksNum(@Param("map") Map map);

    /**
     * 获取拆分的科室 数量
     * @param
     * @return
     */
    public Integer getZbksNumzb(@Param("map") Map map);

    /**
     * 样品制备——动态科室制备 保存方法，包含了 批量制备  也就是 多个 样品 同时 制备相同科室和数量
     * @param zbYpList
     */
    public void saveYpzbAks(@Param("list") List<Map> zbYpList,@Param("ZYDM")String ZYDM);

    /**
     * 食品检测——样品制备——肥城 用的 特殊制备 只 记录 样品制备的 方式
     * @param zbfsList
     */
    public void saveYpzbFs(@Param("list") List<Map> zbfsList,@Param("ZYDM")String ZYDM,@Param("ZBFSDMS")String ZBFSDMS);

    public List<Map> getZbYpList(@Param("cxtj") Map map);
    public long getZbYpListNum(@Param("cxtj") Map map);

    public String getYpZbfs(@Param("zbwcid") String zbwcid);

    //20190907添加获取样品制备信息
    List<Map> findYpzbNew(@Param("map") Map map);
    //20190907添加获取样品制备count
    Integer findYpzbCountNew(@Param("map") Map map);
 }
