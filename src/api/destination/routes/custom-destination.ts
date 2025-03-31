export default {
  routes: [
    {
      method: "GET",
      path: "/destinations/tours/:slug",
      handler: "custom-destination.findToursBySlug",
      config: {
        auth: false, // Đặt true nếu cần xác thực
        policies: [],
      },
    },
  ],
};
