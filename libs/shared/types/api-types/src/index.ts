import { components } from './lib/openapi-types';
type ApiTypes = components['schemas'];

// Named exports for each schema type
export type HTTPValidationError = ApiTypes['HTTPValidationError'];
export type LoginRequest = ApiTypes['LoginRequest'];
export type LoginResponse = ApiTypes['LoginResponse'];
export type PasswordChangeRequest = ApiTypes['PasswordChangeRequest'];
export type PasswordChangeResponse = ApiTypes['PasswordChangeResponse'];
export type Permission = ApiTypes['Permission'];
export type SimpleRefreshResponse = ApiTypes['SimpleRefreshResponse'];
export type UserCreate = ApiTypes['UserCreate'];
export type UserInfoResponse = ApiTypes['UserInfoResponse'];
export type UserPermissionAssign = ApiTypes['UserPermissionAssign'];
export type UserPermissionAssignResponse =
  ApiTypes['UserPermissionAssignResponse'];
export type UserUpdate = ApiTypes['UserUpdate'];
export type UserWithRole = ApiTypes['UserWithRole'];
export type ValidationError = ApiTypes['ValidationError'];
export type SimpleUserResponse = ApiTypes['SimpleUserResponse'];
export type Action = ApiTypes['Action'];
export type CleanupHealthResponse = ApiTypes['CleanupHealthResponse'];
export type ConfigInfo = ApiTypes['ConfigInfo'];
export type Feature = ApiTypes['Feature'];
export type HealthCheckResponse = ApiTypes['HealthCheckResponse'];
export type JobInfo = ApiTypes['JobInfo'];
export type SchedulerInfo = ApiTypes['SchedulerInfo'];
export type User = ApiTypes['User'];
export type UserRoleModel =
  ApiTypes['src__services__authorization__roles__models__UserRole'];
export type UserRoleSchema =
  ApiTypes['src__services__authorization__roles__schemas__UserRole'];
