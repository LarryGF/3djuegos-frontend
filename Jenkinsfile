pipeline {
  agent any
  stages {
    stage('Latest ') {
      steps {
        git(url: 'github/larrygf/3djuegos-frontend', branch: 'master', changelog: true)
      }
    }
    stage('Install dependencies') {
      steps {
        sh 'npm install'
        echo 'dependencies installed'
      }
    }
    stage('Build static files') {
      steps {
        sh 'npm run generate'
        echo 'static files built'
      }
    }
    stage('Check ') {
      steps {
        dir(path: 'dist') {
          fileExists 'index.html'
          echo 'everything cool'
        }

      }
    }
  }
}