export const ADULT_AGE_YEARS = 18;
export const SIGNING_AGE_YEARS = 14;

export function yearsOld(birthDate: string, reference: string): number {
  const birth = new Date(birthDate);
  const ref = new Date(reference);
  let years = ref.getFullYear() - birth.getFullYear();
  const month = ref.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && ref.getDate() < birth.getDate())) years--;
  return years;
}

export function needsDocument(birthDate: string, reference: string): boolean {
  return yearsOld(birthDate, reference) >= ADULT_AGE_YEARS;
}

export function mustSign(birthDate: string, reference: string): boolean {
  return yearsOld(birthDate, reference) >= SIGNING_AGE_YEARS;
}
