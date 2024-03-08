import { Session } from '@session/domain';
import { Entity, UniqueEntityId } from '@shared/domain';

export type TopicProperties = {
  title: string;
  description: string;
  is_active?: boolean;
  sessions?: Session[];
  created_at?: Date;
  updated_at?: Date;
};

export class Topic extends Entity<TopicProperties> {
  private constructor(props: TopicProperties, id?: UniqueEntityId) {
    super(props, id);

    this.is_active = props.is_active;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static create(props: TopicProperties, id?: UniqueEntityId): Topic {
    return new Topic(props, id);
  }

  update({ title, description }: TopicProperties) {
    this.props.title = title;
    this.props.description = description;
  }

  activate(): void {
    if (!this.is_active) {
      this.is_active = true;
      this.updated_at = new Date();
    }
  }

  deactivate(): void {
    if (this.is_active) {
      this.is_active = false;
      this.updated_at = new Date();
    }
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  set is_active(isActive: boolean) {
    this.props.is_active = isActive ?? true;
  }

  get sessions(): Session[] {
    return this.props.sessions;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  set created_at(date: Date) {
    this.props.created_at = date ?? new Date();
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  set updated_at(date: Date) {
    this.props.updated_at = date ?? new Date();
  }
}
