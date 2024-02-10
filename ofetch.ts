import { ofetch } from "ofetch";

const instance = (function () {
  const fetcher = ofetch.create({
    baseURL: "https://corsproxy.io/?https://api.deezer.com",
  });

  return fetcher;
})();

export default instance;
