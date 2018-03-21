pipeline {
  agent {
    node {
      label 'commandcenter'
    }
    
  }
  stages {
    stage('build') {
      parallel {
        stage('build') {
          steps {
            echo 'Build Success'
          }
        }
        stage('git clone') {
          steps {
            git 'git@github.com:rkgade/vendor_mgmt_project.git'
          }
        }
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