package com.xinhai.caiyun.customermanage.api;

public class Jcb {
    private String markid;
    private String jcbname;
    private String jcbdl;

    public String getMarkid() {
        return markid;
    }

    public void setMarkid(String markid) {
        this.markid = markid;
    }

    public String getJcbname() {
        return jcbname;
    }

    public void setJcbname(String jcbname) {
        this.jcbname = jcbname;
    }

    public String getJcbdl() {
        return jcbdl;
    }

    public void setJcbdl(String jcbdl) {
        this.jcbdl = jcbdl;
    }

    @Override
    public String toString() {
        return "Jcb{" +
                "markid='" + markid + '\'' +
                ", jcbname='" + jcbname + '\'' +
                ", jcbdl='" + jcbdl + '\'' +
                '}';
    }
}
