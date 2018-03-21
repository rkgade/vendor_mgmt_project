pipeline {
  agent {
    node {
      label 'commandcenter'
    }
    
  }
  stages {
    stage('build') {
      steps {
        echo 'Build Success'
      }
    }
    stage('test') {
      steps {
        echo 'testing sucess'
      }
    }
    stage('prod') {
      steps {
        echo 'Delivered'
      }
    }
  }
}