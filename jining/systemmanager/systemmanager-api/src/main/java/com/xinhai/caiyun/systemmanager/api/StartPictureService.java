package com.xinhai.caiyun.systemmanager.api;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 启动图
 * @author xinl
 */
@Service
public interface  StartPictureService {
    /**
     * 获取所有启动图列表
     * @return 返回所有启动图
     * @param searchText
     * @param begin
     * @param end
     * @param startA
     * @param lengthA
     */
    List<StartPicture> findAllStartPicture(String searchText, String begin, String end, Integer startA, Integer lengthA,String applx);

    /**
     * 获取单个启动图的详细信息
     * @return
     */
    StartPicture findStartPicture(String id);

    /**
     * 添加启动图
     * @param startPicture
     * @return
     */
    void insertStartPicture(StartPicture startPicture);

    /**
     * 编辑启动图（编辑、删除）
     * @param startPicture
     * @param id 
     * @return
     */
    void updateStartPicture(StartPicture startPicture, String id);

    /**
     * 删除启动图
     * @param string
     * @param delPeo
     * @param delTime
     */
	void deleteStartPicture(String id, String delPeo, String delTime);

	String findStartapplj(String id);

    long findAllStartPictureLen(String searchText, String begin, String end,String applx);
}
