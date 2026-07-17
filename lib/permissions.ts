import { Session } from "next-auth";

/**
 * Check if user has a specific permission
 */
export function hasPermission(session: Session | null, permission: string): boolean {
  if (!session?.user) return false;
  const user = session.user as any; // Can cast to get permissions
  return user.permissions?.includes(permission) || false;
}

/**
 * Check if user has ANY of the provided permissions
 */
export function hasAnyPermission(session: Session | null, permissions: string[]): boolean {
  if (!session?.user) return false;
  const user = session.user as any;
  return permissions.some((p) => user.permissions?.includes(p)) || false;
}

/**
 * Check if user has ALL of the provided permissions
 */
export function hasAllPermissions(session: Session | null, permissions: string[]): boolean {
  if (!session?.user) return false;
  const user = session.user as any;
  return permissions.every((p) => user.permissions?.includes(p)) || false;
}

/**
 * Check if user has a specific role
 */
export function hasRole(session: Session | null, role: string): boolean {
  if (!session?.user) return false;
  const user = session.user as any;
  return user.roles?.includes(role) || false;
}

/**
 * Require authentication - throw error if not authenticated
 */
export function requireAuth(session: Session | null): void {
  if (!session?.user) {
    throw new Error("Unauthorized: Authentication required");
  }
}

/**
 * Require specific permission - throw error if missing
 */
export function requirePermission(session: Session | null, permission: string): void {
  if (!hasPermission(session, permission)) {
    throw new Error(`Unauthorized: Missing permission '${permission}'`);
  }
}

/**
 * Require specific role - throw error if missing
 */
export function requireRole(session: Session | null, role: string): void {
  if (!hasRole(session, role)) {
    throw new Error(`Unauthorized: Missing role '${role}'`);
  }
}
