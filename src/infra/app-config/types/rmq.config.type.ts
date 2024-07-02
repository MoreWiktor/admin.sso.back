export type RmqConfigType = {
  notificator: {
    user: string;
    pass: string;
    port: number;
    host: string;
    protocol: string;
    emailQueue: string;
    emailQueueType: string;
    emailQueueMessageTtl: number;
  };
};
