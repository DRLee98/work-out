import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const BUCKET = "work-out";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}_${file.originalname}`);
    },
  }),
});

export const deleteFile = async (url) => {
  if (url) {
    const Key = url.split("amazonaws.com/")[1];
    aws.config.update({
      credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    await new aws.S3()
      .deleteObject(
        {
          Bucket: BUCKET,
          Key,
        },
        (err, data) => {
          if (err) {
            throw err;
          }
          return { ok: true };
        },
      )
      .promise();
  }
};

export const profileUpload = () => upload.single("profile");
