export interface Action<T = any> {
  type: T,
  payload?: any,
  skipPersist?: boolean
}