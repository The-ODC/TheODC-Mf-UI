const DEFAULT_STATUS_MESSAGES = {
  network: "Network error or no response received. Please try again.",
  400: "Bad Request. Please check your input.",
  401: "Unauthorized. Please login again.",
  403: "Forbidden. You don't have permission.",
  404: "Requested resource not found.",
  408: "Request timed out. Please try again.",
  422: "Unprocessable Entity. Check your data.",
  429: "Too many requests. Please wait and try again.",
  500: "Internal server error.",
  502: "Bad Gateway. Server received invalid response.",
  503: "Service unavailable. Try again later.",
  504: "Gateway timeout. Try again in a few moments.",
  default: "Unexpected error occurred. Please try again.",
};

function firstStringValue(value) {
  if (typeof value === "string" && value.trim() !== "") return value;
  if (Array.isArray(value)) return value.find((item) => typeof item === "string");
  if (!value || typeof value !== "object") return null;

  return Object.values(value).reduce((message, item) => {
    if (message) return message;
    return firstStringValue(item);
  }, null);
}

export function getApiErrorStatus(error = {}) {
  return error?.response?.status || error?.status || null;
}

export function getApiErrorData(error = {}) {
  return error?.response?.data || error?.data || null;
}

export function getApiErrorMessage(error = {}, messages = {}) {
  const statusMessages = { ...DEFAULT_STATUS_MESSAGES, ...messages };
  const status = getApiErrorStatus(error);
  const errorData = getApiErrorData(error);
  const apiMessage =
    firstStringValue(errorData?.error) ||
    firstStringValue(errorData?.message) ||
    firstStringValue(errorData?.errors);

  if (!status && !apiMessage) {
    return firstStringValue(error?.message) || statusMessages.network;
  }

  if (apiMessage) return apiMessage;
  return statusMessages[status] || firstStringValue(error?.message) || statusMessages.default;
}

export function createApiError(error = {}, options = {}) {
  const apiError = new Error(getApiErrorMessage(error, options.messages));

  apiError.status = getApiErrorStatus(error);
  apiError.data = getApiErrorData(error);
  apiError.originalError = error;
  apiError.response = error?.response;

  return apiError;
}

export function handleApiError(error = {}, options = {}) {
  const apiError = createApiError(error, options);

  if (options.logErrors && typeof options.logger === "function") {
    options.logger(apiError, error);
  }

  if (apiError.status === 401 && typeof options.onUnauthorized === "function") {
    options.onUnauthorized(apiError, error);
  }

  if (typeof options.notify === "function") {
    options.notify(apiError.message, apiError, error);
  }

  return apiError;
}

function setAuthorizationHeader(config, headerValue) {
  if (!headerValue) return config;

  const headers = config.headers || {};

  if (typeof headers.set === "function") {
    headers.set("Authorization", headerValue);
  } else {
    headers.Authorization = headerValue;
  }

  config.headers = headers;
  return config;
}

export function createAxiosInstance({
  axios,
  baseURL,
  timeout = 10000,
  headers,
  getToken,
  getAuthHeader = (token) => `Bearer ${token}`,
  onRequest,
  onRequestError,
  onError,
  messages,
  notifyError,
  onUnauthorized,
  logger,
  logErrors = false,
} = {}) {
  if (!axios || typeof axios.create !== "function") {
    throw new Error("createAxiosInstance requires an axios package instance.");
  }

  const instance = axios.create({
    baseURL,
    timeout,
    headers,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = typeof getToken === "function" ? getToken(config) : getToken;
      setAuthorizationHeader(config, token ? getAuthHeader(token) : "");

      return typeof onRequest === "function" ? onRequest(config) : config;
    },
    (error) => {
      if (typeof onRequestError === "function") {
        onRequestError(error);
      }

      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const apiError = handleApiError(error, {
        messages,
        notify: notifyError,
        onUnauthorized,
        logger,
        logErrors,
      });

      if (typeof onError === "function") {
        onError(apiError, error);
      }

      return Promise.reject(apiError);
    }
  );

  return instance;
}
