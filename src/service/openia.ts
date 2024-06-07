import { OpenAI } from "openai";
import { APIPromise } from "openai/core";
import { Assistant } from "openai/resources/beta/assistants";
import {
  Message,
  MessageContent,
  TextContentBlock,
} from "openai/resources/beta/threads/messages";
import { Run } from "openai/resources/beta/threads/runs/runs";
import { Thread } from "openai/resources/beta/threads/threads";

export default class assistantsMenu {
  private openai: OpenAI;
  private assistant: APIPromise<Assistant>;
  private thread: APIPromise<Thread>;
  private run: Run;
  private status: Run;
  private lastMessage: Message;

  constructor(threadId?: string) {
    this.init(threadId);
  }

  private init(threadId?: string): void {
    this.openai = new OpenAI({
      apiKey: process.env.OPENIA_API_KEY,
    });
    this.assistant = this.openai.beta.assistants.retrieve(
      process.env.OPENAI_ASSISTANT_ID
    );
    if (threadId) {
      this.thread = this.openai.beta.threads.retrieve(threadId);
    } else {
      this.thread = this.openai.beta.threads.create();
    }
  }

  public async ask(question: string): Promise<string> {
    await this.messagesCreate(question);
    await this.runCreate();
    await this.runRetrive();
    await this.isStatusComplete();
    const messages = await this.openai.beta.threads.messages.list(
      (
        await this.thread
      ).id
    );
    const last = messages.data
      .filter(
        async (message) =>
          message.run_id === (await this.run).id && message.role === "assistant"
      )
      .pop();

    this.lastMessage =
      last.content[0]?.type === "text" ? last : this.lastMessage;

    return (this.lastMessage.content[0] as TextContentBlock).text.value;
  }

  private async isStatusComplete() {
    while (this.status.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await this.runRetrive();
    }
  }

  private async messagesCreate(question: string) {
    await this.openai.beta.threads.messages.create((await this.thread).id, {
      content: question,
      role: "user",
    });
  }

  private async runCreate() {
    this.run = await this.openai.beta.threads.runs.create(
      (
        await this.thread
      ).id,
      { assistant_id: (await this.assistant).id }
    );
  }

  private async runRetrive() {
    this.status = await this.openai.beta.threads.runs.retrieve(
      (
        await this.thread
      ).id,
      (
        await this.run
      ).id
    );
  }
}
