import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import { ExerciseAppRouter } from "../../../api/src/api";

export const client = createTRPCProxyClient<ExerciseAppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

export const getHello = async () => {
  const result = await client.helloWorld.query();
  return result;
};
