package org.epam.utils;

import lombok.extern.log4j.Log4j2;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.Properties;

@Log4j2
public class ConfigReader {
    private static Properties properties;
    private static ConfigReader configReader;

    private ConfigReader()  {
        properties = new Properties();
        try(FileInputStream fs = new FileInputStream("src/test/resources/config.properties")){
            properties.load(fs);
        } catch (IOException exception) {
            log.error("File Cannot be found or InputStream is wrong\n{}", Arrays.toString(exception.getStackTrace()));
        }
    }

    public static ConfigReader getInstance(){
        if(configReader==null){
            configReader = new ConfigReader();
        }
        return configReader;
    }

    public String getProperty(String key){
        return properties.getProperty(key);
    }


}
