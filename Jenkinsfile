pipeline {
  agent { docker 'node:6.2' }

  stages {
    stage('install') {
      steps {
        sh 'npm --version'
        sh 'npm install'
      }
    }

    stage('build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('test') {
      steps {
        sh 'npm test'
      }
    }

    stage('deploy') {
      steps {
        publishHTML (target: [
        		allowMissing: false,
        		alwaysLinkToLastBuild: false,
        		keepAll: true,
        		reportDir: 'www',
        		reportFiles: 'index.html',
        		reportName: "Application"
        		])
      }
    }
  }
}
