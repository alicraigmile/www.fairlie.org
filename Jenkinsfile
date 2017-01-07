#!groovy

node {

		currentBuild.result = "SUCCESS"

		try {


				stage('Checkout') {

						checkout scm

				}

				stage('Test') {

						env.NODE_ENV = "test"
						print "Environment will be : ${env.NODE_ENV}"

						sh "node -v"
						sh "npm prune"
						sh "npm install"
						sh "npm test"

				}

				stage('Build for Elastic Beanstalk') {

						sh "npm run build"
						archiveArtifacts artifacts: 'build/*.zip', fingerprint: true
				
				}

				stage('Deploy') {

						sh "ls build/*.zip"
						print "Deploy not implemented"

				}

				stage('Cleanup') {

						echo 'prune and cleanup'
						sh 'npm prune'
						sh 'rm node_modules -rf'
						sh 'rm build -rf'

						mail body: 'www.fairlie.org build successful - http://jenkins.xgusties.com/job/www.fairlie.org/lastSuccessfulBuild/artifact/build/',
								from: 'jenkins@xgusties.com',
								replyTo: 'jenkins@xgusties.com',
								subject: 'www.fairlie.org build successful',
								to: 'ali@craigmile.com'
				}
		}

		catch (err) {

				currentBuild.result = "FAILURE"

        mail body: 'www.fairlie.org build error is here: ${env.BUILD_URL}',
            from: 'jenkins@xgusties.com',
            replyTo: 'jenkins@xgusties.com',
            subject: 'www.fairlie.org build failed',
            to: 'ali@craigmile.com'

				throw err
		}

}
