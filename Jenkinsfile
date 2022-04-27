pipeline {
  agent none
  environment {
    docker_user = "vulongm"
  }
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
          sh 'cd node; docker build -t $DOCKER_USER/node:$BUILD_NUMBER .'
          sh 'docker push $DOCKER_USER/node:$BUILD_NUMBER'
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
          sh "sed -i 's/DOCKER_REGISTRY/${docker_user}/g' node.yaml"
          sh "sed -i 's/BUILD_NUMBER/${BUILD_NUMBER}/g' node.yaml"
          sh 'scp -r -v -o StrictHostKeyChecking=no *.yaml $SERVER_ADDRESS:~/'
          sh 'ssh -o StrictHostKeyChecking=no $SERVER_ADDRESS kubectl apply -f /users/lngo/node.yaml -n jenkins'
          sh 'ssh -o StrictHostKeyChecking=no $SERVER_ADDRESS kubectl apply -f /users/lngo/node-service.yaml -n jenkins'
        }
      }
    }
  }
}
