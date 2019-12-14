package com.xinhai.security.api;

import org.springframework.util.StringUtils;

import java.util.Set;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

public class SecurityResourceTag extends TagSupport { 

  private static final long serialVersionUID = 8833958170778849746L;

  /**
   * 资源标识
   */
  protected String identifier;

  private boolean hasTextIdentifier = false;

  protected void verifyAttributes() throws JspException {
    hasTextIdentifier = StringUtils.hasText(identifier);
    if (!hasTextIdentifier) {
      throw new JspException("The 'identifier' must be set!");
    }
  }

  @Override
  public int doStartTag() throws JspException {
    if (!CurrentLoginUser.isLogin()) {
      return SKIP_BODY;
    }

    verifyAttributes();
    if (hasTextIdentifier) {
      Set<String> operatorAuthes = CurrentLoginUser.getOperatorAuth();
      if (operatorAuthes.size() != 0 && operatorAuthes.contains(identifier)) {
        return EVAL_BODY_INCLUDE;
      }
    }

    return SKIP_BODY;
  }

  public String getIdentifier() {
    return identifier;
  }

  public void setIdentifier(String identifier) {
    this.identifier = identifier;
  }

}
