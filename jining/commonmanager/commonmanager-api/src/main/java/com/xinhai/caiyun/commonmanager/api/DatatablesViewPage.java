package com.xinhai.caiyun.commonmanager.api;

import java.util.List;

/**
 * datatables分页加载数据工具
 * @author huxinquan
 */
public class DatatablesViewPage<T> {

    public DatatablesViewPage() {

    }

    private List<T> aaData; //aaData 与datatales 加载的"dataSrc"对应
    private long iTotalDisplayRecords;
    private long iTotalRecords;

    public List<T> getAaData() {
        return aaData;
    }

    public void setAaData(List<T> aaData) {
        this.aaData = aaData;
    }

    public long getiTotalDisplayRecords() {
        return iTotalDisplayRecords;
    }

    public void setiTotalDisplayRecords(long iTotalDisplayRecords) {
        this.iTotalDisplayRecords = iTotalDisplayRecords;
    }

    public long getiTotalRecords() {
        return iTotalRecords;
    }

    public void setiTotalRecords(long iTotalRecords) {
        this.iTotalRecords = iTotalRecords;
    }

    
}
