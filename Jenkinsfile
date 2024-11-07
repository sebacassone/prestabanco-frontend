pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = 'sebacassone/prestabanco-frontend'
        VITE_PAYROLL_BACKEND_SERVER = 'nginx'
        VITE_PAYROLL_BACKEND_PORT = '8000'
        PUBLIC_URL = 'nginx'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/sebacassone/prestabanco-frontend']]])
            }
        }

        stage('Build') {
            steps {
                script {
                    sh '''
                        docker build \
                        --build-arg VITE_PAYROLL_BACKEND_SERVER=$VITE_PAYROLL_BACKEND_SERVER \
                        --build-arg VITE_PAYROLL_BACKEND_PORT=$VITE_PAYROLL_BACKEND_PORT \
                        --build-arg PUBLIC_URL=$PUBLIC_URL \
                        -t $DOCKER_IMAGE .
                    '''
                }
            }
        }

        stage('Push') {
            steps {
                script {
                    echo "Logging into DockerHub..."
                    sh 'docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'

                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        sh 'docker push $DOCKER_IMAGE'
                    }
                }
            }
        }
    }
}
