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
          sh 'ssh -o StrictHostKeyChecking=no $SERVER_ADDRESS kubectl apply -f /users/${USER}/postgres.yaml -n jenkins'
          sh 'ssh -o StrictHostKeyChecking=no $SERVER_ADDRESS kubectl apply -f /users/${USER}/postgres-service.yaml -n jenkins'
        }
      }
    }
  }
}
