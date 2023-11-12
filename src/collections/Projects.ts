import { CollectionConfig } from "payload/types";

import contentStatus from "../fields/contentStatus";
import projectCategory from "../fields/postCategory";
import lastUpdated from "../fields/lastUpdated";
import projectStatus from "../fields/projectStatus";
import People from "./People";

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
      name: "images",
      label: "image viewer (collection of stills)",
      type: "relationship",
      relationTo: "media",
    },

    {
      type: "group",
      label: "media",
      name: "mediaGroup",
      fields: [
        {
          // MEDIA URIS
          type: "row",
          fields: [
            {
              // vimeo
              name: "vimeoURI",
              label: "vimeo ID",
              type: "text",
            },
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
