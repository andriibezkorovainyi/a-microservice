import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SocketConnectedUserDto } from '../user/dto/socket-connected-user.dto';
//
@Injectable()
export class EventsService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async deleteSocketSession(
    socketId: string | null = null,
  ): Promise<void> {
    const keys = await this.cacheManager.store.keys();
    const socketKey = socketId ? `socket:${socketId}` : 'socket';
    const promises = keys.map((el: string) =>
      el.includes(socketKey) ? this.cacheManager.del(el) : null,
    );
    await Promise.all(promises);
  }

  public async addSocketSession(
    socketId: string,
    userId: string,
  ): Promise<void> {
    const key = `socket:${socketId}`;
    await this.cacheManager.set(key, { socketId, userId });
  }

  public async getSocketConnectedUsers(): Promise<SocketConnectedUserDto[]> {
    const keys = await this.cacheManager.store.keys();
    const promises = keys.map((el: string) =>
      el.includes('socket')
        ? (this.cacheManager.get(el) as Promise<SocketConnectedUserDto>)
        : null,
    );
    const users = await Promise.all(promises);
    return users.filter((u) => u !== null);
  }
}
