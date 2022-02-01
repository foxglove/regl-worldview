export default function assertNever(_: never, msg: string): never {
  throw new Error(msg);
}
