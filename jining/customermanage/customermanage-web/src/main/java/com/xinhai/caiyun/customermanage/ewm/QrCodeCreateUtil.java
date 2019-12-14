package com.xinhai.caiyun.customermanage.ewm;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;
import org.apache.commons.codec.binary.Base64;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;

public class QrCodeCreateUtil {
    public static String createQrCode(String content, int qrCodeSize) {
        try {
            MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
            Map hints = new HashMap();
            hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
            BitMatrix bitMatrix = multiFormatWriter.encode(content, BarcodeFormat.QR_CODE, qrCodeSize, qrCodeSize, hints);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "jpg", outputStream);
            byte[] b = Base64.encodeBase64(outputStream.toByteArray());
            String base64 = new String(b);
            outputStream.close();
            String head = "data:image/jpg;base64,";
            System.out.println(base64);
            return head + base64;
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }
}