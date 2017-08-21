export const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export const mockResolve = (response) => {
  return jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, response)));
};

export const mockReject = (error) => {
  return jest.fn().mockImplementation(() => Promise.resolve(mockResponse(409, null, error)));
};