import { API_BASE_URL } from "./config";

export function getWorkspaceConfig() {}

export async function saveCollection(uuid, workspace, annotations, apiUrl) {
  const url = `${apiUrl || API_BASE_URL}${uuid ? `&uuid=${uuid}` : ''}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    mode: "same-origin",
    credentials: "same-origin",
    body: JSON.stringify({ workspace, annotations }),
  });
  const json = await res.json();
}

export async function getCollection(uuid, apiUrl) {
  const url = `${apiUrl || API_BASE_URL}${uuid ? `&uuid=${uuid}` : ''}&select=annotations,workspace,collection`;
  const res = await fetch(url, {
    headers: {
      "Accept": "application/json"
    },
    mode: "same-origin",
    credentials: "same-origin",
  });
  return await res.json();
}

export function parseHashParameters(hash) {
  return hash
    .substring(1)
    .split("&")
    .reduce((params, keyValue) => {
      const [key, value] = keyValue.split("=");
      params[key] = value;
      return params;
    }, {});
}

export function getAllUrlParams(url) {
  // get query string from url (optional) or window
  let queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  const obj = {};

  // if query string exists
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    const arr = queryString.split('&');

    for (let i = 0; i < arr.length; i++) {
      // separate the keys and the values
      const a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      const paramName = a[0];
      let paramValue = typeof a[1] === 'undefined' ? true : decodeURIComponent(a[1]);

      // (optional) keep case consistent
      // paramName = paramName.toLowerCase();
      // if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // Try to parse paramValue as JSON
      const parsedValue = tryParseJSON(paramValue);
      if (parsedValue) {
        paramValue = parsedValue;
      }

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {
        // create key if it doesn't exist
        const key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          const index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string or an object
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

// Function to try parsing a string as JSON
function tryParseJSON(jsonString) {
  try {
    const o = JSON.parse(jsonString);
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {}

  return false;
}
