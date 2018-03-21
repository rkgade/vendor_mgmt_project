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
            git(url: 'git@github.com:rkgade/vendor_mgmt_project.git', branch: 'master', changelog: true)
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