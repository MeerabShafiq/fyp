import axios from "axios";

// export const getEnv = (key) => {
    // let val = ENVIRONMENTS.dev[key];
    // Object.keys(ENVIRONMENTS).forEach(env => {
    //   if (window.location.hostname === ENVIRONMENTS[env].hostname) val = ENVIRONMENTS[env][key];
    // })
    // return val;
//   };
  
//   export const getURL = () => `${getEnv('url')}`;
//   export const makePath = (...parts) =>
//     _.replace(
//       `/${_.filter(parts, (p) => !!p)
//         .map((p) => _.trim(p, '/'))
//         .join('/')}`,
//       '//',
//       '/'
//     );
  
export const fetchrequest = async ({ method = 'get', path, data, endpoint, res, ...params }) => {
    // let url = 'https:/' + makePath(getURL(), endpoint);
    let url = ('http://localhost:5000/'+ endpoint);

  console.log(url);
    // try {
    return data
      ? axios[method](url, data, {
          headers: {
            // Authorization: `Bearer ${local().token}`,
          },
        })
      : axios[method](url, {
          headers: {
            // Authorization: `Bearer ${local().token}`,
          },
          ...params,
        });
  };