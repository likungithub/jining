package com.xinhai.caiyun.customermanage.api;

/**
 * 意向客户跟进附件信息 实体类
 * Created by 王硕 on 2018/4/11 0011.
 */
public class FollowUpFile {
    /**
     * id
     */
    private long id;
    /**
     * 跟进id
     */
    private String followUpId;
    /**
     * 附件名称
     */
    private String fileName;
    /**
     * 附件路径
     */
    private String fileUrl;
    /**
     * 删除标志
     */
    private String deleteFlag;
    /**
     * 跟进状态
     */
    private String followType;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFollowUpId() {
        return followUpId;
    }

    public void setFollowUpId(String followUpId) {
        this.followUpId = followUpId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(String deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public String getFollowType() {
        return followType;
    }

    public void setFollowType(String followType) {
        this.followType = followType;
    }
}
