package com.xinhai.caiyun.statisticalanalysis.api;

import org.springframework.stereotype.Service;
import com.xinhai.caiyun.customermanage.api.Charge;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/12/13 0013.
 */
@Service
public interface ChargeAndDepartmentService {


    long getAllByEmployeelen(String type, String fwzt, String zydm, String dl, String startTime, String endTime);

    List<Map<String,Object>> getAllByEmployee(String type, String fwzt, String zydm, String dl, Integer startA, Integer lengthA, String startTime, String endTime);

    long findAllByEmpployeeLen(String type, String fwzt, String other, String dl, String startTime, String endTime);

    List<Map<String,Object>> findAllByEmployee(String type, String fwzt, String other, String dl, Integer startA, Integer lengthA, String startTime, String endTime);

    Map<String,Object> getAllDepartment(String s, String dl);

    long getAllByDepartmentLen(String type, String fwzt, String zydm, String dl);

    List<Map<String,Object>> getAllByDepartment(String type, String fwzt, String zydm, String dl, Integer startA, Integer lengthA);

    Map<String, Object> getAllDepartmentByzZy(String zydm, String dl);

    Map<String,Object> getAllDepartmentByBm(String other, String dl);

    List<Charge> chargelistaaByws(String dl, String khbm, String htbm, String startTime, String endTime);

    List<Map<String,Object>> getAll(String dl);

    /**
     * 获取摸个员工的实收与应收
     * @param zydm
     * @param dl
     * @param other
     * @param startTime
     *@param endTime @return
     */
    ChargeAndDepartment getOneEmployee(String zydm, String dl, String other, String startTime, String endTime);

    Map<String,Object> getAllDepartmentByzZyAc(String zydm1, String s, String zydm, String dl);

    Map<String,Object> getAllDepartmentByzZyAg(String zydm, String dl, String startTime, String endTime);

    Map<String,Object> getAllDepartmentac(String other, String dl, String startTime, String endTime);

    Map<String,Object> getAllDepartmentag(String other, String dl, String startTime, String endTime);

    /**
     * 导出部门的汇总统计报表
     * @param searchMap
     * @return
     */
    List<ChargeAndDepartment> findAllChargeAndDepartmentListDownByBm(Map searchMap);
    /**
     * 导出对应员工的应收与实收
     * @param searchMap
     * @return
     */
    List<ChargeAndDepartment> getAllByEmployeeBydaochu(Map searchMap);


    /**
     * 新查询部门不应收与实收
     * @param bmdm
     * @param dl
     * @param zydm
     * @param startTime
     *@param endTime @return
     */
    ChargeAndDepartment getAllDepartmentNew(String bmdm, String dl, String zydm, String startTime, String endTime);
}
