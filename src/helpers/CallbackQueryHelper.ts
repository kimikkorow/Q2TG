import { CallbackQueryEvent } from 'telegram/events/CallbackQuery';

export default class CallbackQueryHelper {
  private readonly queries: Array<() => any> = [];

  public registerCallback(cb: () => any) {
    const id = this.queries.push(cb) - 1;
    const buf = Buffer.alloc(2);
    buf.writeUInt16LE(id);
    return buf;
  }

  public onCallbackQuery = async (event: CallbackQueryEvent) => {
    const id = event.query.data.readUint16LE();
    if (this.queries[id]) {
      this.queries[id]();
    }
    await event.answer();
  };
}
