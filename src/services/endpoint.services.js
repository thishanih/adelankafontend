import api from "./api";

class endpointService {
  // DisplayPost
  DisplayPost(page, postsPerPage) {
    return api.get(`/post?page=${page}&per_page=${postsPerPage}`);
  }
}

export default new endpointService();
