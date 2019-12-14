package com.xinhai.caiyun.statisticalanalysis.api;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by lmf on 2018/3/22 0022.
 *
 * @escription: 统计报表接口
 */
@Service
public interface StatisticReportService {

    /**
     * @Description: 查询主表数据
     * @Param: [dl, bmdm, zydm, edition]
     * @return: java.util.List<com.xinhai.caiyun.statisticalanalysis.api.StatisticReport>
     * @Author: Mr.Li
     * @Date: 2018/3/22 0022
     */
    List<StatisticReport> findAll(String dl,String bmdm, String zydm, String edition, int start, int length);

    /**
     * @Description:
     * @Param:  查询主表一级部门数据
     * @return:
     * @Author: Mr.Li
     * @Date: 2018/3/27 0027
     */
    List<StatisticReport> findBMInfo(String dl,String bmdm, String edition, int start, int length);

    /**
     * @Description: 查询主表数据数目
     * @Param: [dl, bmdm, zydm, edition]
     * @return: java.lang.Integer
     * @Author: Mr.Li
     * @Date: 2018/3/22 0022
     */
    Integer findAllNum(String dl,String bmdm, String zydm, String edition);

    /**
     * @Description:
     * @Param:  查询主表一级部门数据
     * @return:
     * @Author: Mr.Li
     * @Date: 2018/3/27 0027
     */
    Integer findBMInfoNum(String dl,String bmdm, String edition);

    /**
     * @Description: 查询子表数据
     * @Param: [dl, edition, type]
     * @return: com.xinhai.caiyun.statisticalanalysis.api.StatisticReportSon
     * @Author: Mr.Li
     * @Date: 2018/3/22 0022
     */
     List<StatisticReportSon> findSon(String dl, String edition, String type, int start, int length);

    /**
     * @Description:  查询子表数据数目
     * @Param: [dl, edition, type]
     * @return: java.lang.Integer
     * @Author: Mr.Li
     * @Date: 2018/3/22 0022
     */
     Integer findSonNum(String dl, String edition, String type);
}
