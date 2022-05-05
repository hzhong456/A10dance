pipeline {
  agent none
  stages {
    stage('Publish') {
        agent {
          kubernetes {
            inheritFrom 'agent-template'
          }
        }
      steps{
        container('docker') {
          sh 'echo $DOCKER_TOKEN | docker login --username $DOCKER_USER --password-stdin'
          sh 'cd attendance-node; docker build -t $DOCKER_USER/attendance-node:$BUILD_NUMBER .'
          sh 'docker push $DOCKER_USER/attendance-node:$BUILD_NUMBER'
        }
      }
    }
    stage ('Deploy') {
      agent {
        node {
          label 'deploy'
        }
      }
      steps {
        sshagent(credentials: ['cloudlab']) {
          sh "sed -i 's/DOCKER_USER/${DOCKER_USER}/g' node.yaml"
          sh "sed -i 's/BUILD_NUMBER/${BUILD_NUMBER}/g' node.yaml"
          sh 'scp -r -v -o StrictHostKeyChecking=no *.yaml $USER@$SERVER_ADDRESS:~/'
          sh 'ssh -o StrictHostKeyChecking=no $USER@$SERVER_ADDRESS kubectl apply -f /users/$USER/node.yaml -n jenkins'
          sh 'ssh -o StrictHostKeyChecking=no $USER@$SERVER_ADDRESS kubectl apply -f /users/$USER/node-service.yaml -n jenkins'
        }
      }
    }
  }
}
