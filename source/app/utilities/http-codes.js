const httpCodes = {
  ok: 200,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  invalidRequest: 422,
  serverError: 500,

  success: function(code) {
    return code >= 200 && code < 300
  }
}

export default httpCodes
