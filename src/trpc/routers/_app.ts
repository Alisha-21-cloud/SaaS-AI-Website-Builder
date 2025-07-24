import { messageRoute } from '@/modules/messages/server/procedures';

import { createTRPCRouter } from '../init';
import { projectsRoute } from '@/modules/projects/server/procedures';

export const appRouter = createTRPCRouter({
    message: messageRoute,
    projects: projectsRoute
})
// export type definition of API
export type AppRouter = typeof appRouter;