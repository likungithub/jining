package com.xinhai.caiyun.commonmanager.controller;

/**
 * @description:
 * @version: v1.0
 * @author lixp
 * @date: 2017年11月6日 上午8:43:01
 */
import java.io.*;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

//操作查找文件的类
public class PropertiesModify {
    static int countFiles = 0;// 声明统计文件个数的变量
    static int countFolders = 0;// 声明统计文件夹的变量


    public static File[] searchFile(File folder, final String keyWord) {// 递归查找包含关键字的文件

        File[] subFolders = folder.listFiles(new FileFilter() {// 运用内部匿名类获得文件
                    @Override
                    public boolean accept(File pathname) {// 实现FileFilter类的accept方法
                        if (pathname.isFile())// 如果是文件
                            countFiles++;
                        else
                            // 如果是目录
                            countFolders++;
                        if (pathname.isDirectory()
                                || (pathname.isFile() && pathname.getName()
                                        .toLowerCase()
                                        .contains(keyWord.toLowerCase()))) {// 目录或文件包含关键字
                            if (pathname.getName().contains("target") || pathname.getName().contains("-api") || pathname.getName().contains("-business")) {
                                return false;
                            }
                            return true;
                        }
                        return false;
                    }
                });

        List<File> result = new ArrayList<File>();// 声明一个集合
        for (int i = 0; i < subFolders.length; i++) {// 循环显示文件夹或文件
            if (subFolders[i].isFile()) {// 如果是文件则将文件添加到结果列表中
                result.add(subFolders[i]);
            } else {// 如果是文件夹，则递归调用本方法，然后把所有的文件加到结果列表中
                File[] foldResult = searchFile(subFolders[i], keyWord);
                for (int j = 0; j < foldResult.length; j++) {// 循环显示文件
                    result.add(foldResult[j]);// 文件保存到集合中
                }
            }
        }

        File files[] = new File[result.size()];// 声明文件数组，长度为集合的长度
        result.toArray(files);// 集合数组化
        return files;
    }


    public static void main(String[] args) throws UnsupportedEncodingException {
        URLDecoder decoder = new URLDecoder();
        String filePath = decoder.decode(PropertiesModify.class.getClassLoader().getResource("").toString(),"utf-8");
        filePath = filePath.substring(6,31);
        File folder = new File("E:\\YuanMa\\jining\\feicheng1\\feicheng");// 默认目录
        String keyword = "global.properties";
        if (!folder.exists()) {// 如果文件夹不存在
            System.out.println("目录不存在：" + folder.getAbsolutePath());
            return;
        }
        //修改properties
        File[] result = searchFile(folder, keyword);// 调用方法获得文件数组
        System.out.println("在 " + folder + " 以及所有子文件时查找对象" + keyword);
        System.out.println("查找了" + countFiles + " 个文件，" + countFolders
                + " 个文件夹，共找到 " + result.length + " 个符合条件的文件：");
        
        for (int i = 1; i < result.length; i++) {// 循环显示文件
            File file = result[i];
            System.out.println(file.getAbsolutePath() + " ");// 显示文件绝对路径
            //修改global.properties 文件
            copyFile(result[0].getAbsolutePath(),file.getAbsolutePath());
        }

    }

    /**
     * 复制单个文件
     * 
     * @param oldPath
     *            String 原文件路径 如：c:/fqf.txt
     * @param newPath
     *            String 复制后路径 如：f:/fqf.txt
     * @return boolean
     */
    public  static void copyFile(String oldPath, String newPath) {
        try {
            int bytesum = 0;
            int byteread = 0;
            File oldfile = new File(oldPath);
            if (oldfile.exists()) { // 文件存在时
                InputStream inStream = new FileInputStream(oldPath); // 读入原文件
                FileOutputStream fs = new FileOutputStream(newPath);
                byte[] buffer = new byte[1444];
                int length;
                while ((byteread = inStream.read(buffer)) != -1) {
                    bytesum += byteread; // 字节数 文件大小
                    System.out.println(bytesum);
                    fs.write(buffer, 0, byteread);
                }
                inStream.close();
            }
        } catch (Exception e) {
            System.out.println("复制单个文件操作出错");
            e.printStackTrace();

        }

    }

}