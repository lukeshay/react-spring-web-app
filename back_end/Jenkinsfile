void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: env.GIT_URL],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "Jenkins/back-end/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

pipeline {
  agent any

  environment {
    SECRET_KEY = credentials('jenkins-aws-secret-key-id')
    ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
    JWT_SECRET = credentials('jenkins-jwt-secret')
    REFRESH_SECRET = credentials('jenkins-refresh-secret')
  }
  stages {
    stage('Build') {
      steps {
        echo 'Building...'
        setBuildStatus('Starting build', 'PENDING')
        sh 'cd back_end && make build'
      }
    }
    stage('Lint') {
      steps {
        echo 'Linting...'
        sh 'cd back_end && make lint'
      }
    }
    stage('Test') {
      steps {
        echo 'Testing...'
        sh 'cd back_end && make test'
      }
    }
    stage('Coverage') {
      steps {
        echo 'Getting coverage...'
        sh 'cd back_end && make coverage'
      }
    }
    stage('Deploy') {
      when {
        branch 'master'
      }
      steps {
        echo 'Deploying...'
//         build job: '', propagate: true, wait: true
      }
    }
  }
  post {
    success {
      setBuildStatus('Build succeeded', 'SUCCESS');
    }
    failure {
      setBuildStatus('Build failed', 'FAILURE');
    }
  }
}