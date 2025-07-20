import { configApp } from '@adonisjs/eslint-config'

const defaultConfig = configApp()
const defaultAdonisConfig = defaultConfig.find((config) => config.name === 'AdonisJS app defaults')

if (defaultAdonisConfig) {
   defaultAdonisConfig.ignores = defaultAdonisConfig.ignores.filter(
      (ignore) => ignore !== 'resources/**'
   )

   defaultAdonisConfig.files = [...defaultAdonisConfig.files, '**/*.tsx']
}

export default defaultConfig
