export interface QueueAdapter {
  sendMessageToQueue(input: string): Promise<void>;
  sendMessageToDlQueue(input: string): Promise<void>;
  receiveMessages(): Promise<string[]>;
  deleteMessage(receiptHandle: string): Promise<void>;
  consumerStart(handleMessage: (message: any) => Promise<void>): Promise<void>;
}
