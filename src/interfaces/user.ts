export interface User {
    id: string;
    aud: string;
    role: string;
    email: string;
    emailConfirmedAt: string;
    phone: string;
    confirmedAt: string;
    recoverySentAt: string;
    lastSignInAt: string;
    appMetadata: AppMetadata;
    userMetadata: UserMetadata;
    identities: Identity[];
    createdAt: string;
    updatedAt: string;
  }

  interface Identity {
    identityId: string;
    id: string;
    userId: string;
    identityData: IdentityData;
    provider: string;
    lastSignInAt: string;
    createdAt: string;
    updatedAt: string;
    email: string;
  }
  
  interface IdentityData {
    email: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    sub: string;
  }
  
  interface UserMetadata {
  }
  
  interface AppMetadata {
    provider: string;
    providers: string[];
  }