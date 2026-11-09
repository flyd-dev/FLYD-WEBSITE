import clsx, { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Liten forbokstav midt i en setning («Les mer om regnskap og rådgivning»).
 * Forkortelser beholdes: «AI og automatisering» blir ikke «aI og …».
 */
export function midtISetning(s: string) {
  return /^\p{Lu}{2}/u.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1);
}
