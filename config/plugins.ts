module.exports = ({ env }) => ({
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        destination: {
          field: "slug",
          references: "title",
        },
        blog: {
          field: "slug",
          references: "title",
        },
        tour: {
          field: "slug",
          references: "title",
        },
      },
    },
  },
});
