// import React, { useState, useEffect, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import endpointService from "../services/endpoint.services.js";

// export default function EditPost() {
//   const [data, setData] = useState([]);
//   const params = useParams();

//   const LoadProductData = useCallback(() => {
//     if (params.id) {
//       ApiService.DisplayProductById(params.id)
//         .then((response) => {
//           if (response.data.data) {
//             const ProductData = response.data.data.pop();
//             setData(ProductData);
//           }
//         })
//         .catch((error) => {
//           console.log(
//             "🚀 ~ file: EditPost.js:18 ~ LoadProductData ~ error:",
//             error
//           );
//         });
//     }
//   }, [params.id]);

//   return <div>EditPost</div>;
// }
