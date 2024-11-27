import { app } from "@/app";
import { env } from "./env";

const port = Number(env.PORT);

app
  .listen({ port })
  .then(() => console.log(`[users-services]: running port => ${port}`));

app.addHook("onClose", async (instance) => {
  if (instance.redis) {
    await instance.redis.quit();
  }
});
