/**
 * Generated TypeScript types for @cockpit-app/types-shared-users
 *
 * Auto-generated from OpenAPI specification
 * Source: https://api.parda.me/openapi.json
 *
 * Tags: shared/users
 * Description: TypeScript types for user management
 *
 * @generated This file is auto-generated. Do not edit manually.
 * @see https://api.parda.me/openapi.json
 */

/**
 * UserCreate
 * Schema for creating a new user.
 */
export interface UserCreate {
  /** Email */
  email: string;
  /** Is Active */
  is_active?: boolean | unknown;
  /** Password */
  password?: string | unknown;
  /** Role Id */
  role_id: string;
}

/**
 * UserUpdate
 * Schema for updating a user.
 */
export interface UserUpdate {
  /** Email */
  email?: string | unknown;
  /** Is Active */
  is_active?: boolean | unknown;
  /** Role Id */
  role_id?: string | unknown;
}

/**
 * UserWithRole
 * User schema with role information.
 */
export interface UserWithRole {
  /** Email */
  email: string;
  /** Is Active */
  is_active?: boolean | unknown;
  /** Id */
  id: string;
  /** Role Id */
  role_id: string;
  /** Password Changed */
  password_changed: boolean;
  /** Created By */
  created_by?: string | unknown;
  /** Created At */
  created_at: string;
  /** Updated At */
  updated_at: string;
  /** role */
  role: unknown;
}

/**
 * UserWithPermissions
 * User schema with permissions information.
 */
export interface UserWithPermissions {
  /** Email */
  email: string;
  /** Is Active */
  is_active?: boolean | unknown;
  /** Id */
  id: string;
  /** Role Id */
  role_id: string;
  /** Password Changed */
  password_changed: boolean;
  /** Created By */
  created_by?: string | unknown;
  /** Created At */
  created_at: string;
  /** Updated At */
  updated_at: string;
  /** role */
  role: unknown;
  /** Permissions */
  permissions: unknown[];
}

/**
 * UserPermissionAssign
 * Schema for assigning permissions to user.
 */
export interface UserPermissionAssign {
  /** Permission Ids */
  permission_ids: string[];
}

/**
 * UserPermissionAssignResponse
 * Response model for permission assignment endpoint.
 */
export interface UserPermissionAssignResponse {
  /** Message */
  message: string;
  /** Assigned Permissions */
  assigned_permissions: number;
}
