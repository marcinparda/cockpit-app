import { components } from './lib/openapi-types';
type ApiTypes = components['schemas'];

// Named exports for each schema type
export type Body_extract_text_from_image_api_v1_shared_ocr_post =
  ApiTypes['Body_extract_text_from_image_api_v1_shared_ocr_post'];
export type Category = ApiTypes['Category'];
export type CategoryCreate = ApiTypes['CategoryCreate'];
export type CategoryUpdate = ApiTypes['CategoryUpdate'];
export type Expense = ApiTypes['Expense'];
export type ExpenseCreate = ApiTypes['ExpenseCreate'];
export type ExpenseUpdate = ApiTypes['ExpenseUpdate'];
export type HTTPValidationError = ApiTypes['HTTPValidationError'];
export type LoginRequest = ApiTypes['LoginRequest'];
export type LoginResponse = ApiTypes['LoginResponse'];
export type OCRResponse = ApiTypes['OCRResponse'];
export type PasswordChangeRequest = ApiTypes['PasswordChangeRequest'];
export type PasswordChangeResponse = ApiTypes['PasswordChangeResponse'];
export type PasswordResetRequest = ApiTypes['PasswordResetRequest'];
export type PasswordResetResponse = ApiTypes['PasswordResetResponse'];
export type PaymentMethod = ApiTypes['PaymentMethod'];
export type PaymentMethodCreate = ApiTypes['PaymentMethodCreate'];
export type PaymentMethodUpdate = ApiTypes['PaymentMethodUpdate'];
export type Permission = ApiTypes['Permission'];
export type SimpleRefreshResponse = ApiTypes['SimpleRefreshResponse'];
export type TodoItem = ApiTypes['TodoItem'];
export type TodoItemCreate = ApiTypes['TodoItemCreate'];
export type TodoItemUpdate = ApiTypes['TodoItemUpdate'];
export type TodoProject = ApiTypes['TodoProject'];
export type TodoProjectCreate = ApiTypes['TodoProjectCreate'];
export type TodoProjectUpdate = ApiTypes['TodoProjectUpdate'];
export type UserCreate = ApiTypes['UserCreate'];
export type UserInfoResponse = ApiTypes['UserInfoResponse'];
export type UserPermissionAssign = ApiTypes['UserPermissionAssign'];
export type UserPermissionAssignResponse =
  ApiTypes['UserPermissionAssignResponse'];
export type UserRole = ApiTypes['UserRole'];
export type UserUpdate = ApiTypes['UserUpdate'];
export type UserWithPermissions = ApiTypes['UserWithPermissions'];
export type UserWithRole = ApiTypes['UserWithRole'];
export type ValidationError = ApiTypes['ValidationError'];
export type TodoProjectCollaboratorResponse =
  ApiTypes['TodoProjectCollaboratorResponse'];
export type TodoProjectCollaboratorCreate =
  ApiTypes['TodoProjectCollaboratorCreate'];
export type SimpleTodoProject = ApiTypes['SimpleTodoProject'];
export type SimpleUserResponse = ApiTypes['SimpleUserResponse'];
