import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::destination.destination",
  ({ strapi }) => ({
    async findToursBySlug(ctx) {
      try {
        const { slug } = ctx.params;
        const { page = 1, pageSize = 10 } = ctx.query;

        // Tìm destination theo slug
        const destination = await strapi.entityService.findMany(
          "api::destination.destination",
          {
            filters: { slug },
            populate: {
              tours: {
                populate: {
                  seo: { populate: ["thumbnail"] }, // Populate thêm thumbnail trong seo
                },
              },
            },
          }
        );

        // Kiểm tra nếu không tìm thấy
        if (!destination || destination.length === 0) {
          return ctx.notFound("Destination not found");
        }

        // Lấy danh sách tour
        const tours = destination[0].tours || [];
        const totalTours = tours.length;
        const totalPages = Math.ceil(totalTours / pageSize);

        // Áp dụng phân trang
        const paginatedTours = tours.slice(
          (page - 1) * pageSize,
          page * pageSize
        );

        return ctx.send({
          data: paginatedTours,
          meta: {
            total: totalTours,
            page: Number(page),
            pageSize: Number(pageSize),
            totalPages,
          },
        });
      } catch (error) {
        console.error("Error:", error);
        ctx.internalServerError("An error occurred");
      }
    },
  })
);
