import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";
import Media from "./collections/Media";
import People from "./collections/People";
import Project from "./collections/Projects";
import Tags from "./collections/Tags";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }), // or postgresAdapter({}),
  editor: slateEditor({}),
  collections: [Users, Media, People, Project, Tags],
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
  ],
  serverURL: process.env.PAYLOAD_URL,
  // CORS
  cors: ["http://localhost:3000", "https://p01--admin--jh7ls6pxcdjh.code.run/", "https://portfolio-xvd.vercel.app"],
  csrf: ["http://localhost:3000", "https://p01--admin--jh7ls6pxcdjh.code.run/", "https://portfolio-xvd.vercel.app"],
});
