export function getAvatarLabelFromEmail(email: string): string {
  return email.slice(0, 2).toUpperCase();
}
