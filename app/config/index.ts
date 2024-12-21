// src/app/config/index.ts
export const config = {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/jpg'],
    VERIFICATION_DELAY: 2000, // 2 seconds
  };