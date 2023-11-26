import { CollectionConfig } from "payload/types";
import path from "path";

const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "title",
  },
  upload: {
    staticURL: "/media",
    staticDir: "/media",
    disableLocalStorage: true,
    adminThumbnail: ({ doc }) =>
      `https://p01--admin--jh7ls6pxcdjh.code.run/media/${doc.filename}`,
    mimeTypes: ["image/*"],
    /*
    imageSizes: [
      {
        name: "mobileThumbnail",
        width: 360,
        height: undefined,
        position: "centre",
      },
      {
        name: "webThumbnail",
        width: 720,
        height: undefined,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",
      },
    ],
    */
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
    {
      name: "title",
      type: "text",
    },
    {
      name: "caption",
      type: "text",
    },
    {
      name: "credits",
      type: "text",
    },
  ],
  /*
  hooks: {
    beforeValidate: [
      (req): void => {
        const image = req.data;
        // make sure uploaded image is big enough.
        //todo: add limit of how big an image can be (image size)? - encourage to use bitmap? - this could be an action that is documented in the sustainability manifest.
        if (image && image.width < 640) {
          throw new Error("Image must be at least 640px wide");
        }
      },
    ],
  },
  */
};

export default Media;
