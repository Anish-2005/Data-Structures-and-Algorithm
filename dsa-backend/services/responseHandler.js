const success = (res, data, status = 200, meta = {}) => {
    const response = {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta
      }
    };
    res.status(status).json(response);
  };
  
  const error = (res, message, status = 400, err = null) => {
    const response = {
      success: false,
      message,
      meta: {
        timestamp: new Date().toISOString(),
        statusCode: status
      }
    };
    
    if (err && process.env.NODE_ENV !== 'production') {
      response.error = {
        name: err.name,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      };
    }
    
    res.status(status).json(response);
  };
  
  module.exports = { success, error };