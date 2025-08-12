Services have been migrated to the Nx library @cockpit-app/todo-data-access.

Replace imports like:
import { usersService } from '../services/usersService'
with:
import { usersService } from '@cockpit-app/todo-data-access'

Files kept temporarily:

- collaboratorsService.ts
- currnetUserService.ts (use currentUserService in lib)
- http.service.ts
- todoItemsService.ts
- todoProjectsService.ts
- usersService.ts

These can be deleted after all imports are updated.
