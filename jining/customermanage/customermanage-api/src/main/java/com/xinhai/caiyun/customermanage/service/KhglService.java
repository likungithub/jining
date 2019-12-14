package com.xinhai.caiyun.customermanage.service;

import com.xinhai.caiyun.customermanage.api.Khxxgl;
import com.xinhai.caiyun.customermanage.api.Tqywt;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Date;
import java.util.List;

public interface KhglService {
    /**
     * 单条插入客户信息
     * @param khxxgl
     */
    void createKhxxgl(Khxxgl khxxgl);

    /**
     * 查询所有客户信息
     * @return
     */
    List<Khxxgl> findKhglAll(int start, int len, String khmc);

    /**
     * 获取全部数据的数量
     * @return
     */
    int findkhglAllNums(int start, int len, String khmc);

    /**
     * 根据id删除客户信息
     * @param id
     */
    void deleteById(String id);

    /**
     * 根据id查询
     * @param
     * @return
     */
    void updateKhxx(Khxxgl khxxgl);

    /**
     * 根据客户名称模糊查询
     * @param name
     * @return
     */
    List<Khxxgl> cxKhxxgl(String name);

    Khxxgl findKhgl(String id);

    public void importWtkhxxExcel(InputStream in, MultipartFile file, String name)throws Exception;
}
