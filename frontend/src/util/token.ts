export const getJwtExpirationTime = (token: string | null | undefined): number | null => {
  if (!token) {
    return null;
  }

  try {
    const payload = token.split('.')[1];
    if (!payload) {
      return null;
    }

    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
      '=',
    );
    const decodedPayload = JSON.parse(window.atob(paddedPayload));

    return typeof decodedPayload.exp === 'number' ? decodedPayload.exp * 1000 : null;
  } catch {
    return null;
  }
};

export const isJwtExpired = (token: string | null | undefined, skewMs = 0): boolean => {
  const expiresAt = getJwtExpirationTime(token);
  return expiresAt !== null && expiresAt <= Date.now() + skewMs;
};
