const createRequest = async ({ url, method = 'GET', data }) => {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
    },
  };

  if (data !== undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  let result = null;

  if (text) {
    try {
      result = JSON.parse(text);
    } catch (error) {
      throw new Error('Сервер вернул ответ не в формате JSON');
    }
  }

  if (!response.ok) {
    const message = result && (result.message || result.error);
    throw new Error(message || `Ошибка сервера: ${response.status}`);
  }

  return result;
};

export default createRequest;
