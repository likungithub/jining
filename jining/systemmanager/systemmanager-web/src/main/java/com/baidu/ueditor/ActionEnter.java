//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.baidu.ueditor;

import com.baidu.ueditor.define.ActionMap;
import com.baidu.ueditor.define.BaseState;
import com.baidu.ueditor.define.State;
import com.baidu.ueditor.hunter.FileManager;
import com.baidu.ueditor.hunter.ImageHunter;
import com.baidu.ueditor.upload.Uploader;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public class ActionEnter {
    private HttpServletRequest request = null;
    private String rootPath = null;
    private String contextPath = null;
    private String actionType = null;
    private ConfigManager configManager = null;

    public ActionEnter(HttpServletRequest request, String rootPath) {
        this.request = request;
        this.rootPath = rootPath;
        this.actionType = request.getParameter("action");
        this.contextPath = request.getContextPath();
        this.configManager = ConfigManager.getInstance(this.rootPath, this.contextPath, request.getRequestURI());
    }

    public String exec() {
        String callbackName = this.request.getParameter("callback");
        return callbackName != null?(!this.validCallbackName(callbackName)?(new BaseState(false, 401)).toJSONString():callbackName + "(" + this.invoke() + ");"):this.invoke();
    }

    public String invoke() {
        if(this.actionType != null && ActionMap.mapping.containsKey(this.actionType)) {
            if(this.configManager != null && this.configManager.valid()) {
                State state = null;
                int actionCode = ActionMap.getType(this.actionType);
                Map conf = null;
                switch(actionCode) {
                    case 0:
                        return this.configManager.getAllConfig().toString();
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        conf = this.configManager.getConfig(actionCode);
                        state = (new Uploader(this.request, conf)).doExec();
                        break;
                    case 5:
                        conf = this.configManager.getConfig(actionCode);
                        String[] list = this.request.getParameterValues((String)conf.get("fieldName"));
                        state = (new ImageHunter(conf)).capture(list);
                        break;
                    case 6:
                    case 7:
                        conf = this.configManager.getConfig(actionCode);
                        int start = this.getStartIndex();
                        state = (new FileManager(conf)).listFile(start);
                }

                return state.toJSONString();
            } else {
                return (new BaseState(false, 102)).toJSONString();
            }
        } else {
            return (new BaseState(false, 101)).toJSONString();
        }
    }

    public int getStartIndex() {
        String start = this.request.getParameter("start");

        try {
            return Integer.parseInt(start);
        } catch (Exception var3) {
            return 0;
        }
    }

    public boolean validCallbackName(String name) {
        return name.matches("^[a-zA-Z_]+[\\w0-9_]*$");
    }
}
