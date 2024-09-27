let API = ''

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  API = '/api/'
} else {
  // production code
  API = 'https://a4-yunynl.onrender.com'
}

export {
  API
}
