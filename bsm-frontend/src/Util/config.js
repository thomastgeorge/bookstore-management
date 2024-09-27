const serverURL = process.env.REACT_APP_SERVER_URL

const config = {
  api: {
    auth: {
      login: `${serverURL}/api/v1/auth/login`,
      signup:   `${serverURL}/api/v1/auth/signup`,
    },

    user: {
      forgotPassword: `${serverURL}/api/v1/user/updatePasswordLogin/{{email}}`,
      updatePassword: `${serverURL}/api/v1/user/updatePassword/{{userId}}`,
    },

    customer: {
      all: `${serverURL}/api/v1/customer`,
      delete: `${serverURL}/api/v1/customer/{{customerId}}`,
      search: `${serverURL}/api/v1/customer/search`,
      totalCount: `${serverURL}/api/v1/customer/count`,
      getByUserId: `${serverURL}/api/v1/customer/userId/{{userId}}`,
      update: `${serverURL}/api/v1/customer/{{customerId}}`,
    },

    address: {
      getByCustomerId: `${serverURL}/api/v1/address/customerId/{{customerId}}`,
      create: `${serverURL}/api/v1/address/create/{{customerId}}`,
      update: `${serverURL}/api/v1/address/update/{{customerId}}`,
      delete: `${serverURL}/api/v1/address/{{addressId}}`,
    },

    book: {
      all: `${serverURL}/api/v1/book`,
      getByBookId: `${serverURL}/api/v1/book/{{bookId}}`,
      getByCategory: `${serverURL}/api/v1/book/category/{{category}}`,
      search: `${serverURL}/api/v1/book/{{role}}/search`,
      update: `${serverURL}/api/v1/book/update/{{bookId}}/{{category}}`,
      create: `${serverURL}/api/v1/book/create/{{category}}`,
      delete: `${serverURL}/api/v1/book/delete/{{bookId}}`,
      totalCount: `${serverURL}/api/v1/book/count`,
      newArrivals: `${serverURL}/api/v1/book/new-arrivals/8`,
      topRated: `${serverURL}/api/v1/book/top-rated/8`,
      bestSelling: `${serverURL}/api/v1/book/best-selling`,
    },

    review: {
      all: `${serverURL}/api/v1/review`,
      reviewsByBook: `${serverURL}/api/v1/review/book/{{bookId}}`,
      create: `${serverURL}/api/v1/review/create/{{bookId}}`,
      delete: `${serverURL}/api/v1/review/{{reviewId}}`,
      getByBookId: `${serverURL}/api/v1/review/book/{{bookId}}`,
      getByCustomer: `${serverURL}/api/v1/review/customer`,
      updateByCustomer: `${serverURL}/api/v1/review`,
      getByCustomerIdAdmin: `${serverURL}/api/v1/review/customer/admin/{{customerId}}`,
    },

    cart: {
      create: `${serverURL}/api/v1/cart/create/{{bookId}}`,
      getByCustomer: `${serverURL}/api/v1/cart/customer`,
      update: `${serverURL}/api/v1/cart/{{cartId}}/{{quantity}}`,
      delete: `${serverURL}/api/v1/cart/{cartId}}`,
    },

    category: {
      category: `${serverURL}/api/v1/category`,
      delete: `${serverURL}/api/v1/category/{{id}}`,
    },

    order: {
      all: `${serverURL}/api/v1/order`,
      totalCount: `${serverURL}/api/v1/order/count`,
      todayCount: `${serverURL}/api/v1/order/todays/count`,
      totalRevenue: `${serverURL}/api/v1/order/total/revenue`,
      todayRevenue: `${serverURL}/api/v1/order/todays/revenue`,
      search: `${serverURL}/api/v1/order/search`,
      delete: `${serverURL}/api/v1/order/{{orderId}}`,
      create: `${serverURL}/api/v1/order/create/{{customerId}}/{{addressId}}`,
      getByCustomerId: `${serverURL}/api/v1/order/customer/{{customerId}}`
    },
  }
}

export default config;