package com.lukeshay.restapi.services;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AwsService {
  AWSCredentialsProvider credentialsProvider;

  @Value("${file.bucket.url}")
  private String bucketUrl;

  @Value("${file.bucket.name}")
  private String bucketName;

  public AwsService() {
    credentialsProvider =
        new AWSStaticCredentialsProvider(
            new BasicAWSCredentials(
                "AJI44VAODNQTV43TNOEQ", "iZ43dQIm5R+cYP7PIqDHOKEk89/M9BNApUe9JBqMq7w"));
  }

  public String uploadFileToS3(String fileName, MultipartFile file) {
    File converted = convertFile(file);

    AmazonS3 awsBuckets =
        AmazonS3ClientBuilder.standard()
            .withCredentials(credentialsProvider)
            .withEndpointConfiguration(new EndpointConfiguration(bucketUrl, "nyc3"))
            .build();

    awsBuckets.putObject(bucketName, fileName, converted);

    return String.format("%s.%s/%s", bucketName, bucketUrl, fileName);
  }

  private File convertFile(MultipartFile file) {
    File convFile = new File(file.getOriginalFilename());
    try {
      FileOutputStream fos = new FileOutputStream(convFile);
      fos.write(file.getBytes());
      fos.close();
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
    return convFile;
  }
}
