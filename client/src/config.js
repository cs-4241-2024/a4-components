let API = ''

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  API = '/api/'
} else {
  // production code
  API = 'https://a4-zihan-li-1.onrender.com'
}

export {
  API
}
