/* eslint-disable no-param-reassign */
/* eslint-disable no-empty */
/* eslint-disable no-plusplus */
/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
/* eslint-disable no-new */
/* eslint-disable prefer-destructuring */
/* eslint-disable require-jsdoc */
const api = 'https://dev.digitalartsarchive.at/index.php?id=169&controller=Collections';
export function getManifestsFromHash() {
  const url = new URL(window.location.href);
  const { hash } = url;

  if (hash.startsWith('#!')) {
    return hash
      .substring(2)
      .split(',')
      .map((manifest) => {
        // Using URL constructor to ensure each manifest is a valid URL. This won't prevent all malicious URLs,
        // but it will ensure the basic structure is a URL.
        try {
          new URL(manifest);
          return manifest;
        } catch (e) {
          console.warn('Invalid URL detected:', manifest);
          return null;
        }
      })
      .filter(Boolean); // Remove any invalid or null URLs
  }

  return [];
}

export function getWorkspaceConfig() {}

// export function getAllUrlParams(url) {

//   // get query string from url (optional) or window
//   var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

//   // we'll store the parameters here
//   var obj = {};

//   // if query string exists
//   if (queryString) {

//     // stuff after # is not part of query string, so get rid of it
//     queryString = queryString.split('#')[0];

//     // split our query string into its component parts
//     var arr = queryString.split('&');

//     for (var i = 0; i < arr.length; i++) {
//       // separate the keys and the values
//       var a = arr[i].split('=');

//       // set parameter name and value (use 'true' if empty)
//       var paramName = a[0];
//       var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

//       // (optional) keep case consistent
//       paramName = paramName.toLowerCase();
//       if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

//       // if the paramName ends with square brackets, e.g. colors[] or colors[2]
//       if (paramName.match(/\[(\d+)?\]$/)) {

//         // create key if it doesn't exist
//         var key = paramName.replace(/\[(\d+)?\]/, '');
//         if (!obj[key]) obj[key] = [];

//         // if it's an indexed array e.g. colors[2]
//         if (paramName.match(/\[\d+\]$/)) {
//           // get the index value and add the entry at the appropriate position
//           var index = /\[(\d+)\]/.exec(paramName)[1];
//           obj[key][index] = paramValue;
//         } else {
//           // otherwise add the value to the end of the array
//           obj[key].push(paramValue);
//         }
//       } else {
//         // we're dealing with a string
//         if (!obj[paramName]) {
//           // if it doesn't exist, create property
//           obj[paramName] = paramValue;
//         } else if (obj[paramName] && typeof obj[paramName] === 'string') {
//           // if property does exist and it's a string, convert it to an array
//           obj[paramName] = [obj[paramName]];
//           obj[paramName].push(paramValue);
//         } else {
//           // otherwise add the property
//           obj[paramName].push(paramValue);
//         }
//       }
//     }
//   }

//   return obj;
// }
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
