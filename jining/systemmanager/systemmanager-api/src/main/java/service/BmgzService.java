package service;



import java.util.List;
import java.util.Map;

public interface BmgzService {
    /*修改委托单*/
    public void updateBmgz(Map map);
    /*修改样品*/
    public void updateBmgzyp(Map map);
    /*查询当前编码规则*/
    public List<Map> selectBmgz();
    /*新增委托单*/
    public void insertBmgz(Map map);
    /*新增样品*/
    public void insertBmgzyp(Map map);

    public String getMaxWtbm();

    public String getMaxYpbm(String rwlxbm);
    public String getMaxYpbm2();
}
