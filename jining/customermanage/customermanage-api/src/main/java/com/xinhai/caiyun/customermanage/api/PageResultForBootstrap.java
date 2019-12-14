package com.xinhai.caiyun.customermanage.api;

import java.util.List;
/*
* @ bootstrap table 数据回显
* */
public class PageResultForBootstrap<T> {
    private List<T> rows;
    private Integer total;
    public PageResultForBootstrap(){}

    public List<T> getRows() {
        return rows;
    }

    public void setRows(List<T> rows) {
        this.rows = rows;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }
}
