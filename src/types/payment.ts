export interface PaystackOptions {
    email: string;
    amount: number;
    currency: string;
    metadata: {
      type?: 'subscription' | 'token_purchase';
      planId?: string;
      tokenAmount: number;
      userId: string;
    };
    publicKey: string;
    onSuccess: (transaction: PaystackTransaction) => void;
    onCancel: () => void;
  }
  
  export interface PaystackTransaction {
    reference: string;
    status: string;
    trans: string;
    transaction: string;
    message: string;
    response: string;
    trxref: string;
  }
  
  declare global {
    interface Window {
      PaystackPop: {
        setup: (options: PaystackOptions) => {
          openIframe: () => void;
        };
      };
    }
  }