import json
import boto3
import base64


def lambda_handler(event, context):

    if event['httpMethod'] == 'POST':

        body = json.loads(event['body'])
        action = body.get('action')
        image = base64.b64decode(body['image'])
        print(f"Action is {action}")
        print(f"Image is {body['image']}")
        response = []

        match action:
            case 'detectFace':
                response = detectFace(image)

            case 'detectLabel':
                response = detectLabel(image)

        return {
            'statusCode': 200,
            'body': json.dumps(response)
        }

    else:
        return {
            'statusCode': 404,
            'body': json.dumps("Invalid Request")
        }


def detectFace(image):

    client = boto3.client("rekognition", region_name='us-east-1')

    response = client.detect_faces(Image={'Bytes': image})

    return (response['FaceDetails'])


def detectLabel(image):
    client = boto3.client("rekognition", region_name='us-east-1')

    response = client.detect_labels(Image={'Bytes': image})

    return (response['Labels'])
