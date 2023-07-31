import json
import boto3
import base64


def lambda_handler(event, context):

    if event['httpMethod'] == 'POST':

        body = json.loads(event['body'])
        action = body.get('action')
        image = base64.b64decode(body['image'])

        client = boto3.client("rekognition", region_name='us-east-1')
        response = client.detect_faces(Image={'Bytes': image})

        return {
            'statusCode': 200,
            'body': json.dumps(response['FaceDetails'])
        }

    elif event['httpMethod'] == 'GET':
        return {
            'statusCode': 200,
            'body': json.dumps("Valid GET request")
        }

    else:
        return {
            'statusCode': 404,
            'body': json.dumps("Invalid Request")
        }


def detect_labels_local_file(image):

    client = boto3.client("rekognition", region_name='us-east-1')

    response = client.detect_faces(Image={'Bytes': image})

    return (response['FaceDetails'])
