package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Author shanliang
 * @Description：
 * @Date: 2017-10-24 18:32
 * @Modified By:
 */
public interface RwglJbxxService {


    /**
     * @Author: shanliang
     * @Description:更新任务基本信息
     * @Date:2017-12-04 10:29
     **/
    void updaterwgljbxx(Map m);

    /**
     * @Author: shanliang
     * @Description:执行更新语句
     * @Date:2017-12-01 16:16
     **/
    void update(String sql);


    /**
     * @Author: shanliang
     * @Description:执行查询语句
     * @Date:2017-12-01 16:16
     **/
    List<Map> query(String sql);

    /**
     * @Author: shanliang
     * @Description:查询当前步骤前步骤的串行完成状态
     * @Date:2017-11-21 14:03
     **/

    String querybzcxwc(String rwid,String lcid,String dqbz);

    /**
     * @param dljzbm 代理记账公司编码
     * @Author: shanliang
     * @Description:
     * @Date:2017-10-25 15:50
     **/
    List queryLcxx(String dljzbm);

    List<Rwglrydm> selectRwglrydm(String rwid);

    /**
     * @Author: shanliang
     * @Description:根据流程ID获取流程基本信息
     * @Date:2017-10-26 14:57
     **/
    Lcgljbxx selectLcjbxxbylcid(String lcid);


    /**
     * @Author: shanliang
     * @Description:根据流程ID获取流程附件信息
     * @Date:2017-10-26 15:09
     **/
    List<Lcgljbxxfj> selectLcjbxxfjbylcid(String lcid);


    /**
     * @Author: shanliang
     * @Description:根据流程ID获取流程步骤信息
     * @Date:2017-10-26 15:23
     **/
    List<Lcglbzxx> selectLcjbzbylcid(String lcid);


    /**
     * @Author: shanliang
     * @Description:根据流程ID步骤ID获取流程步骤附件信息
     * @Date:2017-10-26 15:29
     **/
    List<Lcglbzfj> selectLcjbzfjbylcidbzid(String lcid, String bzid);


    /**
     * @Author: shanliang
     * @Description:根据流程ID查询流程的所有信息 jbxx bzxx fjxx
     * @Date:2017-10-27 8:23
     **/
    Map queryLcxxAll(String lcid);


    /**
     * @Author: shanliang
     * @Description:根据任务ID查询任务基本信息
     * @Date:2017-10-27 8:55
     **/
    Rwgljbxx selectRwjbxxbyrwid(String rwid);


    /**
     * @Author: shanliang
     * @Description:根据任务ID查询任务附件信息
     * @Date:2017-10-27 8:56
     **/
    List<Rwglfj> selectRwjbxxfjbyrwid(String rwid);


    /**
     * @Author: shanliang
     * @Description:根据任务ID查询任务步骤信息
     * @Date:2017-10-27 8:57
     **/
    List<Rwglbzxx> selectRwglbzxxbyrwid(String rwid);


    /**
     * @Author: shanliang
     * @Description:根据任务Id步骤ID查询步骤附件信息
     * @Date:2017-10-27 8:58
     **/
    List<Rwglbzfj> selectRwglbzfjbyrwidbzid(String rwid, String bzid,String gzjlid);


    /**
     * @Author: shanliang
     * @Description:根据任务Id步骤ID查询步骤工作记录信息
     * @Date:2017-10-27 8:58
     **/
    List<Rwglbzgzjl> selectRwglbzgzjlbyrwidbzid(String rwid, String bzid);


    /**
     * @Author: shanliang
     * @Description:根据任务ID查询所有任务信息 jbxx bzxx fjxx
     * @Date:2017-10-27 8:13
     **/
    Map queryRwxx(String rwid);


    /**
     * @Author: shanliang
     * @Description:添加任务基本信息
     * @Date:2017-10-27 10:55
     * rwjbxx rwryxx rwfjxx
     **/
    long insertRwjbxx(Map record);

    long insertRwjbxxMobile(Map record);


    /**
     * @Author: shanliang
     * @Description:添加任务步骤信息
     * @Date:2017-10-27 14:20
     * bzjbxx bzfjxx bzgzjl
     **/
     long insertRwbzxx(Map record);

     Map queryrwzt(Map cxtj);

     List<Map> querybzzt(Map cxtj);

    /**
     * @Author: shanliang
     * @Description:查询客户基本信息
     * @Date:2018-02-02 8:49
     **/
    Map queryKhxx(Map cxtj);

    /**
     * @Author: shanliang
     * @Description:添加任务附件
     * @Date:2017-10-27 10:56
     **/
    long insertrwglfj(Rwglfj record);

    /**
     * @Author: shanliang
     * @Description:添加任务管理人员
     * @Date:2017-10-27 11:18
     **/
    long insertRwglrydm(Rwglrydm record);


    /**
     * @Author: shanliang
     * @Description:添加任务步骤
     * @Date:2017-10-27 10:57
     **/
    long insertRwglbzxx(Rwglbzxx record);


    /**
     * @Author: shanliang
     * @Description:添加任务步骤附件
     * @Date:2017-10-27 10:58
     **/
    long insertRwglbzfj(List<Rwglbzfj> record);


    /**
     * @Author: shanliang
     * @Description:添加任务步骤工作记录
     * @Date:2017-10-27 10:59
     **/
    long insertRwglbzgzjl(Rwglbzgzjl record);


    /**
     * @Author: shanliang
     * @Description:删除任务 逻辑删除
     * @Date:2017-10-27 10:55
     **/
    long delRwxx(Rwgljbxx record);


    /**
     * @Author: shanliang
     * @Description:删除任务基本信息 物理删除
     * @Date:2017-10-27 14:38
     **/
    long delRwjbxx(String rwid);

    /**
     * @Author: shanliang
     * @Description:删除任务某个步骤信息
     * @Date:2017-10-27 14:39
     **/
    long delRwbzxx(String rwid,String bzid);


    /**
     * @Author: shanliang
     * @Description:查询当前人员所有任务
     * @Date:2017-10-27 15:30
     **/
    List<Rwgljbxx> selectRwjbxxbyzxry(String zxry);



    /**
     * @Author: shanliang
     * @Description:根据负责人查询任务列表
     * @Date:2017-11-06 13:35
     **/
    List<Rwgljbxx> selectRwjbxxbyfzr(Map cxtj);
    
    /**
     * @Author: 
     * @Description: 查询将要过期 和 已经过期的数据 发送及时通讯提醒
     * @Date:2017-11-06 13:35
     **/
    List<Map<String,String>> selectRwjbxxXxtx(Map cxtj);


    /**
     * @Author: shanliang
     * @Description:根据查询条件获取总记录数
     * @Date:2017-11-22 9:07
     **/
    long findAllSizeCxtj( Map cxtj);

    /**
     * @Author: shanliang
     * @Description:根据附件ID查询附件信息
     * @Date:2017-10-30 14:08
     **/
     Rwglfj queryrwfjbyfjid(String fjid);
    
    /**
     * @Author: shanliang
     * @Description:根据附件ID删除附件信息
     * @Date:2017-10-30 14:19
     **/
    void delrwfjbyfjid(String fjid);
    
    
    /**
     * @Author: shanliang
     * @Description:根据附件ID查询步骤附件信息
     * @Date:2017-10-30 14:21
     **/
    Rwglbzfj queryrwbzfjbyfjid(String fjid);
    

    /**
     * @Author: shanliang
     * @Description:根据附件ID删除步骤附件信息
     * @Date:2017-10-30 14:22
     **/
    void delrwbzfjbyfjid(String fjid);


    /**
     * @Author: shanliang
     * @Description:添加收费记录
     * @Date:2017-11-03 14:58
     **/
    long insertRwglsfjl(RwglSfjl rwglSfjl);


    /**
     * @Author: shanliang
     * @Description:获取任务完成数
     * @Date:2017-11-03 15:55
     **/
    String queryRwwcbzs(String rwid);


    /**
     * @Author: shanliang
     * @Description:查询收费项目名称
     * @Date:2017-11-06 10:23
     **/
    String querySfxmmc(String dm,String dljgbm);

    
    
    /**
     * @Author: tanchuankai
     * @Description:按条件获取当前用户的所有任务数量（包含发起的任务和接收的任务）
     * @Date:2017-11-6 09:20:21
     * @param ssDate
     *              开始时间
     * @param seDate
     *              结束时间
     * @param type
     *              类型
     * @param rwmc
     *              任务名称
     * @param zydm
     *              职员代码
     **/
    long findAllSize(Date ssDate, Date seDate, String type, String rwmc,String zydm);

    /**
     * 
     * @Author: tanchuankai
     * @Description:按条件分页获取任务列表（包含我发起的，我负责的，我参与的）
     * @Date:2017-11-6 10:31:16
     * @param start
     *              开始条数
     * @param length
     *              每页条数
     * @param ssDate
     *              开始时间
     * @param seDate
     *              结束时间
     * @param type
     *              类别
     * @param rwmc
     *              任务名称
     * @param zydm
     *              职员代码
     * @return
     */
    List<Rwgljbxx> getTaskByPage(int start, int length,
            Date ssDate, Date seDate, String type, String rwmc, String zydm);


    /**
     * @Author: shanliang
     * @Description:更新主表任务状态
     * @Date:2017-11-07 11:14
     **/
    int updateRwclzt( String blzt,String rwid,String dqbz,String dqbzmc);

    /**
     * @Author: shanliang
     * @Description:查询最后步骤的步骤ID
     * @Date:2017-11-07 13:17
     **/
    String queryendbzid(String rwid);

    String queryDqbz(String bzid);


    /**
     * @Author: shanliang
     * @Description:查询部门下拉列表
     * @Date:2017-11-07 19:39
     **/
    List<Map> queryBmxx(String dljgbm);

    /**
     * @Author: shanliang
     * @Description:更新任务ID到业务合作表中
     * @Date:2017-11-09 19:37
     **/
    int updateYwhzrwid(String rwid,String hzid,String zydm);


    /**
     * @Author: shanliang
     * @Description:根据任务ID步骤ID查询任务步骤信息
     * @Date:2017-11-02 15:19
     **/
    Rwglbzxx  selectRwglbzxxbyrwidbzid( String rwid, String bzid);


    /**
     * @Author: shanliang
     * @Description:根据任务ID更新业务合作表中的办理状态
     * @Date:2017-11-15 19:48
     **/
    void updateYwhzBlztbyrwid(String rwid,String blzt);




    /**
     *
     * 任务执行情况查询
     * @param employeeCode
     * @param agencyCode
     * @param begin
     *@param end @return
     */
    List<Map<String,Object>> searchCountByEmployee(String employeeCode, String agencyCode, String begin, String end);

    /**
     * 王硕写的
     * 一周内任务完成情况与新增情况
     * @param begin
     * @param end
     * @param employeeCode
     * @param agencyCode
     * @return
     */
    List<Map<String,Object>> searchCountByDayAndInsertOrOut(String begin, String end, String employeeCode, String agencyCode);

    /**
     * 王硕写的
     * 一周内任务完成情况与新增情况
     * @param employeeCode
     * @param begin
     * @param end
     * @param agencyCode
     * @return
     */
    List<Map<String,Object>> seachCountByNewInsert(String employeeCode, String begin, String end, String agencyCode);

    /**
     * 王硕写的
     * 通过代理机构编码和职员代码查询所有任务数量
     * @param agencyCode
     * @param employeeCode
     * @param begin
     *@param end @return
     */
    int allTaskCountByAgency(String agencyCode, String employeeCode, String begin, String end);

    /**
     * 王硕写的
     * 已完成的任务数量
     * @param agencyCode
     * @param employeeCode
     * @param begin
     *@param end @return
     */
    int isOverByae(String agencyCode, String employeeCode, String begin, String end);

    /**
     * 王硕写的
     * 通过代理机构编码和职员代码分组 分负责人查询已完成任务数量
     * @param agencyCode
     * @param employeeCode
     * @return
     */
    List<Map<String,Object>> searcHIsOver(String agencyCode, String employeeCode);

    /**
     * 王硕写的
     * 通过代理机构编码和职员代码分组 分负责人查询未完成任务数量
     * @param agencyCode
     * @param employeeCode
     * @return
     */
    List<Map<String,Object>> seachIsNotOver(String agencyCode, String employeeCode);
    /**
     * 王硕写的
     * 通过代理机构编码和职员代码分组 分部门代码查询完成任务数量
     * @param agencyCode
     * @return
     */
    List<Map<String,Object>> searcHIsOverByD(String agencyCode, String departmentCode);
    /**
     * 王硕写的
     * 通过代理机构编码和职员代码分组 分部门代码查询未完成任务数量
     * @param agencyCode
     * @return
     */
    List<Map<String,Object>> seachIsNotOverByD(String agencyCode, String departmentCode);
    /**
     * 王硕写的
     * 没用
     * @param agencyCode
     * @param begin
     *@param end @return
     */
    List<Map> searchByChargeInPersonAll(String agencyCode, String begin, String end);


    List<Map> searchByBM(String agencyCode, String begin, String end);

    /**
     * 按条件查询任务列表（导出）
     * @param searchMap
     *              查询条件
     * @return
     */
    List<Rwgljbxx> searchAllRwgljbxx(Map searchMap);

    /**
     * @param dljgBm
     * @return
     */
    Map<String, String> selectCspzXxtx(Map searchMap);


    List<Map<String,Object>> searchCountByDayAndInsertOrOutByDay(String begin, String end, String employeeCode, String agencyCode);

    List<Map<String,Object>> searchCountByDayAndInsertOrOutByYear(String begin, String end, String employeeCode, String agencyCode);

    List<Map<String,Object>> seachCountByNewInsertByDay(String employeeCode, String begin, String end, String agencyCode);

    List<Map<String,Object>> seachCountByNewInsertYear(String employeeCode, String begin, String end, String agencyCode);

    List<Map<String,Object>> searchCountByDayAndInsertOrOutNew(String startTime, String endTime, String zy, String dl);

    List<Map<String,Object>> seachCountByNewInsertByDayNew(String startTime, String endTime, String zy, String dl);
}
