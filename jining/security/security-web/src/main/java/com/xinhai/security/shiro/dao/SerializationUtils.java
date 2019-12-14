package com.xinhai.security.shiro.dao;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import org.apache.shiro.session.Session;

/**
 * Created by fanxi on 2016-5-11.
 */
public class SerializationUtils {
  public static byte[] serialize(Object state) {
    ObjectOutputStream oos = null;
    try {
      ByteArrayOutputStream bos = new ByteArrayOutputStream(512);
      oos = new ObjectOutputStream(bos);
      oos.writeObject(state);
      oos.flush();
      return bos.toByteArray();
    } catch (IOException e) {
      throw new IllegalArgumentException(e);
    } finally {
      if (oos != null)
        try {
          oos.close();
        } catch (IOException e) {
        }
    }
  }

  public static <T> T deserialize(byte[] byteArray) {
    ObjectInputStream oip = null;
    try {
      oip = new ObjectInputStream(new ByteArrayInputStream(byteArray));

      Object result = oip.readObject();
      return (T) result;
    } catch (IOException e) {
      throw new IllegalArgumentException(e);
    } catch (ClassNotFoundException e) {
      throw new IllegalArgumentException(e);
    } finally {
      if (oip != null)
        try {
          oip.close();
        } catch (IOException e) {
        }
    }
  }
  
  /**
   * Session反序列化
   * @param bytes bytes
   * @return Object
   */
  public static Session unserialize(byte[] bytes) {
      ByteArrayInputStream bais = null;
      ObjectInputStream ois = null;
      try {
          // 反序列化
          bais = new ByteArrayInputStream(bytes);
          ois = new ObjectInputStream(bais);
          return (Session)ois.readObject();
      } catch (Exception e) {
          new IllegalArgumentException(e);
      } finally {
          if (ois != null)
              try {
                  ois.close();
              } catch (IOException e) {
              }
          if (bais != null)
              try {
                  bais.close();
              } catch (IOException e) {
              }
          
          }
      return null;
  }
}
