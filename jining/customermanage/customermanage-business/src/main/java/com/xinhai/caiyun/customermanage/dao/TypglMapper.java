package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.*;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;


import javax.persistence.criteria.CriteriaBuilder;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by  on 2018/3/28 0028.
 *
 * @escription:
 * @tableName:
 */
@Repository
public interface TypglMapper {
    /*
    * 一对一委托样品信息导入
    * */
    public void createTypglliu(@Param("list") List list);
    
    /**
     * 通过id获取样品接收数据
     * @param id
     * @return
     */
	Typgl findTypjs(String id);
    /**
     * 修改样品管理表的接收状态
     * @param jszt
     */
    public void alterYpJS_jszt(@Param("jszt") String jszt,@Param("ypbm")String ypbm);
    /**
     * 删除样品接收响相应的数据  在样品管理人员表中
     * @param lx
     * @param ypbm
     */
    public void deleteYpJS_rydm(@Param("lx")String lx,@Param("ypbm")String ypbm);
	 /**
     * 获取样品样品接收数据
     * @return
     */
	 List<TwtJbxx> getTypjsAll(@Param("start") int start, @Param("len") int len, @Param("htmc") String htmc,@Param("htbh")  String htbh,@Param("htlx")  String htlx, @Param("wtdwmc") String wtdwmc,@Param("HtstartDate") Date HtstartDate,
	    		@Param("HtendDate") Date HtendDate, @Param("BgstartDate") Date BgstartDate, @Param("BgendDate") Date BgendDate,@Param("ywry") String ywry,@Param("zydm") String zydm,@Param("jszt")String jszt);

    /**
     * 获取全部样品数据的数量
     * @return
     */
	 int getTypjsAllNums(@Param("htmc") String htmc,@Param("htbh")  String htbh,@Param("htlx")  String htlx, @Param("wtdwmc") String wtdwmc,@Param("HtstartDate") Date HtstartDate,
	    		@Param("HtendDate") Date HtendDate, @Param("BgstartDate") Date BgstartDate, @Param("BgendDate") Date BgendDate,@Param("ywry") String ywry,@Param("zydm") String zydm,@Param("jszt")String jszt);
	
    /**
     * 获取样品详情
     * @param ypbm
     * @return
     */
	List<Typgl> getTypjsAlYpxq(@Param("start") int start, @Param("len") int len,@Param("wtid") String ypbm,@Param("zydm") String zydm,@Param("jszt") String jszt,@Param("map") Map map);
	
	int getTypjsAlYpxqNums(@Param("wtid") String ypbm,@Param("zydm") String zydm,@Param("jszt") String jszt,@Param("map") Map map);
	
    /**
     * 样品管理列表_样品接收_样品详情_检测项目列表
     * @param ypbm
     * @return
     */
    List<TjcxmJbxx> getTypjsAlYpxqJcxm(@Param("start") int start, @Param("len") int len,@Param("zwmcBm")String zwmcBm,@Param("jcfa")String jcfa,@Param("ypbm")String ypbm,@Param("zydm")String zydm,@Param("jszt")String jszt);
    
    int getTypjsAlYpxqJcxmNums(@Param("zwmcBm")String zwmcBm,@Param("jcfa")String jcfa,@Param("ypbm")String ypbm,@Param("zydm")String zydm,@Param("jszt")String jszt);
    /**
     * 通过id更新样品接收状态
     * @param ypgl
     * @return
     */
    void updateTypglJszt(Typgl ypgl);
    
    /**
     * 单条插入数据
     * @param Typgl
     */
    void createTypgl(Typgl Typgl);

    /**
     * 通过id获取样品数据
     * @param id
     * @return
     */
    Typgl findTypxx(String id);

    /**
     * 通过id删除
     * @param
     */
    void deleteTypglbyId(String id);

    /**
     * 通过id删除
     * @param
     */
    void deleteYddcyypxx(String id);

    /**
     * 批量删除
     * @param
     */
    void deleteTypgl(@Param("ids") List<String> id);
    
    /**
     * 批量删除
     * @param
     */
    void deleteTypglByWtid(@Param("ids") List<String> wtid);
    
    /**
     * 批量删除
     * @param
     */
    void deleteWtxxByWtid(@Param("ids") List<String> wtid);

    /**
     * 批量删除样品与检测项目的对应关系
     * @param
     */
    void delYpJcxm(@Param("ids") List<String> id);

    /**
     * 批量删除检测项目
     * @param
     */
    void deleteJcxm(@Param("ids") List<String> id, @Param("ypid") String ypid);

    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertList(List<Typgl> list);

    void updatecf(@Param("typgl") Typgl typgl);

    /**
     * 通过id更新数据
     * @param typgl
     * @return
     */
    void updateTypgl(Typgl typgl);

    void updatejcypfb(@Param("typgl") Typgl typgl);

    /**
     * 通过id更新数据
     * @param typgl
     * @return
     */
    void updateYddcyypxx(Typgl typgl);

    /**
     * 样品信息列表
     * @param start
     * @param len
     * @param type
     * @param searchText
     * @return
     */
    List<Typgl> findTypxxlist(@Param("start") int start, @Param("len") int len, @Param("type") String type, @Param("searchText") String searchText, @Param("zydm") String zydm);

    /**
     * 样品信息列表数目
     * @param type
     * @param searchText
     * @return
     */
    int findTypxxlistNums(@Param("type") String type, @Param("searchText") String searchText, @Param("zydm") String zydm);

    void updateYpJcxmList(@Param("uuid") String uuid, @Param("ypid") String ypid);
    
    void insert(@Param("data") List<Map> mapList);
    
	List<Tlygl> getTypjslygl(@Param("map") Map<String, String> map);

	int getTypjslyglNums(@Param("map") Map<String, String> map);

    /**
     * 查询样品列表中某委托的样品信息
     * @param wtid
     * @param if_cy
     * @return
     */
    List<Typgl> findYpByWt(@Param("start") int start, @Param("len") int len,
                           @Param("wtid") String wtid, @Param("if_cy") boolean if_cy,
                           @Param("zydm") String zydm);

    /**
     * 查询样品列表中某委托的样品信息
     * @param wtid
     * @param if_cy
     * @return
     */
    int findYpByWtNum(@Param("wtid") String wtid, @Param("if_cy") boolean if_cy,
                      @Param("zydm") String zydm);

    /**
     * 根据id删除客户
     * @param ids id
     */
    void delCyyp(@Param("ids") List<String> ids);

    /**
     * 根据id更新样品信息抽样状态
     * @param ids id
     */
    void updateCyyp(@Param("ids") List<String> ids);

    /**
     * 样品流转单查询
     * @return
     */
    List<Yplzd> findYplzd();
    /**
     *  查找检测项目名称
     */
    String findjcxm(String jcxmid);

    List<Ypzblist> ypzbgetRw(String ypbm);

    Integer getYpzbCount(String ypbm);

    void addYpzb(Ypzblist ypzblist);
    void deleteYpzb(String zbypbm);
    void insertYpzxry(@Param("data") List<Map> mapList);
	 List<Map> findJcx(@Param("jszt") String jszt,@Param("zydm") String zydm);
	 List<Map> findCountypbm();
	 void updateIFZB(@Param("ypbm") String ypbm);

    /**
     * 通过wtid删除样品信息
     * @param findypid
     */
	 void deleteYpglById (@Param("findypid")  String findypid);

    void updateJszt(@Param("id") String id);

    String findypid(@Param("ypbm") String ypbm);
    void insertYpqr(@Param("map") Map map);
    List<Map> getLyInfo(@Param("ypbm") String ypbm);
    void insertIntoRwinfo(@Param("ypbm")String ypbm,@Param("lrry") String lrry);

    //样品制备编码打印
    List<Map> ypzbdy(@Param("dy") List dy);

    //打印样品编码
    List<Map> ypbmdy(@Param("ids") List dy);

    //20190906新增添加任务单
    List<Map> getRwdList(@Param("map") Map map);
    //201909011新增动态科室下拉
    public List<Map> getKsByDmList();

    //20191028添加备样信息
    void addByxx(@Param("data") List<Map> data);

    List<Map> getByList(@Param("map") Map map);

    int getByListNum(@Param("map") Map map);

    int checkByCount(@Param("map") Map map);

    //20191028删除备样信息
    void deleteByxx(@Param("data") List<Map> data);
    //20190906新增添加任务单
    List<Map> getOneByxx(@Param("data") List<Map> data);
    //20190906新增添加任务单
    void updateByxx(@Param("data") List<Map> data);
}
