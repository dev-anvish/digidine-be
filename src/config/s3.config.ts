import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: 'your-region', // e.g., 'ap-south-1'
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const S3_BUCKET = 'your-bucket-name';
