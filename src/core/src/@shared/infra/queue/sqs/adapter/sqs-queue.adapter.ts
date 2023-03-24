import { LoggerAdapter, QueueAdapter } from '@shared/domain';
import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
} from '@aws-sdk/client-sqs';
import { Consumer } from 'sqs-consumer';

export namespace SqsQueueAdapter {
  export class Adapter implements QueueAdapter {
    private queueUrl: string;
    private dlQueueUrl?: string;
    private sqsClient: SQSClient;

    constructor(
      private readonly logger: LoggerAdapter,
      queueUrl: string,
      dlQueueUrl: string,
    ) {
      this.queueUrl = queueUrl;
      this.dlQueueUrl = dlQueueUrl;
      this.sqsClient = new SQSClient({
        region: 'us-east-1',
        credentials: {
          accessKeyId: 'AKIA4YQ5IQDAFYW43B5L',
          secretAccessKey: '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',
        },
      });
    }

    async sendMessageToQueue(input: string): Promise<void> {
      await this.send(this.queueUrl, input);
    }

    async sendMessageToDlQueue(input: string): Promise<void> {
      await this.send(this.dlQueueUrl, input);
    }

    async receiveMessages(): Promise<string[]> {
      const command = new ReceiveMessageCommand({
        QueueUrl: this.queueUrl,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 20,
      });

      const response = await this.sqsClient.send(command);
      const responseMessages = response.Messages;
      const messages: string[] = [];

      if (responseMessages) {
        responseMessages.forEach((message) => {
          messages.push(
            JSON.stringify({
              message_id: message.MessageId,
              receipt_handle: message.ReceiptHandle,
              message: message.Body,
            }),
          );
        });
      }

      return messages;
    }

    deleteMessage(receiptHandle: string): Promise<void> {
      throw new Error('Method not implemented.');
    }

    async consumerStart(
      handleMessage: (message: any) => Promise<void>,
    ): Promise<void> {
      const consumer = Consumer.create({
        queueUrl: this.queueUrl,
        handleMessage,
        sqs: this.sqsClient,
      });

      consumer.on('error', (err) => {
        this.logger.error(err);
      });

      consumer.on('processing_error', (err) => {
        this.logger.error(err);
      });

      consumer.start();
    }

    private async send(queueUrl: string, input: string) {
      const command = new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: input,
      });

      const response = await this.sqsClient.send(command);
      this.logger.info({ message: 'Sended!', messageId: response.MessageId });
    }
  }
}
