/**
 * Generated TypeScript types for @cockpit-app/types-shared-auth
 *
 * Auto-generated from OpenAPI specification
 * Source: https://api.parda.me/openapi.json
 *
 * Tags: shared/auth
 * Description: TypeScript types for authentication and authorization
 *
 * @generated This file is auto-generated. Do not edit manually.
 * @see https://api.parda.me/openapi.json
 */

/**
 * LoginRequest
 * Schema for login request.
 */
export interface LoginRequest {
  /** Email */
  email: string;
  /** Password */
  password: string;
}

/**
 * LoginResponse
 * Response model for login endpoint.
 */
export interface LoginResponse {
  /** Message */
  message: string;
}

/**
 * PasswordChangeRequest
 * Schema for password change request.
 */
export interface PasswordChangeRequest {
  /** Current Password */
  current_password: string;
  /** New Password */
  new_password: string;
}

/**
 * PasswordChangeResponse
 * Response model for password change endpoint.
 */
export interface PasswordChangeResponse {
  /** Message */
  message: string;
}

/**
 * PasswordResetRequest
 * Schema for password reset request.
 */
export interface PasswordResetRequest {
  /** New Password */
  new_password?: string | unknown;
}

/**
 * PasswordResetResponse
 * Schema for password reset response.
 */
export interface PasswordResetResponse {
  /** Message */
  message: string;
  /** New Password */
  new_password: string;
}

/**
 * UserInfoResponse
 * Response model for user information endpoint.
 */
export interface UserInfoResponse {
  /** User Id */
  user_id: string;
  /** Email */
  email: string;
  /** Is Active */
  is_active: boolean;
  /** Password Changed */
  password_changed: boolean;
  /** Created At */
  created_at: string;
}

/**
 * SimpleRefreshResponse
 * Simple response model for refresh endpoint.
 */
export interface SimpleRefreshResponse {
  /** Message */
  message: string;
}
