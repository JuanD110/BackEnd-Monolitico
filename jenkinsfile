pipeline {
    agent any

    environment {
        MONGO_URI = credentials('MONGO_URI') // Credencial de MongoDB
    }

    stages {
        stage('Clonar repositorio') {
            steps {
                checkout scm
                echo "Repositorio clonado correctamente"
            }
        }

        stage('Construir Imagen Docker') {
            steps {
                script {
                    echo "Construyendo la imagen Docker..."
                    bat 'docker build -t juand110/backend-monolitico .'
                }
            }
        }

        stage('Desplegar Contenedor Docker') {
            steps {
                script {
                    echo "Desplegando el contenedor Docker..."
                    bat """
                        docker run -d ^
                        --name backend-monolitico ^
                        -e MONGO_URI=%MONGO_URI% ^
                        -p 4000:4000 ^
                        juand110/backend-monolitico
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline ejecutado exitosamente"
            emailext subject: "Pipeline Éxitoso - Backend Monolítico",
                     body: "El pipeline para el repositorio BackEnd-Monolitico ha terminado con éxito.",
                     to: "juandavidgh@gmail.com"
        }
        failure {
            echo "El pipeline falló"
            emailext subject: "Pipeline Fallido - Backend Monolítico",
                     body: "El pipeline para el repositorio BackEnd-Monolitico ha fallado. Por favor, revisa los logs en Jenkins.",
                     to: "juandavidgh@gmail.com"
        }
    }
}

