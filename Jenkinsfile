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
          sh 'scp -r -v -o StrictHostKeyChecking=no *.yaml $SERVER_ADDRESS:~/'
          sh 'ssh -o StrictHostKeyChecking=no $SERVER_ADDRESS kubectl apply -f /users/user/redis.yaml -n jenkins'
          sh 'ssh -o StrictHostKeyChecking=no $SERVER_ADDRESS kubectl apply -f /users/user/redis-service.yaml -n jenkins'
        }
      }
    }
  }
}
