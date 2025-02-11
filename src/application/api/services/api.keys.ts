import type { InjectionKey } from 'vue'
import type { IDeparmentContract } from './department.contract'

export const DeparmentKey = Symbol('DeparmentService') as InjectionKey<IDeparmentContract>
