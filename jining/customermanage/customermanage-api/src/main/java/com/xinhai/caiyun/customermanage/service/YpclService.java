package com.xinhai.caiyun.customermanage.service;


import com.xinhai.caiyun.customermanage.api.Ypclxx;
import com.xinhai.caiyun.customermanage.api.ypclsp;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.jboss.logging.Param;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

public interface YpclService {
    /**
     * 样品处理接收首页  查询全部
     * @param map
     * @return
     */
    List<Map> getYpclJsAll(Map map);

    /**
     * 样品处理接收首页 总数查询
     * @return
     */
    int getYpclJsNums(Map map);

    /**
     * 样品处理信息选择页面  查询全部样品信息
     * @param map
     * @return
     */
    List<Map> getSampleChoiceAll(Map map);

    /**
     * 样品处理信息选择页面  查询全部样品信息
     * @return
     */
    int getSampleChoiceNums(Map map);

    /**
     * 样品处理信息选择页面  回显单条样品信息
     * @return
     */
    Map getAloneSampleChoice(String id);

    /**
     * 样品处理详细信息页面  处理人查询，全部
     * @return
     */
    List<Map>  getSampleProcessorPeople();

    /**
     * 样品处理信息 单条插入数据
     * @param
     */
    void setCreateYpclxx(Ypclxx ypclxx);

    //样品处理审批界面

    /**
     * 样品处理审批首页 查询全部
     * @return
     */
    List<Map> getYpclSPAll(Map map);

    /**
     * 样品处理审批首页 总数查询
     * @return
     */
    int getYpclSPNums(Map map);


    /**
     * 样品处理审批页面 审批操作,修改样品信息表状态
     * @param
     */
    void getSampleApprovalUpdateZT(Ypclxx ypclxx);

    /**
     * 样品处理审批页面,审批结果录入
     * @param
     */
    void getCreateYpclSP(ypclsp ypclsp);

    /**
     * 回显单条样品处理信息，供审核使用
     * @return
     */
    Map getAloneSampleHandleChoice(String id);

    //样品处理确认界面

    /**
     * 样品处理确认首页 查询全部
     * @return
     */
    List<Map> getYpclQRAll(Map map);

    /**
     * 样品处理确认首页 总数查询
     * @return
     */
    int getYpclQRNums(Map map);

    /**
     * 样品处理确认页面  确认操作
     * @param
     */
    void getSampleInfoConfirm(Map map);

    /**
     * 根据用户id，查询用户名称
     */
    String getCustomerName(String id);

    /**
     * 样品申请页面 修改操作,全部
     * @param
     */
    void getSampleInformationAllUpdateZT(Map map);
    /*导入操作*/
    public void importYpclExcel(InputStream in, MultipartFile file, String name)throws Exception;
    /*导出功能*/
    public XSSFWorkbook exportYpclExcel(String [] id)throws Exception;


}
