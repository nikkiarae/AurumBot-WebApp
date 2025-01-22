declare namespace global {
  let mongoose: { conn: Connection | null; promise: Promise<Connection> | null } | undefined;
}