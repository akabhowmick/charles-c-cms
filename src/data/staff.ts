/**
 * CONSENT REQUIRED.
 *
 * Nobody appears on the public About page until they have given written consent to
 * publish their name, role, and photo. Stage a person here with
 * `consentGranted: false` while that is pending — the renderer filters them out — and
 * only flip the flag once consent is on file. See todo.md.
 */
export interface StaffMember {
  id: string;
  name: string;
  nameKo: string;
  role: string;
  roleKo: string;
  bio?: string;
  bioKo?: string;
  /** Path under public/staff/. Omit to render an initials avatar instead. */
  photo?: string;
  consentGranted: boolean;
}

export const staff: StaffMember[] = [];

export const consentedStaff = () => staff.filter((s) => s.consentGranted);
