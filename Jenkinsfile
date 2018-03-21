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
        stage('') {
          steps {
            git(url: 'https://github.com/rkgade/vendor_mgmt_project.git', branch: 'master', changelog: true)
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