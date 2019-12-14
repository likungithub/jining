package com.xinhai.caiyun.customermanage.service;

import com.xinhai.caiyun.customermanage.api.PtXgjl;

import java.util.Date;
import java.util.List;

/**
 * Created by  on 2018/3/28 0028.
 *
 * @escription:主管会计，客户经理修改记录
 * @tableName:
 */
public interface PtXgjlService {

    void insert(PtXgjl pt);

    void delByKhbm(String khbm);

    List<PtXgjl> getByDl(String dl, String khmc, Date start, Date end, int begin, int len);

    int getNum(String dl, String khmc, Date start, Date end);

    PtXgjl getByKh(String khbm);
}
