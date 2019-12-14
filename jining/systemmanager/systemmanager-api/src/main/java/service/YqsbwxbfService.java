package service;

import java.util.List;
import java.util.Map;

public interface YqsbwxbfService {
    //查看仪器设备
    public List<Map> selectYqsbtzwxbf(Map map);
    public Integer selectYqtzCountwxbf(Map map);
    /*保存维修原因*/
    public void updateWxyy(Map map);
    /*保存报废原因*/
    public void updateBfyy(Map map);
    //查看仪器设备维修报废审批信息
    public List<Map> selectYqsbtzwxbfsp(Map map);
    public Integer selectYqtzCountwxbfsp(Map map);
    //审批维修报废申请
    public void updateWbSpzt(Map map);
    //审批退回
    public void updateWbSpztTh(Map map);
    //查看需要维修设备
    public List<Map> selectYqsbtzwxbfWx(Map map);
    public Integer selectYqtzCountwxbfWx(Map map);
    //维修记录
    public void updateSbWx(Map map);

    //一级维修审批信息
    public List<Map> selectYqsbtzwxspyj(Map map);
    public Integer selectYqtzCountwxspyj(Map map);
    //审批维修申请
    public void updateWxSpztyj(Map map);
    //审批退回
    public void updateWxSpztThyj(Map map);

    //二级维修审批信息
    public List<Map> selectYqsbtzwxspej(Map map);
    public Integer selectYqtzCountwxspej(Map map);
    //审批维修申请
    public void updateWxSpztej(Map map);
    //审批退回
    public void updateWxSpztThej(Map map);

    //三级维修审批信息
    public List<Map> selectYqsbtzwxspsj(Map map);
    public Integer selectYqtzCountwxspsj(Map map);
    //审批维修申请
    public void updateWxSpztsj(Map map);
    //审批退回
    public void updateWxSpztThsj(Map map);

    //三级维修审批信息
    public List<Map> selectYqsbtzwxspsij(Map map);
    public Integer selectYqtzCountwxspsij(Map map);
    //审批维修申请
    public void updateWxSpztsij(Map map);
    //审批退回
    public void updateWxSpztThsij(Map map);
}
