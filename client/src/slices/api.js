
export const url = "https://my-book-store-softweb-api.vercel.app/api";     //Το baseUrl για αποστολή HTTP requests στον server

export const setHeaders = () => {
  const headers = {
    headers: {          //Τα headers των requests θα περιέχουν το token προκειμένου ο χρήστης να μπορεί να αυθεντικοποιηθεί από τον server
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  return headers;
};