package com.xinhai.caiyun.customermanage.service;

import com.xinhai.caiyun.customermanage.api.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 样品管理
 */
public interface TypglService {

    /**
     * 通过id获取样品接收数据
     * @param id
     * @return
     */
    Typgl findTypjs(String id);
    
    
    /**
     * 获取样品样品接收数据
     * @return
     */
    List<TwtJbxx> findTypjsAll(int start, int len, String htmc, String htbh, String htlx, String wtdwmc,Date HtstartDate,
            Date HtendDate, Date BgstartDate, Date BgendDate,String ywry,String zydm,String jszt);
    /**
     * 修改样品管理表的接收状态
     * @param jszt
     */
    public void alterYpJS_jszt(String jszt,String ypbm);
    /**
     * 删除样品接收响相应的数据  在样品管理人员表中
     * @param lx
     * @param ypbm
     */
    public void deleteYpJS_rydm(String lx,String ypbm);

    /**
     * 获取全部样品数据的数量
     * @return
     */
    int findTypjsAllNums(String htmc, String htbh, String htlx, String wtdwmc,Date HtstartDate,
            Date HtendDate, Date BgstartDate, Date BgendDate,String ywry,String zydm,String jszt);
    
    /**
     * 获取样品详情
     * @param ypbm
     * @return
     */
    List<Typgl> getTypjsAlYpxq(int start, int len,String wtid,String zydm,String jszt,Map map);
    
    
    int getTypjsAlYpxqNums(String wtid,String zydm,String jszt,Map map);
    
    /**
     * 样品管理列表_样品接收_样品详情_检测项目列表
     * @param ypbm
     * @return
     */
    List<TjcxmJbxx> getTypjsAlYpxqJcxm(int start, int len,String zwmcBm,String jcfa,String ypbm,String zydm,String jszt);
    
    /**
     * 样品管理列表_样品接收_样品详情_检测项目列表
     * @param ypbm
     * @return
     */
    int getTypjsAlYpxqJcxmNums(String zwmcBm,String jcfa,String ypbm,String zydm,String jszt);
    
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
     * 通过id删除
     * @param
     */
    void deleteTypglbyId(String id);

    /**
     * 批量删除
     * @param
     */
    void deleteTypgl(List<String> id);
    
    /**
     * 批量删除
     * @param
     */
    void delWtxx(List<String> id);

    /**
     * 批量删除检测项目
     * @param
     */
    void deleteJcxm(List<String> id, String ypid);

    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertList(List<Typgl> list);

    /**
     * 通过id更新数据
     * @param ypgl
     * @return
     */
    void updateTypgl(Typgl ypgl);

    /**
     * 通过id更新数据
     * @param ypgl
     * @return
     */
    void updateYddcyypxx(Typgl ypgl);

    /**
     * 通过id获取样品数据
     * @param id
     * @return
     */
    Typgl findTypxx(String id);

    /**
     * 样品信息列表
     * @param start
     * @param len
     * @param type
     * @param searchText
     * @return
     */
    List<Typgl> findTypxxlist(int start, int len, String type, String searchText, String zydm);

    /**
     * 样品信息列表数目
     * @param type
     * @param searchText
     * @return
     */
    int findTypxxlistNums(String type, String searchText, String zydm);

    void updateYpJcxmList(String uuid, String ypid);
    
    void insert(List<Map> mapList);


	List<Tlygl> getTypjslygl(Map<String, String> map);


	int getTypjslyglNums(Map<String, String> map);
	List<Yplzd> findYplzd();
	List<Ypzblist> ypzbgetRw(String ypbm);
	Integer getYpzbCount(String ypbm);
	String addYpzb(Ypzblist ypzblist);
	void deleteYpzb(String zbypbm);


    /*样品拆包*/
    List<Map> selectAll(Map map);

    List<Map> selectAlll(Map map);

    int selectCount(Map map);

    int selectspCount(Map map);

    void updateById(Typcb typcb);

    void updatepsById(Typps typps);

    void updatecf(Typgl typgl);

    void updatejcypfb(Typgl typgl);

    void updateJSR(Typcb typcb);

    /*条码打印*/
    List<Map> tmdySelect(Map map);
    int tmdyCount(Map map);

    /*条码扫描*/
    Typcb tmsmSelect(String ypbm);

    /*打印样品编码*/
    List<Map> ypbmdy(List dy);
    //样品制备编码打印
    List<Map> ypzbdy(List dy);

    /**
     * 通过id更新样品信息
     * @param
     */
    void getUPYPUpdate(Typgl typgl);

    /*样品拆包*/
    List<Map> selectpsAll(Map map);

    List<Map> selectspAll(Map map);

    public List<Map> getKsByDmList();
    //20191029添加备样信息
    List<Map> getByList(Map map);

    int getByListNum(Map map);
}

