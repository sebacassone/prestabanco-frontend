pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = 'sebacassone/prestabanco-frontend'
        VITE_PAYROLL_BACKEND_SERVER = 'nginx'
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
                        -t $DOCKER_IMAGE .
                    '''
                }
            }
        }

        stage('Push') {
            steps {
                script {
                    echo "Logging into DockerHub..."
                    // Inicio de sesión en DockerHub usando password-stdin
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'

                    // Empujar la imagen al repositorio DockerHub
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }
    }
}
