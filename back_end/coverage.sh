#!/bin/bash
./gradlew clean build -x verifyGoogleJavaFormat
./gradlew jacocoTestCoverageVerification
