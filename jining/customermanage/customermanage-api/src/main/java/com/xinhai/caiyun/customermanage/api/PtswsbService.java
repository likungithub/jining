package com.xinhai.caiyun.customermanage.api;

import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Map;

/**
 * 平台税务申报接口
 * */

public interface PtswsbService {

    DatatablesViewPage<PtKhxx> getSbKhList(Integer type,  Boolean fwzt, String other, String khfldm,String khmc,String startTime,String endTime,String start, String length) throws Exception;
    /**
     * 报税信息设置
     * @param ptqdgsbssz
     *
     * */
    void setTaxdeclaration(Ptqdgsbssz ptqdgsbssz);

    /**
     * 根据客户编码查找报税信息
     * @param khbm
     *                 客户编码
     * @return
     * */
    Ptqdgsbssz getTaxdeclarationByKhbm(String khbm);
    /**
     * 更新报税信息
     *@param ptqdgsbssz
     *
     * */
    void updateTaxdeclaration(Ptqdgsbssz ptqdgsbssz);

    ByteArrayOutputStream downSwsbExport(Integer type, Boolean fwzt, String other,String swjlx,String khfldm,String khmc,String startTime,String endTime) throws  Exception;
    /**
     * 报税信息导入
     * 刘豪
     * @param is 文件流
     * @param swjlx 税务局类型代码
     * @return
     */
    Map<String,Object> uploadSwsbModel(InputStream is, String swjlx);

    /**
     * @Author: shanliang
     * @Description:查询客户青岛地税配置
     * @Date:2018-03-22 10:27
     **/
    QddsBssz selectDsPzbyKhbm(String khbm);


    void insertSelectiveDs(QddsBssz qddsBssz);


    void updateByPrimaryKeySelectiveDs(QddsBssz qddsBssz);

}
