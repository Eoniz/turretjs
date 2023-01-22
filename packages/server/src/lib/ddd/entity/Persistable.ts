
export interface Persistable<SNAPSHOT> {
  snapshot: () => SNAPSHOT;
}
