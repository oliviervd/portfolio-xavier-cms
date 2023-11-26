import { CollectionConfig } from "payload/types";

import contentStatus from "../fields/contentStatus";
import projectCategory from "../fields/postCategory";
import lastUpdated from "../fields/lastUpdated";
import projectStatus from "../fields/projectStatus";

const Project: CollectionConfig = {
  slug: "project",
  admin: {
    useAsTitle: "projectTitle",
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    contentStatus,
    lastUpdated,
    {
      name: "highlight",
      label: "highlight",
      type: "checkbox",
      admin: {
        position: "sidebar",
        description:
          "select if this project is shown on the mobile UI as a highlight",
      },
    },
    {
      name: "projectTitle",
      label: "title (project)",
      type: "text",
      required: true,
    },

    {
      type: "group",
      name: "projectInformation",
      fields: [
        projectCategory,
        {
          name: "description",
          type: "richText",
          label: "Project description",
        },
        {
          name: "techspecs",
          type: "richText",
          label: "technical specs",
        },
        {
          name: "tags",
          hasMany: true,
          type: "relationship",
          relationTo: "tags",
        },
        {
          type: "row",
          fields: [
            {
              name: "directedBy",
              label: "directed by",
              type: "relationship",
              relationTo: "people",
            },
            {
              name: "producedBy",
              label: "produced by",
              type: "relationship",
              relationTo: "people",
            },
            {
              name: "artDirecton",
              label: "art direction",
              type: "relationship",
              relationTo: "people",
            },
          ],
        },
        {
          type: "row",
          fields: [
            projectStatus,
            {
              name: "releaseDate",
              label: "release date",
              type: "date",
              admin: {
                description: "release date for the project (if known)",
              },
            },
          ],
        },
      ],
    },
    {
      name: "heroImage",
      label: "main media",
      admin: {
        description:
          "image to be shown as placeholder when browsing portfolio.",
      },
      type: "relationship",
      relationTo: "media",
    },

    {
      name: "gallery",
      type: "array",
      admin: {
        description: "collection of images that will be shown in the gallery",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: false,
        },
      ],
    },

    {
      type: "group",
      label: "media",
      admin: {
        description:
          "add extarnal media links (first item in the gallery will serve as the main item",
      },
      name: "mediaGroup",
      fields: [
        {
          name: "vimeo",
          type: "array",
          fields: [
            {
              // vimeo
              name: "vimeoURI",
              label: "vimeo ID",
              type: "text",
            },
          ],
        },
        {
          name: "youtube",
          type: "array",
          fields: [
            {
              // youtube
              name: "youtubeURI",
              label: "Youtube ID",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};

export default Project;
