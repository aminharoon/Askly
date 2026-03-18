
export const handleError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const response = {
        success: false,
        statusCode: statusCode,
        message: err.message || "Something went wrong",

    }
    if (process.env.NODE_ENVIRONMENT === "development") {
        response.stack = err.stack;
    }
    res.status(statusCode).json(response);
}