import { CollectionConfig } from "payload/types";

const People: CollectionConfig = {
  slug: "people",
  admin: {
    useAsTitle: "firstName",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "firstName",
      label: "first name (use only this when organisation)",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      label: "last name",
      type: "text",
      required: false,
    },
  ],
};

export default People;
