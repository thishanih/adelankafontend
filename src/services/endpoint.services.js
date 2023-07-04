import api from "./api";

class endpointService {
  // DisplayPost
  DisplayPost(page, postsPerPage) {
    return api.get(`/post?page=${page}&per_page=${postsPerPage}`);
  }
  // addPost
  AddPost(data) {
    return api.post(`/post/add`, data);
  }
}

export default new endpointService();
