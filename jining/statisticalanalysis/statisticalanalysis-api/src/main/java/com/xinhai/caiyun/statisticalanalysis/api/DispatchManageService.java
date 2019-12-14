package com.xinhai.caiyun.statisticalanalysis.api;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.xinhai.organization.api.Organization;
import com.xinhai.usermanager.entity.User;
import org.springframework.stereotype.Service;

/**
 * 派工统计接口
 * @author pusilin
 */
@Service
public interface DispatchManageService {
    
    /**
     * 根据客户编码list查询派工
     * @param dljgBm
     *          代理机构编码
     * @param list
     *          客户编码list
     * @return
     *          返回派工管理数据
     */
    List<DispatchManage> findDispatchManagesByList(String dljgBm, List<String> list);

    /**
     * 获取所有的历史派工
     * @param list
     *          客户编码list
     * @return
     *          返回历史派工数量
     */
    long findDispatchHistorySize(List<String> list);

    /**
     * 分页查询出所有的派工历史数量
     * @param start
     *              开始条数
     * @param length
     *              每页条数
     * @param list
     *              客户编码
     * @return
     *              返回历史派工列表
     */
    List<DispatchManage> findDispatchHistoryList(int start, int length, List<String> list);

    /**
     * 查询当前职员的角色代码
     * @param staffcode
     *              职员代码
     * @return
     *              返回职员的角色代码和角色名字符串
     */
    String findUserRole(String staffcode);

    /**
     * 查询当前是否有该职员在该公司的派工信息（未删除的，正常情况下最多查询出一条）
     * @param zydm
     *          职员代码
     * @param khbm
     *          客户编码
     * @param dljgbm
     *          当前代理机构编码
     * @return
     *          返回0或者1
     */
    DispatchManage hasDispatch(String zydm, String khbm,String dljgbm);

    /**
     * 新增派工信息
     * @param user
     *              职员代码
     * @param org
     *              部门信息
     * @param roleName
     *              角色名
     * @param roleCode
     *              角色代码
     * @param khbm
     *              客户编码
     * @param dispatch
     *              空派工对象
     */
    void insertDispatchInfo(User user, Organization org, String roleName, String roleCode, String khbm, DispatchManage dispatch);

    /**
     * 根据ID删除派工信息
     * @param dispatchmanage
     *              派工信息
     */
    void delByIdDispatch(DispatchManage dispatchmanage);

    /**
     * 根据id查询派工信息
     * @param id
     *              派工信息主键id
     * @return
     *              返回派工信息
     */
    DispatchManage findByid(String id);













    /**
     * 删除原本的派工信息并添加新的派工信息
     * @param dispatch
     *              空派工对象
     * @param dm
     *              职员原本的派工数据
     */
    void delAndInsert(DispatchManage dispatch, DispatchManage dm);





















    /**
     * 新增派工信息（手机端访问）
     * @param staffcode
     *              职员代码
     * @param staffname
     *              职员名称
     * @param department
     *              部门
     * @param rolename
     *              角色名
     * @param rolecode
     *              角色代码
     * @param khbm
     *              客户编码
     * @param tsxx
     *              通知通告标志
     */
    void insertDispatchInfo(String staffcode, String staffname, String department, String rolename, String rolecode, String khbm,String zydm,String dljgbm,String bmdm,String zymc);

    /**
     * 发送消息提醒
     * @param zydm
     *          职员代码
     * @param gsmc
     *          公司名称
     * @param rolename
     *          角色名
     * @param username
     *          职员名
     */
    void sendMessage(String zydm, String gsmc, String username);

    /**
     * 发送消息提醒(手机端访问)
     * @param zydm
     *          职员代码
     * @param gsmc
     *          公司名称
     * @param rolename
     *          角色名
     * @param username
     *          职员名
     */
    void sendMessage(String zydm, String gsmc, String username,String dljgbm,String dlzydm,String dlzymc);

    /**
     * 删除原本的派工信息并添加新的派工信息(手机端访问)
     * @param dispatch
     * @param dm
     * @param rolename
     * @param rolecode
     * @param tsxx
     */
    void delAndInsert(DispatchManage dispatch, DispatchManage dm,String zydm,String dljgbm,String bmdm,String zymc);

    /**
     * 获取当前职员或者当前代理机构的派工总条数
     * @param dljgbm 代理机构编码
     * @param searchText 模糊搜索
     * @param zydm 职员代码
     * @return 总条数
     */
    long getDispatchManageTotalCount(String dljgbm, String searchText,String zydm);

    long getDispatchManageTotalCountSLG(Map cxtj);



    /**
     * 根据分页查询派工信息
     * @param dljgbm 代理机构编码
     * @param start 起始数
     * @param length 显示条数
     * @param searchText 模糊搜索
     * @return 常见问题类型集合
     */
    List<DispatchManage> getDispatchManageByPaging(String dljgbm, int start, int length, String searchText,String zydm);


    List<DispatchManage> getDispatchManageByPagingSLG(Map cxtj);


    /**
     * 派工统计排名
     * @param dljgbm
     *            代理机构编码
     * @return
     */
    List<Map<String,Object>> echarsTop(String dljgbm);
    
    /**
     * 昨日派工统计
     * @return
     */
    List<Map<String,Object>> echarstYesDay(String date,String dljgbm);
    
    /**
     * 修改派工信息中的员工姓名和员工头像
     * @param dljgBm
     *          代理机构编码
     * @param zydm
     *          职员代码
     * @param name
     *          用户名称
     * @param ygtx
     *          员工头像
     * @param jsdm
     *          角色代码
     * @param jsname
     *          角色名称
     */
    void updateUserInfo(String dljgBm, String zydm, String name, String ygtx, String jsdm, String jsname);


    /**
     * @Author: shanliang
     * @Description:查询图表数据
     * @Date:2017-12-05 14:13
     **/
    List<Map> echarsdata(Map map);
    
    /**
     * 批量修改派工信息中的员工角色
     * @param dljgBm
     *          代理机构编码
     * @param list
     *          职员代码
     * @param jsdm
     *          角色代码
     * @param jsname
     *          角色名称
     */
    void updateRoleList(String dljgBm, List<String> list, String jsdm, String jsname);

    /**
     * 查询派工数据，进行导出
     * @param datamap
     *              查询条件
     * @return
     */
    List<DispatchManage> findAllExcel(Map datamap);
}
