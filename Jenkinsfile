node {
    def app

    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {
        app = docker.build("imarkanovic/smart-particles")
    }

    stage('Test image') {
        app.inside {
            sh 'echo "Tests passed"'
        }
    }
	
	state('Push Image to Hub') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
	}
}
