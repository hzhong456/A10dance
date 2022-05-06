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
          sh 'cd webui; docker build -t $DOCKER_USER/attendance-webui:$BUILD_NUMBER .'
          sh 'docker push $DOCKER_USER/attendance-webui:$BUILD_NUMBER'
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
          sh "sed -i 's/DOCKER_USER/${DOCKER_USER}/g' webui.yaml"
          sh "sed -i 's/BUILD_NUMBER/${BUILD_NUMBER}/g' webui.yaml"
          sh 'scp -r -v -o StrictHostKeyChecking=no *.yaml $USER@$SERVER_ADDRESS:~/'
          sh 'ssh -o StrictHostKeyChecking=no $USER@$SERVER_ADDRESS kubectl apply -f /users/$USER/webui.yaml -n jenkins'
          sh 'ssh -o StrictHostKeyChecking=no $USER@$SERVER_ADDRESS kubectl apply -f /users/$USER/webui-service.yaml -n jenkins'
        }
      }
    }
  }
}
