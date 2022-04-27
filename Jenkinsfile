pipeline {
  agent none
  stages {
    stage ('Deploy') {
      agent {
        node {
          label 'deploy'
        }
      }
      steps {
        sshagent(credentials: ['cloudlab']) {
          sh 'scp -r -v -o StrictHostKeyChecking=no *.yaml user@0.0.0.0:~/'
          sh 'ssh -o StrictHostKeyChecking=no user@0.0.0.0 kubectl apply -f /users/user/redis.yaml -n jenkins'
          sh 'ssh -o StrictHostKeyChecking=no user@0.0.0.0 kubectl apply -f /users/user/redis-service.yaml -n jenkins'
        }
      }
    }
  }
}
