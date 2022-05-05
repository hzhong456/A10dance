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
          sh 'echo ${USER}'
          sh 'scp -r -v -o StrictHostKeyChecking=no *.yaml ${USER}@${SERVER_ADDRESS}:~/'
          sh 'ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_ADDRESS} kubectl apply -f /users/${USER}/postgres.yaml -n jenkins'
          sh 'ssh -o StrictHostKeyChecking=no ${USER}@${SERVER_ADDRESS} kubectl apply -f /users/${USER}/postgres-service.yaml -n jenkins'
        }
      }
    }
  }
}
