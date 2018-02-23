#! /bin/bash
if [ -z "$TRAVIS_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    if [ "$TRAVIS_BRANCH" == "master" ]; then

        # Provides docker with a 12 hour auth token
        export PATH=$PATH:$HOME/.local/bin
        eval $(aws ecr get-login --no-include-email --region $AWS_DEFAULT_REGION)

        echo "Building $IMAGE_NAME"
        docker build -t $IMAGE_NAME .
        echo "Pushing $IMAGE_NAME:latest"
        docker tag $IMAGE_NAME:latest $REMOTE_IMAGE_URL:latest
        docker push $REMOTE_IMAGE_URL:latest
        echo "Successfully pushed $IMAGE_NAME:latest"
    else
        echo "Skipping deploy, branch not master"
    fi
else
    echo "Skipping deploy, pull request"
fi
