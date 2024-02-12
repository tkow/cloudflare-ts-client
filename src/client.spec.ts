import {expect, it} from 'bun:test'
import { user$api$tokens$verify$token } from './client'
import { createApiClient } from './'


it('verify token',  async () => {
  const apiClient = createApiClient({'baseUrl': 'http://127.0.0.1:4010'})
  const result = await user$api$tokens$verify$token(apiClient)({
    headers: {
      Authorization: "Bearer token"
    }
  })
  expect(result.success).toBe(true)
})
