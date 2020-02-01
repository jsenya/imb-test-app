import axios from "axios";

export default class ApiService {
  getRequest(url) {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  postRequest(url, body) {
    axios
      .post(url, body)
      .then(res => {
        return res.body;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
