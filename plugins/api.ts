import fetcher from "@/ofetch";
import { artist, general } from "~/api/index.api";

export default defineNuxtPlugin(() => {
  const api = {
    artist: artist(fetcher),
    general: general(fetcher),
  };

  return {
    provide: {
      api,
    },
  };
});
