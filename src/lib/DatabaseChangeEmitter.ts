import { Client } from 'pg';
import { EventEmitter } from 'events';

interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

interface ChangeEvent {
  operation: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  data: Record<string, any>;
}

// Declare custom events interface for type safety
interface DatabaseEvents {
  change: (event: ChangeEvent) => void;
  error: (error: Error) => void;
}

export declare interface IDatabaseChangeEmitter {
  on<K extends keyof DatabaseEvents>(event: K, listener: DatabaseEvents[K]): this;
  emit<K extends keyof DatabaseEvents>(event: K, ...args: Parameters<DatabaseEvents[K]>): boolean;
}

export class DatabaseChangeEmitter extends EventEmitter {
  private readonly client: Client;
  private readonly listenerClient: Client;
  private isConnected: boolean;

  constructor(connectionConfig: DatabaseConfig) {
    super();
    this.client = new Client(connectionConfig);
    this.listenerClient = new Client(connectionConfig);
    this.isConnected = false;
  }

  public async connect(): Promise<void> {
    try {
      // Connect both clients
      await this.client.connect();
      await this.listenerClient.connect();
      this.isConnected = true;

      // Create notification function if it doesn't exist
      await this.client.query(`
        CREATE OR REPLACE FUNCTION notify_table_changes()
        RETURNS trigger AS $$
        DECLARE
          data json;
        BEGIN
          IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
            data = row_to_json(NEW);
          ELSE
            data = row_to_json(OLD);
          END IF;
          
          PERFORM pg_notify(
            'table_changes',
            json_build_object(
              'operation', TG_OP,
              'table', TG_TABLE_NAME,
              'data', data
            )::text
          );
          
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error occurred');
      this.emit('error', err);
      throw err;
    }
  }

  public async watchTable(tableName: string): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Database connection not established. Call connect() first.');
    }

    try {
      // Create trigger for the specified table
      await this.client.query(`
        DROP TRIGGER IF EXISTS ${tableName}_notify_changes ON ${tableName};
        CREATE TRIGGER ${tableName}_notify_changes
        AFTER INSERT OR UPDATE OR DELETE ON ${tableName}
        FOR EACH ROW
        EXECUTE FUNCTION notify_table_changes();
      `);

      // Listen for notifications
      await this.listenerClient.query('LISTEN table_changes');

      // Handle notifications
      this.listenerClient.on('notification', (msg) => {
        try {
          const payload = JSON.parse(msg.payload as string) as ChangeEvent;
          if (payload.table === tableName) {
            this.emit('change', {
              operation: payload.operation,
              table: payload.table,
              data: payload.data
            });
          }
        } catch (error) {
          const err = error instanceof Error ? error : new Error('Failed to parse notification payload');
          this.emit('error', err);
        }
      });

      console.log(`Now watching table: ${tableName}`);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(`Failed to watch table ${tableName}`);
      this.emit('error', err);
      throw err;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.client.end();
      await this.listenerClient.end();
      this.isConnected = false;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error disconnecting');
      this.emit('error', err);
      throw err;
    }
  }
}