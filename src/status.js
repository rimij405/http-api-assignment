const codes = {
  200: {
    message: 'This is a successful response.',
  },
  404: {
    id: 'notFound',
    message: 'The page you were looking for was not found.',
  },
  401: {
    id: 'unauthorized',
    message: 'Missing loggedIn query parameter set to yes.',
  },
  400: {
    id: 'badRequest',
    message: 'Missing valid query parameter set to true.',
  },
  403: {
    id: 'forbidden',
    message: 'You do not have access to this content.',
  },
  500: {
    id: 'internalError',
    message: 'Internal Server Error.',
  },
  501: {
    id: 'notImplemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
  },
};

module.exports = codes;
