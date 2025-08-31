import z from 'zod';
import { 
  SimpleUserResponse,
  TodoItem,
  TodoProject,
  TodoProjectCollaboratorResponse
} from '@cockpit-app/api-types';

export const usersSchema = z
  .array(
    z.object({
      id: z.string().describe('User Id'),
      email: z.email().describe('Email'),
    }),
  )
  .transform((data) => data as SimpleUserResponse[]);

export const todoItemSchema = z
  .object({
    id: z.number().describe('Todo Item ID'),
    name: z.string().describe('Name'),
    description: z.string().optional().nullable().describe('Description'),
    shops: z.string().optional().nullable().describe('Shops'),
    is_closed: z.boolean().describe('Is Closed status'),
    project_id: z.number().describe('Project ID'),
    created_at: z.string().describe('Created At'),
    updated_at: z.string().describe('Updated At'),
    completed_at: z.string().optional().nullable().describe('Completed At'),
    project: z.object({
      id: z.number(),
      name: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
      owner_id: z.string(),
    }).optional().nullable().describe('Project'),
  })
  .transform((data) => data as TodoItem);

export const todoItemsSchema = z.array(todoItemSchema);

export const todoProjectSchema = z
  .object({
    id: z.number().describe('Project ID'),
    name: z.string().describe('Project Name'),
    created_at: z.string().describe('Created At'),
    updated_at: z.string().describe('Updated At'),
    is_general: z.boolean().describe('Is General Project'),
    collaborators: z.array(z.string()).optional().describe('Collaborators'),
    owner: z.object({
      id: z.string(),
      email: z.string().email(),
    }).describe('Owner'),
  })
  .transform((data) => data as TodoProject);

export const todoProjectsSchema = z.array(todoProjectSchema);

export const todoProjectCollaboratorSchema = z
  .object({
    id: z.string().describe('Collaborator ID'),
    email: z.string().email().describe('Email'),
  })
  .transform((data) => data as TodoProjectCollaboratorResponse);

export const todoProjectCollaboratorsSchema = z.array(todoProjectCollaboratorSchema);

export const voidResponseSchema = z.void();
