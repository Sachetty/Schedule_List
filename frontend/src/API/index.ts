export interface APIUser {
    userId: number;
    name: string;
    socialSecurity: string;
};
  
export interface APIContact {
    contactId: number;
    type: string;
    description: string;
    userId: number;
    userName: string;
};

