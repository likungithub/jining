package com.xinhai.security.shiro.image;

import com.octo.captcha.service.CaptchaServiceException;
import com.octo.captcha.service.captchastore.FastHashMapCaptchaStore;
import com.octo.captcha.service.image.DefaultManageableImageCaptchaService;
import com.octo.captcha.service.image.ImageCaptchaService;

import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CustomImageCaptchaServlet extends HttpServlet implements Servlet {
  private static final long serialVersionUID = -3176550168769654387L;

  private static ImageCaptchaService service = new DefaultManageableImageCaptchaService(
          new FastHashMapCaptchaStore(), new GMailEngine(), 180,
          100000, 75000);

  @Override
  protected void doGet(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws ServletException, IOException {
    httpServletResponse.setDateHeader("Expires", 0L);
    httpServletResponse.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    httpServletResponse.addHeader("Cache-Control", "post-check=0, pre-check=0");
    httpServletResponse.setHeader("Pragma", "no-cache");
    httpServletResponse.setContentType("image/jpeg");
    ServletOutputStream out = httpServletResponse.getOutputStream();

    try {
      String captchaId = httpServletRequest.getSession(true).getId();
      BufferedImage challenge = (BufferedImage) service.getChallengeForID(captchaId, httpServletRequest.getLocale());
      ImageIO.write(challenge, "jpg", out);
      out.flush();
    } catch (CaptchaServiceException e) {
    } finally {
      out.close();
    }

    try {
      out.flush();
    } finally {
      out.close();
    }
  }

  public static boolean validateResponse(HttpServletRequest request, String userCaptchaResponse) {
    if (request.getSession(false) == null) {
      return false;
    } else {
      boolean validated = false;

      try {
        validated = service.validateResponseForID(
                request.getSession().getId(),
                userCaptchaResponse);
      } catch (CaptchaServiceException ex) {
      }

      return validated;
    }
  }
}
