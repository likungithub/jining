package com.xinhai.caiyun.customermanage.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;

import org.apache.ibatis.annotations.Param;

import com.xinhai.caiyun.customermanage.api.PtKhxx;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.stereotype.Repository;

/**
 * @author
 *
 * @version
 */
@Repository
public interface PtKhxxMapper {

    void createPtKhxx(PtKhxx ptkhxx);

    /**
     * 根据id更新数据
     * @param id 条件
     * @param ptkhxx 传入参数
     */
    void updatePtKhxx(@Param("id") Long id, @Param("ptkhxx") PtKhxx ptkhxx);


    // updatePtKhxxbysjh(@Param("sjhm") String sjhm, @Param("ptkhxx") PtKhxx ptkhxx);



    
    void updateAppZh(PtKhxx ptkhxx);
    
    void updateKhPhone(PtKhxx ptkhxx);

    void deletePtKhxx(Long id);

    void deletePtKhxxbykhbm(String khbm);

    PtKhxx getPtKhxx(Long id);
    
    /**
     * 删除税务提醒数据
     */
    void delSwtx(@Param("khbm") String khbm, @Param("szdm") String szdm, @Param("rqdm") String rqdm, @Param("scry") String scry);
    
    /**
     * 删除纳税申报数据
     */
    void delNssb(@Param("khbm") String khbm, @Param("szdm") String szdm, @Param("rqdm") String rqdm, @Param("scry") String scry);

    /**
     * 查询正在服务的客户
     * @param dljg_bm 代理机构编码
     * @return 客户列表
     */
    List<PtKhxx> getPtKhxxList(@Param("dljg_bm") String dljg_bm);
    
    /**
     * 查询停止服务的客户
     * @param dljg_bm 代理机构编码
     * @return 客户列表
     */
    List<PtKhxx> getStopPtKhxxList(@Param("dljg_bm") String dljg_bm);

    List<JSONObject> getAllPtKhxx(Map<String, Object> parameters);

    /**
     * 通过纳税人识别号获取一个PtKhxx数据
     * 
     * @param nsrsbh
     *            传入的纳税人识别号
     * @return 一条数据
     */
    PtKhxx getInformation(String nsrsbh);

    /**
     * 通过纳税人识别号获取一个PtKhxx数据
     *
     * @param nsrsbh
     *            传入的纳税人识别号
     * @return 一条数据
     */
    PtKhxx getInformation2(@Param("nsrsbh") String nsrsbh, @Param("khbm") String khbm);

    PtKhxx getInformationKhxx(String nsrsbh);
    PtKhxx getInformationKhxxbysjh(String sjhm);



    /**
     * 根据id跟新客户服务状态
     * @param ids 传入id
     * @param fwzt 服务状态  为0停止，为1启动
     */ 
    void updateFw(@Param("ids") List<String> ids, @Param("fwzt_dm") Integer fwzt);  
    
    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertList(@Param("list") List<PtKhxx> list);
    
    /**
     * 批量检查
     * @param list 插入的list
     * @param dljg_bm 传入的代理机构编码
     * @return String 返回的用户名称集合
     */
    String checkList(@Param("list") List<PtKhxx> list, @Param("dljg_bm") String dljg_bm);
    
    PtKhxx findCustomerByKhbm(String khbm);

    PtKhxx findByKhbm(String khbm);
    
    /**
     * 通过主键id 查询一条客户信息
     * @author jiangh
     * @param id 主键id
     * @return 一条数据
     */
    PtKhxx findPtKhxxById(@Param("id") Long id);
    
    /**
     * 判断客户的纳税人识别号是否存在
     * @param nsrsbh 纳税人识别号
     * @param dljg_bm 代理机构编码
     * @return 一条数据
     */
    String getKhNsrsbhExist(@Param("nsrsbh") String nsrsbh, @Param("dljg_bm") String dljg_bm);
    
    /**
     * 判断客户的公司名称是否存在
     * @param gsmc 公司名
     * @param dljg_bm 代理机构编码
     * @return 一条数据
     */
    Integer getKhNameExist(@Param("gsmc") String gsmc, @Param("dljg_bm") String dljg_bm);
    
    /**
     * 判断代理的纳税人识别号是否存在
     * @param nsrsbh 纳税人识别号
     * @return 一条数据
     */
    PtKhxx getDlNsrsbhExist(@Param("nsrsbh") String nsrsbh);
    
    /**
     * @param ptkhxx
     */
    //void updatePtKhxxById(PtKhxx ptkhxx);
    
    /**
     * 获取同一部门的所有客户信息
     * @param dljg_bm 代理机构
     * @param bmdm 部门
     * @return 所有信息
     */
    //List<PtKhxx> findBmPtKhxx(@Param("dljg_bm") String dljg_bm, @Param("bmdm") String bmdm);
    
    /**
     * 获取某个人的所有客户信息
     * @param dljg_bm 代理机构
     * @param zydm 职员代码
     * @return  所有信息
     */
    //List<PtKhxx> findGrPtKhxx(@Param("dljg_bm") String dljg_bm, @Param("zydm") String zydm);
    
    /**
     * 获取催欠费的所有客户信息
     * @param dljg_bm 代理机构
     * @param cfzt 催费状态
     * @return  所有信息
     */
    List<PtKhxx> findCQFPtKhxx(@Param("dljg_bm") String dljg_bm, @Param("cfzt") String cfzt);
    
    /**
     * 查询停止服务的客户
     * @param dljg_bm 代理机构编码
     * @param fwzt 服务状态
     * @param start 开始行
     * @param length 每页行数
     * @param searchText 客户名称
     * @param zydm 职员代码
     * @return 客户列表
     */
    List<PtKhxx> findAllPtKhxxByParams(@Param("dljg_bm") String dljg_bm, @Param("fwzt_dm") Integer fwzt, @Param("start") Integer start,
                                       @Param("length") Integer length, @Param("searchText") String searchText, @Param("zydm") String zydm, @Param("sfnf") Integer sfnf,
                                       @Param("khflDm") String khflDm, @Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("ifSearch") String ifSearch);

    /**
     * 查询停止服务的客户（excel使用）
     * @param dljg_bm 代理机构编码
     * @param fwzt 服务状态
     * @return 客户列表
     */
    List<PtKhxx> findAllExcel(@Param("dljg_bm") String dljg_bm, @Param("fwzt_dm") Integer fwzt, @Param("searchText") String searchText, @Param("zydm") String zydm);
    
    /**
     * 查询停止服务的客户数目
     * @param dljg_bm 代理机构编码
     * @param fwzt 服务状态
     * @param searchText 客户名称
     * @param zydm 职员代码
     * @return 客户列表
     */
    Integer findAllPtKhxxByParamsNum(@Param("dljg_bm") String dljg_bm, @Param("fwzt_dm") Integer fwzt, @Param("searchText") String searchText, @Param("zydm") String zydm,
                                     @Param("khflDm") String khflDm, @Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("ifSearch") String ifSearch);

    /**
     * 查询停止服务的客户
     * @param dljg_bm 代理机构编码
     * @param fwzt 服务状态
     * @param bmdm 部门代码
     * @param start 开始行
     * @param length 每页行数
     * @param searchText 客户名称
     * @return 客户列表
     */
    List<PtKhxx> findBmPtKhxx(@Param("dljg_bm") String dljg_bm, @Param("fwzt_dm") Integer fwzt, @Param("bmdm") String bmdm, @Param("start") Integer start,
                              @Param("length") Integer length, @Param("searchText") String searchText, @Param("zydm") String zydm, @Param("sfnf") Integer sfnf,
                              @Param("khflDm") String khflDm, @Param("startDate") Date startDate, @Param("endDate") Date endDate);
    /**
     * 查询停止服务的客户（Excel）
     * @param dljg_bm 代理机构编码
     * @param fwzt 服务状态
     * @param bmdm 部门代码
     * @return 客户列表
     */
    List<PtKhxx> findBmExcel(@Param("dljg_bm") String dljg_bm, @Param("fwzt_dm") Integer fwzt, @Param("bmdm") String bmdm, @Param("searchText") String searchText);
    
    /**
     * 查询停止服务的客户数目
     * @param dljg_bm 代理机构编码
     * @param fwzt 服务状态
     * @param bmdm 部门代码
     * @param searchText 客户名称
     * @return 客户列表
     */
    Integer findBmPtKhxxNum(@Param("dljg_bm") String dljg_bm, @Param("fwzt_dm") Integer fwzt, @Param("bmdm") String bmdm,
                            @Param("searchText") String searchText, @Param("zydm") String zydm, @Param("khflDm") String khflDm,
                            @Param("startDate") Date startDate, @Param("endDate") Date endDate);

    /**
     * 查询停止服务的客户
     * @param dljg_bm 代理机构编码
     * @param fwzt 服务状态
     * @param zydm 职员代码
     * @param start 开始行
     * @param length 每页行数
     * @param searchText 客户名称
     * @return 客户列表
     */
    List<PtKhxx> findGrPtKhxx(@Param("dljg_bm") String dljg_bm, @Param("fwzt_dm") Integer fwzt, @Param("zydm") String zydm, @Param("start") Integer start,
                              @Param("length") Integer length, @Param("searchText") String searchText, @Param("sfnf") Integer sfnf, @Param("khflDm") String khflDm,
                              @Param("startDate") Date startDate, @Param("endDate") Date endDate);
    
    /**
     * 查询停止服务的客户（Excel）
     * @param dljg_bm 代理机构编码
     * @param fwzt 服务状态
     * @param zydm 职员代码
     * @return 客户列表
     */
    List<PtKhxx> findGrExcel(@Param("dljg_bm") String dljg_bm, @Param("fwzt_dm") Integer fwzt, @Param("zydm") String zydm, @Param("searchText") String searchText);
    
    /**
     * 查询停止服务的客户数目
     * @param dljg_bm 代理机构编码
     * @param fwzt 服务状态
     * @param zydm 职员代码
     * @param searchText 客户名称
     * @return 客户列表
     */
    Integer findGrPtKhxxNum(@Param("dljg_bm") String dljg_bm, @Param("fwzt_dm") Integer fwzt, @Param("zydm") String zydm, @Param("searchText") String searchText,
                            @Param("khflDm") String khflDm, @Param("startDate") Date startDate, @Param("endDate") Date endDate);
    
    /**
     * 查询员工对应的客户还有几位
     * @param dljg_bm 代理机构编码
     * @param list 员工id
     * @return
     */
    Integer findNum(@Param("dljg_bm") String dljg_bm, @Param("list") List<String> list);
    
    /**
     * 更新员工所有停止服务客户的派工信息scbz
     * @param list 员工id
     * @return
     */
    void updateStopNum(@Param("list") List<String> list);
    
    /**
     * 获得组织机构名称
     * @param id orgId
     * @return
     */
    String findOrgName(@Param("id") String id);
    
    /**
     * 获得员工名称
     * @param zydm 职员代码
     * @return
     */
    String findUserName(@Param("zydm") String zydm);
    
    /**
     * 根据代理机构编码查询客户信息
     * @param dljgbm
     *          代理机构编码
     * @return
     */
    long findPtKhxxSizeByDljgbm(String dljgbm);
    
    /**
     * 分页获取代理机构客户信息
     * @param start
     * @param length
     * @param dljgbm
     * @return
     */
    List<PtKhxx> getPtkhxxByPage(@Param("start") int start, @Param("length") int length, @Param("dljgbm") String dljgbm);
    
    /**
     * 根据客户编码查询已关联的app客户信息
     * @param khbm
     * @return
     */
    PtKhxx getAppInformation(@Param("khbm") String khbm);
    
    /**
     * 通过khbm获取一个PtKhxx数据
     * @param khbm
     * @return
     */
    PtKhxx getPtkhxxByKhbm(@Param("khbm") String khbm);
    
    /**
     * 更新app_khxx表的客户编码
     * @param p
     */
    void updateKhbm(PtKhxx p);
    
    /**
     * 增加客户时同步客户app信息
     * @param p
     */
    void insertAppKhxx(PtKhxx p);
    
    /**
     * 批量更新客户名称
     * @param khbm
     * @param khmc
     */
    void changName(@Param("khbm") String khbm, @Param("khmc") String khmc);

    int getAppInfoByPhone(@Param("sjhm") String sjhm);

    /**
     * 根据客户编码获取录入人，客户主管，派工人员
     * @param khbm khbm
     * @return PtKhxx
     */
    PtKhxx getPeople(@Param("khbm") String khbm);

    /**
     * 根据id删除客户
     * @param ids id
     */
    void delKh(@Param("ids") List<String> ids);

    /**
     * 查找员工密码
     * @param zydm 职员代码
     * @return
     */
    String findPass(@Param("zydm") String zydm);

    /**
     * 获取派工人员集合
     * @param khbm
     * @return
     */
    String getPgry(@Param("khbm") String khbm);

    /**
     * 根据客户编码获取录入人，客户主管，派工人员
     * @param khbm khbm
     * @return PtKhxx
     */
    PtKhxx getZydm(@Param("khbm") String khbm);

    /**
     * 查询停止服务的客户(工商服务)
     * @param dljg_bm 代理机构编码
     * @param fwzt 服务状态
     * @param start 开始行
     * @param length 每页行数
     * @param searchText 客户名称
     * @param zydm 职员代码
     * @return 客户列表
     */
    List<PtKhxx> findAllPtKhxxByParamsBusiness(@Param("dljg_bm") String dljg_bm, @Param("fwzt_dm") Integer fwzt, @Param("start") Integer start,
                                               @Param("length") Integer length, @Param("searchText") String searchText, @Param("zydm") String zydm, @Param("sfnf") Integer sfnf,
                                               @Param("khflDm") String khflDm, @Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("ifSearch") String ifSearch);

    /**
     * 查询停止服务的客户数目(工商服务)
     * @param dljg_bm 代理机构编码
     * @param fwzt 服务状态
     * @param searchText 客户名称
     * @param zydm 职员代码
     * @return 客户列表
     */
    Integer findAllPtKhxxByParamsNumBusiness(@Param("dljg_bm") String dljg_bm, @Param("fwzt_dm") Integer fwzt, @Param("searchText") String searchText, @Param("zydm") String zydm,
                                             @Param("khflDm") String khflDm, @Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("ifSearch") String ifSearch);

    /**
     * 查询停止服务的客户
     * @param dljg_bm 代理机构编码
     * @param fwzt 服务状态
     * @param zydm 职员代码
     * @param start 开始行
     * @param length 每页行数
     * @param searchText 客户名称
     * @return 客户列表
     */
    List<PtKhxx> findGrPtKhxxBusiness(@Param("dljg_bm") String dljg_bm, @Param("fwzt_dm") Integer fwzt, @Param("zydm") String zydm, @Param("start") Integer start,
                                      @Param("length") Integer length, @Param("searchText") String searchText, @Param("sfnf") Integer sfnf, @Param("khflDm") String khflDm,
                                      @Param("startDate") Date startDate, @Param("endDate") Date endDate);

    /**
     * 查询停止服务的客户数目
     * @param dljg_bm 代理机构编码
     * @param fwzt 服务状态
     * @param zydm 职员代码
     * @param searchText 客户名称
     * @return 客户列表
     */
    Integer findGrPtKhxxNumBusiness(@Param("dljg_bm") String dljg_bm, @Param("fwzt_dm") Integer fwzt, @Param("zydm") String zydm, @Param("searchText") String searchText,
                                    @Param("khflDm") String khflDm, @Param("startDate") Date startDate, @Param("endDate") Date endDate);

    /**
     * 查询停止服务的客户
     * @param dljg_bm 代理机构编码
     * @param fwzt 服务状态
     * @param bmdm 部门代码
     * @param start 开始行
     * @param length 每页行数
     * @param searchText 客户名称
     * @return 客户列表
     */
    List<PtKhxx> findBmPtKhxxBusiness(@Param("dljg_bm") String dljg_bm, @Param("fwzt_dm") Integer fwzt, @Param("bmdm") String bmdm, @Param("start") Integer start,
                                      @Param("length") Integer length, @Param("searchText") String searchText, @Param("zydm") String zydm, @Param("sfnf") Integer sfnf,
                                      @Param("khflDm") String khflDm, @Param("startDate") Date startDate, @Param("endDate") Date endDate);

    /**
     * 查询停止服务的客户数目
     * @param dljg_bm 代理机构编码
     * @param fwzt 服务状态
     * @param bmdm 部门代码
     * @param searchText 客户名称
     * @return 客户列表
     */
    Integer findBmPtKhxxNumBusiness(@Param("dljg_bm") String dljg_bm, @Param("fwzt_dm") Integer fwzt, @Param("bmdm") String bmdm,
                                    @Param("searchText") String searchText, @Param("zydm") String zydm, @Param("khflDm") String khflDm,
                                    @Param("startDate") Date startDate, @Param("endDate") Date endDate);
}