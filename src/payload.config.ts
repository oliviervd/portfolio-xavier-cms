import {cloudStorage} from "@payloadcms/plugin-cloud-storage";
import {s3Adapter} from "@payloadcms/plugin-cloud-storage/s3";
import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: s3Adapter({
            config: {
              endpoint: process.env.S3_ENDPOINT,
              region: process.env.S3_REGION,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
              },
            },
            bucket: process.env.S3_BUCKET,
          }),
        },
      },
    }), 
    db: mongooseAdapter({
      url: process.env.DATABASE_URI
    })
  ],
  serverURL: process.env.PAYLOAD_URL,
  // CORS
  cors: ["http://localhost:3000", "https://p02--admin--wjrlktvqwrfv.code.run/"],
  csrf: ["http://localhost:3000", "https://p02--admin--wjrlktvqwrfv.code.run/"],

});
