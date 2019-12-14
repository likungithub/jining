package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface YpclMapper {

    /**
     * 样品处理接收首页 查询全部
     * @return
     */
    List<Map> getYpclJsAllM(@Param("map") Map map);

    /**
     * 样品处理接收首页 总数查询
     * @return
     */
    int getYpclJsNumsM(@Param("map") Map map);

    /**
     * 样品处理信息选择页面  查询全部样品信息
     * @param map
     * @return
     */
    List<Map> getSampleChoiceAllM(Map map);

    /**
     * 样品处理信息选择页面  查询全部样品信息总数
     * @return
     */
    int getSampleChoiceNumsM(Map map);

    /**
     * 样品处理信息选择页面  回显单条样品信息
     * @return
     */
    Map getAloneSampleChoiceM(String id);

    /**
     * 样品处理详细信息页面  处理人查询，全部
     * @return
     */
    List<Map>  getSampleProcessorPeopleM();

    /**
     * 样品处理信息 单条插入数据
     * @param
     */
    void setCreateYpclxxM(Ypclxx ypclxx);

    //样品处理审批界面

    /**
     * 样品处理审批首页 查询全部
     * @return
     */
    List<Map> getYpclSPAllM(@Param("map") Map map);

    /**
     * 样品处理审批首页 总数查询
     * @return
     */
    int getYpclSPNumsM(@Param("map") Map map);

    /**
     * 样品处理审批页面 审批操作,修改样品信息表状态
     * @param
     */
    void getSampleApprovalUpdateZTM(Ypclxx ypclxx);

    /**
     * 样品处理审批页面,审批结果录入
     * @param
     */
    void getCreateYpclSPM(ypclsp ypclsp);

    /**
     * 回显单条样品处理信息，供审核使用
     * @return
     */
    Map getAloneSampleHandleChoiceM(String id);

    //样品处理确认界面

    /**
     * 样品处理确认首页 查询全部
     * @return
     */
    List<Map> getYpclQRAllM(@Param("map") Map map);

    /**
     * 样品处理确认首页 总数查询
     * @return
     */
    int getYpclQRNumsM(@Param("map") Map map);

    /**
     * 根据用户id，查询用户名称
     */
    String getCustomerNameM(String id);

    /**
     * 样品申请页面 修改操作,全部
     * @param
     */
    void getSampleInformationAllUpdateZTM(@Param("map") Map map);
    //根据样品编码查询样品id与委托id
    public List<Map> findYpglByypbm(@Param("map") Map map);
    //导入Excel数据
    public void importYpclExcel(@Param("map") Map map);
    /*通过样品处理id查找导出信息*/
    public Ypcl findByYpclid(@Param("map")Map map);
    //通过处理人员名字查找id
    public String findByclrymc(@Param("clrymc") String clrymc);

    /**
     * 样品处理确认页面  确认操作
     * @param
     */
    void getSampleInfoConfirmM(@Param("map") Map map);
}
