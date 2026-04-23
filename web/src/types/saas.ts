export type SchoolStatus = 'active' | 'suspended' | 'trial'
export type SaasRole = 'super_admin' | 'school_admin' | 'teacher' | 'student'
export type CredentialType = 'pin' | 'emoji' | 'word'

export interface School {
  id: string
  name: string
  quota_students: number
  quota_teachers: number
  status: SchoolStatus
  created_at: string
}

export interface SchoolUser {
  id: string
  school_id: string
  user_id: string
  role: SaasRole
  created_at: string
}

export type ModuleOrder = 'sequential' | 'random'

export interface Class {
  id: string
  school_id: string
  teacher_id: string
  name: string
  access_code: string
  credential_type: CredentialType
  module_order: ModuleOrder
  created_at: string
}

export interface ClassModule {
  id: string
  class_id: string
  bolum_no: number
  sort_order: number
  min_quiz_score: number
  assigned_at: string
}

export interface StudentQuizResult {
  id: string
  student_id: string
  class_id: string
  bolum_no: number
  score: number
  passed: boolean
  completed_at: string
}

export interface StudentModuleView {
  bolum_no: number
  sort_order: number
  min_quiz_score: number
  unlocked: boolean
  quiz_result?: {
    score: number
    passed: boolean
  }
}

export interface ClassStudent {
  id: string
  class_id: string
  user_id: string
  nickname: string
  credential_plain: string
  created_at: string
}

export interface StudentListItem {
  user_id: string
  nickname: string
  credential_plain: string
  class_id: string
}

export interface CsvUploadResult {
  success: string[]
  errors: { row: number; nickname: string; reason: string }[]
}

export interface KolayGirisStudent {
  nickname: string
  user_id: string
}

export const EMOJI_LIST = [
  { id: 'dog', emoji: '🐶' },
  { id: 'cat', emoji: '🐱' },
  { id: 'star', emoji: '⭐' },
  { id: 'rocket', emoji: '🚀' },
  { id: 'heart', emoji: '❤️' },
  { id: 'fire', emoji: '🔥' },
  { id: 'thunder', emoji: '⚡' },
  { id: 'rainbow', emoji: '🌈' },
  { id: 'moon', emoji: '🌙' },
  { id: 'sun', emoji: '☀️' },
  { id: 'tree', emoji: '🌳' },
  { id: 'diamond', emoji: '💎' },
] as const

export type EmojiId = typeof EMOJI_LIST[number]['id']
