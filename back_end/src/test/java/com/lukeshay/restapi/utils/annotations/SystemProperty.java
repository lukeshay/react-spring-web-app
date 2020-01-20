package com.lukeshay.restapi.utils.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.junit.jupiter.api.extension.ExtendWith;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@ExtendWith(SystemPropertyExtension.class)
@Repeatable(SystemProperties.class)
public @interface SystemProperty {

  String key();

  String value() default "";
}
