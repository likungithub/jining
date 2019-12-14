package service;


import com.xinhai.caiyun.systemmanager.api.Trwgl;
import java.util.List;
import java.util.Map;

/**
 * 任务管理
 */
public interface TrwglService {

    /**
     * 通过id获取任务数据
     * @param id
     * @return
     */
    Trwgl findTrwgl(String id);
    
    /**
     * 单条插入任务数据
     * @param Trwgl
     */
    void createTrwgl(Trwgl Trwgl);

    /**
     * 通过id删除
     * @param
     */
    void deleteTrwglbyId(Trwgl trwgl);

    /**
     * 批量删除
     * @param
     */
    void deleteTrwgl(List<String> id);

    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertList(List<Trwgl> list);

    /**
     * 通过id更新数据
     * @param trwgl
     * @return
     */
    void updateTrwgl(Trwgl trwgl);

    /**
     * 任务信息列表
     * @param start
     * @param len
     * @param type
     * @param searchText
     * @return
     */
    List<Trwgl> findTrwgllist(int start, int len, String rwType, String wtType, String searchText, String zydm,String rwzt);

    /**
     * 任务信息列表数目
     * @param type
     * @param searchText
     * @return
     */
    int findTrwgllistNums(String rwType, String wtType, String searchText, String zydm);

    /**
     * 修改任务状态
     * @param id
     * @param idlist
     */
    void updateBlzt(Integer[] idlist,String blzt,String if_jd);
    void updateBlzt002(Integer[] idlist);
    void deleteRw(String[] ypbm);
    void gxrwwry(String[] wtid,String zxry);

    /**
     * 通过wtid更新数据
     * @param trwgl
     */
    void updateTrwglWtid(Trwgl trwgl);
}
