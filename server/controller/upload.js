import * as dotenv from "dotenv"
dotenv.config();
import crypto from "crypto"
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY


const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId,
        secretAccessKey
    },
})

function splitSignedUrl(url) {
    const [baseUrl, fieldsString] = url.split('?');
    const fields = fieldsString.split('&')
        .reduce((acc, field) => {
            const [key, value] = field.split('=');
            acc[key] = value;
            return acc;
        }, {});

    return {
        url: baseUrl,
        fields
    };
}


export const getUploadedFile = async (req, res) => {

    try {
        const token = req.get("Authorization").split(' ')[1]
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await User.findOne({ _id: decoded.id }).sort({ createdAt: 'desc' });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const files = user.files || [];
        for (let file of files) {
            const getObjectParams = {
                Bucket: bucketName,
                Key: file.secureFileName
            }

            const command = new GetObjectCommand(getObjectParams);
            const signedUrl = await getSignedUrl(s3, command, { expiresIn: 30 });
            file.data = splitSignedUrl(signedUrl);


        }
        res.send(files)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}


export const uploadFile = async (req, res) => {

    try {
        const token = req.get("Authorization").split(' ')[1]
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Check if the user exists in the database(Logged in)
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const secureFileName = generateFileName()

        const uploadParams = {
            Bucket: bucketName,
            region: bucketRegion,
            Body: req.file.buffer,
            Key: secureFileName,
            ContentType: req.file.mimetype,
        }

        // Send the upload to S3
        const command = new PutObjectCommand(uploadParams)
        await s3.send(command);

        // Update the user with the newly uploaded file
        const file = {
            fileName: req.file.originalname,
            secureFileName: secureFileName,
            fileSize: req.file.size,
            fileType: req.file.mimetype
        };

        user.files.push(file);

        await User.findOneAndUpdate(
            { _id: decoded.id },
            { $set: { files: user.files } },
            { new: true }
        );

        res.status(200).json({
            message: "File Uploaded Successfully!"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message })
    }
}

