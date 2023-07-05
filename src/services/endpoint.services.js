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

  // addPost
  PostbyId(id) {
    return api.get(`/post/${id}`);
  }

  // post show comments
  commentDataShow(id) {
    return api.get(`/comment/${id}`);
  }

  // add comment
  AddComment(data) {
    return api.post(`/comment/add`, data);
  }
}

export default new endpointService();
