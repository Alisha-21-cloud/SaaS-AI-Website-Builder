import { messageRoute } from '@/modules/messages/server/procedures';

import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
    message: messageRoute
})
// export type definition of API
export type AppRouter = typeof appRouter;