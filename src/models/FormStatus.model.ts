export interface IFormStatus {
  message: string
  type: 'success' | 'error' | 'loading'
}

export default interface IFormStatusProps {
  [key: string]: IFormStatus
}