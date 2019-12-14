package com.xinhai.caiyun.customermanage.business;
import com.xinhai.caiyun.customermanage.dao.YpjsqrMapper;
import com.xinhai.caiyun.customermanage.service.YpjsqrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class YpjsqrServiceImpl implements YpjsqrService {
    @Autowired
    private YpjsqrMapper ypjsqrMapper;
    /**
     * 查询所有样品接收确认信息
     * @return
     */
    public List<Map> findAllYpjsqr(Map map){
        return  ypjsqrMapper.findAllYpjsqr(map);
    };
    /**
     * 查询所有样品接收数量
     * @return
     */
    public Integer findAllYpjsqrNum(Map map){
        return  ypjsqrMapper.findAllYpjsqrNum(map);
    };
    /**
     * 接收确认改变状态
     */
    public  void  updateJszt(String id){
        ypjsqrMapper.updateJszt(id);
    };
}
