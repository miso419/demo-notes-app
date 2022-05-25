import * as sst from '@serverless-stack/resources';

export default class StorageStack extends sst.Stack {
  table;
  bucket;

  constructor(scope, id, props) {
    super(scope, id, props);

    // Create a DynamoDB
    this.table = new sst.Table(this, 'Notes', {
      fields: {
        userId: sst.TableFieldType.STRING,
        noteId: sst.TableFieldType.STRING,
      },
      primaryIndex: {
        partitionKey: 'userId',
        sortKey: 'noteId',
      },
    });

    // Create a S3 bucket
    this.bucket = new sst.Bucket(this, 'Uploads', {
      cors: [
        {
          maxAge: '1 day',
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
          allowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
        }
      ]
    });
  }
}